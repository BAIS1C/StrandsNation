'use client';

import { useRef } from 'react';
import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Tag from '@/components/Tag/Tag';
import Callout from '@/components/Callout/Callout';
import styles from './GameSection.module.css';

const conceptArt = [
  { src: '/images/concept/concept-atrium.jpg', label: 'THE ATRIUM' },
  { src: '/images/concept/concept-atrium-2.jpg', label: 'ATRIUM UPPER' },
  { src: '/images/concept/concept-hub.jpg', label: 'SIGOPS HUB' },
  { src: '/images/concept/concept-corridor.jpg', label: 'LOWER CORRIDORS' },
  { src: '/images/concept/concept-shaft.jpg', label: 'VERTICAL SHAFTS' },
  { src: '/images/concept/concept-loadingbay.jpg', label: 'LOADING BAY' },
  { src: '/images/concept/concept-market.jpg', label: 'TRADE DISTRICT' },
  { src: '/images/concept/concept-scav-market.jpg', label: 'SCAV MARKET' },
  { src: '/images/concept/concept-bike.jpg', label: 'TRANSIT LEVEL' },
  { src: '/images/concept/concept-characters.jpg', label: 'BASE-LEVEL MECHANIC' },
  { src: '/images/concept/concept-character-f.jpg', label: 'AUGMENTED WORKER' },
  { src: '/images/concept/concept-blank.jpg', label: 'BLANK CHASSIS' },
  { src: '/images/concept/concept-warrior.jpg', label: 'COMBAT BLANK' },
  { src: '/images/concept/concept-enforcer.jpg', label: 'SOVCORP ENFORCER' },
  { src: '/images/concept/concept-police.jpg', label: 'SOVCORP POLICE' },
  { src: '/images/concept/concept-nomad.jpg', label: 'BADLANDS NOMAD' },
  { src: '/images/concept/concept-male-refugee.jpg', label: 'DARK FLOURLIT LANDS' },
  { src: '/images/concept/concept-droid.jpg', label: 'SECURITY DRONE' },
  { src: '/images/concept/concept-octobot.jpg', label: 'OCTOPUS DRONE' },
];

export default function GameSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <SectionWrapper bordered>
      {/* 1. Section header */}
      <SectionLabel
        num="02 // THE EXPERIENCE"
        title="Strands: The Game"
        subtitle="A post-capitalist MMORPG where the world remembers your choices, NPCs adapt to how you think, and the community builds the civilisation they play in. This isn't a game you consume. It's a civilisation you shape."
      />

      {/* 2. Classified video banner */}
      <div className={styles.classifiedHeader}>
        <span className={styles.classifiedLabel}>// CLASSIFIED — ORBITAL SURVEILLANCE</span>
      </div>
      <div className={styles.videoBanner}>
        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/metaxity1-poster.jpg"
        >
          <source src="/video/metaxity1.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay}>
          <span className={styles.videoCaption}>MetaXity1 — Year 555</span>
        </div>
      </div>

      {/* 3. Two main pitch cards */}
      <div className={styles.gridTwoOne}>
        <Card variant="cyan">
          <div className={styles.cardTitle} data-variant="cyan">
            Your World. Your Rules. Your Playstyle.
          </div>
          <p className={styles.body}>
            Strands is tailored to you. Personality-driven profiling shapes every NPC interaction, every dialogue
            branch, every companion behaviour. Your AI Mait evolves based on your decisions. The narrative
            isn&rsquo;t scripted — it&rsquo;s generated around who you actually are. No two playthroughs can
            be the same, because no two players think the same way.
          </p>
          <div className={styles.tags}>
            <Tag>Persistent Memory</Tag>
            <Tag variant="pink">Generative Narrative</Tag>
            <Tag variant="yellow">AI Companions</Tag>
          </div>
        </Card>

        <Card variant="pink">
          <div className={styles.cardTitle} data-variant="pink">
            Skin the World™
          </div>
          <p className={styles.body}>
            Generate your own skins, characters, environments, and aesthetic layers using AI creation
            tools — then see them live in the shared MMO world. Your vision doesn&rsquo;t stay in your
            inventory. It becomes part of MetaXity1 for everyone.
          </p>
        </Card>
      </div>

      {/* 4. Concept art slider */}
      <div className={styles.conceptSlider}>
        <button className={styles.sliderBtn} data-dir="left" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
        <div className={styles.conceptTrack} ref={trackRef}>
          {conceptArt.map((art) => (
            <div key={art.label} className={styles.conceptCard}>
              <img src={art.src} alt={art.label} className={styles.conceptImg} loading="lazy" />
              <span className={styles.conceptLabel}>{art.label}</span>
            </div>
          ))}
        </div>
        <button className={styles.sliderBtn} data-dir="right" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
      </div>

      {/* 5. Three feature cards */}
      <div className={styles.gridThree}>
        <Card variant="purple">
          <div className={styles.cardTitleSm} data-variant="purple">Dual Economy</div>
          <p className={styles.bodySm}>
            Three primitives — Energy, Process Power, Storage — priced by two competing systems.
            Corporate credits for compliance. Underground tokens for resistance. Your Cover Identity
            forces you into both.
          </p>
        </Card>

        <Card variant="yellow">
          <div className={styles.cardTitleSm} data-variant="yellow">Pyramid Extraction</div>
          <p className={styles.bodySm}>
            Ascend MetaXity1&rsquo;s continental archology. Risk increases with altitude — so do
            rewards. Corporate security sweeps, faction warfare, elevator lockdowns, and dynamic events.
          </p>
        </Card>

        <Card variant="green">
          <div className={styles.cardTitleSm} data-variant="green">Built By Players</div>
          <p className={styles.bodySm}>
            SIGOPS missions are real development tasks disguised as resistance operations. Write
            dialogue. Design assets. Fix code. Earn reputation. The fourth wall isn&rsquo;t broken —
            it&rsquo;s dissolved.
          </p>
        </Card>
      </div>

      {/* 6. Callout */}
      <Callout
        variant="cyan"
        label="EXPLORE THE FULL WORLD"
        text="MetaXity1, the factions, the skill systems, the seasonal narrative arcs — it's all documented in the Codex."
      />
    </SectionWrapper>
  );
}
