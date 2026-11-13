// CI/CD chapter: Testing Gates.

export default {
  id: 'testing-gates',
  title: 'Testing Gates',
  description: 'Coverage, quality gates and flaky tests',
  icon: 'verified',
  lessons: [
    {
      id: 'cicd-quality-gates',
      title: 'Quality gates',
      blocks: [
        { type: 'text', value: 'A quality gate blocks a merge or deploy when a rule fails: a test fails, coverage drops below a threshold, lint has errors or a security scan finds a critical issue. A gate must be objective and automatic.' },
        { type: 'list', items: [
          'Tests must pass',
          'Coverage must not drop below the threshold',
          'No new lint errors',
          'No critical vulnerabilities',
          'Build must succeed',
        ] },
        { type: 'note', value: 'A gate nobody can pass is ignored. Tune thresholds so the team can satisfy them on a normal change.' },
      ],
    },
    {
      id: 'cicd-coverage',
      title: 'Coverage and reports',
      blocks: [
        { type: 'text', value: 'Coverage shows which lines ran, not whether the assertions are good. Use it as a floor, not a target. Publish the report so reviewers can see which lines are untested.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}'\n\n# Fail the build if coverage regresses\nnpx nyc check-coverage --lines 80 --branches 70` },
        { type: 'note', value: 'Chasing 100% coverage produces tests that assert nothing. Test behaviour and edge cases.' },
      ],
    },
    {
      id: 'cicd-flaky',
      title: 'Flaky tests',
      blocks: [
        { type: 'text', value: 'A flaky test passes and fails without a code change. It usually comes from time, randomness, shared state, network calls or ordering. Treat flakiness as a bug with an owner.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Fragile: depends on the real clock\nif (isWeekend()) { ... }\n\n// Testable: inject the clock\nfunction isWeekend(now = new Date()) {\n  const day = now.getDay();\n  return day === 0 || day === 6;\n}\n\nexpect(isWeekend(new Date('2026-01-17'))).toBe(true);` },
        { type: 'list', items: [
          'Freeze time in tests',
          'Seed random values',
          'Isolate database state per test',
          'Do not depend on test order',
          'Quarantine a flaky test and fix it this week',
        ] },
        { type: 'note', value: 'Retrying a flaky test hides the problem. A retry is a temporary mitigation, not a fix.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'testing-gates',
      q: 'What is a quality gate?',
      options: ['A manual review', 'An automatic rule that blocks a merge or deploy', 'A dashboard', 'A database'],
      answer: 1,
      explain: 'It blocks on objective rules.',
    },
    {
      chapterId: 'testing-gates',
      q: 'What does coverage measure?',
      options: ['Assertion quality', 'Lines executed by tests', 'Deploy speed', 'Code style'],
      answer: 1,
      explain: 'It measures executed lines.',
    },
    {
      chapterId: 'testing-gates',
      q: 'What causes flaky tests?',
      options: ['Strong assertions', 'Time, randomness and shared state', 'Caching', 'Pinned versions'],
      answer: 1,
      explain: 'Non-determinism causes flakiness.',
    },
    {
      chapterId: 'testing-gates',
      q: 'How should you treat a flaky test?',
      options: ['Retry forever', 'Quarantine and fix it', 'Delete all tests', 'Ignore the build'],
      answer: 1,
      explain: 'Fix the root cause.',
    },
  ],
};
