'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './page.module.css';

/* ── Accordion ── */
function Accordion({ title, children, defaultOpen = false }: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>(defaultOpen ? 'auto' : '0px');

  useEffect(() => {
    if (!bodyRef.current) return;
    setHeight(open ? `${bodyRef.current.scrollHeight}px` : '0px');
  }, [open]);

  return (
    <div className={styles.accordion}>
      <button
        className={`${styles.accordionHead} ${open ? styles.accordionOpen : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={styles.accordionChevron}>{open ? '\u25B2' : '\u25BC'}</span>
      </button>
      <div
        className={styles.accordionBody}
        style={{ maxHeight: height }}
        ref={bodyRef}
      >
        <div className={styles.accordionInner}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Pricing tiers (2026-06-21 rewrite: all one-off LIFETIME LICENCES)
   All generation runs on the user's GPU. No per-track tax, no token meters.
   EveryWear platform is free. No subscriptions anywhere: every paid tier is
   a one-off lifetime licence. Gener8 4ever $20, Gener8 Pro $49, Creator
   Studio $100 (first 100 seats). Beta discount = lifetime licence; lock the
   price for life. Upgrade any time by paying only the difference, never
   re-buying what you already own. Steam-aligned, ownership-first psychology. */
const TIERS = [
  {
    id: 'GENER8 4EVER',
    name: <>S<sup>3</sup> GENER8 4EVER</>,
    tagline: 'Own local AI music generation. Forever.',
    price: '$20',
    priceUnit: 'one-time',
    flagship: false,
    features: [
      'Unlimited generation on your GPU — permanently',
      'Text-to-music, cover, reference audio',
      'Full commercial rights on originals',
      'Vid Studio — 540p music videos, beat-sync',
      'FLAC lossless output',
      'VRAM-aware model selection',
      'Yours forever. One licence, no recurring fees.',
    ],
  },
  {
    id: 'GENER8 PRO',
    name: <>S<sup>3</sup> GENER8 PRO</>,
    tagline: 'Full-quality exports + premium features. Evolves with updates.',
    price: '$49',
    priceUnit: 'one-time',
    flagship: false,
    features: [
      'Everything in Gener8 4ever (included)',
      'Watermark removal on all exports',
      'Full-quality cover & reference (XL Base)',
      'Vid Studio Pro — HD 1080p, social presets, one-click share',
      '1magen access + premium style packs',
      '4K upscale · per-platform aspect ratios',
      'Future cloud boost credits',
    ],
  },
  {
    id: 'CREATOR STUDIO',
    name: <>S<sup>3</sup> CREATOR STUDIO</>,
    tagline: 'Full AI creative workstation. Music, video, story.',
    price: '$100',
    priceUnit: 'one-time',
    flagship: true,
    badge: 'FOUNDING · LOCKED',
    foundingNote: 'First 100 seats lock in $100 for life. One licence, yours forever.',
    features: [
      'Everything in Gener8 Pro (included)',
      <>S<sup>3</sup> AI Director — orchestrated video production</>,
      '3nvizen — cinematic visual workflows',
      'Full DAW + Stem Separation (12-stem)',
      'StyleForge: train your own LoRA patches',
      'Style Patch marketplace access',
      'Advanced orchestration + cloud escalation',
    ],
  },
];

/* Desktop: 3-card grid. Creator Studio (flagship) gets the founding-lock
   badge and a hotter cyan frame via .tierCardFlagship. */
function PricingGrid() {
  return (
    <div className={styles.tierGrid}>
      {TIERS.map((t, i) => (
        <div
          key={i}
          className={`${styles.tierCard} ${t.flagship ? styles.tierCardFlagship : ''}`}
        >
          {t.flagship && t.badge && (
            <div className={styles.foundingBadge}>{t.badge}</div>
          )}
          <div className={styles.tierLabel}>{t.id}</div>
          <div className={styles.tierName}>{t.name}</div>
          <div className={styles.tierTagline}>{t.tagline}</div>
          <div className={styles.tierPrice}>
            {t.price}<span className={styles.priceUnit}>{t.priceUnit}</span>
          </div>
          <div className={styles.tierSub}>
            {t.priceUnit === 'one-time' ? 'Buy once. Own forever.' : 'Lifetime licence. Includes all lower tiers.'}
          </div>
          <ul className={styles.tierFeatures}>
            {t.features.map((f, j) => (
              <li key={j} className={styles.tierFeature}>
                <span className={styles.check}>&#10003;</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          {t.flagship && t.foundingNote && (
            <p className={styles.foundingNote}>{t.foundingNote}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* Mobile: swipeable carousel of the three tier cards. Creator Studio slide
   gets the flagship treatment (hotter cyan frame + founding-lock badge). */
function PricingCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);
  const dragging = useRef(false);

  const N = TIERS.length;

  function goTo(i: number) { setIdx(((i % N) + N) % N); }

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx(prev => (prev + 1) % N), 6000);
    return () => clearInterval(id);
  }, [paused, N]);

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    dragging.current = true;
    setPaused(true);
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) goTo(idx + (dx < 0 ? 1 : -1));
    setTimeout(() => setPaused(false), 8000);
  }

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={styles.carouselTrack}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {TIERS.map((t, i) => (
          <div
            key={i}
            className={`${styles.carouselSlide} ${t.flagship ? styles.carouselSlidePro : ''}`}
          >
            {t.flagship && t.badge && (
              <div className={styles.foundingBadge}>{t.badge}</div>
            )}
            <div className={styles.tierLabel}>{t.id}</div>
            <div className={styles.tierName}>{t.name}</div>
            <div className={styles.tierTagline}>{t.tagline}</div>
            <div className={styles.tierPrice}>
              {t.price}<span className={styles.priceUnit}>{t.priceUnit}</span>
            </div>
            <div className={styles.tierSub}>
              {t.priceUnit === 'one-time' ? 'Buy once. Own forever.' : 'Lifetime licence. Includes all lower tiers.'}
            </div>
            <ul className={styles.tierFeatures}>
              {t.features.map((f, j) => (
                <li key={j} className={styles.tierFeature}>
                  <span className={styles.check}>&#10003;</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {t.flagship && t.foundingNote && (
              <p className={styles.foundingNote}>{t.foundingNote}</p>
            )}
          </div>
        ))}
      </div>
      <div className={styles.carouselDots}>
        {TIERS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to tier ${i + 1}`}
          />
        ))}
      </div>
      <div className={styles.carouselNav}>
        <button onClick={() => goTo(idx - 1)} className={styles.carouselBtn} aria-label="Previous">&larr;</button>
        <span className={styles.carouselCount}>{idx + 1} / {N}</span>
        <button onClick={() => goTo(idx + 1)} className={styles.carouselBtn} aria-label="Next">&rarr;</button>
      </div>
    </div>
  );
}

/* ── GPU × Tier matrix ──
   Lifted from strandsnation-s3-pricing-preview.html (the design-source-of-truth
   preview) so the marketing site answers "will it run on my rig" without
   shipping the user off to read another page. Inline-styled to avoid bloating
   page.module.css; CSS vars used so theming stays consistent. */
const VRAM_ROWS: Array<[string, string, string, string]> = [
  ['< 6 GB',     'CPU fallback', 'Blocked', 'Blocked'],
  ['6 – 8 GB',   '✓',            'Limited', 'Blocked'],
  ['8 – 12 GB',  '✓',            '✓',       'Limited'],
  ['12 – 16 GB', '✓',            '✓',       '✓'],
  ['16 GB +',    'Optimal',      'Optimal', 'Optimal'],
];

const GPU_ROWS: Array<[string, string, string]> = [
  ['RTX 3060 / 4060',         '8 GB',           'Gener8 · Gener8 Pro'],
  ['RTX 3060 12GB / 4070',    '12 GB',          'All tiers'],
  ['RTX 4070 Ti / 4080',      '16 GB',          'All tiers (optimal)'],
  ['RTX 3090 / 4090 / 5090',  '24 – 32 GB',     'All tiers · hi-fi models'],
  ['Apple M-series (MLX)',    'unified memory', 'Gener8 · Gener8 Pro *'],
];

function cellTone(v: string): React.CSSProperties {
  const ok = v === '✓' || v === 'Optimal';
  const warn = v === 'Limited' || v === 'CPU fallback';
  const no = v === 'Blocked';
  if (ok)   return { color: 'var(--ew-primary)', fontWeight: 700 };
  if (warn) return { color: '#e0a93a', fontWeight: 600 };
  if (no)   return { color: 'var(--ew-text-muted, #888)', opacity: 0.65 };
  return {};
}

function GpuMatrix() {
  const headerStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'var(--ew-text-muted, #999)',
    margin: '24px 0 12px',
  };
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    fontSize: 12,
    color: 'var(--ew-text, #ddd)',
  };
  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '10px 12px',
    borderBottom: '1px solid color-mix(in oklab, var(--ew-primary) 35%, transparent)',
    color: 'var(--ew-primary)',
    fontWeight: 700,
    letterSpacing: 1,
  };
  const tdStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid color-mix(in oklab, var(--ew-primary) 12%, transparent)',
  };
  const calloutStyle: React.CSSProperties = {
    margin: '20px 0',
    padding: '14px 16px',
    border: '1px solid color-mix(in oklab, var(--ew-primary) 30%, transparent)',
    background: 'color-mix(in oklab, var(--ew-primary) 6%, transparent)',
    fontFamily: 'var(--font-body, Rajdhani, monospace)',
    fontSize: 14,
    lineHeight: 1.6,
    color: 'var(--ew-text, #ddd)',
  };

  return (
    <div style={{ margin: '40px 0 16px' }}>
      <h2 style={{
        fontFamily: 'var(--font-display, Orbitron, monospace)',
        fontSize: 'clamp(18px, 3vw, 24px)',
        color: 'var(--ew-primary)',
        letterSpacing: 2,
        textTransform: 'uppercase',
        margin: '0 0 12px',
      }}>
        Runs on your GPU
      </h2>
      <p style={{
        fontFamily: 'var(--font-body, Rajdhani, monospace)',
        fontSize: 14,
        lineHeight: 1.7,
        color: 'var(--ew-text-muted, #b4b4b4)',
        margin: 0,
      }}>
        Every S<sup>3</sup> tier runs generation locally. No cloud rendering, no metered credits, no rate limits.
        When you install, we detect your GPU and automatically select the best quant your VRAM can handle.
      </p>

      <div style={calloutStyle}>
        <strong style={{ color: 'var(--ew-primary)', letterSpacing: 1 }}>Don&apos;t sweat the table.</strong>{' '}
        When the next beta phase opens, the installer will profile your GPU in 30 seconds
        and keep the right models loaded as you work. <strong>Join the waitlist</strong> to be first in line.
      </div>

      <h4 style={headerStyle}>Tier × VRAM compatibility</h4>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Your VRAM</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Gener8</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Gener8 Pro</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Creator Studio</th>
            </tr>
          </thead>
          <tbody>
            {VRAM_ROWS.map(([vram, g, p, cs]) => (
              <tr key={vram}>
                <td style={tdStyle}>{vram}</td>
                <td style={{ ...tdStyle, textAlign: 'center', ...cellTone(g) }}>{g}</td>
                <td style={{ ...tdStyle, textAlign: 'center', ...cellTone(p) }}>{p}</td>
                <td style={{ ...tdStyle, textAlign: 'center', ...cellTone(cs) }}>{cs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 style={headerStyle}>Example GPUs</h4>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>GPU</th>
              <th style={thStyle}>VRAM</th>
              <th style={thStyle}>Tiers available</th>
            </tr>
          </thead>
          <tbody>
            {GPU_ROWS.map(([gpu, vram, tiers]) => (
              <tr key={gpu}>
                <td style={tdStyle}>{gpu}</td>
                <td style={tdStyle}>{vram}</td>
                <td style={tdStyle}>{tiers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{
        marginTop: 10,
        fontFamily: 'var(--font-mono, ui-monospace, monospace)',
        fontSize: 11,
        color: 'var(--ew-text-muted, #888)',
        lineHeight: 1.6,
      }}>
        * Apple Silicon support via Metal backend. Creator Studio video generation on M-series requires 32 GB+ unified memory.
      </p>
    </div>
  );
}

/* ── Benefits data ── */
const BENEFITS = [
  { icon: '\u221E', title: 'Unlimited Generations', copy: 'No token meters. No credits. No per-song tax. Generate as much music as your hardware can handle. Every tier. No exceptions.' },
  { icon: '\uD83D\uDD13', title: 'Complete Creative Freedom', copy: 'Use any lyrics. Any inspiration. Any style. No content filters, no handcuffs, no corporate censorship deciding what you can create.' },
  { icon: '\uD83D\uDCBB', title: 'Runs On Your Machine', copy: 'One thin installer. Profiles your GPU. Downloads the right weights. Builds a self-contained studio. No terminal. No Python. No Git. One click.' },
  { icon: '\u00A9', title: 'You Own Everything', copy: 'Every track you generate is commercially yours. Full rights. No platform claims. No revenue splits. Your catalogue, your business.' },
];

/* ── Thesis paragraphs ── */
const THESIS = [
  <>Every cloud music AI charges per generation. 200 credits here, 500 tokens there, surprise paywalls when you hit the good stuff. S<sup>3</sup> flips that model on its head. Your GPU does the work. We provide the models, the tools, and the updates. You generate as much as you want, whenever you want.</>,
  'Modern gaming PCs have more than enough compute to run a Suno-grade model. Our installer profiles your rig, downloads only the weights it can handle, and builds a local inference engine. You run your own node. We stay out of the way.',
  "Want to iterate on a track 50 times? Go ahead. Want to generate an entire album in a weekend? Nothing stopping you. Want to use actual lyrics, real artist references, and creative inspirations without a filter deciding what you're allowed to make? That's the point.",
];

export default function S3ComingSoon() {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.screen}>
      <div className={styles.scanlines} />
      <div className={styles.vignette} />

      <div className={styles.terminal}>
        <p className={styles.systemLine}>
          <span className={styles.prompt}>&gt;</span> S3_STUDIO.exe
        </p>

        <h1 className={styles.title}>S&sup3;</h1>

        <p className={styles.subtitle}>Strands Sound Studio</p>

        <div className={styles.heroBetaPill}>
          BETA PHASE 1 COMPLETE · NEXT PHASE COMING SOON
        </div>

        <p className={styles.tagline}>
          Your GPU. Your files. Your music.
        </p>

        {/* ── HERO VIDEO ──
            Swapped 2026-05-06 SGT: was Rock The Boat (QqzB7DN_AAw),
            now 753ltLz5VLY per Sean. Front-page EcosystemSection S³
            card retains the original Rock The Boat embed; this page
            uses the newer signal. */}
        <div className={styles.videoHero}>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/753ltLz5VLY?rel=0&modestbranding=1"
              title="S³ Strands Sound Studio"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className={styles.videoCaption}>
            Made with S<sup>3</sup>. Locally. Unlimited. Uncensored.
          </p>
        </div>

        {/* ── BENEFITS ── */}
        {isMobile ? (
          <div className={styles.mobileSection}>
            <Accordion title="Why S³?" defaultOpen>
              <div className={styles.benefitListMobile}>
                {BENEFITS.map((b, i) => (
                  <div key={i} className={styles.benefitItemMobile}>
                    <span className={styles.benefitIconMobile}>{b.icon}</span>
                    <div>
                      <strong className={styles.benefitTitleMobile}>{b.title}</strong>
                      <p className={styles.benefitCopyMobile}>{b.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          </div>
        ) : (
          <div className={styles.benefitGrid}>
            {BENEFITS.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitCopy}>{b.copy}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── EXPLAINER ── */}
        {isMobile ? (
          <div className={styles.mobileSection}>
            <Accordion title="Just say NO to token limits">
              {THESIS.map((p, i) => (
                <p key={i} className={styles.thesisPara}>{p}</p>
              ))}
              <p className={`${styles.thesisPara} ${styles.thesisHighlight}`}>
                Own it forever for $20. Or step up to the full creative workstation, one licence, yours for life. Every generation runs on your hardware. Your files, your rights, your catalogue.
              </p>
            </Accordion>
          </div>
        ) : (
          <div className={styles.thesisBlock}>
            <h2 className={styles.sectionHeading}>Just say NO to token limits</h2>
            {THESIS.map((p, i) => (
              <p key={i} className={styles.thesisPara}>{p}</p>
            ))}
            <p className={`${styles.thesisPara} ${styles.thesisHighlight}`}>
              Own it forever for $20. Or step up to the full creative workstation, one licence, yours for life. Every generation runs on your hardware. Your files, your rights, your catalogue.
            </p>
          </div>
        )}

        {/* Launch Status (replaces countdown) */}
        <div className={styles.countdownFrame}>
          <div className={styles.countdownHeader}>LAUNCH STATUS</div>
          <div
            className={styles.countdownInner}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '22px 16px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display, inherit)',
                fontWeight: 700,
                fontSize: 'clamp(24px, 4vw, 36px)',
                letterSpacing: 4,
                color: 'var(--c-accent, #00c2ff)',
                textShadow:
                  '0 0 6px rgba(0,194,255,0.65), 0 0 14px rgba(0,194,255,0.35)',
              }}
            >
              NEXT PHASE SOON
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 11,
                letterSpacing: 2.5,
                color: 'var(--c-sub, #8a8d92)',
                opacity: 0.85,
              }}
            >
              PHASE 1 COMPLETE &middot; ACTING ON FEEDBACK
            </span>
          </div>
          <div className={`${styles.screw} ${styles.screwTL}`} />
          <div className={`${styles.screw} ${styles.screwTR}`} />
          <div className={`${styles.screw} ${styles.screwBL}`} />
          <div className={`${styles.screw} ${styles.screwBR}`} />
        </div>

        {/* Status block */}
        <div className={styles.statusBlock}>
          {[
            ['STATUS', 'PHASE 1 COMPLETE · NEXT PHASE SOON'],
            ['INFERENCE', 'LOCAL GPU · NO CLOUD'],
            ['PLATFORM', 'EVERYWEAR · FREE FOREVER'],
            ['TIERS', 'GENER8 4EVER / PRO / CREATOR STUDIO'],
            ['PRICING', '$20 / $49 / $100 ONE-OFF LIFETIME LICENCE'],
            ['GENERATIONS', 'UNLIMITED · ALL TIERS · YOUR HARDWARE'],
          ].map(([label, val]) => (
            <p key={label} className={styles.statusLine}>
              <span className={styles.label}>{label}</span>
              <span className={styles.statusDot}> .............. </span>
              <span className={styles.val}>{val}</span>
            </p>
          ))}
        </div>

        {/* ── PRICING ── desktop: 3-card grid + all-in-one banner. mobile: carousel ── */}
        <div className={styles.pricingSection}>
          <h2 className={styles.sectionHeading}>One licence. Own it forever.</h2>
          <p className={styles.pricingSub}>
            Buy Gener8 4ever for $20 and own local AI music forever. Step up to Pro or Creator Studio, one-off lifetime licences, never a subscription. Upgrade any time by paying only the difference. No surprises.
          </p>
          {isMobile ? <PricingCarousel /> : <PricingGrid />}
        </div>

        {/* ── GPU × TIER MATRIX ── */}
        <GpuMatrix />

        <p className={styles.promoLine}>
          Beta Phase 1 complete. We're acting on your feedback. Join the waitlist for the next beta phase. First 100 Creator Studio seats lock in $100 for life, one licence, yours forever.
        </p>

        <p className={styles.cursor}>
          <span className={styles.prompt}>&gt;</span>{' '}
          <span style={{ opacity: visible ? 1 : 0 }}>&block;</span>
        </p>
      </div>
    </div>
  );
}
