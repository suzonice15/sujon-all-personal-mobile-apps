// GitHub Actions chapter: Caching & Matrix.

export default {
  id: 'caching-matrix',
  title: 'Caching & Matrix',
  description: 'Speed up workflows and test many versions',
  icon: 'speed',
  lessons: [
    {
      id: 'gha-caching',
      title: 'Caching dependencies',
      blocks: [
        { type: 'text', value: 'A cache restores files between runs. Key it on the lockfile hash so a dependency change busts the cache. setup-node can cache npm automatically.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `- uses: actions/setup-node@v4\n  with:\n    node-version: 22\n    cache: npm\n\n- uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: npm-\${{ hashFiles('**/package-lock.json') }}\n    restore-keys: npm-` },
        { type: 'note', value: 'A cache that never hits is wasted upload time. Check the log for “Cache not found” and fix the key.' },
      ],
    },
    {
      id: 'gha-matrix',
      title: 'Matrix builds',
      blocks: [
        { type: 'text', value: 'A matrix runs the same job for several values. Use include to add a specific combination and exclude to skip one.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `jobs:\n  test:\n    runs-on: \${{ matrix.os }}\n    strategy:\n      fail-fast: false\n      matrix:\n        os: [ubuntu-latest, windows-latest]\n        node: [20, 22]\n        exclude:\n          - os: windows-latest\n            node: 20` },
        { type: 'list', items: [
          'fail-fast false keeps other jobs running',
          'Keep the matrix small; each cell costs minutes',
          'Name the job with the matrix values',
          'Use include for one-off combinations',
        ] },
        { type: 'note', value: 'A 3 by 3 matrix is nine runners. That is three times the cost of learning the same thing from one failure.' },
      ],
    },
    {
      id: 'gha-reusable',
      title: 'Reusable workflows',
      blocks: [
        { type: 'text', value: 'A workflow with workflow_call can be called by another workflow. Put shared CI in one file and call it from every repository that needs it.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `# .github/workflows/ci.yml\non:\n  workflow_call:\n    inputs:\n      node:\n        type: number\n        default: 22\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \${{ inputs.node }}\n      - run: npm ci && npm test` },
        { type: 'note', value: 'Reusable workflows reduce drift. A fix in one place reaches every caller.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'caching-matrix',
      q: 'What should a cache key include?',
      options: ['The date', 'The lockfile hash', 'The branch only', 'A random value'],
      answer: 1,
      explain: 'The hash busts the cache on change.',
    },
    {
      chapterId: 'caching-matrix',
      q: 'What does fail-fast false do?',
      options: ['Stops on first failure', 'Keeps other matrix jobs running', 'Caches deps', 'Skips tests'],
      answer: 1,
      explain: 'It lets all cells finish.',
    },
    {
      chapterId: 'caching-matrix',
      q: 'What enables a reusable workflow?',
      options: ['workflow_call', 'workflow_dispatch', 'push', 'schedule'],
      answer: 0,
      explain: 'workflow_call allows calls.',
    },
    {
      chapterId: 'caching-matrix',
      q: 'Why keep a matrix small?',
      options: ['For style', 'Each cell costs time and money', 'It is required', 'To cache'],
      answer: 1,
      explain: 'Every cell is a runner.',
    },
  ],
};
