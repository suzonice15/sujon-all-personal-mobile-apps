// Docker & DevOps interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the difference between an image and a container?',
      a: 'An image is a read-only template with files and metadata. A container is a running instance of that image with a writable layer.',
      level: 'basic',
    },
    {
      q: 'How does a container differ from a virtual machine?',
      a: 'A VM runs a full guest OS with its own kernel. A container shares the host kernel and isolates processes, so it is lighter and faster but provides a weaker isolation boundary.',
      level: 'basic',
    },
    {
      q: 'What is a registry?',
      a: 'A service that stores and distributes images, such as Docker Hub, GHCR or a private registry. Push uploads an image; pull downloads it.',
      level: 'basic',
    },
    {
      q: 'Why is docker group membership sensitive?',
      a: 'The Docker daemon runs as root and can mount the host filesystem. A user who can talk to the socket can effectively become root.',
      level: 'advanced',
    },
  ],
  'docker-basics': [
    {
      q: 'What does docker run do?',
      a: 'It creates and starts a container from an image, pulling the image if needed. Flags control ports, names, environment, volumes and cleanup.',
      level: 'basic',
    },
    {
      q: 'What is the difference between docker stop and docker kill?',
      a: 'stop sends SIGTERM and waits, allowing cleanup. kill sends SIGKILL immediately, which can leave state inconsistent.',
      level: 'intermediate',
    },
    {
      q: 'How do you debug a container that exits immediately?',
      a: 'Check docker logs for the error, run the image with an interactive shell, and verify the command and environment variables. An exited container still exists for inspection until removed.',
      level: 'intermediate',
    },
    {
      q: 'What happens to changes made with docker exec?',
      a: 'They live in the container writable layer and disappear when the container is removed. Permanent changes belong in the image or a volume.',
      level: 'basic',
    },
  ],
  dockerfile: [
    {
      q: 'What is a Dockerfile?',
      a: 'A text file of instructions that builds an image layer by layer. Each instruction adds a layer and is cached based on its inputs.',
      level: 'basic',
    },
    {
      q: 'Why copy package files before the source?',
      a: 'Docker caches layers. Dependency installation only reruns when the package files change, not on every source edit.',
      level: 'intermediate',
    },
    {
      q: 'CMD versus ENTRYPOINT?',
      a: 'ENTRYPOINT sets the executable. CMD provides default arguments that the user can override. Use the exec form so signals reach the process.',
      level: 'intermediate',
    },
    {
      q: 'What is a multi-stage build?',
      a: 'A Dockerfile with several FROM stages. Build tools run in an early stage, and only the compiled output is copied into the small runtime stage.',
      level: 'advanced',
    },
  ],
  'images-volumes': [
    {
      q: 'Why avoid the latest tag in production?',
      a: 'It is mutable. The same tag can point to a different image later, so deployments are not reproducible. Pin a version and ideally a digest.',
      level: 'basic',
    },
    {
      q: 'What is the difference between a volume and a bind mount?',
      a: 'A volume is managed by Docker and stored in its own area. A bind mount maps a host path into the container. Use volumes for data and bind mounts for development.',
      level: 'intermediate',
    },
    {
      q: 'How do you persist database data?',
      a: 'Mount a named volume at the database data directory. The container can be replaced or upgraded without losing the volume.',
      level: 'basic',
    },
    {
      q: 'What is the build context?',
      a: 'The files sent to the Docker daemon for a build. A large context slows builds, so use .dockerignore to exclude node_modules, .git and secrets.',
      level: 'intermediate',
    },
  ],
  networking: [
    {
      q: 'What does -p 8080:80 mean?',
      a: 'Publish host port 8080 to container port 80. Traffic to localhost:8080 reaches the service listening on port 80 inside the container.',
      level: 'basic',
    },
    {
      q: 'How do containers on the same user-defined network communicate?',
      a: 'Docker provides embedded DNS. A container can reach another by its container name or service name on that network.',
      level: 'intermediate',
    },
    {
      q: 'Why does localhost inside a container not reach the host?',
      a: 'Each container has its own network namespace and loopback interface. Use host.docker.internal on Docker Desktop or the host bridge address on Linux.',
      level: 'intermediate',
    },
    {
      q: 'When would you use host networking?',
      a: 'When the container must share the host network stack directly, for performance or a specific port. It reduces isolation and is Linux-only for practical purposes.',
      level: 'advanced',
    },
  ],
  compose: [
    {
      q: 'What is Docker Compose?',
      a: 'A tool that describes multiple services, networks and volumes in one YAML file and manages them as a project.',
      level: 'basic',
    },
    {
      q: 'Does depends_on wait for a service to be ready?',
      a: 'It controls start order only. Use a healthcheck with condition: service_healthy to wait until the dependency is actually ready.',
      level: 'intermediate',
    },
    {
      q: 'What does docker compose down -v do?',
      a: 'It stops and removes containers, networks and named volumes. The volume removal deletes the data, so use it carefully.',
      level: 'basic',
    },
    {
      q: 'How do you keep development settings out of production?',
      a: 'Use a base compose file for shared configuration and an override file for development ports, bind mounts and debug tools.',
      level: 'intermediate',
    },
  ],
  'ci-cd': [
    {
      q: 'What is CI?',
      a: 'Continuous integration: every change is built and checked automatically, so integration problems are found early.',
      level: 'basic',
    },
    {
      q: 'Why tag images with the commit SHA?',
      a: 'It ties the artifact to the exact commit that passed the pipeline. Deploying that tag is reproducible and auditable.',
      level: 'intermediate',
    },
    {
      q: 'How do you speed up a pipeline?',
      a: 'Cache dependencies by lockfile hash, use Docker layer caching, run independent jobs in parallel, and fail fast on lint before slow tests.',
      level: 'intermediate',
    },
    {
      q: 'Where should deployment secrets live?',
      a: 'In the CI platform secret store, injected at deploy time. Never in the repository, the image or a build log.',
      level: 'advanced',
    },
  ],
  deployment: [
    {
      q: 'What does a reverse proxy do?',
      a: 'It accepts client requests, terminates TLS and forwards them to the app container. Nginx and Caddy are common choices.',
      level: 'basic',
    },
    {
      q: 'Why is X-Forwarded-Proto important?',
      a: 'The app receives plain HTTP from the proxy. The header tells it the original request was HTTPS, which matters for secure cookies and redirects.',
      level: 'intermediate',
    },
    {
      q: 'How do you deploy without downtime?',
      a: 'Start a new container, wait for its health check, switch traffic, then stop the old one. Keep the previous version for a quick rollback.',
      level: 'intermediate',
    },
    {
      q: 'What breaks certificate renewal?',
      a: 'A blocked port 80, a changed DNS record or a removed webroot. Renewal fails silently unless you monitor the expiry date.',
      level: 'advanced',
    },
  ],
  'monitoring-logs': [
    {
      q: 'Where does docker logs get its data?',
      a: 'From the container stdout and stderr, captured by the configured log driver.',
      level: 'basic',
    },
    {
      q: 'Why limit log size?',
      a: 'Unbounded logs can fill the disk and take down the host. Set max-size and max-file or ship logs to a central service.',
      level: 'basic',
    },
    {
      q: 'What makes a good health check?',
      a: 'It is cheap, checks critical dependencies and returns non-zero on failure. A SELECT 1 against the database is a good example.',
      level: 'intermediate',
    },
    {
      q: 'What is a postmortem for?',
      a: 'To explain the impact, timeline and root cause and to assign follow-up actions that prevent recurrence. It is blameless.',
      level: 'intermediate',
    },
  ],
  security: [
    {
      q: 'Why run containers as non-root?',
      a: 'It limits the damage if the process is compromised. It cannot modify system files or perform privileged operations.',
      level: 'basic',
    },
    {
      q: 'How do you avoid secrets in an image?',
      a: 'Pass them at runtime from a secret store or a mounted secret file. Do not use ENV, COPY or build args for secrets.',
      level: 'intermediate',
    },
    {
      q: 'What does an image scanner check?',
      a: 'Package versions against vulnerability databases, including the base image and installed dependencies.',
      level: 'intermediate',
    },
    {
      q: 'Why is --privileged dangerous?',
      a: 'It gives the container almost all host capabilities and device access, effectively root on the host.',
      level: 'advanced',
    },
  ],
  'kubernetes-intro': [
    {
      q: 'What is a pod?',
      a: 'The smallest deployable unit: one or more containers that share a network namespace and storage.',
      level: 'basic',
    },
    {
      q: 'What does a Deployment do?',
      a: 'It declares the desired replica count and rollout strategy. Kubernetes creates and replaces pods to match.',
      level: 'intermediate',
    },
    {
      q: 'Readiness versus liveness probe?',
      a: 'Readiness controls whether the pod receives traffic. Liveness restarts a stuck container. Both prevent bad user experiences.',
      level: 'intermediate',
    },
    {
      q: 'When should you not use Kubernetes?',
      a: 'When a single small app on one server is enough. The operational cost is high and Compose or a simple platform is often better.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'What does a production Docker checklist include?',
      a: 'Pinned minimal base image, multi-stage build, non-root user, runtime secrets, health checks, resource limits, volumes, log rotation, HTTPS and a rollback plan.',
      level: 'intermediate',
    },
    {
      q: 'How do you make a deployment reproducible?',
      a: 'Pin image versions and lockfiles, tag by commit SHA, build once and deploy that artifact, and keep configuration in version control.',
      level: 'advanced',
    },
    {
      q: 'How do you roll back a container deployment?',
      a: 'Keep the previous image tag or release directory. Start it, verify the health check, and switch traffic back.',
      level: 'basic',
    },
    {
      q: 'What is the most common cause of container incidents?',
      a: 'Misconfiguration: wrong environment variables, missing volumes, exposed ports, or an unhealthy dependency. Logs and health checks find most of them quickly.',
      level: 'basic',
    },
  ],
};
