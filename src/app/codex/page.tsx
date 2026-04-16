'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { CodexSectionId } from '@/types/codex';
import { codexNav } from '@/data/codex-nav';
import CodexSidebar from '@/components/CodexSidebar/CodexSidebar';
import WorldSection from '@/sections/codex/WorldSection';
import TimelineSection from '@/sections/codex/TimelineSection';
import FactionsSection from '@/sections/codex/FactionsSection';
import GangsSection from '@/sections/codex/GangsSection';
import EconomySection from '@/sections/codex/EconomySection';
import SkillsSection from '@/sections/codex/SkillsSection';
import MaitsSection from '@/sections/codex/MaitsSection';
import SigopsSection from '@/sections/codex/SigopsSection';
import EveryWearSection from '@/sections/codex/EveryWearSection';
import LayerUSection from '@/sections/codex/LayerUSection';
import GameplaySection from '@/sections/codex/GameplaySection';
import SeasonsSection from '@/sections/codex/SeasonsSection';
import CraftingSection from '@/sections/codex/CraftingSection';
import CodexFoundersSection from '@/sections/codex/FoundersSection';
import styles from './page.module.css';

const sectionMap: Record<CodexSectionId, React.ComponentType> = {
  world: WorldSection,
  timeline: TimelineSection,
  factions: FactionsSection,
  gangs: GangsSection,
  economy: EconomySection,
  skills: SkillsSection,
  maits: MaitsSection,
  sigops: SigopsSection,
  everywear: EveryWearSection,
  layeru: LayerUSection,
  gameplay: GameplaySection,
  seasons: SeasonsSection,
  crafting: CraftingSection,
  founders: CodexFoundersSection,
};

function CodexContent() {
  const [activeSection, setActiveSection] = useState<CodexSectionId>('world');
  const searchParams = useSearchParams();
  const isEmbed = searchParams?.get('embed') === 'true';
  const ActiveComponent = sectionMap[activeSection];

  const embedOverrides: React.CSSProperties | undefined = isEmbed
    ? { marginTop: 0 }
    : undefined;

  return (
    <div className={`${styles.codexLayout} page-enter`} style={embedOverrides}>
      <CodexSidebar
        sections={codexNav}
        activeId={activeSection}
        onSelect={setActiveSection}
        embed={isEmbed}
      />
      <main className={styles.content} key={activeSection}>
        <ActiveComponent />
      </main>
    </div>
  );
}

export default function CodexPage() {
  return (
    <Suspense fallback={null}>
      <CodexContent />
    </Suspense>
  );
}
