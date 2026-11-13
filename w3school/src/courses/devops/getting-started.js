// DevOps chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What DevOps is and the delivery lifecycle',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'devops-what-is',
      title: 'What is DevOps?',
      blocks: [
        { type: 'text', value: 'DevOps is the practice of building, shipping and running software as one flow instead of throwing code over a wall. It combines automation, shared ownership and fast feedback between development and operations.' },
        { type: 'list', items: [
          'Automate build, test, deploy and rollback',
          'Own the service in production, not only in development',
          'Measure and improve the delivery flow',
          'Keep changes small and release often',
          'Make failure cheap by rolling back fast',
        ] },
        { type: 'note', value: 'DevOps is a culture and a set of practices, not a single tool. Docker, CI and Kubernetes are only useful when the team ships smaller changes.' },
      ],
    },
    {
      id: 'devops-lifecycle',
      title: 'The delivery lifecycle',
      blocks: [
        { type: 'text', value: 'A healthy pipeline moves a commit from code to production with confidence: build, test, scan, package, deploy, verify and monitor. Each stage gives fast feedback and stops bad changes early.' },
        { type: 'code', lang: 'text', tryIt: false, value: `commit -> build -> test -> scan -> package -> deploy -> verify
                                                    |
                                              rollback if unhealthy` },
        { type: 'list', items: [
          'Build: compile and bundle',
          'Test: unit, integration and end-to-end',
          'Scan: dependencies and container image',
          'Package: an immutable artifact',
          'Deploy: rolling, canary or blue-green',
          'Verify: health check and smoke test',
          'Monitor: metrics, logs and alerts',
        ] },
        { type: 'note', value: 'Deploy the exact artifact that passed the tests. Rebuilding during deploy creates a different binary.' },
      ],
    },
    {
      id: 'devops-metrics',
      title: 'Measuring delivery',
      blocks: [
        { type: 'text', value: 'Four measures show whether delivery is healthy: lead time for changes, deployment frequency, change failure rate and time to restore. Improve the slowest one first.' },
        { type: 'list', items: [
          'Lead time: commit to production',
          'Deployment frequency: how often you ship',
          'Change failure rate: how many releases cause incidents',
          'Time to restore: how long an incident takes to fix',
          'Track them with the pipeline and incident data you already have',
        ] },
        { type: 'note', value: 'Velocity without stability is not progress. Watch the failure and restore measures alongside speed.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is DevOps?',
      options: ['A single tool', 'A practice of automating and owning delivery end to end', 'A programming language', 'A database'],
      answer: 1,
      explain: 'DevOps combines automation, ownership and fast feedback.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why deploy the exact artifact that passed tests?',
      options: ['It is faster', 'Rebuilding can produce a different binary', 'It saves disk', 'It is required by Docker'],
      answer: 1,
      explain: 'The tested artifact is the one you trust.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which metric measures how often you ship?',
      options: ['Lead time', 'Deployment frequency', 'Change failure rate', 'Time to restore'],
      answer: 1,
      explain: 'Deployment frequency counts releases.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does time to restore measure?',
      options: ['Build duration', 'How long an incident takes to resolve', 'Test coverage', 'Image size'],
      answer: 1,
      explain: 'It measures recovery speed.',
    },
  ],
};
