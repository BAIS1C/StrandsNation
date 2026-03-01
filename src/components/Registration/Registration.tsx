'use client';

import { useState, useCallback } from 'react';
import styles from './Registration.module.css';

interface RegistrationData {
  phone: string;
  dob: string; // ISO date string YYYY-MM-DD
}

interface RegistrationProps {
  userName: string;
  onComplete: (data: RegistrationData) => void;
}

export default function Registration({ userName, onComplete }: RegistrationProps) {
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(() => {
    setError('');

    // Basic phone validation: strip spaces/dashes, check length
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    if (cleaned.length < 8 || cleaned.length > 16) {
      setError('Enter a valid phone number with country code');
      return;
    }

    // DOB validation
    if (!dob) {
      setError('Date of birth is required');
      return;
    }

    const birthDate = new Date(dob);
    const now = new Date();
    const age = now.getFullYear() - birthDate.getFullYear();
    if (age < 13 || age > 120) {
      setError('You must be at least 13 to proceed');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      onComplete({ phone: cleaned, dob });
    }, 600);
  }, [phone, dob, onComplete]);

  return (
    <div className={styles.gate}>
      <div className={styles.panel}>
        <div className={styles.glow} />

        <div className={styles.termLines}>
          <span className={styles.termLine}>{'>'} signal_locked</span>
          <span className={styles.termLine}>{'>'} identity: {userName}</span>
          <span className={styles.termLineAccent}>{'>'} verification_required</span>
        </div>

        <h2 className={styles.title}>VERIFY YOUR SIGNAL</h2>
        <p className={styles.desc}>
          The network requires identity confirmation before establishing
          a secure channel. This data is encrypted and stored locally
          to your signal profile.
        </p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label}>COMM FREQUENCY</label>
            <input
              className={styles.input}
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+44 7700 900000"
              autoComplete="tel"
            />
            <span className={styles.hint}>Phone number with country code</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>ORIGIN TIMESTAMP</label>
            <input
              className={styles.input}
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
            <span className={styles.hint}>Date of birth — used for age verification</span>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <span className={styles.submitting}>ESTABLISHING LINK...</span>
          ) : (
            <span>CONFIRM IDENTITY</span>
          )}
        </button>

        <p className={styles.note}>
          Your data is attached to your signal profile only.
          No third-party access. No ads. No selling.
        </p>
      </div>
    </div>
  );
}
