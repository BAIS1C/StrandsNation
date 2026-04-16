'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { whitepaperChapters as chapters } from '@/data/whitepaper';
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
    <div className={`${styles.pageWrap} page-enter`}>

      {/* ─── Sidebar overlay (mobile) ─── */}
      {sidebarOpen && (
        <div
          className={`${styles.sidebarOverlay} ${styles.sidebarOverlayVisible}`}
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
          <div className={styles.sidebarMeta}>12 Chapters · V6.0</div>
        </div>

        <nav>
          {chapters.map((ch) => {
            const showPart = ch.part && ch.part !== lastPart;
            if (showPart) lastPart = ch.part;
            return (
              <div key={ch.id}>
                {showPart && (
                  <div className={styles.sidebarPart}>{ch.part}</div>
                )}
                <button
                  className={`${styles.sidebarLink} ${activeId === ch.id ? styles.sidebarLinkActive : ''}`}
                  onClick={() => scrollToChapter(ch.id)}
                >
                  <span className={styles.sidebarNum}>{ch.id}</span>
                  {ch.title}
                </button>
              </div>
            );
          })}
        </nav>

        <div className={styles.sidebarProgress}>
          <div className={styles.sidebarProgressLabel}>READING PROGRESS</div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <div className={styles.mainContent} ref={contentRef}>

        {/* Cover */}
        <div className={styles.cover}>
          <span className={styles.coverBadge}>// TECHNICAL WHITEPAPER v6.0</span>
          <h1 className={styles.coverTitle}>
            STRANDS<br />
            <span className={styles.coverAccent}>The Ecosystem</span>
          </h1>
          <p className={styles.coverSub}>
            A Decentralised Bulwark Against Techno-Feudalism. The path to equitable income.
            The complete technical specification for the STRANDS game, technology stack, and economic architecture.
          </p>
          <div className={styles.coverMeta}>
            <span className={styles.coverMetaItem}><span className={styles.dot}>◈</span> PT Meta Fin Tek</span>
            <span className={styles.coverMetaItem}><span className={styles.dot}>◈</span> Metafintek.xyz</span>
            <span className={styles.coverMetaItem}><span className={styles.dot}>◈</span> March 2026</span>
            <span className={styles.coverMetaItem}><span className={styles.dot}>◈</span> 12 Chapters</span>
          </div>
          <a
            href="/strands-whitepaper-v6.pdf"
            download="Strands_Whitepaper_V6.pdf"
            className={styles.downloadBtn}
          >
            ↓ Download PDF
          </a>
        </div>

        {/* Chapters */}
        {chapters.map((ch) => (
          <section
            key={ch.id}
            id={`ch-${ch.id}`}
            className={styles.chapterSection}
          >
            <div
              className={styles.chapterContent}
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
          className={`${styles.backToTop} ${styles.backToTopVisible}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
