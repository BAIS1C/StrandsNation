import type { WhitepaperChapter } from './index';

const chapter: WhitepaperChapter = {
  id: "04",
  title: "EveryWear",
  part: "PART II: THE ECOSYSTEM",
  html: `<h1>Whitepaper V6 - Chapter 4: EveryWear</h1>
<h2>What EveryWear Is</h2>
<p>EveryWear is the evolving sovereign interface layer of the Strands ecosystem. It begins as a lightweight distribution surface and matures into the persistent runtime through which memory, wallet, agents, validation, and spatial data are accessed.</p>
<p>It is not a single application. It is not permanently identical to the game client. EveryWear is the interface layer that persists across every phase of the Strands platform, adapting its form as the ecosystem matures while maintaining continuity of identity, data, and function for the user. The game client starts close to the EveryWear surface, then dedicated game experiences split off into their own runtimes while EveryWear remains as the launcher, vault, wallet, agent surface, and continuity shell around them.</p>
<p>This chapter describes the five phases of that evolution, the logic behind each transition, and the core functions EveryWear carries at maturity.</p>
<h2>Why It Evolves in Phases</h2>
<p>EveryWear ships as an evolving substrate and interface to the Strands world. It begins as the player&#39;s entry point through the game, then expands into the broader personal, economic, and spatial runtime of the ecosystem.</p>
<p>Each phase exists because its predecessor has proven a capability and exposed a limitation. The Telegram Mini App proves distribution but cannot carry persistence. The Chromium fork proves persistence but cannot deliver high-fidelity 3D. The game launcher bridges the gap but creates a bloated monolith. Bifurcation separates concerns so the game can scale visually while EveryWear scales functionally. The Agentic OS is the convergence point where sovereign runtime meets spatial computing.</p>
<p>The sequence is not aspirational. Each phase has a clear activation condition, a clear purpose, and a clear handoff to the next.</p>
<h2>Phase 1: Telegram Mini App</h2>
<p><strong>Purpose:</strong> Frictionless distribution and onboarding at maximum reach.</p>
<p>The first EveryWear surface is a Telegram Mini App. It exists because Telegram provides 900 million monthly active users, zero-friction app discovery, native payment rails (TON, Telegram Stars, card via MoonPay), and bio-authentication without requiring users to install anything beyond the messaging client they already use.</p>
<p>At this phase, EveryWear is lightweight by design. It carries the game&#39;s onboarding sequence, the initial desktop OS interface, and the fiat payment layer. There is no wallet binding at entry, no blockchain exposure, no token mechanics. A player downloads nothing. They tap a link inside Telegram and begin playing.</p>
<p>The Mini App proves three things: that the game&#39;s onboarding loop converts and retains users, that the fiat economy generates revenue without token dependency, and that the Telegram ecosystem provides a viable distribution channel at scale. These are the activation conditions for Phase 2.</p>
<p>What the Mini App cannot do is persist data beyond the session, host sovereign storage, or run agentic processes. It is a surface, not a runtime. That limitation is what Phase 2 resolves.</p>
<h2>Phase 2: Chromium Fork and Agentic Browser</h2>
<p><strong>Purpose:</strong> Persistence, sovereign data, wallet integration, and agentic browsing.</p>
<p>When the Mini App has proven distribution and retention, EveryWear graduates into a dedicated Chromium-forked browser. This is not merely a browser with game features bolted on. It is a privacy-first sovereign client that carries three capabilities the Mini App could not:</p>
<p><strong>Mymories.</strong> The sovereign data vault activates at this phase. Mymories is the persistence layer through which the player&#39;s interaction history, preference signals, consent records, and contextual data are stored in player-controlled encrypted storage. It is the data substrate that makes My Maits contextually aware across sessions. In Phase 1, the game could only store transient session state. In Phase 2, EveryWear becomes the player&#39;s data home.</p>
<p><strong>Wallet integration.</strong> The Blank Sync Ledger, the player&#39;s native wallet, activates invisibly at the first purchase threshold, when simple fiat participation graduates into persistent asset ownership and settlement history. The wallet is embedded in EveryWear, not bolted on as an extension. It handles TON settlement, asset provenance, and later, $KREDS when the chain layer activates. The player sees purchase confirmations. The underlying blockchain mechanics remain abstracted by default unless the player chooses to inspect or engage them directly.</p>
<p><strong>My Maits interface.</strong> EveryWear becomes one of the primary surfaces through which players interact with their compiled Mait agents. The Chromium fork provides the runtime environment for agentic interaction. The Mait can assist with browsing, provide contextual information, and operate as a personal AI layer across the player&#39;s digital activity, not only inside the game.</p>
<p>The Chromium fork also hosts the first out-of-game A.R.E. surface. When the player browses outside of game sessions, the A.R.E. panel offers consented, compensated attention opportunities. The diegetic framing is lighter than the in-game Proper Gander aesthetic, but the consent architecture and revenue split are identical.</p>
<p>Phase 2 proves that EveryWear can function as a persistent sovereign client: vault, wallet, agent surface, and earning layer in a single runtime. What it cannot do is deliver the high-fidelity 3D experience the game requires as it matures beyond the initial desktop OS phase.</p>
<h2>Phase 3: Game Launcher and WebGL Bridge</h2>
<p><strong>Purpose:</strong> Delivering richer game experiences without abandoning the EveryWear shell.</p>
<p>As the game evolves beyond the flat desktop OS into three-dimensional environments, the Chromium fork&#39;s rendering capabilities are no longer sufficient. Phase 3 introduces WebGL bridging, allowing EveryWear to launch and host progressively richer game content while maintaining the persistent shell around it.</p>
<p>At this phase, EveryWear functions as a launcher: it handles authentication, loads the player&#39;s vault and wallet state, loads the player&#39;s Mait interface, and then hands off to the WebGL game layer for the immersive gameplay session. When the player exits the game, they return to the EveryWear shell with full continuity of data, identity, and agent context.</p>
<p>This is the phase where the tension between game fidelity and platform function becomes visible. The game wants to be heavier ; more geometry, more dynamic environments, more compute-intensive rendering. The platform wants to remain lean ; vault, wallet, agents, earning. Phase 3 is the bridge. Phase 4 is the resolution.</p>
<h2>Phase 4: Bifurcation</h2>
<p><strong>Purpose:</strong> Separating high-fidelity game clients from the persistent sovereign runtime.</p>
<p>This is the architecturally decisive phase. Unity and Unreal become their own dedicated game experiences, delivering the visual and interactive fidelity that WebGL cannot match. These are no longer &quot;EveryWear&quot; in the narrow sense. They are standalone game clients ; rich, immersive, optimised for their respective engines ; that launch from and return to the EveryWear shell.</p>
<p>EveryWear itself remains the persistent interface: the launcher, the vault, the wallet, the agent surface, the A.R.E. host, and the continuity layer that ties the player&#39;s identity and data across every game client and platform surface they use. A player might run the Unity client on desktop, the Unreal client on console, and the EveryWear browser on mobile. In every case, their Mymories vault, their compiled Mait, their wallet state, and their earning history persist through EveryWear.</p>
<p>The bifurcation is necessary because a high-fidelity game client and a sovereign runtime shell should not remain one bloated object. They have different performance requirements, different update cycles, different scaling characteristics, and different user expectations. Splitting them allows each to evolve at its own pace without compromising the other.</p>
<p>After bifurcation, EveryWear is definitively not &quot;the game client.&quot; It is the persistent layer around the game clients ; and around everything else in the Strands ecosystem.</p>
<h2>Phase 5: Agentic OS Across XR, Desktop, and App</h2>
<p><strong>Purpose:</strong> Convergence into a user-controlled operating layer for spatial computing.</p>
<p>At full maturity, EveryWear is no longer merely a browser or a launcher. It is an agentic operating system: a sovereign runtime that hosts the player&#39;s compiled agents, sovereign data, wallet, validation functions, and spatial interaction layer across every device class ; desktop, mobile, and XR headsets.</p>
<p>At this phase, five core functions converge:</p>
<p><strong>Game Client orchestration.</strong> EveryWear launches and coordinates game sessions across multiple engine targets (Unity, Unreal, WebGL) while maintaining persistent identity and state.</p>
<p><strong>Data Vault.</strong> Mymories at full maturity: the player&#39;s sovereign memory stack encompassing interaction history, consent records, asset provenance, spatial data, and the contextual substrate that powers their Mait agents. All data stored in player-controlled encrypted storage, portable across devices.</p>
<p><strong>SAL Runtime.</strong> The Structured Adaptive Layer operates within EveryWear using context provided by Mymories. As the vault matures, this enables a personalised contextual SAL: a user-shaped adaptive behaviour layer built from Sync Profile, accumulated interaction history, consented data, and contextual signals. This becomes one of the building blocks of future decentralised cognition.</p>
<p><strong>A.R.E. Host.</strong> The full Attention Redistribution Engine runs through EveryWear: consent management, context assembly, diegetic delivery, attention measurement, revenue calculation, and payment settlement. In XR environments, attention verification graduates from interaction-based measurement to spatial sensing through WiFi DensePose presence detection and, eventually, hardware-level eye tracking.</p>
<p><strong>Staking, validation, and spatial data.</strong> At later ecosystem maturity, EveryWear-equipped devices can participate in network validation, contributing to the Strands Chain&#39;s consensus while earning validation rewards. XR devices additionally host and contribute spatial data ; the volumetric AR layer data that powers Layer U&#39;s spatial economy (detailed in Chapter 5). This function activates only at later maturity, not at launch.</p>
<p>The end state is no longer merely a browser. It is a user-controlled operating layer through which the player&#39;s entire relationship with the Strands ecosystem is mediated ; agents, memory, earning, identity, and spatial interaction ; regardless of device form factor.</p>
<h2>Core Functions at Maturity</h2>
<p>At full maturity, EveryWear carries five functions simultaneously. Remove any one and the rest lose range, continuity, or utility.</p>
<table>
<thead>
<tr>
<th>Function</th>
<th>Role</th>
<th>Phase Activated</th>
</tr>
</thead>
<tbody><tr>
<td>Game Client Orchestration</td>
<td>Launches and coordinates game sessions across engine targets</td>
<td>Phase 3</td>
</tr>
<tr>
<td>Data Vault (Mymories)</td>
<td>Sovereign memory, consent, asset provenance, spatial data</td>
<td>Phase 2</td>
</tr>
<tr>
<td>SAL Runtime</td>
<td>Personalised contextual behaviour grounded in the Mymories substrate</td>
<td>Phase 5</td>
</tr>
<tr>
<td>A.R.E. Host</td>
<td>Consent-based attention economy with fiat settlement</td>
<td>Phase 2 (basic), Phase 5 (full spatial)</td>
</tr>
<tr>
<td>Validation and Spatial Data</td>
<td>Chain validation, XR spatial layer hosting</td>
<td>Phase 5</td>
</tr>
</tbody></table>
`,
};

export default chapter;
