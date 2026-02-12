import type { ReactNode } from 'react';
import styles from './SectionWrapper.module.css';

interface SectionWrapperProps {
  children: ReactNode;
  bordered?: boolean;
  narrow?: boolean;
  className?: string;
}

export default function SectionWrapper({
  children,
  bordered = false,
  narrow = false,
  className = '',
}: SectionWrapperProps) {
  return (
    <section
      className={`${styles.section} ${bordered ? styles.bordered : ''} ${narrow ? styles.narrow : ''} ${className}`}
    >
      {children}
    </section>
  );
}
