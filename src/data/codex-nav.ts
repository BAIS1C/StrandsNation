import type { CodexNavItem } from '@/types/codex';

export const codexNav: CodexNavItem[] = [
  { id: 'world',     icon: '◈', label: 'MetaXity1',        group: 'WORLD' },
  { id: 'timeline',  icon: '◇', label: 'Timeline' },
  { id: 'factions',  icon: '▽', label: 'Factions' },
  { id: 'gangs',     icon: '▽', label: 'Block Gangs' },
  { id: 'economy',   icon: '◆', label: 'Economy',          group: 'SYSTEMS' },
  { id: 'skills',    icon: '△', label: 'Operator Paths' },
  { id: 'maits',     icon: '⬡', label: 'My Maits' },
  { id: 'sigops',    icon: '⊞', label: 'SIGOPS' },
  { id: 'everywear', icon: '◎', label: 'EveryWear' },
  { id: 'layeru',    icon: '◉', label: 'Layer U' },
  { id: 'gameplay',  icon: '▷', label: 'Core Loop',        group: 'GAMEPLAY' },
  { id: 'seasons',   icon: '⟐', label: 'Seasons' },
  { id: 'crafting',  icon: '⊕', label: 'Crafting & Loot' },
  { id: 'founders',  icon: '★', label: 'Founders Pass' },
];
