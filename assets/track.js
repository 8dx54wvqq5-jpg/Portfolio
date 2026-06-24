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
