import Link from 'next/link';
import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import { bookUrl } from '@/data/socials';
import styles from './page.module.css';

export default function ManifestoPage() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--space-nav-h)' }}>
      <SectionWrapper narrow>
        <SectionLabel num="THE PHILOSOPHY" title="Manifesto" />

        {/* ─── Strands Manifesto ─── */}
        <Card variant="cyan">
          <span className={styles.docLabel} data-variant="cyan">MANIFESTO</span>
          <div className={styles.cardTitle} data-variant="cyan">
            Strands Manifesto — by Somo Kasane
          </div>
          <p className={styles.prose}>
            A declaration of intent. Why Strands exists, what it stands against, and what it proposes
            to build in place of systems designed to extract, surveil, and stratify. Not ideology —
            architecture. Not protest — prototype.
          </p>
          <p className={styles.prose}>
            The manifesto lays out the philosophical foundations: post-capitalist coordination,
            decentralised governance, cooperative economics, and the belief that games are the most
            powerful simulation engines ever built — and therefore the most powerful tools for
            modelling alternatives.
          </p>
          <a
            href="https://strandsnation.gitbook.io/strands-manifesto-by-somo-kasane/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.docLink}
            data-variant="cyan"
          >
            READ THE MANIFESTO →
          </a>
        </Card>

        {/* ─── Whitepaper — now links to internal /whitepaper route ─── */}
        <Card variant="purple">
          <span className={styles.docLabel} data-variant="purple">WHITEPAPER</span>
          <div className={styles.cardTitle} data-variant="purple">
            Strands Whitepaper
          </div>
          <p className={styles.prose}>
            The technical and economic blueprint. Token architecture, memory infrastructure,
            governance models, game economy primitives, and the full system design behind Strands
            Chain, EveryWear, MyMories, and the SIGOPS community development protocol.
          </p>
          <p className={styles.prose}>
            If the manifesto is the why, the whitepaper is the how. Every mechanism, every
            incentive loop, every infrastructure decision — documented, reasoned, and open for
            scrutiny.
          </p>
          <Link
            href="/whitepaper"
            className={styles.docLink}
            data-variant="purple"
          >
            READ THE WHITEPAPER →
          </Link>
        </Card>

        {/* ─── Architects Book ─── */}
        <Card variant="yellow">
          <div className={styles.bookRow}>
            <div className={styles.bookContent}>
              <span className={styles.docLabel} data-variant="yellow">BOOK</span>
              <div className={styles.cardTitle} data-variant="yellow">
                Architects: Building the Exit from Techno-Feudalism
              </div>
              <p className={styles.prose}>
                A post-political framework for systems transition. Not a manifesto — a manual.
                Written for builders, not spectators. The philosophical backbone of everything
                you&rsquo;ll experience in Strands.
              </p>
              <div className={styles.bigQuote}>
                We are not Left. We are not Right.<br />
                We are not the Centre.<br />
                <span className={styles.quoteYellow}>We are the Decentre.</span>
              </div>
              <a
                href={bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.docLink}
                data-variant="yellow"
              >
                GET THE BOOK →
              </a>
            </div>

            {/* Book cover — place architects-cover.png in public/images/ */}
            <div className={styles.bookCover}>
              <img
                src="/images/architects-cover.png"
                alt="Architects: Building the Exit from Techno-Feudalism"
                className={styles.coverImg}
              />
            </div>
          </div>
        </Card>

        {/* ─── Core Principles ─── */}
        <Card variant="glass">
          <div className={styles.cardTitle} data-variant="cyan">Core Principles</div>
          <p className={styles.prose}>
            The systems we live under are not inevitable. They are designed. And what is designed
            can be redesigned — not through revolution, but through building better alternatives
            that make the old systems irrelevant.
          </p>
          <p className={styles.prose}>
            Strands is a prototype for cooperative systems. The economy models post-scarcity
            resource allocation. The governance models decentralised decision-making. The community
            development model proves that people will build what they believe in — if you give them
            the tools and get out of the way.
          </p>
        </Card>
      </SectionWrapper>
    </div>
  );
}
