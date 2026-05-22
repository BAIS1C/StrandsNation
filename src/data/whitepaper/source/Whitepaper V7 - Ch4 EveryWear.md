# Whitepaper V7 - Chapter 4: EveryWear

## What EveryWear Is

EveryWear is the sovereign user runtime of the Strands ecosystem. It is the layer through which a person interacts with everything else: their compiled agents, their personal memory vault, their wallet, their tools for creating, their access to the spatial economy, their participation in network validation. It is the only system in the architecture that crosses the user's consent boundary. Every other layer in the stack is either upstream of EveryWear (servers, registries, settlement chains) or downstream of it (display surfaces, glasses, peripherals).

EveryWear is not a single application. It is not the game client. It is not a browser, although it can host browsers. It is a runtime shell that hosts applets, manages local resources, brokers between the user and the network, and persists across every phase of platform maturity. The applets running inside EveryWear are the products users pay for and create with. EveryWear itself is the substrate that makes those products coherent across sessions, devices, and surfaces.

This chapter describes the runtime as it stands today, the applets that run inside it, the shared substrate beneath them, the data-sovereignty boundary that defines its trust model, and the evolution arc through which it matures from a desktop OS for creator tooling into the agentic operating layer for spatial computing.

## The Sequence of Phases

EveryWear evolves in phases because each capability layer depends on the one beneath it being proven first. The earlier the phase, the lower the technical and economic risk to the user and to the ecosystem. The later the phase, the more value the runtime carries and the more it requires structural validation before activation.

Phase 1 is shipping today. It is the Tauri-native desktop OS with the active applet ecosystem and the shared runtime substrate. This is the foundation everything else rests on.

Phase 2 deepens persistence: Mymories vault, wallet integration, A.R.E. client. This work is partially in flight; the Mymories substrate and the wallet are in active build, and the A.R.E. client awaits the upstream Layer U matching layer that Chapter 7 of this whitepaper describes.

Phase 3 introduces high-fidelity game launch from within EveryWear, with WebGL bridging or native engine integration as the game evolves beyond what the desktop OS shell can render directly.

Phase 4 bifurcates the game clients from the persistent runtime, allowing high-fidelity Unity and Unreal experiences to ship as standalone clients while EveryWear remains the launcher, vault, wallet, agent surface, and continuity layer.

Phase 5 converges into an agentic OS across XR, desktop, and mobile, with full A.R.E. host functionality, network validation participation, and spatial data hosting once the underlying chain and pilot-city infrastructure are live.

Each phase has an activation condition rooted in the validation of the previous phase. No phase is assumed. No phase is skipped.

The earlier V6 version of this chapter named Phase 1 as a Telegram Mini App. That distribution surface remains a viable later parallel to the desktop runtime, but the actual execution path took the desktop OS first because the desktop is where the creator tooling needs the runtime control, the GPU access, the model management, and the file system integration that a Mini App could not provide. The Mini App, if it ships, is a Phase 2 or Phase 3 distribution wedge for the lighter functions of the runtime, not the foundation. V7 corrects this on the record.

## Phase 1: The Tauri-Native Desktop OS

**Purpose:** Provide the sovereign runtime substrate for the creator-tool applet ecosystem. Establish data sovereignty at the device layer. Lay the foundation every subsequent phase depends on.

EveryWear today is a Tauri-native desktop application that presents itself to the user as a small operating system. It is not a browser tab. It is not a single-purpose tool. It is a windowed desktop environment with a recognisable shell, system icons, a taskbar, a centre desktop surface, and a multi-window manager that allows multiple applets to run simultaneously in their own windows above the desktop surface.

The shell owns the resources the applets share: GPU detection across CUDA, Vulkan, and CPU fallback paths; VRAM budgeting and scheduling so that multiple applets requesting model inference do not collide; model provisioning that scans local inventories first, downloads from canonical sources second, verifies via SHA256, and adopts existing local model files where compatible; HMAC-secured inter-process communication between the shell and each applet binary; a video encoder sidecar shared across applets that need MP4 output; OAuth flow management for connected services; the user profile and wallet runtime; the multi-applet process table that keeps concurrent applet processes alive and routed.

The shell has been canonized around four user-selectable themes. Light, Classic, Refined, Terminal. Each theme has its own visual treatment of the desktop icons, taskbar, window chrome, and inference HUD. The theming is not cosmetic only. It signals the user's mode of work. Terminal is the operator mode for focused work. Classic is the default consumer-facing mode. Refined is the high-aesthetic mode. Light is the minimal-contrast mode for screen-fatigue or external-display use. The EveryWear Design System (EWDS) defines the token contract that every applet inherits from. No applet rolls its own colour, type, or icon language.

A live inference HUD at the centre of the desktop reports the runtime state in real time: idle, standby, launching, model loaded, purging, error. The user sees what their machine is doing on their behalf. The runtime does not hide its state from them. When a model is loading, the HUD says so. When VRAM is being purged, the HUD says so. When an applet has crashed, the HUD says so. This is part of the data sovereignty thesis. The user is the operator. The runtime tells the truth about itself.

The desktop OS shipping today is a real product, not a scaffold. It has ~50,000 lines of code across the shell and applets, builds clean on the latest tooling, and runs on standard consumer hardware. The architecture pass filed on 2026-05-21 details the module unit map, the cratification plan that promotes ten module units into proper workspace crates, and the shared-surface hoisting plan that moves heavyweight runtime artefacts into a `~/.everywear/` central installation tree. Phase 1 is not a placeholder. It is the foundation.

## The Applet Ecosystem

The applets that run inside EveryWear are the products users pay for. Each applet is a creator tool in its own right. Each applet is also part of a creator pipeline that feeds Layer U inventory once that layer activates. The same content authored in an applet for personal use can be republished into Layer U for additional monetisation. The applet does not change. The output object does not change. Only the placement context changes.

The applet stack at the time of writing:

**1magen.** Image generation. Z-Image diffusion runtime via Rust FFI, with Q8 and Q4 GGUF model groups for VRAM-tier-appropriate quality. End-to-end working: text prompt, optional source image, negative prompt for pure text-to-image, resolution selection, seed control, large primary generate action, output preview, and save to a user-selected folder. The runtime canon is locked: 1magen is a Z-Image applet. Style patches that are not explicitly Z-Image compatible are not 1magen patches. The output object is a static image suitable for personal use today and for skin-the-world dNFT pack contribution to Layer U inventory tomorrow.

**Gener8.** Music generation. ACE-Step inference via a headless sidecar binary, paired with a DAW engine that mixes, transports, plays back, and exports. Beats engine for tempo detection and grid alignment. AI director for compositional planning. Whisper alignment for lyric synchronisation. Tier reconciler for entitlement-gated features. Library and playlist management. Eighty-plus HTTP routes in the local shim. The output object is a music track suitable for personal use today and for event audio scoring contribution to Layer U inventory tomorrow.

**Vid Studio.** Video visualizer and montage composition. Builds music videos and visual content over audio inputs. Spatial video output. The output object is a video file suitable for personal social distribution today and for spatial video inventory contribution to Layer U tomorrow.

**3nvizen.** Holographic video generation. LTX 2.3 diffusers pipeline via a Python sidecar bound through HTTP IPC. Image-to-video, audio-to-video, and lip-dub conditioning modes. VRAM-aware offload tiers so the same applet runs gracefully on 24GB, 16GB, and lower hardware. The output object is volumetric video content that fills holographic event parcels in Layer U.

**Kasai.** Agentic local runtime. Big/Small slot orchestration where a heavy reasoning model and a light tool-executing model swap based on context demand. Local llama-cpp-2 inference. Tool dispatch through the ToolExecutor trait. Audit loop for context-drift detection. Three-pane agent UI: tool tray, session list, chat. Kasai is the agent that helps creators compose content and helps operators broker inventory in SON.

**Character Studio.** Mait avatar authoring. Strands Avatar v1 export pipeline. Composable aesthetic shards (avatar geometry, palette, style prompt, asset references). The output object is a Mait avatar suitable for personal companion use today and for inhabiting Layer U experiences tomorrow.

These applets are not parallel side products. They are the creator production pipeline for the spatial economy. Every artist, hobbyist, musician, or designer who authors content in any of these applets is producing content that has two monetisation surfaces: their own standalone use, and Layer U inventory once activated. The transition between the two does not require the user to learn a new tool or change their workflow. It only requires them to opt in to publishing their existing output into Layer U inventory.

This is the answer to the persistent question of what Strands is shipping right now. Every applet listed above is real software with active users, real revenue, and real engineering velocity. They are the proof that the platform exists.

## The Shared Substrate

Each applet does its own work. The substrate beneath them is what makes the runtime coherent.

The shell owns GPU detection. A three-tier capability probe identifies CUDA via NVML, Vulkan via vulkaninfo, and CPU fallback via OpenBLAS and system RAM measurement. The probe result determines which model groups each applet can load. A 24GB GPU unlocks Q8 quants. A 12GB GPU unlocks Q4 quants. An 8GB GPU runs CPU-quantised paths. The user sees their VRAM tier in the system info panel. The applets ask the shell what they can run, not the other way around.

The shell owns model provisioning. A six-path local discovery scanner walks the user's filesystem looking for compatible model files. If a Q8 GGUF for Z-Image already exists on disk in any common AI-tool inventory (LM Studio, Ollama, raw downloads, prior installs of any GGUF-using app), the shell discovers it, verifies its SHA256, and adopts it via symlink or move. If a compatible model is not found locally, the shell downloads from a canonical source with resumable HTTP Range requests and SHA256 verification. The user is never asked to manually download model files. They run the applet, and the shell ensures the right model is available.

The shell owns inter-process communication. The IPC envelope v2 contract uses HMAC signatures over each message with a per-launch secret injected into the applet at startup as an environment variable. Applets advertise their capabilities to the shell at startup; the shell verifies the signed advertisement, registers the applet's engines in the engine registry, and routes jobs to the appropriate applet via the engine router. Multi-applet job dispatch was completed on 2026-05-21 with the move from a single Option-typed applet process to a HashMap keyed by applet identifier.

The shell owns the video encoder sidecar. A single Node.js-based encoder process is shared across every applet that needs MP4 output. Gener8 emits stems that need final encode. Vid Studio renders frames that need composition. 3nvizen exports holographic video that needs container packaging. Rather than each applet bundling its own ffmpeg, the shell exposes a `request_video_encoder` IPC call that hands out a transient port to whichever applet currently needs it.

The shell owns OAuth and connected-service authentication. Discourse OAuth flow with token refresh and revocation. Supabase JWT for user identity and tier sync. The applets do not directly negotiate auth with external services. They ask the shell for a current token when they need one.

The shell owns the wallet runtime. Ed25519 key generation, transaction signing, balance display, history. TON Jetton integration in the current phase. Native Strands chain integration when the chain activates per Chapter 9 of this whitepaper. The wallet is part of the shell because every applet that needs settlement (Gener8 for paid licences, Vid Studio for paid templates, future Layer U publishing) talks to the wallet through the shell rather than holding its own key material.

The shell owns the Mymories vault. Tantivy text index over the user's memory documents today. Vector index later. AppletDocument schema scoped per applet so each applet sees only what it is entitled to see. The vault is the local context substrate that powers A.R.E. context assembly, Mait personality grounding, and applet personalisation. It is mounted from the user's local disk. It never synchronises raw content to any server.

Heavyweight runtime artefacts live under a central installation tree at `~/.everywear/`. Models, engine binaries, vault index, video encoder, Python sidecar virtual environments for LTX and future diffusion-based applets, shared font caches, shared thumbnail caches. Per the Phase 2.5 shared-surface hoisting plan, this central tree is the install-time hoist destination for anything used by two or more applets. The applets themselves remain thin in their own installation directories; the shared assets sit centrally and are brokered by the shell.

This is the substrate that makes EveryWear feel like an operating system rather than a collection of separate applications. The user installs EveryWear once. The applets install into the central tree. The shell manages the resources. The applets share what they should share and own what they should own. The model file that 1magen needs and Gener8 needs is one file on disk, not two.

## The Data Sovereignty Boundary

EveryWear is the only system in the Strands architecture that crosses the user's consent boundary. The boundary is enforced not by policy but by architecture. Specific data classes never leave the device. Specific data classes leave only in anonymised aggregated form. Specific data classes leave only with explicit consent.

The data classes that never leave the device under any circumstance: the Mymories vault contents (the user's interaction history, preferences, consent records), camera frames captured by the user's device or paired glasses (when the XR delivery pipeline is active), the segmentation outputs produced by SAM on the user's NPU, the depth maps produced by DepthAnything on the user's NPU, the RF environment fingerprint captured by the user's phone radios, the user's local model files and inference artefacts.

The data classes that leave only in anonymised opaque form: the A.R.E. category vector emitted to the Layer U matching layer when the user has opted into a content slot. This vector represents the user as an anonymous category profile, not as an identity. The matching layer receives a request from an unknown participant and returns inventory candidates. There is no session identity, no IP correlation maintained at the matching layer, no return path to the user's device that bypasses the user's own consent.

The data classes that leave with explicit per-event consent: A.R.E. impression proofs settle on chain. These are zero-knowledge attestations that an impression occurred, that the user was correctly the recipient, and that the revenue calculation is valid. The proof does not reveal what the impression was, who the user is in personal-identity terms, or what the user did before or after the impression. The chain sees that something settled; it does not see what.

This boundary is what makes the A.R.E. revenue mechanism structurally privacy-preserving rather than policy-preserving. Surveillance is mechanically impossible across the boundary, not merely prohibited. Any party that wanted to use Strands data for surveillance would find that the data they would need to surveil has not crossed any network. It lives on the user's device, encrypted, behind the user's keys.

Chapter 5 of this whitepaper details how this boundary is implemented operationally across the context-protocol enforcement layer. Chapter 7 details the A.R.E. pipeline that respects this boundary stage by stage. Chapter 9 details the chain architecture that settles the proofs.

## Phase 2: Mymories, Wallet, Agentic Layer Integration

**Purpose:** Deepen persistence and connect the runtime to the user's economic and agentic life.

Phase 2 brings the Mymories vault into full daily operation. In Phase 1 the vault exists as a Tantivy-indexed local document store with per-applet scoping. In Phase 2 the vault becomes the substrate that every applet draws from for personalisation and that Kasai uses for cross-session continuity. The user's memory becomes their actual memory in the runtime sense: the agents and tools they use remember what they have done, what they prefer, what they have consented to, without that memory ever leaving the device.

Phase 2 also brings the wallet into the user's daily flow. The Blank Sync Ledger activates invisibly at the first purchase threshold, when fiat participation graduates into persistent asset ownership. The user sees purchase confirmations. The wallet handles TON Jetton settlement, Discourse-linked OAuth bindings, and the early-stage A.R.E. payment receipts. The underlying blockchain mechanics remain abstracted unless the user chooses to inspect them.

The A.R.E. client integrates into EveryWear in Phase 2 in its early form: consent management for browsing contexts, opaque category vector emission to the Layer U matching layer, and impression receipt logging in USDT-on-TON. The full XR-bound A.R.E. functionality activates later in Phase 5.

The agentic surface deepens. Kasai becomes more than an applet; it becomes a runtime-level agent that can broker tool calls across applets, query the Mymories vault on the user's behalf, and serve as the natural-language interface to the EveryWear runtime. The user can ask Kasai to find a track they made last month, schedule a holographic event publication, draft a release note for a new aesthetic shard, or perform similar cross-applet tasks without context-switching between applet windows.

Phase 2 proves that EveryWear can carry persistent identity, persistent wealth, and persistent context across sessions. What it cannot yet do is render the high-fidelity 3D experience the game requires as it evolves beyond the desktop OS shell. That tension is resolved in Phase 3.

## Phase 3: Game Launcher and Engine Bridge

**Purpose:** Host richer game experiences without abandoning the EveryWear shell.

As the game evolves beyond what the desktop OS shell can render directly, Phase 3 introduces engine bridging. WebGL for browser-equivalent rendering. Native engine integration via embedded Unity or Unreal runtimes where the game requires more visual fidelity than WebGL provides.

EveryWear functions as a launcher at this phase: it authenticates the user, loads their vault and wallet state, prepares their Mait, and hands off to the embedded game runtime. When the player exits the game, they return to the EveryWear shell with full continuity of identity, data, and agent context.

The tension between game fidelity and platform leanness becomes architecturally visible at Phase 3. The game wants to be heavier. The platform wants to remain lean. Phase 3 is the bridge. Phase 4 is the resolution.

## Phase 4: Bifurcation

**Purpose:** Separate high-fidelity game clients from the persistent sovereign runtime.

This is the architecturally decisive phase. Unity and Unreal clients become standalone game experiences in their own right, delivering visual and interactive fidelity that no shell-embedded engine can match. These are no longer EveryWear in the narrow sense. They are dedicated game clients that launch from and return to the EveryWear shell.

EveryWear itself remains the persistent interface: the launcher, the vault, the wallet, the agent surface, the A.R.E. host, the continuity layer that ties the player's identity and data across every game client and platform surface. A player might run the Unity client on desktop, the Unreal client on console, and the EveryWear browser companion on mobile. In every case, their Mymories, their Mait, their wallet, and their earning history persist through EveryWear.

After bifurcation, EveryWear is definitively not the game client. It is the persistent layer around the game clients, and around every other surface in the Strands ecosystem.

## Phase 5: Agentic OS Across XR, Desktop, and Mobile

**Purpose:** Converge into the user-controlled operating layer for spatial computing.

At full maturity, EveryWear is no longer a desktop OS or a launcher. It is an agentic operating system: a sovereign runtime that hosts the user's compiled agents, sovereign data, wallet, validation functions, creator pipeline, and spatial interaction layer across every device class.

At this phase, six core functions converge.

Game client orchestration. EveryWear launches and coordinates game sessions across multiple engine targets while maintaining persistent identity and state.

Data vault at full maturity. Mymories holds the user's complete sovereign memory: interaction history, consent records, asset provenance, spatial trace data, contextual substrate. All data stored locally, encrypted, portable across user-controlled devices.

SAL runtime. The Structured Adaptive Layer operates within EveryWear using Mymories context. As the vault matures, this enables a personalised contextual SAL: an adaptive behaviour layer built from the user's accumulated experience, consented data, and contextual signals.

A.R.E. host at full spatial capability. The complete six-stage A.R.E. pipeline runs through EveryWear: consent management, context assembly, diegetic delivery, attention measurement, revenue calculation, and payment settlement. In XR environments, attention measurement progresses through the maturity ladder: interaction-based dwell metrics, RF presence detection, and eye-tracking on capable hardware.

XR delivery pipeline. Glasses paired to EveryWear become the rendering surface. The phone NPU performs SAM segmentation and depth estimation. The placement engine maps content into the negative space that SAM identifies. Holographic content respects the physical envelope of reality rather than painting over it.

Network validation and spatial data contribution. At later ecosystem maturity, EveryWear-equipped devices participate in Strands chain validation, contributing to consensus while earning validation rewards. XR-capable devices additionally host and contribute spatial data that powers Layer U's spatial economy.

The end state is no longer a desktop OS. It is the user-controlled operating layer through which the user's entire relationship with the Strands ecosystem is mediated. Agents, memory, earning, identity, spatial interaction, all across whatever device the user holds.

## Core Functions at Maturity

At full maturity EveryWear carries six functions simultaneously. Remove any one and the rest lose range, continuity, or utility.

| Function | Role | Phase Activated |
|---|---|---|
| Applet Runtime Host | Hosts creator tools, manages shared substrate | Phase 1 |
| Data Vault (Mymories) | Sovereign memory, consent, asset provenance, spatial trace | Phase 2 |
| Wallet Runtime | Identity, asset ownership, settlement | Phase 2 |
| Agent Surface (Kasai) | Cross-applet broker, natural-language runtime interface | Phase 2 |
| Game Client Orchestration | Launches game sessions across engine targets | Phase 3 |
| A.R.E. Host | Consent-based attention economy with chain-verified settlement | Phase 2 (basic), Phase 5 (full spatial) |
| XR Delivery Pipeline | SAM + depth + RF + placement engine for non-shitty holographic delivery | Phase 5 |
| Validation Participation | Chain consensus participation via succinct proofs | Phase 5 |

The earlier V6 table omitted Applet Runtime Host as an explicit function because it treated the creator tooling as separate from the platform. V7 corrects this. The applet runtime is the foundational function. Everything else extends it.

## The Applet Stack as Layer U Creator Pipeline

The relationship between EveryWear and Layer U is structural, not adjacent. The applets that ship inside EveryWear today are the production pipeline that fills Layer U inventory tomorrow. Each applet maps onto a class of Layer U inventory authoring:

| Applet | Layer U content class |
|---|---|
| 1magen | Static and 2.5D image assets for skin-the-world dNFT packs |
| Gener8 | Event audio scoring and music tracks for holographic event placement |
| Vid Studio | Visualizer composition for spatial video inventory |
| 3nvizen | Holographic video content for volumetric parcels |
| Character Studio | Mait avatars and aesthetic shards that inhabit Layer U experiences |
| Kasai | Agentic composition and operator-side brokering |

The creator using these applets does not need to think about Layer U to produce Layer U inventory. They are making music, generating images, composing videos, designing avatars for their own purposes. When Layer U activates and the creator opts into publishing, their existing output is what Layer U sells. The applet does not change. The output object does not change. The placement context changes from personal use to consented commercial inventory in a volumetric parcel.

This means that the work happening in Phase 1 is not parallel to Layer U development. It is preparing the creator inventory that Layer U will monetise. Every track scored in Gener8 today is a potential Layer U event audio asset tomorrow. Every image generated in 1magen is a potential skin-the-world pack contribution. The runtime is shipping the tools that produce the content that fills the spatial economy that the platform is building.

Chapter 7 of this whitepaper details how Layer U consumes this inventory through the A.R.E. revenue mechanism. Chapter 6 details how SON, the operator console, allows operators to author the inventory placements that these applet outputs fill.

## What This Chapter Does Not Cover

This chapter describes EveryWear as the sovereign user runtime, its five-phase evolution, the applets that run inside it, the shared substrate beneath them, and the data-sovereignty boundary it enforces.

The operational discipline through which EveryWear is built and maintained at scale by AI agents, including the module budget contract, the Module Contract Template, cratification, and the context-protocol enforcement layer, is detailed in Chapter 5 (Context-Aware Tooling and Modularisation).

The operator-facing geospatial console that publishes inventory into Layer U via EveryWear is detailed in Chapter 6 (Project SON / Strands OSINT Network).

The spatial economy that EveryWear hosts at maturity, including Layer U primitive APIs and the A.R.E. revenue mechanism, is detailed in Chapter 7 (Layer U and the A.R.E.).

The token economics that flow through EveryWear's wallet layer are detailed in Chapter 8 ($KREDS Tokenomics).

The chain infrastructure that EveryWear validates against, including the Mina-derived Rust implementation and zk-SNARK succinct ledger architecture, is detailed in Chapter 9 (Strands Blockchain).

The game itself, which EveryWear launches and orchestrates but does not define, is detailed in Chapter 2 (Strands the Game).

