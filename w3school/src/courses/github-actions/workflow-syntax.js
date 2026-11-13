// GitHub Actions chapter: Workflow Syntax.

export default {
  id: 'workflow-syntax',
  title: 'Workflow Syntax',
  description: 'Keys, expressions and contexts',
  icon: 'code',
  lessons: [
    {
      id: 'gha-yaml-keys',
      title: 'The main keys',
      blocks: [
        { type: 'list', items: [
          'name: the workflow name',
          'on: the trigger or triggers',
          'jobs: the map of jobs',
          'runs-on: the runner image',
          'steps: the ordered commands and actions',
          'env: variables for the job or workflow',
        ] },
        { type: 'code', lang: 'yaml', tryIt: false, value: `name: Build
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: test
    steps:
      - uses: actions/checkout@v4
      - run: echo "Building \${GITHUB_REF}"` },
        { type: 'note', value: 'YAML indentation is structural. A two-space mistake changes the meaning or breaks the file.' },
      ],
    },
    {
      id: 'gha-expressions',
      title: 'Expressions',
      blocks: [
        { type: 'text', value: 'Expressions use ${{ }}. Contexts such as github, env, secrets and matrix expose values. Use them for conditions and values, not for secrets in logs.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `- if: github.event_name == 'push' && github.ref == 'refs/heads/main'
  run: echo "Deploying"

- run: echo "Commit \${GITHUB_SHA}"` },
        { type: 'note', value: 'Never print a secret in a run step. Masking helps, but the value still appears in some outputs and logs.' },
      ],
    },
    {
      id: 'gha-contexts',
      title: 'Useful contexts',
      blocks: [
        { type: 'list', items: [
          'github.event: the full event payload',
          'github.ref and github.sha: branch and commit',
          'github.actor: who triggered it',
          'env: your variables',
          'secrets: encrypted values',
          'matrix: values from a matrix',
        ] },
        { type: 'text', value: 'The event payload is large. Read the specific field you need instead of dumping the whole object into the logs.' },
        { type: 'note', value: 'Use github.ref_name for a readable branch name and github.sha for a precise commit reference.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'workflow-syntax',
      q: 'Which key defines triggers?',
      options: ['jobs', 'on', 'steps', 'runs-on'],
      answer: 1,
      explain: 'on defines the events.',
    },
    {
      chapterId: 'workflow-syntax',
      q: 'What do expressions use?',
      options: ['[[]]', '${{ }}', '{{ }}', '<< >>'],
      answer: 1,
      explain: 'Expressions use ${{ }}.',
    },
    {
      chapterId: 'workflow-syntax',
      q: 'What is github.sha?',
      options: ['A branch name', 'The commit hash', 'A token', 'A runner name'],
      answer: 1,
      explain: 'It is the commit hash.',
    },
    {
      chapterId: 'workflow-syntax',
      q: 'Why avoid printing secrets?',
      options: ['They are slow', 'They can leak into logs', 'They are too long', 'They are invalid YAML'],
      answer: 1,
      explain: 'Logs can be read by others.',
    },
  ],
};
