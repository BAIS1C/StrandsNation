'use client';

import type { CodexSectionId, CodexNavItem } from '@/types/codex';
import styles from './CodexSidebar.module.css';

interface CodexSidebarProps {
  sections: CodexNavItem[];
  activeId: CodexSectionId;
  onSelect: (id: CodexSectionId) => void;
}

export default function CodexSidebar({ sections, activeId, onSelect }: CodexSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      {sections.map((section) => (
        <div key={section.id}>
          {section.group && (
            <div className={styles.group}>{section.group}</div>
          )}
          <button
            className={`${styles.item} ${activeId === section.id ? styles.itemActive : ''}`}
            onClick={() => onSelect(section.id)}
          >
            <span className={styles.icon}>{section.icon}</span>
            {section.label}
          </button>
        </div>
      ))}
    </aside>
  );
}
