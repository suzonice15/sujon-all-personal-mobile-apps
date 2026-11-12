// OS chapter: I/O.

export default {
  id: 'io',
  title: 'I/O & Devices',
  description: 'Interrupts, DMA, buffering and drivers',
  icon: 'devices',
  lessons: [
    {
      id: 'os-interrupts',
      title: 'Interrupts',
      blocks: [
        { type: 'text', value: 'A device signals the CPU with an interrupt when it needs attention. The CPU pauses, runs the handler and resumes. This is how I/O overlaps with computation.' },
        { type: 'list', items: [
          'Hardware interrupt - from a device',
          'Software interrupt / trap - from a system call or fault',
          'Handler runs in kernel mode',
          'Interrupt priority and masking',
          'Too many interrupts can starve real work',
        ] },
        { type: 'note', value: 'Polling is the alternative: the CPU repeatedly checks the device. It is simple but wastes cycles.' },
      ],
    },
    {
      id: 'os-dma',
      title: 'DMA',
      blocks: [
        { type: 'text', value: 'Direct Memory Access lets a device read or write RAM without the CPU copying every byte. The CPU starts the transfer and gets an interrupt when it finishes.' },
        { type: 'code', lang: 'text', tryIt: false, value: `CPU: start DMA (address, length)
DMA engine: moves bytes between device and RAM
CPU: does other work
device: raises an interrupt when done` },
        { type: 'note', value: 'Without DMA, a fast disk or network card would consume the CPU with copying. DMA is why large transfers can be efficient.' },
      ],
    },
    {
      id: 'os-buffering',
      title: 'Buffering and caching',
      blocks: [
        { type: 'list', items: [
          'Buffer - temporary storage while data moves',
          'Cache - a faster copy of frequently used data',
          'Spooling - queue jobs for a slow device such as a printer',
          'Read-ahead - fetch data before it is requested',
          'Write-back - acknowledge before the disk flush',
        ] },
        { type: 'text', value: 'Buffering smooths speed differences. A fast CPU and a slow disk need a buffer so neither waits on the other for every byte.' },
        { type: 'note', value: 'Write-back is faster but can lose recent writes on power loss. Choose based on durability needs.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'io',
      q: 'What is an interrupt?',
      options: ['A file', 'A signal that pauses the CPU to handle an event', 'A database', 'A thread'],
      answer: 1,
      explain: 'It lets devices request attention.',
    },
    {
      chapterId: 'io',
      q: 'What does DMA do?',
      options: ['Compiles code', 'Moves data between device and memory without CPU copying', 'Encrypts disks', 'Schedules threads'],
      answer: 1,
      explain: 'It offloads bulk transfers.',
    },
    {
      chapterId: 'io',
      q: 'Why buffer I/O?',
      options: ['To smooth speed differences', 'To encrypt', 'To reduce RAM', 'To add DNS'],
      answer: 0,
      explain: 'Buffers let fast and slow components work together.',
    },
  ],
};
