import { redirect } from 'next/navigation';

/**
 * /app → redirect to the game client.
 * The TG Mini App now lives at game.strandsnation.xyz.
 */
export default function AppRedirect() {
  redirect('https://game.strandsnation.xyz');
}
