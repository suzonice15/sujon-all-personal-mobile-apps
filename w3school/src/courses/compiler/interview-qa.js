// Compiler Design interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'Compiler versus interpreter?',
      a: 'A compiler translates source to another form before execution. An interpreter executes the source or an intermediate form directly. Many modern engines mix both with JIT compilation.',
      level: 'basic',
    },
    {
      q: 'What are the main compiler phases?',
      a: 'Lexing, parsing, semantic analysis, IR generation, optimisation and code generation. The linker combines object files afterward.',
      level: 'basic',
    },
    {
      q: 'Front end versus back end?',
      a: 'The front end understands the source language. The back end targets the machine. The IR is the boundary between them.',
      level: 'intermediate',
    },
  ],
  lexing: [
    {
      q: 'What is a token?',
      a: 'A lexical unit with a type, a value and a position, such as NUMBER(12) or IDENT(sum).',
      level: 'basic',
    },
    {
      q: 'Why can regular expressions not parse nesting?',
      a: 'Regular expressions describe regular languages, which cannot count arbitrarily nested parentheses. A grammar and a parser are needed.',
      level: 'intermediate',
    },
    {
      q: 'What should a lexical error report?',
      a: 'The position and the offending character or text, so the developer can find and fix it quickly.',
      level: 'basic',
    },
  ],
  parsing: [
    {
      q: 'What is an AST?',
      a: 'An abstract syntax tree represents the structure of the program. Parentheses disappear; the tree encodes precedence and nesting.',
      level: 'basic',
    },
    {
      q: 'How do you encode precedence?',
      a: 'With layered grammar rules, such as Expr -> Term (+ Term)* and Term -> Factor (* Factor)*, or with precedence climbing in a hand-written parser.',
      level: 'intermediate',
    },
    {
      q: 'What is recursive descent?',
      a: 'A parser with one function per grammar rule. It is readable and gives good error messages.',
      level: 'basic',
    },
  ],
  semantics: [
    {
      q: 'What is a symbol table?',
      a: 'A structure that maps names to declarations, including type, scope and location. It resolves what an identifier refers to.',
      level: 'basic',
    },
    {
      q: 'What does semantic analysis check?',
      a: 'Meaning: undeclared names, duplicate declarations, type errors, wrong argument counts and missing returns.',
      level: 'intermediate',
    },
    {
      q: 'Why recover from errors?',
      a: 'To report several problems in one run, so the developer fixes more per compile. Stopping at the first error is slow for users.',
      level: 'intermediate',
    },
  ],
  ir: [
    {
      q: 'What is three-address code?',
      a: 'An IR where each instruction has one operation and at most three operands, making order and data flow explicit.',
      level: 'basic',
    },
    {
      q: 'What is SSA?',
      a: 'Static Single Assignment: every value has exactly one definition. Phi nodes merge values at control-flow joins.',
      level: 'intermediate',
    },
    {
      q: 'Why use an IR instead of the AST?',
      a: 'It is simpler and closer to machine code, which makes optimisation and code generation easier and more reliable.',
      level: 'intermediate',
    },
  ],
  optimization: [
    {
      q: 'What is constant folding?',
      a: 'Evaluating constant expressions at compile time, such as 2 + 3 -> 5, so the program does less work.',
      level: 'basic',
    },
    {
      q: 'When is dead code elimination unsafe?',
      a: 'When the removed code has side effects, such as a function call that changes state or performs I/O.',
      level: 'intermediate',
    },
    {
      q: 'What is inlining?',
      a: 'Replacing a function call with the function body. It removes call overhead and enables further optimisation, at the cost of code size.',
      level: 'intermediate',
    },
  ],
  codegen: [
    {
      q: 'What is register spilling?',
      a: 'Moving a value from a register to the stack when there are not enough registers, then reloading it later.',
      level: 'intermediate',
    },
    {
      q: 'What does a call frame contain?',
      a: 'Parameters, the return address, saved registers and local variables. It is created on call and destroyed on return.',
      level: 'basic',
    },
    {
      q: 'Why does a calling convention matter?',
      a: 'Caller and callee must agree on argument registers, return values, preserved registers and stack cleanup. A mismatch corrupts state.',
      level: 'advanced',
    },
  ],
  interpreters: [
    {
      q: 'What is a tree-walking interpreter?',
      a: 'An interpreter that evaluates the AST directly. It is simple to build but revisits the tree on every run.',
      level: 'basic',
    },
    {
      q: 'What is bytecode?',
      a: 'A compact instruction list for a virtual machine. It separates parsing from execution and is easier to cache and optimise than an AST.',
      level: 'intermediate',
    },
    {
      q: 'How does a stack VM work?',
      a: 'It pushes operands, applies an opcode that pops and pushes results, and advances the instruction pointer. A loop repeats until the program ends.',
      level: 'intermediate',
    },
  ],
  tools: [
    {
      q: 'What is a parser generator?',
      a: 'A tool that turns a grammar into parser code, such as ANTLR, Bison or PEG.js.',
      level: 'basic',
    },
    {
      q: 'What is LLVM?',
      a: 'A reusable compiler backend. You emit LLVM IR and get optimisation and machine code for many targets.',
      level: 'intermediate',
    },
    {
      q: 'What is WebAssembly?',
      a: 'A portable bytecode for sandboxed execution, commonly used to run compiled code in browsers and on servers.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you build a calculator compiler?',
      a: 'Tokenize the input, parse it into an AST with correct precedence, evaluate or compile it, and report errors with positions. Add tests for each case.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle operator precedence?',
      a: 'Use layered grammar rules or precedence climbing. Multiplication and division bind tighter than addition and subtraction.',
      level: 'intermediate',
    },
    {
      q: 'Why compare a tree-walker and a VM?',
      a: 'They are two implementations of the same semantics. A difference in results exposes a bug in one of them.',
      level: 'advanced',
    },
    {
      q: 'What makes compiler errors good?',
      a: 'A precise location, a clear explanation and a suggestion for the fix. Good errors are a feature, not an afterthought.',
      level: 'basic',
    },
  ],
};
