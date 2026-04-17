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

/* ── Pricing Carousel ── */
const PRODUCTS = [
  {
    id: 'GENER8 BASE',
    name: <>S<sup>3</sup> GENER8</>,
    price: '$5',
    copy: 'Unlimited music generation. Text-to-music, covers, restyling, full creative control. Bundled with Base Video (540p visualisers, instant preview). Top-40 grade output. Uncensored. Commercially yours.',
    soon: false,
    pro: false,
  },
  {
    id: 'GENER8 PRO',
    name: <>S<sup>3</sup> GENER8 PRO</>,
    price: '$8',
    copy: 'Everything in Base, plus the Style Forge for training your own LoRA style patches. Full resolution video suite up to 1080p with one-click sharing to Instagram, TikTok, Facebook, YouTube Shorts. Unlimited training runs, unlimited patches, unlimited exports.',
    soon: false,
    pro: false,
  },
  {
    id: 'VID PRO',
    name: <>S<sup>3</sup> VID PRO</>,
    price: '$10',
    copy: <>A full AI music video workspace. Kanban-style scene and character management, multi-LLM story direction, integrated AI image and video generation, stem-synced edits, agentic assembly. Upscale any S<sup>3</sup> video to 4K. Unlimited renders.</>,
    soon: false,
    pro: false,
  },
  {
    id: 'COMING SOON',
    name: <>S<sup>3</sup> DAW PRO</>,
    price: 'TBA',
    copy: "A generative DAW built for producers, not prompt-jockeys. Shipping when it's ready, not before.",
    soon: true,
    pro: false,
  },
  {
    id: 'ALL-IN-ONE',
    name: <>S<sup>3</sup> STUDIO PRO</>,
    price: '$20',
    copy: <>Every S<sup>3</sup> product. Every feature. One subscription. GENER8, GENER8 PRO, VID PRO, and DAW PRO all included. Built for studios, labels, content teams, and serious creators who need the complete toolkit. No add-ons. No upsells. Everything, unlimited, for a flat $20.</>,
    soon: true,
    pro: true,
  },
];

function PricingCarousel() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  function goTo(i: number) {
    setIdx(Math.max(0, Math.min(i, PRODUCTS.length - 1)));
  }

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    dragging.current = true;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) goTo(idx + (dx < 0 ? 1 : -1));
  }

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselTrack}
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {PRODUCTS.map((p, i) => (
          <div
            key={i}
            className={`${styles.carouselSlide} ${p.soon ? styles.productSoon : ''} ${p.pro ? styles.productPro : ''}`}
          >
            {p.pro && <div className={styles.proBadge}>COMING SOON</div>}
            <div className={styles.productHead}>
              <span className={styles.productId}>{p.id}</span>
              <span className={styles.productName}>{p.name}</span>
              <span className={styles.productPrice}>{p.price}{!p.soon || p.pro ? <span className={styles.priceUnit}>/mo</span> : null}</span>
            </div>
            <p className={styles.productCopy}>{p.copy}</p>
          </div>
        ))}
      </div>
      <div className={styles.carouselDots}>
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to tier ${i + 1}`}
          />
        ))}
      </div>
      <div className={styles.carouselNav}>
        <button onClick={() => goTo(idx - 1)} disabled={idx === 0} className={styles.carouselBtn}>&larr;</button>
        <span className={styles.carouselCount}>{idx + 1} / {PRODUCTS.length}</span>
        <button onClick={() => goTo(idx + 1)} disabled={idx === PRODUCTS.length - 1} className={styles.carouselBtn}>&rarr;</button>
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
                Three products. One ecosystem. One flat monthly fee. Your GPU. Your studio. Your catalogue. Your rights.
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
              Three products. One ecosystem. One flat monthly fee. Your GPU. Your studio. Your catalogue. Your rights.
            </p>
          </div>
        )}

        {/* ── PRICING ── */}
        <div className={styles.pricingSection}>
          <h2 className={styles.sectionHeading}>Simple pricing. No licence fees. No surprises.</h2>

          {isMobile ? (
            <PricingCarousel />
          ) : (
            <div className={styles.productList}>
              {PRODUCTS.map((p, i) => (
                <div key={i} className={`${styles.product} ${p.soon ? styles.productSoon : ''} ${p.pro ? styles.productPro : ''}`}>
                  {p.pro && <div className={styles.proBadge}>COMING SOON</div>}
                  <div className={styles.productHead}>
                    <span className={styles.productId}>{p.id}</span>
                    <span className={styles.productName}>{p.name}</span>
                    <span className={styles.productPrice}>{p.price}{!p.soon || p.pro ? <span className={styles.priceUnit}>/mo</span> : null}</span>
                  </div>
                  <p className={styles.productCopy}>{p.copy}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className={styles.promoLine}>
          First 5,000 users: first month free on any tier. Annual subscribers: one additional month free.
        </p>

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
            ['MODULES', 'GENER8 / PRO / VID PRO / STUDIO PRO'],
            ['PRICING', '$5 / $8 / $10 / $20 PER MONTH'],
            ['LICENCE', 'INCLUDED IN SUBSCRIPTION'],
            ['GENERATIONS', 'UNLIMITED, ALL TIERS'],
            ['DAW PRO', 'ROADMAPPED'],
          ].map(([label, val]) => (
            <p key={label} className={styles.statusLine}>
              <span className={styles.label}>{label}</span>
              <span className={styles.statusDot}> .............. </span>
              <span className={styles.val}>{val}</span>
            </p>
          ))}
        </div>

        <p className={styles.cursor}>
          <span className={styles.prompt}>&gt;</span>{' '}
          <span style={{ opacity: visible ? 1 : 0 }}>&block;</span>
        </p>
      </div>
    </div>
  );
}
