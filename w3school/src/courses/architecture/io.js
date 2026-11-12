// Architecture chapter: I/O.

export default {
  id: 'io',
  title: 'I/O and Buses',
  description: 'PCIe, DMA and interrupts',
  icon: 'devices',
  lessons: [
    {
      id: 'arch-buses',
      title: 'Buses',
      blocks: [
        { type: 'text', value: 'A bus moves data between the CPU, memory and devices. Modern systems use point-to-point links such as PCIe rather than one shared bus.' },
        { type: 'list', items: [
          'PCIe - high-speed devices such as NVMe and GPUs',
          'USB - external peripherals',
          'Memory bus - CPU to RAM',
          'Interrupt lines - device to CPU',
          'DMA engine - bulk data movement',
        ] },
        { type: 'note', value: 'A device that can DMA into memory can read or corrupt it. That is why IOMMU and driver security matter.' },
      ],
    },
    {
      id: 'arch-dma-interrupts',
      title: 'DMA and interrupts',
      blocks: [
        { type: 'text', value: 'The CPU starts a DMA transfer, the device writes directly to memory, and an interrupt signals completion. The CPU is free to do other work in between.' },
        { type: 'code', lang: 'text', tryIt: false, value: `CPU: configure DMA (address, length)
DMA: move bytes
device: interrupt
CPU: handle completion` },
        { type: 'note', value: 'High interrupt rates can overwhelm the CPU. Coalescing and polling modes trade latency for throughput.' },
      ],
    },
    {
      id: 'arch-io-performance',
      title: 'I/O performance',
      blocks: [
        { type: 'list', items: [
          'Throughput - bytes per second',
          'Latency - time for one operation',
          'IOPS - operations per second',
          'Queue depth - outstanding requests',
          'Batching and caching reduce overhead',
          'Async I/O keeps the CPU busy',
        ] },
        { type: 'text', value: 'A device can have high throughput and poor latency, or the reverse. Choose the metric that matches the workload.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'io',
      q: 'What is PCIe?',
      options: ['A network protocol', 'A high-speed point-to-point bus', 'A database', 'A cache'],
      answer: 1,
      explain: 'It connects fast devices such as NVMe and GPUs.',
    },
    {
      chapterId: 'io',
      q: 'What does DMA do?',
      options: ['Moves data without CPU copying', 'Compiles code', 'Encrypts disks', 'Routes packets'],
      answer: 0,
      explain: 'It offloads bulk transfers.',
    },
    {
      chapterId: 'io',
      q: 'What is IOPS?',
      options: ['Bytes per second', 'Operations per second', 'Cache size', 'A bus width'],
      answer: 1,
      explain: 'It measures I/O operations per second.',
    },
  ],
};
