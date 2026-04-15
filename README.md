# Yellowbet.com — Optimized Landing Page Plan

## Project Overview

Redesign yellowbet.com from a minimal country-selector into a **high-converting, brand-consistent landing page** that bridges the Yellowbet TV campaign (EPL/UCL on DSTV & Canal+) to all B2C brand destinations across 10+ Sub-Saharan African markets.

**Goal**: Increase click-through and registration conversion in non-Kenya markets from current poor performance to parity with Kenya's strong numbers.

---

## Root Cause Summary

Kenya converts well because the brand journey is seamless: **Yellowbet ad → Yellowbet.com → Yellowbet.ke**. Other markets break this chain by redirecting to GSB, Winner, or Starbet — different brand names that create user distrust and confusion.

---

## Optimization Strategy

### A. Eliminate Brand Disconnect (Highest Impact)

| Tactic | Description |
|--------|-------------|
| **A1. "Powered by Yellowbet" messaging** | On every country card, show the local brand logo WITH "Part of the Yellowbet family" or "Powered by Yellowbet" sub-text. This connects the TV ad to the destination brand. |
| **A2. Unified visual identity** | Use Yellowbet's color scheme (green/yellow) consistently. Local brand logos appear but within Yellowbet's visual framework. |
| **A3. Brand trust banner** | Add "Yellowbet operates under multiple licensed brands across Africa" explanation near the top. |

### B. Add Value Proposition (High Impact)

| Tactic | Description |
|--------|-------------|
| **B1. Welcome bonus display** | Show each market's welcome bonus on the country card (e.g., "Get 100% up to KES 10,000"). This is the #1 conversion driver in African betting. |
| **B2. Hero section with sports context** | Dynamic hero showing current/upcoming EPL or UCL matches — connects to the TV ad context where they saw the brand. |
| **B3. "Bet Now" CTAs** | Replace passive flag links with active "Bet Now in [Country]" buttons. |

### C. Reduce Friction (Medium Impact)

| Tactic | Description |
|--------|-------------|
| **C1. Geo-detection auto-suggestion** | Detect user's country via IP and prominently suggest their market at the top: "It looks like you're in Tanzania — Start betting now!" |
| **C2. Search/filter** | For users whose country isn't auto-detected, provide a dropdown or searchable country list. |
| **C3. Mobile-first grid** | Larger touch targets, 1-2 columns on mobile, clear country names (not just flags). |

### D. Add Urgency & Social Proof (Medium Impact)

| Tactic | Description |
|--------|-------------|
| **D1. Live match ticker** | Show EPL/UCL live scores or upcoming matches — "the game is happening NOW." |
| **D2. User count** | "Join 2M+ bettors across Africa" social proof. |
| **D3. Market-specific stats** | "50,000+ active bettors in Tanzania" on the Tanzania card. |

### E. Improve Trust & Compliance (Supporting)

| Tactic | Description |
|--------|-------------|
| **E1. License badges** | Show regulatory licenses for each market on hover/expand. |
| **E2. Age verification gate** | 18+ confirmation improves compliance signal. |
| **E3. Responsible gambling link** | Required in most jurisdictions, also builds trust. |

---

## Approved Page Architecture

### Page Sections (Top → Bottom)

```
┌─────────────────────────────────────────────────┐
│  1. TOP BAR                                     │
│     - Yellowbet logo (left)                     │
│     - Language toggle: EN / FR / PT (right)     │
│     - 18+ badge                                 │
├─────────────────────────────────────────────────┤
│  2. HERO SECTION                                │
│     - Background: Stadium/football imagery      │
│     - Headline: "Your Ultimate Betting          │
│       Destination in Africa"                    │
│     - Sub: "Licensed in 10+ countries.          │
│       Join millions of bettors."                │
│     - Live match ticker (EPL/UCL upcoming)      │
├─────────────────────────────────────────────────┤
│  3. GEO-DETECTED CTA (if country detected)     │
│     - "Looks like you're in [Country]!"         │
│     - Large branded button with welcome bonus   │
│     - "[Local Brand] — Part of Yellowbet family"│
│     - "Not in [Country]? See all markets below" │
├─────────────────────────────────────────────────┤
│  4. ALL MARKETS GRID                            │
│     - Cards layout (2 cols mobile, 3-4 desktop) │
│     - Each card contains:                       │
│       • Country flag + country name             │
│       • Local brand logo                        │
│       • "Powered by Yellowbet" badge            │
│       • Welcome bonus amount                    │
│       • "Bet Now →" CTA button                  │
│       • License info (subtle)                   │
├─────────────────────────────────────────────────┤
│  5. TRUST SECTION                               │
│     - "Yellowbet Family of Brands" explanation  │
│     - Stats: "10+ Countries | 2M+ Users |       │
│       Licensed & Regulated"                     │
│     - Brand logos row                           │
├─────────────────────────────────────────────────┤
│  6. FOOTER                                      │
│     - Responsible gambling notice               │
│     - 18+ warning                               │
│     - Links: About | Contact | T&Cs             │
│     - © B2Tech / Yellowbet                      │
└─────────────────────────────────────────────────┘
```

### Mobile Behavior
- Hero condenses to single-line ticker
- Geo-detected CTA takes full screen prominence
- Market grid becomes scrollable 1-column cards
- Bottom sticky "Bet Now" bar for detected country

---

## Technical Spec

### Stack
- **Pure HTML/CSS/JS** — static page, no framework overhead, maximum load speed
- **CSS Grid + Flexbox** for responsive layout
- **Vanilla JS** for geo-detection and language toggle
- No external dependencies beyond fonts

### Geo-Detection
- Free IP geolocation API (e.g., ip-api.com or ipinfo.io free tier)
- Fallback: show all markets grid if detection fails or user is from unlisted country
- Store user's country choice in localStorage for return visits

### Language
- Default: English
- Toggle to French (Cameroon, Congo, Guinea) and Portuguese (Mozambique)
- Content stored in JS locale objects

### Tracking
- Preserve existing `cxd=` tracking parameters on all outbound links
- Add UTM parameters for TV campaign attribution
- Data attributes on CTAs for analytics event tracking

### Performance Targets
- **< 2s** load on 3G (critical for African mobile networks)
- **< 500KB** total page weight including images
- Lazy-load country flag images below fold
- Inline critical CSS

### Files

```
yellowbet-landing-page/
├── README.md              ← This plan
├── ASSESSMENT.md          ← Current state analysis
├── index.html             ← Landing page
├── css/
│   └── styles.css         ← All styles
├── js/
│   ├── app.js             ← Main logic (geo, language, tracking)
│   └── markets.js         ← Market data (brands, URLs, bonuses)
└── assets/
    └── (flags & logos referenced via CDN / inline SVG)
```

---

## Market Data

| Country | Brand | URL | Language | Welcome Bonus (placeholder) | Tracking |
|---------|-------|-----|----------|----------------------------|----------|
| Cameroon | Yellowbet | yellowbet.cm | FR | Bonus de 100% | cxd_39569_0 |
| Congo | Yellowbet | yellowbet.cg | FR | Bonus de 100% | cxd_39569_536622 |
| Guinea | Yellowbet | yellowbet.com.gn | FR | Bonus de 100% | cxd_39569_536624 |
| Kenya | Yellowbet | yellowbet.ke | EN | 100% Welcome Bonus | cxd_39569_536623 |
| Liberia | Starbet | starbet.com.lr | EN | 100% Welcome Bonus | cxd_39569_536625 |
| Mozambique | Winner | winner.co.mz | PT | Bónus de 100% | cxd_39569_536626 |
| Rwanda | Winner | winner.rw | EN | 100% Welcome Bonus | cxd_39569_536627 |
| Tanzania | GSB | gsb.co.tz | SW | 100% Welcome Bonus | cxd_39569_536628 |
| Uganda | GSB | gsb.ug | EN | 100% Welcome Bonus | cxd_39569_536629 |
| Zambia | GSB | gsb.co.zm | EN | 100% Welcome Bonus | cxd_39569_536630 |

> **Note**: Welcome bonus amounts are placeholders. Replace with actual market-specific offers before deployment.

---

## Success Metrics

| Metric | Current (est.) | Target |
|--------|---------------|--------|
| Click-through rate (non-Kenya) | ~5-10% | 30%+ |
| Bounce rate | ~70-80% | <40% |
| Time to click | >10s | <5s |
| Registration conversion (from landing) | <2% | 8-12% |
| Geo-detection accuracy | N/A | >90% |

---

## Next Steps

1. ✅ Assessment complete (ASSESSMENT.md)
2. ✅ Plan approved (this README)
3. 🔜 Develop landing page (index.html + CSS + JS)
4. 🔜 Review & iterate with stakeholders
5. 🔜 Replace actual welcome bonus values
6. 🔜 A/B test against current page
7. 🔜 Deploy

---

*Review this plan and confirm approval. The landing page will be built exactly to this spec.*
