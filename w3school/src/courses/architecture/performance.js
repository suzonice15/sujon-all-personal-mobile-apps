// Architecture chapter: Performance.

export default {
  id: 'performance',
  title: 'Performance',
  description: 'CPI, Amdahl and benchmarks',
  icon: 'speed',
  lessons: [
    {
      id: 'arch-cpi',
      title: 'CPI and cycles',
      blocks: [
        { type: 'text', value: 'Execution time = instruction count × cycles per instruction × cycle time. Optimising one factor can make another worse, so measure the whole product.' },
        { type: 'code', lang: 'text', tryIt: false, value: `time = IC * CPI * cycle_time

reduce IC      -> better algorithm, less work
reduce CPI     -> fewer stalls, better locality
reduce cycle   -> faster clock, more pipeline stages` },
        { type: 'note', value: 'A faster clock does not help if the CPU spends its cycles waiting on memory. Performance is often a memory problem.' },
      ],
    },
    {
      id: 'arch-amdahl',
      title: "Amdahl's law",
      blocks: [
        { type: 'text', value: 'The speedup from parallelising a fraction p with N workers is 1 / ((1 - p) + p/N). The serial part sets a hard ceiling.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function speedup(p, n) {
  return 1 / ((1 - p) + p / n);
}

console.log(speedup(0.9, 4).toFixed(2));
console.log(speedup(0.9, 16).toFixed(2));
console.log(speedup(0.5, 16).toFixed(2));` },
        { type: 'note', value: 'If 10% of the work is serial, even infinite workers give at most a 10x speedup. Optimise the serial part too.' },
      ],
    },
    {
      id: 'arch-benchmarks',
      title: 'Benchmarks',
      blocks: [
        { type: 'list', items: [
          'Measure with realistic data and workload',
          'Report p50, p95 and p99, not only the mean',
          'Warm up caches and JIT before timing',
          'Run multiple times and compare distributions',
          'Beware microbenchmarks that do not reflect real use',
          'Profile before optimising',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `perf stat ./app
perf record ./app && perf report
hyperfine './app --input small' './app --input large'` },
        { type: 'note', value: 'A benchmark that does not match production can lead you to optimise the wrong thing. Measure the real path.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'performance',
      q: 'What does CPI mean?',
      options: ['Cycles per instruction', 'Cache per input', 'Cores per instance', 'Code per interface'],
      answer: 0,
      explain: 'It is the average cycles each instruction takes.',
    },
    {
      chapterId: 'performance',
      q: "What does Amdahl's law describe?",
      options: ['The limit of parallel speedup', 'The cache size', 'The disk speed', 'The clock rate'],
      answer: 0,
      explain: 'The serial fraction limits the gain.',
    },
    {
      chapterId: 'performance',
      q: 'Why report p95 and p99?',
      options: ['The mean hides tail latency', 'It is shorter', 'It avoids benchmarks', 'It measures disk size'],
      answer: 0,
      explain: 'Users feel the slow requests.',
    },
  ],
};
