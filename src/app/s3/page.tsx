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

/* ── Pricing tiers (2026-04-19 rewrite: 3 tiers, Creator Studio is the flagship)
   All generation runs on the user's GPU. No per-track tax, no token meters.
   Creator Studio is the founding-lock flagship tier — includes AI Director,
   StyleForge LoRA training, Apply Style Patches, and DAW (free update
   2-3 weeks post-launch). Pro keeps HD video + distribution polish but
   does NOT ship with any style-patch functionality. */
const TIERS = [
  {
    id: 'GENER8 BASE',
    name: <>S<sup>3</sup> GENER8</>,
    tagline: 'Generate, cover, remix — on your machine',
    price: '$5',
    flagship: false,
    features: [
      'Unlimited generation on your GPU',
      'Text-to-music, cover, reference audio',
      'Full commercial rights on originals',
      'Base video visualisers (540p)',
      'FLAC lossless output',
      'Automatic VRAM-aware model selection',
    ],
  },
  {
    id: 'GENER8 PRO',
    name: <>S<sup>3</sup> GENER8 PRO</>,
    tagline: 'Full-quality base model + HD video + distribution polish',
    price: '$12.99',
    flagship: false,
    features: [
      'Everything in Gener8',
      'Full-quality cover & reference (XL Base, VRAM-gated)',
      '1080p HD video rendering',
      '1-click share: IG, TikTok, FB, Shorts',
      'Correct aspect ratios per platform',
      'Custom pixel ratios · 4K upscale',
      'Watermark removal',
    ],
  },
  {
    id: 'CREATOR STUDIO',
    name: <>S<sup>3</sup> CREATOR STUDIO</>,
    tagline: 'Full production pipeline — music, video, story',
    price: '$30',
    flagship: true,
    badge: 'FOUNDING · LOCKED',
    foundingNote: 'Founding subscribers keep $30/mo for life. When DAW ships and pricing moves, your rate stays locked.',
    features: [
      'Everything in Gener8 Pro',
      <>S<sup>3</sup> AI Director — AI-orchestrated video</>,
      'Multi-LLM story direction & shot planning',
      'Beat-synced, stem-synced scene assembly',
      'Apply Style Patches (community library)',
      'StyleForge: train LoRA patches (local)',
      'Full DAW — free update in 2-3 weeks',
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
            {t.price}<span className={styles.priceUnit}>/mo</span>
          </div>
          <div className={styles.tierSub}>Subscription only. Cancel anytime.</div>
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
              {t.price}<span className={styles.priceUnit}>/mo</span>
            </div>
            <div className={styles.tierSub}>Subscription only. Cancel anytime.</div>
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
          BETA · EARLY ACCESS · Q2 2026
        </div>

        <p className={styles.tagline}>
          Your GPU. Your files. Your music.
        </p>

        {/* ── HERO VIDEO ── */}
        <div className={styles.videoHero}>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/QqzB7DN_AAw?si=QKUT7fwQ6SUUZsHI&rel=0&modestbranding=1"
              title="S³ Strands Sound Studio"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                Three tiers. One ecosystem. Every generation runs on your hardware. Your files, your rights, your catalogue.
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
              Three tiers. One ecosystem. Every generation runs on your hardware. Your files, your rights, your catalogue.
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
              COMING SOON
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
              PUBLIC BETA &middot; Q2 2026
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
            ['STATUS', 'BETA · Q2 2026 LAUNCH'],
            ['INFERENCE', 'LOCAL GPU · NO CLOUD'],
            ['MODULES', 'GENER8 / GENER8 PRO / CREATOR STUDIO'],
            ['PRICING', '$5 / $12.99 / $30 PER MONTH'],
            ['LICENCE', 'INCLUDED IN SUBSCRIPTION'],
            ['GENERATIONS', 'UNLIMITED, ALL TIERS'],
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
          <h2 className={styles.sectionHeading}>Simple pricing. No licence fees. No surprises.</h2>
          <p className={styles.pricingSub}>
            No licence fees. No surprises. Just a flat monthly subscription.
          </p>
          {isMobile ? <PricingCarousel /> : <PricingGrid />}
        </div>

        <p className={styles.promoLine}>
          First hour free, no sign-in. First 500 Creator Studio subs lock in $30/mo for life. Annual subs: one extra month.
        </p>

        <p className={styles.cursor}>
          <span className={styles.prompt}>&gt;</span>{' '}
          <span style={{ opacity: visible ? 1 : 0 }}>&block;</span>
        </p>
      </div>
    </div>
  );
}
