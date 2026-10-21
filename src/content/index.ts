import type { Chapter, Lesson, Question } from './types';
import { ch1 } from './ch1';
import { ch2 } from './ch2';
import { ch3 } from './ch3';
import { ch4 } from './ch4';
import { ch5 } from './ch5';
import { ch6 } from './ch6';
import { ch7 } from './ch7';
import { ch8 } from './ch8';

export const chapters: Chapter[] = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8];

export const allLessons: Lesson[] = chapters.flatMap((c) => c.lessons);
export const lessonById = (id: string): Lesson | undefined => allLessons.find((l) => l.id === id);
export const chapterOf = (l: Lesson): Chapter => chapters.find((c) => c.n === l.chapter)!;
export function neighbors(id: string): { prev?: Lesson; next?: Lesson } {
  const i = allLessons.findIndex((l) => l.id === id);
  return { prev: allLessons[i - 1], next: allLessons[i + 1] };
}

export interface BankQuestion {
  q: Question;
  lessonId: string;
  chapter: number;
}
export const questionBank: BankQuestion[] = allLessons.flatMap((l) =>
  l.quiz.map((q) => ({ q, lessonId: l.id, chapter: l.chapter }))
);

export * from './types';
export * from './formulas';
export * from './homework';
