import styles from './CircuitBg.module.css';

export default function CircuitBg() {
  return (
    <svg className={styles.circuit} aria-hidden="true">
      <defs>
        <pattern
          id="circuit-pattern"
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M10 60h30l10-10h20l10 10h30"
            stroke="var(--c-accent)"
            fill="none"
            strokeWidth="0.5"
          />
          <path
            d="M60 10v30l-10 10v20l10 10v30"
            stroke="var(--c-pink)"
            fill="none"
            strokeWidth="0.5"
          />
          <circle cx="50" cy="60" r="2" fill="var(--c-yellow)" />
          <circle cx="60" cy="50" r="1.5" fill="var(--c-accent)" />
          <rect x="108" y="108" width="4" height="4" fill="var(--c-accent)" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
    </svg>
  );
}
