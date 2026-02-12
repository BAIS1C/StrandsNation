'use client';

import { useState } from 'react';
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
import GameplaySection from '@/sections/codex/GameplaySection';
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
  gameplay: GameplaySection,
  crafting: CraftingSection,
  founders: CodexFoundersSection,
};

export default function CodexPage() {
  const [activeSection, setActiveSection] = useState<CodexSectionId>('world');
  const ActiveComponent = sectionMap[activeSection];

  return (
    <div className={`${styles.codexLayout} page-enter`}>
      <CodexSidebar
        sections={codexNav}
        activeId={activeSection}
        onSelect={setActiveSection}
      />
      <main className={styles.content} key={activeSection}>
        <ActiveComponent />
      </main>
    </div>
  );
}
