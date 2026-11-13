// CI/CD chapter: Environments & Security.

export default {
  id: 'environments-security',
  title: 'Environments & Security',
  description: 'Secrets, approvals and supply-chain safety',
  icon: 'lock',
  lessons: [
    {
      id: 'cicd-environments',
      title: 'Environments',
      blocks: [
        { type: 'text', value: 'An environment is a target with its own configuration and secrets: dev, staging, production. Production should require approval, and only the pipeline should hold its credentials.' },
        { type: 'list', items: [
          'Separate secrets per environment',
          'Production deploy needs an approval',
          'Limit who can trigger a deploy',
          'Record who deployed what and when',
          'Keep staging close to production',
        ] },
        { type: 'note', value: 'A staging environment that nobody uses will drift from production and stop catching bugs.' },
      ],
    },
    {
      id: 'cicd-secrets',
      title: 'Secrets in pipelines',
      blocks: [
        { type: 'text', value: 'Store secrets in the CI secret store, injected at runtime. Never commit them. Prefer short-lived tokens from OIDC over long-lived keys, and scope each credential to one job.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `deploy:\n  environment: production\n  permissions:\n    id-token: write\n    contents: read\n  steps:\n    - run: ./deploy.sh\n      env:\n        TOKEN: \${{ secrets.DEPLOY_TOKEN }}` },
        { type: 'note', value: 'If a secret may have leaked, rotate it first. Deleting the log does not make it private again.' },
      ],
    },
    {
      id: 'cicd-supply-chain',
      title: 'Supply-chain safety',
      blocks: [
        { type: 'text', value: 'A pipeline runs third-party code. Pin action and image versions, limit token permissions, and scan dependencies. Generate an SBOM so you can answer “are we affected?” quickly.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Fail on critical vulnerabilities\nnpm audit --audit-level=critical\n\n# Generate a software bill of materials\nsyft packages dir:. -o spdx-json > sbom.json\n\n# Sign the image\ncosign sign ghcr.io/acme/app@sha256:abc123` },
        { type: 'list', items: [
          'Pin actions to a version or SHA',
          'Use least-privilege tokens',
          'Scan dependencies on every build',
          'Sign artifacts and verify before deploy',
          'Keep a generated SBOM per release',
        ] },
        { type: 'note', value: 'Your pipeline is production access. Treat a workflow change like a code change that can deploy.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'environments-security',
      q: 'What should production deploys require?',
      options: ['Nothing', 'An approval and scoped credentials', 'A developer laptop', 'A shared password'],
      answer: 1,
      explain: 'Approval and scoped secrets protect production.',
    },
    {
      chapterId: 'environments-security',
      q: 'Why prefer OIDC tokens?',
      options: ['They are longer', 'They are short-lived and not stored', 'They are free', 'They skip auth'],
      answer: 1,
      explain: 'Short-lived tokens reduce risk.',
    },
    {
      chapterId: 'environments-security',
      q: 'What does an SBOM help with?',
      options: ['Faster builds', 'Knowing which dependencies shipped', 'CSS', 'Caching'],
      answer: 1,
      explain: 'It lists shipped components.',
    },
    {
      chapterId: 'environments-security',
      q: 'What if a secret leaks?',
      options: ['Delete the log only', 'Rotate the secret immediately', 'Ignore it', 'Rename the variable'],
      answer: 1,
      explain: 'Rotation is the real fix.',
    },
  ],
};
