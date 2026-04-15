/**
 * Yellowbet Landing Page — Main Application Logic
 * Handles: geo-detection, language toggle, market rendering, age gate, tracking
 */

(function () {
  "use strict";

  let currentLang = "en";
  let detectedCountry = null;

  // ── Age Gate ──────────────────────────────────────────────
  function showAgeGate() {
    const ageVerified = localStorage.getItem("yb_age_verified");
    if (ageVerified === "true") {
      document.getElementById("age-gate").classList.add("hidden");
      document.getElementById("main-content").classList.remove("hidden");
      return;
    }
    document.getElementById("age-gate").classList.remove("hidden");
    document.getElementById("main-content").classList.add("hidden");
  }

  function handleAgeConfirm() {
    localStorage.setItem("yb_age_verified", "true");
    document.getElementById("age-gate").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
  }

  function handleAgeDecline() {
    window.location.href = "https://www.google.com";
  }

  // ── Geo Detection ────────────────────────────────────────
  async function detectCountry() {
    // Check localStorage first for return visitors
    const stored = localStorage.getItem("yb_country");
    if (stored) {
      detectedCountry = stored;
      renderGeoSuggestion();
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(function() { controller.abort(); }, 4000);

      const response = await fetch("https://ipapi.co/json/", {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Geo API error");

      const data = await response.json();
      if (data && data.country_code) {
        detectedCountry = data.country_code;
        localStorage.setItem("yb_country", detectedCountry);
        renderGeoSuggestion();
      }
    } catch (e) {
      // Geo detection failed — silently fall back to showing all markets
      console.log("Geo-detection unavailable, showing all markets");
    }
  }

  function renderGeoSuggestion() {
    var market = MARKETS.find(function(m) {
      return m.countryCode === detectedCountry;
    });
    if (!market) return;

    var section = document.getElementById("geo-suggestion");
    var t = LOCALE[currentLang] || LOCALE.en;
    var countryNames = COUNTRY_NAMES[currentLang] || COUNTRY_NAMES.en;
    var countryName = countryNames[market.countryCode] || market.country;

    var brandLabel = market.brandFamily
      ? market.brand
      : market.brand + " — " + t.geoPowered;

    var outboundUrl = market.url + (market.url.indexOf("?") > -1 ? "&" : "?") + market.tracking
      + "&utm_source=yellowbet.com&utm_medium=landing&utm_campaign=tv_epl_ucl";

    section.innerHTML =
      '<div class="geo-card">' +
        '<p class="geo-label">' + t.geoDetected + '</p>' +
        '<div class="geo-country">' +
          '<span class="geo-flag">' + market.flag + '</span>' +
          '<span class="geo-name">' + countryName + '</span>' +
        '</div>' +
        '<div class="geo-bonus">' + market.welcomeBonus + '</div>' +
        '<a href="' + encodeURI(outboundUrl) + '" class="btn btn-primary btn-lg geo-cta" ' +
          'data-track="geo-cta" data-country="' + market.countryCode + '" ' +
          'rel="noopener">' +
          t.geoStart + ' →' +
        '</a>' +
        '<p class="geo-brand">' + brandLabel + '</p>' +
        '<p class="geo-not-here">' +
          '<a href="#markets">' + t.geoNotHere.replace("{country}", countryName) + '</a>' +
        '</p>' +
      '</div>';

    section.classList.remove("hidden");
  }

  // ── Market Grid ───────────────────────────────────────────
  function renderMarkets() {
    var grid = document.getElementById("markets-grid");
    var t = LOCALE[currentLang] || LOCALE.en;
    var countryNames = COUNTRY_NAMES[currentLang] || COUNTRY_NAMES.en;

    var html = "";
    MARKETS.forEach(function(market) {
      var countryName = countryNames[market.countryCode] || market.country;
      var outboundUrl = market.url + (market.url.indexOf("?") > -1 ? "&" : "?") + market.tracking
        + "&utm_source=yellowbet.com&utm_medium=landing&utm_campaign=tv_epl_ucl";

      var poweredBadge = market.brandFamily
        ? ""
        : '<span class="powered-badge">' + t.poweredBy + '</span>';

      html +=
        '<div class="market-card" data-country="' + market.countryCode + '">' +
          '<div class="market-flag">' + market.flag + '</div>' +
          '<h3 class="market-country">' + countryName + '</h3>' +
          '<div class="market-brand">' +
            '<span class="brand-name">' + market.brand + '</span>' +
            poweredBadge +
          '</div>' +
          '<div class="market-bonus">' + market.welcomeBonus + '</div>' +
          '<a href="' + encodeURI(outboundUrl) + '" class="btn btn-primary market-cta" ' +
            'data-track="market-cta" data-country="' + market.countryCode + '" ' +
            'rel="noopener">' +
            t.betNow + ' →' +
          '</a>' +
        '</div>';
    });

    grid.innerHTML = html;
  }

  // ── Search / Filter ───────────────────────────────────────
  function initSearch() {
    var input = document.getElementById("market-search");
    if (!input) return;

    input.addEventListener("input", function () {
      var query = this.value.toLowerCase().trim();
      var cards = document.querySelectorAll(".market-card");
      var countryNames = COUNTRY_NAMES[currentLang] || COUNTRY_NAMES.en;

      cards.forEach(function(card) {
        var code = card.getAttribute("data-country");
        var name = (countryNames[code] || "").toLowerCase();
        var market = MARKETS.find(function(m) { return m.countryCode === code; });
        var brand = market ? market.brand.toLowerCase() : "";

        if (name.indexOf(query) > -1 || brand.indexOf(query) > -1 || code.toLowerCase().indexOf(query) > -1) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // ── Language Toggle ───────────────────────────────────────
  function initLanguageToggle() {
    var buttons = document.querySelectorAll("[data-lang]");
    buttons.forEach(function(btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var lang = this.getAttribute("data-lang");
        setLanguage(lang);
      });
    });
  }

  function setLanguage(lang) {
    if (!LOCALE[lang]) return;
    currentLang = lang;
    localStorage.setItem("yb_lang", lang);

    // Update active button
    document.querySelectorAll("[data-lang]").forEach(function(btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Update all translatable elements
    var t = LOCALE[lang];
    updateText("hero-title", t.heroTitle);
    updateText("hero-sub", t.heroSub);
    updateText("markets-title", t.marketsTitle);
    updateText("trust-title", t.trustTitle);
    updateText("trust-desc", t.trustDesc);
    updateText("stat-countries-label", t.statsCountries);
    updateText("stat-users-label", t.statsUsers);
    updateText("stat-regulated-label", t.statsRegulated);
    updateText("footer-responsible", t.footerResponsible);
    updateText("age-title", t.ageTitle);
    updateText("age-message", t.ageMessage);
    updateText("age-confirm", t.ageConfirm);
    updateText("age-decline", t.ageDecline);

    var searchInput = document.getElementById("market-search");
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;

    // Re-render dynamic content
    renderMarkets();
    if (detectedCountry) renderGeoSuggestion();
    initSearch();
  }

  function updateText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // ── Tracking ──────────────────────────────────────────────
  function initTracking() {
    document.addEventListener("click", function (e) {
      var link = e.target.closest("[data-track]");
      if (!link) return;

      var trackEvent = {
        event: "yellowbet_landing_click",
        action: link.getAttribute("data-track"),
        country: link.getAttribute("data-country") || "unknown",
        language: currentLang,
        timestamp: new Date().toISOString()
      };

      // Send to dataLayer if GTM is present
      if (window.dataLayer) {
        window.dataLayer.push(trackEvent);
      }

      // Console log for debugging
      console.log("Track:", trackEvent);
    });
  }

  // ── Smooth Scroll ─────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener("click", function (e) {
        var target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // ── Initialization ────────────────────────────────────────
  function init() {
    // Restore language preference
    var savedLang = localStorage.getItem("yb_lang");
    if (savedLang && LOCALE[savedLang]) {
      currentLang = savedLang;
    }

    showAgeGate();
    setLanguage(currentLang);
    initLanguageToggle();
    renderMarkets();
    initSearch();
    initTracking();
    initSmoothScroll();
    detectCountry();

    // Age gate buttons
    var ageConfirmBtn = document.getElementById("age-confirm");
    var ageDeclineBtn = document.getElementById("age-decline");
    if (ageConfirmBtn) ageConfirmBtn.addEventListener("click", handleAgeConfirm);
    if (ageDeclineBtn) ageDeclineBtn.addEventListener("click", handleAgeDecline);
  }

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
