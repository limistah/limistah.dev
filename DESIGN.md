# Design System: limistah.dev

Source of truth: `redesign/handoff/README.md` (design handoff, Sep 2026), rendered **dark**.
Implementation: `assets/css/extended/site.css` (`rd-*` classes). `assets/css/extended/ai.css` styles the
four `/ai` shortcodes and is restyled to the same system by overrides in `site.css`.

## Palette — warm neutrals (oklch, hue 90), one accent

| Token | Value | Use |
|---|---|---|
| `--rd-bg` | `oklch(15% 0.004 90)` | page |
| `--rd-bg-raised` | `oklch(17% 0.004 90)` | header, inputs, outline buttons, active segment |
| `--rd-surface` | `oklch(20% 0.005 90)` | cards, pull-quotes, tiles, code blocks |
| `--rd-surface-alt` | `oklch(22% 0.005 90)` | subscribe block, segmented-control track, inline code |
| `--rd-surface-hover` | `oklch(25% 0.005 90)` | tile hover |
| `--rd-border` / `--rd-border-soft` / `--rd-border-input` | `26% / 23% / 31%` | rules, row dividers, inputs |
| `--rd-ink` / `-body` / `-muted` / `-faint` | `93% / 84% / 68% / 56%` | headings · body · secondary · meta/labels |
| `--rd-accent` / `--rd-accent-hover` | `oklch(72% 0.12 260)` / `80%` | links, active TOC item, `›` markers, tier-1 rule |

No shadows. Depth comes from surface tint and hairline borders. Radii: 4 (inline code, pills) · 5/7 (segmented) · 6 (buttons, inputs) · 8 (cards, code) · 9 (pull-quote, callouts) · 10 (subscribe, contact, portrait) · 50% (avatar).

## Type

- **Inter** 400/500/600/700 — everything.
- **JetBrains Mono** 400/500 — wordmark, dates, meta, tags, labels, counts, status, pull-quote, breadcrumbs.
- Scale: 34 (article title) · 32 (page title) · 23/22 (h2) · 17 (lead, article body) · 16 (body) · 15.5 · 15 · 14.5 · 14 · 13.5 · 13 (section label, uppercase, 0.06em) · 12.5 · 12 · 11.5 · 11.
- `text-wrap: pretty` on prose.

## Layout

- Header: non-fixed, wordmark + text nav, inside the page column. Footer (© + Archive · Tags · Search · Uses · RSS) on Home only; other pages end in their own utility strip.
- Columns: **660px** standard · **720px** Library · **700px** long-form articles. Padding `56px 24px 100px` (Home `64px` top).
- Articles ≥1100px: `240px` sticky sidebar (← All writing · kicker · title · *In this post* outline with scroll-tracking) + `48px` gap + `700px` prose; the header widens to match. Below that: the inline *Contents* block.
- Components: segmented control (Writing filter, Library tabs), `1fr auto` hairline rows (lists), `130px 1fr` fact rows (About, Uses), `150px 1fr` topic rows (Library), tiles with counts (Tags, Library resources), cards (community, reading-now).

## Content model

Structured page content lives in `data/*.yaml` (`home`, `now`, `uses`, `about`); prose in `content/*.md`.
`/writing` = posts ∪ essays (one list, one RSS); `/library` = readings + links (`content/links.md` remains the
LinkSync bot's target). Redirects: `/posts` `/essays` → `/writing`; `/readings` `/links` `/resources` → `/library`.

## Interaction

No page transitions, scroll effects or loading states. Filters/tabs are client-side and reflected in the URL (`?type=essay`, `?tab=books`).
