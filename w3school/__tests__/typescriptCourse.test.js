/**
 * Tests for the TypeScript course.
 *
 * Structural checks mirror the SQL course test. The execution checks compile
 * every try-it snippet with the real TypeScript compiler in strict mode, fail
 * on any type error, and then run the emitted JavaScript in a sandbox. A broken
 * sample therefore fails CI, not a learner's phone.
 */

import vm from 'node:vm';
import ts from 'typescript';
import typescriptCourse from '../src/courses/typescript';
import { toDocument } from '../src/components/course/preview';

const ALLOWED_BLOCKS = ['text', 'heading', 'list', 'code', 'note'];
const ALLOWED_LEVELS = ['basic', 'intermediate', 'advanced'];

function collectLessons() {
  const lessons = [];
  for (const chapter of typescriptCourse.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({ chapter, lesson });
    }
  }
  return lessons;
}

function collectTryItBlocks() {
  const blocks = [];
  for (const { chapter, lesson } of collectLessons()) {
    for (const block of lesson.blocks) {
      if (block.type === 'code' && block.tryIt) {
        blocks.push({ chapterId: chapter.id, lessonId: lesson.id, lang: block.lang, code: block.value });
      }
    }
  }
  return blocks;
}

function typeErrors(code) {
  const fileName = 'lesson.ts';
  // Real project files have imports or exports, so treat the snippet as a
  // module. Without this, top-level names can collide with DOM globals such as
  // window.name, which a learner would never hit in a normal source file.
  const source = `${code}\nexport {};\n`;
  const options = {
    strict: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    noEmit: true,
    skipLibCheck: true,
    types: [],
    lib: ['lib.es2020.d.ts', 'lib.dom.d.ts'],
  };
  const host = ts.createCompilerHost(options);
  const baseGetSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (name, languageVersion, onError, shouldCreateNewSourceFile) => {
    if (name === fileName) return ts.createSourceFile(name, source, languageVersion, true);
    return baseGetSourceFile(name, languageVersion, onError, shouldCreateNewSourceFile);
  };
  host.fileExists = name => name === fileName || ts.sys.fileExists(name);
  host.readFile = name => (name === fileName ? source : ts.sys.readFile(name));
  const program = ts.createProgram([fileName], options, host);
  return ts
    .getPreEmitDiagnostics(program)
    .map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
}

function runTypeScript(code) {
  const output = ts.transpileModule(code, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
    },
  }).outputText;
  const logs = [];
  vm.runInNewContext(output, { console: { log: (...args) => logs.push(args.join(' ')) } });
  return logs;
}

describe('TypeScript course structure', () => {
  test('has the metadata the app needs', () => {
    expect(typescriptCourse.id).toBe('typescript');
    expect(typescriptCourse.title).toBe('TypeScript');
    expect(typescriptCourse.short).toBeTruthy();
    expect(typescriptCourse.tagline).toBeTruthy();
    expect(typescriptCourse.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(typescriptCourse.icon).toBeTruthy();
    expect(typescriptCourse.chapters.length).toBeGreaterThanOrEqual(10);
    expect(typescriptCourse.quiz.length).toBeGreaterThanOrEqual(40);
  });

  test('every chapter has an id, title and at least one lesson', () => {
    const ids = new Set();
    for (const chapter of typescriptCourse.chapters) {
      expect(chapter.id).toBeTruthy();
      expect(ids.has(chapter.id)).toBe(false);
      ids.add(chapter.id);
      expect(chapter.title).toBeTruthy();
      expect(chapter.description).toBeTruthy();
      expect(Array.isArray(chapter.lessons)).toBe(true);
      expect(chapter.lessons.length).toBeGreaterThan(0);
    }
  });

  test('lesson ids are unique and blocks use known types', () => {
    const lessonIds = new Set();
    for (const { lesson } of collectLessons()) {
      expect(lesson.id).toBeTruthy();
      expect(lessonIds.has(lesson.id)).toBe(false);
      lessonIds.add(lesson.id);
      expect(lesson.title).toBeTruthy();
      expect(Array.isArray(lesson.blocks)).toBe(true);
      expect(lesson.blocks.length).toBeGreaterThan(0);
      for (const block of lesson.blocks) {
        expect(ALLOWED_BLOCKS).toContain(block.type);
        if (block.type === 'list') expect(Array.isArray(block.items)).toBe(true);
        else {
          expect(typeof block.value).toBe('string');
          expect(block.value.length).toBeGreaterThan(0);
          if (block.type === 'code') expect(block.lang).toBeTruthy();
        }
      }
    }
  });

  test('every quiz question is valid and points at its chapter', () => {
    const seen = new Set();
    for (const chapter of typescriptCourse.chapters) {
      expect(chapter.quiz.length).toBeGreaterThanOrEqual(3);
      for (const q of chapter.quiz) {
        expect(q.chapterId).toBe(chapter.id);
        expect(q.q).toBeTruthy();
        expect(Array.isArray(q.options)).toBe(true);
        expect(q.options.length).toBe(4);
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(4);
        expect(q.explain).toBeTruthy();
        expect(seen.has(q.q)).toBe(false);
        seen.add(q.q);
      }
    }
    expect(typescriptCourse.quiz.length).toBe(
      typescriptCourse.chapters.reduce((n, ch) => n + ch.quiz.length, 0),
    );
  });

  test('interview questions are grouped by existing chapters', () => {
    const chapterIds = new Set(typescriptCourse.chapters.map(ch => ch.id));
    const grouped = Object.keys(typescriptCourse.interviewQuestions);
    expect(grouped.length).toBeGreaterThan(0);
    for (const chapterId of grouped) {
      expect(chapterIds.has(chapterId)).toBe(true);
      const questions = typescriptCourse.interviewQuestions[chapterId];
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
      for (const item of questions) {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
        expect(ALLOWED_LEVELS).toContain(item.level);
      }
    }
  });
});

describe('TypeScript lesson samples', () => {
  test('every try-it block is TypeScript (the preview compiles ts only)', () => {
    const blocks = collectTryItBlocks();
    expect(blocks.length).toBeGreaterThanOrEqual(25);
    for (const block of blocks) {
      expect(block.lang).toBe('ts');
    }
  });

  test('every try-it block type-checks in strict mode', () => {
    const blocks = collectTryItBlocks();
    const failures = [];
    for (const block of blocks) {
      const errors = typeErrors(block.code);
      if (errors.length > 0) {
        failures.push(`${block.chapterId}/${block.lessonId}: ${errors.join(' | ')}`);
      }
    }
    expect(failures).toEqual([]);
  });

  test('every try-it block runs without a runtime error', () => {
    const blocks = collectTryItBlocks();
    const failures = [];
    for (const block of blocks) {
      try {
        runTypeScript(block.code);
      } catch (error) {
        failures.push(`${block.chapterId}/${block.lessonId}: ${error.message}`);
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('TypeScript Try-it preview', () => {
  test('builds an HTML page that compiles TypeScript with Babel', () => {
    const html = toDocument('const n: number = 1; console.log(n);', 'ts');
    expect(html).toContain('@babel/standalone');
    expect(html).toContain('lesson.ts');
    expect(html).toContain('presets');
    expect(html).toContain('const n: number = 1;');
  });

  test('escapes a closing script tag in the lesson code', () => {
    const html = toDocument("const x: string = '</script>';", 'ts');
    expect(html).not.toContain("const x: string = '</script>';");
    expect(html).toContain('<\\/script>');
  });

  test('other languages still use their own preview', () => {
    expect(toDocument('<h1>hi</h1>', 'html')).toContain('<h1>hi</h1>');
    expect(toDocument('SELECT 1;', 'sql')).toContain('sql.js@1.10.3');
  });
});
