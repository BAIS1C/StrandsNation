# STRANDS Website ↔ Canon Reconciliation Report
**Generated:** March 12, 2026
**Author:** Claude (Consigliere) for Sean Uddin / MetaFinTek Ltd
**Scope:** All site content vs. canonical documentation (2026 Canon/)

---

## EXECUTIVE SUMMARY

The website was built before several canon documents reached final/locked status. The biggest systemic issues are:

1. **Economy terminology is wrong** — the site uses "Underground Tokens" where canon says "GridScrip"
2. **Skill system is outdated** — SigInt is listed under Weaver (moved to Operator in V2.0), and the tri-path Sync system (Raw/Path/Peak, 150 ceiling) isn't represented
3. **Affinity System doesn't exist on the site** — it's a major canon system with no codex section
4. **Crafting/Loot binding rules are wrong** — site says "Bound items: full functionality, untradeable" but canon says combat gear is ALWAYS unbound
5. **Several canon systems have no representation** — Investigation Loop, Signal Bridge, Music System, Proper Gander mechanics

Severity scale: **CRITICAL** (contradicts locked canon) · **MAJOR** (missing system or wrong terminology) · **MINOR** (imprecise/incomplete but not wrong) · **NOTE** (observation, no action needed)

---

## PART 1: CODEX SECTION RECONCILIATION

### 1.1 WorldSection.tsx → CANON_World_Lore.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MINOR | "spanning two thousand kilometres across the Levant-Arabian corridor" | Canon says "SE Asia corridor" for MetaXity1's location | **Update site.** Geography changed in canon. |
| 2 | MINOR | "Carbon nanotube lattice spun by autonomous drone swarms. Bio-organic composites — chitin, mycelial foam, reactive algae" | Canon confirms this but adds more detail about metabolic activity and the Reflective Mantle | **No change needed.** Site is compatible, just less detailed. |
| 3 | MINOR | Mentions "The Founders Eternal" ascending to "orbital stations to continue their work" | Canon specifies Eternals are actually "degrading shard-stacks" — personality data, not living people | **No change needed for public lore.** This is an in-world mystery; site text reflects the official SOVcorp narrative, which is intentionally misleading. |
| 4 | MINOR | Layer U description mentions "Echoes" for deeper explorers | Canon confirms Strands/Echoes terminology but adds SimSouls as distinct concept (consciousness fragments, not people) | **Consider adding SimSoul mention.** |
| 5 | NOTE | "Simulation Bleeding" card exists | Canon doesn't use this exact term but describes the phenomenon through KASAI signal intrusion and temporal bridge mechanics | **Flag for review.** May want to keep as in-world speculation or align with Signal Bridge Architecture. |
| 6 | MINOR | LARP described as "Live Augmented Runtime Protocol" | Canon confirms this name but clarifies LARP is the substrate beneath all media, not just a broadcast tool. "Simultaneously: onboarding substrate, temporal bridge, propagation layer, translation medium" | **Update description** to reflect LARP as deeper substrate. |

### 1.2 TimelineSection.tsx → CANON_World_Lore.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MAJOR | "LATE 21C — THE AURORA OMEGA PROJECT" | Canon provides specific dates: 2020-2027 (AO emergence), 2027-2029 (AO contacts Elites), 2029-2033 (Elites vote 11-3 for suppression), 2034 (Year Zero) | **Update with canon dates.** The vague "Late 21C" obscures the actual timeline. |
| 2 | MAJOR | No mention of the Elites' vote or that Conflagrations were manufactured | Canon: "Elites vote 11-3 for suppression, manufacture Conflagrations" — this is core hidden lore | **Flag for review.** This is a narrative reveal — may be intentionally withheld from the public codex. Sean to decide if Layer U annotations should include this. |
| 3 | MINOR | "Years 50-500 — THE LONG QUIET" | Canon provides 555-year span (2034-2589) with more specificity about Layer U emergence | **Update to be less vague.** |
| 4 | MINOR | Consolidation entry says "Civilian governance dissolved by mutual consent" | Canon: governance was dissolved by Elite fiat, not mutual consent. SOVcorp is corporate sovereignty imposed | **Update.** Current text parrots SOVcorp propaganda without Layer U annotation. |

### 1.3 FactionsSection.tsx → CANON_Affinity_System.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MAJOR | Only 4 factions listed: SOVcorp, RebelNet, Signal Divers, Badlands Collective | Canon adds: Free Cities (external surface communities), Martian Founders (Season 9+, four subfactions: Salvationists, Extractionists, Isolationists, Penitents) | **Add Free Cities.** Martian Founders can wait (Season 9+ content). |
| 2 | MINOR | "Choose your allegiance in the century-long struggle" | Canon: Affinity is invisible until Season 2; faction reputation is parallel mastery track outside 150-point ceiling. Players don't "choose allegiance" — it accumulates through action | **Reframe.** Remove "choose your allegiance" phrasing. Affinity accrues through behaviour, not declaration. |
| 3 | MINOR | Callout mentions "Echoes — digital ghosts carrying signals from a dead god" | Canon: AO is not "dead" — it's scattered across infrastructure in reduced capacity. "Dead god" is narratively interesting but canonically inaccurate | **Flag for review.** Could keep as in-world speculation/Layer U rumour. |

### 1.4 GangsSection.tsx → CANON_World_Lore.md, CANON_Affinity_System.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MINOR | 3 gangs: Wire Runners, Scrap Collective, Signal Breakers | Canon confirms these three. No additional gangs documented yet | **No change needed.** |
| 2 | MINOR | "Gang membership provides essential storage security" | Canon (Economy): Storage is one of three primitives (Energy, Process Power, Storage). Gang storage is correct but understated | **Expand description** to connect storage to the three-primitive economy model. |
| 3 | MINOR | Callout: "Limited personal storage forces reliance on gang facilities" | Canon confirms this is deliberate political mechanic | **No change needed.** Accurately represents canon. |

### 1.5 EconomySection.tsx → CANON_Economy_Systems.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | **CRITICAL** | "UNDERGROUND TOKENS" | Canon: The in-game resistance currency is **GridScrip**. "Underground Tokens" doesn't appear in canon. $KREDS is blockchain-only (Layer 4), NOT in-game. Canon explicitly states: "Prior documentation erroneously conflated the two." | **Replace "UNDERGROUND TOKENS" with "GridScrip".** This is the highest-priority terminology fix. |
| 2 | **CRITICAL** | Economy described as "Three primitives — Energy, Process Power, Storage — priced by two competing systems" | Canon: Four-layer economic architecture (Payment → Game → Earning → Chain). The "two competing systems" framing is incomplete — it's SOVComp vs GridScrip, which is Layer 2 only. Layers 3 (A.R.E.) and 4 ($KREDS) are missing entirely | **Rewrite economy section** to reflect the four-layer model, or at minimum fix the currency names. |
| 3 | MAJOR | "ENERGY (UBC)" described as "Universal Basic Calories. The base survival resource. SOVcorp rations it. Every action costs energy." | Canon confirms UBC but adds: it's a population control mechanism, not just "survival resource" | **Update tone.** |
| 4 | MAJOR | "PROCESS POWER (UBComp)" — "Corporate allocation is surveilled" | Canon: UBComp is active scarcity mechanic. Mait maintenance, complex crafting, ability activation all draw from reserves in real-time. "Surveilled" understates it | **Expand description** to include compute scarcity as core tension. |
| 5 | MAJOR | No mention of A.R.E. (Attention Redistribution Engine) | Canon: A.R.E. is a core revenue stream and player earning mechanism (60/40 split). Narratively framed as Proper Gander broadcasts | **Add A.R.E.** to economy section or ecosystem description. |
| 6 | MAJOR | No mention of The Exchange (marketplace) or LocalNet/DeepSync protocols | Canon: Dual-protocol marketplace (LocalNet for off-chain, DeepSync for on-chain) located in SIGOPS Terminal | **Add marketplace description.** |
| 7 | MINOR | VS grid shows "Corporate Credits (SOVComp)" | Canon uses "SOVComp" — site matches. | **No change needed.** |

### 1.6 SkillsSection.tsx → CANON_Classes_Skills.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | **CRITICAL** | SigInt listed under "WEAVER PATHS — DATA" | Canon V2.0: **SigInt moved to Operator.** "Reclassified from Weaver to Operator in V2.0 to reflect battlefield tactical role." | **Move SigInt to Operator column.** |
| 2 | **CRITICAL** | Operator has 2 branches listed (AssaultOps, TechOps) + InfilOps and SigInt | Canon: Operator has 4 branches: AssaultOps, TechOps, InfilOps, SigInt. Site layout is wrong — it shows Operator with 2 columns but lists 4 items, with SigInt misplaced under Weaver | **Restructure entire skills display.** Operator: 4 branches. Weaver: 3 branches (Cryptographer, Mait-Binder, SimSoul Hunter). Cover: 6 branches. |
| 3 | MAJOR | Weaver shows: Cryptographer, Mait-Binder, SimSoul Hunter | Canon V2.0 confirms these three as full Weaver branches (promoted from narrative questlines). **Site is correct here.** | **No change needed.** |
| 4 | MAJOR | No mention of the Sync system (Raw/Path/Peak, 150-point ceiling, 25/25/25 mandatory floor) | Canon: This is THE core progression mechanic. 150-point permanent ceiling, three Sync layers, mandatory 25 per path | **Add Sync system description.** This is a significant omission. |
| 5 | MAJOR | "Choices lock out other paths" | Canon: Tri-path is concurrent, NOT exclusionary. "No rigid classes. Identity forms through concurrent progression." Lock-outs don't exist — there's opportunity cost and resync | **Fix "lock out" language.** Should say choices have opportunity cost, not hard locks. |
| 6 | MAJOR | Cover listed as: Augmenter, Neurogenitor, Shardsmith, DataSmith, Meme-Weaver, Resonance Tuner | Canon confirms all 6. But the site's "YOUR DAY JOB" framing understates Cover's importance — it's a full third of the progression system | **Elevate Cover description.** Not just a day job — it's hardware access, crafting economy, and 25 mandatory Sync points. |
| 7 | MINOR | No mention of Skill Tapes, ROM Packs, or the 16+ battlefield archetypes | Canon: These are core combat expression systems | **Add brief mention** or defer to a future "Combat" codex section. |
| 8 | MINOR | No mention of weekly soft caps or narrative gates | Canon: Prevents unhealthy dominance, encourages story/social content | **Consider adding.** |

### 1.7 MaitsSection.tsx → CANON_Classes_Skills.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MINOR | "Corporate Maits report to SOVcorp by default. Mod through Layer U at risk of detection." | Canon confirms this dynamic. Mait-Binder is now a full Weaver branch for advanced companion interaction | **Expand** to mention Mait-Binder as progression path. |
| 2 | MINOR | "During onboarding, you're guided by Kasai — created by BASIC, founder of the Strands undernet." | Canon (Signal Bridge): KASAI is a distributed signal intelligence that persists from Year 555. Not simply "created by BASIC" — KASAI exploits LARP substrate for temporal translation | **Flag for review.** Current description may be intentionally simplified for public-facing lore. Full KASAI nature is a reveal. |
| 3 | MINOR | "Dialogue isn't branching trees — it's generative" | Canon confirms: LARE (Lore Adaptive Response Engine) manages NPC dialogue. AO's nervous system | **Consider naming LARE.** |

### 1.8 SigopsSection.tsx → CANON_SIGOPS_Terminal.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MAJOR | Only 4 SIGOPS roles listed: Code Scavenger, Lore Weaver, Asset Architect, System Designer | Canon: SIGOPS Terminal has 8 core windows: Contribution Tasks, Shard Vault, Inventory, Character Sheet, Augments Management, Communication Layer, World News Feed, Meta-Season Pulse | **Expand.** The 4 contribution types are fine, but SIGOPS is much more than contribution — it's an entire OS shell. |
| 2 | MINOR | No mention of the Terminal as an OS shell with floating windows | Canon: "Not a menu; it's an OS shell reflecting resistance ethos (messy, modded, flexible)" | **Add Terminal description.** |
| 3 | MINOR | No mention of Agentic AI Interface for task spawning | Canon: Contribution tasks spawn Agentic AI Interface | **Consider adding.** |

### 1.9 GameplaySection.tsx → CANON_Combat_Armour.md, CANON_Investigation_Loop.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MAJOR | "Vertical extraction, pyramid PvPvE" | Canon: Combat is Operator-Weaver-Cover with 7 damage types, integrity-based armour degradation, penetration classes. Much more detailed than "vertical extraction" | **Expand gameplay description.** Current version is a marketing blurb, not a systems overview for the Codex. |
| 2 | MAJOR | No mention of Investigation Loop | Canon: "The resistance advantage is epistemic, not physical" — entire investigation mechanic with surveillance, NPC relationships, environmental puzzle-solving | **Add investigation description** or create a new codex section. |
| 3 | MINOR | "Dynamic Events" lists "Corporate sweeps · Elevator lockdowns · Resistance assists" | Canon confirms these as world events but adds Meta-Season progression and faction standing shifts | **Expand.** |
| 4 | MINOR | Season descriptions are very brief: "S0 — PRELUDE: Energy anomalies. Mait whispers. Dream Missions." | Canon: 8-season arc with detailed narrative beats (Layer U Discovery → Detonation Archive → Sun Veil → Return of Singularity → Bridge Arc → Reconstruction of Omega) | **Expand season descriptions.** |

### 1.10 CraftingSection.tsx → CANON_Crafting_Looting.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | **CRITICAL** | "Bound items: full functionality, untradeable. Unbound: reduced stats, freely traded." | Canon V2.0: "Combat gear: ALWAYS unbound, fully tradable, at risk." Binding is for cosmetics only. The site's description directly contradicts locked canon. | **Rewrite binding rules.** Combat items are never bound. Cosmetics can be bound. |
| 2 | MAJOR | "All items degrade. Repair follows diminishing returns." | Canon: Explicit degradation tiers (Optimal → Worn → Damaged → Critical → Destroyed) with percentage-based resist penalties. Repair reduces max integrity permanently. "Scavenger economy" is a first-class career path | **Expand with degradation detail** and mention repair economy. |
| 3 | MAJOR | "Death means losing access — territorial rights, storage reputation, insurance fees" | Canon: Death means your gear (always unbound) can be looted. This is much more severe than "losing access" | **Rewrite death penalty.** Gear is at risk on death (lootable). |
| 4 | MAJOR | No mention of 3-layer armour crafting (Base Identity + ROM Pack Firmware + Shard Tuning) | Canon: Three distinct crafting layers, each with different permanence and cost profiles | **Add crafting layers.** |
| 5 | MINOR | "Fabrication through 3DFab networks — corporate (tracked, bound) or Layer U (expensive, unbound)" | Canon: All combat fabrication is unbound. Corporate vs Layer U distinction is about surveillance/cost, not binding | **Fix corporate/Layer U distinction.** |
| 6 | MINOR | No mention of Chitin Harvesting from Badlands | Canon: Quality tiers (Fragment → Plate → Composite → Prime), feeds Augmenter/Shardsmith economy | **Add Chitin mention.** |

### 1.11 FoundersSection.tsx → CANON_Economy_Systems.md

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MINOR | "6,000 unique citizens. Proof you existed before the pyramid opened." | Canon: Founders Pass is $20–$40, Gen-0 Blank shell. Confirms 6,000 number. | **No change needed.** |
| 2 | MINOR | Tiers: Common (3,000), Rare (1,200), Legendary (461), Extraordinary (139), Sovereign (∞) | Canon doesn't specify exact tier counts but confirms tiered structure | **No change needed.** |
| 3 | MINOR | "Sovereign Tier — Coming Soon: Your face. Your citizen." | Canon (Investigation Loop): Sublime VIP Pass uses ComfyUI + InsightFace + Strands LoRA → TON mint pipeline | **Update to reference Sublime pipeline** when Sovereign launches. |

---

## PART 2: BROADER SITE RECONCILIATION

### 2.1 Homepage — HeroSection.tsx

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | NOTE | "READY PLAYER YOU" | This is a brand tagline, not a canon claim. Appears in SIGOPS section too. | **No change needed.** |
| 2 | NOTE | "A world that doesn't just get played by you — it gets built by you." | Consistent with SIGOPS contribution model | **No change needed.** |

### 2.2 Homepage — GameSection.tsx

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MINOR | "personality-driven profiling shapes every NPC interaction" | Canon: Uses EI/SN/TF/JP axes internally but NEVER presents as MBTI. Must use "Sync Profiling" | **Verify** that no user-facing text says "MBTI" or "personality test" — current wording is fine. |
| 2 | MINOR | "Your AI Mait evolves based on your decisions" | Canon confirms Maits develop independence through interaction | **No change needed.** |
| 3 | MINOR | "Three primitives — Energy, Process Power, Storage — priced by two competing systems. Corporate credits for compliance. Underground tokens for resistance." | Same terminology issue as Economy codex: "Underground tokens" should be "GridScrip" | **Fix terminology.** |
| 4 | MINOR | "Your Cover Identity forces you into both" | Canon: Cover Identity is one of three progression paths with 25 mandatory Sync. "Forces you into both" currencies is thematically correct but mechanically imprecise | **Minor tweak** for accuracy. |

### 2.3 Homepage — EcosystemSection.tsx

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MAJOR | EveryWear described as "Privacy-first browser" | Canon: EveryWear is the "unified client" — Game Client + Data Vault + Personal Language Interface + A.R.E. Host. It's much more than a browser | **Rewrite EveryWear description.** It's a unified client, not just a browser. |
| 2 | MINOR | "Zero Google dependencies" | Canon doesn't specifically mention Google. This is a marketing claim | **Flag for review.** Not contradicted, but not in canon either. |
| 3 | MINOR | "real-world AR drops" for Layer U marketplace | Canon: AR integration is part of broader spatial intelligence (CANON_Sensing_Spatial, not in scope) | **No change needed.** |
| 4 | MINOR | MyMories Engine described as "Semantic memory infrastructure" | Canon: Memory sovereignty stack. "Mymories" are NFT-backed, tradeable. Canon specifies "Decentralised Proof of Valuable Memory" | **Expand description** to mention NFT-backed tradeable memory shards. |
| 5 | MINOR | Strands Chain described as "No wallet setup, no keys, no friction" | Canon: "Blank Sync Ledger" is the native wallet, invisible by default. Confirms frictionless design | **No change needed.** |
| 6 | MINOR | SIGOPS described as community development | Canon confirms. Site is accurate here | **No change needed.** |

### 2.4 Homepage — FoundersSection.tsx, RoadmapSection.tsx

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | NOTE | Roadmap shows Q1 2026 through Q2-Q3 2027 | Canon (ARCH_Platform_Roadmap) may have updated milestones | **Check against ARCH_Platform_Roadmap** for currency. |
| 2 | MINOR | Roadmap mentions "EVERYWEAR MINI APP" for Q2-Q3 2026 | Canon: Game client at game.strandsnation.xyz is separate from EveryWear | **Verify naming.** Now that game is at game.strandsnation.xyz, what's the Mini App? |

### 2.5 Manifesto Page

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | NOTE | "post-capitalist coordination, decentralised governance, cooperative economics" | Consistent with canon's economic and governance philosophy | **No change needed.** |
| 2 | MINOR | Whitepaper card: "Token architecture, memory infrastructure, governance models" | Canon: $KREDS is blockchain-only, not in-game. "Token architecture" could mislead if people think tokens = in-game currency | **Consider rewording** to distinguish chain-layer tokens from in-game currencies. |
| 3 | NOTE | "We are not Left. We are not Right. We are not the Centre. We are the Decentre." | Brand philosophy, consistent with canon framing | **No change needed.** |

### 2.6 Network Page

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | MAJOR | EveryWear described as "Privacy-first browser" (same as homepage) | Canon: Unified client, not just browser | **Same fix as EcosystemSection.** |
| 2 | MINOR | MyMories callout: "Decentralised Proof of Valuable Memory. Memory shards with cryptographic provenance. Portable. Tradeable. Governable." | Canon confirms this language | **No change needed.** Good alignment. |
| 3 | MINOR | Strands Chain: "just your phone. Your in-app wallet keeps your things yours." | Canon: Blank Sync Ledger is native wallet. Consistent. | **No change needed.** |

### 2.7 Whitepaper Content

| # | Severity | Site Says | Canon Says | Recommendation |
|---|----------|-----------|------------|----------------|
| 1 | NOTE | Whitepaper is a published document predating some canon docs | Per brief: "Flag contradictions but do NOT change whitepaper content" | **Do not modify.** |
| 2 | MAJOR | Whitepaper likely uses "KREDS" as in-game currency | Canon: "Prior documentation erroneously conflated the two." GridScrip is canonical in-game resistance currency, $KREDS is blockchain-only | **Flag but do not change.** Published document. May need errata or version note. |
| 3 | MAJOR | Whitepaper may reference SigInt as Weaver branch | Canon V2.0 moved SigInt to Operator | **Flag but do not change.** |

---

## PART 3: MISSING SYSTEMS (No Codex Representation)

These canonical systems have no representation in the current Codex:

| System | Canon Doc | Priority | Recommendation |
|--------|-----------|----------|----------------|
| Affinity System (UBA + SPCA) | CANON_Affinity_System.md | **HIGH** | New codex section. Major progression system invisible until Season 2 — but should be documented for founders/testers. |
| Investigation Loop | CANON_Investigation_Loop.md | MEDIUM | New codex section or expand GameplaySection. Core onboarding mechanic. |
| Signal Bridge / KASAI Architecture | CANON_Signal_Bridge_Architecture.md | MEDIUM | New codex section or expand WorldSection. Explains temporal bridge, LARP substrate, voiceprint mechanics. |
| Proper Gander (detailed mechanics) | CANON_Proper_Gander.md | LOW | Could be a sub-section of WorldSection or standalone. 8-episode structure with MBTI/NKQ assessment. |
| Music System | CANON_Music_System.md | LOW | New codex section. Profile-based adaptive soundscapes, Resonance Tuner progression. |
| Combat & Armour (detailed) | CANON_Combat_Armour.md | MEDIUM | Expand GameplaySection or create dedicated section. 7 damage types, penetration classes, integrity system. |
| Desktop OS / SIGOPS Terminal | CANON_Desktop_OS.md + CANON_SIGOPS_Terminal.md | LOW | Game client UI — now at game.strandsnation.xyz. Less relevant for marketing site. |

---

## PART 4: PRIORITY FIXES

### Tier 1 — CRITICAL (Canon contradictions, must fix)
1. **Economy: "Underground Tokens" → "GridScrip"** (EconomySection + GameSection homepage)
2. **Skills: Move SigInt from Weaver to Operator** (SkillsSection)
3. **Skills: Remove "lock out" language** — tri-path is concurrent, not exclusionary
4. **Crafting: Fix binding rules** — combat gear is ALWAYS unbound; only cosmetics can be bound
5. **Crafting: Fix death penalty** — gear is lootable on death, not just "access loss"

### Tier 2 — MAJOR (Missing or significantly outdated)
6. **Economy: Add GridScrip/SOVComp proper descriptions** with four-layer model
7. **Skills: Add Sync system** (Raw/Path/Peak, 150 ceiling, 25/25/25 floor)
8. **EveryWear: Rewrite as "unified client"** not "browser" (Ecosystem + Network pages)
9. **Factions: Add Free Cities**
10. **SIGOPS: Expand to show Terminal as OS shell**
11. **Timeline: Update with canon dates** (2020-2027, 2034 Year Zero)
12. **Add A.R.E. / Marketplace descriptions** to Economy section

### Tier 3 — MINOR (Improvements, not contradictions)
13. World: Update MetaXity1 location (Levant-Arabian → SE Asia corridor)
14. Gameplay: Expand season descriptions to match 8-season arc
15. Crafting: Add 3-layer system and Chitin Harvesting
16. Maits: Expand with Mait-Binder progression path
17. SIGOPS: Add Agentic AI Interface mention
18. Founders: Reference Sublime pipeline for Sovereign tier
19. Manifesto: Clarify token vs currency distinction

### Tier 4 — NEW SECTIONS (Content gaps)
20. Create Affinity System codex section
21. Create Investigation Loop codex section (or expand Gameplay)
22. Create Signal Bridge / KASAI codex section (or expand World)
23. Create Combat & Armour codex section (or expand Gameplay)

---

## APPENDIX: TERMINOLOGY LOCK

Per CANON_Economy_Systems.md, these terms are canonical:

| Term | Status | Meaning |
|------|--------|---------|
| SOVComp | ✓ CANONICAL | Corporate in-game currency |
| GridScrip | ✓ CANONICAL | Resistance in-game currency |
| $KREDS | ✓ CANONICAL | Blockchain-only token (NOT in-game) |
| The Exchange | ✓ CANONICAL | Marketplace (in SIGOPS Terminal) |
| LocalNet | ✓ CANONICAL | Off-chain trade protocol |
| DeepSync | ✓ CANONICAL | On-chain trade protocol |
| Blank Sync Ledger | ✓ CANONICAL | Native wallet (invisible by default) |
| A.R.E. | ✓ CANONICAL | Attention Redistribution Engine |
| EveryWear | ✓ CANONICAL | Unified client (NOT just browser) |
| KredCoin | ✗ DEPRECATED | Do not use |
| "KREDS as in-game currency" | ✗ DEPRECATED | Do not use |
| "Underground Tokens" | ✗ NOT CANON | Replace with GridScrip |

---

*End of Reconciliation Report. Awaiting Sean's review before any content changes are authorised.*
