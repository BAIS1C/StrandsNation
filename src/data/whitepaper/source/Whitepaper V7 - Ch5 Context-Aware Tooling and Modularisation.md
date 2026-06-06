# Whitepaper V7 - Chapter 5: Context-Aware Tooling and Modularisation

## Why This Chapter Exists

Most software is written by humans. Strands is being built primarily by AI agents working under human direction, and intends to remain that way for years. This choice changes what good architecture looks like. The disciplines that keep a human-written codebase coherent are not the disciplines that keep an AI-maintained codebase coherent. Strands has invested in a separate set of disciplines suited to its actual maintenance model.

The thesis of this chapter is that an AI-maintained codebase requires its architecture to be enforced mechanically, its module sizes to fit within the agent's working context window, its cross-module relationships to be documented in a form agents can read, and its memory substrate to live outside the conversation in a vault the agent can query. Without this discipline, AI-built codebases drift. Modules grow past the size the maintaining agent can hold in working context. Functions get rewritten to assumed signatures rather than verified ones. Architectural intent silently diverges from what the code actually does. The result is a system that becomes progressively harder for any agent, human or otherwise, to maintain.

Strands treats this as a load-bearing engineering concern, not as developer hygiene. The chapter that follows describes the contract and the tooling that implement it.

## The Module Budget Contract

The unit of agent work is the module. The unit of agent capacity is the context window. The two have to fit each other or the discipline fails.

The Strands contract sizes every module unit to fit within a 65,000-token working budget when loaded with everything an agent needs to reason about a change in that module: the relevant wiki section, the public interfaces the module exposes and consumes, the code itself, the tests, the system prompt overhead, and a reasonable conversation budget. The breakdown is approximately:

| Slot | Budget |
|---|---|
| System prompt | ~4,000 tokens |
| Wiki section for this module | ~2,000 tokens |
| Pipe interfaces (public APIs in and out) | ~3,000 tokens |
| Code (the actual module file) | ~16,000 tokens |
| Tests for the module | ~6,000 tokens |
| Conversation between agent and operator | ~34,000 tokens |
| Total | ~65,000 tokens |

The 16,000-token code ceiling is the load-bearing number. A file that exceeds it cannot be loaded in full alongside its wiki, tests, and interfaces within a single agent context. The agent will load only part of the file, will reason about a fragment, and will produce edits that ignore consequences elsewhere in the same file. The discipline therefore requires that no source file in the codebase exceeds the code ceiling.

When a file approaches the ceiling, it gets split. When a module's natural surface grows past the ceiling, it gets cratified (in Rust) or packaged (in TypeScript). The architecture pass filed on 2026-05-21 identifies five files in the EveryWear codebase that currently exceed the ceiling and proposes specific splits for each. The cratification plan that follows in the same document promotes ten module units into proper workspace crates, taking the end state from eight crates to twenty.

The contract is not aspirational. It is mechanically enforced by the `context-protocol` skill, which loads at the start of any session that involves editing or refactoring Strands code, and which gates edits behind verification that the relevant module is within budget and its wiki section is current.

## The Pipe Taxonomy

Every cross-module relationship in Strands is one of five types. The taxonomy is borrowed from the context-protocol skill and is used uniformly across architecture documents, wiki pages, and pipe diagrams.

**Data.** Values flow from one module to another. A typed payload crosses a boundary. Data pipes are the most common kind in any system.

**Control.** One module commands another to do something. The caller decides what action runs; the callee runs it. Control pipes are how the shell tells an applet to start, stop, load a model, or perform a job.

**State.** One module holds mutable state that another reads or modifies. State pipes are the most dangerous category because they create implicit coupling that is invisible at the call site. The discipline strongly prefers data and control pipes over state pipes wherever the relationship can be reshaped.

**Capability.** One module exposes a service that another calls when needed. The caller does not depend on the callee being active; the callee provides a capability that the caller invokes opportunistically. Capability pipes are how the shell exposes the wallet, the vault, and the model manager to the applets.

**Event.** Asynchronous notification. One module emits an event that other modules may subscribe to. The emitter does not know who is listening. Event pipes are how Kasai's audit loop and the inference HUD stay synchronised with the underlying runtime without polling.

Each pipe is also tagged with a locality annotation. Process-local means both ends live in the same process. Device-local means same device, different processes. Federated-peer means different devices belonging to the same logical user or network. Online-dep means crossing the wire to a third-party service. Chain means resolving through the Strands settlement layer.

The discipline tracks the online-dep count as a structural quality metric. The current architecture pass reports an online-dep count of zero across all Strands code. This means nothing in the runtime requires a third-party service to function. Models are local. Inference is local. Settlement is local-plus-chain. Authentication is via Supabase JWT with offline-tolerant fallback. Discourse OAuth is opt-in user behaviour, not a runtime dependency. The zero count is a deliberate property of the architecture, not an accident.

## The Module Contract Template

Every module has a contract. Every wiki page that documents a module follows the same template. This is what makes the architecture readable by both humans and AI agents.

The template fields:

| Field | Purpose |
|---|---|
| Purpose | One sentence describing what this module does and why it exists |
| Budget | Current token measurement of the module's code, with budget headroom |
| Pipes in | Each pipe consuming a value or capability from another module, by type and locality |
| Pipes out | Each pipe producing a value or capability for another module, by type and locality |
| Public API | Exported functions and types with full signatures |
| State | Owned mutable state, if any, with consistency guarantees |
| Tests | Path to the test file and what is covered |
| Last verified | Date and which agent last confirmed the module matches its wiki |

When an agent is asked to edit a module, the discipline requires it to read the wiki section first, cross-reference the wiki against the file on disk, flag any divergence, and only then propose the change. When no wiki exists, the discipline forbids the edit. The agent must instead build the wiki first by reading the codebase, then propose the change against the now-current wiki.

This is the anti-hallucination guardrail. An agent that has read the wiki and verified it against the code cannot then invent function signatures or import paths from memory, because the verified state is in the agent's working context. An agent that has not read the wiki cannot edit at all.

## The Context-Protocol Enforcement Layer

The discipline is enforced through a skill that the agent loads at the start of any session involving code work. The skill is named `context-protocol` and lives at `.claude/skills/context-protocol/SKILL.md` in any repository that adopts the discipline.

The skill performs four functions.

First, it loads the module budget contract into the agent's working context at the start of the session, so the agent knows what budget it is working within.

Second, it enforces the wiki-first rule. Before any code edit, the agent must locate the wiki section for the module being touched. If no wiki exists, the agent must propose to build one before proceeding. If a wiki exists but is stale relative to the file on disk, the agent must flag the divergence and propose to update the wiki before changing the code.

Third, it provides anti-hallucination guardrails. The agent is required to read every file it intends to edit, in full, within the current session. The agent is forbidden from assuming function signatures, import paths, or auth flows from memory. When working through a deep module chain such as authentication or state management, the agent must map the full call chain before making any change, write it out in the conversation, and get confirmation before editing any link in the chain. If the agent loses track of its position in a file or flow, it must say so explicitly and re-read rather than guess.

Fourth, it integrates with the MyMory vault for persistent memory across sessions. Architectural decisions made in one session are filed to the vault. Subsequent sessions retrieve them rather than reconstructing them.

The skill is not a suggestion. When loaded, it modifies the agent's behaviour mechanically. An agent under the context-protocol skill cannot perform a bulk edit across multiple files without walking through each one. An agent under the skill cannot edit a file it has not read in the current session.

## Cratification: Phase 2 of the Modularisation Plan

The simplest unit of compile-time isolation in Rust is the crate. Every crate has its own `Cargo.toml`, its own dependency set, its own public surface, and its own compile unit. Phase 2 of the Strands modularisation plan promotes module units that have grown to deserve hard walls into proper workspace crates.

Twelve crates are promoted in the current pass:

`gener8-shim` for the Axum HTTP shim layer that exposes Gener8 over local HTTP. `gener8-daw` for the DAW engine with cpal output and symphonia decoding. `everywear-director` for the LLM orchestration logic that plans compositions across Gener8 and (later) 3nvizen. `everywear-entitlement` for the tier reconciler that gates feature access across applets. `kasai-slots` for the Big/Small slot orchestrator. `kasai-tools` for the ToolExecutor implementations. `kasai-runtime` for the inference loop and audit. `everywear-launcher` for the seven-step applet launch pipeline. `everywear-gpu` for the three-tier GPU detection (CUDA, Vulkan, CPU). `everywear-discourse` for the OAuth and REST client. `everywear-wallet` for the Ed25519 and Strands chain client. `everywear-auth` for the Supabase JWT validation.

The end state is twenty workspace crates. Each crate is independently buildable. Each crate has its own dependency hygiene; no crate pulls in dependencies it does not directly use. Each crate has a wiki page following the Module Contract Template. Each crate is replaceable behind its trait surface, which means tests can mock it and future variants can swap it.

The benefits of cratification are concrete rather than aesthetic. Compile-time isolation: `cargo check -p gener8-daw` finishes in seconds because Cargo only rebuilds what changed. Context budget isolation: the agent loading a crate to work on it sees only that crate's code and tests, not its parent applet's surrounding logic. Physical pipe enforcement: what is not `pub` in the crate's `lib.rs` is unreachable from outside, so module boundaries stop being convention and become mechanical.

The discipline holds back from cratifying things that should not be cratified. The Tauri command glue (`#[tauri::command]` handlers) stays as `mod commands::*` inside the shell binary because those functions are intrinsically bound to the shell's AppState. Cratifying them would add boilerplate without benefit. The binary itself stays as one compile unit because that is what a binary is by definition.

Phase 2 executes after Phase 1 file splits have landed and `cargo check --workspace` is green on the split codebase. Moving files inside an applet is one diff. Moving them to a new crate is a `Cargo.toml` plus workspace-member plus dependency-graph change. The discipline requires a known-good base before promotion.

## Shared-Surface Hoisting: Phase 2.5 of the Modularisation Plan

The next discipline level handles code or runtime assets used by two or more applets. Anything shared must be exactly one of three things: a workspace crate (compile-time hoist in Rust), a workspace package (compile-time hoist in TypeScript), or a central runtime install under `~/.everywear/` (install-time hoist for heavyweight artefacts).

The compile-time hoist applies to pure logic, type definitions, traits, parsers, encoders, and validators. Anything that runs inside an applet's process and benefits from static linking. Crates and packages for Rust and TypeScript respectively.

The install-time hoist applies to heavyweight runtime artefacts. Native inference servers, Python virtual environments, large model files, dynamic libraries. The user installs them once; multiple applets share them through the shell.

The current shared-surface inventory across the EveryWear codebase identifies several duplicated TypeScript files between Gener8 and Vid Studio (videoRenderWorker at 42KB byte-identical, silhouetteEngine at 11KB byte-identical, lrcParser at 4KB byte-identical, intentBus at 2KB byte-identical, types at 3KB byte-identical, plus the VideoGeneratorModal twins at 99% identical over 4400+ lines). The Phase 2.5 plan de-duplicates these into a `packages/video-modal/` workspace package, a `packages/visualizer/` package, a `packages/lyrics/` package, and extensions to the existing `packages/shared/`.

On the runtime install side, the largest single win is the LTX Python virtual environment. Currently bundled at `applets/3nvizen/src-tauri/sidecar/ltx-runtime/.venv` at 23 megabytes per applet. The Phase 2.5 plan hoists this to `~/.everywear/sidecars/ltx/.venv/` so that every future video applet uses the same Python install. Installer footprint drops, model swap is instant, and the venv becomes a system concern rather than an applet concern.

The decision criterion is simple. If something is shared, ask first whether it is pure logic with no large runtime artefact. If yes, hoist to a crate or package. If it is a heavyweight runtime artefact such as a native binary, Python environment, or large model file, hoist to the central install tree. If it is both, the logic cratifies and the artefact centralises. The `model-manager` crate plus the `~/.everywear/models/` central model store is the template for this combined pattern.

## MyMory as the Context Substrate

Memory is what makes context-aware tooling possible. An AI runtime without memory is a chatbot that forgets between turns. An AI runtime with memory in the wrong place is a surveillance tool.

Strands solves memory through MyMory: a user-held vault that lives on the user's device, encrypted with the user's keys, and queryable by the agents and applets the user has authorised. The vault is the substrate. The agents query it. The applets read scoped subsets of it. The chain stores no copy of it.

MyMory at full maturity holds the user's interaction history, consent records, preference signals, contextual data, asset provenance, and (in later phases) spatial trace data. It is the data substrate that powers the SAL runtime described in Chapter 4. It is the consent ledger that the A.R.E. pipeline queries before any inventory request. It is the personalisation source that allows Mait companions to remember their owner across sessions. It is the memory ground that Kasai uses to maintain continuity between conversations.

The architectural commitment is that MyMory never leaves the device in raw form. The agents reading from MyMory are running on the user's device. The applets reading from MyMory are running on the user's device. When personalisation requires emitting a signal across the network (the A.R.E. category vector being the canonical example), that signal is computed locally from MyMory content and emitted as an anonymous opaque category, never as raw MyMory data.

This commitment is what makes the rest of the context-aware tooling architecture possible. The agent can be context-aware because the context lives on the user's machine. The applet can personalise because the personalisation source is local. The runtime can be intelligent without becoming a surveillance dragnet because the intelligence is grounded in memory the user owns and controls.

Chapter 4 details the vault's role as one of the six core functions of EveryWear. Chapter 7 details how the A.R.E. pipeline consumes the vault stage by stage. Chapter 9 details how MyMory integrity is anchored to the chain through cryptographic attestations rather than by copying vault content on-chain.

## Kasai as the Context-Aware Agent Runtime

Kasai is the agentic surface of EveryWear. It is the agent that helps the user navigate the applet stack, broker decisions, recall past work, and execute multi-step tasks across surfaces. It is also the first non-trivial demonstration of the context-aware tooling discipline in operation.

Kasai is built around Big/Small slot orchestration. A heavy reasoning model handles deep planning, multi-step task decomposition, and decisions that require strong language understanding. A lightweight tool-executing model handles fast bounded actions: file lookups, calendar queries, formatting tasks, structured data extraction. The two swap based on which is needed for the current step. The user experiences this as a single fluid agent. The underlying runtime is two model slots with state-driven handoff.

Kasai dispatches tool calls through a `ToolExecutor` trait. Each tool implementation is a separate cratifiable unit per the Phase 2 plan. The trait surface is fixed; the implementations are replaceable. Tools today include shell command execution, filesystem operations, and web fetches. Tools planned include direct MyMory queries, applet IPC calls (so Kasai can drive other applets directly), and Layer U primitive invocations once that API is live.

Kasai runs an audit loop that compares the Big model's planned actions against the Small model's executed actions, flagging drift between intent and execution. This is part of the context-awareness contract. The agent must know not only what it intends to do but what it has actually done, and when those diverge it must say so rather than continuing.

Kasai also serves as the natural-language interface to the EveryWear runtime more broadly. The user can ask Kasai to find a track they made last month, schedule a holographic event publication, prepare a release brief, locate a specific image they generated, or compose a multi-step plan across applets. The runtime exposes itself to Kasai through the same shell IPC contract that the applets use. There is no separate privileged interface.

The Kasai inference runs locally on the user's machine via llama-cpp-2 bindings. There is no cloud-side reasoning loop. The local model is the user's model. The user can run their own quantised variant. The user can swap the model entirely. The agent is part of EveryWear, but it is also part of the user.

## Applet Manifests as Capability Advertisement

The shell does not assume what each applet does. The applets declare what they do through manifests.

Every applet ships with an `applet.toml` manifest that advertises its capabilities, its model groups, its VRAM requirements, its frontend port if any, and whether it is a binary-backed applet (with a Rust sidecar process) or a frontend-only applet (no backend process needed). The shell reads the manifest at applet launch time, verifies the applet's capabilities are compatible with the current hardware tier, and routes jobs accordingly.

This contract is what makes the shell hardware-aware without being applet-aware. The shell does not know what 1magen does. The shell knows that 1magen's manifest declares two model groups (Z-Image Q8 for high VRAM, Z-Image Q4 for medium VRAM), that the manifest requires at least 8GB of VRAM for the Q4 path, and that the shell must hand off a specific model file to the applet at launch via an environment variable. The applet does the actual image generation; the shell ensures the applet has what it needs to do so.

When a new applet is added to the ecosystem, no shell code changes. The applet ships with its manifest, registers in the registry, declares its capabilities, and the shell handles its lifecycle through the same mechanism it handles every other applet. This is the structural argument for the platform's third-party extensibility. Adding new applets to EveryWear is bounded engineering, not a platform-rewrite.

The manifest also carries entitlement gates. Each capability can be declared as available at Demo tier, Gener8 tier, Creator tier, or Pro tier, matching the subscription ladder. The shell's tier reconciler reads the user's current tier from the entitlement service, intersects it with the applet's declared gates, and exposes only the entitled capabilities to the applet at launch. The applet does not reason about tier; the applet reasons about which capabilities it has been granted.

This is the same pattern that future Layer U publishers will use. When an applet's output is published to Layer U inventory, the publishing surface declares what it offers (the inventory class), what tier it requires (free, paid, sponsored), and what entitlements the consumer must hold. The shell's tier reconciler intersects these declarations the same way it does for applet capabilities today.

## The Cowork, Agent SDK, and Skills System

Operators (humans and agents alike) work inside the EveryWear ecosystem through a small set of canonical surfaces. Cowork is the desktop application that hosts agent sessions with file system access, MCP tool integrations, and a chat-based natural-language interface. The Agent SDK is the underlying framework that runs the agent. The skills system is the discoverable library of reusable behaviours that the agent can load at session time.

A skill is a self-contained unit of behaviour with three properties. It has a name and a description (so the agent and the operator can find it). It has a trigger contract (so the agent knows when to load it). It has a behaviour specification (so the agent knows what to do once loaded).

Strands ships several skills as part of the context-aware tooling stack:

The `context-protocol` skill enforces the modularisation discipline as described above.

The `mymory-recall` skill performs vault-first retrieval before answering any substantive task, with fallback to filesystem search if the vault returns empty.

The `mymory-remember` skill performs append-first capture into the user's rolling transient note, treating any substantive decision as memory worth keeping.

The `mymory-file-session` skill files end-of-session knowledge into the vault as a structured dated note with frontmatter, entity links, and bidirectional backlinks.

The `mymory-curate` skill performs the daily consolidation pass over the vault, merging rolling captures into properly dated notes and flagging staleness.

The `mymory-brief` skill generates the morning briefing from the curated vault.

The `mymory-graphify` skill builds a knowledge graph over the vault for cross-document relationship queries.

The `ooda-codebase` skill performs OODA-loop codebase audits to detect drift between code and architectural intent.

Each skill is loaded when its trigger condition fires. The operator does not have to remember to invoke skills. The agent recognises when a skill applies and loads it. This is what makes the operator surface usable. The operator gives a task in natural language. The agent matches it against available skills, loads the relevant ones, and executes inside the contract those skills enforce.

The skills system is what makes the agent runtime composable. Adding new behaviours to the agent does not require changing the agent. It requires writing a new skill with a clear trigger contract and a clear behaviour specification. The agent discovers it.

## Why This Is a Moat

Most AI-built products are written without this discipline. They start small enough that no individual file approaches the agent's context limit. They keep going until they hit the wall, at which point the agent maintaining them starts producing increasingly bad edits because it can no longer hold the full picture. The codebase becomes unmaintainable. The team either rewrites or stalls.

Strands is being built from the start with the constraint that AI agents are the primary maintainers. The discipline described in this chapter is the answer to that constraint. Every architectural choice respects the agent's working context window. Every module has a wiki. Every cross-module relationship has a typed pipe. Every memory is in a queryable vault rather than a conversation summary. Every shared surface is hoisted to one place rather than duplicated across applets.

This is a structural advantage that compounds over time. A codebase that respects the discipline scales linearly with feature surface; modules can be added without degrading the agent's ability to work on existing modules. A codebase that ignores the discipline degrades super-linearly; each new module makes the existing modules harder to maintain because they all share the agent's attention budget more thinly.

The discipline is also what makes the Layer U primitive API a credible offer to third-party developers. The same context-protocol contract that governs Strands internal code will govern third-party applets that consume Layer U primitives. Third-party developers will inherit the platform's discipline by writing code that fits the contract. The applets they build will be maintainable by the same agents that maintain the rest of the platform. The platform's quality bar becomes the third-party platform's quality bar without policy enforcement, only architectural enforcement.

This is what makes Strands not just a creator economy product but a maintainable creator economy product. The tools that produce content will keep producing content as the platform grows. The runtime that hosts those tools will keep hosting them. The settlement that pays creators will keep paying them. The maintenance burden of all of the above does not scale faster than the team's ability to direct AI agents at the work. The discipline is the moat.

## Open Work

The disciplines described in this chapter are in active build, not in finished form. Several specific items remain.

The Phase 2 cratification has been planned but not executed. The promotion of the twelve named module units to workspace crates is scheduled to follow Phase 1 file splits, which are themselves scheduled to complete before the next major Strands release.

The Module Contract Template skeletons have been defined but not populated for every module in the codebase. The current wiki (114 kilobytes, 2,734 lines in `WIKI.md`) will be split into per-module pages following the template, with `WIKI.md` reduced to a ~3,000-token index plus the global pipe diagram.

The MyMory vault is mounted as the source of truth for Strands but is not yet always available during Cowork sessions. Mounting it consistently across all relevant sessions is a current operational concern. The vault MCP integration is in active build to make this seamless.

The Kasai ToolExecutor real dispatch is partially implemented. The trait surface exists; several concrete implementations exist; full coverage across all expected tool categories remains to be completed.

The `context-protocol` skill itself is in v1. Refinements to its enforcement model will continue as agents work under it and identify failure modes that need additional guardrails.

The third-party developer story sits behind the Layer U primitive API, which itself sits behind the activation of Layer U Phase D and Phase E per the deliverable sequence in Chapter 7. The discipline scaffolding described here is ready before the third-party platform activates; the third-party platform is not yet ready to consume it.

These open items are not gaps in the architecture. They are work items on the architecture. The contract is correct; the implementation is in progress.

## What This Chapter Does Not Cover

This chapter describes the discipline through which Strands code and runtimes are built and maintained. The applet ecosystem and the EveryWear runtime that this discipline scaffolds are detailed in Chapter 4. The operator console that uses the discipline to author Layer U inventory is detailed in Chapter 6. The Layer U primitive API that third-party developers will consume under this discipline is detailed in Chapter 7. The chain that anchors the discipline's settlement guarantees is detailed in Chapter 9.

