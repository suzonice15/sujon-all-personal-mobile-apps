// Compiler chapter: Code Generation.

export default {
  id: 'codegen',
  title: 'Code Generation',
  description: 'Registers, stack and calling conventions',
  icon: 'memory',
  lessons: [
    {
      id: 'compiler-registers',
      title: 'Registers',
      blocks: [
        { type: 'text', value: 'The code generator maps IR values to registers and memory. Registers are fast but limited; spilling moves values to the stack when there are too many.' },
        { type: 'code', lang: 'text', tryIt: false, value: `IR:
  t1 = a + b
  t2 = t1 * c

x86-64:
  mov rax, [a]
  add rax, [b]
  imul rax, [c]` },
        { type: 'note', value: 'Register allocation is a graph-colouring problem in the general case. Real compilers use heuristics and live-range analysis.' },
      ],
    },
    {
      id: 'compiler-stack',
      title: 'The stack and frames',
      blocks: [
        { type: 'text', value: 'A call frame stores parameters, the return address, saved registers and locals. The stack grows on call and shrinks on return.' },
        { type: 'code', lang: 'text', tryIt: false, value: `caller:
  push args
  call f
  add rsp, 8

callee:
  push rbp
  mov rbp, rsp
  ...
  pop rbp
  ret` },
        { type: 'note', value: 'Stack alignment matters on modern CPUs. A misaligned stack can crash SIMD code or make calls slower.' },
      ],
    },
    {
      id: 'compiler-calling-convention',
      title: 'Calling conventions',
      blocks: [
        { type: 'text', value: 'A calling convention decides which registers carry arguments, who cleans the stack and which registers are preserved. Both caller and callee must agree.' },
        { type: 'list', items: [
          'System V AMD64 - Linux/macOS',
          'Microsoft x64 - Windows',
          'ARM64 AAPCS - mobile and Apple silicon',
          'Return value in a register, large values via memory',
          'Callee-saved vs caller-saved registers',
        ] },
        { type: 'note', value: 'Mixing conventions causes crashes that look random. Check the ABI when calling native code from a language runtime.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'codegen',
      q: 'What is register spilling?',
      options: ['Deleting a register', 'Moving a value to the stack when registers run out', 'Encrypting data', 'A syntax error'],
      answer: 1,
      explain: 'Spilling keeps the program correct with limited registers.',
    },
    {
      chapterId: 'codegen',
      q: 'What does a call frame hold?',
      options: ['Only code', 'Parameters, return address, locals and saved registers', 'A database', 'A network socket'],
      answer: 1,
      explain: 'It holds the state needed for the call.',
    },
    {
      chapterId: 'codegen',
      q: 'Why does a calling convention matter?',
      options: ['It sets colors', 'Caller and callee must agree on registers and cleanup', 'It compresses code', 'It resolves DNS'],
      answer: 1,
      explain: 'Mismatch causes crashes and corruption.',
    },
  ],
};
