# Whitepaper V6 - Chapter 4: EveryWear

## What EveryWear Is

EveryWear is the evolving sovereign interface layer of the Strands ecosystem. It begins as a lightweight distribution surface and matures into the persistent runtime through which memory, wallet, agents, validation, and spatial data are accessed.

It is not a single application. It is not permanently identical to the game client. EveryWear is the interface layer that persists across every phase of the Strands platform, adapting its form as the ecosystem matures while maintaining continuity of identity, data, and function for the user. The game client starts close to the EveryWear surface, then dedicated game experiences split off into their own runtimes while EveryWear remains as the launcher, vault, wallet, agent surface, and continuity shell around them.

This chapter describes the five phases of that evolution, the logic behind each transition, and the core functions EveryWear carries at maturity.

## Why It Evolves in Phases

EveryWear ships as an evolving substrate and interface to the Strands world. It begins as the player's entry point through the game, then expands into the broader personal, economic, and spatial runtime of the ecosystem.

Each phase exists because its predecessor has proven a capability and exposed a limitation. The Telegram Mini App proves distribution but cannot carry persistence. The Chromium fork proves persistence but cannot deliver high-fidelity 3D. The game launcher bridges the gap but creates a bloated monolith. Bifurcation separates concerns so the game can scale visually while EveryWear scales functionally. The Agentic OS is the convergence point where sovereign runtime meets spatial computing.

The sequence is not aspirational. Each phase has a clear activation condition, a clear purpose, and a clear handoff to the next.

## Phase 1: Telegram Mini App

**Purpose:** Frictionless distribution and onboarding at maximum reach.

The first EveryWear surface is a Telegram Mini App. It exists because Telegram provides 900 million monthly active users, zero-friction app discovery, native payment rails (TON, Telegram Stars, card via MoonPay), and bio-authentication without requiring users to install anything beyond the messaging client they already use.

At this phase, EveryWear is lightweight by design. It carries the game's onboarding sequence, the initial desktop OS interface, and the fiat payment layer. There is no wallet binding at entry, no blockchain exposure, no token mechanics. A player downloads nothing. They tap a link inside Telegram and begin playing.

The Mini App proves three things: that the game's onboarding loop converts and retains users, that the fiat economy generates revenue without token dependency, and that the Telegram ecosystem provides a viable distribution channel at scale. These are the activation conditions for Phase 2.

What the Mini App cannot do is persist data beyond the session, host sovereign storage, or run agentic processes. It is a surface, not a runtime. That limitation is what Phase 2 resolves.

## Phase 2: Chromium Fork and Agentic Browser

**Purpose:** Persistence, sovereign data, wallet integration, and agentic browsing.

When the Mini App has proven distribution and retention, EveryWear graduates into a dedicated Chromium-forked browser. This is not merely a browser with game features bolted on. It is a privacy-first sovereign client that carries three capabilities the Mini App could not:

**Mymories.** The sovereign data vault activates at this phase. Mymories is the persistence layer through which the player's interaction history, preference signals, consent records, and contextual data are stored in player-controlled encrypted storage. It is the data substrate that makes My Maits contextually aware across sessions. In Phase 1, the game could only store transient session state. In Phase 2, EveryWear becomes the player's data home.

**Wallet integration.** The Blank Sync Ledger, the player's native wallet, activates invisibly at the first purchase threshold, when simple fiat participation graduates into persistent asset ownership and settlement history. The wallet is embedded in EveryWear, not bolted on as an extension. It handles TON settlement, asset provenance, and later, $KREDS when the chain layer activates. The player sees purchase confirmations. The underlying blockchain mechanics remain abstracted by default unless the player chooses to inspect or engage them directly.

**My Maits interface.** EveryWear becomes one of the primary surfaces through which players interact with their compiled Mait agents. The Chromium fork provides the runtime environment for agentic interaction. The Mait can assist with browsing, provide contextual information, and operate as a personal AI layer across the player's digital activity, not only inside the game.

The Chromium fork also hosts the first out-of-game A.R.E. surface. When the player browses outside of game sessions, the A.R.E. panel offers consented, compensated attention opportunities. The diegetic framing is lighter than the in-game Proper Gander aesthetic, but the consent architecture and revenue split are identical.

Phase 2 proves that EveryWear can function as a persistent sovereign client: vault, wallet, agent surface, and earning layer in a single runtime. What it cannot do is deliver the high-fidelity 3D experience the game requires as it matures beyond the initial desktop OS phase.

## Phase 3: Game Launcher and WebGL Bridge

**Purpose:** Delivering richer game experiences without abandoning the EveryWear shell.

As the game evolves beyond the flat desktop OS into three-dimensional environments, the Chromium fork's rendering capabilities are no longer sufficient. Phase 3 introduces WebGL bridging, allowing EveryWear to launch and host progressively richer game content while maintaining the persistent shell around it.

At this phase, EveryWear functions as a launcher: it handles authentication, loads the player's vault and wallet state, loads the player's Mait interface, and then hands off to the WebGL game layer for the immersive gameplay session. When the player exits the game, they return to the EveryWear shell with full continuity of data, identity, and agent context.

This is the phase where the tension between game fidelity and platform function becomes visible. The game wants to be heavier — more geometry, more dynamic environments, more compute-intensive rendering. The platform wants to remain lean — vault, wallet, agents, earning. Phase 3 is the bridge. Phase 4 is the resolution.

## Phase 4: Bifurcation

**Purpose:** Separating high-fidelity game clients from the persistent sovereign runtime.

This is the architecturally decisive phase. Unity and Unreal become their own dedicated game experiences, delivering the visual and interactive fidelity that WebGL cannot match. These are no longer "EveryWear" in the narrow sense. They are standalone game clients — rich, immersive, optimised for their respective engines — that launch from and return to the EveryWear shell.

EveryWear itself remains the persistent interface: the launcher, the vault, the wallet, the agent surface, the A.R.E. host, and the continuity layer that ties the player's identity and data across every game client and platform surface they use. A player might run the Unity client on desktop, the Unreal client on console, and the EveryWear browser on mobile. In every case, their Mymories vault, their compiled Mait, their wallet state, and their earning history persist through EveryWear.

The bifurcation is necessary because a high-fidelity game client and a sovereign runtime shell should not remain one bloated object. They have different performance requirements, different update cycles, different scaling characteristics, and different user expectations. Splitting them allows each to evolve at its own pace without compromising the other.

After bifurcation, EveryWear is definitively not "the game client." It is the persistent layer around the game clients — and around everything else in the Strands ecosystem.

## Phase 5: Agentic OS Across XR, Desktop, and App

**Purpose:** Convergence into a user-controlled operating layer for spatial computing.

At full maturity, EveryWear is no longer merely a browser or a launcher. It is an agentic operating system: a sovereign runtime that hosts the player's compiled agents, sovereign data, wallet, validation functions, and spatial interaction layer across every device class — desktop, mobile, and XR headsets.

At this phase, five core functions converge:

**Game Client orchestration.** EveryWear launches and coordinates game sessions across multiple engine targets (Unity, Unreal, WebGL) while maintaining persistent identity and state.

**Data Vault.** Mymories at full maturity: the player's sovereign memory stack encompassing interaction history, consent records, asset provenance, spatial data, and the contextual substrate that powers their Mait agents. All data stored in player-controlled encrypted storage, portable across devices.

**SAL Runtime.** The Structured Adaptive Layer operates within EveryWear using context provided by Mymories. As the vault matures, this enables a personalised contextual SAL: a user-shaped adaptive behaviour layer built from Sync Profile, accumulated interaction history, consented data, and contextual signals. This becomes one of the building blocks of future decentralised cognition.

**A.R.E. Host.** The full Attention Redistribution Engine runs through EveryWear: consent management, context assembly, diegetic delivery, attention measurement, revenue calculation, and payment settlement. In XR environments, attention verification graduates from interaction-based measurement to spatial sensing through WiFi DensePose presence detection and, eventually, hardware-level eye tracking.

**Staking, validation, and spatial data.** At later ecosystem maturity, EveryWear-equipped devices can participate in network validation, contributing to the Strands Chain's consensus while earning validation rewards. XR devices additionally host and contribute spatial data — the volumetric AR layer data that powers Layer U's spatial economy (detailed in Chapter 5). This function activates only at later maturity, not at launch.

The end state is no longer merely a browser. It is a user-controlled operating layer through which the player's entire relationship with the Strands ecosystem is mediated — agents, memory, earning, identity, and spatial interaction — regardless of device form factor.

## Core Functions at Maturity

At full maturity, EveryWear carries five functions simultaneously. Remove any one and the rest lose range, continuity, or utility.

| Function | Role | Phase Activated |
|---|---|---|
| Game Client Orchestration | Launches and coordinates game sessions across engine targets | Phase 3 |
| Data Vault (Mymories) | Sovereign memory, consent, asset provenance, spatial data | Phase 2 |
| SAL Runtime | Personalised contextual behaviour grounded in the Mymories substrate | Phase 5 |
| A.R.E. Host | Consent-based attention economy with fiat settlement | Phase 2 (basic), Phase 5 (full spatial) |
| Validation and Spatial Data | Chain validation, XR spatial layer hosting | Phase 5 |

## What This Chapter Does Not Cover

This chapter describes EveryWear as the sovereign interface layer and its five-phase evolution. The spatial economy that EveryWear hosts at maturity — Layer U and the Attention Redistribution Engine — is detailed in Chapter 5. The token economics that flow through EveryWear's wallet layer are detailed in Chapter 6 ($KREDS). The chain infrastructure that EveryWear validates against is detailed in Chapter 7 (Strands Chain). The game itself, which EveryWear launches and orchestrates but does not define, is detailed in Chapter 2.
