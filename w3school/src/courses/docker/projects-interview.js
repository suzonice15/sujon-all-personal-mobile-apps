// Docker chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Containerise a full stack and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'docker-project-stack',
      title: 'Project: containerise a stack',
      blocks: [
        { type: 'text', value: 'Take an API and a database. Write a multi-stage Dockerfile, a Compose file, a health check and a CI pipeline. That is a complete, portfolio-ready DevOps slice.' },
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
      ],
    },
    {
      id: 'docker-project-ci',
      title: 'Project: pipeline',
      blocks: [
        { type: 'text', value: 'Add three jobs: test, build and deploy. The deploy job runs only on main and uses the image digest from the build job.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t app:\${{ github.sha }} .

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploy app:\${{ github.sha }}"` },
        { type: 'note', value: 'A deploy job should verify the health endpoint after release and fail loudly if the new version is not serving.' },
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
          'What does a health check prove?',
          'How do you deploy without downtime?',
          'When would you choose Kubernetes?',
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
          'Multi-stage build and no build tools in runtime',
          'Non-root user and dropped capabilities',
          'Secrets injected at runtime',
          'Health check and resource limits',
          'Volumes for persistent data',
          'Logs with size limits or a log driver',
          'HTTPS through a reverse proxy',
          'CI builds and scans the image',
          'Rollback plan and tested restore',
        ] },
        { type: 'text', value: 'A container is only as reliable as the operations around it. The checklist is the difference between a demo and a service.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should a deploy job verify?',
      options: ['The git branch', 'The health endpoint of the new version', 'The disk size', 'The Docker version'],
      answer: 1,
      explain: 'A passing health check confirms the new version can serve traffic.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why use a multi-stage build?',
      options: ['To run two containers', 'To keep build tools out of the runtime image', 'To enable HTTPS', 'To avoid volumes'],
      answer: 1,
      explain: 'Only the compiled output is copied into the final stage.',
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
  ],
};
