# Portfolio — Agent Rules

Shared rules for any AI coding agent (Claude Code, Codex, etc.).
`CLAUDE.md` is a symlink to this file — edit here only.

## Second brain (read first)
This user keeps a shared Notion "second brain" across all AI tools. Before doing portfolio work, fetch the operating hub: `https://app.notion.com/p/3896b635409e81ab861df0657224dcfc` ("🤖 Claude Session Notes") — it has the full rule set (search-before-create, valid Agent tag values, Project Source-of-Truth Index). If you have Notion access and this page exists, read it first. If you save a note there, set the `Agent` property to whichever tool you actually are. If your name isn't a valid option yet, the update will fail loudly — add yourself as a new select option (preserve existing options/colors) rather than picking the closest existing wrong one.

## Structure
- Homepage = `index.html` (the only home page; old `Home*.dc.html` archives were removed).
- Preserve `assets/` folder structure exactly.
- Case studies are `*.dc.html`, rendered by `support.js` (custom x-dc framework).

## Before changes
- Show summary of planned changes. Wait for approval.
- Pull before editing (repo also edited from mobile).

## Before committing
- Verify all internal links resolve.
- Verify all image paths load correctly.
- Run `git status` after changes.
- Ask user before committing.

## After approval
- Commit and push to GitHub `main`.

## Repo
- GitHub: https://github.com/8dx54wvqq5-jpg/portfolio
- Deployed on Vercel (pushes to `main` auto-deploy).
