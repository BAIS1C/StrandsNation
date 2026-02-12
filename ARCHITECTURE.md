# StrandsNation.xyz — Modular Architecture

## Stack
- **Next.js 14+** App Router (TypeScript)
- **CSS Modules** per component (`.module.css`)
- **CSS Custom Properties** for design tokens (`:root` level)
- **Zero runtime CSS** — no styled-components, no emotion, no tailwind
- **Intersection Observer** hook for scroll-triggered animations

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, global CSS, metadata
│   ├── page.tsx                # Home page (server component shell)
│   ├── codex/
│   │   └── page.tsx            # Codex page
│   ├── game/
│   │   └── page.tsx            # Game page
│   ├── network/
│   │   └── page.tsx            # Network/Ecosystem page
│   └── manifesto/
│       └── page.tsx            # Manifesto page
├── components/
│   ├── Nav/
│   │   ├── Nav.tsx
│   │   └── Nav.module.css
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.module.css
│   ├── Mini/
│   │   ├── Mini.tsx
│   │   └── Mini.module.css
│   ├── Callout/
│   │   ├── Callout.tsx
│   │   └── Callout.module.css
│   ├── Tag/
│   │   ├── Tag.tsx
│   │   └── Tag.module.css
│   ├── SectionLabel/
│   │   ├── SectionLabel.tsx
│   │   └── SectionLabel.module.css
│   ├── Scanlines/
│   │   ├── Scanlines.tsx
│   │   └── Scanlines.module.css
│   ├── CircuitBg/
│   │   ├── CircuitBg.tsx
│   │   └── CircuitBg.module.css
│   ├── Marquee/
│   │   ├── Marquee.tsx
│   │   └── Marquee.module.css
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   ├── Timeline/
│   │   ├── Timeline.tsx
│   │   └── Timeline.module.css
│   ├── TierGrid/
│   │   ├── TierGrid.tsx
│   │   └── TierGrid.module.css
│   ├── SocialGrid/
│   │   ├── SocialGrid.tsx
│   │   └── SocialGrid.module.css
│   └── CodexSidebar/
│       ├── CodexSidebar.tsx
│       └── CodexSidebar.module.css
├── sections/                   # Page-level section compositions
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── HeroSection.module.css
│   │   ├── ArchitectsSection.tsx
│   │   ├── GameSection.tsx
│   │   ├── EcosystemSection.tsx
│   │   ├── FoundersSection.tsx
│   │   ├── RoadmapSection.tsx
│   │   └── ConnectSection.tsx
│   ├── codex/
│   │   ├── WorldSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── FactionsSection.tsx
│   │   ├── GangsSection.tsx
│   │   ├── EconomySection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── MaitsSection.tsx
│   │   ├── SigopsSection.tsx
│   │   ├── GameplaySection.tsx
│   │   ├── CraftingSection.tsx
│   │   └── FoundersSection.tsx
│   └── shared/
│       └── SectionWrapper.tsx
├── data/
│   ├── codex-nav.ts            # Sidebar navigation items
│   ├── codex-content.ts        # All codex prose (typed)
│   ├── roadmap.ts              # Roadmap timeline entries
│   ├── tiers.ts                # Founders Pass tier data
│   ├── factions.ts             # Faction definitions
│   ├── gangs.ts                # Block gang definitions
│   ├── skills.ts               # Tri-path skill trees
│   ├── timeline.ts             # World timeline events
│   └── seasons.ts              # Meta-season definitions
├── hooks/
│   └── useInView.ts            # Intersection observer for scroll reveals
├── styles/
│   ├── tokens.css              # CSS custom properties (design tokens)
│   ├── global.css              # Reset, keyframes, scrollbar, selection
│   └── mixins.module.css       # Shared CSS module compositions
└── types/
    ├── design.ts               # Color, social, token types
    ├── codex.ts                # Codex section/content types
    └── data.ts                 # Shared data shape types
```

## Design Token Strategy

All tokens live as CSS custom properties in `tokens.css`:
- Colors: `--c-accent`, `--c-pink`, etc.
- Fonts: `--font-display`, `--font-body`
- Spacing: `--space-section`, `--space-card`
- Clip paths: `--clip-card`, `--clip-button`

Components reference tokens via `var(--c-accent)`, never hardcoded hex values.

## Component API Principles

1. Every component has a typed Props interface
2. Color variants via `variant` prop mapped to CSS custom property overrides
3. No logic in components — data flows down, events flow up
4. Server components by default, `'use client'` only where interaction needed
5. All content from `data/` files, never hardcoded in JSX
