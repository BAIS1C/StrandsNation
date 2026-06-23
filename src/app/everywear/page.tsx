'use client';

import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import Callout from '@/components/Callout/Callout';
import Tag from '@/components/Tag/Tag';
import styles from './page.module.css';

const HUB_PRODUCTS = [
  { id: 'S3',          name: <>S<sup>3</sup> STUDIO</>,   copy: 'Local music generation. Unlimited, uncensored, GPU-native. One licence, own it forever: Gener8 4ever $20, Gener8 Pro $49, Creator Studio $100 (first 100 seats). Beta discount, lifetime licence. Upgrade any time by paying only the difference.', variant: 'cyan'   as const, badge: 'COMING SOON' },
  { id: 'STEMSTUDIO',  name: 'STEM STUDIO',               copy: 'Stem-aware audio editing, remixing, and retiming. Pull tracks apart, rebuild them, restem. Pairs natively with S³ Studio outputs and AI Director timelines.',          variant: 'cyan'   as const, badge: 'COMING SOON' },
  { id: 'DIRECTOR',    name: 'AI DIRECTOR',               copy: 'Beat-synced, multi-LLM-orchestrated video production. Stem-aware agentic assembly. Long-form video: upscale, edit, rig, retime. Ships with Creator Studio.',           variant: 'cyan'   as const, badge: 'COMING SOON' },
  { id: 'IMAGEN',      name: '1MAGEN',                    copy: 'Image generation and editing pipeline. Powered by Qwen-Image running locally, character-consistent, prompt-chained, studio-grade.',                                  variant: 'pink'   as const, badge: 'COMING SOON' },
  { id: 'VIDGEN',      name: '3NVIGEN',                   copy: 'Short-form video generation. WAN 2.2 on consumer hardware, fast iteration, broadcast-clean output.',                                                                  variant: 'pink'   as const, badge: 'COMING SOON' },
  { id: 'STYLEFORGE',  name: 'STYLE FORGE',               copy: 'Style training and LoRA fabrication. Forge a house aesthetic once, ship it across every visual model in the stack. Local training on consumer GPUs.',                variant: 'pink'   as const, badge: 'COMING SOON' },
  { id: 'STRANDS',     name: 'STRANDS: THE GAME',         copy: 'The post-capitalist game engine. MetaXity1 as the world, Blanks as the player avatars, Block Gangs as the social fabric, SIGOPS as the agentic economy. A persistent on-chain civilisation that runs on the same sovereign rails as the rest of the stack.',     variant: 'yellow' as const, badge: 'COMING SOON' },
  { id: 'MYMAIT',      name: 'MY MAIT',                   copy: 'Your free AI companion and orchestration chassis. Untiered, personality-on, ships with EveryWear. Approves tools, routes memory, and coordinates Educ8 and creative workflows across the stack.',                                                                                            variant: 'purple' as const, badge: 'FREE AT LAUNCH' },
  { id: 'EDUC8',       name: 'EDUC8',                     copy: 'The free knowledge and education engine. Offline courseware, local document RAG, maps, notes, and a teacher agent that turns your own material into something you can learn from. Online, weak-signal, or fully unplugged.',                                                                 variant: 'purple' as const, badge: 'FREE AT LAUNCH' },
  { id: 'MYMORY',    name: 'MYMORY',                  copy: 'Decentralised Proof of Valuable Memory. Portable, tradeable, sovereign AI memory. The runtime.',                                                                                                                                                                                            variant: 'purple' as const, badge: 'COMING SOON' },
  { id: 'THIRD',       name: 'THIRD-PARTY APPS',          copy: 'Every developer gets the same rails. Agentic plug-ins, federated apps, distributed services.',                                                                                                                                                                                              variant: 'purple' as const, badge: 'OPEN SDK' },
];

const PHASES = [
  {
    n: '01',
    title: 'Studio First',
    body: 'S\u00B3 Strands Sound Studio ships first. Local, unlimited, uncensored music generation on your GPU. The first product, the first proof that the sovereign stack works. Image, video, and director tooling follow on the same rails.',
    variant: 'cyan' as const,
  },
  {
    n: '02',
    title: 'The Bridge',
    body: 'A Telegram Mini App. Not technically EveryWear, but the step that gets a phone-first audience onto the rails before the full shell lands. Frictionless onboarding, integrated payments, a preview of the sovereign memory graph.',
    variant: 'pink' as const,
  },
  {
    n: '03',
    title: 'Agentic OS',
    body: 'EveryWear proper. Platform-agnostic. AI at its core. Built for non-technical users. One shell across desktop, mobile, and XR; one identity, one wallet, one memory graph across every first-party and third-party tool. You do not learn the software; the software learns you.',
    variant: 'purple' as const,
  },
];

export default function EveryWearPage() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--space-nav-h)' }}>
      {/* ─── Hero ─── */}
      <SectionWrapper>
        <div className={styles.hero}>
          <div className={styles.tm}>EVERYWEAR&trade;</div>
          <h1 className={styles.title}>
            The <span className={styles.titleAccent}>HOME</span> Platform<br />
            for AI
          </h1>
          <p className={styles.tagline}>
            Everything. EveryWear&trade;. All at once.
          </p>
          <p className={styles.subtitle}>
            One sovereign shell for every Strands product, every third-party agent, every federated
            service. The Steam of the agentic, federated, distributed future.
          </p>
        </div>
      </SectionWrapper>

      {/* Video block removed 2026-05-06 SGT (Sean's call): the EveryWear
          page does not carry a video. The S³ song embed and the broader
          replacement video have both been pulled. EveryWear pitches itself
          on premise, hub, roadmap, and architecture. No video. */}

      {/* ─── What is EveryWear? ─── */}
      <SectionWrapper bordered>
        <SectionLabel
          num="01 // PREMISE"
          title="Not a Browser. Not an OS. The Hub."
          subtitle="EveryWear is how you interact with the sovereign stack."
        />
        <Card variant="cyan">
          <div className={styles.cardTitleMd} data-variant="cyan">What EveryWear Actually Is</div>
          <p className={styles.body}>
            EveryWear is a sovereign runtime that evolves across five phases, from a lightweight Telegram
            integration to a full agentic operating system spanning desktop, mobile, and XR. It is the
            persistent shell that ties every Strands product, every third-party agent, and every federated
            service into a single coherent surface. One login. One identity. One wallet. One memory graph.
            Every tool.
          </p>
          <div className={styles.tags}>
            <Tag>Persistent</Tag>
            <Tag variant="pink">Cross-Platform</Tag>
            <Tag variant="yellow">Sovereign</Tag>
            <Tag variant="purple">Federated</Tag>
            <Tag variant="red">Agentic</Tag>
          </div>
        </Card>

        <Card variant="purple">
          <div className={styles.cardTitleMd} data-variant="purple">The Steam Analogy</div>
          <p className={styles.body}>
            Steam did not invent games. It built the runtime, the storefront, the social graph, and the
            distribution rail around them, then opened it to every studio. EveryWear does the same for
            agentic software. You install one shell and every model, every studio, every generator, every
            game, every federated service is one click away. Your identity, wallet, and memory graph
            persist across all of them.
          </p>
        </Card>
      </SectionWrapper>

      {/* ─── The Hub: products ─── */}
      <SectionWrapper bordered>
        <SectionLabel
          num="02 // THE HUB"
          title="One Shell. Every Tool."
          subtitle="First-party modules ship with EveryWear. Third parties plug in through an open SDK. All coming soon."
        />
        <div className={styles.hubGrid}>
          {HUB_PRODUCTS.map((p) => (
            <Card key={p.id} variant={p.variant}>
              <div className={styles.productBadge} data-variant={p.variant}>{p.badge}</div>
              <div className={styles.productName} data-variant={p.variant}>{p.name}</div>
              <p className={styles.productCopy}>{p.copy}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* ─── Free capabilities ─── */}
      <SectionWrapper bordered>
        <SectionLabel
          num="02b // FREE"
          title="Everything You Get Free"
          subtitle="The whole platform is free, forever. No subscription, no account lock-in. Paid creative tiers extend the same rails."
        />
        <Card variant="purple">
          <div className={styles.cardTitleMd} data-variant="purple">Free with EveryWear</div>
          <p className={styles.body}>
            The whole platform is free, forever. No subscription, no account lock-in. The paid creative
            tiers (Gener8 4ever, Gener8 Pro generators, Creator Studio orchestrators) are one-off lifetime
            licences that extend the same rails, never a subscription.
          </p>
          <ul style={{ listStyle: 'none', margin: '0.5rem 0 1rem', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.55rem 1.5rem', lineHeight: 1.5 }}>
            <li><strong>EveryWear OS</strong>, the local-AI desktop shell</li>
            <li><strong>My Mait</strong>, your untiered AI companion and tool chassis</li>
            <li><strong>Educ8</strong>, offline tutor, courseware, and document RAG</li>
            <li><strong>EveryWear Vault</strong>, account-scoped sovereign memory</li>
            <li><strong>MyMory</strong>, portable recall across the stack</li>
            <li><strong>Avatar Studio</strong>, free 2D Mait and avatar creation</li>
            <li><strong>1magen</strong>, local text-to-image generation</li>
            <li><strong>Vid Studio (light)</strong>, 540p beat-synced music videos</li>
            <li><strong>Layer U</strong>, OSINT intel, part of the free base</li>
          </ul>
          <div className={styles.tags}>
            <Tag variant="purple">Free Forever</Tag>
            <Tag>No Subscription</Tag>
            <Tag variant="cyan">No Lock-In</Tag>
          </div>
        </Card>
      </SectionWrapper>

      {/* ─── Roadmap (phases) ─── */}
      <SectionWrapper bordered>
        <SectionLabel
          num="03 // ROADMAP"
          title="The Launch Sequence"
          subtitle="Studio first. Bridge second. Agentic OS third. No vapourware."
        />
        <div className={styles.phasesGrid}>
          {PHASES.map((p) => (
            <Mini key={p.n} variant={p.variant} title={`${p.n} ${p.title}`} body={p.body} />
          ))}
        </div>
      </SectionWrapper>

      {/* ─── XR ─── */}
      <SectionWrapper bordered>
        <SectionLabel
          num="04 // SPATIAL"
          title="XR Integration"
          subtitle="The pyramid extends beyond your screen."
        />
        <Card variant="yellow">
          <div className={styles.cardTitleMd} data-variant="yellow">Everywhere, Spatially</div>
          <p className={styles.body}>
            The final phase bridges every EveryWear surface into physical space. Volumetric overlays,
            spatial interaction layers, XR-native interfaces. Your agents do not live in a tab; they
            follow you into the room. The same memory graph powers a text chat, a music studio, a headset
            session, and a street-level AR drop. One identity across every modality.
          </p>
          <div className={styles.tags}>
            <Tag variant="yellow">Volumetric</Tag>
            <Tag>Spatial</Tag>
            <Tag variant="purple">Cross-Device</Tag>
          </div>
        </Card>
      </SectionWrapper>

      {/* ─── Federated framing + Chrome extension teaser ─── */}
      <SectionWrapper bordered>
        <SectionLabel
          num="05 // ARCHITECTURE"
          title="Federated. Distributed. Yours."
          subtitle="No Google dependencies. No cloud lock-in. Local-first. Agent-native."
        />
        <Card variant="pink">
          <div className={styles.cardTitleMd} data-variant="pink">Why Federated Matters</div>
          <p className={styles.body}>
            Every tool inside EveryWear talks to every other tool through an open protocol. A music
            model can query the vault. An image model can call the director. A third-party agent can
            compose the whole chain. You choose where inference runs: local GPU, a friend&rsquo;s node,
            a federated pool, or an API vendor. EveryWear is the routing layer that makes the choice
            invisible.
          </p>
        </Card>

        <Callout
          variant="cyan"
          label="MYMORY CHROME EXTENSION"
          text="The first EveryWear surface is shipping now as a Chrome extension. Install it to start building your persistent memory graph before the full shell lands. Your browsing context, preferences, decisions: indexed, encrypted, sovereign."
        />
      </SectionWrapper>
    </div>
  );
}
