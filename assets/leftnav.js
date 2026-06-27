(function () {
  var pageLinks = [
    { key: 'home', label: 'Home', href: 'index.html', files: ['index.html', ''] },
    { key: 'work', label: 'Work', href: '/work', files: ['Work.dc.html', 'work'] },
    { key: 'about', label: 'About', href: '/about', files: ['About.dc.html', 'about'] }
  ];

  var caseLinks = [
    { key: 'dispute-workspace', label: 'Disputes Workspace', short: 'DWS', href: '/dispute-workspace', files: ['DWS.dc.html', 'dispute-workspace'] },
    { key: '360-control', label: '360 Control', short: '360 Control', href: '/360-control', files: ['360 Control.dc.html', '360-control'] },
    { key: 'design-system', label: 'Design System', short: 'DS', href: '/design-system', files: ['DS.dc.html', 'design-system'] },
    { key: 'cpq', label: 'CPQ', short: 'CPQ', href: '/cpq', files: ['CPQ.dc.html', 'cpq'] },
    { key: 'food-safety', label: 'Food Safety', short: 'Food Safety', href: '/food-safety', files: ['FoodSafety.dc.html', 'food-safety'] },
    { key: 'engage', label: 'Engage', short: 'Engage', href: '/engage', files: ['Engage.dc.html', 'engage'] },
    { key: 'banfield', label: 'Banfield', short: 'Banfield', href: '/banfield', files: ['Banfield.dc.html', 'banfield'] },
    { key: 'ecocash', label: 'Eco-Cash', short: 'Eco-Cash', href: '/ecocash', files: ['EcoCash.dc.html', 'ecocash'] },
    { key: 'gea', label: 'GEA-Spin', short: 'GEA-Spin', href: '/gea', files: ['GEA.dc.html', 'gea'] },
    { key: 'studytable', label: 'Studytable', short: 'Studytable', href: '/studytable', files: ['Studytable.dc.html', 'studytable'] }
  ];

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
    return '<a href="' + link.href + '" style="display: flex; align-items: center; gap: 8px; padding: 6px 16px; text-decoration: none; color: ' + (active ? '#155DFC' : '#364153') + '; font-size: 13px; font-weight: ' + (active ? '700; background: #EFF6FF;' : '600;') + '"' + (active ? '' : ' style-hover="background: #F4F5F7;"') + '><span style="font-size: 9px;' + (active ? '' : ' color: #C9CDD6;') + '">' + (active ? '●' : '○') + '</span> ' + pageLabel(link) + '</a>';
  }

  function caseIcon(active) {
    return '<span style="color: ' + (active ? '#155DFC' : '#C9CDD6') + '; display: inline-flex; width: 12px;"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 1v10M9 1v10M1 3h10M1 9h10"/></svg></span>';
  }

  function caseRow(link) {
    var active = isActive(link);
    return '<a href="' + link.href + '" style="display: flex; align-items: center; gap: 8px; padding: 5px 16px; text-decoration: none; color: ' + (active ? '#155DFC' : '#4A5565') + '; font-size: 12.5px; font-weight: ' + (active ? '700; background: #EFF6FF;' : '500;') + '"' + (active ? '' : ' style-hover="background: #F4F5F7;"') + '>' + caseIcon(active) + ' ' + link.label + '</a>';
  }

  function label(text, color) {
    return "<div style=\"font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: " + color + '; padding: 4px 16px 8px;">' + text + '</div>';
  }

  function divider() {
    return '<div style="height: 1px; background: #ECEDF1; margin: 14px 16px;"></div>';
  }

  function render(mount) {
    var mode = mount.getAttribute('data-leftnav');
    var color = file === 'index.html' ? '#6A7282' : '#9AA0AC';
    var html = label('PAGES', color) + pageLinks.map(pageRow).join('');
    if (mode === 'case') {
      html += divider() + label('CASE STUDIES', color) + caseLinks.map(caseRow).join('');
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
  new MutationObserver(renderAll).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll);
})();
