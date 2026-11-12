// Architecture chapter: Parallelism.

export default {
  id: 'parallelism',
  title: 'Parallelism',
  description: 'ILP, SIMD, multicore and GPUs',
  icon: 'grid-on',
  lessons: [
    {
      id: 'arch-ilp-simd',
      title: 'ILP and SIMD',
      blocks: [
        { type: 'text', value: 'Instruction-level parallelism lets independent instructions run together. SIMD applies one instruction to several data elements at once, which is ideal for arrays and media.' },
        { type: 'code', lang: 'text', tryIt: false, value: `scalar: a[0]+b[0], a[1]+b[1], a[2]+b[2], a[3]+b[3]
SIMD:   one vector add handles all four lanes` },
        { type: 'note', value: 'Compilers auto-vectorise simple loops when the data is contiguous and the dependencies allow it. Aliasing can block it.' },
      ],
    },
    {
      id: 'arch-multicore',
      title: 'Multicore',
      blocks: [
        { type: 'text', value: 'More cores do not automatically mean more speed. The work must be divisible, the synchronization cheap and the memory traffic under control.' },
        { type: 'list', items: [
          'Threads share memory and need synchronization',
          'Processes are isolated and communicate explicitly',
          'Amdahl\'s law limits the speedup from parallel work',
          'False sharing and contention can erase the gain',
          'Measure scaling, not only single-thread speed',
        ] },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <pthread.h>

void *worker(void *arg) {
    long id = (long)arg;
    // do independent work for this thread
    return NULL;
}

// start N threads, then join them` },
        { type: 'note', value: 'A parallel program is correct only if the synchronization is correct. Race conditions are the default outcome of shared mutable state.' },
      ],
    },
    {
      id: 'arch-gpu',
      title: 'GPUs',
      blocks: [
        { type: 'text', value: 'A GPU has thousands of simple cores optimised for throughput. It is excellent for regular, data-parallel work such as graphics and matrix operations.' },
        { type: 'list', items: [
          'SIMT - many threads run the same instruction',
          'High memory bandwidth',
          'Latency hidden by running many warps',
          'Bad for branchy, irregular code',
          'Data must move between CPU and GPU memory',
        ] },
        { type: 'note', value: 'A GPU kernel that is faster on paper can lose to the transfer cost. Measure end to end.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'parallelism',
      q: 'What does SIMD do?',
      options: ['Runs one instruction on several data elements', 'Runs several programs', 'Encrypts data', 'Caches memory'],
      answer: 0,
      explain: 'It processes vectors in parallel.',
    },
    {
      chapterId: 'parallelism',
      q: 'What limits parallel speedup?',
      options: ['Amdahl\'s law', 'The keyboard', 'The logo', 'The DNS'],
      answer: 0,
      explain: 'The serial part bounds the gain.',
    },
    {
      chapterId: 'parallelism',
      q: 'When is a GPU a poor fit?',
      options: ['Regular array math', 'Branchy, irregular code', 'Matrix multiplication', 'Image filters'],
      answer: 1,
      explain: 'GPUs prefer regular data-parallel work.',
    },
  ],
};
