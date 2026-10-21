/** Rich text: $inline math$, **bold**, *italic*, `code`, {{term|definition}}, [[2.4]] or [[2.4|label]] lesson links. */
export type Rich = string;

export interface McQuestion {
  id: string;
  type: 'mc';
  q: Rich;
  boardPhoto?: string;
  options: Rich[];
  /** index of the correct option */
  answer: number;
  why: Rich;
  hint?: Rich;
  /** lesson ids to review when missed */
  review?: string[];
}

export interface NumQuestion {
  id: string;
  type: 'num';
  q: Rich;
  boardPhoto?: string;
  answer: number;
  unit?: string;
  /** relative tolerance (default 1 %) */
  tol?: number;
  /** absolute tolerance, wins over tol when set */
  abs?: number;
  why: Rich;
  hint?: Rich;
  review?: string[];
}

export type Question = McQuestion | NumQuestion;

export type CalloutKind = 'idea' | 'note' | 'trap' | 'why' | 'slide' | 'try';

export interface Step {
  /** what we do and why, in words */
  say: Rich;
  /** equation lines shown under the words */
  math?: string | string[];
  /** elements to highlight */
  hl?: string[];
}

export type WidgetId =
  | 'matrixExplorer'
  | 'rrefStepper'
  | 'trafficFlowLab'
  | 'vectorSpanLab'
  | 'determinantLab'
  | 'cramerSolver'
  | 'luDecomposer'
  | 'axiomTester';

export type Block =
  | { t: 'p'; text: Rich }
  | { t: 'h2'; text: string; id?: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: Rich[] }
  | { t: 'ol'; items: Rich[] }
  | { t: 'formula'; title?: string; tex: string[]; note?: Rich }
  | { t: 'callout'; kind: CalloutKind; title?: string; text: Rich | Rich[] }
  | { t: 'board'; photo: string; caption?: Rich; note?: Rich; badge?: string }
  | {
      t: 'example';
      title: string;
      source?: string;
      problem: Rich;
      boardPhoto?: string;
      steps: Step[];
      answer: Rich;
    }
  | { t: 'table'; head: Rich[]; rows: Rich[][]; caption?: string }
  | { t: 'widget'; id: WidgetId; title?: string }
  | { t: 'check'; q: Question }
  | { t: 'steps'; title?: string; items: { title: string; text: Rich }[] }
  | { t: 'compare'; left: { title: string; items: Rich[] }; right: { title: string; items: Rich[] } }
  | { t: 'reveal'; summary: string; text: Rich | Rich[] };

export interface Lesson {
  /** like "1.1" */
  id: string;
  chapter: number;
  title: string;
  /** one sentence: what you will be able to do */
  summary: string;
  minutes: number;
  /** section reference in Lay's textbook */
  slides?: string;
  blocks: Block[];
  quiz: Question[];
  recap: Rich[];
  /** suggested questions for the AI teacher */
  ask: string[];
}

export interface Chapter {
  n: number;
  title: string;
  blurb: string;
  /** textbook sections / week topic */
  slides: string;
  preview?: boolean;
  lessons: Lesson[];
}

export interface FormulaGroup {
  title: string;
  items: { name: string; tex?: string | string[]; note?: Rich }[];
}

export interface HwProblem {
  n: string;
  /** textbook page */
  page?: string;
  prompt?: Rich;
  boardPhoto?: string;
  steps?: Step[];
  answer?: Rich;
  review?: string[];
  note?: Rich;
}

export interface Homework {
  id: string;
  title: string;
  week: number;
  /** whether the full problem statements are available on this site */
  complete: boolean;
  intro: Rich;
  problems: HwProblem[];
}
