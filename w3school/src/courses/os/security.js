// OS chapter: Security.

export default {
  id: 'security',
  title: 'OS Security',
  description: 'Isolation, permissions, ASLR and sandboxing',
  icon: 'shield',
  lessons: [
    {
      id: 'os-isolation',
      title: 'Isolation',
      blocks: [
        { type: 'text', value: 'The OS isolates processes with separate address spaces, users and permissions. A vulnerability becomes serious when it crosses those boundaries.' },
        { type: 'list', items: [
          'User and group permissions',
          'Separate virtual address spaces',
          'Kernel/user privilege separation',
          'System call filtering (seccomp)',
          'Namespaces and cgroups in containers',
        ] },
        { type: 'note', value: 'Running a service as a dedicated unprivileged user limits what a compromise can touch.' },
      ],
    },
    {
      id: 'os-aslr',
      title: 'ASLR and hardening',
      blocks: [
        { type: 'text', value: 'Address Space Layout Randomisation randomises memory locations, making some exploits harder. It is a mitigation, not a guarantee.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `cat /proc/sys/kernel/randomize_va_space

# Node.js examples of hardening
# - do not run as root
# - drop capabilities
# - use a read-only filesystem where possible` },
        { type: 'list', items: [
          'ASLR randomises addresses',
          'NX/DEP blocks executable data',
          'Stack canaries detect overflows',
          'seccomp limits syscalls',
          'SELinux/AppArmor enforce policy',
        ] },
      ],
    },
    {
      id: 'os-sandbox',
      title: 'Sandboxing',
      blocks: [
        { type: 'text', value: 'A sandbox restricts what a process can do even if it is compromised: files, network, syscalls and privileges. Browsers and mobile apps rely on it heavily.' },
        { type: 'list', items: [
          'Mobile apps run in a per-app sandbox',
          'Browsers isolate tabs in processes',
          'Containers use namespaces and cgroups',
          'Seccomp profiles limit syscalls',
          'Least privilege applies to services too',
        ] },
        { type: 'note', value: 'Sandboxing is defense in depth. It does not replace patching or input validation.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security',
      q: 'What separates process memory?',
      options: ['A compiler', 'Virtual address spaces', 'A database', 'A DNS record'],
      answer: 1,
      explain: 'Each process has its own page table.',
    },
    {
      chapterId: 'security',
      q: 'What does ASLR do?',
      options: ['Encrypts disks', 'Randomises memory addresses', 'Schedules threads', 'Compresses files'],
      answer: 1,
      explain: 'It makes address prediction harder.',
    },
    {
      chapterId: 'security',
      q: 'Why run a service as a non-root user?',
      options: ['It is faster', 'It limits the impact of a compromise', 'It enables DNS', 'It reduces memory'],
      answer: 1,
      explain: 'Least privilege limits damage.',
    },
  ],
};
