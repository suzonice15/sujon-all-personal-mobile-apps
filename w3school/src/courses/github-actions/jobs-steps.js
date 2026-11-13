// GitHub Actions chapter: Jobs & Steps.

export default {
  id: 'jobs-steps',
  title: 'Jobs & Steps',
  description: 'Needs, outputs, conditions and artifacts',
  icon: 'account-tree',
  lessons: [
    {
      id: 'gha-jobs',
      title: 'Jobs and needs',
      blocks: [
        { type: 'text', value: 'Jobs run in parallel by default. needs creates a dependency, so a deploy waits for tests. Each job gets a fresh runner; share data with artifacts or outputs.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: npm run build` },
        { type: 'note', value: 'A job cannot read another job’s files. Upload an artifact or pass an output.' },
      ],
    },
    {
      id: 'gha-steps-actions',
      title: 'Steps and actions',
      blocks: [
        { type: 'text', value: 'A step either runs a command with run or uses a reusable action with uses. Pin third-party actions to a major version, or a commit SHA for the strictest supply-chain safety.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: 22
      cache: npm
  - run: npm ci
  - run: npm test` },
        { type: 'note', value: 'A floating tag such as @main can change under you. Pin versions for anything that touches production.' },
      ],
    },
    {
      id: 'gha-artifacts',
      title: 'Artifacts and outputs',
      blocks: [
        { type: 'code', lang: 'yaml', tryIt: false, value: `- uses: actions/upload-artifact@v4
  with:
    name: dist
    path: dist/

- uses: actions/download-artifact@v4
  with:
    name: dist` },
        { type: 'list', items: [
          'Artifacts keep files after a run',
          'Set a short retention for large files',
          'Outputs pass small values between jobs',
          'Never upload secrets',
        ] },
        { type: 'note', value: 'An artifact that is never downloaded is just slow storage. Clean up retention.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'jobs-steps',
      q: 'What does needs do?',
      options: ['Adds a secret', 'Makes a job wait for another', 'Caches deps', 'Runs a step'],
      answer: 1,
      explain: 'It creates a dependency.',
    },
    {
      chapterId: 'jobs-steps',
      q: 'Do jobs share files by default?',
      options: ['Yes', 'No, use artifacts or outputs', 'Only on Linux', 'Only with needs'],
      answer: 1,
      explain: 'Each job has a fresh runner.',
    },
    {
      chapterId: 'jobs-steps',
      q: 'Why pin an action version?',
      options: ['It is shorter', 'A moving tag can change behavior', 'It is required', 'To cache'],
      answer: 1,
      explain: 'Pinned versions are reproducible.',
    },
    {
      chapterId: 'jobs-steps',
      q: 'What are artifacts for?',
      options: ['Secrets', 'Keeping files after a run', 'Caching only', 'Routing'],
      answer: 1,
      explain: 'Artifacts persist files.',
    },
  ],
};
