// ═══════════════════════════════════════════════════
// SHARED DATA TYPES
// ═══════════════════════════════════════════════════

import type { ColorKey } from './design';

export interface TimelineEntry {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  colorKey: ColorKey;
  active?: boolean;
}

export interface TierEntry {
  label: string;
  count: string;
  colorKey: ColorKey;
}

export interface FactionEntry {
  name: string;
  description: string;
  colorKey: ColorKey;
}

export interface GangEntry {
  name: string;
  description: string;
  colorKey: ColorKey;
}

export interface SkillPath {
  title: string;
  colorKey: ColorKey;
  description?: string;
  skills: Array<{
    title: string;
    body: string;
    colorKey: ColorKey;
  }>;
  columns?: number;
}

export interface SeasonEntry {
  id: string;
  title: string;
  body: string;
  colorKey: ColorKey;
}

export interface MiniData {
  title: string;
  body: string;
  colorKey: ColorKey;
}
