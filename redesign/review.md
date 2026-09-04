# limistah.dev — Reviewing the new design handoff against what's already in the repo

## TL;DR

The new handoff ("Website layout research.zip") is a strong **information-architecture** redesign — it should be adopted. Its **visual system** (light, warm-neutral oklch palette) shouldn't be — you said we're staying dark. The good news: the two are separable. The handoff's layout geometry, typography scale, spacing, and component shapes are specified independently of color, so they port cleanly onto a dark palette. Below is what's actually live today, what the new handoff changes, and a proposed dark re-skin of it.

## What's actually live vs. what's just sitting in the repo as docs

Your repo currently has **three** design documents, and only one of them matches the live site:

| Doc | Palette | Status |
|---|---|---|
| `DESIGN.md` — "Drenched dark" | Near-black bg, green/cyan/amber accents, JetBrains Mono + Space Grotesk + Lora | **Live.** `layouts/partials/header.html` uses its `lm-*` class names; `config.yml` sets `defaultTheme: dark`, `disableThemeToggle: true`. |
| `design-system.md` — "Geometric Minimalism" | Off-white/near-black toggle, orange primary + blue accent, Archivo + Space Grotesk | **Not implemented.** No `--color-primary`/orange anywhere in `layouts/`, and the toggle it assumes contradicts `disableThemeToggle: true`. Looks like an earlier, abandoned exploration. |
| New handoff (this zip) | Off-white bg, warm-neutral oklch(hue 90), single blue accent, Inter + JetBrains Mono | New. Light, and per your note we're not taking the palette as-is. |

Worth doing regardless of what you decide below: **retire `design-system.md`**, or clearly mark it superseded. Three "the design system is X" documents where only one is true is exactly the kind of thing that causes someone (me included) to implement against the wrong one later.

One more thing the AI page tells us: your current `content/ai.md` already renders through four custom shortcodes — `ai-decision-tree`, `ai-workflow-stages`, `ai-opencode-setup`, `ai-hermes-pipeline`. Those are the *exact* four custom blocks the new handoff's AI page spec calls for (decision tree, pipeline stages, OpenCode config block, Hermes loop). You've effectively already built this page once. Re-skinning is real work; re-architecting it is not.

## What the new handoff actually changes (the part worth keeping)

This is an IA and content-strategy redesign more than a visual one:

- **Collapses 11 top-level surfaces into 6**: `Log · Writing · AI · Library · Now · About`. Today's nav is `Now, Essays, Readings, Links, AI, Search` (six menu items, but `posts/`, `about/`, `archive/` exist unlinked in nav too — closer to the "eleven-plus" the handoff describes).
- **Adds a Log** — dated, short-form entries — as "the reason to return," surfaced on the homepage above everything else. This doesn't exist on the site today (`content/journals/raft.md` is the closest thing, and it's a single one-off post, not a running log).
- **Merges Posts + Essays → Writing.** You have 57 published posts + 12 essays = **69 pieces**, which matches the handoff (60 post *files* exist, but three are drafts/unpublished). Any real count needs to be computed at build time either way, so this is a one-line fix, not a design problem.
- **Merges Readings + Links → Library**, with tabs (All / Books & papers / Resources) and derived resource counts. Your `content/links.md` is a real, actively-maintained page (244 lines, categorized, `lastmod: 2026-09-03`, has a "sync from LinkSync extension" bot committing to it regularly per your git log) — the Library page needs to either render that structure directly or your link-sync automation needs a new target. That's the one piece of this migration with real engineering risk, everything else is template work.
- **Splits Now → Now + Uses.** Your current `content/now.md` (115 lines) mixes gear/workspace, focus, projects, reading, and a marital-status/emigration section — exactly the "reads as a private file" problem the handoff calls out. The Now/Uses split is a legitimate improvement independent of color.
- **Trims About.** Handoff assumes "seven paragraphs → three." Your live `content/about.md` is already only 27 lines, so this specific complaint may be describing an older version of the page than what's live now — worth a quick diff before assuming About needs work.
- **Retires `/resources`** (you don't currently have this as a separate page — may already be moot), **demotes** `/tags`, `/archive`, `/search` to footer/utility links instead of top nav.

## Proposed: the new layout, dark

Rather than treating "light handoff" vs. "dark DESIGN.md" as a fork, map the new component geometry onto your existing dark tokens:

| New handoff token (role) | Light value | Dark equivalent (from `DESIGN.md`) |
|---|---|---|
| `bg` (page background) | `oklch(98% 0.003 90)` | `--bg-primary #0a0a0b` |
| `bg-raised` (header, inputs) | `oklch(99% 0.003 90)` | `--bg-primary` or a hair lighter, e.g. `#0d0d0f` |
| `surface` (cards, pull-quote) | `oklch(96% 0.004 90)` | `--bg-secondary #131316` |
| `surface-alt` / `surface-hover` | `oklch(95%)` / `oklch(93%)` | `--bg-tertiary #1a1a1f` |
| `border` / `border-soft` | `oklch(91-92%)` | `--border-color #27272a` |
| `ink` (headings, primary button bg) | `oklch(22% 0.006 90)` | `--text-primary #f4f4f5` (inverted role: dark bg means "ink" becomes the light foreground) |
| `ink-body` / `ink-muted` / `ink-faint` | `oklch(26-60%)` | `--text-secondary #a1a1aa` / `--text-tertiary #71717a` |
| `accent` / `accent-hover` | `oklch(45%/38% 0.14 260)` blue | `--accent-cyan oklch(0.7 0.12 195)` (closest existing role: links/interactive) |

Everything else in the handoff — the 660/720/700px containers, the JetBrains Mono + Inter pairing (swap Inter for your existing Space Grotesk, or adopt Inter; both are geometric sans, low-risk swap), the spacing scale, the radius scale, the "no shadows, depth from surface tint" rule, the day-row/grid geometry for Log, the segmented-control filter pattern, the decision-tree tier ramp — all of that is color-agnostic and can be built as specified. The tier-ramp on the AI page's decision tree (4 steps of decreasing chroma) is described in blue; it'd map to a green or cyan ramp using your existing `--accent-green`/`--accent-cyan` to stay inside your two-accent system rather than introducing a third hue.

One real decision: the handoff is emphatic about **one accent, one hue** ("Do not introduce a second accent color"). Your live dark system uses **three** (green primary, cyan links, amber highlights). Keep three if you want the existing site's personality intact; drop to one if you want the new handoff's minimalism intact. I'd lean toward keeping green + cyan (two, not three) — amber shows up in exactly one role (blockquote borders) in your current CSS, easy to fold into the surface-tint system instead — but this is a call for you, not something the docs settle on their own.

## What this migration actually costs, roughly

| Piece | Effort | Why |
|---|---|---|
| Global shell, typography, tokens | Small | Mostly a CSS variable re-map onto existing dark values; header/nav already has working active-state logic to extend to 6 items. |
| AI page | Small | Shortcodes already exist; this is a re-skin + prose trim, not a rebuild. |
| Now / Uses split | Small–Medium | Content already exists in `now.md`, needs splitting and two new templates (you have `layouts/_default/now.html` as a starting point). |
| Writing (merge posts+essays) | Medium | New list template with client-side segmented filter; straightforward Hugo taxonomy/section work. |
| Library (merge readings+links) | Medium–Large | Needs the tab UI *and* a decision on how `content/links.md`'s 244 lines (actively bot-updated) becomes structured data the new template can tab/count against, rather than one long markdown page. |
| Log | Large | New content type from scratch, front matter schema, month-grouping + tag-filter behavior, **and** an actual writing habit to populate it — the handoff is explicit that every entry shown is currently invented. |
| Redirects | Small | `/posts`, `/essays` → `/writing`; `/readings`, `/links` → `/library`; `/ai` unchanged. Hugo aliases handle this natively. |

Log is the long pole — not because the template is hard, but because it's the one piece that needs a content habit behind it, not just a build.

## Open questions before anything gets built

1. **Two-accent or one?** (green+cyan vs. collapsing to one, per above.)
2. **Font pairing:** keep Space Grotesk + Lora, or adopt the handoff's Inter? (JetBrains Mono stays either way — both systems agree on it for dates/labels/code.)
3. **Library data model:** does `content/links.md` get restructured into per-item front matter (so counts/tabs derive automatically, per the handoff's own recommendation), or does the new template parse the existing markdown structure? This is the one place where saying "adopt the new IA" has a real data-migration decision hiding inside it.
4. **Log cadence:** is this something you'll actually keep up ("most weekdays," per the handoff's footer copy), or should the design assume a lighter cadence? Worth deciding before the template locks in a "days with no entries" empty-state pattern.
5. **`design-system.md`:** delete, or keep as an archived/rejected exploration for the record?

Happy to turn any of this into an actual implementation plan — Hugo layouts, the token remap as real CSS, and a content migration checklist — once you've called the open questions above.
