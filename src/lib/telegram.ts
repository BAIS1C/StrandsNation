/**
 * STRANDS × Telegram Mini App Integration Layer
 * 
 * Handles: WebApp init, user auth, CloudStorage persistence,
 * haptic feedback, theme sync, and viewport management.
 * 
 * This is the ONLY file that touches window.Telegram.
 * Everything else imports from here.
 */

// ═══ TYPES ═══

export interface TGUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface TGWebApp {
  initData: string;               // raw init data string for server validation
  initDataUnsafe: {
    user?: TGUser;
    auth_date: number;
    hash: string;
    query_id?: string;
    start_param?: string;         // deep link param from t.me/bot?startapp=X
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  
  ready: () => void;
  expand: () => void;
  close: () => void;
  
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    setText: (text: string) => void;
    enable: () => void;
    disable: () => void;
  };
  
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
  
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  
  CloudStorage: {
    setItem: (key: string, value: string, callback?: (err: any, ok?: boolean) => void) => void;
    getItem: (key: string, callback: (err: any, value?: string) => void) => void;
    getItems: (keys: string[], callback: (err: any, values?: Record<string, string>) => void) => void;
    removeItem: (key: string, callback?: (err: any, ok?: boolean) => void) => void;
    getKeys: (callback: (err: any, keys?: string[]) => void) => void;
  };
  
  showPopup: (params: {
    title?: string;
    message: string;
    buttons?: Array<{ id?: string; type?: string; text?: string }>;
  }, callback?: (buttonId: string) => void) => void;
  
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
  
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  openTelegramLink: (url: string) => void;
  
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TGWebApp;
    };
  }
}

// ═══ DETECTION ═══

/** Is this running inside a TG Mini App webview? */
export function isTelegramMiniApp(): boolean {
  return typeof window !== 'undefined' && !!window.Telegram?.WebApp?.initData;
}

/** Get the TG WebApp instance (null if not in TG) */
export function getTG(): TGWebApp | null {
  if (!isTelegramMiniApp()) return null;
  return window.Telegram!.WebApp;
}

/** Get the authenticated TG user (null if not in TG or no user) */
export function getTGUser(): TGUser | null {
  return getTG()?.initDataUnsafe?.user ?? null;
}

// ═══ INIT ═══

/**
 * Initialize the Mini App. Call this once on mount.
 * - Tells TG we're ready
 * - Expands to full viewport
 * - Sets dark theme colors
 * - Returns the user or null
 */
export function initMiniApp(): TGUser | null {
  const tg = getTG();
  if (!tg) return null;

  tg.ready();
  tg.expand();
  tg.setHeaderColor('#010204');
  tg.setBackgroundColor('#010204');

  return tg.initDataUnsafe.user ?? null;
}

// ═══ AUTH VALIDATION ═══

/**
 * Validate initData server-side and create/retrieve playerID.
 * The server checks the HMAC hash against the bot token.
 */
export async function validateAuth(): Promise<{
  playerID: string;
  tgID: number;
  firstName: string;
  username?: string;
} | null> {
  const tg = getTG();
  if (!tg?.initData) return null;

  try {
    const res = await fetch('/api/auth/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData: tg.initData }),
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ═══ CLOUD STORAGE (promisified) ═══

/** Save a value to TG CloudStorage (cross-device persistent) */
export function cloudSet(key: string, value: string): Promise<boolean> {
  return new Promise((resolve) => {
    const tg = getTG();
    if (!tg) { resolve(false); return; }
    tg.CloudStorage.setItem(key, value, (err) => resolve(!err));
  });
}

/** Get a value from TG CloudStorage */
export function cloudGet(key: string): Promise<string | null> {
  return new Promise((resolve) => {
    const tg = getTG();
    if (!tg) { resolve(null); return; }
    tg.CloudStorage.getItem(key, (err, val) => resolve(err ? null : val ?? null));
  });
}

/** Get multiple values from TG CloudStorage */
export function cloudGetMulti(keys: string[]): Promise<Record<string, string>> {
  return new Promise((resolve) => {
    const tg = getTG();
    if (!tg) { resolve({}); return; }
    tg.CloudStorage.getItems(keys, (err, vals) => resolve(err ? {} : vals ?? {}));
  });
}

/** Remove a key from TG CloudStorage */
export function cloudRemove(key: string): Promise<boolean> {
  return new Promise((resolve) => {
    const tg = getTG();
    if (!tg) { resolve(false); return; }
    tg.CloudStorage.removeItem(key, (err) => resolve(!err));
  });
}

/** List all keys in TG CloudStorage */
export function cloudKeys(): Promise<string[]> {
  return new Promise((resolve) => {
    const tg = getTG();
    if (!tg) { resolve([]); return; }
    tg.CloudStorage.getKeys((err, keys) => resolve(err ? [] : keys ?? []));
  });
}

// ═══ HAPTIC FEEDBACK ═══

export function hapticLight() { getTG()?.HapticFeedback.impactOccurred('light'); }
export function hapticMedium() { getTG()?.HapticFeedback.impactOccurred('medium'); }
export function hapticHeavy() { getTG()?.HapticFeedback.impactOccurred('heavy'); }
export function hapticSuccess() { getTG()?.HapticFeedback.notificationOccurred('success'); }
export function hapticError() { getTG()?.HapticFeedback.notificationOccurred('error'); }
export function hapticSelect() { getTG()?.HapticFeedback.selectionChanged(); }

// ═══ NAVIGATION ═══

export function closeMiniApp() { getTG()?.close(); }
export function openExternal(url: string) { getTG()?.openLink(url); }
export function openTGLink(url: string) { getTG()?.openTelegramLink(url); }

// ═══ MAIN BUTTON ═══

export function showMainButton(text: string, onClick: () => void) {
  const tg = getTG();
  if (!tg) return;
  tg.MainButton.setText(text);
  tg.MainButton.onClick(onClick);
  tg.MainButton.show();
}

export function hideMainButton() {
  getTG()?.MainButton.hide();
}

// ═══ BACK BUTTON ═══

export function showBackButton(onClick: () => void) {
  const tg = getTG();
  if (!tg) return;
  tg.BackButton.onClick(onClick);
  tg.BackButton.show();
}

export function hideBackButton() {
  getTG()?.BackButton.hide();
}
