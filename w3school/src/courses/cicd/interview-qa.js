// CI/CD interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is continuous integration?',
      a: 'Merging changes often into a shared branch and verifying each one automatically with a build and tests.',
      level: 'basic',
    },
    {
      q: 'Continuous delivery versus continuous deployment?',
      a: 'Delivery keeps every passing change release-ready with a manual release step. Deployment releases automatically.',
      level: 'basic',
    },
    {
      q: 'Why write the pipeline as code?',
      a: 'It is versioned, reviewable, reproducible and identical for everyone.',
      level: 'basic',
    },
    {
      q: 'What is the main benefit of CI?',
      a: 'Fast feedback on broken changes, before they reach other people or users.',
      level: 'basic',
    },
  ],
  'pipeline-stages': [
    {
      q: 'What are the typical stages?',
      a: 'Checkout, reproducible install, lint and type checks, tests, build, deploy and notify.',
      level: 'basic',
    },
    {
      q: 'Why use npm ci instead of npm install?',
      a: 'It installs exactly what the lockfile specifies, so the build is reproducible.',
      level: 'basic',
    },
    {
      q: 'Why build once?',
      a: 'Building per environment lets the artifact drift. Build once and promote the same artifact.',
      level: 'intermediate',
    },
    {
      q: 'How do you keep a pipeline fast?',
      a: 'Cache dependencies, run independent jobs in parallel, cancel superseded runs and fail cheap checks first.',
      level: 'intermediate',
    },
  ],
  artifacts: [
    {
      q: 'What is a build artifact?',
      a: 'The immutable output of a build, tagged with a version and commit and stored in a registry.',
      level: 'basic',
    },
    {
      q: 'Why is latest a poor production tag?',
      a: 'It is a moving pointer, so you cannot identify or reproduce exactly what is running.',
      level: 'basic',
    },
    {
      q: 'What is artifact promotion?',
      a: 'Moving the same tested artifact through dev, staging and production without rebuilding.',
      level: 'intermediate',
    },
    {
      q: 'What makes rollback difficult?',
      a: 'Destructive or forward-only database migrations. Use expand and contract so old and new code can coexist.',
      level: 'advanced',
    },
  ],
  'testing-gates': [
    {
      q: 'What is a quality gate?',
      a: 'An automatic rule such as failing tests, a coverage floor or a critical vulnerability that blocks a merge or deploy.',
      level: 'basic',
    },
    {
      q: 'Does high coverage mean good tests?',
      a: 'No. Coverage shows executed lines, not whether assertions check the right behaviour.',
      level: 'intermediate',
    },
    {
      q: 'What causes flaky tests?',
      a: 'Time, randomness, shared state, network calls and order dependence.',
      level: 'intermediate',
    },
    {
      q: 'Should you retry flaky tests?',
      a: 'Only as a temporary mitigation. The root cause must be fixed, or the team learns to ignore red builds.',
      level: 'advanced',
    },
  ],
  'deployment-strategies': [
    {
      q: 'How does a rolling deployment work?',
      a: 'Instances are replaced in batches, so old and new versions run together briefly.',
      level: 'basic',
    },
    {
      q: 'How does blue-green work?',
      a: 'Deploy to the idle environment, verify, then switch traffic. Rollback switches back.',
      level: 'basic',
    },
    {
      q: 'What is a canary release?',
      a: 'Sending a small traffic slice to the new version and increasing it only if metrics stay healthy.',
      level: 'intermediate',
    },
    {
      q: 'What must a rolling deploy preserve?',
      a: 'Backward compatibility in the API and database while both versions run.',
      level: 'advanced',
    },
  ],
  'environments-security': [
    {
      q: 'Why separate secrets per environment?',
      a: 'So a staging compromise cannot reach production, and permissions stay scoped.',
      level: 'basic',
    },
    {
      q: 'Why gate production with an approval?',
      a: 'It adds a human check on the highest-risk action and records who approved it.',
      level: 'basic',
    },
    {
      q: 'Why prefer OIDC over stored cloud keys?',
      a: 'OIDC issues short-lived credentials, so there is no long-lived secret to leak.',
      level: 'intermediate',
    },
    {
      q: 'How do you secure the supply chain?',
      a: 'Pin actions and images, use least-privilege tokens, scan dependencies, sign artifacts and keep an SBOM.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you design a full pipeline?',
      a: 'Install from the lockfile, lint, test with coverage, build one image, push with a commit tag, deploy to staging, smoke test, then promote the digest to production with approval.',
      level: 'intermediate',
    },
    {
      q: 'How do you prove a pipeline is safe?',
      a: 'It blocks a deliberately bad build and still deploys and rolls back a good one.',
      level: 'intermediate',
    },
    {
      q: 'What is the biggest CI/CD risk?',
      a: 'A pipeline with production credentials that anyone can change. Treat workflow changes as privileged code.',
      level: 'advanced',
    },
    {
      q: 'What is the best first step?',
      a: 'A reliable pipeline that installs and tests every pull request.',
      level: 'basic',
    },
  ],
};
