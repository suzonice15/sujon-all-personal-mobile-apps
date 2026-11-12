// OS chapter: Processes.

export default {
  id: 'processes',
  title: 'Processes & Threads',
  description: 'States, context switches and scheduling',
  icon: 'account-tree',
  lessons: [
    {
      id: 'os-process-thread',
      title: 'Process versus thread',
      blocks: [
        { type: 'text', value: 'A process has its own address space and resources. A thread is a unit of execution inside a process; threads share memory and files. A context switch saves one execution state and restores another.' },
        { type: 'list', items: [
          'Process: isolated memory, heavier creation',
          'Thread: shared memory, lighter, needs synchronization',
          'PCB: process control block with registers, state and page tables',
          'Context switch: save state, load state, switch page tables',
        ] },
        { type: 'note', value: 'More threads do not automatically mean more speed. Beyond the CPU core count, they add context switches and contention.' },
      ],
    },
    {
      id: 'os-process-states',
      title: 'Process states',
      blocks: [
        { type: 'text', value: 'A process moves through new, ready, running, waiting and terminated. It is ready when it can run, running when it has the CPU, and waiting when it needs I/O or an event.' },
        { type: 'code', lang: 'text', tryIt: false, value: `new -> ready -> running -> terminated
             ^        |
             |        v
           ready <- waiting (I/O completes)` },
        { type: 'note', value: 'A process sleeping in I/O does not use CPU time. A busy loop does, which is why the scheduler preempts it.' },
      ],
    },
    {
      id: 'os-scheduling',
      title: 'Scheduling',
      blocks: [
        { type: 'list', items: [
          'FCFS - simple, can cause long waits',
          'Shortest job first - optimal average wait, needs prediction',
          'Round robin - fair, uses time slices',
          'Priority - important work first, can starve low priority',
          'Multilevel feedback - adapts to behaviour',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `ps -eo pid,ppid,stat,ni,cmd
nice -n 10 ./batch-job
renice 5 -p 1234

# stat: R running, S sleeping, D uninterruptible, Z zombie` },
        { type: 'note', value: 'The scheduler balances latency, fairness and throughput. Real systems use a hybrid, not one textbook algorithm.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'processes',
      q: 'What do threads share?',
      options: ['Nothing', 'Memory and files in the same process', 'Only the CPU', 'Only the disk'],
      answer: 1,
      explain: 'Threads share the process address space.',
    },
    {
      chapterId: 'processes',
      q: 'What does a context switch save?',
      options: ['Only the file', 'Registers and execution state', 'The whole disk', 'The network'],
      answer: 1,
      explain: 'It saves the running state and restores another.',
    },
    {
      chapterId: 'processes',
      q: 'What does round robin use?',
      options: ['Time slices', 'Random order', 'Only priorities', 'Disk order'],
      answer: 0,
      explain: 'Each process gets a time slice.',
    },
  ],
};
