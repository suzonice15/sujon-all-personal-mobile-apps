// OS chapter: Memory.

export default {
  id: 'memory',
  title: 'Memory',
  description: 'Virtual memory, paging and page faults',
  icon: 'memory',
  lessons: [
    {
      id: 'os-virtual-memory',
      title: 'Virtual memory',
      blocks: [
        { type: 'text', value: 'Each process sees its own virtual address space. The MMU translates virtual addresses to physical pages using page tables. That gives isolation and lets the OS page data to disk.' },
        { type: 'code', lang: 'text', tryIt: false, value: `virtual address
  -> page number + offset
  -> page table lookup
  -> physical frame + offset` },
        { type: 'note', value: 'A process cannot read another process memory because its page table does not map those pages. Isolation is enforced by hardware.' },
      ],
    },
    {
      id: 'os-paging',
      title: 'Paging and page faults',
      blocks: [
        { type: 'text', value: 'Memory is divided into fixed-size pages. A page fault happens when a page is not in RAM. The OS loads it from disk or allocates a new frame, then restarts the instruction.' },
        { type: 'list', items: [
          'Page table maps virtual pages to frames',
          'TLB caches recent translations',
          'Page fault: minor (in memory) or major (disk)',
          'Thrashing: too many faults, the system spends time paging',
          'Replacement: LRU or a clock approximation',
        ] },
        { type: 'note', value: 'A major page fault is orders of magnitude slower than a RAM access. That is why locality matters.' },
      ],
    },
    {
      id: 'os-fragmentation',
      title: 'Fragmentation',
      blocks: [
        { type: 'text', value: 'Internal fragmentation wastes space inside an allocation. External fragmentation leaves free space in pieces too small to use. Paging avoids external fragmentation by using fixed-size pages.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `free -h
vmstat 1
cat /proc/meminfo | head

# Watch swapping
si/so in vmstat` },
        { type: 'note', value: 'A system that swaps heavily is not "using memory well"; it is under memory pressure and will be slow.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'memory',
      q: 'What does the MMU do?',
      options: ['Schedules processes', 'Translates virtual to physical addresses', 'Encrypts files', 'Compiles code'],
      answer: 1,
      explain: 'It uses page tables for translation.',
    },
    {
      chapterId: 'memory',
      q: 'What is a page fault?',
      options: ['A syntax error', 'A page not currently in RAM', 'A disk failure', 'A network error'],
      answer: 1,
      explain: 'The OS must load the page.',
    },
    {
      chapterId: 'memory',
      q: 'What is thrashing?',
      options: ['Fast execution', 'Excessive paging that slows the system', 'A cache hit', 'A context switch'],
      answer: 1,
      explain: 'The system spends most time paging.',
    },
  ],
};
