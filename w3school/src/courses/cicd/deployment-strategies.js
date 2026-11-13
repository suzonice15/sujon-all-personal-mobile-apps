// CI/CD chapter: Deployment Strategies.

export default {
  id: 'deployment-strategies',
  title: 'Deployment Strategies',
  description: 'Rolling, blue-green and canary releases',
  icon: 'rocket',
  lessons: [
    {
      id: 'cicd-rolling',
      title: 'Rolling deployment',
      blocks: [
        { type: 'text', value: 'A rolling deployment replaces instances a few at a time. Old and new versions run together during the rollout, so the API and database must stay compatible.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `strategy:\n  type: RollingUpdate\n  rollingUpdate:\n    maxSurge: 1\n    maxUnavailable: 0\n\n# maxUnavailable: 0 keeps capacity during the rollout` },
        { type: 'note', value: 'Rolling deploys need backward-compatible changes. Add a column before you write to it, and remove it after the old version is gone.' },
      ],
    },
    {
      id: 'cicd-blue-green',
      title: 'Blue-green',
      blocks: [
        { type: 'text', value: 'Blue-green runs two identical environments. Deploy to the idle one, test it, then switch traffic. Rollback is a switch back, which is fast and simple.' },
        { type: 'list', items: [
          'Zero downtime switch',
          'Fast rollback by switching back',
          'Double infrastructure cost while both run',
          'Database migrations still need care',
          'Health checks decide the switch',
        ] },
        { type: 'note', value: 'Blue-green does not fix a broken migration. Both colours usually share one database.' },
      ],
    },
    {
      id: 'cicd-canary',
      title: 'Canary releases',
      blocks: [
        { type: 'text', value: 'A canary sends a small slice of traffic to the new version, watches error rate and latency, then increases traffic. It limits the blast radius of a bad release.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `steps:\n  - set_weight: 5      # 5% of traffic\n  - wait: 10m\n  - check: error_rate < 1% and p95 < 400ms\n  - set_weight: 25\n  - wait: 10m\n  - set_weight: 100` },
        { type: 'note', value: 'A canary without a metric decision is just a slow deploy. Define the success metric and the abort rule first.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deployment-strategies',
      q: 'What does a rolling deploy do?',
      options: ['Replaces all at once', 'Replaces instances gradually', 'Stops the service', 'Runs two clusters'],
      answer: 1,
      explain: 'It replaces instances in batches.',
    },
    {
      chapterId: 'deployment-strategies',
      q: 'What makes blue-green rollback fast?',
      options: ['Rebuilding', 'Switching traffic back', 'A database restore', 'Deleting pods'],
      answer: 1,
      explain: 'Traffic switches back.',
    },
    {
      chapterId: 'deployment-strategies',
      q: 'What is a canary?',
      options: ['A test bird', 'A small traffic slice on the new version', 'A full rollout', 'A backup'],
      answer: 1,
      explain: 'It limits the blast radius.',
    },
    {
      chapterId: 'deployment-strategies',
      q: 'What do rolling deploys require?',
      options: ['Downtime', 'Backward-compatible changes', 'Two clusters', 'Manual approval'],
      answer: 1,
      explain: 'Old and new run together.',
    },
  ],
};
