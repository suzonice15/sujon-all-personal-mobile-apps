// Cloud chapter: Deployment.

export default {
  id: 'deployment',
  title: 'Deployment',
  description: 'Infrastructure as code, environments and CI/CD',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'cloud-iac',
      title: 'Infrastructure as code',
      blocks: [
        { type: 'text', value: 'IaC describes infrastructure in files, so it can be reviewed, versioned and recreated. Terraform is multi-cloud; CloudFormation, Bicep and Pulumi are alternatives.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `terraform init
terraform plan
terraform apply

# Review the plan before applying. It shows what will change.` },
        { type: 'note', value: 'Never click production infrastructure by hand if you can avoid it. A manual change is invisible to review and hard to reproduce.' },
      ],
    },
    {
      id: 'cloud-environments',
      title: 'Environments',
      blocks: [
        { type: 'text', value: 'Separate development, staging and production. Staging should be close enough to production to catch configuration problems, and production credentials should never exist in development.' },
        { type: 'list', items: [
          'Separate accounts or projects per environment',
          'Separate databases and secrets',
          'A staging deploy before production',
          'A rollback plan for every change',
          'No production data in development',
        ] },
        { type: 'note', value: 'A shared production database for staging is a data leak and a stability risk. Separate them.' },
      ],
    },
    {
      id: 'cloud-cicd',
      title: 'CI/CD on cloud',
      blocks: [
        { type: 'text', value: 'A pipeline builds, tests, scans, deploys and verifies. Use short-lived credentials from OIDC rather than storing cloud keys in CI.' },
        { type: 'code', lang: 'yaml', tryIt: false, value: `jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh
        env:
          AWS_ROLE_ARN: \${{ secrets.AWS_ROLE_ARN }}` },
        { type: 'note', value: 'Deploy the exact artifact that passed tests. Rebuilding during deploy introduces a different binary.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deployment',
      q: 'What is infrastructure as code?',
      options: ['Clicking in a console', 'Describing infrastructure in versioned files', 'A database', 'A firewall'],
      answer: 1,
      explain: 'It is reviewable and reproducible.',
    },
    {
      chapterId: 'deployment',
      q: 'Why separate environments?',
      options: ['To save money', 'To isolate data and reduce production risk', 'To enable DNS', 'To use more services'],
      answer: 1,
      explain: 'Production must not share data with staging.',
    },
    {
      chapterId: 'deployment',
      q: 'What should CI deploy?',
      options: ['A fresh rebuild', 'The exact artifact that passed tests', 'A developer laptop', 'A database backup'],
      answer: 1,
      explain: 'Rebuilding can produce a different binary.',
    },
  ],
};
