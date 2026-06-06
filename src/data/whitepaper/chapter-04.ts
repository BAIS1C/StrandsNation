import type { WhitepaperChapter } from './index';

const chapter: WhitepaperChapter = {
  id: "04",
  title: "EveryWear",
  part: "PART II: THE ECOSYSTEM",
  html: `<h1>Whitepaper V7 - Chapter 4: EveryWear</h1>
<h2>What EveryWear Is</h2>
<p>EveryWear is the sovereign user runtime of the Strands ecosystem. It is the layer through which a person interacts with everything else: their compiled agents, their personal memory vault, their wallet, their tools for creating, their access to the spatial economy, their participation in network validation. It is the only system in the architecture that crosses the user&#39;s consent boundary. Every other layer in the stack is either upstream of EveryWear (servers, registries, settlement chains) or downstream of it (display surfaces, glasses, peripherals).</p>
<p>EveryWear is not a single application. It is not the game client. It is not a browser, although it can host browsers. It is a runtime shell that hosts applets, manages local resources, brokers between the user and the network, and persists across every phase of platform maturity. The applets running inside EveryWear are the products users pay for and create with. EveryWear itself is the substrate that makes those products coherent across sessions, devices, and surfaces.</p>
<p>This chapter describes the runtime as it stands today, the applets that run inside it, the shared substrate beneath them, the data-sovereignty boundary that defines its trust model, and the evolution arc through which it matures from a desktop OS for creator tooling into the agentic operating layer for spatial computing.</p>
<h2>The Sequence of Phases</h2>
<p>EveryWear evolves in phases because each capability layer depends on the one beneath it being proven first. The earlier the phase, the lower the technical and economic risk to the user and to the ecosystem. The later the phase, the more value the runtime carries and the more it requires structural validation before activation.</p>
<p>Phase 1 is shipping today. It is the Tauri-native desktop OS with the active applet ecosystem and the shared runtime substrate. This is the foundation everything else rests on.</p>
<p>Phase 2 deepens persistence: MyMory vault, wallet integration, A.R.E. client. This work is partially in flight; the MyMory substrate and the wallet are in active build, and the A.R.E. client awaits the upstream Layer U matching layer that Chapter 7 of this whitepaper describes.</p>
<p>Phase 3 introduces high-fidelity game launch from within EveryWear, with WebGL bridging or native engine integration as the game evolves beyond what the desktop OS shell can render directly.</p>
<p>Phase 4 bifurcates the game clients from the persistent runtime, allowing high-fidelity Unity and Unreal experiences to ship as standalone clients while EveryWear remains the launcher, vault, wallet, agent surface, and continuity layer.</p>
<p>Phase 5 converges into an agentic OS across XR, desktop, and mobile, with full A.R.E. host functionality, network validation participation, and spatial data hosting once the underlying chain and pilot-city infrastructure are live.</p>
<p>Each phase has an activation condition rooted in the validation of the previous phase. No phase is assumed. No phase is skipped.</p>
<p>The earlier V6 version of this chapter named Phase 1 as a Telegram Mini App. That distribution surface remains a viable later parallel to the desktop runtime, but the actual execution path took the desktop OS first because the desktop is where the creator tooling needs the runtime control, the GPU access, the model management, and the file system integration that a Mini App could not provide. The Mini App, if it ships, is a Phase 2 or Phase 3 distribution wedge for the lighter functions of the runtime, not the foundation. V7 corrects this on the record.</p>
<h2>Phase 1: The Tauri-Native Desktop OS</h2>
<p><strong>Purpose:</strong> Provide the sovereign runtime substrate for the creator-tool applet ecosystem. Establish data sovereignty at the device layer. Lay the foundation every subsequent phase depends on.</p>
<p>EveryWear today is a Tauri-native desktop application that presents itself to the user as a small operating system. It is not a browser tab. It is not a single-purpose tool. It is a windowed desktop environment with a recognisable shell, system icons, a taskbar, a centre desktop surface, and a multi-window manager that allows multiple applets to run simultaneously in their own windows above the desktop surface.</p>
<p>The shell owns the resources the applets share: GPU detection across CUDA, Vulkan, and CPU fallback paths; VRAM budgeting and scheduling so that multiple applets requesting model inference do not collide; model provisioning that scans local inventories first, downloads from canonical sources second, verifies via SHA256, and adopts existing local model files where compatible; HMAC-secured inter-process communication between the shell and each applet binary; a video encoder sidecar shared across applets that need MP4 output; OAuth flow management for connected services; the user profile and wallet runtime; the multi-applet process table that keeps concurrent applet processes alive and routed.</p>
<p>The shell has been canonized around four user-selectable themes. Light, Classic, Refined, Terminal. Each theme has its own visual treatment of the desktop icons, taskbar, window chrome, and inference HUD. The theming is not cosmetic only. It signals the user&#39;s mode of work. Terminal is the operator mode for focused work. Classic is the default consumer-facing mode. Refined is the high-aesthetic mode. Light is the minimal-contrast mode for screen-fatigue or external-display use. The EveryWear Design System (EWDS) defines the token contract that every applet inherits from. No applet rolls its own colour, type, or icon language.</p>
<p>A live inference HUD at the centre of the desktop reports the runtime state in real time: idle, standby, launching, model loaded, purging, error. The user sees what their machine is doing on their behalf. The runtime does not hide its state from them. When a model is loading, the HUD says so. When VRAM is being purged, the HUD says so. When an applet has crashed, the HUD says so. This is part of the data sovereignty thesis. The user is the operator. The runtime tells the truth about itself.</p>
<p>The desktop OS shipping today is a real product, not a scaffold. It has ~50,000 lines of code across the shell and applets, builds clean on the latest tooling, and runs on standard consumer hardware. The architecture pass filed on 2026-05-21 details the module unit map, the cratification plan that promotes ten module units into proper workspace crates, and the shared-surface hoisting plan that moves heavyweight runtime artefacts into a <code>~/.everywear/</code> central installation tree. Phase 1 is not a placeholder. It is the foundation.</p>
<h2>The Applet Ecosystem</h2>
<p>The applets that run inside EveryWear are the products users pay for. Each applet is a creator tool in its own right. Each applet is also part of a creator pipeline that feeds Layer U inventory once that layer activates. The same content authored in an applet for personal use can be republished into Layer U for additional monetisation. The applet does not change. The output object does not change. Only the placement context changes.</p>
<p>The applet stack at the time of writing:</p>
<p><strong>1magen.</strong> Image generation. Z-Image diffusion runtime via Rust FFI, with Q8 and Q4 GGUF model groups for VRAM-tier-appropriate quality. End-to-end working: text prompt, optional source image, negative prompt for pure text-to-image, resolution selection, seed control, large primary generate action, output preview, and save to a user-selected folder. The runtime canon is locked: 1magen is a Z-Image applet. Style patches that are not explicitly Z-Image compatible are not 1magen patches. The output object is a static image suitable for personal use today and for skin-the-world dNFT pack contribution to Layer U inventory tomorrow.</p>
<p><strong>Gener8.</strong> Music generation. ACE-Step inference via a headless sidecar binary, paired with a DAW engine that mixes, transports, plays back, and exports. Beats engine for tempo detection and grid alignment. AI director for compositional planning. Whisper alignment for lyric synchronisation. Tier reconciler for entitlement-gated features. Library and playlist management. Eighty-plus HTTP routes in the local shim. The output object is a music track suitable for personal use today and for event audio scoring contribution to Layer U inventory tomorrow.</p>
<p><strong>Vid Studio.</strong> Video visualizer and montage composition. Builds music videos and visual content over audio inputs. Spatial video output. The output object is a video file suitable for personal social distribution today and for spatial video inventory contribution to Layer U tomorrow.</p>
<p><strong>3nvizen.</strong> Holographic video generation. LTX 2.3 diffusers pipeline via a Python sidecar bound through HTTP IPC. Image-to-video, audio-to-video, and lip-dub conditioning modes. VRAM-aware offload tiers so the same applet runs gracefully on 24GB, 16GB, and lower hardware. The output object is volumetric video content that fills holographic event parcels in Layer U.</p>
<p><strong>Kasai.</strong> Agentic local runtime. Big/Small slot orchestration where a heavy reasoning model and a light tool-executing model swap based on context demand. Local llama-cpp-2 inference. Tool dispatch through the ToolExecutor trait. Audit loop for context-drift detection. Three-pane agent UI: tool tray, session list, chat. Kasai is the agent that helps creators compose content and helps operators broker inventory in SON.</p>
<p><strong>Character Studio.</strong> Mait avatar authoring. Strands Avatar v1 export pipeline. Composable aesthetic shards (avatar geometry, palette, style prompt, asset references). The output object is a Mait avatar suitable for personal companion use today and for inhabiting Layer U experiences tomorrow.</p>
<p>These applets are not parallel side products. They are the creator production pipeline for the spatial economy. Every artist, hobbyist, musician, or designer who authors content in any of these applets is producing content that has two monetisation surfaces: their own standalone use, and Layer U inventory once activated. The transition between the two does not require the user to learn a new tool or change their workflow. It only requires them to opt in to publishing their existing output into Layer U inventory.</p>
<p>This is the answer to the persistent question of what Strands is shipping right now. Every applet listed above is real software with active users, real revenue, and real engineering velocity. They are the proof that the platform exists.</p>
<h2>The Shared Substrate</h2>
<p>Each applet does its own work. The substrate beneath them is what makes the runtime coherent.</p>
<p>The shell owns GPU detection. A three-tier capability probe identifies CUDA via NVML, Vulkan via vulkaninfo, and CPU fallback via OpenBLAS and system RAM measurement. The probe result determines which model groups each applet can load. A 24GB GPU unlocks Q8 quants. A 12GB GPU unlocks Q4 quants. An 8GB GPU runs CPU-quantised paths. The user sees their VRAM tier in the system info panel. The applets ask the shell what they can run, not the other way around.</p>
<p>The shell owns model provisioning. A six-path local discovery scanner walks the user&#39;s filesystem looking for compatible model files. If a Q8 GGUF for Z-Image already exists on disk in any common AI-tool inventory (LM Studio, Ollama, raw downloads, prior installs of any GGUF-using app), the shell discovers it, verifies its SHA256, and adopts it via symlink or move. If a compatible model is not found locally, the shell downloads from a canonical source with resumable HTTP Range requests and SHA256 verification. The user is never asked to manually download model files. They run the applet, and the shell ensures the right model is available.</p>
<p>The shell owns inter-process communication. The IPC envelope v2 contract uses HMAC signatures over each message with a per-launch secret injected into the applet at startup as an environment variable. Applets advertise their capabilities to the shell at startup; the shell verifies the signed advertisement, registers the applet&#39;s engines in the engine registry, and routes jobs to the appropriate applet via the engine router. Multi-applet job dispatch was completed on 2026-05-21 with the move from a single Option-typed applet process to a HashMap keyed by applet identifier.</p>
<p>The shell owns the video encoder sidecar. A single Node.js-based encoder process is shared across every applet that needs MP4 output. Gener8 emits stems that need final encode. Vid Studio renders frames that need composition. 3nvizen exports holographic video that needs container packaging. Rather than each applet bundling its own ffmpeg, the shell exposes a <code>request_video_encoder</code> IPC call that hands out a transient port to whichever applet currently needs it.</p>
<p>The shell owns OAuth and connected-service authentication. Discourse OAuth flow with token refresh and revocation. Supabase JWT for user identity and tier sync. The applets do not directly negotiate auth with external services. They ask the shell for a current token when they need one.</p>
<p>The shell owns the wallet runtime. Ed25519 key generation, transaction signing, balance display, history. TON Jetton integration in the current phase. Native Strands chain integration when the chain activates per Chapter 9 of this whitepaper. The wallet is part of the shell because every applet that needs settlement (Gener8 for paid licences, Vid Studio for paid templates, future Layer U publishing) talks to the wallet through the shell rather than holding its own key material.</p>
<p>The shell owns the MyMory vault. Tantivy text index over the user&#39;s memory documents today. Vector index later. AppletDocument schema scoped per applet so each applet sees only what it is entitled to see. The vault is the local context substrate that powers A.R.E. context assembly, Mait personality grounding, and applet personalisation. It is mounted from the user&#39;s local disk. It never synchronises raw content to any server.</p>
<p>Heavyweight runtime artefacts live under a central installation tree at <code>~/.everywear/</code>. Models, engine binaries, vault index, video encoder, Python sidecar virtual environments for LTX and future diffusion-based applets, shared font caches, shared thumbnail caches. Per the Phase 2.5 shared-surface hoisting plan, this central tree is the install-time hoist destination for anything used by two or more applets. The applets themselves remain thin in their own installation directories; the shared assets sit centrally and are brokered by the shell.</p>
<p>This is the substrate that makes EveryWear feel like an operating system rather than a collection of separate applications. The user installs EveryWear once. The applets install into the central tree. The shell manages the resources. The applets share what they should share and own what they should own. The model file that 1magen needs and Gener8 needs is one file on disk, not two.</p>
<h2>The Data Sovereignty Boundary</h2>
<p>EveryWear is the only system in the Strands architecture that crosses the user&#39;s consent boundary. The boundary is enforced not by policy but by architecture. Specific data classes never leave the device. Specific data classes leave only in anonymised aggregated form. Specific data classes leave only with explicit consent.</p>
<p>The data classes that never leave the device under any circumstance: the MyMory vault contents (the user&#39;s interaction history, preferences, consent records), camera frames captured by the user&#39;s device or paired glasses (when the XR delivery pipeline is active), the segmentation outputs produced by SAM on the user&#39;s NPU, the depth maps produced by DepthAnything on the user&#39;s NPU, the RF environment fingerprint captured by the user&#39;s phone radios, the user&#39;s local model files and inference artefacts.</p>
<p>The data classes that leave only in anonymised opaque form: the A.R.E. category vector emitted to the Layer U matching layer when the user has opted into a content slot. This vector represents the user as an anonymous category profile, not as an identity. The matching layer receives a request from an unknown participant and returns inventory candidates. There is no session identity, no IP correlation maintained at the matching layer, no return path to the user&#39;s device that bypasses the user&#39;s own consent.</p>
<p>The data classes that leave with explicit per-event consent: A.R.E. impression proofs settle on chain. These are zero-knowledge attestations that an impression occurred, that the user was correctly the recipient, and that the revenue calculation is valid. The proof does not reveal what the impression was, who the user is in personal-identity terms, or what the user did before or after the impression. The chain sees that something settled; it does not see what.</p>
<p>This boundary is what makes the A.R.E. revenue mechanism structurally privacy-preserving rather than policy-preserving. Surveillance is mechanically impossible across the boundary, not merely prohibited. Any party that wanted to use Strands data for surveillance would find that the data they would need to surveil has not crossed any network. It lives on the user&#39;s device, encrypted, behind the user&#39;s keys.</p>
<p>Chapter 5 of this whitepaper details how this boundary is implemented operationally across the context-protocol enforcement layer. Chapter 7 details the A.R.E. pipeline that respects this boundary stage by stage. Chapter 9 details the chain architecture that settles the proofs.</p>
<h2>Phase 2: MyMory, Wallet, Agentic Layer Integration</h2>
<p><strong>Purpose:</strong> Deepen persistence and connect the runtime to the user&#39;s economic and agentic life.</p>
<p>Phase 2 brings the MyMory vault into full daily operation. In Phase 1 the vault exists as a Tantivy-indexed local document store with per-applet scoping. In Phase 2 the vault becomes the substrate that every applet draws from for personalisation and that Kasai uses for cross-session continuity. The user&#39;s memory becomes their actual memory in the runtime sense: the agents and tools they use remember what they have done, what they prefer, what they have consented to, without that memory ever leaving the device.</p>
<p>Phase 2 also brings the wallet into the user&#39;s daily flow. The Blank Sync Ledger activates invisibly at the first purchase threshold, when fiat participation graduates into persistent asset ownership. The user sees purchase confirmations. The wallet handles TON Jetton settlement, Discourse-linked OAuth bindings, and the early-stage A.R.E. payment receipts. The underlying blockchain mechanics remain abstracted unless the user chooses to inspect them.</p>
<p>The A.R.E. client integrates into EveryWear in Phase 2 in its early form: consent management for browsing contexts, opaque category vector emission to the Layer U matching layer, and impression receipt logging in USDT-on-TON. The full XR-bound A.R.E. functionality activates later in Phase 5.</p>
<p>The agentic surface deepens. Kasai becomes more than an applet; it becomes a runtime-level agent that can broker tool calls across applets, query the MyMory vault on the user&#39;s behalf, and serve as the natural-language interface to the EveryWear runtime. The user can ask Kasai to find a track they made last month, schedule a holographic event publication, draft a release note for a new aesthetic shard, or perform similar cross-applet tasks without context-switching between applet windows.</p>
<p>Phase 2 proves that EveryWear can carry persistent identity, persistent wealth, and persistent context across sessions. What it cannot yet do is render the high-fidelity 3D experience the game requires as it evolves beyond the desktop OS shell. That tension is resolved in Phase 3.</p>
<h2>Phase 3: Game Launcher and Engine Bridge</h2>
<p><strong>Purpose:</strong> Host richer game experiences without abandoning the EveryWear shell.</p>
<p>As the game evolves beyond what the desktop OS shell can render directly, Phase 3 introduces engine bridging. WebGL for browser-equivalent rendering. Native engine integration via embedded Unity or Unreal runtimes where the game requires more visual fidelity than WebGL provides.</p>
<p>EveryWear functions as a launcher at this phase: it authenticates the user, loads their vault and wallet state, prepares their Mait, and hands off to the embedded game runtime. When the player exits the game, they return to the EveryWear shell with full continuity of identity, data, and agent context.</p>
<p>The tension between game fidelity and platform leanness becomes architecturally visible at Phase 3. The game wants to be heavier. The platform wants to remain lean. Phase 3 is the bridge. Phase 4 is the resolution.</p>
<h2>Phase 4: Bifurcation</h2>
<p><strong>Purpose:</strong> Separate high-fidelity game clients from the persistent sovereign runtime.</p>
<p>This is the architecturally decisive phase. Unity and Unreal clients become standalone game experiences in their own right, delivering visual and interactive fidelity that no shell-embedded engine can match. These are no longer EveryWear in the narrow sense. They are dedicated game clients that launch from and return to the EveryWear shell.</p>
<p>EveryWear itself remains the persistent interface: the launcher, the vault, the wallet, the agent surface, the A.R.E. host, the continuity layer that ties the player&#39;s identity and data across every game client and platform surface. A player might run the Unity client on desktop, the Unreal client on console, and the EveryWear browser companion on mobile. In every case, their MyMory, their Mait, their wallet, and their earning history persist through EveryWear.</p>
<p>After bifurcation, EveryWear is definitively not the game client. It is the persistent layer around the game clients, and around every other surface in the Strands ecosystem.</p>
<h2>Phase 5: Agentic OS Across XR, Desktop, and Mobile</h2>
<p><strong>Purpose:</strong> Converge into the user-controlled operating layer for spatial computing.</p>
<p>At full maturity, EveryWear is no longer a desktop OS or a launcher. It is an agentic operating system: a sovereign runtime that hosts the user&#39;s compiled agents, sovereign data, wallet, validation functions, creator pipeline, and spatial interaction layer across every device class.</p>
<p>At this phase, six core functions converge.</p>
<p>Game client orchestration. EveryWear launches and coordinates game sessions across multiple engine targets while maintaining persistent identity and state.</p>
<p>Data vault at full maturity. MyMory holds the user&#39;s complete sovereign memory: interaction history, consent records, asset provenance, spatial trace data, contextual substrate. All data stored locally, encrypted, portable across user-controlled devices.</p>
<p>SAL runtime. The Structured Adaptive Layer operates within EveryWear using MyMory context. As the vault matures, this enables a personalised contextual SAL: an adaptive behaviour layer built from the user&#39;s accumulated experience, consented data, and contextual signals.</p>
<p>A.R.E. host at full spatial capability. The complete six-stage A.R.E. pipeline runs through EveryWear: consent management, context assembly, diegetic delivery, attention measurement, revenue calculation, and payment settlement. In XR environments, attention measurement progresses through the maturity ladder: interaction-based dwell metrics, RF presence detection, and eye-tracking on capable hardware.</p>
<p>XR delivery pipeline. Glasses paired to EveryWear become the rendering surface. The phone NPU performs SAM segmentation and depth estimation. The placement engine maps content into the negative space that SAM identifies. Holographic content respects the physical envelope of reality rather than painting over it.</p>
<p>Network validation and spatial data contribution. At later ecosystem maturity, EveryWear-equipped devices participate in Strands chain validation, contributing to consensus while earning validation rewards. XR-capable devices additionally host and contribute spatial data that powers Layer U&#39;s spatial economy.</p>
<p>The end state is no longer a desktop OS. It is the user-controlled operating layer through which the user&#39;s entire relationship with the Strands ecosystem is mediated. Agents, memory, earning, identity, spatial interaction, all across whatever device the user holds.</p>
<h2>Core Functions at Maturity</h2>
<p>At full maturity EveryWear carries six functions simultaneously. Remove any one and the rest lose range, continuity, or utility.</p>
<table>
<thead>
<tr>
<th>Function</th>
<th>Role</th>
<th>Phase Activated</th>
</tr>
</thead>
<tbody><tr>
<td>Applet Runtime Host</td>
<td>Hosts creator tools, manages shared substrate</td>
<td>Phase 1</td>
</tr>
<tr>
<td>Data Vault (MyMory)</td>
<td>Sovereign memory, consent, asset provenance, spatial trace</td>
<td>Phase 2</td>
</tr>
<tr>
<td>Wallet Runtime</td>
<td>Identity, asset ownership, settlement</td>
<td>Phase 2</td>
</tr>
<tr>
<td>Agent Surface (Kasai)</td>
<td>Cross-applet broker, natural-language runtime interface</td>
<td>Phase 2</td>
</tr>
<tr>
<td>Game Client Orchestration</td>
<td>Launches game sessions across engine targets</td>
<td>Phase 3</td>
</tr>
<tr>
<td>A.R.E. Host</td>
<td>Consent-based attention economy with chain-verified settlement</td>
<td>Phase 2 (basic), Phase 5 (full spatial)</td>
</tr>
<tr>
<td>XR Delivery Pipeline</td>
<td>SAM + depth + RF + placement engine for non-shitty holographic delivery</td>
<td>Phase 5</td>
</tr>
<tr>
<td>Validation Participation</td>
<td>Chain consensus participation via succinct proofs</td>
<td>Phase 5</td>
</tr>
</tbody></table>
<p>The earlier V6 table omitted Applet Runtime Host as an explicit function because it treated the creator tooling as separate from the platform. V7 corrects this. The applet runtime is the foundational function. Everything else extends it.</p>
<h2>The Applet Stack as Layer U Creator Pipeline</h2>
<p>The relationship between EveryWear and Layer U is structural, not adjacent. The applets that ship inside EveryWear today are the production pipeline that fills Layer U inventory tomorrow. Each applet maps onto a class of Layer U inventory authoring:</p>
<table>
<thead>
<tr>
<th>Applet</th>
<th>Layer U content class</th>
</tr>
</thead>
<tbody><tr>
<td>1magen</td>
<td>Static and 2.5D image assets for skin-the-world dNFT packs</td>
</tr>
<tr>
<td>Gener8</td>
<td>Event audio scoring and music tracks for holographic event placement</td>
</tr>
<tr>
<td>Vid Studio</td>
<td>Visualizer composition for spatial video inventory</td>
</tr>
<tr>
<td>3nvizen</td>
<td>Holographic video content for volumetric parcels</td>
</tr>
<tr>
<td>Character Studio</td>
<td>Mait avatars and aesthetic shards that inhabit Layer U experiences</td>
</tr>
<tr>
<td>Kasai</td>
<td>Agentic composition and operator-side brokering</td>
</tr>
</tbody></table>
<p>The creator using these applets does not need to think about Layer U to produce Layer U inventory. They are making music, generating images, composing videos, designing avatars for their own purposes. When Layer U activates and the creator opts into publishing, their existing output is what Layer U sells. The applet does not change. The output object does not change. The placement context changes from personal use to consented commercial inventory in a volumetric parcel.</p>
<p>This means that the work happening in Phase 1 is not parallel to Layer U development. It is preparing the creator inventory that Layer U will monetise. Every track scored in Gener8 today is a potential Layer U event audio asset tomorrow. Every image generated in 1magen is a potential skin-the-world pack contribution. The runtime is shipping the tools that produce the content that fills the spatial economy that the platform is building.</p>
<p>Chapter 7 of this whitepaper details how Layer U consumes this inventory through the A.R.E. revenue mechanism. Chapter 6 details how SON, the operator console, allows operators to author the inventory placements that these applet outputs fill.</p>
`,
};

export default chapter;
