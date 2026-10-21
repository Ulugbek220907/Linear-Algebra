import { useSyncExternalStore } from 'react';

/** Tiny localStorage-backed stores. Everything is wrapped in try/catch: private windows can throw. */

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function createStore<T extends object>(key: string, initial: T, persist?: (v: T) => unknown) {
  let state: T = read(key, initial);
  const listeners = new Set<() => void>();
  return {
    get: () => state,
    set(patch: Partial<T> | ((s: T) => Partial<T>)) {
      const p = typeof patch === 'function' ? patch(state) : patch;
      state = { ...state, ...p };
      write(key, persist ? persist(state) : state);
      listeners.forEach((l) => l());
    },
    subscribe(l: () => void) {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    reset() {
      state = initial;
      try {
        localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
      listeners.forEach((l) => l());
    },
  };
}

/* ---------------- progress ---------------- */

export interface Progress {
  /** lesson id -> timestamp when marked done */
  done: Record<string, number>;
  /** lesson id -> best quiz score */
  quiz: Record<string, { best: number; total: number }>;
  /** question id -> how many times missed (cleared when answered right in practice) */
  wrong: Record<string, number>;
  /** question id -> answered correctly at least once */
  right: Record<string, number>;
  last?: string;
}
export const progressStore = createStore<Progress>('la.progress.v1', { done: {}, quiz: {}, wrong: {}, right: {} });
export function useProgress(): Progress {
  return useSyncExternalStore(progressStore.subscribe, progressStore.get);
}
export const markDone = (id: string, on = true) =>
  progressStore.set((s) => {
    const done = { ...s.done };
    if (on) done[id] = Date.now();
    else delete done[id];
    return { done };
  });
export const setLast = (id: string) => progressStore.set({ last: id });
export const recordQuiz = (id: string, score: number, total: number) =>
  progressStore.set((s) => {
    const prev = s.quiz[id];
    return { quiz: { ...s.quiz, [id]: { best: Math.max(prev?.best ?? 0, score), total } } };
  });
export const recordAnswer = (qid: string, ok: boolean) =>
  progressStore.set((s) => {
    const wrong = { ...s.wrong };
    const right = { ...s.right };
    if (ok) {
      right[qid] = (right[qid] ?? 0) + 1;
      if (wrong[qid]) delete wrong[qid];
    } else wrong[qid] = (wrong[qid] ?? 0) + 1;
    return { wrong, right };
  });

/* ---------------- settings ---------------- */

export interface Settings {
  theme: 'system' | 'light' | 'dark';
  apiKey: string;
  remember: boolean;
  model: string;
  baseUrl: string;
  language: 'auto' | 'English' | "O'zbek" | 'Русский';
  mode: 'explain' | 'guide' | 'solve' | 'quiz';
}
const defaults: Settings = {
  theme: 'system',
  apiKey: '',
  remember: true,
  model: 'openrouter/auto',
  baseUrl: 'https://openrouter.ai/api/v1',
  language: 'auto',
  mode: 'explain',
};
export const settingsStore = createStore<Settings>('la.settings.v1', defaults, (s) => ({
  ...s,
  apiKey: s.remember ? s.apiKey : '',
}));
try {
  const sk = sessionStorage.getItem('la.key');
  if (sk && !settingsStore.get().apiKey) settingsStore.set({ apiKey: sk });
} catch {
  /* ignore */
}
export function useSettings(): Settings {
  return useSyncExternalStore(settingsStore.subscribe, settingsStore.get);
}
export function saveApiKey(key: string, remember: boolean) {
  try {
    if (!remember && key) sessionStorage.setItem('la.key', key);
    else sessionStorage.removeItem('la.key');
  } catch {
    /* ignore */
  }
  settingsStore.set({ apiKey: key, remember });
}

export function applyTheme(t: Settings['theme']) {
  const el = document.documentElement;
  if (t === 'system') el.removeAttribute('data-theme');
  else el.setAttribute('data-theme', t);
  try {
    localStorage.setItem('la.theme', t);
  } catch {
    /* ignore */
  }
}
