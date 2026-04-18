// ═══════════════════════════════════════════════════
// DESIGN SYSTEM TYPES
// ═══════════════════════════════════════════════════

export type ColorKey = 'cyan' | 'pink' | 'yellow' | 'purple' | 'red' | 'green' | 'glass';

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
  colorKey: ColorKey;
  /** optional small caption rendered under the label (e.g. channel handle) */
  handle?: string;
}

export type SocialId =
  | 'telegram'
  | 'discord'
  | 'x'
  | 'youtube_strands'
  | 'youtube_basic'
  | 'studio';

export type SocialsMap = Record<SocialId, SocialLink>;

export type PartnerId = 'metafintek';
export type PartnersMap = Record<PartnerId, SocialLink>;
