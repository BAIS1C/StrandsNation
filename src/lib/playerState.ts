/**
 * STRANDS Player State Manager
 * 
 * Unified persistence layer. Inside TG Mini App → CloudStorage.
 * In browser → localStorage. Same API either way.
 * 
 * State shape mirrors the desktop icon unlock progression:
 * auth → voice → quiz → arcade → mymories
 */

import {
  isTelegramMiniApp,
  cloudSet,
  cloudGet,
  cloudGetMulti,
  type TGUser,
} from './telegram';

// ═══ TYPES ═══

export interface PlayerProfile {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
}

export interface NKQScores {
  speed: number;
  pattern: number;
  memory: number;
}

export interface Mymory {
  id: string;
  type: 'profile' | 'voice_consent' | 'arcade_score' | 'circuit_sync' | 'proper_gander' | 'custom';
  label: string;
  content: string;         // JSON string of the shard data
  createdAt: string;       // ISO timestamp
  version: number;
}

export type IconState = 'locked' | 'available' | 'active' | 'complete';

export interface PlayerState {
  // Auth
  playerID: string | null;
  tgUser: TGUser | null;
  authed: boolean;

  // Progression
  consentLevel: 0 | 1 | 2 | 3;   // 0 = not done, 1-3 = tiers
  quizState: 'not_started' | 'in_progress' | 'complete';
  quizScene: number;               // 0-5 (last completed scene)
  profile: PlayerProfile | null;
  nkq: NKQScores | null;
  choices: string[];

  // Games
  arcadeHighScore: number;
  circuitSyncTier: number;

  // Proper Gander
  fragmentsUnlocked: number[];     // [0,1,2,...] indices of unlocked fragments

  // Mymories
  mymories: Mymory[];
}

const DEFAULT_STATE: PlayerState = {
  playerID: null,
  tgUser: null,
  authed: false,
  consentLevel: 0,
  quizState: 'not_started',
  quizScene: 0,
  profile: null,
  nkq: null,
  choices: [],
  arcadeHighScore: 0,
  circuitSyncTier: 0,
  fragmentsUnlocked: [0],  // Fragment 0 (cold open) is always unlocked
  mymories: [],
};

// ═══ STORAGE KEYS ═══

const KEYS = {
  playerID: 'strands_pid',
  authed: 'strands_authed',
  consent: 'strands_consent',
  quizState: 'strands_quiz',
  quizScene: 'strands_scene',
  profile: 'strands_profile',
  nkq: 'strands_nkq',
  choices: 'strands_choices',
  arcadeHigh: 'strands_arcade_high',
  circuitTier: 'strands_circuit_tier',
  fragments: 'strands_fragments',
  mymories: 'strands_mymories_index',
} as const;

// ═══ LOW-LEVEL STORAGE (adapts to environment) ═══

async function storageSet(key: string, value: string): Promise<void> {
  if (isTelegramMiniApp()) {
    await cloudSet(key, value);
  } else {
    try { localStorage.setItem(key, value); } catch {}
  }
}

async function storageGet(key: string): Promise<string | null> {
  if (isTelegramMiniApp()) {
    return await cloudGet(key);
  } else {
    try { return localStorage.getItem(key); } catch { return null; }
  }
}

async function storageGetMulti(keys: string[]): Promise<Record<string, string>> {
  if (isTelegramMiniApp()) {
    return await cloudGetMulti(keys);
  } else {
    const result: Record<string, string> = {};
    for (const k of keys) {
      try {
        const v = localStorage.getItem(k);
        if (v !== null) result[k] = v;
      } catch {}
    }
    return result;
  }
}

// ═══ STATE MANAGER ═══

let _state: PlayerState = { ...DEFAULT_STATE };

/** Get current state (read-only snapshot) */
export function getState(): Readonly<PlayerState> {
  return _state;
}

/** Load state from storage. Call once on init. */
export async function loadState(): Promise<PlayerState> {
  const vals = await storageGetMulti(Object.values(KEYS));

  _state = {
    ..._state,
    playerID: vals[KEYS.playerID] || null,
    authed: vals[KEYS.authed] === '1',
    consentLevel: (parseInt(vals[KEYS.consent] || '0') as 0 | 1 | 2 | 3),
    quizState: (vals[KEYS.quizState] as PlayerState['quizState']) || 'not_started',
    quizScene: parseInt(vals[KEYS.quizScene] || '0'),
    profile: vals[KEYS.profile] ? JSON.parse(vals[KEYS.profile]) : null,
    nkq: vals[KEYS.nkq] ? JSON.parse(vals[KEYS.nkq]) : null,
    choices: vals[KEYS.choices] ? JSON.parse(vals[KEYS.choices]) : [],
    arcadeHighScore: parseInt(vals[KEYS.arcadeHigh] || '0'),
    circuitSyncTier: parseInt(vals[KEYS.circuitTier] || '0'),
    fragmentsUnlocked: vals[KEYS.fragments] ? JSON.parse(vals[KEYS.fragments]) : [0],
    mymories: vals[KEYS.mymories] ? JSON.parse(vals[KEYS.mymories]) : [],
  };

  return _state;
}

// ═══ STATE SETTERS (each persists immediately) ═══

export async function setAuthed(playerID: string, tgUser: TGUser) {
  _state.playerID = playerID;
  _state.tgUser = tgUser;
  _state.authed = true;
  await storageSet(KEYS.playerID, playerID);
  await storageSet(KEYS.authed, '1');
}

export async function setConsent(level: 1 | 2 | 3) {
  _state.consentLevel = level;
  await storageSet(KEYS.consent, String(level));
}

export async function setQuizProgress(scene: number) {
  _state.quizState = 'in_progress';
  _state.quizScene = scene;
  await storageSet(KEYS.quizState, 'in_progress');
  await storageSet(KEYS.quizScene, String(scene));
}

export async function completeQuiz(profile: PlayerProfile, nkq: NKQScores, choices: string[]) {
  _state.quizState = 'complete';
  _state.profile = profile;
  _state.nkq = nkq;
  _state.choices = choices;
  await storageSet(KEYS.quizState, 'complete');
  await storageSet(KEYS.profile, JSON.stringify(profile));
  await storageSet(KEYS.nkq, JSON.stringify(nkq));
  await storageSet(KEYS.choices, JSON.stringify(choices));

  // Auto-create profile Mymory shard
  await addMymory({
    type: 'profile',
    label: 'Signal Profile',
    content: JSON.stringify({ profile, nkq, choices }),
  });
}

export async function setArcadeScore(score: number) {
  if (score > _state.arcadeHighScore) {
    _state.arcadeHighScore = score;
    await storageSet(KEYS.arcadeHigh, String(score));
  }
}

export async function setCircuitSyncTier(tier: number) {
  _state.circuitSyncTier = tier;
  await storageSet(KEYS.circuitTier, String(tier));
}

export async function unlockFragment(index: number) {
  if (!_state.fragmentsUnlocked.includes(index)) {
    _state.fragmentsUnlocked.push(index);
    _state.fragmentsUnlocked.sort((a, b) => a - b);
    await storageSet(KEYS.fragments, JSON.stringify(_state.fragmentsUnlocked));
  }
}

export async function addMymory(data: Omit<Mymory, 'id' | 'createdAt' | 'version'>): Promise<Mymory> {
  const mymory: Mymory = {
    ...data,
    id: `mym_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
    version: 1,
  };
  _state.mymories.push(mymory);
  await storageSet(KEYS.mymories, JSON.stringify(_state.mymories));
  return mymory;
}

// ═══ ICON STATE DERIVATION ═══

export function getIconStates(): Record<string, IconState> {
  const s = _state;
  return {
    signalReg:    s.authed ? 'complete' : 'available',
    voiceSync:    !s.authed ? 'locked' : s.consentLevel > 0 ? 'complete' : 'available',
    messages:     s.consentLevel === 0 ? 'locked' : s.quizState === 'complete' ? 'complete' : 'available',
    document:     s.quizState === 'not_started' ? 'locked' : 'available',
    arcade2042:   s.quizState !== 'complete' ? 'locked' : 'available',
    circuitSync:  s.quizState !== 'complete' ? 'locked' : 'available',
    properGander: s.fragmentsUnlocked.length <= 1 ? 'locked' : 'available',
    mymories:     'available',  // Always visible — grows over time
  };
}
