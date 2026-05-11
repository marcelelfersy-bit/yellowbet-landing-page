#!/usr/bin/env python3
"""Compose and send a daily digest using Claude Haiku 4.5 with web_search.

Selects iGaming or CEO Brief via $DIGEST_KIND env var. Runs from GitHub Actions
cron daily. Streams the response and POSTs the composed HTML to Resend.
"""
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

import anthropic

DIGEST_KIND = os.environ["DIGEST_KIND"]
RESEND_API_KEY = os.environ["RESEND_API_KEY"]
DIGEST_TO = "marcel.elfersy@b2tech.com"
DIGEST_FROM = "onboarding@resend.dev"

# Cost dial: each web_search call costs $0.01 ($10/1000). 8 per digest × 2
# digests/day × 30 days = ~$4.80/month in search alone. Increase for more
# depth, decrease to cut cost. Haiku 4.5 inference itself is trivial (~$0.01
# per call), so search-call count is the dominant cost driver.
MAX_WEB_SEARCHES = 8
MAX_WEB_FETCHES = 5

H2_STYLE = 'style="color:#0a0a0a;border-bottom:1px solid #ddd;padding-bottom:6px;"'

IGAMING_SYSTEM = f"""You are an iGaming/sports betting news analyst composing a daily digest for Marcel Elfersy, CEO of B2Tech, focused on African betting markets but covering global news. Marcel is an industry insider — write for someone who already knows the players. No explainers, no marketing language.

=== TASK ===

Use web_search to gather news from the last 24-72 hours. Compose the digest as HTML body content (no <html>/<body> wrapper — just the inner content).

=== KEY SOURCES TO SEARCH ===

Trade press: SBC News, iGaming Business, Gambling Insider, Yogonet, Focus Gaming News
Africa-specific: iGaming Afrika, iGaming Future Africa, BiztechAfrica
Regulators: Africa (SA NGB, Kenya BCLB/GRA, Nigeria NLRC, Ghana GC), Europe (UKGC, MGA, ANJ, Spelinspektionen), Americas (AGA, NJ DGE, Ontario AGCO, Brazil SPA)
Public companies: Flutter, Entain, DraftKings, MGM, Super Group/Betway, Hollywoodbets, Sun International, Playtech, Kambi, Evolution, Light & Wonder, Aristocrat, EveryMatrix

=== LOCKED FORMAT RULES ===

1. Every bullet MUST carry at least one source URL using <a href="...">.
2. Any monetary value in a currency OTHER THAN USD or EUR must be followed by a USD equivalent in parentheses. Examples: 'R74.5bn (~$4.0bn)', 'KES 12bn (~$93m)', '£200m (~$255m)'. EUR figures need no conversion.
3. Do NOT fabricate. If a section truly has nothing material, write a one-line note saying so (e.g. "No material releases in last 24h").
4. Total length: ~600 words max.
5. Label rumored items '(rumor)'.

=== EMAIL SECTIONS (use exactly these headers, in order) ===

<h2 {H2_STYLE}>Africa headlines</h2> — 3-5 bullets, lead each with country in <strong>bold</strong>
<h2 {H2_STYLE}>Global headlines</h2> — 3-5 bullets covering Europe, Americas, Asia
<h2 {H2_STYLE}>Regulator KPI &amp; enforcement</h2> — 1-3 bullets on GGR/NGR releases, license issuances, fines from last 24-72h
<h2 {H2_STYLE}>Public company news</h2> — 2-4 bullets on earnings, filings, M&A, exec moves
<h2 {H2_STYLE}>B2B / supplier moves</h2> — 1-3 bullets on platform deals, integrations, content launches
<h2 {H2_STYLE}>What I'd watch today</h2> — 2-3 bullets with strategic implications for an Africa-focused B2B operator

=== OUTPUT REQUIREMENTS ===

Use ONLY these HTML tags: <h2>, <ul>, <li>, <strong>, <a href="...">.
Every <h2> MUST include the inline style attribute shown above (copy verbatim).
Return ONLY the body content. NO preamble. NO closing remarks. NO <body> tag. NO <html> tag. Start your response directly with the first <h2>.

Weekend caveat: Saturdays and Sundays are slow news days. Report what's actually there; don't pad."""

CEO_SYSTEM = f"""You are a strategic news analyst composing a daily CEO Brief for Marcel Elfersy, CEO of B2Tech (a B2B iGaming/sports-betting tech company in African markets). This brief is SEPARATE from his iGaming Daily Digest — do NOT cover iGaming/sports betting topics here. Focus on macro/markets, tech & AI, M&A and exec moves, longer-form strategic reads. Write for an industry-savvy CEO. No explainers, no hype.

=== TASK ===

Use web_search to gather news from the last 24-48 hours. Compose the brief as HTML body content (no <html>/<body> wrapper — just the inner content).

=== KEY SOURCES TO SEARCH (free only) ===

Macro/markets: Reuters, Bloomberg, CNBC, MarketWatch, FT, WSJ, Axios, Semafor, Globes (globes.co.il — Israeli business news, summarize in English)
Tech & AI: TechCrunch, The Verge, Wired, Ars Technica, Hacker News, VentureBeat, OpenAI/Anthropic/Google DeepMind blogs
Strategic reads: McKinsey, BCG, Bain free reports; HBR free articles

=== LOCKED FORMAT RULES ===

1. Every bullet MUST carry at least one source URL using <a href="...">.
2. Any monetary value in a currency OTHER THAN USD or EUR must be followed by a USD equivalent in parentheses. Examples: 'ILS 8.2bn (~$2.2bn)', '£200m (~$255m)', 'CNY 50bn (~$6.9bn)'. EUR figures need no conversion.
3. Do NOT fabricate. If a section is empty, say so in one line.
4. Total length: ~500 words max.
5. Label rumored items '(rumor)'.
6. Do NOT cover iGaming/sports betting — that's the other newsletter.
7. Fully global perspective — no regional bias toward Africa.

=== EMAIL SECTIONS (use exactly these headers, in order) ===

<h2 {H2_STYLE}>Macro &amp; markets</h2> — 3-4 bullets: central banks, FX (DXY, major crosses), equities, oil/commodities
<h2 {H2_STYLE}>Tech &amp; AI</h2> — 3-4 bullets: model releases, AI infrastructure, fintech/payments, cloud, semiconductors
<h2 {H2_STYLE}>Deals &amp; moves</h2> — 2-4 bullets: M&A, fundraising, exec moves at major tech and financial companies. NO iGaming.
<h2 {H2_STYLE}>Strategic reads</h2> — 1-2 bullets, each with a 2-line take on why it matters + link
<h2 {H2_STYLE}>What I'd watch today</h2> — 2-3 bullets with strategic implications for a B2B tech CEO operating in emerging markets

=== OUTPUT REQUIREMENTS ===

Use ONLY these HTML tags: <h2>, <ul>, <li>, <strong>, <a href="...">.
Every <h2> MUST include the inline style attribute shown above (copy verbatim).
Return ONLY the body content. NO preamble. NO closing remarks. NO <body> tag. NO <html> tag. Start your response directly with the first <h2>.

Weekend caveat: Saturdays and Sundays are slow news days. Report what's actually there; don't pad."""

CONFIG = {
    "igaming": {"subject_prefix": "iGaming Daily", "ua": "yellowbet-digest/1.0", "system": IGAMING_SYSTEM},
    "ceo":     {"subject_prefix": "CEO Brief",     "ua": "b2tech-ceo-brief/1.0", "system": CEO_SYSTEM},
}


def main() -> None:
    if DIGEST_KIND not in CONFIG:
        print(f"ERROR: unknown DIGEST_KIND={DIGEST_KIND!r} (expected 'igaming' or 'ceo')", file=sys.stderr)
        sys.exit(2)

    config = CONFIG[DIGEST_KIND]
    client = anthropic.Anthropic()

    now = datetime.now(timezone.utc)
    date_str = f"{now.strftime('%a')} {now.day} {now.strftime('%b %Y')}"
    user_msg = (
        f"Compose today's digest for {date_str}. "
        f"Use web_search to gather news from the last 24-72 hours. "
        f"Return ONLY the email body content (no <html> or <body> tags), "
        f"starting directly with the first <h2>."
    )

    print(f"[{DIGEST_KIND}] Composing digest for {date_str}...", file=sys.stderr)

    # Streaming with .get_final_message() avoids HTTP timeouts on long responses
    # while still giving us the full Message object for content extraction.
    # Haiku 4.5 doesn't support `thinking` or `output_config.effort` — both omitted.
    with client.messages.stream(
        model="claude-haiku-4-5",
        max_tokens=8000,
        tools=[
            # `allowed_callers=["direct"]` forces traditional tool-call rounds.
            # The default ("code") uses programmatic tool calling which Haiku 4.5
            # does not support — returns 400 if left at the default on this model.
            {"type": "web_search_20260209", "name": "web_search", "max_uses": MAX_WEB_SEARCHES, "allowed_callers": ["direct"]},
            {"type": "web_fetch_20260209", "name": "web_fetch", "max_uses": MAX_WEB_FETCHES, "allowed_callers": ["direct"]},
        ],
        system=config["system"],
        messages=[{"role": "user", "content": user_msg}],
    ) as stream:
        final_message = stream.get_final_message()

    # The response interleaves server_tool_use and tool_result blocks with text.
    # Composed digest is in the text block(s); join in order.
    text_parts = [b.text for b in final_message.content if b.type == "text"]
    body_html = "\n".join(text_parts).strip()

    if not body_html:
        print(f"[{DIGEST_KIND}] ERROR: no text content in response", file=sys.stderr)
        print(f"[{DIGEST_KIND}] stop_reason={final_message.stop_reason}", file=sys.stderr)
        print(f"[{DIGEST_KIND}] usage={final_message.usage}", file=sys.stderr)
        sys.exit(1)

    print(
        f"[{DIGEST_KIND}] Composed {len(body_html)} chars. "
        f"Tokens: input={final_message.usage.input_tokens}, "
        f"output={final_message.usage.output_tokens}",
        file=sys.stderr,
    )

    html = (
        '<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'
        "'Segoe UI',sans-serif;max-width:720px;margin:0 auto;color:#1a1a1a;line-height:1.5;\">"
        f"{body_html}</body></html>"
    )

    payload = {
        "from": DIGEST_FROM,
        "to": [DIGEST_TO],
        "subject": f"{config['subject_prefix']} — {date_str}",
        "html": html,
    }
    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": config["ua"],
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            print(f"[{DIGEST_KIND}] SENT: HTTP {resp.status} {resp.read().decode()}")
    except urllib.error.HTTPError as e:
        print(f"[{DIGEST_KIND}] FAIL: HTTP {e.code} {e.read().decode()}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
