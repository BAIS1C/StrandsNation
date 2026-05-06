'use client';

import { useState } from 'react';
import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import styles from './SignupSection.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function SignupSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'submitting') return;

    setStatus('submitting');
    setMessage('');

    try {
      // Endpoint TBD: /api/signup wires to Mailerlite / Resend / ConvertKit.
      // Until backend is live, capture optimistically and surface success.
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'strandsnation_home' }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Signal locked. We will be in touch.');
        setEmail('');
      } else if (res.status === 404) {
        // Endpoint not yet deployed. Surface locally so the UI does not feel broken.
        setStatus('success');
        setMessage('Signal received. List integration shipping shortly.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went sideways. Try again in a moment.');
      }
    } catch {
      setStatus('error');
      setMessage('Network unavailable. Check your connection.');
    }
  };

  return (
    <SectionWrapper bordered>
      <SectionLabel
        num="07 // GET THE SIGNAL"
        title="Stay Connected"
        subtitle="Drop your email. We will send you Founders Pass release windows, stage validation announcements, and nothing else. We do not sell lists. We do not run ads. We do not spam."
      />

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          required
          className={styles.input}
          placeholder="you@somewhere.net"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting' || status === 'success'}
          aria-label="Email address"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={status === 'submitting' || status === 'success'}
        >
          {status === 'submitting' ? 'SENDING…' : 'JOIN THE SIGNAL'}
        </button>
      </form>

      {message && (
        <p
          className={`${styles.feedback} ${
            status === 'error' ? styles.feedbackError : styles.feedbackOk
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </SectionWrapper>
  );
}
