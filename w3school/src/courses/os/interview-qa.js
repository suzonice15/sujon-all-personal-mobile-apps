// Operating Systems interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What does an operating system do?',
      a: 'It manages CPU, memory, files, devices and users, and gives applications a safe interface through system calls.',
      level: 'basic',
    },
    {
      q: 'Kernel mode versus user mode?',
      a: 'Kernel mode can execute privileged instructions and access hardware. User mode is restricted. A system call switches into the kernel to perform a protected operation.',
      level: 'intermediate',
    },
    {
      q: 'What is a system call?',
      a: 'A controlled entry into the kernel, such as open, read, write, fork or exec. It is the boundary between an app and the OS.',
      level: 'basic',
    },
  ],
  processes: [
    {
      q: 'Process versus thread?',
      a: 'A process has its own address space. Threads share the process memory and files, so they are lighter but need synchronization.',
      level: 'basic',
    },
    {
      q: 'What is a context switch?',
      a: 'Saving the state of one execution and restoring another, including registers and page tables. It has a real cost, so excessive switching hurts performance.',
      level: 'intermediate',
    },
    {
      q: 'What are the process states?',
      a: 'New, ready, running, waiting and terminated. A process is ready when it can run and waiting when it needs I/O or an event.',
      level: 'basic',
    },
  ],
  memory: [
    {
      q: 'What is virtual memory?',
      a: 'A per-process address space translated to physical memory by the MMU and page tables. It provides isolation and allows paging.',
      level: 'basic',
    },
    {
      q: 'What is a page fault?',
      a: 'An access to a page not currently in RAM. The OS loads it from disk or allocates a frame, then restarts the instruction.',
      level: 'intermediate',
    },
    {
      q: 'What is thrashing?',
      a: 'Excessive paging because the working set does not fit in memory. The system spends most time swapping instead of doing work.',
      level: 'advanced',
    },
  ],
  concurrency: [
    {
      q: 'What is a race condition?',
      a: 'A result that depends on the timing of unsynchronized access to shared data. The fix is a lock or another synchronization primitive around the critical section.',
      level: 'basic',
    },
    {
      q: 'Mutex versus semaphore?',
      a: 'A mutex allows one owner at a time. A semaphore is a counter that allows N owners. Use a mutex for mutual exclusion and a semaphore for limited concurrency.',
      level: 'intermediate',
    },
    {
      q: 'What are the four deadlock conditions?',
      a: 'Mutual exclusion, hold and wait, no preemption and circular wait. Break any one to prevent deadlock, for example by acquiring locks in a global order.',
      level: 'advanced',
    },
  ],
  filesystems: [
    {
      q: 'What is an inode?',
      a: 'The filesystem metadata for a file: permissions, size, timestamps and data block pointers. The name lives in a directory entry.',
      level: 'basic',
    },
    {
      q: 'Hard link versus symbolic link?',
      a: 'A hard link is another name for the same inode. A symbolic link is a small file containing a path and can point to a missing target.',
      level: 'intermediate',
    },
    {
      q: 'Why do filesystems journal?',
      a: 'To recover quickly after a crash without scanning the whole disk. The journal records changes before they are applied.',
      level: 'intermediate',
    },
  ],
  io: [
    {
      q: 'Interrupt versus polling?',
      a: 'An interrupt notifies the CPU when a device needs attention. Polling repeatedly checks the device and wastes CPU cycles when idle.',
      level: 'basic',
    },
    {
      q: 'What is DMA?',
      a: 'Direct Memory Access moves data between a device and RAM without the CPU copying every byte. The CPU starts the transfer and gets an interrupt when it finishes.',
      level: 'intermediate',
    },
    {
      q: 'Why buffer I/O?',
      a: 'To smooth speed differences between fast and slow components, and to batch small operations into efficient transfers.',
      level: 'basic',
    },
  ],
  virtualization: [
    {
      q: 'What does a hypervisor do?',
      a: 'It virtualises hardware so guest operating systems can run. Type 1 runs on bare metal; type 2 runs on a host OS.',
      level: 'basic',
    },
    {
      q: 'How does a container isolate a process?',
      a: 'Namespaces isolate what the process can see, and cgroups limit CPU, memory and I/O. The host kernel is shared.',
      level: 'intermediate',
    },
    {
      q: 'VM versus container?',
      a: 'A VM has its own kernel and stronger isolation but is heavier. A container shares the host kernel, starts fast and is denser but has a smaller isolation boundary.',
      level: 'intermediate',
    },
  ],
  security: [
    {
      q: 'How does the OS isolate processes?',
      a: 'Separate virtual address spaces, user and group permissions, and kernel/user privilege separation.',
      level: 'basic',
    },
    {
      q: 'What does ASLR do?',
      a: 'It randomises memory layout so an attacker cannot rely on fixed addresses. It is a mitigation, not a guarantee.',
      level: 'intermediate',
    },
    {
      q: 'What is a sandbox?',
      a: 'A restricted environment that limits files, network, syscalls and privileges even if the process is compromised.',
      level: 'intermediate',
    },
  ],
  'linux-case': [
    {
      q: 'What happens during Linux boot?',
      a: 'Firmware starts the bootloader, the kernel initialises devices and mounts the root filesystem, then systemd starts services.',
      level: 'basic',
    },
    {
      q: 'What is in /proc?',
      a: 'A virtual filesystem exposing kernel and process state, such as cpuinfo, meminfo and per-process status.',
      level: 'intermediate',
    },
    {
      q: 'How do you find what a process is doing?',
      a: 'strace for syscalls, lsof for open files and sockets, perf for CPU profiles, and ps/top for resource use.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you debug a machine with high CPU?',
      a: 'Find the process with top or ps, inspect its threads, profile with perf, and check for busy loops or excessive syscalls.',
      level: 'intermediate',
    },
    {
      q: 'How do you debug high memory use?',
      a: 'Check RSS and cache with free and vmstat, find the process with ps, and look for leaks or a working set that no longer fits in RAM.',
      level: 'intermediate',
    },
    {
      q: 'Why does a zombie process exist?',
      a: 'The child exited but the parent has not called wait(). The fix is in the parent, not killing the zombie.',
      level: 'advanced',
    },
    {
      q: 'What is the best way to learn OS concepts?',
      a: 'Run small experiments: fork and wait, watch page faults, trace syscalls, create a container, and measure with real tools.',
      level: 'basic',
    },
  ],
};
