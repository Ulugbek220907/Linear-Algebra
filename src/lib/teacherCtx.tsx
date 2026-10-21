import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export interface LessonContext {
  id: string;
  title: string;
  summary: string;
  recap: string[];
}

interface Ctx {
  open: boolean;
  setOpen: (b: boolean) => void;
  /** prefill the teacher's input and open the dock */
  ask: (prompt: string) => void;
  pending: string | null;
  clearPending: () => void;
  lesson: LessonContext | null;
  setLesson: (l: LessonContext | null) => void;
}

const TeacherCtx = createContext<Ctx | null>(null);

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [lesson, setLesson] = useState<LessonContext | null>(null);
  const ask = useCallback((p: string) => {
    setPending(p);
    setOpen(true);
  }, []);
  const clearPending = useCallback(() => setPending(null), []);
  const value = useMemo(
    () => ({ open, setOpen, ask, pending, clearPending, lesson, setLesson }),
    [open, ask, pending, clearPending, lesson]
  );
  return <TeacherCtx.Provider value={value}>{children}</TeacherCtx.Provider>;
}

export function useTeacher(): Ctx {
  const c = useContext(TeacherCtx);
  if (!c) throw new Error('useTeacher outside provider');
  return c;
}
