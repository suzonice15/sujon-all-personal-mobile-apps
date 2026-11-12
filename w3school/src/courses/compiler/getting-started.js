// Compiler chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Compiler versus interpreter and the phases',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'compiler-what-is',
      title: 'What is a compiler?',
      blocks: [
        { type: 'text', value: 'A compiler translates source code into another form, usually machine code or bytecode. An interpreter executes the source or an intermediate form directly.' },
        { type: 'list', items: [
          'Compiler: translate once, run many times',
          'Interpreter: translate and run together',
          'JIT: compile hot code while the program runs',
          'A transpiler compiles one high-level language to another',
        ] },
        { type: 'note', value: 'The line is blurry. JavaScript engines parse, interpret, JIT-compile and optimise while running.' },
      ],
    },
    {
      id: 'compiler-phases',
      title: 'The phases',
      blocks: [
        { type: 'text', value: 'A classic compiler has a front end, an optimiser and a back end. The front end understands the source; the back end targets the machine.' },
        { type: 'code', lang: 'text', tryIt: false, value: `source
  -> lexer      tokens
  -> parser     AST
  -> semantics  checked AST
  -> IR         three-address code
  -> optimiser  smaller/faster IR
  -> codegen    assembly / bytecode` },
        { type: 'note', value: 'The AST and the IR are the most useful intermediate structures. Most tools and errors depend on them.' },
      ],
    },
    {
      id: 'compiler-toolchain',
      title: 'The toolchain',
      blocks: [
        { type: 'text', value: 'A compiler is one part of a toolchain: preprocessor, compiler, assembler and linker. The linker combines object files and libraries into an executable.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `gcc -E main.c -o main.i   # preprocess
gcc -S main.i -o main.s   # compile to assembly
gcc -c main.s -o main.o   # assemble
gcc main.o -o main        # link` },
        { type: 'note', value: 'Most "compiler errors" are front-end errors; most "undefined reference" errors are linker errors. The distinction saves debugging time.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does a compiler do?',
      options: ['Runs source directly', 'Translates source to another form', 'Stores data', 'Routes packets'],
      answer: 1,
      explain: 'It translates to machine code or bytecode.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which phase produces tokens?',
      options: ['Parser', 'Lexer', 'Linker', 'Optimiser'],
      answer: 1,
      explain: 'The lexer turns characters into tokens.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does the linker do?',
      options: ['Parse code', 'Combine object files and libraries', 'Optimise loops', 'Run tests'],
      answer: 1,
      explain: 'It resolves symbols and builds the executable.',
    },
  ],
};
