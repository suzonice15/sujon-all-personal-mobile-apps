// Architecture chapter: Storage.

export default {
  id: 'storage',
  title: 'Storage',
  description: 'RAM, SSD, HDD and the latency gap',
  icon: 'storage',
  lessons: [
    {
      id: 'arch-ram-ssd',
      title: 'RAM and SSD',
      blocks: [
        { type: 'text', value: 'RAM is volatile and fast. SSDs are persistent and much faster than disks, but still far slower than RAM. The gap is why caching and batching matter.' },
        { type: 'list', items: [
          'RAM: nanoseconds, volatile',
          'SSD: tens to hundreds of microseconds, persistent',
          'HDD: milliseconds, mechanical seek',
          'NVMe: a faster SSD interface over PCIe',
          'Battery-backed cache can protect writes',
        ] },
        { type: 'note', value: 'A database tuned for HDD assumptions can be very conservative on NVMe. Measure the actual device before copying old settings.' },
      ],
    },
    {
      id: 'arch-latency-numbers',
      title: 'Latency numbers',
      blocks: [
        { type: 'text', value: 'Jeff Dean\'s latency numbers are a classic scale reference. They are approximate but extremely useful for design intuition.' },
        { type: 'code', lang: 'text', tryIt: false, value: `L1 cache reference        0.5 ns
Branch mispredict         5 ns
L2 cache reference        7 ns
Mutex lock/unlock        25 ns
Main memory reference   100 ns
Read 1 MB sequentially  ~250 us from RAM
SSD random read        ~100 us
Disk seek              ~10 ms
Network round trip     ~0.5 ms same datacenter` },
        { type: 'note', value: 'If a network round trip is 0.5 ms, ten sequential calls cost 5 ms. Batching and parallel calls change the design.' },
      ],
    },
    {
      id: 'arch-storage-design',
      title: 'Design implications',
      blocks: [
        { type: 'list', items: [
          'Keep hot data in memory',
          'Batch disk and network operations',
          'Use sequential access when possible',
          'Compress to reduce I/O',
          'Cache with a clear invalidation policy',
          'Measure p95 and p99, not only the average',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `iostat -x 1
iotop
fio --name=randread --size=1G --bs=4k --rw=randread` },
        { type: 'note', value: 'Storage performance is often about access patterns, not raw throughput. Random 4K reads are the worst case.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'storage',
      q: 'Which is persistent?',
      options: ['RAM', 'SSD', 'CPU register', 'L1 cache'],
      answer: 1,
      explain: 'SSDs keep data without power.',
    },
    {
      chapterId: 'storage',
      q: 'Which is slowest?',
      options: ['L1 cache', 'RAM', 'SSD', 'HDD'],
      answer: 3,
      explain: 'Mechanical seek is milliseconds.',
    },
    {
      chapterId: 'storage',
      q: 'Why batch I/O?',
      options: ['To reduce per-operation latency and overhead', 'To use more RAM', 'To encrypt data', 'To compile code'],
      answer: 0,
      explain: 'One large transfer beats many small ones.',
    },
  ],
};
