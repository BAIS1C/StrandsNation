import type { ReactNode } from 'react';

/**
 * Wraps {children} in <main>.
 * Music player is now in the Nav bar — no bottom padding needed.
 */
export default function MainWrapper({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
