// Docker chapter: CI/CD.

export default {
  id: 'ci-cd',
  title: 'CI/CD',
  description: 'Automate build, test and deployment',
  icon: 'sync-alt',
  lessons: [
    {
      id: 'ci-cd-pipeline',
      title: 'The pipeline',
      blocks: [
        { type: 'text', value: 'Continuous integration runs checks on every push. Continuous delivery keeps a deployable artifact ready; continuous deployment ships it automatically.' },
        { type: 'list', items: [
          'Install dependencies with a lockfile',
          'Lint and type-check',
          'Run unit and integration tests',
          'Build the image and tag it with the commit SHA',
          'Push the image to a registry',
          'Deploy and run a health check',
        ] },
        { type: 'note', value: 'A pipeline that is slow or flaky gets ignored. Keep the fast checks first and cache dependencies.' },
      ],
    },
    {
      id: 'ci-cd-github-actions',
      title: 'GitHub Actions',
      blocks: [
        { type: 'text', value: 'A workflow is a YAML file in .github/workflows. Jobs run on runners. Steps use actions or shell commands.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `name: ci

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
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test` },
        { type: 'note', value: 'Pin action versions by tag or SHA. An unpinned action can change behaviour without your code changing.' },
      ],
    },
    {
      id: 'ci-cd-docker',
      title: 'Build and push an image',
      blocks: [
        { type: 'text', value: 'Build the image once and tag it with the commit SHA. Deploy the exact image that passed the tests, not a rebuilt one.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/owner/app:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max` },
        { type: 'note', value: 'Never bake secrets into an image. Pass them at runtime from the platform secret store.' },
      ],
    },
    {
      id: 'ci-cd-caching',
      title: 'Caching and speed',
      blocks: [
        { type: 'list', items: [
          'Cache npm, pip or Maven downloads between runs',
          'Use BuildKit cache mounts for Docker layers',
          'Run independent jobs in parallel',
          'Fail fast on lint before running slow integration tests',
          'Keep the test database small and reset it per job',
        ] },
        { type: 'code', lang: 'yaml', tryIt: false, value: `- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-\${{ hashFiles('package-lock.json') }}` },
        { type: 'note', value: 'A cache key must include the lockfile hash. Otherwise a dependency change reuses the wrong cache.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'ci-cd',
      q: 'What is continuous integration?',
      options: ['Deploying every hour', 'Running checks on every change', 'Writing tests once', 'A hosting provider'],
      answer: 1,
      explain: 'CI merges and verifies changes frequently.',
    },
    {
      chapterId: 'ci-cd',
      q: 'Why tag an image with the commit SHA?',
      options: ['It is shorter', 'It identifies the exact code in the image', 'It enables caching', 'It encrypts the image'],
      answer: 1,
      explain: 'The SHA ties the artifact to the commit that passed the pipeline.',
    },
    {
      chapterId: 'ci-cd',
      q: 'Where do workflow files live on GitHub?',
      options: ['.github/workflows', 'ci/', 'docker/', 'tests/'],
      answer: 0,
      explain: 'GitHub Actions reads YAML from .github/workflows.',
    },
    {
      chapterId: 'ci-cd',
      q: 'What should a cache key include?',
      options: ['The date', 'The lockfile hash', 'The branch name only', 'A random value'],
      answer: 1,
      explain: 'The lockfile hash changes when dependencies change.',
    },
  ],
};
