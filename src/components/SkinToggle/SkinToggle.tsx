'use client';

/* ═══════════════════════════════════════════════════
   EWDS · SKIN TOGGLE
   Three-chip switcher. Swaps body.dataset.skin, persists
   to localStorage('ew-skin'). Keybind: Ctrl/⌘+K then S.
   Uses .ew-skin-toggle primitive from components.css —
   module.css here is layout-only.
   ═══════════════════════════════════════════════════ */

import { useEffect, useState } from 'react';
import styles from './SkinToggle.module.css';

type Skin = 'classic' | 'refined' | 'terminal';

const SKINS: { id: Skin; label: string; title: string }[] = [
  { id: 'classic',  label: 'CLASSIC',  title: 'Cyberpunk glass · cyan · TL+BR bevel' },
  { id: 'refined',  label: 'REFINED',  title: 'Lower-chroma · calmer · long-session OS' },
  { id: 'terminal', label: 'TERMINAL', title: 'Industrial studio tool · amber · 0px corners' },
];

export default function SkinToggle() {
  const [skin, setSkin] = useState<Skin>('classic');
  const [armed, setArmed] = useState(false);

  // Hydrate from localStorage (the inline boot script in <head> already
  // swapped body.dataset.skin pre-paint; this just syncs React state).
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ew-skin') as Skin | null;
      if (stored && SKINS.some(s => s.id === stored)) setSkin(stored);
    } catch {}
  }, []);

  // Keybind: Ctrl/⌘+K then S cycles classic → refined → terminal → classic.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setArmed(true);
        setTimeout(() => setArmed(false), 1500);
        return;
      }
      if (armed && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setArmed(false);
        const next: Skin =
          skin === 'classic' ? 'refined' : skin === 'refined' ? 'terminal' : 'classic';
        apply(next);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [armed, skin]);

  function apply(next: Skin) {
    setSkin(next);
    if (typeof document !== 'undefined') {
      document.body.dataset.skin = next;
    }
    try {
      localStorage.setItem('ew-skin', next);
    } catch {}
  }

  return (
    <div className={styles.wrap} role="group" aria-label="Skin selector">
      <div className="ew-skin-toggle">
        {SKINS.map(s => (
          <button
            key={s.id}
            type="button"
            title={s.title}
            aria-pressed={skin === s.id}
            data-active={skin === s.id ? 'true' : 'false'}
            onClick={() => apply(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      {armed && <span className={styles.hint} aria-hidden="true">press S</span>}
    </div>
  );
}
