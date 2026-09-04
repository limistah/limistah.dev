# Handoff: limistah.dev Redesign

## Overview

A full information-architecture and visual redesign of `limistah.dev` (Aleem Isiaka's personal site, currently Hugo + PaperMod). The redesign collapses eleven overlapping pages into **five intent-based sections** and introduces a **daily Log** as the site's cadence engine.

The positioning shift: away from a recruiter-facing portfolio ("Featured Work", stats, Download CV) toward a **practitioner-follow site** — someone the Go/CNCF/AI-infrastructure community returns to. Community and speaking sit above project cards; a dated log sits above everything else.

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes showing intended layout, typography, and behavior. They are **not production code to copy directly**.

The site currently runs **Hugo with the PaperMod theme**. The task is to recreate these designs as Hugo layouts, partials, and content types in that existing environment — using Hugo's templating, front matter, taxonomies, and asset pipeline. Do **not** port the HTML verbatim; translate each page into the appropriate Hugo layout and reuse existing site plumbing (RSS, search, tags, archive) where it already works.

If a different stack is chosen, implement equivalently using that framework's conventions.

## Fidelity

**High-fidelity.** Colors, typography, spacing, and interaction states are final and specified below. Recreate pixel-accurately.

Two caveats:
- **Copy is real** where sourced from the live site or Aleem's CV. **Log entries and resource counts are placeholder** — clearly marked below.
- **Portrait and imagery are placeholder slots** (striped fills with monospace labels). Real assets exist on the current site (`/assets/aleem-isiaka.png`).

---

## Information Architecture

### Before (current site)
```
Home  About  Now  Posts  Essays  Readings  Links  AI  Resources  Tags  Archive  Search
```
Eleven-plus surfaces; three pages restate the bio; six surfaces hold reading material; `Now` mixes gear, marital status, education, and project plans.

### After (this redesign)
```
Log    Writing    AI    Library    Now    About
```

| New page | Absorbs | Rationale |
|---|---|---|
| **Log** | *(new)* | Dated running entries. The reason to return; feeds the homepage. |
| **Writing** | Posts + Essays | One archive, one RSS, one filter (All / Technical / Essays). |
| **AI** | AI (kept, redesigned) | Long-form piece on his actual AI workflow. **Correction:** an earlier draft of this audit folded `/ai` into Library on the assumption it was a link list. It is not — it is the single strongest page on the site and stays top-level. |
| **Library** | Readings + Links | Curated study material in one place — genuinely rare, currently split two ways. |
| **Now** | Now (trimmed) | Current focus, projects, learning, reading, community, life. |
| **About** | About (tightened 7 paragraphs → 3) | Bio, credentials, contact. |

**Retire:** `/resources` (duplicate of `/links`).
**Demote to utilities:** `/tags`, `/archive`, `/search` — linked from Writing and the footer, not top nav.
**Split out:** `/uses` — desk, gear, and tech stack, extracted from the old Now page. Designed; see section 7.

---

## Global Shell

Applies to every page.

### Layout
- Sticky-less `<header>`, full-width, `background: oklch(99% 0.003 90)`, `border-bottom: 1px solid oklch(91% 0.004 90)`.
- Header inner container: `max-width: 660px` (Library uses `720px`), centered, `padding: 18px 24px`, flex row, `justify-content: space-between`, `align-items: center`, `gap: 16px`, `flex-wrap: wrap`.
- Page body container: `max-width: 660px` (Library `720px`), centered, `padding: 56px 24px 100px` (Home: `64px 24px 100px`), `box-sizing: border-box`.
- Page background: `oklch(98% 0.003 90)`.

### Wordmark
`limistah.dev` — JetBrains Mono, `14.5px`, `font-weight: 500`, `color: oklch(22% 0.006 90)`. Links to Home.

### Nav
Flex row, `gap: 18px`, `flex-wrap: wrap`, `font-size: 14.5px`.
- Inactive: `color: oklch(45% 0.006 90)`, `font-weight: 400`
- Active: `color: oklch(22% 0.006 90)`, `font-weight: 600`

### Section heading (used on every page)
`font-size: 13px`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.06em`, `color: oklch(50% 0.006 90)`, `margin: 0 0 12-16px`.

### Page title (h1)
`font-size: 32px` (Home: `22px` — Home's h1 is the name, not a page title), `font-weight: 700`, `letter-spacing: -0.015em`.

### Row divider
`border-bottom: 1px solid oklch(92% 0.004 90)` on list rows; `oklch(91% 0.004 90)` on section rules and footers.

---

## Screens

### 1. Home (`Home.dc.html`)

**Purpose:** Establish who Aleem is in one sentence, then prove momentum (log), standing (community), and output (writing) — in that order.

**Section order — this order is the design decision. Do not rearrange.**

1. **Identity** — 60×60px circular avatar (placeholder: 45° repeating stripe, `oklch(90% 0.004 90)` / `oklch(94% 0.004 90)`, 4px bands) + name (`22px/600`, `letter-spacing: -0.01em`) + role line (`14.5px`, `oklch(50% 0.006 90)`): "Senior Engineer, Cloud & Distributed Systems · Lagos, Nigeria". Flex row, `gap: 16px`.
   - **Note on the role line:** it deliberately states scope, not a target level. Earlier drafts named a target seniority; that was removed at Aleem's request. Keep it out.
2. **Thesis** — `17px/1.65`, `oklch(28% 0.006 90)`: "I remove the magic from systems — showing how cloud infrastructure, distributed systems, and AI tooling actually work from the inside."
3. **Bio paragraph** — `15.5px/1.7`, `oklch(42% 0.006 90)`, with inline links to Kredete and GopherCon Africa.
4. **Social row** — flex, `gap: 16px`, `14.5px`: X / Twitter · GitHub · LinkedIn · Email · RSS. `margin-bottom: 44px`.
5. **Log** — heading row (label + "Full log →" at `13.5px`), sub-line "What I'm building and learning, newest first." (`13.5px`, `oklch(54% 0.006 90)`), then 5 day rows.
   - Day row: `display: grid; grid-template-columns: 76px 1fr; gap: 16px; padding: 12px 0`.
   - Date cell: JetBrains Mono `12.5px`, `oklch(58% 0.006 90)`, `white-space: nowrap`, `padding-top: 2px`.
   - Entries: flex column, `gap: 8px`; each `14.5px/1.6`, `oklch(30% 0.006 90)`, `text-wrap: pretty`.
6. **Community & speaking** — grid, `gap: 12px`. Each card: `padding: 14px 16px`, `background: oklch(96% 0.004 90)`, `border-radius: 8px`. Inside: name (`15px/600`, link) + role (JetBrains Mono `12px`, `oklch(56% 0.006 90)`, right-aligned, `nowrap`) on a baseline-aligned space-between row; description below (`13.5px/1.55`, `oklch(46% 0.006 90)`, `margin-top: 5px`).
   - **Placement is intentional:** community sits *above* Writing. This is the shift from "hire me" to "follow me."
7. **Writing** — heading row + "All 69 pieces →". 4 rows, `grid-template-columns: 1fr auto`, `gap: 16px`, `padding: 11px 0`. Title `15px` link; meta line JetBrains Mono `11.5px`, `oklch(58% 0.006 90)`, `margin-top: 4px`; date right cell JetBrains Mono `12.5px`.
   - **Must render newest-first.** Mixed technical + essay content in one list.
8. **Now at a glance** — heading row + "More →". Grid: `repeat(auto-fit, minmax(180px, 1fr))`, `gap: 18px`. Each cell: label (JetBrains Mono `11.5px`, uppercase, `letter-spacing: 0.05em`, `oklch(58% 0.006 90)`) + value (`14px/1.55`, `oklch(30% 0.006 90)`). Four cells: Working on / Learning / Reading / Building.
9. **Subscribe** — `padding: 22px`, `background: oklch(95% 0.004 90)`, `border-radius: 10px`. Heading `16px/600`; body `14px/1.6`, `oklch(42% 0.006 90)`; then flex row `gap: 8px`: email input (`flex: 1`, `min-width: 190px`, `padding: 10px 12px`, `14px`, `border: 1px solid oklch(86% 0.004 90)`, `border-radius: 6px`, `background: oklch(99% 0.003 90)`) + submit button (`padding: 10px 18px`, `14px/500`, `border-radius: 6px`, `background: oklch(22% 0.006 90)`, `color: oklch(98% 0.003 90)`; **hover** `background: oklch(32% 0.006 90)`).
10. **Footer** — `margin-top: 56px`, `border-top: 1px solid oklch(91% 0.004 90)`, `padding-top: 20px`. Space-between: copyright (`13px`, `oklch(56% 0.006 90)`) + utility links (Archive · Tags · Search · Uses, same size/color).

**Real content on this page:** Kredete role, GopherCon Africa co-organizing, CNCF contributions (Kubernetes/Prometheus/Jaeger), ObjectSpread, post titles and dates, Now values (all sourced from the live site + CV).
**Placeholder:** the five Log entries. **"All 69 pieces"** = 57 posts + 12 essays; recompute if counts change.

---

### 2. Log (`Log.dc.html`)

**Purpose:** The cadence engine. Short dated entries — what got built, broken, learned. Explicitly *not* a commit log.

**Layout**
- Title `32px/700`; intro `16px/1.65`, `oklch(45% 0.006 90)`, `max-width: 56ch`.
- **Filter bar** — space-between row, `padding-bottom: 20px`, `border-bottom: 1px solid oklch(91% 0.004 90)`:
  - Tag buttons (left): flex wrap, `gap: 7px`. Each: JetBrains Mono `12px`, `padding: 5px 10px`, `border-radius: 5px`, `border: 1px solid oklch(89% 0.004 90)`, `background: oklch(99% 0.003 90)`, `color: oklch(42% 0.006 90)`, rendered as `#tagname`. **Hover:** `border-color: oklch(45% 0.14 260)`, `color: oklch(45% 0.14 260)`.
  - Count (right): JetBrains Mono `12px`, `oklch(58% 0.006 90)` — "N entries", or "N entries · #tag" when filtered.
- **Month group** — `padding-top: 28px`. Month heading: JetBrains Mono `12px`, uppercase, `letter-spacing: 0.08em`, `oklch(58% 0.006 90)` (e.g. "SEPTEMBER 2026").
- **Day row** — `grid-template-columns: 76px 1fr`, `gap: 16px`, `padding: 14px 0`, bottom divider. Date cell JetBrains Mono `12.5px`, `padding-top: 3px`. Entries flex column `gap: 12px`.
- **Entry** — text `15px/1.62`, `oklch(28% 0.006 90)`, `text-wrap: pretty`; tag row below, flex wrap `gap: 8px`, `margin-top: 6px`, each JetBrains Mono `11.5px`, `oklch(60% 0.006 90)`, prefixed `#`.
- **Clear filter** — appears only when a tag is active. Centered, `padding: 32px 0 0`. Button: JetBrains Mono `12.5px`, `padding: 8px 16px`, `border: 1px solid oklch(89% 0.004 90)`, `border-radius: 6px`, `background: oklch(99% 0.003 90)`.
- **Footer strip** — space-between: "Updated most weekdays" + "Subscribe via RSS".

**Behavior**
- Tag click toggles filter; clicking the active tag clears it.
- Filtering removes non-matching entries, then drops days with no remaining entries, then drops months with no remaining days. Count updates.
- Tag list is derived from entry data (deduped, alphabetically sorted) — not hand-maintained.

**Hugo implementation note:** model log entries as a content section (`content/log/`) with one file per day (or a data file for terse entries), `date` + `tags` in front matter. Reuse Hugo taxonomies for the tag filter, or ship the filter client-side for instant response — the design assumes instant, no page reload.

**All entries currently placeholder.** Replace with real ones before launch.

---

### 3. Writing (`Writing.dc.html`)

**Purpose:** One home for everything Aleem writes — the technical posts and the personal essays, previously two disconnected sections.

**Layout**
- Title + intro (`max-width: 58ch`).
- **Segmented filter** — flex row, `gap: 6px`, `background: oklch(95% 0.004 90)`, `padding: 4px`, `border-radius: 7px`, `width: fit-content`. Buttons: `13.5px/500`, `padding: 6px 14px`, `border-radius: 5px`, no border.
  - Active: `background: oklch(99% 0.003 90)`, `color: oklch(22% 0.006 90)`
  - Inactive: `background: transparent`, `color: oklch(48% 0.006 90)`
  - Options: **All · Technical · Essays**
- Count to the right of the filter bar: JetBrains Mono `12px` — "N of 69 pieces".
- **Item row** — `grid-template-columns: 1fr auto`, `gap: 16px`, `padding: 15px 0`, `align-items: start`, bottom divider.
  - Title: `16px/500`, `line-height: 1.4`, `color: oklch(22% 0.006 90)`
  - Blurb: `14px/1.55`, `oklch(48% 0.006 90)`, `margin-top: 5px`, `text-wrap: pretty`
  - Meta: JetBrains Mono `11.5px`, `oklch(60% 0.006 90)`, `margin-top: 7px` — tags + read time, or "essay · N min"
  - Date: JetBrains Mono `12.5px`, `nowrap`, `padding-top: 4px`
- **Utility footer** — `border-top`, `padding-top: 20px`, flex `gap: 16px`, `13.5px`: Full archive → · Browse tags → · Search → · RSS →

**Behavior:** filter switches the list instantly (client-side); item ordering is newest-first within every filter state.

**Content:** 10 real items (posts + essays with real titles, dates, and blurbs from the live site). The live site has 69 total — paginate or lazy-load the rest.

---

### 4. Library (`Library.dc.html`)

**Purpose:** Merge `/readings`, `/links`, and `/ai` into one curated study surface. **Container is `720px`**, wider than other pages, to fit the grids.

**Layout**
- Title + intro (`max-width: 60ch`).
- **Tabs** — identical segmented control to Writing: **All · Books & papers · Resources**. `margin-bottom: 8px`.
- **Reading now** (visible on All + Books tabs) — `padding-top: 28px`. Grid: `repeat(auto-fill, minmax(210px, 1fr))`, `gap: 10px`. Card: `padding: 12px 14px`, `background: oklch(96% 0.004 90)`, `border-radius: 8px`; title `14.5px/500`, `line-height: 1.35`; topic JetBrains Mono `11px`, `oklch(58% 0.006 90)`, `margin-top: 5px`.
- **Books & papers** (All + Books) — `padding-top: 34px`. Sub-line "Notes published as I work through them." Each group: `grid-template-columns: 150px 1fr`, `gap: 16px`, `padding: 13px 0`, bottom divider. Topic cell JetBrains Mono `12px`, `oklch(56% 0.006 90)`; items flex column `gap: 6px`, each a `14.5px` link in `oklch(26% 0.006 90)`.
- **Resources** (All + Resources) — `padding-top: 34px`. Sub-line names the totals. Grid: `repeat(auto-fill, minmax(200px, 1fr))`, `gap: 10px`. Each tile is a link: space-between baseline row, `padding: 11px 13px`, `background: oklch(96% 0.004 90)`, `border-radius: 7px`; name `14px`, `oklch(26% 0.006 90)`; count JetBrains Mono `11px`, `oklch(60% 0.006 90)`. **Hover:** `background: oklch(93% 0.004 90)`, no underline.

**Behavior:** tabs show/hide whole sections. "All" shows everything.

**Content:** book groups and reading list are real (from `/readings` and `/now`). **Resource topic counts are approximations** — derive them from the real `/links` data at build time. Topic tiles should link to anchors or sub-pages holding the actual link lists.

---

### 5. Now (`Now.dc.html`)

**Purpose:** Replace the current sprawling Now page with a public signal of where effort actually goes. Gear and hardware move to `/uses`.

**Layout**
- Title, intro ("Where my effort actually goes right now. Reviewed monthly."), then a JetBrains Mono `12px` "Last updated" stamp in `oklch(58% 0.006 90)`, `margin-bottom: 36px`.
- **Work** — single paragraph, `15.5px/1.7`, `oklch(28% 0.006 90)`, inline link to employer.
- **Focus this quarter** — flex column `gap: 10px`. Each item: flex row `gap: 10px` with a `›` marker in `oklch(45% 0.14 260)` (`line-height: 1.6`, `flex-shrink: 0`) + text `15px/1.6`, `oklch(30% 0.006 90)`.
- **Projects** — sub-line "One project per quarter, shipped or shelved." Rows: `grid-template-columns: 1fr auto`, `gap: 14px`, `padding: 12px 0`, `align-items: start`, divider. Name `15px/500` link; desc `13.5px/1.55`, `oklch(48% 0.006 90)`; status JetBrains Mono `11.5px`, `oklch(58% 0.006 90)`, `nowrap`, `padding-top: 3px` (values: `shipped`, `redesigning`).
- **Learning / Reading** — two-column grid, `repeat(auto-fit, minmax(240px, 1fr))`, `gap: 28px`. Each a section heading + flex column `gap: 7px` of `14.5px/1.5` lines. Reading column ends with "Full library →" (`13.5px`, `margin-top: 10px`).
- **Community** — flex column `gap: 10px`, `15px/1.6` lines.
- **Life** — `padding: 18px 20px`, `background: oklch(96% 0.004 90)`, `border-radius: 9px`. Section heading + one `14.5px/1.65` paragraph in `oklch(32% 0.006 90)`.
  - Deliberately one short paragraph, not a list. The current site's Now page breaks marital status, location, and emigration plans into separate headed sections; that granularity reads as a private file.
- **Footer strip** — `border-top`, flex `gap: 16px`, `13.5px`: Desk & gear (/uses) → · Daily log → · CV →

**Content:** all real (Kredete role, focus items, five projects, learning/reading lists, GopherCon Africa + CNCF, Lagos/emigration/off-hours), sourced from the current Now page and CV.

---

### 6. About (`About.dc.html`)

**Purpose:** Bio, credentials, contact. Tightened from the current page's seven paragraphs to three.

**Layout**
- Title `32px/700`, `margin-bottom: 22px`.
- **Portrait** — full-width, `aspect-ratio: 16/9`, `border-radius: 10px`, placeholder stripe fill (`oklch(93% 0.004 90)` / `oklch(96% 0.004 90)`, 6px bands, 45°), centered monospace label. `margin-bottom: 28px`. **Replace with the real portrait.**
- **Paragraph 1** — `17px/1.7`, `oklch(26% 0.006 90)`. Who he is + where the work sits.
- **Paragraphs 2-3** — `16px/1.75`, `oklch(32% 0.006 90)`. Measurable results; then community, OSS, and writing philosophy.
- **Pull-quote** — JetBrains Mono `14px/1.7`, `oklch(40% 0.006 90)`, `padding: 16px 18px`, `background: oklch(96% 0.004 90)`, `border-radius: 9px`, `margin: 26px 0 32px`. Text: "If it must be done twice, I'll automate it. If it must serve millions, I design it to scale." (his line, from the current About page).
- **The short version** — fact rows: `grid-template-columns: 130px 1fr`, `gap: 16px`, `padding: 11px 0`, divider. Label JetBrains Mono `12px`, `oklch(56% 0.006 90)`; value `14.5px/1.55`, `oklch(30% 0.006 90)`. Six rows: Currently / Previously / Works with / Community / Education / Based in.
- **Certifications + Published at** — two-column grid, `repeat(auto-fit, minmax(240px, 1fr))`, `gap: 28px`; each a heading + flex column `gap: 8px` of `14.5px` links.
- **Contact** — `padding: 20px 22px`, `background: oklch(96% 0.004 90)`, `border-radius: 10px`. Heading `16px/600`, body `14.5px/1.6`, then two buttons in a flex row `gap: 10px`:
  - Primary "Email me": `padding: 9px 16px`, `14px/500`, `border-radius: 6px`, `background: oklch(22% 0.006 90)`, `color: oklch(98% 0.003 90)`. **Hover:** `background: oklch(32% 0.006 90)`, no underline.
  - Secondary "View CV": same metrics, `border: 1px solid oklch(87% 0.004 90)`, `background: oklch(99% 0.003 90)`, `color: oklch(26% 0.006 90)`. **Hover:** `border-color: oklch(70% 0.006 90)`.
- **Footer** — `border-top`, flex `gap: 14px`, `13.5px`: GitHub · LinkedIn · X / Twitter · RSS · Uses

**Content:** all real (roles, employers, stack, certifications CKAD/PCA/Terraform/Vault, publications Smashing Magazine + LogRocket, education). CV lives at `/aleemisiaka.pdf`.

---

### 7. AI (`AI.dc.html`)

**Purpose:** The flagship long-form page. Aleem's real AI workflow, stated opinions, and stated limits. This is the page that carries the AI-plus-systems positioning, so it gets the widest container and the most typographic care.

**Container: `700px`** (wider than the `660px` standard — long-form needs the measure).

**Layout**
- **Title** `34px/700`, `letter-spacing: -0.018em`, `line-height: 1.15`.
- **Deck** `17px/1.65`, `oklch(40% 0.006 90)`, `max-width: 58ch`.
- **Byline strip** JetBrains Mono `12px`, `oklch(58% 0.006 90)`: updated date · read time · "✎ improve this page" (links to the GitHub source file, as the current page does).
- **TOC block** — `padding: 16px 18px`, `background: oklch(96% 0.004 90)`, `border-radius: 9px`, `margin-bottom: 40px`. Label in JetBrains Mono `11.5px` uppercase; entries as a wrapping flex row, `gap: 8px 20px`, each `14px` link.
  - The current page has a two-level nested TOC rendered twice (top and bottom). Flattened here to one wrapping row of six top-level anchors.
- **Section heading (h2)** `22px/600`, `letter-spacing: -0.01em`. Body prose `16px/1.7`, `oklch(32% 0.006 90)`, `text-wrap: pretty`. Sections separated by `margin-bottom: 44px`.

**Custom blocks — these are the page's substance, build them carefully:**

1. **Decision tree** — four stacked cards, `gap: 10px`. Each: `padding: 15px 17px`, `background: oklch(96% 0.004 90)`, `border-radius: 8px`, and a **3px left border whose color steps down in chroma by tier** — `oklch(45% 0.14 260)` → `oklch(65% 0.09 260)` → `oklch(78% 0.05 260)` → `oklch(88% 0.02 260)`. That ramp encodes how much judgment the branch demands; keep it. Inside: tier label (JetBrains Mono `10.5px`, uppercase, `letter-spacing: 0.08em`) + condition in monospace `13px` (written as pseudo-code, e.g. `if (I know what I want && an agent can do it)`), then the action line `14.5px/1.6`.
2. **Pipeline stages** — grid `repeat(auto-fit, minmax(196px, 1fr))`, `gap: 12px`. Cards: `padding: 16px`, `background: oklch(99% 0.003 90)`, `border: 1px solid oklch(91% 0.004 90)`, `border-radius: 9px`. Stage number (JetBrains Mono `10.5px`, `letter-spacing: 0.08em`, `oklch(60%)`) → title `16px/600` → **tools line in JetBrains Mono `12px` accent `oklch(45% 0.14 260)`** → note `13.5px/1.6`. Three stages: Research / Decide / Implement.
3. **OpenCode config block** — bordered container, `border-radius: 9px`, `overflow: hidden`. Header bar: file path in JetBrains Mono `11.5px` on `oklch(96% 0.004 90)` with a bottom border. Then one row per agent (`padding: 15px 16px`, `background: oklch(99% 0.003 90)`, divider between): agent name in JetBrains Mono `14px/500` + a mode pill (JetBrains Mono `10.5px`, uppercase, `padding: 2px 7px`, `border-radius: 4px`, `background: oklch(93% 0.004 90)`) reading `READ-ONLY` or `WRITE`; model string in accent monospace `12px`; note `13.5px/1.6`. Footer bar (`background: oklch(97% 0.003 90)`) lists plugin links in monospace `12px`.
4. **Pull-quote** — `padding: 20px 22px`, `background: oklch(96% 0.004 90)`, `border-radius: 9px`, text `17px/1.65`, `oklch(28% 0.006 90)`. No quotation marks, no left rule. Carries his responsibility statement.
5. **Hermes loop** — grid `repeat(auto-fit, minmax(140px, 1fr))`, `gap: 10px`. Four cards (Input / Agent / TTS / Output): `padding: 13px 14px`, `background: oklch(96% 0.004 90)`, `border-radius: 8px`; step label monospace `10.5px` uppercase, name `14.5px/500`, note `13px/1.5`.
   - The current page renders this as an ASCII-ish arrow chain that breaks on narrow screens. Four equal cards read as a sequence without needing arrows.
6. **"What I don't use it for"** — flex column, `gap: 14px`. Each item: a monospace `×` marker in `oklch(58% 0.006 90)` (`line-height: 1.7`, `flex-shrink: 0`) + text `15.5px/1.68`.
7. **"Where this is heading"** — closing callout, `padding: 20px 22px`, `background: oklch(96% 0.004 90)`, `border-radius: 10px`. Heading `16px/600`, body `14.5px/1.68`.
- **Footer strip** — More writing → · Tools & gear → · Daily log →

**Content:** all real, condensed from the live `/ai` page (the decision tree, the three-stage pipeline, the plan/build agent split with actual model strings, the plugin list, Hermes + ddts + the two backends, his stance on creative writing and on gatekeeping agents, the self-hosting conclusion). Prose has been tightened; **check every line against his own wording before publishing** — the opinions are his and should sound like him.

**Dropped from the current page:** the openring "articles from blogs I follow" widget and the duplicate bottom TOC. Re-add openring if wanted, but it pulls focus from an otherwise opinionated page.

---

### 8. Uses (`Uses.dc.html`)

**Purpose:** Absorbs the desk, hardware, and stack content stripped out of the old Now page. Standard shell, `660px`.

**Layout**
- Back-link above the title: JetBrains Mono `12px`, `oklch(58% 0.006 90)` — "← Now".
- Title, intro (`max-width: 56ch`), then a "Last updated" stamp in JetBrains Mono `12px`, `margin-bottom: 36px` — same treatment as Now.
- **Three groups** — Desk / Languages / Platform. Each: section heading + rows at `grid-template-columns: 130px 1fr`, `gap: 16px`, `padding: 11px 0`, bottom divider (identical geometry to About's "short version" rows).
  - Label cell: JetBrains Mono `12px`, `oklch(56% 0.006 90)`, `padding-top: 2px`
  - Name: `14.5px` link, `oklch(26% 0.006 90)`, `line-height: 1.5`
  - Note: `13.5px/1.55`, `oklch(50% 0.006 90)`, `margin-top: 3px`, `text-wrap: pretty`
  - Section spacing: `margin-bottom: 34px`
- **Homelab** — callout block, `padding: 18px 20px`, `background: oklch(96% 0.004 90)`, `border-radius: 9px`. One `14.5px/1.65` paragraph. Same treatment as Now's "Life" block.
- **Footer strip** — `border-top`, flex `gap: 16px`, `13.5px`: What I'm doing now → · Daily log → · CV →

**Content:** hardware and stack are real (from the current Now page); the one-line notes are written copy — edit freely. Product links are `#` stubs; point them at the manufacturer pages the current Now page already links.

---

## Interactions & Behavior

| Surface | Behavior |
|---|---|
| Log tag buttons | Toggle single-tag filter. Re-click clears. Empty days and months are dropped. Count label updates. |
| Log "Clear filter" | Only rendered while a filter is active. |
| Writing segmented filter | All / Technical / Essays. Instant, client-side. Count label updates ("N of 69 pieces"). |
| Library tabs | All / Books & papers / Resources. Show/hide whole sections; "All" shows everything. |
| Links | Default `oklch(45% 0.14 260)`, no underline. **Hover:** `oklch(38% 0.14 260)` + underline. Set these globally — undefined links otherwise render browser-default blue. |
| Subscribe button | Hover `oklch(22%)` → `oklch(32%)`. Wire to the existing Substack list (`limistah.substack.com`). |
| Resource tiles | Hover `oklch(96%)` → `oklch(93%)`, no underline. |
| Responsive | Everything is single-column with `flex-wrap` / `auto-fit` grids; no media queries needed. Nav wraps. Verify the 76px and 130-150px grid gutters on narrow screens — collapse to stacked rows below ~420px. |

No page transitions, no scroll animations, no loading states. The design is intentionally static and fast.

---

## State Management

Three pieces of client state, all local to their page:

1. **Log** — `activeTag: string | null`. Derived: visible months, entry count, tag list.
2. **Writing** — `filter: "all" | "technical" | "essay"`. Derived: visible items, count label.
3. **Library** — `tab: "all" | "books" | "resources"`. Derived: section visibility booleans.

No data fetching. All content is build-time. Persisting filter state in the URL (`?tag=rust`) would be a genuine improvement for shareability.

---

## Design Tokens

All colors are **oklch** — keep them as oklch rather than converting to hex; the palette is built on a shared warm-neutral hue (90) with a single blue accent, and that relationship is easier to maintain in oklch.

### Neutrals (warm, hue 90)
| Token | Value | Use |
|---|---|---|
| bg | `oklch(98% 0.003 90)` | page background |
| bg-raised | `oklch(99% 0.003 90)` | header, inputs, outline buttons |
| surface | `oklch(96% 0.004 90)` | cards, pull-quote, resource tiles, Life block |
| surface-alt | `oklch(95% 0.004 90)` | subscribe block, segmented-control track |
| surface-hover | `oklch(93% 0.004 90)` | resource tile hover |
| border | `oklch(91% 0.004 90)` | header rule, section rules, footers |
| border-soft | `oklch(92% 0.004 90)` | list-row dividers |
| border-input | `oklch(86-89% 0.004 90)` | inputs, tag buttons, outline button |
| ink | `oklch(22% 0.006 90)` | headings, active nav, primary button bg |
| ink-body | `oklch(26-30% 0.006 90)` | body copy |
| ink-muted | `oklch(42-48% 0.006 90)` | secondary copy, inactive nav |
| ink-faint | `oklch(50-60% 0.006 90)` | section headings, meta, dates |
| ink-invert | `oklch(98% 0.003 90)` | text on primary button |

### Accent
| Token | Value | Use |
|---|---|---|
| accent | `oklch(45% 0.14 260)` | links, focus markers, `›` bullets |
| accent-hover | `oklch(38% 0.14 260)` | link hover |

One accent, one hue. Do not introduce a second accent color.

### Typography
- **Inter** (400/500/600/700) — all UI and body copy
- **JetBrains Mono** (400/500) — wordmark, dates, meta, tags, labels, counts, status, pull-quote

Scale in use: `32` (page title) · `22` (name) · `17` (lead) · `16` (body / card heading) · `15.5` · `15` · `14.5` · `14` · `13.5` · `13` (section heading) · `12.5` · `12` · `11.5` · `11` px.

Line heights: `1.35-1.4` (titles) · `1.5-1.6` (dense lists) · `1.65-1.75` (prose).
Letter spacing: `-0.015em` (page titles) · `-0.01em` (name) · `0.05-0.08em` (uppercase labels).
`text-wrap: pretty` on all prose.

### Spacing
`4 · 5 · 6 · 7 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 26 · 28 · 32 · 34 · 36 · 40 · 44 · 48 · 56 · 64 · 100` px.
Container widths: `660px` standard, `720px` Library.

### Radius
`5px` (tag buttons, segmented items) · `6px` (inputs, buttons) · `7px` (segmented track, resource tiles) · `8px` (cards) · `9px` (pull-quote, Life block) · `10px` (subscribe, contact, portrait) · `50%` (avatar).

### Shadows
**None.** Depth comes from surface tint and hairline borders. Do not add shadows.

---

## Assets

| Asset | Status |
|---|---|
| Portrait (About) | **Placeholder.** Real file at `/assets/aleem-isiaka.png` on the current site. |
| Avatar (Home, 60px) | **Placeholder** stripe. Use a square crop of the portrait. |
| Fonts | Inter + JetBrains Mono via Google Fonts. Self-host for performance. |
| Icons | None used. Text labels only — keep it that way. |
| "Written by Human, Not by AI" badge | On the current site; **not carried into these designs.** Re-add to the footer if wanted. |
| Favicon / OG images | Reuse existing (`/images/papermod-cover.png`), or regenerate to match the new light palette — the current theme color `#2e2e33` is from the old dark theme. |

No SVG illustration anywhere. Placeholder imagery is a striped fill with a monospace label naming what belongs there.

---

## Files in this bundle

| File | Screen |
|---|---|
| `Home.dc.html` | Homepage |
| `Log.dc.html` | Log |
| `Writing.dc.html` | Writing |
| `AI.dc.html` | AI |
| `Library.dc.html` | Library |
| `Now.dc.html` | Now |
| `About.dc.html` | About |
| `Uses.dc.html` | Uses |
| `Daily Log.dc.html` | **Superseded** — an earlier dark-theme log exploration, kept for reference only. Do not implement. |
| `Homepage.dc.html` | **Superseded** — earlier single-page homepage draft. Do not implement. |

Open any file directly in a browser to see it rendered. Each is self-contained apart from the Google Fonts link.

## Before implementing

1. **Replace all Log entries** with real ones. Everything else on the site is real content; the log is the only wholly invented section.
2. **Derive resource counts** on Library from the real `/links` data instead of the approximations shown.
3. **Recompute "69 pieces"** from actual post + essay counts.
4. **Drop in the real portrait** and decide whether the human-not-AI badge returns.
5. **Design and build `/uses`** from the gear content stripped out of Now.
6. **Verify the AI page copy** against the live `/ai` wording — the prose was condensed and the opinions must stay his.
7. **Set up redirects** from retired URLs: `/posts` and `/essays` → `/writing`; `/readings`, `/links`, `/resources` → `/library` (`/ai` keeps its URL). These have existing inbound links and search equity; do not let them 404.
