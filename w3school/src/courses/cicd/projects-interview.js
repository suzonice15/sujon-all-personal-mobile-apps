// CI/CD chapter: Project and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a full pipeline and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'cicd-project',
      title: 'Project: an end-to-end pipeline',
      blocks: [
        { type: 'text', value: 'Build a pipeline for a small web app: install from the lockfile, lint, test with coverage, build a container image, push it with a commit tag, deploy to staging, run a smoke test, then promote the same digest to production after approval.' },
        { type: 'list', items: [
          'Reproducible install with a lockfile',
          'Lint and tests as quality gates',
          'One immutable image per commit',
          'Staging deploy and smoke test',
          'Manual approval for production',
          'Rollback tested with the previous tag',
        ] },
        { type: 'note', value: 'The strongest portfolio piece is a pipeline whose logs show a blocked bad build and a successful rollback.' },
      ],
    },
    {
      id: 'cicd-interview',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'CI versus continuous delivery versus deployment?',
          'What stages does a good pipeline have?',
          'How do you keep a pipeline fast?',
          'How do you version and promote artifacts?',
          'What is a quality gate?',
          'Rolling versus blue-green versus canary?',
          'How do you handle secrets in CI?',
          'How do you roll back safely?',
        ] },
        { type: 'text', value: 'Strong answers connect the process to risk. “A canary limits the blast radius, and the metric decides whether to continue” is a complete answer.' },
        { type: 'note', value: 'Be ready to read a pipeline and name the production risk it does not cover.' },
      ],
    },
    {
      id: 'cicd-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: CI and CD concepts',
          'Week 2: pipeline stages',
          'Week 3: artifacts and registries',
          'Week 4: tests and quality gates',
          'Week 5: deployment strategies',
          'Week 6: environments and secrets',
          'Week 7: supply-chain safety',
          'Week 8: build and operate the full pipeline',
        ] },
        { type: 'note', value: 'Learn Git and one CI tool first. The concepts transfer between GitHub Actions, GitLab CI and Jenkins.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What should be promoted to production?',
      options: ['A fresh build', 'The same tested artifact', 'A developer laptop', 'A hotfix by hand'],
      answer: 1,
      explain: 'Promote the tested artifact.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What proves a pipeline works?',
      options: ['It is green once', 'It blocks a bad build and deploys a good one', 'It is long', 'It has many stages'],
      answer: 1,
      explain: 'Gates and a successful deploy.',
    },
    {
      chapterId: 'projects-interview',
      q: 'How do you prepare rollback?',
      options: ['Hope', 'Keep the previous artifact and test the path', 'Rebuild from memory', 'Delete old images'],
      answer: 1,
      explain: 'Tested rollback is real rollback.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is the best first step?',
      options: ['Full canary setup', 'A pipeline that installs and tests on every PR', 'A production deploy', 'An SBOM'],
      answer: 1,
      explain: 'Start with reliable CI.',
    },
  ],
};
