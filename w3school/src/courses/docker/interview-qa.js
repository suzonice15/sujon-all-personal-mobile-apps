// Docker interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is a container?',
      a: 'An isolated process packaged with its runtime, libraries and configuration, running on the host kernel.',
      level: 'basic',
    },
    {
      q: 'Image versus container?',
      a: 'An image is a read-only template. A container is a running instance of an image.',
      level: 'basic',
    },
    {
      q: 'How does a container differ from a VM?',
      a: 'A container shares the host kernel and starts in seconds. A VM runs a full guest OS with its own kernel.',
      level: 'basic',
    },
    {
      q: 'Why is docker group membership sensitive?',
      a: 'The daemon runs as root and can mount the host filesystem, so membership is effectively root access.',
      level: 'advanced',
    },
  ],
  'docker-basics': [
    {
      q: 'What does docker run do?',
      a: 'It creates a container from an image, starts it, and optionally attaches a terminal or publishes ports.',
      level: 'basic',
    },
    {
      q: 'What does -p 8080:80 mean?',
      a: 'Map host port 8080 to container port 80.',
      level: 'basic',
    },
    {
      q: 'What does docker ps show?',
      a: 'Running containers. Use docker ps -a to include stopped ones.',
      level: 'basic',
    },
    {
      q: 'Why remove stopped containers and unused images?',
      a: 'They consume disk and make the environment confusing. Use docker system prune carefully.',
      level: 'intermediate',
    },
  ],
  dockerfile: [
    {
      q: 'CMD versus ENTRYPOINT?',
      a: 'ENTRYPOINT sets the fixed command. CMD provides default arguments that can be overridden at run time.',
      level: 'intermediate',
    },
    {
      q: 'Why copy package files before the source?',
      a: 'It lets Docker cache the dependency install layer and rebuild faster when only source code changes.',
      level: 'intermediate',
    },
    {
      q: 'What is a multi-stage build?',
      a: 'A Dockerfile with several stages where only the final output is copied into the runtime image.',
      level: 'intermediate',
    },
    {
      q: 'Why avoid running as root?',
      a: 'A compromised process would have root inside the container and more power to attack the host.',
      level: 'basic',
    },
  ],
  'images-volumes': [
    {
      q: 'What is a volume?',
      a: 'Persistent storage managed by Docker that lives outside the container filesystem.',
      level: 'basic',
    },
    {
      q: 'Volume versus bind mount?',
      a: 'A volume is managed by Docker. A bind mount maps a host path directly, which is useful in development.',
      level: 'intermediate',
    },
    {
      q: 'How do you reduce image size?',
      a: 'Use a small base image, a multi-stage build, fewer layers and a .dockerignore file.',
      level: 'intermediate',
    },
    {
      q: 'What does a registry do?',
      a: 'It stores and distributes images, such as Docker Hub or a private registry.',
      level: 'basic',
    },
  ],
  networking: [
    {
      q: 'How do containers find each other on a user-defined network?',
      a: 'Docker provides DNS on the network, so a container reaches another by its service name.',
      level: 'intermediate',
    },
    {
      q: 'What is the default bridge network?',
      a: 'A network that containers join by default. User-defined networks are preferred because they provide DNS.',
      level: 'intermediate',
    },
    {
      q: 'Why publish a port?',
      a: 'To make a container port reachable from the host or outside world.',
      level: 'basic',
    },
    {
      q: 'Why put a reverse proxy in front of containers?',
      a: 'It handles HTTPS, routing and load balancing, so app containers stay simple.',
      level: 'advanced',
    },
  ],
  compose: [
    {
      q: 'What is Docker Compose?',
      a: 'A tool to define and run multiple containers from one YAML file, with networks and volumes.',
      level: 'basic',
    },
    {
      q: 'What does depends_on do?',
      a: 'It controls start order. With condition: service_healthy, it waits for a health check.',
      level: 'intermediate',
    },
    {
      q: 'Why use Compose in development?',
      a: 'It starts the app with its database and cache in one command, matching production more closely.',
      level: 'basic',
    },
    {
      q: 'What is the difference between Compose and Kubernetes?',
      a: 'Compose runs containers on one host. Kubernetes schedules across a cluster with scaling and self-healing.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How do you keep an image small?',
      a: 'A small base, multi-stage build, .dockerignore, fewer layers and no dev dependencies in runtime.',
      level: 'intermediate',
    },
    {
      q: 'How do you persist database data?',
      a: 'A named volume mounted at the database data directory.',
      level: 'basic',
    },
    {
      q: 'How do you handle secrets in containers?',
      a: 'Inject them at runtime from a secret store or environment, never bake them into the image.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first Docker step?',
      a: 'Run a hello-world container, then containerise a small app with a Dockerfile and Compose.',
      level: 'basic',
    },
  ],
  'security-registries': [
    {
      q: 'Why run a container as non-root?',
      a: 'If the process is compromised, it has fewer permissions inside the container and on a mounted volume.',
      level: 'basic',
    },
    {
      q: 'What does a multi-stage build give you?',
      a: 'A small final image with only runtime files; compilers and dev dependencies stay in the build stage.',
      level: 'basic',
    },
    {
      q: 'Why deploy by digest?',
      a: 'A digest is immutable, so the exact bytes you tested are the bytes that run. A tag can be overwritten.',
      level: 'intermediate',
    },
    {
      q: 'How do you secure the image supply chain?',
      a: 'Pin base images, scan for critical CVEs, generate an SBOM, sign the image and verify the signature before deploy.',
      level: 'advanced',
    },
  ],
};
