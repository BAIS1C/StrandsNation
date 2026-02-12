// ═══════════════════════════════════════════════════
// CODEX TYPES
// ═══════════════════════════════════════════════════

export type CodexSectionId =
  | 'world'
  | 'timeline'
  | 'factions'
  | 'gangs'
  | 'economy'
  | 'skills'
  | 'maits'
  | 'sigops'
  | 'gameplay'
  | 'crafting'
  | 'founders';

export interface CodexNavItem {
  id: CodexSectionId;
  icon: string;
  label: string;
  group?: string;
}
