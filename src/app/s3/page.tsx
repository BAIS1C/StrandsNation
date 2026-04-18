'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './page.module.css';

const TARGET = new Date('2026-04-24T00:00:00+08:00').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

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

/* ── Pricing tiers (s3studio-web parity: 3-card grid + full-width all-in-one) ── */
const TIERS = [
  {
    id: 'GENER8 BASE',
    name: <>S<sup>3</sup> GENER8</>,
    tagline: 'Generate, cover, remix',
    price: '$5',
    features: [
      'Unlimited generations',
      'Text-to-music, covers, restyling',
      'Full creative control',
      'Apply Style Patches',
      'Base Video (540p visualisers)',
      'FLAC lossless output',
      'Commercially yours',
    ],
  },
  {
    id: 'GENER8 PRO',
    name: <>S<sup>3</sup> GENER8 PRO</>,
    tagline: 'Style Forge + HD video sharing',
    price: '$8',
    features: [
      'Everything in Base',
      'StyleForge: train your own LoRA patches',
      'Full resolution video up to 1080p',
      '1-click share: IG, TikTok, FB, Shorts',
      'Correct aspect ratios per platform',
      'Unlimited training runs & exports',
    ],
  },
  {
    id: 'AI DIRECTOR',
    name: <>S<sup>3</sup> AI DIRECTOR</>,
    tagline: 'AI-orchestrated music video production',
    price: '$10',
    features: [
      'Unlimited renders',
      'Beat-synced AI shot planning',
      'Multi-LLM story direction',
      'SOTA video generation via API',
      'Stem-synced edits, agentic assembly',
      <>Upscale any S<sup>3</sup> video to 4K</>,
    ],
  },
];

const ALL_IN_ONE = {
  label: 'ALL-IN-ONE',
  name: <>S<sup>3</sup> CREATOR PRO</>,
  price: '$20',
  copy: <>Every S<sup>3</sup> product. Every feature. One subscription. GENER8, GENER8 PRO, and AI DIRECTOR all included. Built for studios, labels, content teams, and serious creators who need the complete toolkit. No add-ons. No upsells. Everything, unlimited, for a flat $20.</>,
};

/* Desktop: 3-card grid + full-width all-in-one banner (s3studio-web parity) */
function PricingGrid() {
  return (
    <>
      <div className={styles.tierGrid}>
        {TIERS.map((t, i) => (
          <div key={i} className={styles.tierCard}>
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
          </div>
        ))}
      </div>

      <div className={styles.allInOne}>
        <div className={styles.allInOneBadge}>{ALL_IN_ONE.label}</div>
        <div className={styles.allInOneHead}>
          <span className={styles.allInOneName}>{ALL_IN_ONE.name}</span>
          <span className={styles.allInOnePrice}>
            {ALL_IN_ONE.price}<span className={styles.priceUnit}>/mo</span>
          </span>
        </div>
        <p className={styles.allInOneCopy}>{ALL_IN_ONE.copy}</p>
      </div>
    </>
  );
}

/* Mobile: swipeable carousel of the same tier cards + all-in-one as the 4th slide */
function PricingCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);
  const dragging = useRef(false);

  const slides = [...TIERS.map(t => ({ kind: 'tier' as const, data: t })), { kind: 'aio' as const, data: ALL_IN_ONE }];
  const N = slides.length;

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
        {slides.map((s, i) =>
          s.kind === 'tier' ? (
            <div key={i} className={styles.carouselSlide}>
              <div className={styles.tierLabel}>{s.data.id}</div>
              <div className={styles.tierName}>{s.data.name}</div>
              <div className={styles.tierTagline}>{s.data.tagline}</div>
              <div className={styles.tierPrice}>
                {s.data.price}<span className={styles.priceUnit}>/mo</span>
              </div>
              <div className={styles.tierSub}>Subscription only. Cancel anytime.</div>
              <ul className={styles.tierFeatures}>
                {s.data.features.map((f, j) => (
                  <li key={j} className={styles.tierFeature}>
                    <span className={styles.check}>&#10003;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div key={i} className={`${styles.carouselSlide} ${styles.carouselSlidePro}`}>
              <div className={styles.allInOneBadge}>{s.data.label}</div>
              <div className={styles.tierName}>{s.data.name}</div>
              <div className={styles.tierPrice}>
                {s.data.price}<span className={styles.priceUnit}>/mo</span>
              </div>
              <div className={styles.tierSub}>Everything, unlimited. Flat fee.</div>
              <p className={styles.allInOneCopy}>{s.data.copy}</p>
            </div>
          )
        )}
      </div>
      <div className={styles.carouselDots}>
        {slides.map((_, i) => (
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
  const [time, setTime] = useState(getTimeLeft);
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

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
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

        <p className={styles.tagline}>
          Your GPU. Your studio. Your music. No limits.
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
                Four tiers. One ecosystem. One flat monthly fee. Your GPU. Your studio. Your catalogue. Your rights.
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
              Four tiers. One ecosystem. One flat monthly fee. Your GPU. Your studio. Your catalogue. Your rights.
            </p>
          </div>
        )}

        {/* LED Countdown */}
        <div className={styles.countdownFrame}>
          <div className={styles.countdownHeader}>ESTIMATED TIME TO LAUNCH</div>
          <div className={styles.countdownInner}>
            {[
              { label: 'DAYS', val: time.days },
              { label: 'HOURS', val: time.hours },
              { label: 'MINUTES', val: time.minutes },
              { label: 'SECONDS', val: time.seconds },
            ].map((u, i) => (
              <span key={u.label} style={{ display: 'contents' }}>
                {i > 0 && <span className={styles.countdownSep}>:</span>}
                <div className={styles.countdownUnit}>
                  <span className={styles.countdownLabel}>{u.label}</span>
                  <div className={styles.digitPanel}>
                    <span className={styles.digitGhost}>88</span>
                    <span className={styles.countdownDigit}>{pad(u.val)}</span>
                  </div>
                </div>
              </span>
            ))}
          </div>
          <div className={`${styles.screw} ${styles.screwTL}`} />
          <div className={`${styles.screw} ${styles.screwTR}`} />
          <div className={`${styles.screw} ${styles.screwBL}`} />
          <div className={`${styles.screw} ${styles.screwBR}`} />
        </div>

        {/* Status block */}
        <div className={styles.statusBlock}>
          {[
            ['STATUS', 'GENER8 IN DEVELOPMENT'],
            ['INFERENCE', 'LOCAL GPU'],
            ['MODULES', 'GENER8 / PRO / AI DIRECTOR / CREATOR PRO'],
            ['PRICING', '$5 / $8 / $10 / $20 PER MONTH'],
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
          First hour free, no sign-in. First 5,000 subscribers get their second month free. Annual subs: one extra month.
        </p>

        <p className={styles.cursor}>
          <span className={styles.prompt}>&gt;</span>{' '}
          <span style={{ opacity: visible ? 1 : 0 }}>&block;</span>
        </p>
      </div>
    </div>
  );
}
