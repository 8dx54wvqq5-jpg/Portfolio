/* Connect dropdown — shared component.
   Mount anywhere with: <span data-connect></span>
   Edit links/markup here once; every page picks it up.
   Works with static HTML and x-dc (support.js) re-renders. */
(function () {
  var LINKS = [
    { href: 'mailto:abhikant5540@gmail.com?subject=Hi%20there', icon: '✉', label: 'Email me' },
    { href: 'https://www.linkedin.com/in/abhikant', icon: 'in', label: 'LinkedIn', external: true, bold: true },
    { href: 'https://resumego.link/abhikant/designer', icon: '⤓', label: 'Resume', external: true }
  ];

  // one-time hover styles
  if (!document.getElementById('connect-css')) {
    var st = document.createElement('style');
    st.id = 'connect-css';
    st.textContent =
      // interaction-design skill: spring hover-lift + tactile tap
      '.connect-btn{transition:transform .15s cubic-bezier(0.34,1.56,0.64,1),background .15s ease;}' +
      '.connect-btn:hover{background:#2B70FF;transform:translateY(-1px) scale(1.02)}' +
      '.connect-btn:active{transform:scale(0.97)}' +
      '.connect-menu a{transition:background .12s ease}' +
      '.connect-menu a:hover{background:#2A2E37}' +
      '@media (prefers-reduced-motion: reduce){.connect-btn{transition:background .15s ease}.connect-btn:hover,.connect-btn:active{transform:none}}';
    document.head.appendChild(st);
  }

  function menuHTML() {
    return LINKS.map(function (l) {
      var ext = l.external ? ' target="_blank" rel="noopener"' : '';
      var iconStyle = 'width:16px;text-align:center;' + (l.bold ? 'font-weight:800;' : '');
      return '<a href="' + l.href + '"' + ext +
        ' style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:6px;color:#E7E9EE;text-decoration:none;font-size:13px;">' +
        '<span style="' + iconStyle + '">' + l.icon + '</span>' + l.label + '</a>';
    }).join('');
  }

  function fill(wrap) {
    if (wrap.getAttribute('data-connect-ready')) return;
    wrap.setAttribute('data-connect-ready', '1');
    wrap.style.position = 'relative';
    wrap.innerHTML =
      '<div class="connect-btn" style="background:#155DFC;color:#fff;font-size:12.5px;font-weight:700;padding:7px 14px;border-radius:6px;cursor:pointer;display:flex;align-items:center;gap:6px;">Connect <span style="font-size:9px;opacity:0.85;">▾</span></div>' +
      '<div class="connect-menu" style="position:absolute;top:38px;right:0;background:#15171C;border:1px solid #2A2E37;border-radius:8px;padding:6px;min-width:184px;box-shadow:0 12px 32px rgba(0,0,0,0.45);display:none;flex-direction:column;gap:2px;z-index:200;">' +
      menuHTML() + '</div>';
  }

  function scan() {
    var nodes = document.querySelectorAll('[data-connect]');
    for (var i = 0; i < nodes.length; i++) fill(nodes[i]);
  }

  // delegated toggle — survives x-dc re-render
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var btn = e.target.closest('.connect-btn');
    var menus = document.querySelectorAll('.connect-menu');
    if (btn) {
      e.stopPropagation();
      var menu = btn.parentNode.querySelector('.connect-menu');
      var open = menu.style.display === 'flex';
      for (var i = 0; i < menus.length; i++) menus[i].style.display = 'none';
      menu.style.display = open ? 'none' : 'flex';
      return;
    }
    if (!e.target.closest('[data-connect]')) {
      for (var j = 0; j < menus.length; j++) menus[j].style.display = 'none';
    }
  });

  scan();
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
})();
