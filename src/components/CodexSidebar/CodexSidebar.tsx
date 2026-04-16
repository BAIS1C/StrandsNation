'use client';

import type { CodexSectionId, CodexNavItem } from '@/types/codex';
import styles from './CodexSidebar.module.css';

interface CodexSidebarProps {
  sections: CodexNavItem[];
  activeId: CodexSectionId;
  onSelect: (id: CodexSectionId) => void;
  embed?: boolean;
}

export default function CodexSidebar({ sections, activeId, onSelect, embed }: CodexSidebarProps) {
  /* In embed mode, override sticky top & height so sidebar fills iframe edge-to-edge */
  const embedStyle: React.CSSProperties | undefined = embed
    ? { top: 0, height: '100vh' }
    : undefined;

  return (
    <aside className={styles.sidebar} style={embedStyle}>
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
