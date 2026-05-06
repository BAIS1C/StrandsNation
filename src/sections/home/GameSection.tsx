'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Tag from '@/components/Tag/Tag';
import Callout from '@/components/Callout/Callout';
import styles from './GameSection.module.css';

interface ConceptImage {
  src: string;
  label: string;
}

interface CardData {
  variant: 'cyan' | 'pink' | 'purple' | 'yellow' | 'green';
  title: string;
  titleSize: 'lg' | 'sm';
  body: string;
  tags?: { label: string; variant?: 'cyan' | 'pink' | 'yellow' }[];
}

const cardContent: CardData[] = [
  {
    variant: 'cyan',
    title: 'Your World. Your Rules. Your Playstyle.',
    titleSize: 'lg',
    body: 'Strands is tailored to you. Constant assessment of your playstyle refines and matches every NPC interaction, every dialogue branch, every Mait, every companion behaviour to you. The narrative is generated around who you are and how you play.',
    tags: [
      { label: 'Persistent Memory' },
      { label: 'Generative Narrative', variant: 'pink' },
      { label: 'Adaptive NPCs', variant: 'yellow' },
    ],
  },
  {
    variant: 'pink',
    title: 'Skin the World\u2122',
    titleSize: 'lg',
    body: 'Create your own skins, environments, music, and aesthetic layers using AI powered generation tools. For you, or for others, if you trade them on the in-game exchange via SIGOPS or from your Desktop OS hub. Your vision doesn\u2019t stay in your inventory. It becomes part of MetaXity1.',
  },
  {
    variant: 'purple',
    title: 'Dual Economy',
    titleSize: 'sm',
    body: 'Three primitives: Energy, Process Power, Storage. Priced by two competing systems. SOVComp for compliance. GridScrip for resistance. Your Cover Identity forces you into both.',
  },
  {
    variant: 'yellow',
    title: 'Pyramid Extraction',
    titleSize: 'sm',
    body: 'Ascend MetaXity1\u2019s continental archology. Risk increases with altitude; so do rewards. Corporate security sweeps, faction warfare, elevator lockdowns, and dynamic events.',
  },
  {
    variant: 'green',
    title: 'Built By Players',
    titleSize: 'sm',
    body: 'SIGOPS missions are real development tasks, diegetically delivered as part of your personalised game narrative. Design assets. Create new armour hybrids. Forge new weapon classes through the Weaver path. Earn reputation. The fourth wall dissolves completely.',
  },
];

export default function GameSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [conceptArt, setConceptArt] = useState<ConceptImage[]>([]);
  const [preview, setPreview] = useState<{ src: string; label: string; x: number; y: number } | null>(null);
  const [lightbox, setLightbox] = useState<ConceptImage | null>(null);
  const [videoTilt, setVideoTilt] = useState({ rx: 0, ry: 0 });
  const [cardLightbox, setCardLightbox] = useState<CardData | null>(null);
  const [thumbTilt, setThumbTilt] = useState<{ key: string; rx: number; ry: number } | null>(null);

  /* ── Video 3D tilt ── */
  const handleVideoMove = useCallback((e: React.MouseEvent) => {
    if (!videoRef.current) return;
    const rect = videoRef.current.getBoundingClientRect();
    setVideoTilt({
      rx: -((e.clientY - rect.top) / rect.height - 0.5) * 6,
      ry: ((e.clientX - rect.left) / rect.width - 0.5) * 6,
    });
  }, []);
  const handleVideoLeave = useCallback(() => setVideoTilt({ rx: 0, ry: 0 }), []);

  /* ── Concept thumbnail 3D tilt ── */
  const handleThumbMove = useCallback((key: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setThumbTilt({
      key,
      rx: -((e.clientY - rect.top) / rect.height - 0.5) * 10,
      ry: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
    });
  }, []);
  const handleThumbLeave = useCallback(() => setThumbTilt(null), []);

  /* ── Fetch images from API (auto-populates from /public/images/concept/) ── */
  useEffect(() => {
    fetch('/api/concept-art')
      .then((r) => r.json())
      .then((imgs: ConceptImage[]) => {
        if (Array.isArray(imgs) && imgs.length > 0) setConceptArt(imgs);
      })
      .catch(() => {
        /* Silently fall back — gallery just stays empty */
      });
  }, []);

  /* ── Keyboard: Escape closes lightbox, arrows navigate ── */
  const navigateLightbox = useCallback(
    (dir: 1 | -1) => {
      if (!lightbox || conceptArt.length === 0) return;
      const idx = conceptArt.findIndex((a) => a.src === lightbox.src);
      const next = (idx + dir + conceptArt.length) % conceptArt.length;
      setLightbox(conceptArt[next]);
    },
    [lightbox, conceptArt],
  );

  useEffect(() => {
    if (!lightbox && !cardLightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightbox(null); setCardLightbox(null); }
      if (lightbox && e.key === 'ArrowRight') navigateLightbox(1);
      if (lightbox && e.key === 'ArrowLeft') navigateLightbox(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, cardLightbox, navigateLightbox]);

  /* ── Scroll track ── */
  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  /* ── Hover preview ── */
  const handleMouseEnter = (art: ConceptImage, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPreview({ src: art.src, label: art.label, x: rect.left + rect.width / 2, y: rect.top });
  };
  const handleMouseLeave = () => setPreview(null);

  return (
    <>
    <SectionWrapper bordered>
      {/* 1. Section header */}
      <SectionLabel
        num="03 // THE EXPERIENCE"
        title="Strands: The Game"
        subtitle="The game is the onboarding ritual of the Nation. It teaches sovereign-economy primitives through play, with no chain visible in the player experience. A post-capitalist MMORPG where the world remembers your choices, NPCs adapt to how you think, and the community builds the civilisation they play in."
      />

      {/* 2. Classified video banner */}
      <div className={styles.classifiedHeader}>
        <span className={styles.classifiedLabel}>// CLASSIFIED: ORBITAL SURVEILLANCE</span>
      </div>
      <div
        ref={videoRef}
        className={styles.videoBanner}
        style={{
          transform: `perspective(900px) rotateX(${videoTilt.rx}deg) rotateY(${videoTilt.ry}deg)`,
        }}
        onMouseMove={handleVideoMove}
        onMouseLeave={handleVideoLeave}
      >
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
          <span className={styles.videoCaption}>MetaXity1: Year 555</span>
        </div>
      </div>

      {/* In-section transition headline */}
      <div className={styles.transitionWrap}>
        <h3 className={styles.transitionHeadline}>READY PLAYER YOU</h3>
        <p className={styles.transitionSub}>
          A world that does not just get played by you. It gets built by you.
        </p>
      </div>

      {/* 3. Two main pitch cards */}
      <div className={styles.gridTwoOne}>
        {cardContent.slice(0, 2).map((card, i) => (
          <div key={i} className={styles.cardClickable} onClick={() => setCardLightbox(card)}>
            <Card variant={card.variant}>
              <div className={card.titleSize === 'lg' ? styles.cardTitle : styles.cardTitleSm} data-variant={card.variant}>
                {card.title}
              </div>
              <p className={card.titleSize === 'lg' ? styles.body : styles.bodySm}>{card.body}</p>
              {card.tags && (
                <div className={styles.tags}>
                  {card.tags.map((t) => (
                    <Tag key={t.label} variant={t.variant}>{t.label}</Tag>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>

      {/* 4. Concept art slider — auto-populated from /public/images/concept/ */}
      {conceptArt.length > 0 && (
        <div className={styles.conceptSlider}>
          <button className={styles.sliderBtn} data-dir="left" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
          <div className={styles.conceptTrack} ref={trackRef}>
            {conceptArt.map((art) => {
              const isTilted = thumbTilt?.key === art.src;
              return (
                <div
                  key={art.src}
                  className={styles.conceptCard}
                  style={{
                    transform: isTilted
                      ? `perspective(600px) rotateX(${thumbTilt!.rx}deg) rotateY(${thumbTilt!.ry}deg) scale(1.03)`
                      : 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
                  }}
                  onClick={() => { setPreview(null); setLightbox(art); }}
                  onMouseEnter={(e) => handleMouseEnter(art, e)}
                  onMouseMove={(e) => handleThumbMove(art.src, e)}
                  onMouseLeave={() => { handleMouseLeave(); handleThumbLeave(); }}
                >
                  <img src={art.src} alt={art.label} className={styles.conceptImg} loading="lazy" />
                  <span className={styles.conceptLabel}>{art.label}</span>
                </div>
              );
            })}
          </div>
          <button className={styles.sliderBtn} data-dir="right" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
        </div>
      )}

      {/* Hover preview (desktop only) */}
      {preview && !lightbox && (
        <div
          className={styles.previewFloat}
          style={{ left: preview.x, top: preview.y }}
        >
          <img src={preview.src} alt={preview.label} className={styles.previewImg} />
          <span className={styles.previewLabel}>{preview.label}</span>
        </div>
      )}

      {/* 5. Three feature cards */}
      <div className={styles.gridThree}>
        {cardContent.slice(2, 5).map((card, i) => (
          <div key={i} className={styles.cardClickable} onClick={() => setCardLightbox(card)}>
            <Card variant={card.variant}>
              <div className={styles.cardTitleSm} data-variant={card.variant}>{card.title}</div>
              <p className={styles.bodySm}>{card.body}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* 6. Play CTA + Codex callout */}
      <Callout
        variant="pink"
        label="ENTER THE WORLD"
        text="The game client is in build. Create your signal, choose your paths, and shape the civilisation. Join the waitlist via Telegram."
        href="https://t.me/+WZTkHqJjUOI3YjQ1"
      />
      <Callout
        variant="cyan"
        label="EXPLORE THE FULL WORLD"
        text="MetaXity1, the factions, the skill systems, the seasonal narrative arcs: all documented in the Codex."
        href="/codex"
      />
    </SectionWrapper>

    {/* ── Image lightbox — portalled to document.body ── */}
    {lightbox && typeof document !== 'undefined' && createPortal(
      <div className={styles.lightboxOverlay} onClick={() => setLightbox(null)}>
        <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
          <img
            src={lightbox.src}
            alt={lightbox.label}
            className={styles.lightboxImg}
          />
          <div className={styles.lightboxCaption}>{lightbox.label}</div>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close">×</button>
          <button
            className={styles.lightboxNav}
            data-dir="left"
            onClick={() => navigateLightbox(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={styles.lightboxNav}
            data-dir="right"
            onClick={() => navigateLightbox(1)}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>,
      document.body,
    )}

    {/* ── Card pop-out lightbox — portalled to document.body ── */}
    {cardLightbox && typeof document !== 'undefined' && createPortal(
      <div className={styles.lightboxOverlay} onClick={() => setCardLightbox(null)}>
        <div className={styles.cardLightboxContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.cardLightboxInner} data-variant={cardLightbox.variant}>
            <div className={styles.cardLbTitle} data-variant={cardLightbox.variant}>
              {cardLightbox.title}
            </div>
            <p className={styles.cardLbBody}>{cardLightbox.body}</p>
            {cardLightbox.tags && (
              <div className={styles.tags}>
                {cardLightbox.tags.map((t) => (
                  <Tag key={t.label} variant={t.variant}>{t.label}</Tag>
                ))}
              </div>
            )}
          </div>
          <button className={styles.lightboxClose} onClick={() => setCardLightbox(null)} aria-label="Close">×</button>
        </div>
      </div>,
      document.body,
    )}
    </>
  );
}
