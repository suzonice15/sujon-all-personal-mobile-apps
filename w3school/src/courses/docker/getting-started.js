// Docker chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Containers, images and the Docker architecture',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'docker-what-is',
      title: 'What is a container?',
      blocks: [
        { type: 'text', value: 'A container packages an application with its runtime, libraries and configuration. It runs as an isolated process on the host kernel, so it starts in seconds and behaves the same on every machine.' },
        { type: 'list', items: [
          'Image - a read-only template with files and metadata',
          'Container - a running instance of an image',
          'Registry - a store for images, such as Docker Hub',
          'Volume - persistent storage outside the container filesystem',
        ] },
        { type: 'note', value: 'A container is not a small virtual machine. It shares the host kernel, so it is lighter but provides less isolation than a VM.' },
      ],
    },
    {
      id: 'docker-vm',
      title: 'Containers versus VMs',
      blocks: [
        { type: 'list', items: [
          'VM: full guest OS, own kernel, slower boot, heavier',
          'Container: shares the host kernel, fast boot, small image',
          'VM: stronger isolation boundary',
          'Container: easier to build, ship and scale',
        ] },
        { type: 'text', value: 'Use containers for application packaging and CI. Use VMs when you need a different kernel, stronger isolation or a full desktop environment.' },
        { type: 'note', value: 'Containers are not automatically secure. A privileged container or a mounted Docker socket can take over the host.' },
      ],
    },
    {
      id: 'docker-architecture',
      title: 'The Docker architecture',
      blocks: [
        { type: 'text', value: 'The Docker client talks to the Docker daemon over a socket. The daemon builds images, runs containers and pulls from registries.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker --version
docker info
docker run hello-world

# The client can talk to a remote daemon
docker context ls` },
        { type: 'note', value: 'On Linux the daemon runs as root, so membership in the docker group is effectively root access. Treat it that way.' },
      ],
    },
    {
      id: 'docker-install',
      title: 'Install and verify',
      blocks: [
        { type: 'text', value: 'Docker Desktop is the easiest setup on Windows and macOS. On Linux, install Docker Engine from the official repository.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Verify the install
docker run --rm hello-world

# See running containers and local images
docker ps
docker images

# Remove everything you created while learning
docker system prune` },
        { type: 'note', value: 'On Windows, enable WSL 2 for Docker Desktop. Containers run in the Linux VM, which is why Linux images work unchanged.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is an image?',
      options: ['A running container', 'A read-only template for containers', 'A virtual machine', 'A network'],
      answer: 1,
      explain: 'A container is created from an image.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the main difference between a container and a VM?',
      options: ['Containers share the host kernel', 'VMs cannot run Linux', 'Containers have no filesystem', 'VMs are always faster'],
      answer: 0,
      explain: 'Containers isolate processes on the same kernel; VMs run a full guest OS.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does a registry store?',
      options: ['Logs', 'Images', 'Volumes', 'Passwords only'],
      answer: 1,
      explain: 'Registries such as Docker Hub store and distribute images.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why is docker group membership sensitive?',
      options: ['It is slow', 'It is effectively root access', 'It disables networking', 'It deletes images'],
      answer: 1,
      explain: 'The daemon runs as root and can mount the host filesystem.',
    },
  ],
};
