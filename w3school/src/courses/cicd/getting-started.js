// CI/CD chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What CI and CD mean, and why pipelines exist',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'cicd-what-is',
      title: 'CI and CD explained',
      blocks: [
        { type: 'text', value: 'Continuous Integration (CI) means every change is merged into the main branch often and verified automatically. Continuous Delivery means every passing change can be released. Continuous Deployment goes one step further and releases automatically.' },
        { type: 'list', items: [
          'CI: build and test every change automatically',
          'Continuous Delivery: a release-ready artifact on every commit',
          'Continuous Deployment: deploy automatically after checks pass',
          'A pipeline is the automated sequence that does this',
        ] },
        { type: 'note', value: 'Most teams want continuous delivery first. Automatic deployment is a business decision, not a maturity badge.' },
      ],
    },
    {
      id: 'cicd-why',
      title: 'Why pipelines matter',
      blocks: [
        { type: 'text', value: 'A manual release depends on one person remembering every step. A pipeline makes the steps repeatable, visible and fast. It catches problems before users do.' },
        { type: 'list', items: [
          'Same steps every time, on every machine',
          'Fast feedback on a broken change',
          'A reproducible artifact you can trace to a commit',
          'Deploys stop being scary events',
          'The process is written down as code',
        ] },
        { type: 'note', value: 'The first goal is not speed. It is a build you can trust. Speed comes from caching and parallel jobs.' },
      ],
    },
    {
      id: 'cicd-anatomy',
      title: 'Anatomy of a pipeline',
      blocks: [
        { type: 'text', value: 'A pipeline has stages that run in order: checkout, install, lint, test, build, then deploy. Stages that do not depend on each other can run in parallel.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `stages:\n  - install\n  - verify\n  - build\n  - deploy\n\ninstall  -> cache hit: 20s\nverify   -> lint + test in parallel: 2m\nbuild    -> produce artifact: 1m\ndeploy   -> gated manual approval` },
        { type: 'note', value: 'A pipeline that takes an hour is not used. Measure each stage and fix the slowest one.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is continuous integration?',
      options: ['Deploying every hour', 'Merging often and verifying automatically', 'Writing tests by hand', 'A hosting provider'],
      answer: 1,
      explain: 'CI verifies every change automatically.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is the difference between delivery and deployment?',
      options: ['They are the same', 'Delivery keeps a release ready; deployment ships it automatically', 'Delivery is only for mobile', 'Deployment is manual'],
      answer: 1,
      explain: 'Delivery is release-ready; deployment ships.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why use a pipeline?',
      options: ['To look modern', 'Repeatable, visible and trustworthy releases', 'To avoid tests', 'To skip code review'],
      answer: 1,
      explain: 'It makes releases repeatable.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which stage should be fastest?',
      options: ['Deploy', 'The earliest feedback stages', 'Build', 'Notification'],
      answer: 1,
      explain: 'Fast early failure saves time.',
    },
  ],
};
