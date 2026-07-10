(function () {
  var caseLabels = {
    'DWS.dc.html': 'case study · disputes workspace',
    'dispute-workspace': 'case study · disputes workspace',
    'AI-Dispute-Intake.dc.html': 'case study · AI-Assisted Dispute Intake',
    'ai-dispute-intake': 'case study · AI-Assisted Dispute Intake',
    '360 Control.dc.html': 'case study · 360 control',
    '360-control': 'case study · 360 control',
    'CPQ.dc.html': 'case study · cpq',
    'cpq': 'case study · cpq',
    'DS.dc.html': 'case study · design system',
    'design-system': 'case study · design system',
    'Banfield.dc.html': 'case study · banfield · photon',
    'banfield': 'case study · banfield · photon',
    'EcoCash.dc.html': 'case study · eco-cash',
    'ecocash': 'case study · eco-cash',
    'Engage.dc.html': 'case study · engage · photon × follett',
    'engage': 'case study · engage · photon × follett',
    'FoodSafety.dc.html': 'case study · food safety · logile',
    'food-safety': 'case study · food safety · logile',
    'GEA.dc.html': 'case study · gea-spin',
    'gea': 'case study · gea-spin',
    'Studytable.dc.html': 'case study · studytable',
    'studytable': 'case study · studytable'
  };

  var file = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
  var standardStyle = "display: flex; justify-content: space-between; margin-top: 24px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #9AA0AC;";

  function row(style, label) {
    return '<div style="' + style + '"><span>© 2026 Abhikant Nirbhavane</span><span>' + label + '</span></div>';
  }

  function html(mode) {
    if (mode === 'case') return row(standardStyle, caseLabels[file] || 'case study');
    if (mode === 'work') return row(standardStyle.replace('24px', '8px'), '11 case studies · more in the archive on request');
    if (mode === 'about') return row(standardStyle, 'about · designed as an open canvas');
    if (mode === 'home') {
      return '<div style="background: #EDEEF0; padding: 16px 22px; display: flex; justify-content: space-between; align-items: center; font-family: \'JetBrains Mono\', monospace; font-size: 10px; color: #6A7282;"><span>© 2026 Abhikant Nirbhavane</span><a href="index.html" onclick="document.getElementById(\'mobile-view\').style.display=\'none\';document.getElementById(\'viewport\').style.display=\'block\';" style="color: #155DFC; text-decoration: none; font-size: 10px;">desktop view →</a></div>';
    }
    return '';
  }

  function renderAll() {
    document.querySelectorAll('[data-footer]').forEach(function (mount) {
      if (mount.children.length === 0) mount.innerHTML = html(mount.getAttribute('data-footer'));
    });
  }

  renderAll();
  new MutationObserver(renderAll).observe(document.documentElement, { childList: true, subtree: true });
})();
