import type { ColorKey } from '@/types/design';
import styles from './Callout.module.css';

interface CalloutProps {
  label: string;
  text: string;
  variant?: ColorKey;
  href?: string;
}

export default function Callout({ label, text, variant = 'cyan', href }: CalloutProps) {
  const content = (
    <div className={styles.callout} data-variant={variant}>
      <div className={styles.label}>{label}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.calloutLink}
      >
        {content}
      </a>
    );
  }

  return content;
}
