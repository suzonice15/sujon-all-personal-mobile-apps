// OS chapter: Virtualization.

export default {
  id: 'virtualization',
  title: 'Virtualization',
  description: 'VMs, containers, hypervisors and namespaces',
  icon: 'layers',
  lessons: [
    {
      id: 'os-vm',
      title: 'Virtual machines',
      blocks: [
        { type: 'text', value: 'A hypervisor runs one or more guest operating systems on a host. Each guest has its own kernel and believes it owns the hardware. VMs provide strong isolation.' },
        { type: 'list', items: [
          'Type 1 hypervisor - runs on bare metal',
          'Type 2 hypervisor - runs on a host OS',
          'Full virtualisation vs paravirtualisation',
          'Snapshots and live migration',
          'Stronger isolation than containers',
        ] },
        { type: 'note', value: 'A VM is heavier: it boots a full OS and duplicates the kernel. That is the price of isolation.' },
      ],
    },
    {
      id: 'os-containers',
      title: 'Containers',
      blocks: [
        { type: 'text', value: 'A container is an isolated process on the host kernel. Namespaces isolate what it can see; cgroups limit what it can use. There is no guest kernel.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `unshare --pid --fork --mount-proc bash
# a new PID namespace: inside, the shell is PID 1

systemd-cgls
cat /sys/fs/cgroup/memory.max

docker run --memory=256m --cpus=0.5 nginx` },
        { type: 'note', value: 'Containers are lighter and faster than VMs, but they share the host kernel. A kernel exploit is a bigger risk than in a VM.' },
      ],
    },
    {
      id: 'os-vm-vs-container',
      title: 'Choosing',
      blocks: [
        { type: 'list', items: [
          'VM: different OS, strong isolation, full desktop',
          'Container: app packaging, fast startup, high density',
          'VM: heavier and slower to boot',
          'Container: shares the host kernel',
          'Often both: containers inside VMs in the cloud',
        ] },
        { type: 'text', value: 'The cloud normally runs containers inside VMs. You get packaging and density from containers, and the isolation boundary from the VM.' },
        { type: 'note', value: 'A privileged container or a mounted Docker socket can escape to the host. Treat those as root access.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'virtualization',
      q: 'What does a hypervisor run?',
      options: ['Only containers', 'Guest operating systems', 'Only files', 'Only databases'],
      answer: 1,
      explain: 'It virtualises hardware for guests.',
    },
    {
      chapterId: 'virtualization',
      q: 'What isolates a container?',
      options: ['A guest kernel', 'Namespaces and cgroups', 'A hypervisor', 'A compiler'],
      answer: 1,
      explain: 'Namespaces isolate; cgroups limit.',
    },
    {
      chapterId: 'virtualization',
      q: 'Which is lighter?',
      options: ['A virtual machine', 'A container', 'A dual-boot OS', 'A type 1 hypervisor'],
      answer: 1,
      explain: 'Containers share the host kernel.',
    },
  ],
};
