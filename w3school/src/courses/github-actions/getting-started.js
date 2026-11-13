// GitHub Actions chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Workflows, runners and your first action',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'gha-what-is',
      title: 'What is GitHub Actions?',
      blocks: [
        { type: 'text', value: 'GitHub Actions runs automation on GitHub events. A workflow file in .github/workflows starts a job on a runner when a trigger fires, such as a push or pull request. It is used for CI, releases, scheduled tasks and deployment.' },
        { type: 'list', items: [
          'Workflow: a YAML file in .github/workflows',
          'Event: what starts it (push, pull_request, schedule)',
          'Job: a group of steps on one runner',
          'Step: a command or a reusable action',
          'Runner: the machine that executes the job',
        ] },
        { type: 'note', value: 'Actions are free for public repositories and metered for private ones. A runaway workflow can cost real money; set timeouts and concurrency limits.' },
      ],
    },
    {
      id: 'gha-first-workflow',
      title: 'Your first workflow',
      blocks: [
        { type: 'code', lang: 'yaml', tryIt: false, value: `name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm test` },
        { type: 'note', value: 'Commit the workflow to the default branch. GitHub only runs workflows that exist on the branch the event refers to.' },
      ],
    },
    {
      id: 'gha-anatomy',
      title: 'Reading the logs',
      blocks: [
        { type: 'text', value: 'Each job runs in a fresh virtual machine. The logs show every command and its output. A failing step stops the job unless you allow failure.' },
        { type: 'list', items: [
          'Check the failing step first',
          'Re-run failed jobs, not the whole workflow',
          'Use grouped logs for readability',
          'A green check means every job passed',
          'Artifacts keep files after the run',
        ] },
        { type: 'note', value: 'A local reproduction is faster than pushing commits to debug. Run the same commands locally first.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Where do workflows live?',
      options: ['/workflows', '.github/workflows', 'src/ci', '.ci'],
      answer: 1,
      explain: 'They live in .github/workflows.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is a runner?',
      options: ['A database', 'The machine that executes a job', 'A YAML key', 'A secret'],
      answer: 1,
      explain: 'Runners execute jobs.',
    },
    {
      chapterId: 'getting-started',
      q: 'What starts a workflow?',
      options: ['A secret', 'An event such as push or pull_request', 'A job', 'A step'],
      answer: 1,
      explain: 'Events trigger workflows.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why set limits on workflows?',
      options: ['For style', 'Runaway jobs cost money and time', 'It is required', 'To cache'],
      answer: 1,
      explain: 'Timeouts and concurrency limit cost.',
    },
  ],
};
