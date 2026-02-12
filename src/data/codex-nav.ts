import type { CodexNavItem } from '@/types/codex';

export const codexNav: CodexNavItem[] = [
  { id: 'world',    icon: '◈', label: 'MetaXity1',       group: 'WORLD' },
  { id: 'timeline', icon: '◇', label: 'Timeline' },
  { id: 'factions', icon: '▽', label: 'Factions' },
  { id: 'gangs',    icon: '▽', label: 'Block Gangs' },
  { id: 'economy',  icon: '◆', label: 'Economy',         group: 'SYSTEMS' },
  { id: 'skills',   icon: '△', label: 'Tri-Path Skills' },
  { id: 'maits',    icon: '⬡', label: 'Maits & Memory' },
  { id: 'sigops',   icon: '⊞', label: 'SIGOPS' },
  { id: 'gameplay', icon: '▷', label: 'Core Loop',       group: 'GAMEPLAY' },
  { id: 'crafting', icon: '⊕', label: 'Crafting & Loot' },
  { id: 'founders', icon: '★', label: 'Founders Pass' },
];
