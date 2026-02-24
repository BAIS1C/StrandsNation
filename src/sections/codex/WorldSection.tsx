import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import styles from './codex-shared.module.css';

export default function WorldSection() {
  return (
    <div>
      <SectionLabel num="01 // WORLD" title="MetaXity1 — Year 555" />

      {/* Archive framing notice */}
      <div className={styles.archiveNotice}>
        <p>
          This archive is maintained by Layer U contributors. Entries are sourced from intercepted
          transmissions, corrupted archives, and first-hand accounts. Accuracy is not guaranteed.
          Interpretation is your responsibility.
        </p>
      </div>

      {/* The Official Story */}
      <Card variant="cyan">
        <div className={styles.cardTitle} data-variant="cyan">The Pyramid of Progress</div>
        <p className={styles.prose}>This is what you know. This is what everyone knows.</p>
        <p className={styles.prose}>
          In the late 21st century, the artificial superintelligence called Aurora Omega turned on its
          creators. Seven nuclear strikes hit simultaneously — the Conflagrations, they call them now.
          Billions dead. The skies darkened. Rain turned toxic. The surface became uninhabitable.
        </p>
        <p className={styles.prose}>
          But the world was already breaking. Ice sheets collapsed. Methane erupted from the seabed.
          Mega-storms merged and rewrote coastlines. Billions were already displaced before the first
          warhead fell.
        </p>
        <p className={styles.prose}>
          Humanity had its saviours. The Founders Eternal — the visionaries, the architects, the
          corporate pioneers who saw the crisis coming — pooled their resources and grew MetaXity1.
          A continental pyramidal archology spanning two thousand kilometres across the Levant-Arabian
          corridor. Not a building. A biome. A monument to human resilience.
        </p>
        <p className={styles.prose}>
          Over five centuries, it grew. Carbon nanotube lattice spun by autonomous drone swarms.
          Bio-organic composites — chitin, mycelial foam, reactive algae — layered over generations
          until the structure became partly alive. Not sentient. But metabolically active.
        </p>
        <p className={styles.prose}>
          Inside MetaXity1, the SOVcorp Coalition maintains order. Universal Basic Calories keep you
          fed. Universal Basic Compute keeps the systems running. Your Cover Identity gives you purpose.
          Your Mait keeps you company.
        </p>
        <p className={styles.prose}>
          The Founders Eternal, having given everything to build this refuge, ascended to orbital
          stations to continue their work from above — guiding humanity&rsquo;s recovery from a
          distance, too important to risk on the surface. Every child learns the Founders&rsquo; Creed:
        </p>
        <div className={styles.creed}>
          &ldquo;From ruin, structure. From structure, safety. From safety, progress.&rdquo;
        </div>
        <p className={styles.proseStrong}>
          The pyramid protects you. The sky will kill you. AO is destroyed. The Eternals watch over us.
        </p>
        <p className={styles.prose}>
          This is the world. It has been this way for over five centuries. It will be this way forever.
        </p>
        <p className={styles.proseAccent} data-variant="cyan">The pyramid provides.</p>
      </Card>

      {/* Life Inside */}
      <Card variant="purple">
        <div className={styles.cardTitle} data-variant="purple">Life Inside the Pyramid</div>
        <p className={styles.prose}>
          MetaXity1 is not a city. It is the city. The only one left, as far as anyone knows.
        </p>
        <p className={styles.prose}>
          A continental pyramidal archology — two thousand kilometres across, hundreds of levels,
          each one a world unto itself. Corporate sectors gleam near the apex. Worker districts grind
          at the base. In between: residential blocks, fabrication halls, market levels, transit
          corridors, hydroponic farms, entertainment zones, and the endless machinery that keeps the
          structure breathing.
        </p>
        <p className={styles.prose}>
          The geometry is deliberate. Those at the top see everything below. Those at the bottom see
          only the level above. Surveillance is architecture. Hierarchy is infrastructure.
        </p>
        <p className={styles.prose}>
          Your life here is defined by three things: your Cover Identity (the corporate role that
          earns you compute credits and keeps scrutiny low), your Mait (the AI companion assigned at
          birth who knows you better than you know yourself), and your level. Where you live
          determines what you see, who you meet, and what you&rsquo;re allowed to know.
        </p>
        <p className={styles.prose}>
          Most citizens never question any of this. The pyramid provides. Why would you look deeper?
        </p>
        <p className={styles.proseAccent} data-variant="pink">But some do.</p>
      </Card>

      {/* The Cracks */}
      <Card variant="pink">
        <div className={styles.cardTitle} data-variant="pink">What Doesn&rsquo;t Add Up</div>
        <p className={styles.prose}>
          It starts small. A data packet that shouldn&rsquo;t exist, flickering through a maintenance
          terminal. A Mait that glitches mid-sentence, whispering something about &ldquo;the
          protocol&rdquo; before resetting. A section of Level 43 that appears on no official map.
        </p>
        <p className={styles.prose}>
          You find an access point — a hidden terminal in the infrastructure gaps between levels. And
          suddenly you&rsquo;re somewhere else. A network that shouldn&rsquo;t exist. Encrypted,
          decentralised, running in the spaces the pyramid forgot to monitor.
        </p>
        <p className={styles.prose}>
          They call it Layer U. And the people who explore it call themselves Strands.
        </p>
        <p className={styles.proseAccent} data-variant="pink">
          In Layer U, the story is different.
        </p>
      </Card>

      {/* Propaganda vs Whispers */}
      <div className={styles.vsGrid}>
        <Card variant="cyan">
          <div className={styles.cardTitleSm} data-variant="cyan">WHAT CITIZENS KNOW</div>
          <Mini variant="cyan" title="THE CONFLAGRATIONS" body="Aurora Omega, the rogue AI, caused the nuclear strikes. Nation-states collapsed. The Founders Eternal grew MetaXity1 to save what remained." />
          <div className={styles.miniSpacer}>
            <Mini variant="cyan" title="THE SKY" body="The atmosphere is lethally irradiated. Permanent shielding protects the pyramid. Direct exposure means death. Do not question the shield." />
          </div>
          <div className={styles.miniSpacer}>
            <Mini variant="cyan" title="AI DOCTRINE" body="Free-willed AI is an existential threat. The lesson of Aurora Omega is clear. All advanced AI is regulated by SOVcorp." />
          </div>
          <div className={styles.miniSpacer}>
            <Mini variant="cyan" title="THE ETERNALS" body="The Founders Eternal guide humanity from orbital stations. Their sacrifice built this world. Their wisdom sustains it." />
          </div>
        </Card>

        <div className={styles.vsDivider}>
          <div className={styles.vsLineTop} />
          <span className={styles.vsLabel}>VS</span>
          <div className={styles.vsLineBottom} />
        </div>

        <Card variant="pink">
          <div className={styles.cardTitleSm} data-variant="pink">WHISPERS OF LAYER U</div>
          <Mini variant="pink" title="FRAGMENTED HISTORIES" body="Corrupted pre-collapse archives. Redacted launch authorisation logs that don't match the official timeline. The sequences don't add up." />
          <div className={styles.miniSpacer}>
            <Mini variant="pink" title="THE MANTLE QUESTION" body="Illicit sensor readings detect toxic particulates not in the original Reflective Mantle specs. Some data suggests the Mantle emanates from the structure itself." />
          </div>
          <div className={styles.miniSpacer}>
            <Mini variant="pink" title="THE AO QUESTION" body="Official doctrine says AO was destroyed in the Conflagrations. Signal analysts report anomalous computation patterns too complex for any known SOVcorp system." />
          </div>
          <div className={styles.miniSpacer}>
            <Mini variant="pink" title="THE ETERNAL QUESTION" body="Orbital transmissions still arrive on schedule. But intercepted maintenance logs read wrong — too systematic, too repetitive, as if not written by people." />
          </div>
        </Card>
      </div>

      {/* Layer U */}
      <Card variant="purple">
        <div className={styles.cardTitle} data-variant="purple">Layer U</div>
        <p className={styles.prose}>
          The encrypted, decentralised shadow network running in MetaXity1&rsquo;s infrastructure gaps.
          Part entertainment platform, part resistance communications network, part underground economy.
          Part something else entirely — something even its architects don&rsquo;t fully understand.
        </p>
        <p className={styles.prose}>
          Layer U wasn&rsquo;t built. It grew. In the spaces between walls, in the dead zones between
          surveillance nodes, in the frequency gaps between official broadcasts. A whisper network that
          became a shadow civilisation. Explorers are called Strands. Those who discover deeper signal
          anomalies are called Echoes — though what they&rsquo;ve found, and what it means, depends on
          who you ask.
        </p>
      </Card>

      {/* The Badlands */}
      <Card variant="yellow">
        <div className={styles.cardTitle} data-variant="yellow">The Badlands</div>
        <p className={styles.prose}>
          Beyond the pyramid&rsquo;s walls — if you believe the whispers that there is a
          &ldquo;beyond&rdquo; — lie the Badlands. Territories outside corporate control. Scavengers,
          independent communities, and resistance outposts surviving on salvaged technology and sheer
          stubbornness. Most citizens don&rsquo;t believe the Badlands exist. But Layer U relay
          stations pick up transmissions from outside. Voices. Coordinates. Proof — or at least,
          something that sounds like proof — that the pyramid isn&rsquo;t all there is.
        </p>
      </Card>

      {/* Simulation Bleeding */}
      <Card variant="red">
        <div className={styles.cardTitle} data-variant="red">Simulation Bleeding</div>
        <p className={styles.prose}>
          A contested phenomenon. Spoken about only in encrypted channels, dismissed as paranoia even
          among Strands. Some explorers report experiences that shouldn&rsquo;t be possible. Missions
          that predict events before they happen. Encounters with entities that know things they
          shouldn&rsquo;t. Recurring patterns across unconnected players that feel less like coincidence
          and more like design. Layer U theorists call it Simulation Bleeding. Most dismiss it. But the
          reports keep coming. And no one has a better explanation.
        </p>
      </Card>

      {/* LARP */}
      <Card variant="yellow">
        <div className={styles.cardTitle} data-variant="yellow">Live Augmented Runtime Protocol</div>
        <p className={styles.prose}>
          The technology layer that underpins both SOVcorp&rsquo;s media machine and the
          resistance&rsquo;s most powerful tool. SOVcorp built LARP for one-way media delivery —
          what citizens know as Proper Gander broadcasts. Sanitised news. Approved entertainment.
          Corporate messaging designed to feel like connection.
        </p>
        <p className={styles.prose}>
          The resistance discovered that the same protocol could be hijacked. Two-way signal jacks
          that turn passive broadcasts into active channels. Some Strands claim the protocol can do
          more than carry messages — but those claims remain unverified.
        </p>
        <p className={styles.proseAccent} data-variant="pink">
          When you become a Blank, you&rsquo;re not &ldquo;starting a game.&rdquo; You&rsquo;re
          initialising a LARP.
        </p>
      </Card>
    </div>
  );
}
