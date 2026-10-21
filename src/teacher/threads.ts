import { useSyncExternalStore } from 'react';
import { createStore } from '../lib/store';

export interface ChatMsg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hadImage?: boolean;
  image?: string;
  error?: string;
  ts: number;
}

export interface Thread {
  id: string;
  title: string;
  lessonId?: string;
  messages: ChatMsg[];
  updated: number;
}

interface State {
  threads: Thread[];
}

const store = createStore<State>('la.threads.v1', { threads: [] }, (s) => ({
  threads: s.threads.slice(0, 20).map((t) => ({
    ...t,
    messages: t.messages.slice(-60).map(({ image, ...m }) => m),
  })),
}));

export const useThreads = () => useSyncExternalStore(store.subscribe, store.get).threads;
export const getThreads = () => store.get().threads;
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

export function createThread(lessonId?: string): Thread {
  const t: Thread = { id: uid(), title: 'New chat', lessonId, messages: [], updated: Date.now() };
  store.set((s) => ({ threads: [t, ...s.threads] }));
  return t;
}

export function updateThread(id: string, fn: (t: Thread) => Thread) {
  store.set((s) => ({
    threads: s.threads
      .map((t) => (t.id === id ? { ...fn(t), updated: Date.now() } : t))
      .sort((a, b) => b.updated - a.updated),
  }));
}

export function deleteThread(id: string) {
  store.set((s) => ({ threads: s.threads.filter((t) => t.id !== id) }));
}

export function clearThreads() {
  store.set({ threads: [] });
}

export function findLessonThread(lessonId: string): Thread | undefined {
  return store.get().threads.find((t) => t.lessonId === lessonId);
}
