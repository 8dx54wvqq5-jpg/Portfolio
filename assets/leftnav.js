(function () {
  if (!window.STUDIES) return;

  var pageLinks = [
    { key: 'home', label: 'Home', href: 'index.html', files: ['index.html', ''] },
    { key: 'work', label: 'Work', href: '/work', files: ['Work.dc.html', 'work'] },
    { key: 'about', label: 'About', href: '/about', files: ['About.dc.html', 'about'] }
  ];

  var caseLinks = window.STUDIES;

  var file = decodeURIComponent((window.location.pathname.split('/').pop() || 'index.html'));

  function isActive(item) {
    return item.files.indexOf(file) !== -1;
  }

  function pageKey() {
    if (caseLinks.some(isActive)) return 'work';
    var active = pageLinks.find(isActive);
    return active ? active.key : '';
  }

  function pageLabel(link) {
    var activeCase = caseLinks.find(isActive);
    if (link.key === 'work' && activeCase) return 'Work / ' + activeCase.short;
    return link.label;
  }

  function pageIcon(key, active) {
    var icons = {
      home: '<path d="M2 5.5 6 2l4 3.5V10H2z"/><path d="M4.5 10V7h3v3"/>',
      work: '<rect x="1.5" y="4" width="9" height="6" rx="1"/><path d="M4 4V2.5A1 1 0 0 1 5 1.5h2A1 1 0 0 1 8 2.5V4"/>',
      about: '<circle cx="6" cy="4" r="2"/><path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4"/>'
    };
    return '<span style="color: ' + (active ? '#155DFC' : '#C9CDD6') + '; display: inline-flex; width: 14px; flex-shrink: 0;"><svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">' + (icons[key] || '') + '</svg></span>';
  }

  function pageRow(link, i) {
    var active = link.key === pageKey();
    var cls = 'ln-row' + (active ? ' ln-active' : ' ln-hover');
    return '<a href="' + link.href + '" class="' + cls + '" style="animation-delay:' + (i * 30) + 'ms; display: flex; align-items: center; gap: 8px; margin: 2px 8px; border-radius: 10px; padding: 8px 12px 8px 14px; text-decoration: none; font-family: Manrope, sans-serif; letter-spacing: -0.01em; color: ' + (active ? '#155DFC' : '#101828') + '; font-size: 13px; font-weight: ' + (active ? '700; background: #EFF6FF;' : '600;') + '">' + pageIcon(link.key, active) + pageLabel(link) + '</a>';
  }

  function caseIcon(active) {
    return '<span style="color: ' + (active ? '#155DFC' : '#C9CDD6') + '; display: inline-flex; width: 12px;"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 1v10M9 1v10M1 3h10M1 9h10"/></svg></span>';
  }

  function caseRow(link, i) {
    var active = isActive(link);
    var delay = 'animation-delay:' + (i * 30) + 'ms;';
    var cls = 'ln-row' + (active ? ' ln-active' : ' ln-hover');
    if (link.nested) {
      return '<a href="' + link.route + '" class="' + cls + '" style="' + delay + ' display: flex; align-items: center; gap: 6px; margin: 1px 8px; border-radius: 10px; padding: 4px 12px 4px 34px; text-decoration: none; font-family: Manrope, sans-serif; letter-spacing: -0.01em; color: ' + (active ? '#155DFC' : '#344054') + '; font-size: 12.5px; font-weight: ' + (active ? '700; background: #EFF6FF;' : '500;') + '"><span style="color: ' + (active ? '#155DFC' : '#C9CDD6') + '; font-size: 10px;">&#8627;</span> ' + link.label + '</a>';
    }
    return '<a href="' + link.route + '" class="' + cls + '" style="' + delay + ' display: flex; align-items: center; gap: 8px; margin: 1px 8px; border-radius: 10px; padding: 6px 12px 6px 14px; text-decoration: none; font-family: Manrope, sans-serif; letter-spacing: -0.01em; color: ' + (active ? '#155DFC' : '#344054') + '; font-size: 12.5px; font-weight: ' + (active ? '700; background: #EFF6FF;' : '500;') + '">' + caseIcon(active) + ' ' + link.label + '</a>';
  }

  function label(text, color) {
    return "<div style=\"font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: " + color + '; padding: 4px 16px 8px;">' + text + '</div>';
  }

  function divider() {
    return '<div style="height: 1px; background: #ECEDF1; margin: 14px 16px;"></div>';
  }

  function drawerHeader() {
    return '<div style="display:flex;align-items:center;gap:10px;padding:0 20px 16px;">' +
      '<div style="width:34px;height:34px;border-radius:50%;background:#155DFC;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;">A</div>' +
      '<div style="min-width:0;">' +
      '<div style="font-family:Fraunces,serif;font-weight:600;font-size:14.5px;letter-spacing:-0.01em;color:#101828;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Abhikant Nirbhavane</div>' +
      '<div style="font-family:Manrope,sans-serif;font-size:11px;color:#9AA0AC;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Senior UX Designer</div>' +
      '</div></div>' +
      '<div style="height:1px;background:#ECEDF1;margin:0 16px 14px;"></div>';
  }

  if (!document.getElementById('ln-hover-css')) {
    var s = document.createElement('style');
    s.id = 'ln-hover-css';
    // [data-nav] covers the per-page SECTIONS/LAYERS rows — their markup carried a
    // made-up style-hover attribute that browsers ignore, so hover never worked
    // there. !important because the scroll-spy writes inline background on rows.
    s.textContent = '.ln-hover{transition:background-color 150ms ease;}.ln-hover:hover{background:#F4F5F7 !important;}[data-nav]:hover{background:#F4F5F7 !important;}' +
      '#ln-burger{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom));width:44px;height:44px;padding:0;border:1px solid #E2E4E9;border-radius:10px;background:#fff;box-shadow:0 4px 14px rgba(17,24,39,.12);display:flex;align-items:center;justify-content:center;z-index:302;color:#364153;cursor:pointer;transition:transform 100ms ease;}' +
      '#ln-burger:active{transform:scale(0.94);}' +
      '#ln-burger span,#ln-burger span:before,#ln-burger span:after{display:block;width:18px;height:2px;background:#364153;border-radius:2px;transition:transform 200ms ease,opacity 150ms ease,background 150ms ease;}' +
      '#ln-burger span{position:relative;}' +
      '#ln-burger span:before,#ln-burger span:after{content:"";position:absolute;left:0;}' +
      '#ln-burger span:before{top:-6px;}#ln-burger span:after{top:6px;}' +
      '#ln-burger.ln-open span{background:transparent;}' +
      '#ln-burger.ln-open span:before{transform:translateY(6px) rotate(45deg);}' +
      '#ln-burger.ln-open span:after{transform:translateY(-6px) rotate(-45deg);}' +
      '#ln-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);opacity:0;visibility:hidden;pointer-events:none;z-index:300;cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:opacity 150ms ease-in,visibility 0s linear 150ms;}' +
      '#ln-drawer{position:fixed;inset:0 auto 0 0;width:280px;max-width:calc(100vw - 48px);height:100vh;height:100dvh;box-sizing:border-box;overflow-y:auto;padding:calc(20px + env(safe-area-inset-top)) 0 calc(20px + env(safe-area-inset-bottom));background:#fff;border-right:1px solid rgba(17,24,39,.06);border-radius:0 20px 20px 0;box-shadow:0 8px 30px rgba(17,24,39,.14),0 2px 8px rgba(17,24,39,.06);transform:translateX(-100%);visibility:hidden;pointer-events:none;z-index:301;transition:transform 150ms ease-in,visibility 0s linear 150ms;}' +
      '#ln-drawer a{position:relative;min-height:44px;box-sizing:border-box;padding-top:12px !important;padding-bottom:12px !important;padding-right:14px !important;font-size:14px !important;line-height:20px;display:flex;align-items:center;transition:transform 100ms ease,background 150ms ease;}' +
      '#ln-drawer a:active{transform:scale(0.97);}' +
      '.ln-row{animation:ln-row-in 280ms cubic-bezier(0.22,1,0.36,1) both;}' +
      '.ln-active{position:relative;}' +
      '.ln-active:before{content:"";position:absolute;left:0;top:50%;width:3px;height:60%;background:#155DFC;border-radius:0 3px 3px 0;transform:translateY(-50%) scaleY(0);animation:ln-bar-in 260ms cubic-bezier(0.22,1,0.36,1) forwards;animation-delay:150ms;}' +
      '#ln-backdrop.ln-open{opacity:1;visibility:visible;pointer-events:auto;transition:opacity 220ms ease-out;}' +
      '#ln-drawer.ln-open{transform:translateX(0);visibility:visible;pointer-events:auto;transition:transform 300ms cubic-bezier(0.22,1,0.36,1);}' +
      '@keyframes ln-row-in{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}' +
      '@keyframes ln-bar-in{to{transform:translateY(-50%) scaleY(1);}}' +
      '@media (min-width:881px){#ln-burger{display:none;}#ln-backdrop,#ln-drawer{display:none;}}' +
      '@media (prefers-reduced-motion:reduce){#ln-backdrop,#ln-drawer,#ln-backdrop.ln-open,#ln-drawer.ln-open,#ln-burger span,#ln-burger span:before,#ln-burger span:after{transition:none;}.ln-row,.ln-active:before{animation:none !important;}}';
    document.head.appendChild(s);
  }

  var drawerOpen = false;
  var previousOverflow = '';

  function drawerHtml() {
    var color = file === 'index.html' ? '#6A7282' : '#9AA0AC';
    return drawerHeader() + label('PAGES', color) + pageLinks.map(pageRow).join('') + divider() +
      label('CASE STUDIES', color) + caseLinks.map(function (l, i) { return caseRow(l, i + pageLinks.length); }).join('');
  }

  function setDrawerOpen(open) {
    var burger = document.getElementById('ln-burger');
    var backdrop = document.getElementById('ln-backdrop');
    var drawer = document.getElementById('ln-drawer');
    if (!burger || !backdrop || !drawer) return;
    // Lock overflowY only: the homepage re-enables mobile scroll via an inline
    // overflowY:auto (its stylesheet body is overflow:hidden for the canvas),
    // and writing the overflow shorthand would wipe that and kill scroll.
    if (open && !drawerOpen) {
      previousOverflow = document.body.style.overflowY;
      document.body.style.overflowY = 'hidden';
    } else if (!open && drawerOpen) {
      document.body.style.overflowY = previousOverflow;
    }
    drawerOpen = open;
    if (open) drawer.innerHTML = drawerHtml();
    burger.setAttribute('aria-expanded', String(open));
    burger.classList.toggle('ln-open', open);
    backdrop.setAttribute('aria-hidden', String(!open));
    backdrop.classList.toggle('ln-open', open);
    drawer.classList.toggle('ln-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
  }

  function ensureMobileNav() {
    var backdrop = document.getElementById('ln-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'ln-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      backdrop.addEventListener('click', function () { setDrawerOpen(false); });
      document.body.appendChild(backdrop);
    }

    var drawer = document.getElementById('ln-drawer');
    if (!drawer) {
      drawer = document.createElement('nav');
      drawer.id = 'ln-drawer';
      drawer.setAttribute('aria-label', 'Site navigation');
      drawer.setAttribute('aria-hidden', String(!drawerOpen));
      drawer.addEventListener('click', function (event) {
        if (event.target.closest('a')) setDrawerOpen(false);
      });
      document.body.appendChild(drawer);
    }

    var burger = document.getElementById('ln-burger');
    if (!burger) {
      burger = document.createElement('button');
      burger.id = 'ln-burger';
      burger.type = 'button';
      burger.setAttribute('aria-label', 'Open navigation');
      burger.setAttribute('aria-controls', 'ln-drawer');
      burger.setAttribute('aria-expanded', String(drawerOpen));
      burger.innerHTML = '<span aria-hidden="true"></span>';
      burger.addEventListener('click', function () { setDrawerOpen(!drawerOpen); });
      document.body.appendChild(burger);
    }

    if (drawerOpen && drawer.children.length === 0) drawer.innerHTML = drawerHtml();
    burger.setAttribute('aria-expanded', String(drawerOpen));
    burger.classList.toggle('ln-open', drawerOpen);
    backdrop.setAttribute('aria-hidden', String(!drawerOpen));
    drawer.setAttribute('aria-hidden', String(!drawerOpen));
    backdrop.classList.toggle('ln-open', drawerOpen);
    drawer.classList.toggle('ln-open', drawerOpen);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && drawerOpen) setDrawerOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 880 && drawerOpen) setDrawerOpen(false);
  });
  // iOS bfcache: swipe-back restores the page frozen mid-state; force the
  // drawer closed and unlock scroll on both leave and restore.
  window.addEventListener('pagehide', function () {
    if (drawerOpen) setDrawerOpen(false);
  });
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      setDrawerOpen(false);
      if (document.body.style.overflowY === 'hidden') document.body.style.overflowY = '';
    }
  });

  function render(mount) {
    var mode = mount.getAttribute('data-leftnav');
    var color = file === 'index.html' ? '#6A7282' : '#9AA0AC';
    var html = label('PAGES', color) + pageLinks.map(pageRow).join('');
    if (mode === 'case') {
      html += divider() + label('CASE STUDIES', color) + caseLinks.map(function (l, i) { return caseRow(l, i + pageLinks.length); }).join('') + divider();
    }
    mount.innerHTML = html;
  }

  function renderAll() {
    // only fill empty mounts so re-renders don't loop (innerHTML write = mutation)
    document.querySelectorAll('[data-leftnav]').forEach(function (m) {
      if (m.children.length === 0) render(m);
    });
  }

  // x-dc (support.js) rebuilds the DOM after this script runs and wipes the
  // injected nav — re-render on every mutation, same pattern as connect.js
  renderAll();
  ensureMobileNav();
  new MutationObserver(function () {
    renderAll();
    ensureMobileNav();
  }).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll);
})();
