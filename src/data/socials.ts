import type { SocialsMap, EcosystemMap, PartnersMap } from '@/types/design';

export const bookUrl = 'https://www.amazon.com/dp/B0GFXPP9Y6';

export const socials: SocialsMap = {
  telegram:        { label: 'TELEGRAM',   url: 'https://t.me/+WZTkHqJjUOI3YjQ1',          icon: '✈', colorKey: 'cyan',   handle: 'STRANDS NATION' },
  discord:         { label: 'DISCORD',    url: 'https://discord.gg/v7WdD94UXK',           icon: '⬡', colorKey: 'purple', handle: 'STRANDS NATION' },
  x:               { label: 'X',          url: 'https://x.com/strandsnation',             icon: '✕', colorKey: 'cyan',   handle: '@strandsnation' },
  youtube_strands: { label: 'YOUTUBE',    url: 'https://www.youtube.com/@strandsnation',  icon: '▷', colorKey: 'red',    handle: '@strandsnation' },
  youtube_basic:   { label: 'YOUTUBE',    url: 'https://www.youtube.com/@B4SICAI',        icon: '▷', colorKey: 'red',    handle: '@B4SICAI' },
};

export const ecosystem: EcosystemMap = {
  everywear: { label: 'EVERYWEAR',  url: 'https://everywear.id',   icon: '⬢', colorKey: 'cyan',  handle: 'everywear.id'  },
  s3studio:  { label: 'S³ STUDIO',  url: 'https://s3studio.xyz',   icon: '♬', colorKey: 'green', handle: 's3studio.xyz'  },
};

export const partners: PartnersMap = {
  somokasane: { label: 'SOMO KASANE', url: 'https://somokasane.com',  icon: '◎', colorKey: 'pink',   handle: 'somokasane.com' },
  metafintek: { label: 'METAFINTEK',  url: 'https://metafintek.xyz', icon: '◈', colorKey: 'yellow', handle: 'metafintek.xyz' },
};
