// Architecture chapter: The CPU.

export default {
  id: 'cpu',
  title: 'The CPU',
  description: 'ALU, registers, datapath and control',
  icon: 'memory',
  lessons: [
    {
      id: 'arch-alu',
      title: 'The ALU',
      blocks: [
        { type: 'text', value: 'The Arithmetic Logic Unit performs integer arithmetic, bitwise logic and comparisons. The control unit tells it which operation to perform and where the operands come from.' },
        { type: 'list', items: [
          'ADD, SUB, AND, OR, XOR, shifts, comparisons',
          'Flags: zero, negative, carry, overflow',
          'Operands from registers or immediate values',
          'Result written to a register or memory',
        ] },
        { type: 'note', value: 'Floating point usually has a separate FPU or vector unit. Integer and floating-point pipelines can overlap.' },
      ],
    },
    {
      id: 'arch-registers',
      title: 'Registers',
      blocks: [
        { type: 'text', value: 'Registers are the fastest storage, but there are few. The ISA defines general-purpose, stack, program-counter and status registers.' },
        { type: 'code', lang: 'text', tryIt: false, value: `x86-64 general purpose: rax, rbx, rcx, rdx, rsi, rdi, r8-r15
special: rsp (stack), rbp (frame), rip (instruction pointer), rflags` },
        { type: 'note', value: 'Register pressure is why compilers spill values to the stack. More live values than registers means more memory traffic.' },
      ],
    },
    {
      id: 'arch-datapath-control',
      title: 'Datapath and control',
      blocks: [
        { type: 'text', value: 'The datapath is the wires and units that move data. Control signals select registers, ALU operations and memory reads or writes for each instruction.' },
        { type: 'code', lang: 'text', tryIt: false, value: `fetch -> decode -> execute -> memory -> writeback
control: which register, which ALU op, read or write memory` },
        { type: 'note', value: 'A hardwired controller is fast and fixed. A microcoded controller is flexible and easier for complex instructions.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'cpu',
      q: 'What does the ALU do?',
      options: ['Stores files', 'Arithmetic and logic operations', 'Routes packets', 'Compiles code'],
      answer: 1,
      explain: 'It performs integer and bitwise operations.',
    },
    {
      chapterId: 'cpu',
      q: 'Why are registers limited?',
      options: ['They are slow', 'They are fast and expensive, so there are few', 'They are on disk', 'They are encrypted'],
      answer: 1,
      explain: 'Scarcity is why compilers spill.',
    },
    {
      chapterId: 'cpu',
      q: 'What does the control unit do?',
      options: ['Selects operations and data movement', 'Stores the database', 'Encrypts traffic', 'Draws the UI'],
      answer: 0,
      explain: 'It sequences the datapath.',
    },
  ],
};
