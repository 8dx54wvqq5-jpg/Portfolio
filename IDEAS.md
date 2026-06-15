# Portfolio — Ideas & Backlog

Running list of ideas discussed but not yet built (or intentionally deferred).
Pick any of these up later — nothing here is committed to the live site yet.

## Figma-canvas "fun factor" — discussed June 15, 2026

The portfolio is styled as a live Figma file (gray canvas, white frames,
layers panel, minimap, connectors, drifting cursors). Ideas to push the
illusion further and make it more fun to interact with.

### Shipped (already live)
- Named collaborator cursors — "you, probably", "abhikant", "design lead", "recruiter"
- Corner selection handles on frame hover (plus the existing blue outline)
- Live presence indicator in the toolbar (4-avatar stack + pulsing "4 here now" dot)
- Author names on comment pins so they read like real review threads
- Hero: light "cover" frame, memoji orb with bob + mouse parallax, cursor-following glow

### Deferred / to revisit
- **Emoji reactions on frames** — 🔥 / ⭐ stamped at slight angles, as if left by
  reviewers. Skipped for now per preference; revisit if the canvas wants more warmth.
- **Bottom page tabs** — Figma-style page tabs along the bottom edge. Held off
  because pages already live in the left panel (Home / Work / About) and the
  bottom edge is busy (minimap + zoom controls + pan hint). Could still add a
  compact version if we want to reinforce the multi-page feel.

## Visitor multiplayer — "can people actually leave notes & move around like Figma?"

Two levels, very different effort:

1. **Single-player (front-end only, easy):** the visitor's own real cursor leaves
   a trail; notes persist in `localStorage`. Only that visitor ever sees them.
   Low effort, limited payoff.

2. **True multiplayer (needs a backend):** visitors see each other's live cursors
   and shared notes. Browsers can't talk directly, so this needs a hosted realtime
   service. Recommended: **Liveblocks** (purpose-built for multiplayer cursors +
   comments, free tier) — roughly a day of work. Alternatives: Supabase Realtime
   or a small WebSocket server.
   - **Caution:** anonymous notes on a public portfolio invite spam/abuse that
     recruiters would then see. Recommended sweet spot: **Liveblocks with
     ephemeral cursors only (no persisted public notes)** — high cool-factor,
     low risk.

## Animation library (anime.js) — discussed June 15, 2026

- Decided **not** to add for now. The site is a single dependency-free HTML file;
  current animations are a few lines of CSS keyframes each.
- The one case where it'd pay off: **staggered frame-entrance animations** (when
  flying to a case-study frame, elements sequence in with spring physics). If we
  ever want that polish, that's the time to bring in anime.js (or just CSS + JS).

## Left-nav → case study: reduce clicks — discussed June 15, 2026

Today opening a case study takes two clicks: click the case study in the left
layers panel (camera flies to the frame), then click "Open case study →" on the
frame. Brainstormed ways to cut the friction without breaking the Figma metaphor
(in real Figma, clicking a layer selects/navigates to it on canvas — it does not
open a new doc, so the current fly-to-frame is actually on-theme).

Options on the table:
- **Hover `↗ open` shortcut (recommended):** keep left-nav click = fly-to-frame,
  but show a small "↗ open" affordance on hover of each case-study row that jumps
  straight into the case study. Best of both — metaphor preserved + one-click path
  for the impatient.
- **Direct-open swap (raw version):** left-nav case-study item opens the page
  directly. Simplest, but breaks the Figma "layers panel" mental model. Easy to
  trial and revert.
- **Punchier frame CTA:** leave nav as-is, but make the "Open case study →" CTA
  on the frame more obviously clickable (the likely real blocker is discoverability
  of step two, not the existence of step two).

## Misc cleanup
- `heroDrift1/2/3` keyframes in the `<style>` block are now unused (the old
  gradient mesh that referenced them was removed). Harmless dead CSS — clean up
  whenever convenient.
