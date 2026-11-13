// Docker chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Containerise a stack and prepare for Docker questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'docker-project-stack',
      title: 'Project: containerise a stack',
      blocks: [
        { type: 'text', value: 'Take an API and a database. Write a multi-stage Dockerfile, a Compose file, a health check and a volume for data. That is a complete, portfolio-ready Docker slice.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `services:
  api:
    build:
      context: .
      target: runtime
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-fsS", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:` },
        { type: 'note', value: 'A health check plus depends_on with service_healthy stops the API from starting before the database is ready.' },
      ],
    },
    {
      id: 'docker-project-image',
      title: 'Project: a production image',
      blocks: [
        { type: 'text', value: 'Write a multi-stage Dockerfile: build in one stage, copy only the output into a small runtime image. Run as a non-root user and pin the base version.' },
        { type: 'code', lang: 'dockerfile', tryIt: false, value: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]` },
        { type: 'list', items: [
          'Build tools stay out of the runtime image',
          'Pin the base image version',
          'Run as a non-root user',
          'Add a HEALTHCHECK',
          'Keep the image small',
        ] },
        { type: 'note', value: 'A smaller image deploys faster and has fewer packages to patch.' },
      ],
    },
    {
      id: 'docker-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Image versus container?',
          'How does a container differ from a VM?',
          'What is a multi-stage build?',
          'CMD versus ENTRYPOINT?',
          'How do you persist data?',
          'How do containers find each other?',
          'How do you keep secrets out of an image?',
          'Why pin image versions?',
        ] },
        { type: 'text', value: 'Strong answers connect the tool to a failure mode: volumes prevent data loss, health checks prevent bad deploys, non-root limits damage, pinned versions make builds reproducible.' },
        { type: 'note', value: 'Be ready to read a Dockerfile or Compose file and spot the problem. That practical question appears more often than trivia.' },
      ],
    },
    {
      id: 'docker-checklist',
      title: 'Production checklist',
      blocks: [
        { type: 'list', items: [
          'Small, pinned base image, rebuilt regularly',
          'Multi-stage build and no build tools at runtime',
          'Non-root user and dropped capabilities',
          'Secrets injected at runtime',
          'Health check and resource limits',
          'Volumes for persistent data',
          'Logs with size limits or a log driver',
          'HTTPS through a reverse proxy',
          'A rollback plan',
        ] },
        { type: 'text', value: 'A container is only as reliable as the operations around it. The checklist is the difference between a demo and a service.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why use a multi-stage build?',
      options: ['To run two containers', 'To keep build tools out of the runtime image', 'To enable HTTPS', 'To avoid volumes'],
      answer: 1,
      explain: 'Only the output is copied into the final stage.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What prevents data loss when a container is replaced?',
      options: ['A bigger image', 'A volume', 'A health check', 'A restart policy'],
      answer: 1,
      explain: 'Volumes live outside the container lifecycle.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which practice limits damage if a process is compromised?',
      options: ['Running as root', 'Running as non-root with dropped capabilities', 'Using latest tags', 'Mounting the Docker socket'],
      answer: 1,
      explain: 'Least privilege reduces what an attacker can do.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why pin a base image version?',
      options: ['It is shorter', 'Reproducible builds and predictable upgrades', 'It is faster', 'It uses less CPU'],
      answer: 1,
      explain: 'A pinned version makes builds reproducible.',
    },
  ],
};
