// GitHub Actions chapter: Triggers.

export default {
  id: 'triggers',
  title: 'Triggers',
  description: 'Push, pull request, schedule and manual runs',
  icon: 'play-circle',
  lessons: [
    {
      id: 'gha-push-pr',
      title: 'Push and pull request',
      blocks: [
        { type: 'text', value: 'A push trigger can filter branches and paths. A pull_request trigger runs on PR activity; use paths to run only relevant jobs.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'package.json'
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]` },
        { type: 'note', value: 'A PR from a fork does not get repository secrets by default. That protects secrets from untrusted code.' },
      ],
    },
    {
      id: 'gha-schedule-manual',
      title: 'Schedule and manual',
      blocks: [
        { type: 'text', value: 'schedule uses cron in UTC. workflow_dispatch adds a Run button with optional inputs. Manual runs are useful for deploys and data jobs.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `on:
  schedule:
    - cron: '0 2 * * *'      # 02:00 UTC daily
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options: [staging, production]` },
        { type: 'note', value: 'Scheduled workflows can be delayed during high load. Do not use them for exact-time business events.' },
      ],
    },
    {
      id: 'gha-filters',
      title: 'Filtering and avoiding waste',
      blocks: [
        { type: 'list', items: [
          'Use paths to skip unrelated changes',
          'Use concurrency to cancel old runs',
          'Set a timeout-minutes limit',
          'Skip CI with a commit message when needed',
          'Use workflow_call for reuse',
        ] },
        { type: 'code', lang: 'yaml', tryIt: false, value: `concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15` },
        { type: 'note', value: 'Cancelling superseded runs saves minutes and gives faster feedback on the latest commit.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'triggers',
      q: 'What does paths filter do?',
      options: ['Changes the runner', 'Runs only when matching files change', 'Adds secrets', 'Caches deps'],
      answer: 1,
      explain: 'Path filters skip unrelated changes.',
    },
    {
      chapterId: 'triggers',
      q: 'Who gets secrets on a fork PR?',
      options: ['Everyone', 'No one by default', 'Only admins', 'The runner'],
      answer: 1,
      explain: 'Fork PRs do not get secrets by default.',
    },
    {
      chapterId: 'triggers',
      q: 'What timezone does cron use?',
      options: ['Local', 'UTC', 'The runner timezone', 'The repo timezone'],
      answer: 1,
      explain: 'Cron is in UTC.',
    },
    {
      chapterId: 'triggers',
      q: 'What does cancel-in-progress do?',
      options: ['Deletes the repo', 'Cancels an older run in the same group', 'Stops the runner', 'Removes the cache'],
      answer: 1,
      explain: 'It cancels superseded runs.',
    },
  ],
};
