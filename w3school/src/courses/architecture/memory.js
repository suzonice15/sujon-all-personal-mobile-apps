// Architecture chapter: Memory Hierarchy.

export default {
  id: 'memory',
  title: 'Memory Hierarchy',
  description: 'Cache, locality and coherence',
  icon: 'layers',
  lessons: [
    {
      id: 'arch-cache',
      title: 'Cache',
      blocks: [
        { type: 'text', value: 'A cache is a small, fast copy of recently used memory. L1 is tiny and fast; L2 and L3 are larger and slower. RAM is much slower still.' },
        { type: 'code', lang: 'text', tryIt: false, value: `register  ~0.3 ns
L1 cache  ~1 ns
L2 cache  ~4 ns
L3 cache  ~15 ns
RAM       ~80-100 ns
SSD       ~50-150 us
HDD       ~5-10 ms` },
        { type: 'note', value: 'These numbers explain why an algorithm with fewer memory accesses can beat one with fewer instructions.' },
      ],
    },
    {
      id: 'arch-locality',
      title: 'Locality',
      blocks: [
        { type: 'text', value: 'Temporal locality: recently used data is likely used again. Spatial locality: nearby data is likely used next. Caches and prefetchers exploit both.' },
        { type: 'code', lang: 'c', tryIt: false, value: `// Row-major: cache friendly
for (int i = 0; i < N; i++)
    for (int j = 0; j < N; j++)
        sum += matrix[i][j];

// Column-major access on a row-major array: many cache misses
for (int j = 0; j < N; j++)
    for (int i = 0; i < N; i++)
        sum += matrix[i][j];` },
        { type: 'note', value: 'The two loops do the same additions but the second touches memory in a pattern the cache cannot predict well.' },
      ],
    },
    {
      id: 'arch-coherence',
      title: 'Coherence and consistency',
      blocks: [
        { type: 'text', value: 'Each core has its own cache. Cache coherence keeps the cores seeing a consistent view of memory. Memory consistency defines the order of visible writes.' },
        { type: 'list', items: [
          'MESI - modified, exclusive, shared, invalid',
          'False sharing - two cores write different variables on the same cache line',
          'Memory barriers control reordering',
          'Atomic operations provide synchronization',
          'Coherence is hardware; consistency is the programming model',
        ] },
        { type: 'note', value: 'False sharing can make a parallel program slower than a serial one. Pad hot per-thread data to separate cache lines.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'memory',
      q: 'Which is fastest?',
      options: ['RAM', 'L1 cache', 'SSD', 'HDD'],
      answer: 1,
      explain: 'L1 is the closest and fastest cache.',
    },
    {
      chapterId: 'memory',
      q: 'What is spatial locality?',
      options: ['Using the same value again', 'Using nearby memory addresses', 'Using more RAM', 'Using the disk'],
      answer: 1,
      explain: 'Caches load whole lines to exploit it.',
    },
    {
      chapterId: 'memory',
      q: 'What is false sharing?',
      options: ['Two cores write different variables on the same cache line', 'A cache miss', 'A disk failure', 'A network delay'],
      answer: 0,
      explain: 'The cache line ping-pongs between cores.',
    },
  ],
};
