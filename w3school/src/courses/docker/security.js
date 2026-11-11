// Docker chapter: Security.

export default {
  id: 'security',
  title: 'Container Security',
  description: 'Least privilege, secrets and safe images',
  icon: 'shield',
  lessons: [
    {
      id: 'security-non-root',
      title: 'Run as non-root',
      blocks: [
        { type: 'text', value: 'A container that runs as root is root on the host if it escapes. Create a user and switch to it. Most base images allow this with one instruction.' },
        { type: 'code', lang: 'dockerfile', tryIt: false, value: `FROM node:20-alpine

WORKDIR /app
COPY --chown=node:node . .
RUN npm ci --omit=dev

USER node
CMD ["node", "server.js"]` },
        { type: 'note', value: 'USER node is a one-line improvement with real impact. It limits what an attacker can do after a process compromise.' },
      ],
    },
    {
      id: 'security-secrets',
      title: 'Secrets',
      blocks: [
        { type: 'text', value: 'Never bake secrets into an image or a build argument. Pass them at runtime from the platform secret store or a secret file mounted read-only.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Runtime environment
docker run -e DATABASE_URL="$DATABASE_URL" app

# Docker secrets in Swarm / Compose
docker secret create db_password ./db_password.txt` },
        { type: 'note', value: 'A secret in a layer can be extracted even if a later layer deletes it. Build args are visible in image history.' },
      ],
    },
    {
      id: 'security-scan',
      title: 'Image scanning',
      blocks: [
        { type: 'text', value: 'Scan images for known vulnerabilities in the base image and dependencies. Rebuild regularly so patched base images are picked up.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker scout cves myapp:1.0
trivy image myapp:1.0

# Keep the base image current
docker pull node:20-alpine` },
        { type: 'list', items: [
          'Use a minimal base image such as alpine or distroless',
          'Pin a version, then rebuild to get patches',
          'Remove package managers and compilers from runtime images',
          'Scan in CI and fail on critical findings',
        ] },
      ],
    },
    {
      id: 'security-runtime',
      title: 'Runtime hardening',
      blocks: [
        { type: 'list', items: [
          'Drop Linux capabilities you do not need',
          'Use a read-only root filesystem where possible',
          'Set memory and CPU limits',
          'Do not mount the Docker socket into a container',
          'Use a private network for internal services',
          'Keep the host and the daemon updated',
        ] },
        { type: 'code', lang: 'yaml', tryIt: false, value: `services:
  api:
    image: myapp:1.0
    read_only: true
    tmpfs:
      - /tmp
    cap_drop:
      - ALL
    security_opt:
      - no-new-privileges:true` },
        { type: 'note', value: 'A privileged container is effectively host root. Avoid --privileged and only add the specific capability a service needs.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security',
      q: 'Why run a container as non-root?',
      options: ['It is faster', 'It limits damage if the process is compromised', 'It enables networking', 'It reduces image size'],
      answer: 1,
      explain: 'A non-root user cannot modify system files or perform privileged actions.',
    },
    {
      chapterId: 'security',
      q: 'How should secrets be provided?',
      options: ['In the Dockerfile', 'As a build argument', 'At runtime from a secret store', 'In the image tag'],
      answer: 2,
      explain: 'Runtime injection keeps secrets out of image layers.',
    },
    {
      chapterId: 'security',
      q: 'What does a vulnerability scanner check?',
      options: ['Code style', 'Known CVEs in packages and the base image', 'Git history', 'DNS records'],
      answer: 1,
      explain: 'Scanners match package versions against vulnerability databases.',
    },
    {
      chapterId: 'security',
      q: 'Why is mounting the Docker socket dangerous?',
      options: ['It is slow', 'It gives the container control of the host daemon', 'It disables logs', 'It breaks networking'],
      answer: 1,
      explain: 'The socket is effectively root access to the host.',
    },
  ],
};
