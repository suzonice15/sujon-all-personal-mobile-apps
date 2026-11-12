// Architecture chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Measure a program and estimate performance',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'arch-project-measure',
      title: 'Project: measure a program',
      blocks: [
        { type: 'text', value: 'Take a small program that sums a large array. Compare a cache-friendly loop with a cache-hostile one. Measure time, instructions and cache misses.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `perf stat -e cycles,instructions,cache-misses ./sum
perf stat -e cache-references,cache-misses ./sum-column

hyperfine './sum-row' './sum-column'` },
        { type: 'list', items: [
          'Same work, different memory access',
          'Compare cache miss rate, not just time',
          'Try a smaller and larger array',
          'Explain the result in one paragraph',
        ] },
        { type: 'note', value: 'A measured 2x difference from loop order teaches more than ten pages of theory.' },
      ],
    },
    {
      id: 'arch-project-estimate',
      title: 'Project: estimate a design',
      blocks: [
        { type: 'text', value: 'Estimate the time for a request that reads 1 MB from RAM, does 10 million operations and makes two network calls. Use the latency table and state your assumptions.' },
        { type: 'code', lang: 'text', tryIt: false, value: `1 MB from RAM      ~250 us
10M simple ops     ~10 ms at 1 ns/op
2 network trips    ~1 ms in a datacenter
serial total       ~11 ms

Parallelise? the 10M ops dominate.` },
        { type: 'note', value: 'Order-of-magnitude reasoning prevents you from optimising the 0.25 ms while ignoring the 10 ms.' },
      ],
    },
    {
      id: 'arch-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the Von Neumann bottleneck?',
          'Why do caches exist?',
          'What is spatial versus temporal locality?',
          'What is a cache miss and what does it cost?',
          'How does a pipeline work?',
          'What is a data hazard?',
          'What is two\'s complement?',
          'Why is 0.1 + 0.2 not 0.3?',
          'What is Amdahl\'s law?',
          'When is a GPU a good fit?',
        ] },
        { type: 'text', value: 'Strong answers use numbers and a mechanism. "A main memory access is about 100 ns, so a cache miss costs hundreds of cycles" is better than "memory is slow".' },
        { type: 'note', value: 'Be ready to estimate a small workload and explain which layer dominates.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which loop is usually faster on a row-major matrix?',
      options: ['Row-major access', 'Column-major access', 'Random access', 'They are equal'],
      answer: 0,
      explain: 'It matches memory layout and locality.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should you measure besides time?',
      options: ['Cache misses and instructions', 'Only the clock', 'The logo', 'The DNS'],
      answer: 0,
      explain: 'Counters explain why the time changed.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why estimate before optimising?',
      options: ['To find the dominant cost', 'To avoid measuring', 'To make code longer', 'To skip tests'],
      answer: 0,
      explain: 'Focus on the layer that actually dominates.',
    },
  ],
};
