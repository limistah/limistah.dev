# Design System: limistah.dev

Source: Design handoff (Limistah Portfolio Design.zip, 2026-05-27)

## Color strategy: Drenched dark

Scene: An engineering manager opening the site on a dim screen at night. The surface IS the darkness — not a light page with a dark mode toggle.

### Surfaces
```css
--bg-primary:   #0a0a0b   /* near-black, main canvas */
--bg-secondary: #131316   /* elevated surface, cards */
--bg-tertiary:  #1a1a1f   /* code blocks, inputs */
--border-color: #27272a   /* subtle dividers */
```

### Text
```css
--text-primary:   #f4f4f5   /* headings, body emphasis */
--text-secondary: #a1a1aa   /* body text */
--text-tertiary:  #71717a   /* dates, labels, metadata */
```

### Accents (OKLCH)
```css
--accent-green:   oklch(0.75 0.15 145)   /* primary, logo, active states */
--accent-cyan:    oklch(0.7  0.12 195)   /* links, interactive, progress bar */
--accent-amber:   oklch(0.8  0.14  85)   /* highlights, blockquote borders */
--accent-red:     oklch(0.7  0.15  25)   /* error states only */
--accent-primary: var(--accent-green)
```

## Typography

Three fonts, three jobs:
- **JetBrains Mono** — logo, nav links, dates, tags, code, labels (anything that should feel like a terminal)
- **Space Grotesk** — UI chrome, headings in non-prose contexts, navigation
- **Lora** — long-form article body (serif for reading comfort)

```css
--font-mono:  'JetBrains Mono', monospace
--font-sans:  'Space Grotesk', sans-serif
--font-serif: 'Lora', Georgia, serif
```

Body default: Space Grotesk, 1.6 line-height.
Article prose: Lora, 1.125rem, 1.85 line-height.
Code: JetBrains Mono, 0.875em.

## Spacing scale

```css
--space-xs:  0.5rem
--space-sm:  1rem
--space-md:  1.5rem
--space-lg:  2rem
--space-xl:  3rem
--space-2xl: 4rem
--space-3xl: 6rem
```

## Layout

```css
--content-max:      880px    /* standard page content */
--content-wide-max: 1200px   /* footer, wide sections */
--nav-height:       60px
```

## Components

### Navigation
Fixed, top. Frosted glass: `rgba(10,10,11,0.85)` + `backdrop-filter: blur(10px)`. Logo left (mono, green). Links right (mono, 0.875rem, secondary color, green on active). Search as a bordered button.

### Post card
Two-column grid: `120px 1fr`. Date column in mono/tertiary. Title 1.375rem/600. Excerpt in secondary. Tags + read time in mono/0.75rem. Bottom border. Hover: slight background lift.

### Footer
Multi-column grid (`repeat(auto-fit, minmax(200px, 1fr))`). Brand column + Site / Writing / Elsewhere columns. Bottom row: copyright left, built-with center, back-to-top right. Top border separates from content.

### Article prose
`.prose` class. Font-serif, 1.125rem, 1.85 line-height. Headings switch back to sans. Blockquotes: amber left border (3px), italic. Inline code: mono, amber color, bg-tertiary bg. Pull quotes: cyan top/bottom border, centered, italic serif.

### Reading progress bar
3px cyan line fixed at top (z-index 1100). Driven by scroll position JS.

## Interaction

Hover transitions: `0.15s–0.2s ease`. No bounce, no elastic.
Links underline only on prose `.prose a`. Nav links and post cards use color transition only.
