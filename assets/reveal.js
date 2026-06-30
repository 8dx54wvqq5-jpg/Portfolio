// Word-by-word scroll reveal for section h2 headings.
// Overrides the existing data-reveal IntersectionObserver for h2 elements only.
(function () {
  function init() {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('h2[data-reveal]').forEach(function (h2) {
      // Prevent existing IntersectionObserver system from also animating this h2
      h2.removeAttribute('data-reveal');
      // Clear any inline styles the IO system already applied
      h2.style.opacity = '';
      h2.style.transform = '';
      h2.style.transition = '';
      h2.style.transitionDelay = '';

      // Split text into word spans, preserving whitespace between them
      var tokens = h2.textContent.trim().split(/(\s+)/);
      h2.innerHTML = tokens.map(function (token) {
        if (/^\s+$/.test(token)) return token;
        return '<span class="rw" style="display:inline-block">' + token + '</span>';
      }).join('');

      gsap.from(h2.querySelectorAll('.rw'), {
        opacity: 0,
        y: 18,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: h2,
          start: 'top 88%',
        }
      });
    });
  }

  // Small delay so x-dc connectedCallback finishes setting up data-reveal IO first,
  // then we take over h2 elements before the user has scrolled.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 60); });
  } else {
    setTimeout(init, 60);
  }
})();
