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
  | 'layeru'
  | 'gameplay'
  | 'seasons'
  | 'crafting'
  | 'founders';

export interface CodexNavItem {
  id: CodexSectionId;
  icon: string;
  label: string;
  group?: string;
}
