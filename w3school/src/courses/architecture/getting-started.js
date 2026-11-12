// Architecture chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Von Neumann, the ISA and the CPU',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'arch-what-is',
      title: 'What is computer architecture?',
      blocks: [
        { type: 'text', value: 'Computer architecture is the design of the machine a program runs on: the instruction set, the CPU pipeline, caches, memory and I/O. It explains why some code is fast and some is slow.' },
        { type: 'list', items: [
          'ISA - the instructions the CPU understands',
          'Microarchitecture - how the CPU executes them',
          'Memory hierarchy - registers, cache, RAM, disk',
          'I/O and buses - how devices connect',
          'Performance - cycles, latency and throughput',
        ] },
        { type: 'note', value: 'You do not need to write assembly every day, but knowing the model explains cache misses, branch mispredictions and memory latency.' },
      ],
    },
    {
      id: 'arch-von-neumann',
      title: 'The Von Neumann model',
      blocks: [
        { type: 'text', value: 'In the Von Neumann model, instructions and data share memory. The CPU fetches an instruction, decodes it, executes it and writes results back.' },
        { type: 'code', lang: 'text', tryIt: false, value: `CPU: fetch -> decode -> execute -> writeback
Memory: instructions and data
I/O: devices connected by buses` },
        { type: 'list', items: [
          'Program counter points to the next instruction',
          'Registers hold temporary values',
          'ALU performs arithmetic and logic',
          'Control unit sequences the work',
          'The Von Neumann bottleneck: memory is slower than the CPU',
        ] },
        { type: 'note', value: 'Caches exist to hide the gap between CPU speed and memory latency. That gap is the root of most performance work.' },
      ],
    },
    {
      id: 'arch-isa',
      title: 'The ISA',
      blocks: [
        { type: 'text', value: 'The instruction set architecture defines the instructions, registers, addressing modes and calling convention. x86-64 and ARM64 are the dominant ISAs.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `uname -m
# x86_64 or arm64

# See the ISA in action
objdump -d ./app | head -n 30` },
        { type: 'note', value: 'A compiler targets an ISA, not a specific CPU model. The same binary runs on many chips that implement the same ISA.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is an ISA?',
      options: ['A database', 'The instruction set a CPU understands', 'A cache', 'A network protocol'],
      answer: 1,
      explain: 'It defines instructions, registers and addressing.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the Von Neumann bottleneck?',
      options: ['The CPU is too fast', 'Memory is slower than the CPU', 'The disk is full', 'The bus is broken'],
      answer: 1,
      explain: 'The CPU waits on memory, so caches hide the gap.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does the program counter hold?',
      options: ['The result', 'The address of the next instruction', 'The cache size', 'The stack'],
      answer: 1,
      explain: 'It points to the next instruction to fetch.',
    },
  ],
};
