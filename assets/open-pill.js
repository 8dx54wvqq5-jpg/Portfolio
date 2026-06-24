/* "Open ↗" cursor pill — shared component.
   Shows a floating pill near the cursor when hovering anything that
   navigates to a case study: elements with [data-open] or a[data-frame][href].
   Self-injects the pill + styles; works on static HTML and x-dc pages. */
(function () {
  if (!document.getElementById('open-pill-css')) {
    var st = document.createElement('style');
    st.id = 'open-pill-css';
    st.textContent =
      "#open-pill{position:fixed;top:0;left:0;z-index:300;pointer-events:none;display:flex;align-items:center;gap:5px;background:#155DFC;color:#fff;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:0.04em;padding:5px 10px;border-radius:8px;box-shadow:0 6px 20px rgba(21,93,252,0.4);opacity:0;transform:translate(-200px,-200px) scale(0.85);transition:opacity 0.14s ease,transform 0.16s cubic-bezier(0.16,1,0.3,1);white-space:nowrap}" +
      "#open-pill.on{opacity:1}";
    document.head.appendChild(st);
  }

  var pill = null, on = false, raf = 0, x = 0, y = 0;
  function getPill() {
    var p = document.getElementById('open-pill');
    if (!p) {
      p = document.createElement('div');
      p.id = 'open-pill';
      p.innerHTML = 'Open<span style="font-size:12px;line-height:1;">↗</span>';
      (document.body || document.documentElement).appendChild(p);
    }
    return p;
  }
  function apply() { raf = 0; pill.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + (on ? 1 : 0.85) + ')'; }

  document.addEventListener('mousemove', function (e) {
    if (!pill) pill = getPill();
    var hit = e.target.closest ? e.target.closest('a[data-frame][href], [data-open]') : null;
    if (hit) {
      x = e.clientX + 16; y = e.clientY + 18;
      if (!on) { on = true; pill.classList.add('on'); }
      if (!raf) raf = requestAnimationFrame(apply);
    } else if (on) { on = false; pill.classList.remove('on'); }
  }, { passive: true });
  document.addEventListener('mouseleave', function () { if (on && pill) { on = false; pill.classList.remove('on'); } });
})();
