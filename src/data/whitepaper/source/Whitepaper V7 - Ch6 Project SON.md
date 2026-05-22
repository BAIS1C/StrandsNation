# Whitepaper V7 - Chapter 6: Project SON

## What Project SON Is

Project SON is the operator-facing console of the Strands ecosystem. It is the geospatial intelligence dashboard through which operators (Strands platform staff, SPV administrators, future authorised agents) observe the world, plan inventory placements in Layer U, and publish content into the spatial economy.

SON is not user-facing. The user never opens SON. The user opens EveryWear, runs the applets, opts into A.R.E. attention events, sees holographic content in their field of view. Everything the user experiences is delivered through EveryWear on their device. SON is what makes that delivery possible from the operator side: where to place inventory, who is in that location, what is happening there, what sponsors might be interested, what regulatory jurisdiction governs the placement.

The acronym is Strands OSINT Network. The product is a Cesium-based geospatial dashboard built on Node.js and Express, hosting an active OSINT pipeline across thirteen layer families (commercial aviation, military aviation, satellites, thermal anomalies, CCTV, news, GPS jamming, and more), with photorealistic 3D Tiles rendering, four shader presets, three EveryWear design-system skins, and a Kasai-integrated chat surface.

This chapter describes the console as it stands today, the layered public deployment that brings Layer U-specific surfaces online, and the reserved future surfaces that build third-party-platform behaviour on the operator substrate.

## The Strategic Position

SON does not compete with civilian fusion platforms such as Palantir's WorldView or similar geospatial intelligence products. The 2026-04-30 strategic recalibration captured in the SON architecture document records this clearly: SON is a personal-beta operator console for the founder, with Layer U services (events, social, escrow, flashmobs, dating, ad layer) bolting on as Founders Pass holders are onboarded. The OSINT layer is shared visual language with civilian fusion products. The value capture is structurally different.

A civilian fusion platform sells observation as a service to enterprise customers. SON observes the world to enable Strands platform operations. Civilian fusion makes operators more efficient at watching. SON makes operators more efficient at authoring spatial inventory and onboarding population into the StrandsNation. These are different products in different markets even when they share a globe and similar shader treatments.

This positioning matters because it determines what SON optimises for. SON does not need to be the best OSINT product on the market. SON needs to be the best operator surface for authoring Layer U inventory and observing the StrandsNation. Every architectural decision flows from that primary purpose. The thirteen OSINT layers ship today not because Strands plans to sell intelligence-as-a-service but because Layer U authoring decisions are better when the operator can see the world context where the inventory will be placed.

## The Current Build State

Project SON is a working operator console shipping today, served from `node server.mjs` at the local operator's machine, with public deployment to `layeru.xyz` pending the activation conditions described later in this chapter.

The console presents six screens: Worldview, Consigliere, Inspector, Alerts, Settings, and Boot. Each screen is built on the EveryWear Design System, which gives SON the same three-skin (Terminal, Classic, Refined) by two-mode (Dark, Light) by three-density (Compact, Default, Roomy) treatment that EveryWear OS uses. The default skin is Terminal Dark Compact, which matches the operator's mode of work: focused, dense, high-contrast, monospace.

The Worldview screen is the centre of the console. A Cesium globe occupies the bulk of the surface, with a left panel for layer toggles, a right panel for live feeds (news, CCTV, AI insights), a top chrome bar (title, tab strip, DEFCON chip, version, user identity), a command bar (UTC clock, search, region picker, time-window picker, layer count, LM Studio status badge, sweep status badge, settings gear), and a status bar (current screen, sweep timer, uplink count, skin/mode/density readout).

When the operator registers a Google Maps API key, the Worldview swaps the default ESRI imagery for photorealistic 3D Tiles. Cities render in three dimensions with actual building geometry, terrain elevation, and roof detail. The four shader presets (NVG, FLIR, CRT, OPS) apply post-process effects at the keypress level: number keys 1 through 4 cycle them, key 0 returns to clean. The CRT preset has a sub-toggle that cycles pixelation level from 0 through 8 for authentic low-resolution surveillance aesthetic.

The thirteen OSINT layers are independently toggleable. Each layer reports its source health (ok, key-gated, degraded, failed) and refresh state. AIR layer pulls approximately 600 commercial aircraft state vectors from OpenSky on each sweep. SAT layer renders TLE-propagated orbits for the ISS, space stations, and recent launches via CelesTrak. MIL layer pulls military aircraft from ADS-B Exchange when an API key is registered. HOT layer renders thermal anomalies from NASA FIRMS. CCTV layer renders a verified camera library projected onto the globe with inline media when clicked. NEWS layer renders geo-anchored news cards from Reuters, Bloomberg, GDELT events, and X trending (via Nitter RSS mirrors). The remaining layers cover GPS jamming, network state, and additional reference categories.

The Consigliere screen hosts the agent chat. SON connects to LM Studio for local model inference or to the Kasai local HTTP provider when Kasai's chat route is live upstream. The chat surface uses the EveryWear chat-bubble token contract. Tool-use rows render inline above source citation chips. When the operator asks the agent to toggle a layer, fly to a location, query a source, or compose a brief, the action appears as a chip in the conversation while the corresponding globe state updates.

The Inspector screen handles entity-detail views: news article cards with full body and source attribution, CCTV camera cards with inline video where available, social cards from any wired social adapter, AI insight cards with source citations.

The Alerts screen logs operational events from Telegram, Discord, webhook, and email delivery channels with retry affordances for failed deliveries. The Settings screen exposes API key management with masked input and reveal toggles, LM Studio configuration, and the .env reload trigger. The Boot screen shows the structured boot log streaming from the sweep orchestrator with per-source health classification.

Across all screens, the EveryWear design tokens enforce zero raw hex colour use. Every visual element derives from the token contract. The operator can switch skin, mode, and density at runtime via the gear popover; the choice persists to local storage and applies to every screen instantly through CSS variable swapping.

## The Worldview Surface as Layer U Authoring Tool

The Worldview is the centre of operator work because the world is what Layer U is built on. Volumetric inventory is anchored to physical locations. Spatial events are scheduled in specific city blocks. Founders Pass holders cluster across geographic territories. Sponsor placements depend on foot traffic, neighbourhood character, regulatory jurisdiction. All of this is operator decision-making, and all of it is decision-making against the globe.

The Worldview today serves the OSINT observation mode. The Worldview at SON public deployment serves the inventory authoring mode. The same globe, the same camera, the same shader, with additional capability to draw volumetric parcels, configure A.R.E. terms, set sponsor allowlists, schedule event sessions, publish to Layer U.

The authoring surface is not yet implemented. The observation surface is. This is the deliberate progression of SON: ship the observation console first, validate the operator surface, layer the authoring affordances on top once Layer U primitives are available to publish into.

The authoring affordances that will land in subsequent versions: rectangular and polygonal parcel selection on the globe with volumetric extrusion controls; A.R.E. economic configuration per parcel (eCPM target, opt-in tier, audience consent profile); sponsor inventory slot assignment with allowlist/denylist; session scheduling with start time, duration, expected attendance bounds; publication action that emits the parcel into Layer U's volumetric registry through the primitive API; live monitoring of active sessions during execution.

## The OSINT Layer Family as Strategic Substrate

The thirteen OSINT layers are not surveillance products. They are operator intelligence. Each layer answers a question a Layer U operator needs answered.

Aviation layers (AIR, MIL) answer questions about transit corridors. Where are people flying through? Which airports concentrate foot traffic? Where do logistics flows touch retail? Holographic event placement near transit nodes benefits from aviation context.

Satellite layer (SAT) answers questions about overhead coverage. Which orbital infrastructure is visible from a planned event location? This matters less for direct inventory placement and more for the Strands narrative thread of network resilience: the operator can confirm which infrastructure is overhead during any given session.

Thermal anomaly layer (HOT) answers questions about wildfires, crop burns, industrial heat signatures. This matters for outdoor event planning. An event scheduled near an active thermal anomaly needs different risk handling than one in cooler context.

CCTV layer answers questions about public-camera coverage. The operator authoring inventory in a public plaza benefits from knowing which cameras already see that plaza. For Layer U commercial use this is informational; the camera feeds themselves are not consumed for surveillance, they are consumed for context.

News layer (NEWS) answers questions about what is happening in the world right now. A Layer U event in a city with active political unrest needs different framing than one in a quiet news cycle. The operator authoring inventory benefits from the news context flowing alongside the globe.

GPS jamming layer answers questions about positioning reliability. Layer U inventory delivery depends on accurate user positioning. An operator authoring inventory in a GPS-jammed zone needs to fall back to RF environment fingerprinting (as described in Chapter 7) and should know this in advance.

The remaining layers (network state, additional reference categories) round out the operator's situational picture. Each is independently toggleable. The operator does not need every layer active for every session. The point is that the layers are available when the question they answer arises.

The OSINT layer family also serves the strategic purpose of making SON's visual language credible to investors and partners. A console with thirteen live OSINT layers and photorealistic 3D Tiles signals a level of operational sophistication that a pure inventory-authoring console would not. The OSINT layers are real intelligence; they are also marketing for the operator surface.

## The Consigliere Agent and the Kasai Bridge

The Consigliere screen is where SON's operator agent lives. Today the agent backs to LM Studio for local model inference. The Kasai local HTTP provider is wired with two model identifiers: `kasai` for the full Kasai model when its chat route is live upstream, and `kasai-lite` for a smaller local-LLM fallback served via LM Studio's OpenAI-compatible path.

The agent's role on the operator console is broader than the agent's role inside EveryWear's applet stack. In EveryWear, Kasai helps the user compose tracks, find their images, schedule their publications. In SON, Kasai helps the operator author inventory, query sources, compose briefs, and broker between Layer U primitives and the operator's intentions.

The Consigliere agent at full maturity will perform several functions. Source query: pull data from any registered OSINT layer in natural language, returning entity references or summarised aggregates. Inventory authoring: convert a natural-language brief from the operator ("place a 30m³ holographic event slot above the Jakarta Plaza Indonesia plaza for May 15th, 8pm to 11pm, electronic music aesthetic, brand allowlist of three Indonesian carriers") into a draft Layer U publication and present it for operator confirmation. Brief composition: pull current OSINT layer state for a target location and produce a structured operator brief on the spatial, social, and commercial context. Anomaly flagging: monitor active OSINT layers for state changes near published Layer U inventory and surface them in the Alerts screen with severity classification.

The agent runs against the operator's local model. There is no cloud-side reasoning loop. The operator's intent never leaves the operator's machine in raw form. When the agent needs to query a remote service (a news API, a CCTV stream, a satellite TLE source), it does so through the canonical SON server-side adapters, never directly from the chat surface.

## SON Public: NEWS Sub-Layer

The first SON public surface is the NEWS sub-layer. This is the simplest deployment because it requires no identity layer, no consent ledger, no Layer U primitive integration. It exposes geographic news context as a public-facing globe.

NEWS sub-layer ships as `layeru.xyz/news` or as a default Worldview pane at `layeru.xyz`. Sources: GDELT Events 2.1 with 15-minute refresh and geo-tagged entries as the primary feed; Reuters and Bloomberg RSS as supplemental; X trending by geo via Nitter RSS mirrors. Each news item renders as a card on the globe at its geo-tagged location. Clicking the card opens an inline reader with full body and source attribution. Markers cluster at globe-level zoom and expand at city-level zoom.

The NEWS sub-layer serves three purposes. First, it is a useful product in its own right: a clean Cesium-rendered geographic news view at a moment when most news experiences are timeline-based and geographic context is buried or absent. Second, it validates the public-deployment pipeline (Cloudflare DNS, Vercel hosting, Cloudflare R2 for media, Supabase for the database that NEWS shares with the Founders Pass system). Third, it surfaces the Strands brand to a public audience that has not yet engaged with the Founders Pass or the game.

NEWS is the wedge for SON public. It can ship before any Layer U primitives are live, before any StrandsNation overlay is rendered, before any Diary Module is built. It validates the platform deployment by itself.

## SON Public: STRANDSNATION Social Overlay

The second SON public surface is the STRANDSNATION sub-layer: a living population overlay of Founders Pass holders rendered on the globe.

Six thousand passes have been issued in total. By default, every pass holder appears on the globe as an anonymous Strand logo glyph at country-centroid jitter, with no identifying information. The opt-in identity ladder gives each holder four tiers of visibility they can choose between via their everywear.id profile:

Tier 0: anonymous Strand logo glyph, no handle, country-centroid jitter. This is the default.

Tier 1: adds a country flag overlay on the glyph. The holder declares which country they want to be visible as, but no further identification.

Tier 2: adds the holder's everywear.id on hover. Still no city-level location, just identity.

Tier 3: adds city-centroid placement (not address-level), and the everywear.id becomes a clickable deep link to the holder's everywear.id profile.

The identity root is `everywear.id`. Founders Pass claim triggers everywear.id creation if not held. The map functions as adoption funnel for the broader EveryWear ecosystem: a Founders Pass holder who wants to appear at higher visibility tiers must hold an everywear.id, and once they hold one, they have all the downstream EveryWear ecosystem capabilities available to them.

Density management uses Cesium EntityCluster: at globe zoom, holders collapse into country-level clusters with a count; at city zoom, individual glyphs appear; at street-level zoom (when activated), Tier 3 holders appear at their declared city centroid. No glyph appears at the user's actual address. No timestamp trails are stored. No historical location data is retained for third-party query. The presence state is latest-only.

The Hanko red colour treatment is reserved for criticality semantics. Founders Pass holders do not glow red. Red glow indicates chokepoint alerts, escalation events, or critical operational status. Holders use a neutral Strand glyph treatment.

STRANDSNATION ships after NEWS because it requires the everywear.id identity root to be live, the Founders Pass claim to be processed against everywear.id binding, and the opt-in tier ladder to be wired from each holder's everywear.id profile. These dependencies are in active build.

The product purpose of STRANDSNATION is social gravity. A Founders Pass holder seeing themselves on the globe, surrounded by neighbours, creates daily-return motivation that no static product can match. This is the loop that gets holders coming back daily, which is the engagement substrate that the rest of the Layer U surfaces will be built on.

## SON Public: Diary Module

The third SON public surface is the Diary Module: visual data journaling that doubles as the testing environment for the geo-located media pipeline that Layer U will eventually depend on.

The Diary Module is a permanent video diary of a real journey, composed from the user's own metatagged photos and videos, the SON Recon itinerary substrate, 3D Tiles globe flythroughs, locally captured CCTV stills, knowledge-layer text snippets via Wikipedia GeoSearch and local LLM enrichment, and optionally generated music from the ACE-Step pipeline that powers Gener8.

The Diary is the user's, not the operator's. A Founders Pass holder who travels logs their itinerary, drops their photos at the places they were, and the Diary Module composes the result into a video artifact. The artifact is class-B permanent (unlike the SON Recon itineraries themselves, which are class-A and auto-fade thirty or ninety days post-journey-expiry unless explicitly promoted to a Diary). The user owns the artifact forever.

The Diary Module is the first commercial wedge for Layer U public. Branded diaries integrate hotel sponsorships via the existing v6 ad-layer dNFT primitive that Chapter 7 of this whitepaper details. A traveller staying at a partner hotel finds their diary composition includes sponsored content for the hotel, the local attractions the hotel recommends, the partner restaurants in the neighbourhood. The sponsorship is consented at booking time. The user is paid the standard A.R.E. 60% of the sponsored impression value. The hotel pays the same eCPM as any Layer U sponsor would.

This is the wedge because it validates several Layer U pipelines simultaneously. The geo-located media pipeline (photos and videos tagged to specific places, knit into a coherent narrative). The dNFT sponsorship primitive (hotel sponsors as inventory contributors). The A.R.E. consent and payment loop (user consents at booking, gets paid on impression). The narrative composition pipeline (the director engine borrowed from S3 Studio Creator Pro Music Director, repurposed for visual narrative).

None of these are full Layer U deployment. Each is a validated component that Layer U full deployment depends on. The Diary Module is Phase B's commercial wedge specifically because every part of it that ships also de-risks Phase D and Phase E.

## SON Public Roadmap

The deployment sequence:

Phase B1: NEWS sub-layer ships at `layeru.xyz` or a sibling subdomain. No identity dependencies. No consent ledger. Cloudflare R2 for media, Vercel hosting, GDELT plus Reuters plus Bloomberg as feeds. Validates the public-deployment pipeline.

Phase B2: STRANDSNATION overlay ships on top of the NEWS layer surface. Requires everywear.id identity binding and Founders Pass claim flow to be live. Opt-in tier ladder wired from everywear.id profiles. Validates the social-population mechanic.

Phase B3: Diary Module launches as the first commercial wedge for Layer U public. Branded diaries via hotel sponsorship dNFTs. Validates the geo-located media pipeline, the dNFT sponsorship primitive, the A.R.E. consent and payment loop, and the narrative composition pipeline. Ships when the SON Recon trip planning module (currently in active build) is mature enough to produce real itineraries to journal against.

Phase B4 and beyond: the reserved future surfaces (commerce escrow, dating, ad layer, third-party platform, diegetic game integration) layer on as Founders Pass adoption deepens and Layer U primitive APIs activate.

Each public phase depends on the previous phase having validated its activation conditions. NEWS proves the deployment pipeline. STRANDSNATION proves the identity binding. Diary Module proves the commercial loop. The reserved future surfaces (next section) build on what these three have proven.

## Reserved Future Surfaces

SON's architecture document at `Project SON/LAYER_U_ARCHITECTURE_2026-04-22.md` documents several future surfaces in detail. These are reserved as Layer U primitive applications built on the same operator console substrate. None are active in current SON. Each is preserved here so the architectural direction is captured in canonical form.

**Commerce escrow primitive.** Two `everywear.id` holders commit to a meet at a geographic hotspot. Both parties stake signed metadata to an encrypted vault before the meet. Both must sign after the meet to release. Failure to release triggers a pre-designated escalation path. The encryption uses a 2-of-3 client-side threshold key split between the two parties and each party's user-designated escalation contact. Strands holds no decryption material. Strands carries no subpoena exposure. First use cases are deliberately low-stakes: service marketplace (tutors, handymen, massage, driving lessons), peer-to-peer pickup (used items confirmed by both parties), travel hosting (Couchsurfing analogue), co-working, skill trade and language exchange. Reserved API surface includes `escrow_open`, `escrow_release`, `escrow_escalate`, `escrow_status`.

**Dating layer.** Uses the same escrow primitive plus explicit terms-and-conditions binding at match creation. Surety stake unlocks to both parties on successful mutual release or slashes to the escalation pool on protocol abandonment. Deferred indefinitely until the commerce primitive proves out at lower stakes. First tragedy on a dating platform destroys the whitepaper brand narrative; ships only after the commerce primitive is battle-tested. Jurisdictional separation: operates from Singapore-incorporated SPV (somokasane Pte. Ltd.), not from Indonesia-incorporated PT Metafintek, because same-sex matching is criminalised in Indonesia and the dating surface cannot be offered from Indonesian infrastructure without compliance review.

**Ad layer (resurrected v5 thread, reframed under V7).** The ad-layer thread from V5 of the whitepaper survives in evolved form. XR advertising anchored to real-world hotspots. dNFT ownership of hotspot ad real estate using Strands SPL-721 tokens. Creator royalties baked into the dNFT contract. City-scale advertising zones, but explicitly as ad geometry rather than yield-bearing City DAO tokens (the V5 DAO-token framing was deprecated in the V6 reconciliation; see Chapter 7). Integration with EveryWear mobile surface for AR rendering. Native Strands game integration: in-game advertising that matches real-world Layer U placements for diegetic coherence.

**Third-party developer platform.** EveryWear is positioned as "Steam for AI Apps" and Layer U is the geospatial substrate apps on EveryWear consume. The reserved primitive API exposes six calls: `layer_u.post_listing` to publish inventory; `layer_u.query_nearby` to find inventory at a location; `layer_u.open_escrow` to initiate a two-party transaction; `layer_u.verify_presence` to confirm a user is at a hotspot; `layer_u.publish_brief` to push composed content to the Layer U feed; `layer_u.subscribe_to_hotspot` to receive event notifications at a location. Third-party developers build dating apps, tutor marketplaces, travel hosts, AR games, and additional vertical applications on these primitives. Strands takes a revenue share on commerce-routed transactions, free for non-commercial surfaces.

**Diegetic game integration.** The Strands game becomes a training ground for Layer U protocols within fiction. In-game quests teach players the escrow-release-or-escalate mechanic through NPC interactions. Game-world hotspots mirror real-world Layer U hotspots with stylised treatment. Players who complete in-game safety protocols unlock real-world Layer U trust scores. XR games (future EveryWear mobile) overlay Strands characters on real-world Layer U hotspots: find-a-Blank quests, location-anchored player-versus-environment events. Sublime VIP Pass holders get in-game avatar appearances on the real Layer U map: their Blanks visible as rendered characters when zoomed in, rather than just Strand logo glyphs.

These reserved surfaces are documented but not built. They are the third-party platform thesis made concrete. They ship in priority order as Founders Pass adoption justifies each.

## Architectural Non-Negotiables

SON inherits several load-bearing constraints from the EveryWear and Layer U architecture. These are not preferences. Violating any of them breaks the whitepaper thesis or creates fatal liability.

**Users hold keys.** Strands never holds decryption material for user-to-user interactions on the commerce or dating surfaces. SON is the substrate, not the custodian. The platform exposes no recovery path that bypasses the user's threshold key holders. This is the structural answer to subpoena exposure and to the broader anti-techno-feudalism thesis.

**Privacy-first opt-in.** Every identifying detail of a Founders Pass holder, whether handle, country, city, or interaction trail, is opt-in from the Tier 0 anonymous default. The opt-in is wallet-signed; consent updates are recorded as signed events.

**everywear.id is the identity root.** No parallel pseudonym systems. One identity, tiered visibility, user-controlled. Founders Pass binds to everywear.id at claim. All future Layer U commerce, dating, and third-party app interactions reference everywear.id.

**No timestamp trails.** Presence state is latest-only. Historical location data is never stored in any form that supports third-party query. Aggregate-only analytics are retained for Strands operations.

**Jurisdictional separation.** Any surface with criminal-law exposure (dating, adult-categorised commerce) operates from the Singapore-incorporated entity, not from the Indonesia-incorporated entity. This is not legal advice abstracted into architecture; this is architecture that protects against specific named regulatory exposure in specific named jurisdictions.

**Hanko semantics preserved.** Seal red in the UI is reserved for criticality (chokepoint alerts, escalation events). It is never used for routine markers, social presence, or general state highlighting.

These constraints apply uniformly across SON's current and future surfaces. The reserved surfaces in the previous section all comply with these constraints by design; the surfaces themselves change, the constraints do not.

## Relationship to EveryWear

SON and EveryWear sit on opposite sides of the user-operator boundary. EveryWear is the user's runtime. SON is the operator's console. They share a design system (EWDS) and several technical substrates (the Cesium globe library, the Kasai agent runtime, the design tokens), but they expose fundamentally different surfaces to fundamentally different audiences.

The user never opens SON. The operator never opens EveryWear in the operator-console mode (though the operator may use EveryWear as a personal runtime in non-operator contexts). The two systems communicate through Layer U primitives. The operator authors inventory in SON; Layer U records the inventory in its volumetric parcel registry; EveryWear queries Layer U for inventory candidates when a user opts into the A.R.E. pipeline; the user experiences the inventory on their device.

This separation is structural. Conflating user and operator surfaces creates the failure mode that civilian fusion products fall into: an operator UI exposed to users, with privacy and trust models designed for operators applied awkwardly to users. SON's design language (Terminal Dark Compact by default, NVG and FLIR shader presets, high-density information layouts) is operator language. EveryWear's design language (multiple consumer skins, ambient inference HUD, accessible default density) is user language. The split is intentional.

## Relationship to Layer U

Layer U is the economic and spatial substrate. SON is the operator interface to that substrate. EveryWear is the user interface to that substrate. The substrate itself has no UI; SON and EveryWear are its two faces.

SON consumes Layer U's read API to display inventory state, parcel registry contents, A.R.E. settlement records (anonymised aggregates), and SPV operational metrics (per-jurisdiction commercial state). SON consumes Layer U's authoring API (in development) to publish new inventory, configure A.R.E. terms, set sponsor allowlists, schedule events.

EveryWear consumes Layer U's matching API to receive inventory candidates against an anonymous category vector. EveryWear emits A.R.E. impression proofs through Layer U back to the settlement chain. EveryWear queries Layer U's hotspot subscriptions to receive event notifications at the user's current location.

Neither SON nor EveryWear writes directly to the Strands chain. Layer U handles settlement, with the chain layer underneath. SON and EveryWear see Layer U; Layer U sees the chain.

This separation is what makes the third-party developer story credible. Third-party apps consume Layer U primitives directly. They do not need to integrate with SON or EveryWear. They can build their own operator surfaces (alternative to SON) or their own user surfaces (alternative to EveryWear) and still participate in the Layer U economy. SON and EveryWear are Strands' first-party surfaces. They are not the only possible surfaces.

## What This Chapter Does Not Cover

This chapter describes Project SON as the operator-facing geospatial intelligence console for the Strands ecosystem.

The user-facing sovereign runtime that consumes Layer U inventory on user devices is detailed in Chapter 4 (EveryWear).

The operational discipline (module budgets, pipe taxonomy, context-protocol enforcement) under which SON is built and maintained is detailed in Chapter 5 (Context-Aware Tooling and Modularisation).

The Layer U economic substrate that SON authors into and EveryWear consumes from, including the A.R.E. revenue mechanism, the SPV network, and the volumetric parcel registry, is detailed in Chapter 7 (Layer U and the A.R.E.).

The token economics that flow through Layer U settlement are detailed in Chapter 8 ($KREDS Tokenomics).

The chain infrastructure that anchors Layer U settlement is detailed in Chapter 9 (Strands Blockchain).

The Strands game that mirrors Layer U primitives in fiction (and that Phase D of the deliverable sequence depends on for validation) is detailed in Chapter 2 (Strands the Game).

