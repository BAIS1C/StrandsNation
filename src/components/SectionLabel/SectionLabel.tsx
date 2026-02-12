import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  num: string;
  title: string;
  subtitle?: string;
}

export default function SectionLabel({ num, title, subtitle }: SectionLabelProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.num}>{num}</span>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
