// GitHub Actions chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a full CI pipeline and prepare',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'gha-project',
      title: 'Project: a CI pipeline',
      blocks: [
        { type: 'text', value: 'Build a pipeline that installs dependencies, lints, tests, builds and uploads an artifact on every pull request. Then add a manual deploy job with an environment and a required reviewer.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `name: CI\n\non:\n  pull_request:\n  workflow_dispatch:\n\nconcurrency:\n  group: ci-\${{ github.ref }}\n  cancel-in-progress: true\n\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    timeout-minutes: 15\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test -- --coverage\n      - run: npm run build\n      - uses: actions/upload-artifact@v4\n        with:\n          name: dist\n          path: dist/` },
        { type: 'list', items: [
          'Fast feedback: cache and concurrency',
          'Lint before test to fail cheaply',
          'Upload the build output',
          'A separate deploy job with an environment',
          'Set a timeout on every job',
        ] },
        { type: 'note', value: 'A pipeline that takes 45 minutes will be bypassed. Aim for under ten minutes on a pull request.' },
      ],
    },
    {
      id: 'gha-interview',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'How does a workflow start?',
          'What is the difference between a job and a step?',
          'How do jobs share data?',
          'How do secrets work, and what are their limits?',
          'How do you speed up a slow pipeline?',
          'How do you protect production deploys?',
          'GitHub Actions versus Jenkins or GitLab CI?',
          'How do you keep third-party actions safe?',
        ] },
        { type: 'text', value: 'Strong answers discuss cost and safety. “Cache dependencies, cancel stale runs, pin actions, and gate production with an environment” is a complete answer.' },
        { type: 'note', value: 'Be ready to read a workflow and say which job runs first and why.' },
      ],
    },
    {
      id: 'gha-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: first workflow and logs',
          'Week 2: syntax, expressions and contexts',
          'Week 3: triggers and filters',
          'Week 4: jobs, steps and artifacts',
          'Week 5: secrets, environments and OIDC',
          'Week 6: caching and matrix builds',
          'Week 7: reusable workflows and a full pipeline',
        ] },
        { type: 'note', value: 'Learn Git first. Actions is automation on top of branches, commits and pull requests.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which step should fail fastest?',
      options: ['Deploy', 'Lint and cheap checks', 'Upload', 'Notify'],
      answer: 1,
      explain: 'Fail cheap checks first.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you protect production?',
      options: ['A comment', 'An environment with reviewers', 'A branch name', 'A cache'],
      answer: 1,
      explain: 'Environments gate deploys.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why cancel superseded runs?',
      options: ['For style', 'To save minutes and get faster feedback', 'To cache', 'To pin actions'],
      answer: 1,
      explain: 'Only the latest commit matters.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first step?',
      options: ['A full deploy pipeline', 'A single test workflow on pull requests', 'Matrix of ten', 'OIDC'],
      answer: 1,
      explain: 'Start with one useful job.',
    },
  ],
};
