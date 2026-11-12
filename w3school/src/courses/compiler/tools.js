// Compiler chapter: Tools.

export default {
  id: 'tools',
  title: 'Tools',
  description: 'Parser generators, LLVM and WebAssembly',
  icon: 'construction',
  lessons: [
    {
      id: 'compiler-parser-generators',
      title: 'Parser generators',
      blocks: [
        { type: 'text', value: 'A parser generator turns a grammar into a parser. It saves time, but generated parsers can be harder to debug and to give good errors.' },
        { type: 'list', items: [
          'ANTLR - widely used, multi-language',
          'Yacc / Bison - classic LALR',
          'PEG.js / Pest - PEG grammars',
          'Tree-sitter - incremental parsing for editors',
          'Hand-written - best error messages and control',
        ] },
        { type: 'note', value: 'For a small language, a hand-written recursive descent parser is often the fastest path to a good developer experience.' },
      ],
    },
    {
      id: 'compiler-llvm-wasm',
      title: 'LLVM and WebAssembly',
      blocks: [
        { type: 'text', value: 'LLVM is a reusable compiler backend. You emit LLVM IR and get optimisation and machine code for many targets. WebAssembly is a portable bytecode for the web and beyond.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `clang -S -emit-llvm main.c -o main.ll
llc main.ll -o main.s

# WebAssembly
clang --target=wasm32 -O2 main.c -o main.wasm` },
        { type: 'note', value: 'Use LLVM when you need a serious backend. Use WebAssembly when you need portable, sandboxed execution.' },
      ],
    },
    {
      id: 'compiler-real-world',
      title: 'Real-world compilers',
      blocks: [
        { type: 'list', items: [
          'GCC and Clang - C, C++ and more',
          'Go compiler - fast builds, simple toolchain',
          'rustc - borrow checking, LLVM backend',
          'V8 / SpiderMonkey - JavaScript JITs',
          'TypeScript - transpiler, not a machine-code compiler',
          'Babel - syntax transformation',
        ] },
        { type: 'text', value: 'Most real compilers are incremental and pragmatic. They reuse a backend, focus on good errors and optimise only what matters.' },
        { type: 'note', value: 'A transpiler like TypeScript still has a lexer, parser, semantic analysis and emitter. The phases are the same; the target is different.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'tools',
      q: 'What does a parser generator do?',
      options: ['Generates a parser from a grammar', 'Runs the program', 'Links files', 'Compresses code'],
      answer: 0,
      explain: 'It turns a grammar into parser code.',
    },
    {
      chapterId: 'tools',
      q: 'What is LLVM?',
      options: ['A reusable compiler backend', 'A database', 'A browser', 'A CSS framework'],
      answer: 0,
      explain: 'It provides optimisation and code generation.',
    },
    {
      chapterId: 'tools',
      q: 'What is WebAssembly?',
      options: ['A portable bytecode for sandboxed execution', 'A JavaScript framework', 'A network protocol', 'A database'],
      answer: 0,
      explain: 'It runs compiled code in a sandbox.',
    },
  ],
};
