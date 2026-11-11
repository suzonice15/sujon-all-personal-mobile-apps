// Docker chapter: Compose.

export default {
  id: 'compose',
  title: 'Docker Compose',
  description: 'Describe a multi-container app in one file',
  icon: 'layers',
  lessons: [
    {
      id: 'compose-basics',
      title: 'docker-compose.yml',
      blocks: [
        { type: 'text', value: 'Compose describes services, networks and volumes in YAML. One command starts the whole stack for local development or a small deployment.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    restart: unless-stopped

  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:` },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker compose up -d
docker compose ps
docker compose logs -f api
docker compose down
docker compose down -v   # also removes volumes` },
        { type: 'note', value: 'docker compose down keeps named volumes by default. Add -v only when you really want to delete the data.' },
      ],
    },
    {
      id: 'compose-env-depends',
      title: 'Environment and dependencies',
      blocks: [
        { type: 'text', value: 'Use an .env file for local values. depends_on controls start order, but it does not wait for the service to be ready.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `services:
  api:
    build: .
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 5` },
        { type: 'note', value: 'A healthcheck plus condition: service_healthy is the reliable way to wait for a database. Without it the API may start before Postgres accepts connections.' },
      ],
    },
    {
      id: 'compose-volumes',
      title: 'Volumes and bind mounts',
      blocks: [
        { type: 'text', value: 'A named volume stores data managed by Docker. A bind mount maps a host path. Use volumes for data and bind mounts for development.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `services:
  api:
    build: .
    volumes:
      - ./src:/app/src      # bind mount for live edits
      - uploads:/app/uploads # named volume for user files

volumes:
  uploads:` },
        { type: 'note', value: 'On Windows and macOS, bind mounts are slower than inside a Linux VM. Keep node_modules in a volume if the host mount makes it slow.' },
      ],
    },
    {
      id: 'compose-profiles',
      title: 'Profiles and overrides',
      blocks: [
        { type: 'text', value: 'Compose profiles start optional services only when requested. An override file adds development settings without changing the base file.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `services:
  api:
    build: .
  debug:
    image: busybox
    profiles: ["debug"]
    command: sleep infinity` },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker compose --profile debug up -d
docker compose -f docker-compose.yml -f docker-compose.dev.yml up` },
        { type: 'note', value: 'Keep the production compose file small and explicit. Put development ports, mounts and debug tools in an override file.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'compose',
      q: 'Which command starts a Compose stack in the background?',
      options: ['docker compose up -d', 'docker compose run', 'docker compose build', 'docker compose down'],
      answer: 0,
      explain: '-d runs the services detached.',
    },
    {
      chapterId: 'compose',
      q: 'Does depends_on wait for the database to be ready?',
      options: ['Yes, always', 'No, only for start order', 'Only with volumes', 'Only in production'],
      answer: 1,
      explain: 'Use a healthcheck with condition: service_healthy to wait.',
    },
    {
      chapterId: 'compose',
      q: 'What does docker compose down -v remove?',
      options: ['Only containers', 'Containers and named volumes', 'Only images', 'Networks only'],
      answer: 1,
      explain: 'The -v flag also deletes named volumes and their data.',
    },
    {
      chapterId: 'compose',
      q: 'Where should development ports and mounts go?',
      options: ['The base file', 'An override file', 'The Dockerfile', 'The registry'],
      answer: 1,
      explain: 'Overrides keep production settings clean and explicit.',
    },
  ],
};
