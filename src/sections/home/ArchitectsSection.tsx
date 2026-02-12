import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import { bookUrl } from '@/data/socials';
import styles from './ArchitectsSection.module.css';

export default function ArchitectsSection() {
  return (
    <SectionWrapper>
      <SectionLabel num="01 // THE FRAMEWORK" title="Architects" />
      <Card variant="yellow">
        <div className={styles.cardTitle}>Building the Exit from Techno-Feudalism</div>
        <p className={styles.body}>
          A post-political framework for systems transition. Not a manifesto — a manual. Written for builders,
          not spectators. The philosophical backbone of everything you&rsquo;ll experience in Strands.
        </p>
        <div className={styles.quote}>
          We are not Left. We are not Right.<br />
          We are not the Centre.<br />
          <span className={styles.quoteAccent}>We are the Decentre.</span>
        </div>
        <a
          href={bookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bookLink}
        >
          GET THE BOOK →
        </a>
      </Card>
    </SectionWrapper>
  );
}
