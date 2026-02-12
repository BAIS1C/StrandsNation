// ═══════════════════════════════════════════════════
// DESIGN SYSTEM TYPES
// ═══════════════════════════════════════════════════

export type ColorKey = 'cyan' | 'pink' | 'yellow' | 'purple' | 'red' | 'green' | 'glass';

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
  colorKey: ColorKey;
}

export type SocialId = 'telegram' | 'discord' | 'youtube' | 'x' | 'metafintek';

export type SocialsMap = Record<SocialId, SocialLink>;
