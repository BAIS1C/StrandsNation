import type { ColorKey } from '@/types/design';
import styles from './Mini.module.css';

interface MiniProps {
  title: string;
  body: string;
  variant?: ColorKey;
}

export default function Mini({ title, body, variant = 'cyan' }: MiniProps) {
  return (
    <div className={styles.mini} data-variant={variant}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
    </div>
  );
}
