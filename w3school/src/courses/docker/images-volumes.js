// Docker chapter: Images and Volumes.

export default {
  id: 'images-volumes',
  title: 'Images & Volumes',
  description: 'Build, tag, share and persist data',
  icon: 'storage',
  lessons: [
    {
      id: 'docker-build-tag',
      title: 'Build and tag',
      blocks: [
        { type: 'text', value: 'docker build reads a Dockerfile and a context. A tag names the image and often includes a version. Never rely on :latest in production.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker build -t codenest-api:1.0 .
docker build -t codenest-api:latest .

docker images
docker tag codenest-api:1.0 registry.example.com/codenest-api:1.0
docker push registry.example.com/codenest-api:1.0` },
        { type: 'note', value: 'A tag is a mutable label. Pin a digest in production if you need the exact same image every time.' },
      ],
    },
    {
      id: 'docker-volumes',
      title: 'Volumes',
      blocks: [
        { type: 'text', value: 'A volume is managed by Docker and survives container removal. It is the correct place for database files and uploads.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker volume create pgdata
docker run -d --name db \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16

docker volume ls
docker volume inspect pgdata` },
        { type: 'note', value: 'The container filesystem is ephemeral. Anything you need after a restart belongs in a volume or an external service.' },
      ],
    },
    {
      id: 'docker-bind-mounts',
      title: 'Bind mounts',
      blocks: [
        { type: 'text', value: 'A bind mount maps a host directory into the container. It is ideal for development because edits on the host appear immediately.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker run --rm -it \\
  -v "$(pwd)/src:/app/src" \\
  -w /app \\
  node:20 sh` },
        { type: 'list', items: [
          'Volume: Docker-managed, portable, best for data',
          'Bind mount: host path, best for development',
          'tmpfs: memory only, disappears on stop',
          'Read-only mount: add :ro to prevent writes',
        ] },
      ],
    },
    {
      id: 'docker-registry',
      title: 'Registries',
      blocks: [
        { type: 'text', value: 'A registry stores images. Docker Hub is public; GitHub Container Registry, ECR and GCR are common private options. Authentication is required to push.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker login registry.example.com
docker push registry.example.com/codenest-api:1.0
docker pull registry.example.com/codenest-api:1.0

docker logout` },
        { type: 'note', value: 'Scan images for known vulnerabilities before pushing. A base image that is months old is a common source of security findings.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'images-volumes',
      q: 'What does docker build -t name:tag . do?',
      options: ['Runs a container', 'Builds an image from the current context', 'Pushes an image', 'Deletes an image'],
      answer: 1,
      explain: 'It builds with the Dockerfile in the current directory.',
    },
    {
      chapterId: 'images-volumes',
      q: 'Where should database files live?',
      options: ['The container layer', 'A volume', 'The image', 'A bind mount in production'],
      answer: 1,
      explain: 'Named volumes persist beyond the container.',
    },
    {
      chapterId: 'images-volumes',
      q: 'When is a bind mount useful?',
      options: ['For production data', 'For development with live edits', 'For encrypting images', 'For networking'],
      answer: 1,
      explain: 'Host edits appear in the container immediately.',
    },
    {
      chapterId: 'images-volumes',
      q: 'Why avoid the :latest tag in production?',
      options: ['It is slower', 'It is mutable and may point to a different image later', 'It cannot be pushed', 'It disables caching'],
      answer: 1,
      explain: 'Pin a version or digest for reproducible deployments.',
    },
  ],
};
