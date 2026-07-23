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
  // which tracks custom events for free. The insights script replaces
  // window.va when it loads, so wrap whatever va is once loading settles.
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  window.addEventListener('load', function () {
    var orig = window.va;
    window.va = function () {
      try {
        if (arguments[0] === 'event') {
          var a = arguments[1];
          var name = typeof a === 'string' ? a : a && a.name;
          if (name) window.clarity('event', name);
        }
      } catch (e) {}
      return orig.apply(this, arguments);
    };
  });

  // Referral identity: a ?utm_source= or ?c= link stores the company in
  // localStorage (last-touch), so return visits without the tag still get
  // identified, tagged, and upgraded in Clarity. Bare referrers (LinkedIn
  // etc.) only tag the session; no identity is created for them.
  try {
    var p = new URLSearchParams(location.search);
    var src = (p.get('utm_source') || p.get('c') || '').trim().toLowerCase();
    var ref = {};
    try { ref = JSON.parse(localStorage.getItem('ab_ref')) || {}; } catch (e) {}
    if (src) {
      if (ref.source && ref.source !== src) {
        ref.sources = ref.sources || [ref.source];
        if (ref.sources.indexOf(src) === -1) ref.sources.push(src);
        delete ref.role;
        delete ref.campaign;
      }
      ref.source = src;
      if (p.get('utm_content')) ref.role = p.get('utm_content');
      if (p.get('utm_campaign')) ref.campaign = p.get('utm_campaign');
      ref.ts = Date.now();
      if (!ref.device) ref.device = Math.random().toString(36).slice(2, 6);
      localStorage.setItem('ab_ref', JSON.stringify(ref));
    }
    if (ref.source && ref.device) {
      var id = ref.source + '·' + ref.device;
      window.clarity('identify', id, undefined, undefined, id);
      window.clarity('set', 'source', ref.source);
      if (ref.role) window.clarity('set', 'role', ref.role);
      if (ref.campaign) window.clarity('set', 'campaign', ref.campaign);
      if (ref.sources) window.clarity('set', 'sources', ref.sources.join(','));
      window.clarity('upgrade', 'referral');
    } else if (document.referrer) {
      var host = new URL(document.referrer).hostname;
      if (host && host !== location.hostname) window.clarity('set', 'source', host);
    }
  } catch (e) {}
})();
