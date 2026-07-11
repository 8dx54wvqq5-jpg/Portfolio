// Shared analytics: high-intent clicks + referral attribution.
// Loaded on every page so any utm-tagged link reports back, not just Home/DWS/360.
// Page-specific events (audio played, scrolled to end, image zoomed) stay inline
// in their own pages. Requires the Vercel `window.va` shim (set in <head>).

// high-intent click tracking (once per visit per type)
(function () {
  var fired = {};
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = (a.getAttribute('href') || '').toLowerCase();
    var name = null;
    if (href.indexOf('mailto:') === 0) name = 'Contact · email clicked';
    else if (href.indexOf('linkedin.com') !== -1) name = 'Contact · LinkedIn clicked';
    else if (href.indexOf('resume') !== -1 || href.indexOf('.pdf') !== -1) name = 'Resume · opened';
    if (name && !fired[name]) { fired[name] = 1; window.va && window.va('event', { name: name }); }
  }, true);
})();

// Cross-document View Transitions: cross-fade between same-origin pages, and
// keep the left-nav panel + chat pill pinned (named elements morph in place
// instead of redrawing — Figma "layers panel stays, content swaps" feel).
// Native, no dep. No-ops in browsers without support (normal nav). a11y: off
// under prefers-reduced-motion.
(function () {
  if (document.getElementById('vt-css')) return;
  var s = document.createElement('style');
  s.id = 'vt-css';
  s.textContent = [
    '@view-transition{navigation:auto}',
    '[data-leftnav]{view-transition-name:ln-panel}',
    '#ab-chat-trigger{view-transition-name:chat-pill}',
    '@media (prefers-reduced-motion:reduce){@view-transition{navigation:none}}',
    // Mobile top-bar declutter: the dark toolbar crams desktop-canvas chrome
    // that overflows ~400px screens and clips Connect/nav off the right edge.
    // Hide the decorative bits; keep logo (Home), breadcrumb, Connect, 2 avatars.
    '@media (max-width:880px){',
    '[data-toolmsg]{display:none!important}',                          // Move/Hand/T/Comment tools
    '.presence-av:nth-child(n+3){display:none!important}',             // keep first 2 avatars (you + Abhikant)
    '[data-connect]+div{display:none!important}',                      // zoom % indicator (both pages)
    '#toolbar-center{display:none!important}',                         // homepage "Drafts / … Portfolio" title
    '#toolbar-center+div>div:nth-child(2){display:none!important}',    // homepage "N here now"
    '}',
    // Touch devices fire :hover on tap → hover tooltips stick and leak off the
    // edge ("Reset view" under the logo). Useless on touch; suppress them.
    '@media (hover:none){[data-tip]::after,.presence-av::after{display:none!important}}'
  ].join('');
  document.head.appendChild(s);
})();

// generic engagement: scroll-to-end + time-on-page for every page that
// doesn't already have its own bespoke tracking (DWS/360/AI-Intake keep theirs)
(function () {
  var page = (document.title.split('·')[0] || document.title).trim();
  var start = Date.now();
  var scrolledEnd = false;

  function onScroll() {
    if (scrolledEnd) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0 && window.scrollY / max >= 0.9) {
      scrolledEnd = true;
      window.va && window.va('event', { name: page + ' · scrolled to end' });
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var timeReported = false;
  function reportTime() {
    if (timeReported) return;
    timeReported = true;
    var seconds = Math.round((Date.now() - start) / 1000);
    var bucket = seconds < 10 ? '<10s' : seconds < 30 ? '10-30s' : seconds < 60 ? '30-60s' : seconds < 180 ? '1-3m' : '3m+';
    window.va && window.va('event', { name: page + ' · time on page · ' + bucket, data: { seconds: seconds } });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') reportTime();
  });
  window.addEventListener('pagehide', reportTime);
})();

// referral attribution: ?utm_source=company -> custom event (free on Pro plan)
(function () {
  try {
    var p = new URLSearchParams(location.search);
    var c = (p.get('utm_source') || p.get('c') || '').trim();
    if (!c) return;
    var fire = function () { window.va && window.va('event', { name: 'Referral · ' + c, data: { page: location.pathname } }); };
    if (window.va) fire(); else { var n = 0, t = setInterval(function () { if (window.va || ++n > 20) { clearInterval(t); if (window.va) fire(); } }, 300); }
  } catch (e) {}
})();
