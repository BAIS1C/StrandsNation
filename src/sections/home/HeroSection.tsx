'use client';
import { socials } from '@/data/socials';
import styles from './HeroSection.module.css';
import ParticleHero from '@/components/ParticleHero/ParticleHero';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.orbCyan} />
      <div className={styles.orbPink} />

      <div className={styles.grid}>
        {/* Left: copy */}
        <div className={styles.content}>
          <div className={styles.eyebrow}>// SIGNAL DETECTED</div>
          <div className={styles.hook}>
            Wars escalating. Authoritarianism rising. Wealth inequality enabling{' '}
            <em className={styles.emphPink}>rampant abuses by elites</em> worldwide.
            The <em className={styles.emphPink}>&ldquo;invisible hand&rdquo;</em> becoming more and more{' '}
            <strong className={styles.emphWhite}>visible</strong>.
            <br /><br />
            The world is wrong. But <strong className={styles.emphWhite}>why?</strong>
            <br /><br />
            Your instinct led you here.
          </div>
          <h1 className={styles.headline}>STRANDS IS THE EXIT</h1>
          <p className={styles.subhead}>
            Not a protest. Not a manifesto. New architecture for the digital
            economy, built by the people who will live in it.
          </p>
          <div className={styles.ctas}>
            <a href="#nation" className={styles.ctaPrimary}>
              BECOME A CITIZEN
            </a>
            <a href="/whitepaper" className={styles.ctaSecondary}>
              READ THE THESIS
            </a>
            <a href={socials.telegram.url} target="_blank" rel="noopener noreferrer" className={styles.ctaTertiary}>
              JOIN TELEGRAM
            </a>
          </div>
          <div className={styles.scrollHint}>SCROLL TO WAKE UP ↓</div>
        </div>

        {/* Right: particle animation */}
        <div className={styles.particlePane}>
          <ParticleHero />
        </div>
      </div>
    </section>
  );
}