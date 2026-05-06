import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import styles from './NationSection.module.css';

interface Door {
  label: string;
  body: string;
}

const doors: Door[] = [
  {
    label: 'ARCHITECT',
    body: 'Build the future with us. S³ is your sovereign generation engine: local inference, no per-generation tax, your output is yours. Every track you produce, every world you skin, every Mait you train becomes part of the Nation’s living catalogue. Architects do not wait for the future. They build it, together.',
  },
  {
    label: 'PLAYER',
    body: 'Play the game. Build the game. Build YOUR game. MetaXity1 is your sandbox to modify, extend, and grow within. The world remembers what you do in it. Let’s do this.',
  },
  {
    label: 'SIGNAL OPS',
    body: 'Weave the narrative. Carry the signal. Run Zealy-style quests, amplify what matters, recruit the people who need to hear this. SIGOPS is not only an in-game system; it is how the Nation grows. Friends become colleagues. Colleagues become family. That is the sequence.',
  },
  {
    label: 'TRADER',
    body: 'Buy and sell creations on the in-economy exchange. Skins, music, video, lore artefacts, Mait fragments. A closed-loop economy with bounded supply prevents whale abuse and pump cycles. Value flows between citizens, not extracted to outside speculators.',
  },
  {
    label: 'FOUNDING CITIZEN',
    body: 'Claim a Founders Pass during the founding window. Permanent founding status. Priority access when the network launches. Governance weight in Nation decisions. An identity that travels with you across every product.',
  },
];

export default function NationSection() {
  return (
    <SectionWrapper bordered>
      <a id="nation" className={styles.anchor} aria-hidden="true" />
      <SectionLabel
        num="01 // THE NATION"
        title="What This Is"
        subtitle="In plain language. No jargon. No ideology. Just the architecture."
      />

      {/* Block 1: Diagnosis (yellow / human / amber) */}
      <Card variant="yellow">
        <span className={styles.label} data-variant="yellow">THE DIAGNOSIS</span>
        <p className={styles.body}>
          The digital economy is not broken. It is working exactly as designed.
          It extracts attention, monetises behaviour, centralises ownership,
          and redistributes none of the value back to the people who generate
          it. The platforms that dominate the web did not accidentally become
          surveillance engines. They were architected that way.
        </p>
        <p className={styles.body}>
          This is techno-feudalism. And regulation cannot fix it, because
          regulation negotiates terms within the existing architecture.
        </p>
        <p className={styles.bodyEmph} data-variant="yellow">
          The exit is new architecture.
        </p>
      </Card>

      {/* Block 2: Strands Answer (cyan / action) */}
      <Card variant="cyan">
        <span className={styles.label} data-variant="cyan">THE STRANDS ANSWER</span>
        <p className={styles.body}>
          Strands is a sequenced ecosystem where each product validates and
          funds the next. The studio generates the revenue. The game teaches
          the primitives. EveryWear becomes the sovereign shell. Layer U
          operationalises consented attention. The chain activates last, when
          the citizen base is large enough to govern itself.
        </p>
        <p className={styles.bodyEmph} data-variant="cyan">
          Nothing launches on faith. Everything launches on evidence.
        </p>
        <p className={styles.body}>
          The chain is invisible plumbing. The studio runs without it. The
          game runs without it. EveryWear runs without it. When the chain is
          ready, citizens graduate to it. Until then, the same principles
          operate through normal infrastructure that already works.
        </p>
      </Card>

      {/* Block 3: How to Belong (purple / premium) — five doors,
          last door spans full width as the highest-commitment action */}
      <Card variant="purple">
        <span className={styles.label} data-variant="purple">HOW TO BELONG</span>
        <div className={styles.doors}>
          {doors.map((d) => (
            <div key={d.label} className={styles.door}>
              <div className={styles.doorLabel}>{d.label}</div>
              <p className={styles.doorBody}>{d.body}</p>
            </div>
          ))}
        </div>
      </Card>
    </SectionWrapper>
  );
}
