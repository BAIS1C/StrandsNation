'use client';

import { useEffect, useState } from 'react';
import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import Callout from '@/components/Callout/Callout';
import Tag from '@/components/Tag/Tag';
import styles from './page.module.css';

// 280 days from 2026-04-18 SGT = 2027-01-23 SGT
const TARGET = new Date('2027-01-23T00:00:00+08:00').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

const HUB_PRODUCTS = [
  { id: 'S3',       name: <>S<sup>3</sup> STUDIO</>,   copy: 'Local music generation. Unlimited, uncensored, GPU-native. Stem extraction, covers, remixes.',       variant: 'cyan'   as const, badge: 'LAUNCHING' },
  { id: 'GENER8',   name: 'GENER8',                     copy: 'Style-patch music generation. Train your own LoRA. Own your tracks outright, no platform tax.',     variant: 'cyan'   as const, badge: 'LAUNCHING' },
  { id: 'DIRECTOR', name: 'AI DIRECTOR',                copy: 'Beat-synced, multi-LLM orchestrated music video production. Stem-aware, agentic assembly.',        variant: 'cyan'   as const, badge: 'LAUNCHING' },
  { id: 'VIDPRO',   name: 'VID PRO',                    copy: 'Long-form video. Upscale, edit, rig, and retime — all local, all yours.',                          variant: 'pink'   as const, badge: 'Q2 2027' },
  { id: 'IMAGEN',   name: 'IMAGEN',                     copy: 'Image generation + editing pipeline. Character-consistent, prompt-chained, studio-grade.',         variant: 'pink'   as const, badge: 'Q2 2027' },
  { id: 'VIDGEN',   name: 'VIDGEN',                     copy: 'Short-form video generation. LTX-class throughput on consumer hardware.',                         variant: 'pink'   as const, badge: 'Q2 2027' },
  { id: 'STRANDS',  name: 'STRANDS: THE GAME',          copy: 'The post-capitalist game engine. MetaXity1, Blanks, Block Gangs, SIGOPS, Layer U. All of it.',    variant: 'yellow' as const, badge: 'Q3 2026' },
  { id: 'MYMORIES', name: 'MYMORIES',                   copy: 'Decentralised Proof of Valuable Memory. Portable, tradeable, sovereign AI memory. The runtime.',   variant: 'purple' as const, badge: 'BUILDING' },
  { id: 'THIRD',    name: 'THIRD-PARTY APPS',           copy: 'Every developer gets the same rails. Agentic plug-ins, federated apps, distributed services.',     variant: 'purple' as const, badge: 'OPEN SDK' },
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
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--space-nav-h)' }}>
      {/* ─── Hero ─── */}
      <SectionWrapper>
        <div className={styles.hero}>
          <div className={styles.tm}>EVERYWEAR&trade;</div>
          <h1 className={styles.title}>
            The Browser-Native<br />
            <span className={styles.titleAccent}>Agentic OS</span>
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
          subtitle="First-party modules ship with EveryWear. Third parties plug in through an open SDK."
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

      {/* ─── Countdown ─── */}
      <SectionWrapper bordered>
        <SectionLabel
          num="03 // TIMELINE"
          title="Launch Window"
          subtitle="Estimated time to EveryWear v1.0 release."
        />
        <div className={styles.countdownWrap}>
          <div className={styles.countdownFrame}>
            <div className={styles.countdownHeader}>ESTIMATED TIME TO LAUNCH</div>
            <div className={styles.countdownInner}>
              {[
                { label: 'DAYS',    val: time.days,    pad: 3 },
                { label: 'HOURS',   val: time.hours,   pad: 2 },
                { label: 'MINUTES', val: time.minutes, pad: 2 },
                { label: 'SECONDS', val: time.seconds, pad: 2 },
              ].map((u, i) => (
                <span key={u.label} style={{ display: 'contents' }}>
                  {i > 0 && <span className={styles.countdownSep}>:</span>}
                  <div className={styles.countdownUnit}>
                    <span className={styles.countdownLabel}>{u.label}</span>
                    <div className={styles.digitPanel}>
                      <span className={styles.digitGhost}>{'8'.repeat(u.pad)}</span>
                      <span className={styles.countdownDigit}>
                        {u.pad === 3 ? String(u.val).padStart(3, '0') : pad(u.val)}
                      </span>
                    </div>
                  </div>
                </span>
              ))}
            </div>
          </div>
          <p className={styles.countdownCaption}>280-day target. Q1 2027. Public beta opens first.</p>
        </div>
      </SectionWrapper>

      {/* ─── Five phases ─── */}
      <SectionWrapper bordered>
        <SectionLabel
          num="04 // ROADMAP"
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
          num="05 // SPATIAL"
          title="XR Integration"
          subtitle="The pyramid extends beyond your screen."
        />
        <Card variant="yellow">
          <div className={styles.cardTitleMd} data-variant="yellow">Everywhere, Spatially</div>
          <p className={styles.body}>
            Phase 5 bridges every EveryWear surface into physical space. Volumetric overlays, spatial
            interaction layers, XR-native interfaces. Your agents do not live in a tab; they follow you
            into the room. The same memory graph powers a text chat, a music studio, a headset session,
            and a street-level AR drop. One identity across every modality.
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
          num="06 // ARCHITECTURE"
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
          label="MYMORIES CHROME EXTENSION"
          text="The first EveryWear surface is shipping now as a Chrome extension. Install it to start building your persistent memory graph before Phase 2 goes live. Your browsing context, preferences, decisions: indexed, encrypted, sovereign."
        />
      </SectionWrapper>
    </div>
  );
}
