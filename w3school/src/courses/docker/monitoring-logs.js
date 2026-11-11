// Docker chapter: Monitoring and Logs.

export default {
  id: 'monitoring-logs',
  title: 'Monitoring & Logs',
  description: 'Know whether the service is healthy before users tell you',
  icon: 'monitor',
  lessons: [
    {
      id: 'monitoring-logs',
      title: 'Logs',
      blocks: [
        { type: 'text', value: 'By default, Docker captures stdout and stderr. Structured JSON logs are searchable and can be shipped to a central system.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker logs -f api
docker logs --since 1h api
docker logs --tail 100 api

# Log driver
docker run --log-driver json-file \\
  --log-opt max-size=10m --log-opt max-file=3 api` },
        { type: 'note', value: 'Unbounded log files can fill the disk. Set max-size and max-file on the json-file driver or ship logs to a service.' },
      ],
    },
    {
      id: 'monitoring-health',
      title: 'Health checks',
      blocks: [
        { type: 'text', value: 'A health check tells Docker and the orchestrator whether the container can serve traffic. A process that is running but cannot reach the database is unhealthy.' },
        { type: 'code', lang: 'dockerfile', tryIt: false, fragment: true, value: `HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD curl -fsS http://localhost:3000/health || exit 1` },
        { type: 'code', lang: 'bash', tryIt: false, value: `docker inspect --format='{{.State.Health.Status}}' api` },
        { type: 'note', value: 'The health endpoint must be cheap. Do not run a heavy report on every check; query the database with SELECT 1.' },
      ],
    },
    {
      id: 'monitoring-metrics',
      title: 'Metrics and alerts',
      blocks: [
        { type: 'list', items: [
          'Request rate, error rate and latency',
          'CPU, memory and disk usage',
          'Container restarts and health status',
          'Queue depth and database connections',
          'Alert only on symptoms users feel',
        ] },
        { type: 'text', value: 'Prometheus scrapes metrics, Grafana visualises them, and Alertmanager sends notifications. For a small app, platform metrics plus an uptime check are enough.' },
        { type: 'note', value: 'An alert that fires every night and is ignored is worse than no alert. Tune thresholds and delete noisy rules.' },
      ],
    },
    {
      id: 'monitoring-postmortem',
      title: 'Incident response',
      blocks: [
        { type: 'list', items: [
          'Detect: alert or user report',
          'Mitigate: roll back or scale up first',
          'Diagnose: logs, metrics, recent deploys',
          'Fix: deploy the smallest safe change',
          'Learn: write a blameless postmortem',
        ] },
        { type: 'text', value: 'A postmortem explains what happened, the impact, the timeline, the root cause and the follow-up actions with owners and dates.' },
        { type: 'note', value: 'The goal is a system that fails less, not a person to blame. Blame hides the real cause.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'monitoring-logs',
      q: 'Where does docker logs read from by default?',
      options: ['A database', 'stdout and stderr', 'The host journal only', 'A volume'],
      answer: 1,
      explain: 'Docker captures the container standard streams.',
    },
    {
      chapterId: 'monitoring-logs',
      q: 'Why limit log file size?',
      options: ['To make logs shorter', 'To prevent the disk from filling up', 'To speed up the image build', 'To enable HTTPS'],
      answer: 1,
      explain: 'Unbounded logs can consume the whole disk.',
    },
    {
      chapterId: 'monitoring-logs',
      q: 'What should a health check verify?',
      options: ['Only that the process started', 'That the app can serve requests and reach critical dependencies', 'The size of the image', 'The git branch'],
      answer: 1,
      explain: 'A running process can still be unable to serve traffic.',
    },
    {
      chapterId: 'monitoring-logs',
      q: 'What is the first goal during an incident?',
      options: ['Find who caused it', 'Mitigate impact', 'Rewrite the service', 'Write documentation'],
      answer: 1,
      explain: 'Restore service first; investigate afterwards.',
    },
  ],
};
