// GitHub Actions chapter: Secrets & Environment Variables.

export default {
  id: 'secrets-env',
  title: 'Secrets & Env',
  description: 'Variables, secrets, environments and OIDC',
  icon: 'lock',
  lessons: [
    {
      id: 'gha-env-vars',
      title: 'Variables and scope',
      blocks: [
        { type: 'text', value: 'env can be set at workflow, job or step level. The narrowest scope wins. GITHUB_* and RUNNER_* variables are provided by the platform and should not be overwritten.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `env:\n  NODE_ENV: production\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    env:\n      API_URL: https://api.codenest.app\n    steps:\n      - run: echo "\$API_URL"\n        env:\n          NODE_ENV: test` },
        { type: 'note', value: 'A variable is visible in logs. Only secrets are masked, and even those can leak through transformations.' },
      ],
    },
    {
      id: 'gha-secrets',
      title: 'Secrets',
      blocks: [
        { type: 'text', value: 'Store tokens and keys in repository, environment or organization secrets. Reference them with secrets.NAME. Rotate them if a workflow ever prints one.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `- name: Deploy\n  run: ./deploy.sh\n  env:\n    API_TOKEN: \${{ secrets.DEPLOY_TOKEN }}` },
        { type: 'list', items: [
          'Never echo a secret',
          'Use environment secrets for production',
          'Rotate after any suspected leak',
          'Fork PRs do not receive secrets',
          'Prefer short-lived OIDC tokens where possible',
        ] },
        { type: 'note', value: 'Masking replaces exact matches only. A base64 or split secret is not masked.' },
      ],
    },
    {
      id: 'gha-environments-oidc',
      title: 'Environments and OIDC',
      blocks: [
        { type: 'text', value: 'An environment adds protection rules, such as required reviewers and a wait timer. OIDC lets a workflow request a short-lived cloud token instead of storing a long-lived key.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `jobs:\n  deploy:\n    runs-on: ubuntu-latest\n    environment:\n      name: production\n      url: https://codenest.app\n    permissions:\n      id-token: write\n      contents: read\n    steps:\n      - uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::123456789012:role/deploy\n          aws-region: ap-south-1` },
        { type: 'note', value: 'OIDC removes stored cloud keys. The trust policy must restrict which repo and branch may assume the role.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'secrets-env',
      q: 'Which env scope wins?',
      options: ['Workflow', 'Job', 'Step', 'All are equal'],
      answer: 2,
      explain: 'The narrowest scope applies.',
    },
    {
      chapterId: 'secrets-env',
      q: 'Are variables masked in logs?',
      options: ['Yes, all', 'No, only secrets are masked', 'Only on Linux', 'Only with env'],
      answer: 1,
      explain: 'Only secrets are masked.',
    },
    {
      chapterId: 'secrets-env',
      q: 'What does an environment add?',
      options: ['Faster runners', 'Protection rules such as reviewers', 'A database', 'A cache'],
      answer: 1,
      explain: 'Environments gate deploys.',
    },
    {
      chapterId: 'secrets-env',
      q: 'What is OIDC for?',
      options: ['Encrypting logs', 'Short-lived cloud credentials', 'Caching deps', 'Running tests'],
      answer: 1,
      explain: 'It issues short-lived tokens.',
    },
  ],
};
