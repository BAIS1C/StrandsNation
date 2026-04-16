import { redirect } from 'next/navigation';

/**
 * /sync → redirect to the game client.
 * The sync/desktop experience has moved to game.strandsnation.xyz.
 */
export default function SyncRedirect() {
  redirect('https://game.strandsnation.xyz');
}
