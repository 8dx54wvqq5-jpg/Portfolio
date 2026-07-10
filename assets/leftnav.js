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

  function pageRow(link) {
    var active = link.key === pageKey();
    return '<a href="' + link.href + '" class="' + (active ? '' : 'ln-hover') + '" style="display: flex; align-items: center; gap: 8px; padding: 6px 16px; text-decoration: none; color: ' + (active ? '#155DFC' : '#364153') + '; font-size: 13px; font-weight: ' + (active ? '700; background: #EFF6FF;' : '600;') + '"><span style="font-size: 9px;' + (active ? '' : ' color: #C9CDD6;') + '">' + (active ? '●' : '○') + '</span> ' + pageLabel(link) + '</a>';
  }

  function caseIcon(active) {
    return '<span style="color: ' + (active ? '#155DFC' : '#C9CDD6') + '; display: inline-flex; width: 12px;"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 1v10M9 1v10M1 3h10M1 9h10"/></svg></span>';
  }

  function caseRow(link) {
    var active = isActive(link);
    if (link.nested) {
      return '<a href="' + link.route + '" class="' + (active ? '' : 'ln-hover') + '" style="display: flex; align-items: center; gap: 6px; padding: 4px 16px 4px 34px; text-decoration: none; color: ' + (active ? '#155DFC' : '#4A5565') + '; font-size: 12.5px; font-weight: ' + (active ? '700; background: #EFF6FF;' : '500;') + '"><span style="color: ' + (active ? '#155DFC' : '#C9CDD6') + '; font-size: 10px;">&#8627;</span> ' + link.label + '</a>';
    }
    return '<a href="' + link.route + '" class="' + (active ? '' : 'ln-hover') + '" style="display: flex; align-items: center; gap: 8px; padding: 5px 16px; text-decoration: none; color: ' + (active ? '#155DFC' : '#4A5565') + '; font-size: 12.5px; font-weight: ' + (active ? '700; background: #EFF6FF;' : '500;') + '">' + caseIcon(active) + ' ' + link.label + '</a>';
  }

  function label(text, color) {
    return "<div style=\"font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: " + color + '; padding: 4px 16px 8px;">' + text + '</div>';
  }

  function divider() {
    return '<div style="height: 1px; background: #ECEDF1; margin: 14px 16px;"></div>';
  }

  if (!document.getElementById('ln-hover-css')) {
    var s = document.createElement('style');
    s.id = 'ln-hover-css';
    // [data-nav] covers the per-page SECTIONS/LAYERS rows — their markup carried a
    // made-up style-hover attribute that browsers ignore, so hover never worked
    // there. !important because the scroll-spy writes inline background on rows.
    s.textContent = '.ln-hover:hover{background:#F4F5F7 !important;}[data-nav]:hover{background:#F4F5F7 !important;}' +
      '#ln-burger{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom));width:44px;height:44px;padding:0;border:1px solid #E2E4E9;border-radius:10px;background:#fff;box-shadow:0 4px 14px rgba(17,24,39,.12);display:flex;align-items:center;justify-content:center;z-index:302;color:#364153;cursor:pointer;}' +
      '#ln-burger span,#ln-burger span:before,#ln-burger span:after{display:block;width:18px;height:2px;background:#364153;border-radius:2px;}' +
      '#ln-burger span{position:relative;}' +
      '#ln-burger span:before,#ln-burger span:after{content:"";position:absolute;left:0;}' +
      '#ln-burger span:before{top:-6px;}#ln-burger span:after{top:6px;}' +
      '#ln-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);opacity:0;visibility:hidden;pointer-events:none;z-index:300;cursor:pointer;transition:opacity 150ms ease-in,visibility 0s linear 150ms;}' +
      '#ln-drawer{position:fixed;inset:0 auto 0 0;width:280px;max-width:calc(100vw - 48px);height:100vh;height:100dvh;box-sizing:border-box;overflow-y:auto;padding:calc(20px + env(safe-area-inset-top)) 0 calc(20px + env(safe-area-inset-bottom));background:#fff;box-shadow:8px 0 24px rgba(17,24,39,.16);transform:translateX(-100%);visibility:hidden;pointer-events:none;z-index:301;transition:transform 150ms ease-in,visibility 0s linear 150ms;}' +
      '#ln-drawer a{min-height:44px;box-sizing:border-box;padding-top:12px !important;padding-bottom:12px !important;padding-right:20px !important;font-size:14px !important;line-height:20px;display:flex;align-items:center;}' +
      '#ln-backdrop.ln-open{opacity:1;visibility:visible;pointer-events:auto;transition:opacity 220ms ease-out;}' +
      '#ln-drawer.ln-open{transform:translateX(0);visibility:visible;pointer-events:auto;transition:transform 220ms ease-out;}' +
      '@media (min-width:881px){#ln-burger{display:none;}#ln-backdrop,#ln-drawer{display:none;}}' +
      '@media (prefers-reduced-motion:reduce){#ln-backdrop,#ln-drawer,#ln-backdrop.ln-open,#ln-drawer.ln-open{transition:none;}}';
    document.head.appendChild(s);
  }

  var drawerOpen = false;
  var previousOverflow = '';

  function drawerHtml() {
    var color = file === 'index.html' ? '#6A7282' : '#9AA0AC';
    return label('PAGES', color) + pageLinks.map(pageRow).join('') + divider() +
      label('CASE STUDIES', color) + caseLinks.map(caseRow).join('');
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
      html += divider() + label('CASE STUDIES', color) + caseLinks.map(caseRow).join('') + divider();
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
