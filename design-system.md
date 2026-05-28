# Design System: limistah.dev

## Overview
Minimalist + clean portfolio with playful accents. Tech community & recruiters as primary audience. Focus: skills & writing.

## Style: Geometric Minimalism
- **Philosophy:** Clean, geometric foundation with playfulness through color, micro-interactions, and smooth animations
- **Approach:** Flat + subtle shadows (not 3D), generous whitespace, intentional hierarchy
- **Personality:** Professional first, playful second — via interactions and accent colors, not visual weight
- **Dark Mode:** Full support with inverted tones (same contrast ratios)

## Color Palette

| Role | Light | Dark | Hex (Light) | CSS Variable |
|------|-------|------|-------------|--------------|
| Primary | Orange | Warm Orange | `#F97316` | `--color-primary` |
| Accent | Blue | Soft Blue | `#2563EB` | `--color-accent` |
| Background | Off-white | Near-black | `#FFF7ED` / `#0F172A` | `--color-background` |
| Text | Dark Brown | Off-white | `#1F2937` / `#F3F4F6` | `--color-text` |
| Muted | Light Gray | Dark Gray | `#F3F4F6` / `#374151` | `--color-muted` |
| Border | Light Orange | Dark Orange | `#FED7AA` / `#92400E` | `--color-border` |
| Destructive | Red | Red | `#DC2626` | `--color-destructive` |

**Strategy:** Orange draws attention (CTAs, highlights), Blue conveys trust (links, secondary CTAs). Neutral backgrounds let content breathe.

## Typography

| Type | Font | Weight | Size (Mobile/Desktop) | Usage |
|------|------|--------|----------------------|-------|
| Heading XL | Archivo | 700 | 28px / 40px | Page title, hero |
| Heading L | Archivo | 600 | 24px / 32px | Section headers |
| Heading M | Archivo | 600 | 20px / 24px | Card titles, subsections |
| Body | Space Grotesk | 400 | 16px | Main text, descriptions |
| Body Small | Space Grotesk | 400 | 14px | Metadata, captions |
| Label | Space Grotesk | 500 | 12px / 14px | Tags, buttons, labels |

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

## Layout & Spacing

- **Breakpoints:** 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large)
- **Container:** max-width: 896px (desktop), 100% padding: 16px (mobile) / 32px (tablet+)
- **Spacing Scale:** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Grid:** 12-column on desktop, 6-column on tablet, 4-column on mobile
- **Line Height:** 1.5 (body), 1.2 (headings)
- **Line Length:** 60-75 characters (optimal reading)

## Components & Patterns

### Post/Article Page Layout
- **Main content:** Max-width 720px, centered on smaller screens
- **Sidebar (right):** 280px, sticky position (scrolls with content until bottom)
- **Sidebar content:** Table of Contents, related posts, newsletter signup
- **Breakpoint:** Sidebar collapses into collapsible drawer or moves below content on screens <1024px
- **Table of Contents:** 
  - Header: "On this page"
  - Auto-generated from h2/h3 headings
  - Blue links, highlights active section
  - Smooth scroll-to behavior
  - Updates as user scrolls (active section highlighted)
- **Reading Progress:** Vertical progress bar on left edge of content (optional, appears on scroll)

### Navigation
- Sticky header with semi-transparent blur background (backdrop-filter: blur(10px))
- Logo/name left, nav links + theme toggle right
- Mobile: hamburger menu (optional, or sticky bottom nav)
- Active state: orange underline or background tint
- Hover: smooth color transition (200ms ease-out)

### Hero Section
- Large heading + short description + CTA button
- Centered layout on mobile, split layout on desktop (optional)
- Whitespace-heavy, no background image
- CTA button: orange background, smooth hover to darker orange

### Project/Post Cards
- Minimal border: 1px light gray / dark gray
- Subtle shadow: `0 1px 3px rgba(0,0,0,0.1)` light mode, `0 1px 3px rgba(0,0,0,0.3)` dark mode
- Hover: slight scale (1.02) + shadow deepens (200ms transition)
- No background fill — white/dark surface only
- Padding: 16px (mobile) / 24px (desktop)

### Buttons
- Primary: orange background, dark text, 8px padding, 4px border-radius
- Secondary: orange border, orange text, transparent background
- Hover: darker orange, smooth transition (200ms ease-out)
- Active/pressed: scale 0.98 (subtle feedback)
- Disabled: opacity 0.5, cursor not-allowed
- Focus: 2px blue ring (offset 2px)

### Links
- Color: blue (#2563EB)
- Underline: optional, appears on hover
- Transition: 150ms ease-out
- Focus: blue ring 2px

### Tags/Badges
- Background: muted / dark muted
- Text: primary text color
- Border-radius: 4px
- Padding: 4px 8px
- Font size: 12px / 14px

## Animations & Interactions

### Principles
- Duration: 150-300ms for micro-interactions, max 400ms for complex transitions
- Easing: `ease-out` for entering, `ease-in` for exiting
- Performance: Use `transform` and `opacity` only (no width/height animations)
- Respect `prefers-reduced-motion`: disable or minimize animations

### Key Animations
- **Hover states:** Scale + color change (200ms ease-out)
- **Page transitions:** Fade in (200ms ease-out)
- **Loading:** Skeleton placeholder or subtle pulse (1s infinite)
- **Scroll reveal:** Cards fade-in as they enter viewport (optional, 300ms)
- **Button press:** Scale 0.98 + opacity (100ms ease-out, then back)
- **Theme toggle:** Color transition (300ms ease-out)

## Dark Mode

- **Background:** `#0F172A` (near-black, not pure #000000 for eye comfort)
- **Text:** `#F3F4F6` (off-white, not pure #FFF for readability)
- **Borders:** Darker orange tones, increase opacity for visibility
- **Shadows:** Deepen or use color-based shadows (e.g., overlay with semi-transparent color)
- **Contrast:** Verify 4.5:1 minimum for all text on dark backgrounds
- **Media queries:** Use `@media (prefers-color-scheme: dark)` or CSS variables + toggle script

## Accessibility Checklist

- [ ] Color contrast: 4.5:1 minimum for normal text, 3:1 for large text
- [ ] Focus states: 2px ring on all interactive elements
- [ ] Keyboard navigation: Tab order matches visual order
- [ ] Alt text: All meaningful images have descriptive alt text
- [ ] Form labels: Visible labels for all inputs
- [ ] prefers-reduced-motion: Respected (animations disabled/minimal)
- [ ] Touch targets: Min 44x44px on mobile
- [ ] Semantic HTML: Use `<button>`, `<a>`, `<nav>`, `<main>`, etc.

## Implementation Notes

- **CSS Variables:** Define all colors, typography, spacing in CSS variables for easy theming
- **Token-driven:** No hardcoded hex values in components
- **Mobile-first:** Design mobile layout first, then enhance for tablet/desktop
- **Hugo Integration:** Use Hugo templates to avoid inline styles; all styling in external CSS
- **Icon Library:** Use SVG icons (Heroicons, Lucide, or custom) — no emoji icons
- **Font Loading:** Use `font-display: swap` to avoid invisible text during load
