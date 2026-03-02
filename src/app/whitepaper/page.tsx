'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { chapters } from '@/data/whitepaper-chapters';
import styles from './page.module.css';

/* ═══════════════════════════════════════════════════
   WHITEPAPER PAGE
   Sidebar-navigated, scroll-tracked, chapter-based.
   Follows the Codex sidebar layout pattern.
   ═══════════════════════════════════════════════════ */

export default function WhitepaperPage() {
  const [activeId, setActiveId] = useState(chapters[0]?.id || '01');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // ─── Scroll tracking: active chapter + progress ───
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0;
    setProgress(pct);
    setShowTop(scrollY > 500);

    // Determine which chapter is active
    const offset = 140;
    let currentId = chapters[0]?.id || '01';
    for (const ch of chapters) {
      const el = document.getElementById(`ch-${ch.id}`);
      if (el && el.offsetTop <= scrollY + offset) {
        currentId = ch.id;
      }
    }
    setActiveId(currentId);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ─── Click sidebar → scroll + close mobile ───
  const scrollToChapter = (id: string) => {
    const el = document.getElementById(`ch-${id}`);
    if (el) {
      const y = el.offsetTop - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setSidebarOpen(false);
  };

  // ─── Group chapters by part for sidebar rendering ───
  let lastPart = '';

  return (
    <div className={`${styles.layout} page-enter`}>

      {/* ─── Sidebar overlay (mobile) ─── */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Mobile sidebar toggle ─── */}
      <button
        className={styles.mobileToggle}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle contents"
      >
        ☰
      </button>

      {/* ─── Sidebar ─── */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarTitle}>Whitepaper v6.0</div>
          <div className={styles.sidebarMeta}>17 Chapters · ~60,000 words</div>
        </div>

        <nav className={styles.sidebarNav}>
          {chapters.map((ch) => {
            const showPart = ch.part && ch.part !== lastPart;
            if (showPart) lastPart = ch.part;
            return (
              <div key={ch.id}>
                {showPart && (
                  <div className={styles.group}>{ch.part}</div>
                )}
                <button
                  className={`${styles.item} ${activeId === ch.id ? styles.itemActive : ''}`}
                  onClick={() => scrollToChapter(ch.id)}
                >
                  <span className={styles.num}>{ch.id}</span>
                  {ch.title}
                </button>
              </div>
            );
          })}
        </nav>

        <div className={styles.progressWrap}>
          <div className={styles.progressLabel}>READING PROGRESS</div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <div className={styles.content} ref={contentRef}>

        {/* Cover */}
        <div className={styles.cover}>
          <span className={styles.badge}>// TECHNICAL WHITEPAPER v6.0</span>
          <h1 className={styles.coverTitle}>
            STRANDS<br />
            <span className={styles.coverAccent}>The Ecosystem</span>
          </h1>
          <p className={styles.coverSub}>
            A Decentralised Bulwark Against Techno-Feudalism — and the Path
            to Equitable Income. The complete technical specification for the
            STRANDS game, technology stack, and economic architecture.
          </p>
          <div className={styles.coverMeta}>
            <span><span className={styles.dot}>◈</span> PT Meta Fin Tek</span>
            <span><span className={styles.dot}>◈</span> Metafintek.xyz</span>
            <span><span className={styles.dot}>◈</span> March 2026</span>
            <span><span className={styles.dot}>◈</span> ~60,000 words</span>
          </div>
        </div>

        {/* Chapters */}
        {chapters.map((ch) => (
          <section
            key={ch.id}
            id={`ch-${ch.id}`}
            className={styles.chapter}
          >
            <div
              className={styles.chapterBody}
              dangerouslySetInnerHTML={{ __html: ch.html }}
            />
          </section>
        ))}

        {/* Footer */}
        <footer className={styles.footer}>
          <span className={styles.footerText}>
            © 2026 STRANDSNATION · SOMOKASANE · PT METAFINTEK
          </span>
        </footer>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
