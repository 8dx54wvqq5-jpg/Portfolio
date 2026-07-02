// Section rail: Codex-style tick minimap for case studies.
// Auto-builds from rendered h2/h3 headings — long ticks for h2, short for h3.
// Fixed to the right edge; hover slides out a preview card, click jumps to the
// section, IntersectionObserver drives the active state. Desktop only (>1180px).
(function () {
  if (!document.getElementById('section-rail-css')) {
    var st = document.createElement('style');
    st.id = 'section-rail-css';
    st.textContent = [
      // sits in the gutter between the content column and the fixed 260px meta panel;
      // below 1400px that gutter collapses into the content, so the rail hides
      '#section-rail{position:fixed;right:266px;top:50%;transform:translateY(-50%) translateX(8px);z-index:89;display:flex;flex-direction:column;align-items:flex-end;gap:6px;opacity:0;transition:opacity .3s cubic-bezier(.16,1,.3,1),transform .3s cubic-bezier(.16,1,.3,1);}',
      '#section-rail.sr-in{opacity:1;transform:translateY(-50%) translateX(0);}',
      '.sr-tick{position:relative;display:block;padding:2px 0;border:0;background:none;cursor:pointer;line-height:0;}',
      '.sr-tick::before{content:"";display:block;height:2px;border-radius:1px;background:#C9CDD6;width:10px;transition:background .2s ease,width .2s ease;}',
      '.sr-tick.sr-h2::before{width:18px;}',
      '.sr-tick.sr-past::before{background:#9AA0AC;}',
      '.sr-tick.sr-active::before{background:#155DFC;width:24px;}',
      '.sr-tick:hover::before,.sr-tick:focus-visible::before{background:#155DFC;}',
      '.sr-tick:focus-visible{outline:2px solid #155DFC;outline-offset:2px;}',
      // hover card: slides out left of the tick, JetBrains Mono label like the hint pill
      '.sr-card{position:absolute;right:calc(100% + 12px);top:50%;transform:translateY(-50%) translateX(6px);white-space:nowrap;background:#FFFFFFF2;border:1px solid #C9D6F0;border-radius:8px;padding:7px 11px;font-family:"JetBrains Mono",monospace;font-size:11px;line-height:1;color:#243044;box-shadow:0 8px 22px rgba(16,24,40,0.12);backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s cubic-bezier(.16,1,.3,1);}',
      '.sr-card .sr-idx{color:#155DFC;font-weight:700;margin-right:7px;}',
      '.sr-tick:hover .sr-card,.sr-tick:focus-visible .sr-card{opacity:1;transform:translateY(-50%) translateX(0);}',
      '@media (max-width:1399px){#section-rail{display:none;}}',
      '@media (prefers-reduced-motion:reduce){#section-rail{transition:opacity .3s ease;transform:translateY(-50%);}#section-rail.sr-in{transform:translateY(-50%);}.sr-tick::before,.sr-card{transition:none;}.sr-card{transform:translateY(-50%);}}'
    ].join('');
    document.head.appendChild(st);
  }

  var rail = null;
  var observer = null;
  var builtCount = -1;

  function headings() {
    return Array.prototype.slice.call(document.querySelectorAll('h2, h3')).filter(function (h) {
      return h.textContent.trim() && h.offsetParent !== null;
    });
  }

  function build() {
    var hs = headings();
    if (hs.length < 3 || hs.length === builtCount) return; // too short for a map, or already built
    builtCount = hs.length;

    if (rail) rail.remove();
    if (observer) observer.disconnect();

    rail = document.createElement('nav');
    rail.id = 'section-rail';
    rail.setAttribute('aria-label', 'Page sections');
    var h2i = 0;

    hs.forEach(function (h, i) {
      if (!h.id) h.id = 'sr-sec-' + i;
      h.style.scrollMarginTop = '24px';
      var isH2 = h.tagName === 'H2';
      if (isH2) h2i++;
      var idx = isH2 ? (h2i < 10 ? '0' + h2i : '' + h2i) : '';
      var tick = document.createElement('button');
      tick.type = 'button';
      tick.className = 'sr-tick' + (isH2 ? ' sr-h2' : '');
      tick.setAttribute('aria-label', 'Jump to section: ' + h.textContent.trim());
      tick.innerHTML = '<span class="sr-card">' + (idx ? '<span class="sr-idx">' + idx + '</span>' : '') +
        h.textContent.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>';
      tick.addEventListener('click', function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        h.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        h.setAttribute('tabindex', '-1');
        h.focus({ preventScroll: true });
      });
      tick.dataset.target = h.id;
      rail.appendChild(tick);
    });
    document.body.appendChild(rail);
    requestAnimationFrame(function () { requestAnimationFrame(function () { rail.classList.add('sr-in'); }); });

    // active tick follows reading position: last heading above the viewport's upper third
    var ticks = rail.children;
    function setActive(id) {
      var passed = true;
      for (var i = 0; i < ticks.length; i++) {
        var isTarget = ticks[i].dataset.target === id;
        ticks[i].classList.toggle('sr-active', isTarget);
        if (isTarget) passed = false;
        ticks[i].classList.toggle('sr-past', passed && !isTarget);
      }
    }
    var current = null;
    observer = new IntersectionObserver(function () {
      var best = null;
      for (var i = 0; i < hs.length; i++) {
        if (hs[i].getBoundingClientRect().top <= window.innerHeight * 0.34) best = hs[i];
      }
      var id = best ? best.id : hs[0].id;
      if (id !== current) { current = id; setActive(id); }
    }, { rootMargin: '0px', threshold: [0, 1] });
    hs.forEach(function (h) { observer.observe(h); });
    window.addEventListener('scroll', function () {
      var best = null;
      for (var i = 0; i < hs.length; i++) {
        if (hs[i].getBoundingClientRect().top <= window.innerHeight * 0.34) best = hs[i];
      }
      var id = best ? best.id : hs[0].id;
      if (id !== current) { current = id; setActive(id); }
    }, { passive: true });
    setActive(hs[0].id);
  }

  // x-dc (support.js) renders the page after this script runs — build once
  // headings appear, rebuild if a re-render changes the heading count
  var pending = null;
  function schedule() {
    if (pending) return;
    pending = setTimeout(function () { pending = null; build(); }, 120);
  }
  schedule();
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule);
})();
