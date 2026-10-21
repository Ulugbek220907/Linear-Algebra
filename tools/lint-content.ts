import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';
import { chapters, allLessons, questionBank } from '../src/content';
import { homeworks } from '../src/content/homework';
import type { Block, Question, Step } from '../src/content/types';

const VALID_WIDGETS = new Set([
  'matrixExplorer',
  'rrefStepper',
  'trafficFlowLab',
  'vectorSpanLab',
  'determinantLab',
  'cramerSolver',
  'luDecomposer',
  'axiomTester',
]);

const TOKEN = /(\$[^$]+\$|\{\{[^}]+\}\}|\[\[[^\]]+\]\]|\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/;

let problems = 0;
let checkedItems = 0;

function bad(where: string, msg: string) {
  problems++;
  console.error(`✗ ${where}: ${msg}`);
}

function checkTex(where: string, t: string, display: boolean) {
  checkedItems++;
  try {
    katex.renderToString(t, { displayMode: display, throwOnError: true, strict: 'ignore', trust: false });
  } catch (e) {
    bad(where, `LaTeX parse error in "${t.slice(0, 60)}": ${(e as Error).message.split('\n')[0]}`);
  }
}

function checkBoardPhoto(where: string, photo: string) {
  checkedItems++;
  const fullPath = path.resolve(process.cwd(), 'public/board', photo);
  if (!fs.existsSync(fullPath)) {
    bad(where, `Missing board photo asset at public/board/${photo}`);
  }
}

function checkRichText(where: string, text: string | undefined | null) {
  if (!text) return;
  for (const p of text.split(TOKEN)) {
    if (!p) continue;
    if (p.startsWith('$') && p.endsWith('$') && p.length > 2) {
      checkTex(where, p.slice(1, -1), false);
    } else if (p.startsWith('[[') && p.endsWith(']]')) {
      const id = p.slice(2, -2).split('|')[0];
      if (!allLessons.some((l) => l.id === id)) {
        bad(where, `Broken link to lesson [[${id}]]`);
      }
    } else if (p.startsWith('{{') && p.endsWith('}}')) {
      const [, ...def] = p.slice(2, -2).split('|');
      checkRichText(where, def.join('|'));
    } else if (p.startsWith('**') && p.endsWith('**')) {
      checkRichText(where, p.slice(2, -2));
    }
  }
}

function checkQuestion(where: string, q: Question) {
  checkedItems++;
  checkRichText(where, q.q);
  if (q.boardPhoto) checkBoardPhoto(where, q.boardPhoto);
  if (q.type === 'mc') {
    if (!q.options || q.options.length < 2) {
      bad(where, 'Choice question must have at least 2 options');
    }
    if (q.answer < 0 || q.answer >= q.options.length) {
      bad(where, `Choice question answer index ${q.answer} out of bounds`);
    }
    for (const opt of q.options) checkRichText(where, opt);
  } else if (q.type === 'num') {
    if (typeof q.answer !== 'number' || !Number.isFinite(q.answer)) {
      bad(where, 'Numeric question has non-finite answer');
    }
  }
  checkRichText(where, q.why);
  if (q.hint) checkRichText(where, q.hint);
}

function checkStep(where: string, s: Step) {
  checkRichText(where, s.say);
  if (s.math) {
    const list = Array.isArray(s.math) ? s.math : [s.math];
    for (const m of list) checkTex(where, m, true);
  }
}

function checkBlock(where: string, b: Block) {
  switch (b.t) {
    case 'p':
      checkRichText(where, b.text);
      break;
    case 'h2':
    case 'h3':
      checkRichText(where, b.text);
      break;
    case 'ul':
    case 'ol':
      for (const item of b.items) checkRichText(where, item);
      break;
    case 'formula':
      for (const f of b.tex) checkTex(where, f, true);
      if (b.note) checkRichText(where, b.note);
      break;
    case 'callout':
      if (Array.isArray(b.text)) {
        for (const t of b.text) checkRichText(where, t);
      } else {
        checkRichText(where, b.text);
      }
      break;
    case 'board':
      checkBoardPhoto(where, b.photo);
      if (b.caption) checkRichText(where, b.caption);
      if (b.note) checkRichText(where, b.note);
      break;
    case 'widget':
      if (!VALID_WIDGETS.has(b.id)) {
        bad(where, `Unknown widget id: "${b.id}"`);
      }
      break;
    case 'example':
      checkRichText(where, b.title);
      checkRichText(where, b.problem);
      if (b.boardPhoto) checkBoardPhoto(where, b.boardPhoto);
      for (const s of b.steps) checkStep(where, s);
      checkRichText(where, b.answer);
      break;
    case 'table':
      for (const h of b.head) checkRichText(where, h);
      for (const row of b.rows) {
        for (const cell of row) checkRichText(where, cell);
      }
      break;
    case 'check':
      checkQuestion(where, b.q);
      break;
    case 'steps':
      for (const item of b.items) checkRichText(where, item.text);
      break;
    case 'compare':
      for (const item of b.left.items) checkRichText(where, item);
      for (const item of b.right.items) checkRichText(where, item);
      break;
    case 'reveal':
      if (Array.isArray(b.text)) {
        for (const t of b.text) checkRichText(where, t);
      } else {
        checkRichText(where, b.text);
      }
      break;
  }
}

console.log('=== Running Linear Algebra Content & Asset Linting ===\n');

// 1. Verify Chapters & Lessons
for (const chap of chapters) {
  checkRichText(`Chapter ${chap.n}`, chap.title);
  checkRichText(`Chapter ${chap.n}`, chap.blurb);
  for (const l of chap.lessons) {
    checkedItems++;
    checkRichText(`Lesson ${l.id}`, l.title);
    checkRichText(`Lesson ${l.id}`, l.summary);
    for (const r of l.recap) checkRichText(`Lesson ${l.id} recap`, r);

    for (const [idx, b] of l.blocks.entries()) {
      checkBlock(`Lesson ${l.id} block[${idx}]`, b);
    }

    for (const [qidx, q] of l.quiz.entries()) {
      checkQuestion(`Lesson ${l.id} quiz[${qidx}]`, q);
    }
  }
}

// 2. Verify Question Bank
for (const [idx, bq] of questionBank.entries()) {
  checkQuestion(`QuestionBank[${idx}]`, bq.q);
}

// 3. Verify Homework Problem Sets
for (const hw of homeworks) {
  checkRichText(`Homework ${hw.id}`, hw.title);
  checkRichText(`Homework ${hw.id}`, hw.intro);
  for (const p of hw.problems) {
    const where = `Homework ${hw.id} P${p.n}`;
    if (p.prompt) checkRichText(where, p.prompt);
    if (p.boardPhoto) checkBoardPhoto(where, p.boardPhoto);
    for (const s of p.steps ?? []) {
      checkStep(where, s);
    }
    if (p.answer) checkRichText(where, p.answer);
  }
}

console.log(`\n========================================`);
console.log(`Summary: Checked ${checkedItems} items across all lessons and assets.`);
console.log(`Errors found: ${problems}`);
console.log(`========================================\n`);

process.exit(problems ? 1 : 0);
