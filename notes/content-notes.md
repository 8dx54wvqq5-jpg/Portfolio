# Portfolio content notes (extracted from Figma + abhikant.com)

## Identity
- Abhikant Nirbhavane — Senior UX Designer (enterprise SaaS, fintech)
- Positioning: high-stakes enterprise work — disputes, card controls, quoting.
- "I design for environments where getting it wrong has real consequences. Dispute management, card controls, compliance workflows."
- Skills: Product Design • Figma • Enterprise • Design Systems • AI workflows
- Email: abhikant5540@gmail.com — LinkedIn: linkedin.com/in/abhikant
- Resume link: https://resumego.link/abhikant/designer
- Hero image: assets/memoji.png (600×450, opaque black bg memoji portrait — framed as dark card)

## DWS — Disputes Workspace (Fiserv)
- Enterprise app: full credit-card dispute lifecycle (intake → investigation → resolution), designed for 5+ card-issuing banks.
- UX designer on modernization; users: call center agents, fraud analysts, dispute processors, compliance officers.
- Goal: consolidate fragmented dispute tools into one lifecycle workspace while keeping regulatory compliance and introducing AI-assisted intelligence that preserves trust.
- Research constraint: no direct end-user access → stakeholder/SME-driven (PMs, ops leaders, compliance), doc & workflow review.
- Persona insight: "I just want the system to guide me so I don't mess up. I don't have time to look up rules while a customer is on the phone."
- Insights: speed-vs-accuracy trade-off; AI trust requires transparency (no black box — show WHY).
- Iteration story: ML confidence as % ("87% confident") confused users → High/Medium/Low labels + contextual guidance ("High confidence – review and accept").
- Solutions: AI-assisted intake (plain-language description → ML classification + confidence badge); smart validation vs card-network rules (e.g. 60-day filing window); tiered processing + intelligent routing + bulk actions; AI transparency patterns (blue tints, lightbulb icons, always explainable); side-by-side investigation workspace for fraud analysts (collapsible panels, contextual data); role-based experiences w/ one design language.
- Visual design: design system, 50+ components, 12+ core workflows, system font stacks.
- Verified metrics: 4 legacy tools to 1 platform; task steps ↓33% (6 to 4); screens per case ↓37% (8 to 5); navigation depth ↓50% (4 to 2); 2 tool switches removed per dispute action; agents managed 30-50 active cases under FCBA and Reg E deadlines.
- SME-reported needs: analysts needed reasoning before trusting recommendations; processors needed routine cases to move faster without losing accuracy; compliance needed every AI-assisted action to remain traceable and defensible.
- Learnings: enterprise UX is strategic; users are smarter than we think; simple labels > technical accuracy; AI should augment, not replace judgment.
- Would do differently: earlier AI-pattern prototyping; more DS usage docs; deeper competitive analysis of AI UX.

## 360 Control (Fiserv)
- Issuer administration console for commercial card programs: cardholders, spend controls, credit limits, transactions, audit.
- By 2024: legacy wear — no shared UX language, desktop-only, feature-based navigation (IA mirrored system architecture, not user intent). High-risk actions with no safety net.
- Trigger: Desjardins (one of Canada's largest financial co-ops) signed — bilingual FR/EN, custom data fields, branded experience, mobile, hard contractual deadline.
- Role: sole UX designer AND embedded product owner (scope calls: Phase 1 vs Phase 2 without losing UX intent).
- Research: no direct admin access → heuristic eval of legacy, SME sessions, BRD review, support-ticket analysis. Question: "What does an issuer administrator actually do when the system makes this hard?"
- Insights: in financial systems, predictable is trustworthy; Configuration ≠ Operations (biggest IA fix).
- Design system FIRST (before any screen), built on Fiserv's Pixel design language; unified grid pattern across Users/Cards/Transactions/Audit Logs.
- Solutions: intent-based IA (setup vs day-to-day mode); real landing page/dashboard w/ issuer context; end-to-end user & card management redesign w/ wizard flows (Add User / Add Card); "My Cards" for program admins (delegated cards); consolidated spend controls w/ progressive disclosure + impact preview; Business Audit Log in the UI (company/card/user level, filter by action/date/actor); mobile; native Manage AutoPay + Billing Control Accounts; transactions+disputes integration (planned); Desjardins theming + full French.
- Validation: monthly incremental CAT releases w/ real data; adv. spend control issues = medium-severity only; previewing banks showed interest.
- Deliberate NO-AI stance: human-defined authorization strategies, deterministic rules, every outcome traceable. "Not limited by the absence of AI — made more trustworthy by it." Contrast with DWS.
- Impact: Desjardins onboarded on time (contractual obligation met); 360 design system becoming foundation for unified design language across Fiserv Issuer Solutions.
- Learnings: IA > visual decisions; embedded-in-delivery beats handoffs; consider mobile earlier; stakeholder research ≠ watching real users.

## CPQ (Zywave)
- Enterprise Configure-Price-Quote platform for insurance brokers + ops staff.
- Problem: years of feature accretion, no design language; 2–3 week onboarding; workarounds (spreadsheets, sticky notes); confusing errors; support tickets piling.
- Role: only designer; owned end-to-end; weekly design critiques; partnered with PO from day one (roadmap sessions → design briefs).
- Research: broker interviews + contextual inquiry; 6 months analytics; 7 stakeholder workshops.
- Findings: 82% used external spreadsheets (no quote duplication); 12 clicks / 18 min per quote; 28% of quotes had pricing errors (commission logic/validation); key info buried; high learning curve.
- Design system from scratch before screens (was: hardcoded colors, per-screen components).
- Solutions: reduce steps; surface key info without clicks; quote duplication (the #1 request); consistent patterns; responsive for tablet/mobile review.
- Impact: quote time 18 → 10 min; productivity up, training costs down, adoption up; DS = engineering foundation.
- Quote: "Finally! Quote duplication was our #1 request. Now I can create variations for clients in seconds…" — Senior Account Manager.
- Learnings: research first (some assumed problems weren't); critiques keep quality honest; define metrics up front; balance familiarity w/ improvement; engineering input earlier. Would do differently: better decision logs; phased rollout.

## Image assets copied to assets/ (verified contents)
- portrait.jpg — just a blurred gradient, NOT a portrait → use drag-drop image slot for real photo
- hero-product.png 2558x1908 — light dashboard w/ charts ("Welcome to Optis…"), orange accents — good hero shot
- dws-main.png 2560x2314 — DWS "Match Index" document-matching modal w/ doc viewer
- dws-2.png 2556x2048 — DWS main workspace, grid + right context panel (light blue/white)
- dws-3.png 1281x1343 — DWS queue/table screen
- dws-4.png 3200x2912 — DWS component library (buttons, light)
- dws-5.png 3200x2272 — DWS dark component sheet (forms)
- dws-6.png 2017x2454 — DWS components, blue on white
- dws-7.png 1792x1680 — DWS semantic color palette cards
- dws-8.png 1280x1247 — DWS list manager table (green accents)
- c360-1.png 2880x2396 — 360 orange-branded (Desjardins) form screen
- c360-2.png 4096x2072 — dark IA/roles diagram (Cardholders/Fiserv/Issuer/PA)
- c360-3.png 1450x1511 — orange cards + donut chart dashboard
- c360-4.png 1448x2059 — light dashboard w/ bar charts (tall)
- c360-5.png 2880x2302 — green-accent audit-log style table
- c360-6.png 1248x2514 — tall mobile form screen
- c360-7.png 1248x2048 — tall mobile screen
- c360-8.png 1449x1062 — orange-branded table screen
- c360-9.png 2000x1700 — wizard/stepper screen
- c360-10.png 2880x3142 — settings/detail panels (tall)
- c360-11.png 1440x1024 — appears all-black, skip
- CPQ: no images in Figma → use striped placeholders.

## Site design system (the portfolio's own)
- Concept: portfolio as an open design file. Original editor chrome (not any brand's).
- Canvas bg #EDEEF0, frames #FFF, toolbar #15171C, selection blue #155DFC (from his work), text #101828/#364153, mono meta #6A7282, green status #009966.
- Type: Manrope (display/body) + JetBrains Mono (frame labels, meta).
- Pages: Home.dc.html (FINAL — combined: A's editor chrome [toolbar/layers/inspector] + B's spatial pan/zoom canvas; calm entrance ~1.6s, scroll = pan, ⌘/Ctrl+scroll = zoom). Archives: Home A.dc.html, Home B.dc.html. Also Work.dc.html, About.dc.html, DWS.dc.html, 360 Control.dc.html, CPQ.dc.html.
- DWS embeds prototypes/dispute-ai-intake.dc.html — focused interactive AI intake prototype (type a dispute → simulated classification w/ High/Med/Low confidence, "why" reasoning, validation checks, routing, accept/override). Old full-case-study bundle removed.
