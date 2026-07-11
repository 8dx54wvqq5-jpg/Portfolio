(function () {
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r);
    t.async = 1;
    t.src = '/api/clarity/www/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', 'xjjno0k0vd');

  // Vercel Hobby drops custom va() events, so mirror them into Clarity,
  // which tracks custom events for free. Keep queueing for Vercel unchanged.
  window.va = function () {
    (window.vaq = window.vaq || []).push(arguments);
    try {
      if (arguments[0] === 'event') {
        var a = arguments[1];
        var name = typeof a === 'string' ? a : a && a.name;
        if (name) window.clarity('event', name);
      }
    } catch (e) {}
  };

  // Tag the session with its traffic source so replays can be filtered
  // (e.g. only visitors arriving from LinkedIn).
  try {
    var source = new URLSearchParams(location.search).get('utm_source');
    if (!source && document.referrer) {
      var ref = new URL(document.referrer).hostname;
      if (ref && ref !== location.hostname) source = ref;
    }
    if (source) window.clarity('set', 'source', source);
  } catch (e) {}
})();
