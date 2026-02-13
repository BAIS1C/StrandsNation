'use client';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

const GlobalMuteToggle = () => {
  const { muted, toggleMute } = useAudioPlayer();

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 p-3 bg-black/60 backdrop-blur rounded-full hover:bg-black/80 transition"
    >
      {muted ? <SpeakerXMarkIcon className="w-7 h-7 text-white" /> : <SpeakerWaveIcon className="w-7 h-7 text-white" />}
    </button>
  );
};

export default GlobalMuteToggle;
