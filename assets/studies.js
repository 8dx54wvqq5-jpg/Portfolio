// Single source of truth for case-study identity.
// When adding a study, also update vercel.json rewrites and sitemap.xml.
window.STUDIES = [
  { key: 'dispute-workspace', file: 'DWS.dc.html', route: '/dispute-workspace', label: 'Disputes Workspace', short: 'DWS', files: ['DWS.dc.html', 'dispute-workspace'], footerLabel: 'case study · disputes workspace' },
  { key: 'ai-dispute-intake', file: 'AI-Dispute-Intake.dc.html', route: '/ai-dispute-intake', label: 'AI-Assisted Dispute Intake', short: 'AI Intake', files: ['AI-Dispute-Intake.dc.html', 'ai-dispute-intake'], footerLabel: 'case study · AI-Assisted Dispute Intake', nested: true },
  { key: '360-control', file: '360 Control.dc.html', route: '/360-control', label: '360 Control', short: '360 Control', files: ['360 Control.dc.html', '360-control'], footerLabel: 'case study · 360 control' },
  { key: 'design-system', file: 'DS.dc.html', route: '/design-system', label: 'Design System', short: 'DS', files: ['DS.dc.html', 'design-system'], footerLabel: 'case study · design system' },
  { key: 'cpq', file: 'CPQ.dc.html', route: '/cpq', label: 'CPQ', short: 'CPQ', files: ['CPQ.dc.html', 'cpq'], footerLabel: 'case study · cpq' },
  { key: 'food-safety', file: 'FoodSafety.dc.html', route: '/food-safety', label: 'Food Safety', short: 'Food Safety', files: ['FoodSafety.dc.html', 'food-safety'], footerLabel: 'case study · food safety · logile' },
  { key: 'engage', file: 'Engage.dc.html', route: '/engage', label: 'Engage', short: 'Engage', files: ['Engage.dc.html', 'engage'], footerLabel: 'case study · engage · photon × follett' },
  { key: 'banfield', file: 'Banfield.dc.html', route: '/banfield', label: 'Banfield', short: 'Banfield', files: ['Banfield.dc.html', 'banfield'], footerLabel: 'case study · banfield · photon' },
  { key: 'ecocash', file: 'EcoCash.dc.html', route: '/ecocash', label: 'Eco-Cash', short: 'Eco-Cash', files: ['EcoCash.dc.html', 'ecocash'], footerLabel: 'case study · eco-cash' },
  { key: 'gea', file: 'GEA.dc.html', route: '/gea', label: 'GEA-Spin', short: 'GEA-Spin', files: ['GEA.dc.html', 'gea'], footerLabel: 'case study · gea-spin' },
  { key: 'studytable', file: 'Studytable.dc.html', route: '/studytable', label: 'Studytable', short: 'Studytable', files: ['Studytable.dc.html', 'studytable'], footerLabel: 'case study · studytable' }
];
