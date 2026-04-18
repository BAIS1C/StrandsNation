'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';
import styles from './Nav.module.css';

const navLinks = [
  { href: '/', label: 'HOME', external: false },
  { href: '/codex', label: 'CODEX', external: false },
  { href: '/everywear', label: 'EVERYWEAR', external: false },
  { href: '/s3', label: 'S\u00B3', external: false },
  { href: '/game', label: 'PLAY', external: false },
  { href: '/network', label: 'NETWORK', external: false },
  { href: '/philosophy', label: 'PHILOSOPHY', external: false },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Hide nav entirely when embedded in an iframe (demoOS etc.) */
  if (searchParams?.get('embed') === 'true') return null;

  return (
    <nav className={styles.nav}>
      {/* Column 1: Logo */}
      <Link href="/" className={styles.logo}>
        <img
          src="/strands-logo-color.svg"
          alt="Strands Nation"
          className={styles.logoIcon}
          width={28}
          height={28}
        />
        <span className={styles.logoText}>
          STRANDS<span className={styles.logoAccent}>NATION</span>
        </span>
      </Link>

      {/* Column 2: Player (centred) */}
      <div className={styles.playerSlot}>
        <MusicPlayer />
      </div>

      {/* Column 3: Links + mobile toggle */}
      <div className={styles.rightSlot}>
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`} />
        </button>

        <div className={`${styles.links} ${mobileOpen ? styles.linksOpen : ''}`}>
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${pathname === link.href ? styles.linkActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
