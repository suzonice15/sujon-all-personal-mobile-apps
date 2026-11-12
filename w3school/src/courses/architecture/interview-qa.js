// Computer Architecture interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is computer architecture?',
      a: 'The design of the instruction set, CPU pipeline, caches, memory and I/O that determine how programs execute and how fast they are.',
      level: 'basic',
    },
    {
      q: 'What is an ISA?',
      a: 'The instruction set architecture: the instructions, registers, addressing modes and calling convention a CPU implements.',
      level: 'basic',
    },
    {
      q: 'What is the Von Neumann bottleneck?',
      a: 'Instructions and data share memory, and memory is much slower than the CPU, so the CPU often waits. Caches reduce the gap.',
      level: 'intermediate',
    },
  ],
  numbers: [
    {
      q: 'Why use hexadecimal?',
      a: 'One hex digit is exactly four bits, so a byte is two digits. It is a compact, readable way to write binary values.',
      level: 'basic',
    },
    {
      q: 'How does two\'s complement work?',
      a: 'The most significant bit has a negative weight. It lets addition and subtraction use the same hardware and avoids a separate negative zero.',
      level: 'intermediate',
    },
    {
      q: 'Why is 0.1 + 0.2 not exactly 0.3?',
      a: 'IEEE 754 uses binary fractions with finite precision. Many decimal values cannot be represented exactly, so rounding appears.',
      level: 'intermediate',
    },
  ],
  cpu: [
    {
      q: 'What does the ALU do?',
      a: 'It performs integer arithmetic, bitwise logic and comparisons, and sets flags used by branches.',
      level: 'basic',
    },
    {
      q: 'Why are registers limited?',
      a: 'They are fast and expensive, so there are few. Compilers spill values to the stack when there are too many live values.',
      level: 'intermediate',
    },
    {
      q: 'What does the control unit do?',
      a: 'It sequences the datapath: which registers to read, which ALU operation to run, and whether to read or write memory.',
      level: 'intermediate',
    },
  ],
  pipelining: [
    {
      q: 'How does a pipeline improve throughput?',
      a: 'It overlaps stages of different instructions, so one instruction can finish nearly every cycle even though each takes several cycles.',
      level: 'basic',
    },
    {
      q: 'What is a data hazard?',
      a: 'An instruction needs a value that a previous instruction has not written yet. Forwarding or a stall resolves it.',
      level: 'intermediate',
    },
    {
      q: 'Why is a branch misprediction expensive?',
      a: 'The CPU discards the wrong-path work, flushes the pipeline and refetches. The cost is many cycles.',
      level: 'advanced',
    },
  ],
  memory: [
    {
      q: 'Why do caches exist?',
      a: 'Memory is much slower than the CPU. A small fast cache holds recently used data and hides part of the gap.',
      level: 'basic',
    },
    {
      q: 'Spatial versus temporal locality?',
      a: 'Spatial: nearby addresses are likely used next. Temporal: the same address is likely used again soon. Caches exploit both.',
      level: 'intermediate',
    },
    {
      q: 'What is false sharing?',
      a: 'Two cores write different variables that share a cache line, so the line ping-pongs and performance drops. Pad hot data to separate lines.',
      level: 'advanced',
    },
  ],
  storage: [
    {
      q: 'Why is an SSD faster than an HDD?',
      a: 'An SSD has no moving parts and uses flash memory. An HDD must seek and wait for rotation, which costs milliseconds.',
      level: 'basic',
    },
    {
      q: 'What is the latency difference between RAM and SSD?',
      a: 'RAM is around 100 ns; an SSD random read is around 100 microseconds. That is roughly a thousand times slower.',
      level: 'intermediate',
    },
    {
      q: 'Why batch disk and network I/O?',
      a: 'Per-operation overhead dominates small transfers. Batching amortises it and improves throughput.',
      level: 'intermediate',
    },
  ],
  io: [
    {
      q: 'What is a bus?',
      a: 'A communication path between components. Modern systems use point-to-point links such as PCIe for high-speed devices.',
      level: 'basic',
    },
    {
      q: 'What does DMA do?',
      a: 'It moves data between a device and memory without the CPU copying every byte, freeing the CPU for other work.',
      level: 'intermediate',
    },
    {
      q: 'Throughput versus latency?',
      a: 'Throughput is work per second; latency is the time for one operation. A device can be good at one and poor at the other.',
      level: 'intermediate',
    },
  ],
  parallelism: [
    {
      q: 'What is SIMD?',
      a: 'Single Instruction, Multiple Data: one instruction operates on several data elements, ideal for arrays and media.',
      level: 'basic',
    },
    {
      q: 'What limits multicore speedup?',
      a: 'The serial fraction, synchronization overhead, contention and false sharing. Amdahl\'s law bounds the theoretical gain.',
      level: 'intermediate',
    },
    {
      q: 'When is a GPU a good fit?',
      a: 'Regular, data-parallel work with high arithmetic intensity, such as matrix multiplication or image filters. Branchy, irregular code fits poorly.',
      level: 'advanced',
    },
  ],
  performance: [
    {
      q: 'What is the execution time formula?',
      a: 'Time = instruction count × cycles per instruction × cycle time. Optimising one factor can worsen another.',
      level: 'basic',
    },
    {
      q: 'What does Amdahl\'s law say?',
      a: 'The serial fraction limits the parallel speedup: 1 / ((1 - p) + p/N).',
      level: 'intermediate',
    },
    {
      q: 'Why report percentiles?',
      a: 'The mean hides tail latency. Users feel the slow requests, so p95 and p99 matter.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you measure a cache effect?',
      a: 'Run two versions with different memory access patterns, use perf to compare cache misses, and explain the difference with locality.',
      level: 'intermediate',
    },
    {
      q: 'How do you estimate a request time?',
      a: 'Break it into memory, compute and network costs using latency numbers, state assumptions, and identify the dominant term.',
      level: 'intermediate',
    },
    {
      q: 'Why does loop order matter?',
      a: 'It changes spatial locality. A row-major loop matches a row-major array and produces far fewer cache misses.',
      level: 'basic',
    },
    {
      q: 'What is the best way to learn architecture?',
      a: 'Measure real programs: cache effects, branch behaviour, latency and parallelism. Numbers make the model concrete.',
      level: 'basic',
    },
  ],
};
