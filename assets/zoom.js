// Shared image lightbox ("click to expand") for every case study.
// Replaces the per-study inline zoom blocks (was duplicated in DWS/FoodSafety/
// Engage/Banfield, each gated to its own assets/<slug> prefix). One file now,
// generic selector, loaded on every case study page.
//
// Zooms: content screenshots inside #canvas.
// Skips: heroes (-hero), the About avatar (profile), all .svg (heroes/frames/
//        icons), and anything tagged data-no-zoom (manual opt-out, still honored).
// ponytail: opt-out model + filename heuristics, so new screenshots zoom for free
//           with no per-image tagging. Tag data-no-zoom to exclude one.
(function () {
  if (window.__zoomInit) return;            // idempotent: safe if included twice
  if (document.getElementById('img-lightbox')) return; // a page-inline zoom still owns this page
  window.__zoomInit = true;

  var SEL = '#canvas img:not([data-no-zoom]):not([src*="-hero"]):not([src$=".svg"]):not([src*="profile"])';

  // ---- study name for the analytics event (matches "DWS · image zoomed" naming)
  function studyName() {
    var el = document.querySelector('[data-screen-label]');
    if (el) { var v = el.getAttribute('data-screen-label'); if (v) return v.split('/')[0].trim(); }
    return (document.title || 'Case study').split(/[·|—]|\s-\s/)[0].trim();
  }

  // ---- inject styles once
  var css = ''
    + SEL + ' { cursor: zoom-in; }'
    + '.zoom-wrap { position: relative; display: block; width: 100%; }'
    + '.zoom-wrap img { display: block; width: 100%; height: auto; }'
    + '.zoom-badge { position: absolute; top: 10px; right: 10px; z-index: 2; display: inline-flex; align-items: center; justify-content: center; gap: 5px; height: 28px; padding: 0 10px; border-radius: 999px; background: rgba(16,24,40,0.6); color: #fff; font-family: "JetBrains Mono", monospace; font-size: 11px; font-weight: 600; line-height: 1; pointer-events: none; -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); transition: background 0.15s ease; }'
    + '.zoom-wrap:hover .zoom-badge { background: rgba(16,24,40,0.85); }'
    + '.zoom-overlay { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: center; background: rgba(8,9,12,0); opacity: 0; transition: opacity 0.18s ease, background 0.18s ease; pointer-events: none; }'
    + '.zoom-wrap:hover .zoom-overlay { opacity: 1; background: rgba(8,9,12,0.32); }'
    + '.zoom-overlay-label { font-family: "JetBrains Mono", monospace; font-size: 12px; font-weight: 600; color: #fff; background: rgba(16,24,40,0.78); padding: 8px 14px; border-radius: 999px; }'
    + '@media (hover: none) { .zoom-overlay { display: none; } }'
    + '#img-lightbox { position: fixed; inset: 0; z-index: 9999; background: rgba(8,9,12,0.92); display: none; align-items: center; justify-content: center; padding: 32px; opacity: 0; transition: opacity 0.18s ease; }'
    + '#img-lightbox.open { display: flex; opacity: 1; }'
    + '#img-lightbox img { max-width: 96vw; max-height: 92vh; object-fit: contain; border-radius: 8px; box-shadow: 0 24px 64px -16px rgba(0,0,0,0.6); }'
    + '#img-lightbox .lb-close { position: absolute; top: 20px; right: 24px; width: 40px; height: 40px; border-radius: 999px; border: none; background: rgba(255,255,255,0.12); color: #fff; font-size: 20px; cursor: pointer; line-height: 1; }'
    + '#img-lightbox .lb-close:hover { background: rgba(255,255,255,0.22); }';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- inject lightbox once
  var lb = document.createElement('div');
  lb.id = 'img-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image preview');
  lb.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><img alt="">';
  function attach() { (document.body || document.documentElement).appendChild(lb); }
  if (document.body) attach(); else document.addEventListener('DOMContentLoaded', attach);

  var lbImg = lb.querySelector('img');
  var lbClose = lb.querySelector('.lb-close');
  var zoomTracked = false;

  // ---- wrap each zoomable screenshot with hover overlay + persistent badge.
  // idempotent + retried because the x-dc framework renders frames after parse.
  function wrapZoomables() {
    [].forEach.call(document.querySelectorAll(SEL), function (img) {
      if (img.closest('#img-lightbox')) return;
      if (img.parentElement && img.parentElement.classList.contains('zoom-wrap')) return;
      var cs = getComputedStyle(img);
      var radius = cs.borderRadius;
      var wrap = document.createElement('span');
      wrap.className = 'zoom-wrap';
      wrap.style.margin = cs.margin;
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
      img.style.margin = '0';
      var ov = document.createElement('span');
      ov.className = 'zoom-overlay';
      ov.style.borderRadius = radius;
      ov.innerHTML = '<span class="zoom-overlay-label">⤢ Click to expand</span>';
      var badge = document.createElement('span');
      badge.className = 'zoom-badge';
      badge.innerHTML = '⤢ Expand';
      wrap.appendChild(ov);
      wrap.appendChild(badge);
    });
  }
  wrapZoomables();
  if (document.readyState !== 'complete') window.addEventListener('load', wrapZoomables);
  setTimeout(wrapZoomables, 400);
  setTimeout(wrapZoomables, 1200);
  setTimeout(wrapZoomables, 2500);

  function open(src, alt) {
    lbImg.src = src; lbImg.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!zoomTracked) { zoomTracked = true; window.va && window.va('event', { name: studyName() + ' · image zoomed' }); }
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { lbImg.src = ''; }, 200);
  }
  document.addEventListener('click', function (e) {
    var img = e.target && e.target.closest ? e.target.closest(SEL) : null;
    if (img && !lb.contains(img)) { e.preventDefault(); open(img.currentSrc || img.src, img.alt); return; }
    if (e.target === lb || e.target === lbClose) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('open')) close();
  });
})();
