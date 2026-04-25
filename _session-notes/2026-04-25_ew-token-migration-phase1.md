---
date: 2026-04-25
project: StrandsNation
domain: EWDS / Everywear Design System
phase: Token migration Phase 1 (page modules)
status: complete
file_for: MyMory ingest (vault offline this session)
---

# EWDS Token Migration — Phase 1: Page Modules

## Scope completed

Migrated all six page-level `*.module.css` under `StrandsNation/src/app/` from
the legacy `--c-*` alias layer to canonical `--ew-*` tokens, plus tokenized
the countdown housings on the three pages that have them.

| File | --c-* rename | Countdown housing |
|---|---|---|
| `everywear/page.module.css` | done | tokenized (cyan) |
| `s3/page.module.css` | done | tokenized (cyan) |
| `game/page.module.css` | done | tokenized (red, via `--ew-danger`) |
| `whitepaper/page.module.css` | done | n/a |
| `philosophy/page.module.css` | done | n/a |
| `network/page.module.css` | done | n/a |

Verification: `rg "--c-" src/app/**/page.module.css` returns zero matches.

## Token mapping applied

| Legacy | Canonical |
|---|---|
| `--c-accent` / `--c-green` (cyan-fallback) | `--ew-primary` |
| `--c-pink` | `--ew-expressive` |
| `--c-yellow` | `--ew-warm` |
| `--c-purple` | `--ew-premium` |
| `--c-red` | `--ew-danger` |
| `--c-text` | `--ew-text` |
| `--c-sub` | `--ew-text-muted` |
| `--c-dim` | `--ew-text-faint` |
| `--c-border` | `--ew-border` |
| `--c-bg` | `--ew-bg` |
| `--c-surface` | `--ew-surface` |

## Countdown housing tokenization (the 5 hex pattern)

For `everywear` and `s3` (cyan primary):
- `.countdownFrame` background → `var(--ew-surface-raised)`
- `.countdownInner` background → `var(--ew-sunken)`
- `.digitGhost` color → `color-mix(in oklab, var(--ew-primary) 8%, var(--ew-sunken))`
- `.countdownDigit` text-shadow inner glow → `color-mix(in oklab, var(--ew-primary) 65%, transparent)` (s3 uses 80%)
- `.countdownDigit` text-shadow outer glow → `color-mix(in oklab, var(--ew-primary) 35%, transparent)` (s3 has a third 15% layer)

For `game` (bomb-timer red, mapped to `--ew-danger` so it stays red across skins):
- All cyan tokens above swapped for `--ew-danger`.

## Decisions logged

1. **`--c-green` in s3 was a misnomer** — every call site fell back to
   `#00C2FF` (cyan). Mapped to `--ew-primary`, not `--ew-success`. Author
   intent was always cyan; the token name was historical from CRT-green era.

2. **`.digitGhost` uses 8% color-mix, not pure `--ew-sunken`** — pure sunken
   would collapse the ghost glyph against the inner panel background. The 8%
   primary mix preserves the dim-LED-segment look while tracking skin primary.

3. **Structural greys preserved** — `#333`, `#444`, `#1a1d26`, `#222` on
   countdown chassis (frame border, inner border, lift shadow) left as
   hardcoded greys. They read as physical metal, not skin-reactive surfaces.
   Convertible to `--ew-border` / `--ew-border-strong` later if metal needs
   to follow skin chrome.

4. **Game timer red kept across skins** — `--ew-danger` is defined under all
   three skins (classic `#FF4444`, refined oklch red, terminal oklch red).
   Mapping the bomb-timer to `--ew-danger` rather than hardcoded `#FF1A1A`
   means the timer stays semantically "danger" across skins, not aesthetically
   off-brand under terminal/refined.

## Phase 2 — proposed scope

`s3/page.module.css` still contains roughly 40 hardcoded `#00C2FF` and
`rgba(0, 194, 255, ...)` call sites outside the countdown — tier cards,
accordion, carousel, dot indicators, hover/border tints, allInOne banner.
None of these were `--c-*` refs so they were out of Phase 1 scope.

**Phase 2 deliverable**: full skin-reactivity on `/s3` by replacing those
hardcoded cyan literals with `var(--ew-primary)` and the rgba alphas with
`color-mix(in oklab, var(--ew-primary) X%, transparent)`. Same drill applies
to `game/page.module.css` for any remaining hardcoded reds outside the
countdown housing (status block borders, dot indicators).

Estimate: 1 session, mostly mechanical; one design call on the
`color-mix(in oklab, #00C2FF 55%, #1a1d26)` desaturated card-frame pattern
used by `.benefitCard`, `.tierCard`, `.carouselSlide`, `.allInOne` — needs
to become `color-mix(in oklab, var(--ew-primary) 55%, var(--ew-surface))` or
similar. That's the only judgement call.

## Next priorities

- Phase 2 sweep on `s3/page.module.css` (and `game/`) — see above
- Sweep components: `Card.module.css`, `Tag.module.css`, `Timeline.module.css`,
  `TierGrid.module.css`, `Mini.module.css`, `MusicPlayer.module.css`,
  `Callout.module.css`, `SocialGrid.module.css`, `CodexSidebar.module.css`,
  `Marquee.module.css`, `Nav.module.css`, `SectionLabel.module.css` — all
  still reference `--c-*` per the pre-migration grep
- Sections: `home/HeroSection`, `home/EcosystemSection`, `home/ArchitectsSection`,
  `home/GameSection`, `codex/codex-shared` — same
- Once components + sections are clean, the legacy alias block in
  `everywear/tokens.css` (Phase 4 per the comment in that file) can be purged
