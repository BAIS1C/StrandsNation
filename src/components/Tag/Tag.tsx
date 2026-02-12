import type { ColorKey } from '@/types/design';
import styles from './Tag.module.css';

interface TagProps {
  children: string;
  variant?: ColorKey;
}

export default function Tag({ children, variant = 'cyan' }: TagProps) {
  return (
    <span className={styles.tag} data-variant={variant}>
      {children}
    </span>
  );
}
