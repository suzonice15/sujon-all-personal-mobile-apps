// CI/CD chapter: Pipeline Stages.

export default {
  id: 'pipeline-stages',
  title: 'Pipeline Stages',
  description: 'Checkout, install, verify, build and notify',
  icon: 'account-tree',
  lessons: [
    {
      id: 'cicd-checkout-install',
      title: 'Checkout and install',
      blocks: [
        { type: 'text', value: 'A pipeline starts from a clean environment. Checkout the exact commit, then install dependencies from a lockfile so the build is reproducible.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `git clone --depth 1 https://github.com/acme/app.git\ncd app\ngit checkout "$GIT_SHA"\n\nnpm ci          # uses package-lock.json exactly\n# pip install -r requirements.txt --require-hashes` },
        { type: 'note', value: 'npm install can update the lockfile and produce a different build. Use npm ci in CI.' },
      ],
    },
    {
      id: 'cicd-verify',
      title: 'Verify: lint, types and tests',
      blocks: [
        { type: 'text', value: 'Verification is the heart of CI. Run lint, type checks and tests. Fast checks first: a lint error should fail in seconds, not after a ten-minute test run.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `verify:\n  steps:\n    - run: npm run lint\n    - run: npm run typecheck\n    - run: npm test -- --runInBand\n    - run: npm run test:integration` },
        { type: 'list', items: [
          'Cheap checks first',
          'Unit tests before integration tests',
          'Fail the build on warnings you care about',
          'Keep tests deterministic; no shared external state',
          'Publish the test report',
        ] },
        { type: 'note', value: 'A flaky test in CI trains the team to ignore red builds. Fix or quarantine it quickly.' },
      ],
    },
    {
      id: 'cicd-build-version',
      title: 'Build and version the artifact',
      blocks: [
        { type: 'text', value: 'Build once and deploy the same artifact everywhere. Tag it with the commit SHA so you can trace a running version back to source. Build with pinned tool versions.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `export VERSION=$(git rev-parse --short HEAD)\nnpm run build\ndocker build -t registry.example.com/app:$VERSION .\ndocker push registry.example.com/app:$VERSION` },
        { type: 'note', value: 'Building separately per environment is how staging and production diverge. Build once, promote the artifact.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'pipeline-stages',
      q: 'Why use npm ci in CI?',
      options: ['It is shorter', 'It installs exactly from the lockfile', 'It is faster than npm install', 'It skips dependencies'],
      answer: 1,
      explain: 'It gives a reproducible install.',
    },
    {
      chapterId: 'pipeline-stages',
      q: 'Which checks run first?',
      options: ['Slow integration tests', 'Fast lint and type checks', 'Deploy', 'Notifications'],
      answer: 1,
      explain: 'Fail cheaply and fast.',
    },
    {
      chapterId: 'pipeline-stages',
      q: 'How should you version an artifact?',
      options: ['latest', 'The commit SHA', 'A random number', 'The date only'],
      answer: 1,
      explain: 'The SHA traces to source.',
    },
    {
      chapterId: 'pipeline-stages',
      q: 'Why build once?',
      options: ['To save disk', 'So every environment runs the same artifact', 'It is required', 'To skip tests'],
      answer: 1,
      explain: 'Promotion avoids drift.',
    },
  ],
};
