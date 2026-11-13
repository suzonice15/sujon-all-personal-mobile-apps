// DevOps chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a full delivery pipeline and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'devops-project-pipeline',
      title: 'Project: a complete pipeline',
      blocks: [
        { type: 'text', value: 'Build a pipeline with four jobs: test, build an image, deploy to staging, then promote to production after a manual approval. Add a health check and a rollback step.' },
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
      - run: docker push app:\${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh staging \${{ github.sha }}
      - run: ./smoke-test.sh staging

  deploy-production:
    needs: deploy-staging
    environment: production
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh production \${{ github.sha }}
      - run: ./smoke-test.sh production` },
        { type: 'note', value: 'A manual approval before production is a cheap safety net. It also creates a record of who released what and when.' },
      ],
    },
    {
      id: 'devops-project-observability',
      title: 'Project: health, metrics and alerts',
      blocks: [
        { type: 'text', value: 'Add a health endpoint, a metrics endpoint and three alerts: error rate, latency and availability. Include a runbook link in every alert so the responder knows what to do.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Alert: API error rate above 5% for 5 minutes
Runbook: check recent deploys, database health, then roll back
Owner: platform team

Alert: p95 latency above 800 ms for 10 minutes
Runbook: check database slow queries, then cache hit rate` },
        { type: 'list', items: [
          'Alert on user-facing symptoms',
          'Every alert has an owner and a runbook',
          'Dashboards are for investigation, alerts are for action',
          'Review alerts after each incident',
        ] },
        { type: 'note', value: 'An alert that fires every night is ignored when it matters. Remove noise ruthlessly.' },
      ],
    },
    {
      id: 'devops-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What does a CI pipeline do?',
          'Blue-green versus canary deployment?',
          'How do you do a zero-downtime deploy?',
          'How do you roll back safely?',
          'What do you monitor in production?',
          'How do you manage secrets?',
          'What is infrastructure as code?',
          'When would you use Kubernetes?',
        ] },
        { type: 'text', value: 'Strong answers connect the practice to a failure mode. "Readiness probes prevent traffic reaching a pod that is not ready, so a rollout cannot take the service down" is a complete answer.' },
        { type: 'note', value: 'Be ready to describe one pipeline end to end: what runs, what can fail, and how you recover.' },
      ],
    },
    {
      id: 'devops-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: delivery lifecycle and metrics',
          'Week 2: CI pipelines and caching',
          'Week 3: deployment strategies and rollback',
          'Week 4: logging, metrics and alerts',
          'Week 5: security and secrets',
          'Week 6: Kubernetes basics',
          'Week 7: build and document one complete pipeline',
        ] },
        { type: 'note', value: 'Take the Docker course first. DevOps practice needs a container to ship.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why add a manual approval before production?',
      options: ['To slow the team', 'A cheap safety net and a release record', 'It is required by CI', 'To skip tests'],
      answer: 1,
      explain: 'Approval adds safety and an audit trail.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should every alert include?',
      options: ['Only a number', 'An owner and a runbook', 'A logo', 'A password'],
      answer: 1,
      explain: 'An alert without an owner is noise.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you verify a deploy?',
      options: ['Assume it worked', 'A health check and a smoke test', 'Read the code', 'Restart the database'],
      answer: 1,
      explain: 'Health and smoke checks confirm the release.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a DevOps portfolio project strong?',
      options: ['A long tool list', 'A working pipeline with rollback and monitoring', 'A copied YAML', 'No tests'],
      answer: 1,
      explain: 'A complete, explained pipeline shows real skill.',
    },
  ],
};
