'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const TARGET = new Date('2026-04-24T00:00:00+08:00').getTime(); // 7 days from 17 Apr 2026

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

export default function S3ComingSoon() {
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState(getTimeLeft);

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

        <h1 className={styles.title}>
          S&sup3;
        </h1>

        <p className={styles.subtitle}>
          Strands Sound Studio
        </p>

        <p className={styles.tagline}>
          Your GPU. Your studio. Your music. No limits.
        </p>

        {/* ── HERO VIDEO EMBED ── */}
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

        {/* ── BENEFIT ROWS ── */}
        <div className={styles.benefitGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>&#x221E;</div>
            <h3 className={styles.benefitTitle}>Unlimited Generations</h3>
            <p className={styles.benefitCopy}>
              No token meters. No credits. No per-song tax. Generate as much music
              as your hardware can handle. Every tier. No exceptions.
            </p>
          </div>

          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>&#x1F513;</div>
            <h3 className={styles.benefitTitle}>Complete Creative Freedom</h3>
            <p className={styles.benefitCopy}>
              Use any lyrics. Any inspiration. Any style. No content filters,
              no handcuffs, no corporate censorship deciding what you can create.
            </p>
          </div>

          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>&#x1F4BB;</div>
            <h3 className={styles.benefitTitle}>Runs On Your Machine</h3>
            <p className={styles.benefitCopy}>
              One thin installer. Profiles your GPU. Downloads the right weights.
              Builds a self-contained studio. No terminal. No Python. No Git. One click.
            </p>
          </div>

          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>&#x00A9;</div>
            <h3 className={styles.benefitTitle}>You Own Everything</h3>
            <p className={styles.benefitCopy}>
              Every track you generate is commercially yours. Full rights.
              No platform claims. No revenue splits. Your catalogue, your business.
            </p>
          </div>
        </div>

        {/* ── EXPLAINER ── */}
        <div className={styles.thesisBlock}>
          <h2 className={styles.sectionHeading}>Just say NO to token limits</h2>
          <p className={styles.thesisPara}>
            Every cloud music AI charges per generation. 200 credits here, 500 tokens there,
            surprise paywalls when you hit the good stuff. S<sup>3</sup> flips that model
            on its head. Your GPU does the work. We provide the models, the tools, and the
            updates. You generate as much as you want, whenever you want.
          </p>
          <p className={styles.thesisPara}>
            Modern gaming PCs have more than enough compute to run a Suno-grade model.
            Our installer profiles your rig, downloads only the weights it can handle,
            and builds a local inference engine. You run your own node. We stay out of
            the way.
          </p>
          <p className={styles.thesisPara}>
            Want to iterate on a track 50 times? Go ahead. Want to generate an entire
            album in a weekend? Nothing stopping you. Want to use actual lyrics, real
            artist references, and creative inspirations without a filter deciding what
            you&apos;re allowed to make? That&apos;s the point.
          </p>
          <p className={`${styles.thesisPara} ${styles.thesisHighlight}`}>
            Three products. One ecosystem. One flat monthly fee. Your GPU. Your studio.
            Your catalogue. Your rights.
          </p>
        </div>

        {/* ── PRICING ── */}
        <div className={styles.pricingSection}>
          <h2 className={styles.sectionHeading}>Simple pricing. No licence fees. No surprises.</h2>

          <div className={styles.productList}>
            <div className={styles.product}>
              <div className={styles.productHead}>
                <span className={styles.productId}>GENER8 BASE</span>
                <span className={styles.productName}>S<sup>3</sup> GENER8</span>
                <span className={styles.productPrice}>$5<span className={styles.priceUnit}>/mo</span></span>
              </div>
              <p className={styles.productCopy}>
                Unlimited music generation. Text-to-music, covers, restyling, full
                creative control. Bundled with Base Video (540p visualisers, instant
                preview). Top-40 grade output. Uncensored. Commercially yours.
              </p>
            </div>

            <div className={styles.product}>
              <div className={styles.productHead}>
                <span className={styles.productId}>GENER8 PRO</span>
                <span className={styles.productName}>S<sup>3</sup> GENER8 PRO</span>
                <span className={styles.productPrice}>$8<span className={styles.priceUnit}>/mo</span></span>
              </div>
              <p className={styles.productCopy}>
                Everything in Base, plus the Style Forge for training your own LoRA
                style patches. Full resolution video suite up to 1080p with one-click
                sharing to Instagram, TikTok, Facebook, YouTube Shorts. Unlimited
                training runs, unlimited patches, unlimited exports.
              </p>
            </div>

            <div className={styles.product}>
              <div className={styles.productHead}>
                <span className={styles.productId}>VID PRO</span>
                <span className={styles.productName}>S<sup>3</sup> VID PRO</span>
                <span className={styles.productPrice}>$10<span className={styles.priceUnit}>/mo</span></span>
              </div>
              <p className={styles.productCopy}>
                A full AI music video workspace. Kanban-style scene and character
                management, multi-LLM story direction, ComfyUI-integrated image and
                video generation, stem-synced edits, agentic assembly. Upscale any
                S<sup>3</sup> video to 4K. Unlimited renders.
              </p>
            </div>

            <div className={`${styles.product} ${styles.productSoon}`}>
              <div className={styles.productHead}>
                <span className={styles.productId}>COMING SOON</span>
                <span className={styles.productName}>S<sup>3</sup> DAW PRO</span>
                <span className={styles.productPrice}>TBA</span>
              </div>
              <p className={styles.productCopy}>
                A generative DAW built for producers, not prompt-jockeys. Shipping when
                it&apos;s ready, not before.
              </p>
            </div>

            {/* ── B2B BUNDLE ── */}
            <div className={`${styles.product} ${styles.productSoon} ${styles.productPro}`}>
              <div className={styles.proBadge}>COMING SOON</div>
              <div className={styles.productHead}>
                <span className={styles.productId}>ALL-IN-ONE</span>
                <span className={styles.productName}>S<sup>3</sup> STUDIO PRO</span>
                <span className={styles.productPrice}>$20<span className={styles.priceUnit}>/mo</span></span>
              </div>
              <p className={styles.productCopy}>
                Every S<sup>3</sup> product. Every feature. One subscription.
                GENER8, GENER8 PRO, VID PRO, and DAW PRO all included.
                Built for studios, labels, content teams, and serious creators
                who need the complete toolkit. No add-ons. No upsells.
                Everything, unlimited, for a flat $20.
              </p>
            </div>
          </div>
        </div>

        <p className={styles.promoLine}>
          First 5,000 users: first month free on any tier. Annual subscribers: one
          additional month free.
        </p>

        {/* LED Countdown Display */}
        <div className={styles.countdownFrame}>
          <div className={styles.countdownHeader}>
            ESTIMATED TIME TO LAUNCH
          </div>
          <div className={styles.countdownInner}>
            <div className={styles.countdownUnit}>
              <span className={styles.countdownLabel}>DAYS</span>
              <div className={styles.digitPanel}>
                <span className={styles.digitGhost}>88</span>
                <span className={styles.countdownDigit}>{pad(time.days)}</span>
              </div>
            </div>
            <span className={styles.countdownSep}>:</span>
            <div className={styles.countdownUnit}>
              <span className={styles.countdownLabel}>HOURS</span>
              <div className={styles.digitPanel}>
                <span className={styles.digitGhost}>88</span>
                <span className={styles.countdownDigit}>{pad(time.hours)}</span>
              </div>
            </div>
            <span className={styles.countdownSep}>:</span>
            <div className={styles.countdownUnit}>
              <span className={styles.countdownLabel}>MINUTES</span>
              <div className={styles.digitPanel}>
                <span className={styles.digitGhost}>88</span>
                <span className={styles.countdownDigit}>{pad(time.minutes)}</span>
              </div>
            </div>
            <span className={styles.countdownSep}>:</span>
            <div className={styles.countdownUnit}>
              <span className={styles.countdownLabel}>SECONDS</span>
              <div className={styles.digitPanel}>
                <span className={styles.digitGhost}>88</span>
                <span className={styles.countdownDigit}>{pad(time.seconds)}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.screw} ${styles.screwTL}`} />
          <div className={`${styles.screw} ${styles.screwTR}`} />
          <div className={`${styles.screw} ${styles.screwBL}`} />
          <div className={`${styles.screw} ${styles.screwBR}`} />
        </div>

        <div className={styles.statusBlock}>
          <p className={styles.statusLine}>
            <span className={styles.label}>STATUS</span>
            <span className={styles.dot}> .............. </span>
            <span className={styles.val}>GENER8 IN DEVELOPMENT</span>
          </p>
          <p className={styles.statusLine}>
            <span className={styles.label}>INFERENCE</span>
            <span className={styles.dot}> ............ </span>
            <span className={styles.val}>LOCAL GPU</span>
          </p>
          <p className={styles.statusLine}>
            <span className={styles.label}>MODULES</span>
            <span className={styles.dot}> ............. </span>
            <span className={styles.val}>GENER8 / PRO / VID PRO / STUDIO PRO</span>
          </p>
          <p className={styles.statusLine}>
            <span className={styles.label}>PRICING</span>
            <span className={styles.dot}> ............. </span>
            <span className={styles.val}>$5 / $8 / $10 / $20 PER MONTH</span>
          </p>
          <p className={styles.statusLine}>
            <span className={styles.label}>LICENCE</span>
            <span className={styles.dot}> ............. </span>
            <span className={styles.val}>INCLUDED IN SUBSCRIPTION</span>
          </p>
          <p className={styles.statusLine}>
            <span className={styles.label}>GENERATIONS</span>
            <span className={styles.dot}> .......... </span>
            <span className={styles.val}>UNLIMITED, ALL TIERS</span>
          </p>
          <p className={styles.statusLine}>
            <span className={styles.label}>DAW PRO</span>
            <span className={styles.dot}> ............. </span>
            <span className={styles.val}>ROADMAPPED</span>
          </p>
        </div>

        <p className={styles.cursor}>
          <span className={styles.prompt}>&gt;</span>{' '}
          <span style={{ opacity: visible ? 1 : 0 }}>&block;</span>
        </p>
      </div>
    </div>
  );
}
