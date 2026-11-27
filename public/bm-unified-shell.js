(function () {
  var SKIN_KEY = 'bm-unified-skin';
  var HERO_KEY = 'bm-choice-home';
  var SCALE_KEY = 'bm-ui-scale';
  var CONTRAST_KEY = 'bm-wcag-contrast';
  var MOTION_KEY = 'bm-wcag-reduced-motion';
  var SKINS = [
    { id: 'obsidian-gold', label: 'Obsidian & Gold', swatch: '#dfc6a7', tag: 'Strona główna' },
    { id: 'emerald-brass', label: 'Deep Emerald & Brass', swatch: '#d4b46a', tag: 'Butikowa' },
    { id: 'ivory-stone', label: 'Swiss Ivory & Stone', swatch: '#9f825e', tag: 'Jasna' },
    { id: 'nordic-frost', label: 'Nordic Frost & Glass', swatch: '#c5d6e6', tag: 'Chłodna' },
  ];

  function getSavedSkin() {
    try {
      var val = localStorage.getItem(SKIN_KEY);
      if (val && SKINS.some(function (s) { return s.id === val; })) return val;
    } catch (e) {}
    return 'obsidian-gold';
  }

  function applySkin(skinId) {
    document.documentElement.setAttribute('data-bm-skin', skinId);
    try {
      localStorage.setItem(SKIN_KEY, skinId);
    } catch (e) {}
    var opts = document.querySelectorAll('#bm-unified-dock .bm-skin-option');
    opts.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-skin') === skinId);
    });
    var active = SKINS.find(function (s) { return s.id === skinId; }) || SKINS[0];
    var labelEl = document.getElementById('bm-skin-current-label');
    if (labelEl) labelEl.textContent = active.label;
  }

  function resolveHeroPhotoUrl() {
    try {
      var idNum = parseInt(localStorage.getItem(HERO_KEY) || '', 10);
      if (idNum >= 1 && idNum <= 91) {
        var padded = String(idNum).padStart(3, '0');
        return "url('/assets/hd_" + padded + ".webp')";
      }
    } catch (e) {}
    return "url('/assets/hd_091.webp')";
  }

  function isFirstPageHome() {
    var path = window.location.pathname || '/';
    return path === '/' && !!document.getElementById('hero');
  }

  function ensureUnifiedStylesheet() {
    if (!document.querySelector('link[href*="/bm-unified-theme.css"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/bm-unified-theme.css?v=3';
      document.head.appendChild(link);
    }
  }

  function applyUiScale(scaleVal) {
    var allowed = ['0.9', '1', '1.12'];
    var val = allowed.indexOf(String(scaleVal)) >= 0 ? String(scaleVal) : '1';
    document.documentElement.style.setProperty('--bm-ui-scale', val);
    try {
      localStorage.setItem(SCALE_KEY, val);
    } catch (e) {}
    if (val === '1') {
      document.documentElement.style.fontSize = '';
    } else {
      document.documentElement.style.fontSize = Math.round(parseFloat(val) * 16 * 10) / 10 + 'px';
    }
    document.querySelectorAll('#bm-unified-dock .bm-scale-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-scale') === val);
    });
  }

  function applyWcagFlags() {
    try {
      var hc = localStorage.getItem(CONTRAST_KEY) === '1';
      var rm = localStorage.getItem(MOTION_KEY) === '1';
      document.documentElement.classList.toggle('bm-wcag-contrast', hc);
      document.documentElement.classList.toggle('bm-wcag-reduced-motion', rm);
      var hcBtn = document.getElementById('bm-wcag-contrast-btn');
      var rmBtn = document.getElementById('bm-wcag-motion-btn');
      if (hcBtn) hcBtn.classList.toggle('is-active', hc);
      if (rmBtn) rmBtn.classList.toggle('is-active', rm);
    } catch (e) {}
  }

  function mountUnifiedShell() {
    ensureUnifiedStylesheet();
    var skinId = getSavedSkin();
    applySkin(skinId);
    try {
      applyUiScale(localStorage.getItem(SCALE_KEY) || '1');
    } catch (e) {}
    applyWcagFlags();
    document.documentElement.style.setProperty('--bm-hero-photo', resolveHeroPhotoUrl());

    var onHome = isFirstPageHome();
    if (!onHome) {
      if (!document.getElementById('bm-unified-backdrop')) {
        var backdrop = document.createElement('div');
        backdrop.id = 'bm-unified-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.insertBefore(backdrop, document.body.firstChild);
      }
      document.body.classList.add('bm-has-backdrop');

      var cls = (document.body.className || '') + ' ' + (document.documentElement.className || '');
      var isDarkModule =
        /dark|bg-navy-950|bg-zinc-950|bg-slate-950/.test(cls) ||
        window.location.pathname.indexOf('/superagent') === 0 ||
        window.location.pathname.indexOf('/voice-builder') === 0 ||
        window.location.pathname.indexOf('/agent-llm') === 0 ||
        window.location.pathname.indexOf('/ruta') === 0 ||
        window.location.pathname.indexOf('/myskincode') === 0 ||
        window.location.pathname.indexOf('/sentinel') === 0 ||
        window.location.pathname.indexOf('/taskkill') === 0 ||
        window.location.pathname.indexOf('/chomik') === 0 ||
        window.location.pathname.indexOf('/design-studio') === 0 ||
        window.location.pathname.indexOf('/desingstudio') === 0;
      if (isDarkModule && skinId !== 'ivory-stone') {
        document.body.classList.add('bm-dark-surface');
      }

      var inIframe = false;
      try { inIframe = window.self !== window.top; } catch (e) { inIframe = true; }

      if (!inIframe) {
        var rightBack = document.getElementById('bm-back-to-menu');
        if (rightBack) {
          rightBack.style.display = 'none';
        }
        if (!document.getElementById('bm-top-left-nav')) {
          var topNav = document.createElement('div');
          topNav.id = 'bm-top-left-nav';
          topNav.style.cssText =
            'position:fixed;top:12px;left:12px;z-index:99999;display:flex;align-items:center;gap:8px;flex-wrap:wrap;';

          var backFixed = document.createElement('a');
          backFixed.id = 'bm-back-to-menu-fixed';
          backFixed.href = '/';
          backFixed.textContent = '← Wróć';
          backFixed.title = 'Wróć do głównego menu BM Clinic';
          backFixed.style.cssText =
            'display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:999px;font:700 12px/1.2 -apple-system,BlinkMacSystemFont,"Plus Jakarta Sans",sans-serif;text-decoration:none;background:rgba(10,16,24,0.88);color:#f5ebd6;border:1px solid rgba(223,198,167,0.55);backdrop-filter:blur(10px);box-shadow:0 8px 24px rgba(0,0,0,0.35);';
          topNav.appendChild(backFixed);

          var pathLower = (window.location.pathname || '').toLowerCase();
          var showDesignStudioLink =
            pathLower.indexOf('/aether') === 0 ||
            pathLower.indexOf('/parallax-3d') === 0 ||
            pathLower.indexOf('/spatial-3d') === 0 ||
            pathLower.indexOf('/chomik') === 0 ||
            pathLower.indexOf('/taskkill') === 0;
          if (showDesignStudioLink) {
            var dsLink = document.createElement('a');
            dsLink.id = 'bm-design-studio-shortcut';
            dsLink.href = '/design-studio';
            dsLink.textContent = '🎨 Motywy & Studio ↗';
            dsLink.title = 'Otwórz Design Studio (/design-studio) z motywami UI, wycinaniem bez klucza i wariantami';
            dsLink.style.cssText =
              'display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;font:700 12px/1.2 -apple-system,BlinkMacSystemFont,"Plus Jakarta Sans",sans-serif;text-decoration:none;background:linear-gradient(135deg,#34d399,#dfc6a7);color:#061210;border:1px solid rgba(255,255,255,0.45);box-shadow:0 8px 24px rgba(16,185,129,0.28);';
            topNav.appendChild(dsLink);
          }

          document.body.appendChild(topNav);

          if (!document.getElementById('bm-top-left-nav-style')) {
            var navStyle = document.createElement('style');
            navStyle.id = 'bm-top-left-nav-style';
            var padLeft = showDesignStudioLink ? '265px' : '104px';
            navStyle.textContent =
              '@media (min-width: 768px) { ' +
              '  body header:first-of-type, body .topbar:first-of-type { padding-left: ' + padLeft + ' !important; }' +
              '}';
            document.head.appendChild(navStyle);
          }
        }
      }
    }

    var isInsideIframe = false;
    try { isInsideIframe = window.self !== window.top; } catch (e) { isInsideIframe = true; }
    if (!isInsideIframe && !document.getElementById('bm-unified-dock')) {
      var dock = document.createElement('div');
      dock.id = 'bm-unified-dock';
      // Keep bottom-right dock clear of Chronos 5s badge & Next LiveEditorToolbar pill
      if (!onHome) {
        dock.style.bottom = '68px';
      }

      var activeSkin = SKINS.find(function (s) { return s.id === skinId; }) || SKINS[0];
      dock.innerHTML =
        '<div id="bm-skin-menu" class="bm-skin-menu hidden" role="dialog" aria-label="Wybór skórki BM Clinic">' +
        '  <div class="bm-skin-heading">BM Clinic · Skórki UI</div>' +
        SKINS.map(function (s) {
          return (
            '<button type="button" class="bm-skin-option' +
            (s.id === skinId ? ' is-active' : '') +
            '" data-skin="' +
            s.id +
            '">' +
            '<span style="display:flex;align-items:center;gap:8px;"><span class="bm-skin-swatch" style="background:' +
            s.swatch +
            '"></span>' +
            s.label +
            '</span><span style="font-size:10px;opacity:.65;">' +
            s.tag +
            '</span></button>'
          );
        }).join('') +
        '  <div class="bm-skin-heading" style="margin-top:8px;">Skalowanie UI (Spatial)</div>' +
        '  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:6px;">' +
        '    <button type="button" class="bm-skin-option bm-scale-btn" data-scale="0.9" style="justify-content:center;padding:5px;margin:0;font-size:11px;">90%</button>' +
        '    <button type="button" class="bm-skin-option bm-scale-btn" data-scale="1" style="justify-content:center;padding:5px;margin:0;font-size:11px;">100%</button>' +
        '    <button type="button" class="bm-skin-option bm-scale-btn" data-scale="1.12" style="justify-content:center;padding:5px;margin:0;font-size:11px;">112%</button>' +
        '  </div>' +
        '  <div class="bm-skin-heading" style="margin-top:8px;">Dostępność WCAG (:3024)</div>' +
        '  <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:6px;">' +
        '    <button type="button" id="bm-wcag-contrast-btn" class="bm-skin-option" style="justify-content:center;padding:5px;margin:0;font-size:10px;">Kontrast AAA</button>' +
        '    <button type="button" id="bm-wcag-motion-btn" class="bm-skin-option" style="justify-content:center;padding:5px;margin:0;font-size:10px;">Bez animacji</button>' +
        '  </div>' +
        '  <div class="bm-skin-footer">' +
        '    <a href="/design-studio">Motywy &amp; Studio ↗</a>' +
        '    <a href="/sklep">Sklep ↗</a>' +
        '    <a href="/magazyn">Magazyn ↗</a>' +
        '    <a href="/spatial-3d/">Spatial 3D ↗</a>' +
        '  </div>' +
        '</div>' +
        '<button type="button" id="bm-skin-toggle" class="bm-unified-pill bm-skin-btn" title="Zmień wspólną skórkę BM Clinic">' +
        '  <span class="bm-skin-dot"></span>' +
        '  <span id="bm-skin-current-label">' +
        activeSkin.label +
        '</span>' +
        '</button>';
      document.body.appendChild(dock);

      var toggle = document.getElementById('bm-skin-toggle');
      var menu = document.getElementById('bm-skin-menu');
      if (toggle && menu) {
        toggle.addEventListener('click', function (ev) {
          ev.stopPropagation();
          menu.classList.toggle('hidden');
        });
        menu.querySelectorAll('.bm-skin-option').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var nextSkin = btn.getAttribute('data-skin') || 'obsidian-gold';
            applySkin(nextSkin);
            if (!onHome) {
              if (nextSkin === 'ivory-stone') {
                document.body.classList.remove('bm-dark-surface');
              } else if (
                /dark|bg-navy-950|bg-zinc-950|bg-slate-950/.test(document.body.className) ||
                window.location.pathname.indexOf('/superagent') === 0 ||
        window.location.pathname.indexOf('/voice-builder') === 0 ||
        window.location.pathname.indexOf('/agent-llm') === 0 ||
        window.location.pathname.indexOf('/ruta') === 0 ||
                window.location.pathname.indexOf('/myskincode') === 0 ||
                window.location.pathname.indexOf('/sentinel') === 0
              ) {
                document.body.classList.add('bm-dark-surface');
              }
            }
            menu.classList.add('hidden');
          });
        });
        menu.querySelectorAll('.bm-scale-btn').forEach(function (btn) {
          btn.addEventListener('click', function () {
            applyUiScale(btn.getAttribute('data-scale') || '1');
          });
        });
        var hcBtnEl = document.getElementById('bm-wcag-contrast-btn');
        if (hcBtnEl) {
          hcBtnEl.addEventListener('click', function () {
            try {
              var next = localStorage.getItem(CONTRAST_KEY) === '1' ? '0' : '1';
              localStorage.setItem(CONTRAST_KEY, next);
            } catch (e) {}
            applyWcagFlags();
          });
        }
        var rmBtnEl = document.getElementById('bm-wcag-motion-btn');
        if (rmBtnEl) {
          rmBtnEl.addEventListener('click', function () {
            try {
              var next = localStorage.getItem(MOTION_KEY) === '1' ? '0' : '1';
              localStorage.setItem(MOTION_KEY, next);
            } catch (e) {}
            applyWcagFlags();
          });
        }
        applyWcagFlags();
        document.addEventListener('click', function (ev) {
          if (!dock.contains(ev.target)) menu.classList.add('hidden');
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountUnifiedShell);
  } else {
    mountUnifiedShell();
  }
})();
