# limistah.dev redesign — implementation plan

Follows `limistah-redesign-review.md`. This resolves the open questions from that review with concrete calls (stated below, easy to override) and breaks the work into sequenced, independently-shippable phases.

## Decisions (made so the work can start — flag anything you'd call differently)

1. **Accent count:** ~~keep two~~ **Revised after auditing the CSS: keep all three.** The review undercounted amber — it's not one role, it's ~10 (prose blockquote rule, inline-code color, `callout-warn`, hero stats, stage 03, Hermes' Ollama backend, decision-tree tier 3). The three accents are used *systematically* as a first/second/third tier across the AI page's shortcodes, so collapsing to one hue would mean redesigning those blocks, not just retiring a color. Not worth it. The handoff's "one accent" rule is overruled by the live system's existing, coherent three-tier usage.
2. **Fonts:** keep the live pairing (JetBrains Mono / Space Grotesk / Lora) rather than adopting the handoff's Inter. The handoff's type *scale* (32/22/17/16px etc.) and line-heights still apply — just set in the existing three faces.
3. **Corner/shadow language — new call, not in the original review:** the new handoff specifies soft, rounded (5–10px radius) tinted cards with no borders. Your live CSS is deliberately sharp — `border-radius: 0` everywhere, hairline borders instead of tint, "no bounce, no elastic" easing, explicitly terminal-native per `PRODUCT.md`'s anti-references ("no gradient text," "no generic Tailwind-starter look"). Rounding every card would be a real brand shift, not just a reskin. **Call: keep the sharp/hairline-border language.** Port the handoff's grid geometry, spacing, and information density as specified; render its "surface" cards as `background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 0` instead of soft rounded tint blocks.
4. **Library data model:** restructure `content/links.md`'s categorized list into per-item front matter (a `resources` content type, one file per category or a single data file `data/resources.yaml`) so counts and tabs derive at build time, per the handoff's own recommendation — rather than templating around the existing free-form markdown. This is the piece your LinkSync bot writes to, so it's the one change that needs coordination with that automation before it ships (see Phase 4).
5. **Log cadence:** design the empty-state/grouping logic to tolerate gaps (don't assume "most weekdays" holds) — drop empty days and months rather than rendering placeholders for them, which the handoff already specifies. No cadence commitment implied by the template.
6. **`design-system.md`:** marking superseded now (Phase 0), not deleting — keeps the history without leaving it as a live-looking doc.

## Status (2026-09-04, evening) — course correction

Aleem's call: **pixel-faithful to the handoff, in dark, Inter + JetBrains Mono, single blue accent.** The earlier decisions #1–#3 (keep the old "Drenched dark" language, three accents, Space Grotesk) are **superseded**. Everything now lives in `assets/css/extended/zz-redesign.css` (`rd-*` classes, handoff tokens inverted for dark); the older `lm-*` CSS/templates are legacy and get removed once nothing references them.

Migrated to the handoff: global shell (header/footer/fonts), Home, Writing, Now, Uses, About, AI (shortcodes restyled via overrides), Library (Readings + Links merged; tabs; `content/links.md` stays the data source so the LinkSync bot keeps working; `/readings` `/links` `/resources` redirect), long-form article template for posts/essays, Tags, Archive, Search. Remaining: Log (Phase 6), review of handoff copy in `data/*.yaml`. Legacy CSS/templates removed; `site.css` + `ai.css` are the only stylesheets.

## Phases

Each phase is scoped to ship and be checked independently. Nothing here touches `git` unless you ask — everything happens in your working tree first.

### Phase 0 — Housekeeping (small, no visual change)
- Mark `design-system.md` superseded (header note pointing to `DESIGN.md`).
- Add this plan + the review doc to `docs/` so the decisions have a home next to `DESIGN.md`/`PRODUCT.md`.

### Phase 1 — Global shell
- `config.yml` menu: `Log · Writing · AI · Library · Now · About` (6 items). Nav template already handles arbitrary menu length — no template change needed, just the config + the pages existing to point at (so this phase ships *with* Phase 2, not before — a nav link to a 404 is worse than the old nav).
- Footer: demote `Archive`, `Tags`, `Search` into the existing footer utility-link pattern (already has the grid/column structure — reuse it); add `Uses`.
- Extend `design-tokens.css` with any new component classes the pages below need (day-row grid, segmented-filter control, tab control) — additive, doesn't touch existing rules.

### Phase 2 — Now / Uses split
Lowest-risk content move: splits one existing, fully-real page into two.
- New `content/uses.md` + `layouts/_default/uses.md`-equivalent template, carrying gear/workspace/stack out of `now.md`.
- Trim `content/now.md` to focus/projects/learning/reading/community/life, collapsing the marital-status/emigration section into the one-paragraph "Life" block the handoff specifies.
- Both templates share the label/value row geometry already used elsewhere (`grid-template-columns: 130px 1fr`).

### Phase 3 — AI page reskin — DONE (scaled down)
After building and screenshotting the live page: it already implements every custom block in the handoff (decision tree with tiered left rule, three stages, OpenCode config block with mode pills, Hermes loop as cards, pull-quotes) in the sharp/hairline language. Only real delta was the TOC. Shipped: inline TOC flattened to one wrapping row of top-level anchors on `/ai` only (`tocFlat: true` front matter → `.lm-inline-toc--flat`; sidebar keeps the nested outline; other posts unchanged). Skipped: container widening (the two-column article grid already gives the prose a ~700px measure) and dropping openring (left as-is; remove if wanted).
Lowest-risk *visual* change: the four shortcodes (`ai-decision-tree`, `ai-workflow-stages`, `ai-opencode-setup`, `ai-hermes-pipeline`) already exist and already match the handoff's spec structurally.
- Widen container to the handoff's 700px for long-form measure (currently uses the site default).
- Flatten the TOC to one wrapping row (handoff calls out the current double/nested TOC as a problem).
- Re-skin the four shortcode partials to the sharp/hairline language from decision #3 above — geometry from the handoff, corners/borders from the live system.
- Verify prose against the live `/ai` page per the handoff's own instruction (opinions are Aleem's; nothing gets rephrased without a pass against his wording).

### Phase 4 — Writing (merge Posts + Essays) — DONE
Shipped: `content/writing/_index.md` + `layouts/writing/list.html` (union of `posts` + `essays`, newest first; all/technical/essays chips, text filter, top-8 tag chips, "N of M pieces" count; `?type=essay` deep link kept in sync with the URL) + `layouts/writing/rss.xml` (one merged feed). `/posts/` and `/essays/` now alias-redirect to `/writing/`; their section pages emit RSS only, so the old `/posts/index.xml` and `/essays/index.xml` feeds still work for existing subscribers. Nav: Essays → Writing. Footer + homepage CTAs repointed. Correction to the review: 69 is the right published count (57 posts + 12 essays) — the 72 I quoted was a raw file count including unpublished posts.
- New `content/writing/_index.md` section (or a taxonomy-driven list at `/writing/`) with a client-side segmented filter (All / Technical / Essays) — this is UI-only, doesn't require moving the underlying `posts/`/`essays/` content directories, just a list template that queries both sections.
- Redirect `/posts` and `/essays` to `/writing` via Hugo `aliases`.
- Count label computed from `len (union (where .Site.RegularPages "Section" "posts") (where .Site.RegularPages "Section" "essays"))` at build time — never hand-typed, so the stale "69" problem can't recur.

### Phase 5 — Library (merge Readings + Links) — the one with real data-migration risk
- Convert `content/links.md`'s categories into structured data (per decision #4) — the bulk of this phase's effort, and the part to check against the LinkSync automation before merging, since that bot currently commits directly to `links.md`'s markdown structure.
- Tabbed UI (All / Books & papers / Resources) reusing the segmented-control CSS from Phase 4.
- Resource counts derived from the structured data, not hand-maintained.
- Redirect `/readings` and `/links` → `/library`; `/ai` keeps its URL (already top-level, unaffected).

### Phase 6 — Log (new)
The long pole, per the original review — needs a template *and* a content habit, not just a build.
- New `content/log/` section, one file per day (or a `data/log.yaml` for terse entries — your call once you've tried writing a few), `date` + `tags` front matter.
- Month-grouping + client-side tag filter (instant, no reload, per the handoff's explicit requirement).
- Homepage gets a "5 most recent" slice once real entries exist — **do not wire this up with placeholder entries**; an empty or fake-looking Log on the homepage undercuts the whole "reason to return" premise the redesign is built on. This phase ships last on purpose.

## Suggested order

Phase 0 → 1+2 together (safe, all-real-content) → 3 (AI reskin, self-contained) → 4 (Writing) → 5 (Library, needs the LinkSync check) → 6 (Log, whenever you're ready to actually keep it).

## Where to start

Phase 0 + 1 + 2 can go right now with no further input from you — nothing in them depends on unresolved content decisions. Say the word and I'll build those in your working tree (uncommitted, so you can review the diff before anything's committed).
