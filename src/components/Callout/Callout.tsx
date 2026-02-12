import type { ColorKey } from '@/types/design';
import styles from './Callout.module.css';

interface CalloutProps {
  label: string;
  text: string;
  variant?: ColorKey;
}

export default function Callout({ label, text, variant = 'cyan' }: CalloutProps) {
  return (
    <div className={styles.callout} data-variant={variant}>
      <div className={styles.label}>{label}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
