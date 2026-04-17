# StrandsNation.xyz — CONTEXT.md
## Updated: 2026-04-18 SGT

## Product
StrandsNation is the public-facing marketing site for the Strands ecosystem.
Deployed at strandsnation.xyz via Vercel. Next.js 14+ App Router, CSS Modules, zero runtime CSS.

## S3 Tier Naming (LOCKED 18 Apr)
- Gener8: $5/mo (text-to-music, covers, restyling, base video 540p)
- Gener8 Pro: $8/mo (StyleForge LoRA training, HD video, social sharing)
- AI Director: $10/mo (beat-synced shot planning, SOTA video gen via API, local or API-bundled)
- Creator Pro: $20/mo (all-in-one bundle)
- DAW Pro: BACKBURNERED. ACE Studio 2.0 owns this market. Our moat is local inference + AI Director.
- NO licence fees. Subscription only. First 5K users get first month free. Annual subs get extra month.

## S3 Pricing Audit (18 Apr)
All stale "$8 one-time licence" references purged from:
- /s3/page.tsx (was already clean, now updated tier names)
- S3_Everywear_Deck_v3.pptx (7 edits across 4 slides)
- SomoKasane_Corporate_Deck_v2.pptx (5 edits across 2 slides)
- S3_Management_Accounts_v1.xlsx (licence assumptions zeroed, section annotated)
- s3studio-web UpgradeModal.tsx (full rewrite to subscription-only)
- s3studio-web Landing.tsx (tier cards updated)
- s3studio-web appRegistry.ts (vid-pro → ai-director)

## Ecosystem Pages
- /s3: S3 product page with pricing, benefits, countdown. Mobile: accordion + carousel.
- /network: Ecosystem overview (EveryWear, MyMories, Strands Chain, Community)
- /manifesto: Philosophy page (manifesto, whitepaper, Architects book)
- /whitepaper: Full whitepaper with sidebar nav and scroll tracking
- /codex: Game lore encyclopedia
- /game: Game overview

## Competitive Notes (18 Apr)
- ACE Studio 2.0 (acestudio.ai): Full DAW, vocal synth, instruments, video composer. Cloud. $16-22/mo.
- S3 differentiation: local inference (zero marginal cost), AI Director orchestrator, StyleForge LoRA training, $5 entry point.
- s-gener8 (GGUF build): lighter footprint, 4-6GB VRAM target, acestep.cpp C++/GGML inference. In development.

## Consolidated Revenue Impact (18 Apr)
Removing licence fees from S3_Management_Accounts_v1.xlsx:
- 24M total revenue drops from ~$19.7M to ~$16.2M (subscription only)
- Gross margin unchanged at 96%+
- Strands_Investor_Model_v3.xlsx consolidated figures on Corporate deck slide 6 ($26.2M) need updating to reflect this
