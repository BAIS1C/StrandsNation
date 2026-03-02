'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Nav.module.css';

const bookUrl = 'https://www.amazon.com/dp/B0GFXPP9Y6';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/codex', label: 'CODEX' },
  { href: '/game', label: 'GAME' },
  { href: '/network', label: 'NETWORK' },
  { href: '/manifesto', label: 'MANIFESTO' },
  { href: '/whitepaper', label: 'WHITEPAPER' },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.nav}>
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

      {/* Mobile toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <span className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`} />
      </button>

      {/* Links */}
      <div className={`${styles.links} ${mobileOpen ? styles.linksOpen : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${pathname === link.href ? styles.linkActive : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={bookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          BOOK
        </a>
      </div>
    </nav>
  );
}
