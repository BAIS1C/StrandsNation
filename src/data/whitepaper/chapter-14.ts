import type { WhitepaperChapter } from './index';

const chapter: WhitepaperChapter = {
  id: "14",
  title: "Appendices",
  part: "PART V: APPENDICES",
  html: `<h1>Whitepaper V7 - Chapter 14: Appendices</h1>
<h2>Appendix A: Glossary of Key Terms</h2>
<p><strong>$KREDS</strong> ; Native economic protocol of the Strands network. Structured for network utility, not issued as equity or investment instrument. Launches only after the fiat economy has proven viable. NOT an in-game currency.</p>
<p><strong>A.R.E. (Attention Redistribution Engine)</strong> ; The mechanism through which player attention generates revenue. Players opt into narratively-framed Proper Gander broadcasts and receive 60% of the generated ad revenue. The remaining 40% funds ecosystem operations. Settles in USDT/TON wallet pre-chain, $KREDS/Strands wallet post-chain activation.</p>
<p><strong>Blank Sync Ledger</strong> ; A player&#39;s native wallet layer, invisible by default. Activated at first purchase threshold. TON-mediated in early phases, later extended into Strands native wallet continuity as the chain matures. The player never sees blockchain mechanics unless they choose to.</p>
<p><strong>Client Ledger</strong> ; A cryptographically compiled local ledger maintained by each participant on their own device. Contains spendable balance, participation context, and transaction-relevant application state. The Strands chain confirms the truthfulness of client ledger state, not the other way around.</p>
<p><strong>DeepSync</strong> ; On-chain trade protocol within The Exchange (see CANON_Economy_Systems V2.0). Used for unique, provenance-verified assets such as Mymories and premium cosmetics where ownership and scarcity matter. Activates alongside chain-layer maturity. Visual cue: hexagonal icon.</p>
<p><strong>EveryWear</strong> ; The sovereign interface layer that hosts the game surface, Mymories vault access, SAL runtime access using Mymories context, A.R.E. delivery, and wallet continuity. In later phases, EveryWear extends to validation participation and spatial functions. Software-first on existing devices; hardware-native extensions as the ecosystem matures.</p>
<p><strong>GridScrip</strong> ; In-game resistance currency. Earned through gameplay contribution. Anonymous within the game world. Operates outside corporate oversight. NOT a blockchain token.</p>
<p><strong>Layer U</strong> ; Within the game, Layer U is the evolved rebellion layer operating beneath SOVcorp&#39;s corporate infrastructure. In the real world, Layer U is the spatial XR commercial layer administered through investible SPVs per jurisdiction, with DAO evolution where local regulatory conditions permit. Revenue generated through volumetric XR ad inventory.</p>
<p><strong>LocalNet</strong> ; Off-chain standard trade protocol within The Exchange (see CANON_Economy_Systems V2.0). Used for high-volume trading of unbound combat gear, crafting resources, and consumables. Available from early game phases without chain dependency. Visual cue: circular icon.</p>
<p><strong>MetaXity1</strong> ; The arcology setting of Strands the Game, set in Year 555. A post-collapse megastructure governed by SOVcorp, layered over a decentralised resistance network.</p>
<p><strong>Mymories</strong> ; Sovereign memory objects stored within the EveryWear data vault. Player-owned, privacy-first, and portable. Memory belongs to Mymories within the EveryWear stack, not to My Maits. SAL personalisation is driven by Mymories context, not by standalone agent memory.</p>
<p><strong>My Maits</strong> ; Agentic AI companions within the Strands ecosystem. Personality and capability defined by composable Trait Shards. Fainance Ltd. (UK) represents the first B2B production deployment of Mait-powered technology.</p>
<p><strong>Proper Gander</strong> ; The diegetic framing for A.R.E. advertisements within the game world. Presented as in-world corporate or resistance broadcasts rather than disruptive pop-ups.</p>
<p><strong>Protocol Bond</strong> ; The mechanism analogous to stake within the Strands consensus model, but not conventional proof-of-stake. Validation rights derive from identity, application operation, uptime, and contribution, not from token accumulation.</p>
<p><strong>SIGOPS Terminal</strong> ; The in-game operational hub for resistance faction activity, housing The Exchange, mission systems, and communication infrastructure.</p>
<p><strong>SOVComp</strong> ; In-game corporate currency issued by SOVcorp. Fiat-backed, stable, fully integrated with the surveillance apparatus. Every transaction updates the player&#39;s Compliance Score.</p>
<p><strong>SPV (Special Purpose Vehicle)</strong> ; Jurisdictionally localised companies through which Layer U operates in each market. May evolve toward DAO structures where local and jurisdictional conditions favour such transitions.</p>
<p><strong>Strands Chain</strong> ; A Rust-implemented sovereign chain derived from Mina Protocol design principles, especially zk-SNARKs and succinct ledger architecture. Functions as a validator construct: the device carries the continuity, the chain confirms the truthfulness of that continuity.</p>
<p><strong>The Exchange</strong> ; The in-world marketplace within the SIGOPS Terminal. Operates across two protocols: LocalNet (off-chain standard trades) and DeepSync (on-chain unique asset trades).</p>
<p><strong>Trait Shards</strong> ; Modular components that define a My Mait&#39;s personality, skills, knowledge, and aesthetic presentation. Composable, tradeable, and capable of evolution through usage.</p>
<p><strong>UBC / UBComp (Universal Basic Calories / Universal Basic Compute)</strong> ; SOVcorp-distributed baseline systems within the game world. Calories for survival, compute for system access. Both create dependency by design.</p>
<p><strong>Validator Construct</strong> ; The architectural principle underpinning the Strands chain. Not a monolithic public ledger. Each participant maintains a client ledger; the chain verifies state transitions via zk-SNARK proofs.</p>
<p><strong>WiFi DensePose</strong> ; Camera-free spatial attention verification via WiFi channel state information (CSI) analysis. Future-phase technology for verifying genuine user presence without invasive sensing.</p>
<p><strong>zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge)</strong> ; Cryptographic proofs enabling transaction and state verification without revealing underlying data. Core to the Strands chain&#39;s privacy architecture and succinct ledger model.</p>
<hr>
<h2>Appendix B: Game Economy and Monetisation</h2>
<h3>Four-Layer Economic Architecture</h3>
<p>The Strands economy operates as a sequential stack. Each layer must prove viability before the next activates.</p>
<p><strong>Layer 1, Payment:</strong> Fiat on-ramps via Telegram/TON. USDT, TON, Telegram Stars, card payments via MoonPay. Live from Telegram Mini App launch.</p>
<p><strong>Layer 2, Game:</strong> In-game soft currencies for gameplay. SOVComp (corporate) and GridScrip (resistance). Neither has real-world value or exchange capability.</p>
<p><strong>Layer 3, Earning:</strong> Player revenue via A.R.E. and marketplace activity. Fiat-denominated (USDT) player balance. Activates post proof-of-concept.</p>
<p><strong>Layer 4, Chain:</strong> Equitable redistribution protocol via $KREDS on Strands Chain. Activates only after the fiat economy has proven the model works.</p>
<h3>Dual In-Game Currency</h3>
<p><strong>SOVComp</strong> serves the corporate economy: earned through Cover Identity employment, corporate contracts, and loyalty rewards. Fully surveilled, compliance-integrated. Provides access to corporate zones, official AI assistants, premium crafting stations, and regulated marketplace transactions.</p>
<p><strong>GridScrip</strong> serves the resistance economy: earned through SIGOPS task completion, salvage operations, intelligence trading, and resistance contributions. Anonymous within the game world, untraceable by corporate systems. Spent on SIGOPS missions, Mait modification, resistance equipment, hacking operations, and underground market access.</p>
<p>All players must engage with both currency ecosystems due to the tri-path progression system. Morning corporate compliance earning SOVComp; evening resistance activities burning GridScrip.</p>
<h3>Nine Revenue Streams</h3>
<table>
<thead>
<tr>
<th>Stream</th>
<th>Description</th>
<th>Player Choice</th>
</tr>
</thead>
<tbody><tr>
<td>Community Support</td>
<td>Voluntary donations (&quot;Fund the Signal&quot;)</td>
<td>Voluntary</td>
</tr>
<tr>
<td>Founders Pass</td>
<td>6,000 passes at $20-$40, staged waves. Gen-0 Blank shell and early access</td>
<td>One-time purchase</td>
</tr>
<tr>
<td>In-App Purchases</td>
<td>Cosmetics and seasonal content. No pay-to-win</td>
<td>Voluntary</td>
</tr>
<tr>
<td>A.R.E. (Proper Gander)</td>
<td>Diegetic rewarded video. 60% to player, 40% to ecosystem</td>
<td>Opt-in</td>
</tr>
<tr>
<td>Marketplace Fees</td>
<td>Transaction fees on LocalNet and DeepSync trades</td>
<td>Automatic on trades</td>
</tr>
<tr>
<td>Skin the World Compute</td>
<td>Compute credits for generative asset creation</td>
<td>Pay-per-use</td>
</tr>
<tr>
<td>EveryWear Data Vault</td>
<td>Subscription for sovereign memory storage and enhanced vault features</td>
<td>Subscription</td>
</tr>
<tr>
<td>Consented Data Licensing</td>
<td>Privacy-first, player-controlled. Anonymised behavioural data licensed to brands</td>
<td>Opt-in with tiered consent</td>
</tr>
<tr>
<td>Seasonal Passes</td>
<td>Battle pass model. Access to premium seasonal content and cosmetic rewards</td>
<td>Per-season purchase</td>
</tr>
</tbody></table>
<h3>Scale Viability</h3>
<p>The following ranges are indicative operating thresholds, not guaranteed outcomes. 300 players: lean bootstrap sustainable. 1,000-3,000 players: small studio base with 1-3 full-time equivalents. 5,000-10,000 players: full small studio operations. 10,000+: viable MMO-scale business with growth runway. Actual viability depends on retention, monetisation mix, and operating costs at each phase. Funding path is milestone-driven: Demo, Pre-alpha, Alpha, Raise. Initial funding via Founders Pass; external investment only after proving retention and monetisation viability. The game economy functions entirely on fiat settlement; $KREDS is not required for the game to operate or generate revenue.</p>
<hr>
<h2>Appendix C: Layer U City Deployment Model</h2>
<h3>Target Scope</h3>
<p>Layer U deploys as a spatial advertising layer within urban environments, structured as investible SPVs per jurisdiction. Each city deployment represents a standalone commercial entity with its own regulatory compliance, operating licence, and revenue model.</p>
<h3>Pilot City Selection</h3>
<p>The first Layer U deployment will be selected from four candidate markets: Singapore, Kuala Lumpur, Jakarta, and Bangkok. Final selection will be determined by regulatory accessibility, commercial readiness, SPV incorporation timelines, and partnership conditions at the point of activation. Each candidate city meets the baseline criteria of high smartphone penetration, meaningful digital advertising market size, and existing infrastructure for mobile-first consumer engagement.</p>
<h3>Worked Example: Kuala Lumpur</h3>
<p>The following illustrates how a Layer U deployment would function using Kuala Lumpur as a representative market. This is a worked example, not a confirmed pilot commitment.</p>
<p><strong>Addressable market:</strong> Smartphone penetration exceeding 80% of the metropolitan population, approximately 1.44 million addressable users from a base of 1.8 million (Statista/UN). Digital advertising market valued at approximately $105.5M.</p>
<p><strong>Pricing model:</strong> Volumetric XR advertising inventory priced at $10 per cubic metre per annum. This positions Layer U at 13 to 284 times cheaper than equivalent physical billboard inventory, depending on location and format. The pricing model is designed to lower the barrier for advertisers while generating meaningful per-unit revenue at scale.</p>
<p><strong>Illustrative revenue scenario:</strong> The following represents a base-case scenario, not a forecast or commitment. Assuming 25% addressable market capture, Year 1 revenue of approximately $26.4M, with break-even projected within 1.4 years. An upside case with higher penetration or premium inventory would improve these figures; a conservative case with slower adoption would extend timelines. Market capture assumptions are contingent on advertiser demand, regulatory conditions, and operating execution. All projections are subject to the phased activation and feature dependency disclaimers set out in Chapter 11.</p>
<p>The same economic model applies to each candidate city, adjusted for local market size, advertising rates, and regulatory conditions. No projections should be read as guaranteed outcomes.</p>
<h3>Expansion Model</h3>
<p>All city deployments follow the same SPV structure. Each city represents a standalone commercial entity with its own regulatory compliance, operating licence, and revenue model. Each deployment activates independently; no city launch is contingent on another. SPV governance may evolve toward DAO structures where jurisdictional conditions permit, as described in Chapter 8.</p>
<hr>
<h2>Appendix D: Trait System Overview</h2>
<h3>Trait Categories</h3>
<p>My Maits personalities are composed from modular Trait Shards across five primary categories:</p>
<p><strong>Personality Shards:</strong> Based on Myers-Briggs type dimensions (Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving). Eight sub-type shards combine to produce sixteen distinct personality profiles, each influencing communication style, decision-making patterns, and interaction preferences.</p>
<p><strong>Educational Traits:</strong> Language and Literature, History and Culture, Social Sciences, Earth and Environmental Sciences, Biological Sciences, Space and Astronomy, Technology and Digital Literacy, Philosophy and Ethics, Arts and Creativity, Current Events and Media Literacy. Each trait has depth levels from Novice through Adept to Expert.</p>
<p><strong>Hobby and Interest Traits:</strong> Over one hundred categories spanning Arts and Crafts, Music and Performance, Literature and Writing, Sports and Fitness, Games and Puzzles, Technology and Digital, Nature and Outdoors, Culinary Arts, Collections and Memorabilia, Science and Exploration, Social and Community, and Lifestyle and Personal Development. Each with Casual, Enthusiast, and Expert engagement levels.</p>
<p><strong>Aesthetic Traits:</strong> Gender presentation, body type, age appearance, skin tone, hair style and colour, eye shape and colour, facial features, special features, clothing style, accessories, and environment integration. These serve as metadata prompts for avatar generation, enabling virtually unlimited visual combinations.</p>
<p><strong>Maturity Levels:</strong> High School, Undergraduate, Postgraduate, Experienced Professional. Maturity governs which Knowledge Shards are accessible and influences the depth and complexity of a Mait&#39;s responses.</p>
<h3>Trait Evolution</h3>
<p>Trait Shards are not static. Through sustained usage and interaction, individual traits can progress through five levels: Basic, Proficient, Expert, Master, and Legendary. Evolution is driven by active usage hours, unique user interactions, and positive feedback. Higher-level traits provide enhanced capabilities and may command greater marketplace value where the ecosystem supports such exchange.</p>
<h3>Trait Interaction</h3>
<p>Traits across categories interact to produce emergent characteristics. A Mait combining Chess (hobby) with Logical Thinking (personality) may demonstrate stronger strategic reasoning. A Mait combining Environmental Conservation (hobby) with Social Activism (interest) may orient toward climate-related discourse. These interactions are lightweight by design, avoiding rigid stereotyping while allowing meaningful personality differentiation.</p>
<hr>
<h2>Appendix E: Asset Ecosystem</h2>
<table>
<thead>
<tr>
<th>Asset Type</th>
<th>Creation</th>
<th>Ownership (Pre-Chain)</th>
<th>Ownership (Chain-Active)</th>
<th>Monetisation</th>
</tr>
</thead>
<tbody><tr>
<td>Mymories</td>
<td>Player actions, agent training, faction rewards</td>
<td>Internal game asset, player-sovereign</td>
<td>Exportable and chain-bindable when chain layer is active</td>
<td>Tradeable in premium market post-chain</td>
</tr>
<tr>
<td>Cosmetic Trait Shards</td>
<td>Premium market, seasonal pass</td>
<td>Internal game asset</td>
<td>Chain-bindable when chain layer is active</td>
<td>Alters visual effects; no gameplay impact</td>
</tr>
<tr>
<td>Agent Cosmetics</td>
<td>Premium market, seasonal pass, faction-earned</td>
<td>Internal game asset</td>
<td>Chain-bindable when chain layer is active</td>
<td>Cosmetic value and trade post-chain</td>
</tr>
<tr>
<td>Faction Badges and Titles</td>
<td>Earned via gameplay and reputation</td>
<td>Internal game record</td>
<td>Internal game record (non-exportable)</td>
<td>Non-tradeable prestige display</td>
</tr>
<tr>
<td>Standard Gear and Consumables</td>
<td>Earned and crafted in-game</td>
<td>Internal game asset</td>
<td>Internal game asset</td>
<td>Pure gameplay utility</td>
</tr>
<tr>
<td>Ability and Tuning Shards</td>
<td>Earned via gameplay</td>
<td>Internal game asset</td>
<td>Internal game asset</td>
<td>Traded for in-game currency only</td>
</tr>
</tbody></table>
<p>The asset ecosystem distinguishes between two categories. On-chain provenance applies where ownership, scarcity, and provenance materially matter: Mymories, cosmetic Trait Shards, and agent cosmetics become exportable and chain-bindable once the Strands chain is active, but function as internal game assets in pre-chain phases. Standard gameplay items remain lightweight internal assets throughout all phases, ensuring frictionless gameplay regardless of chain status. All assets function within the game economy from launch; chain binding is an extension, not a prerequisite.</p>
`,
};

export default chapter;
