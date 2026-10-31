// Git chapter: GitHub Actions and Automation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'actions',
  title: 'GitHub Actions & Automation',
  description: 'CI workflows, tests on every PR, deployment, GitHub Pages, Dependabot and branch protection',
  icon: 'play-for-work',
  lessons: [
    {
      id: 'git-ci-basics',
      title: 'Continuous Integration with GitHub Actions',
      blocks: [
        { type: 'text', value: 'GitHub Actions runs workflows on GitHub\'s servers when something happens in your repository (a push, a pull request, a schedule). The most important use: run the tests on every pull request so broken code never reaches main.' },
        { type: 'code', lang: 'text', value: String.raw`# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4                 # get the code
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci                               # install exact versions from package-lock.json
      - run: npm run lint
      - run: npm test` },
        { type: 'list', items: [
          'on: when to run. jobs: what to run; each job runs on a fresh virtual machine.',
          'steps: either uses: (a ready-made action) or run: (a shell command).',
          'Results appear as green ticks or red crosses on the commit and the pull request.',
          'Free for public repositories, with free monthly minutes for private ones.',
        ] },
      ],
    },
    {
      id: 'git-ci-matrix-secrets',
      title: 'Matrix Builds, Secrets and Caching',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python: ["3.12", "3.13", "3.14"]          # three jobs in parallel
    services:
      postgres:
        image: postgres:17
        env: { POSTGRES_PASSWORD: test }
        ports: ["5432:5432"]
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v6
      - run: uv python install ${"$"}{{ matrix.python }}
      - run: uv sync && uv run pytest
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/postgres
          API_KEY: ${"$"}{{ secrets.PAYMENT_SANDBOX_KEY }}   # from Settings -> Secrets and variables` },
        { type: 'note', value: 'Never put passwords or tokens in the workflow file. Store them as repository secrets; GitHub hides them in logs and does not give them to pull requests from forks.' },
      ],
    },
    {
      id: 'git-cd-pages',
      title: 'Deployment and GitHub Pages',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`# Deploy a static site (portfolio, documentation) to GitHub Pages on every push to main
name: Deploy site
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - uses: actions/deploy-pages@v4

# Your site: https://<username>.github.io/<repository>/` },
        { type: 'list', items: [
          'Deploy servers the same way: build a Docker image and push it, or call your host (Render, Fly.io, a VPS over SSH).',
          'Use environments with required reviewers for production deployments.',
          'Release mobile apps: build the APK/AAB in Actions and attach it to a GitHub Release when you push a tag.',
        ] },
      ],
    },
    {
      id: 'git-repo-protection',
      title: 'Branch Protection, Dependabot and Security Features',
      blocks: [
        { type: 'list', items: [
          'Branch protection / rulesets on main: require a pull request, at least one approval, passing status checks, and block force-pushes.',
          'Dependabot: opens PRs automatically when your dependencies have updates or security fixes (.github/dependabot.yml).',
          'Secret scanning and push protection: block commits that contain API keys.',
          'Code scanning (CodeQL): finds security bugs in your code on every PR.',
          'Two-factor authentication and signed commits for maintainers.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule: { interval: weekly }
  - package-ecosystem: github-actions
    directory: /
    schedule: { interval: monthly }` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'actions', q: 'Where do GitHub Actions workflow files live?', options: ['/actions', '.github/workflows/*.yml', 'package.json', '.git/hooks'], answer: 1, explain: 'Each YAML file is one workflow.' },
    { chapterId: 'actions', q: 'What is the main purpose of CI?', options: ['Writing code', 'Automatically building and testing every change', 'Hosting websites only', 'Code review'], answer: 1, explain: 'Broken changes are caught before they reach main.' },
    { chapterId: 'actions', q: 'Where should an API key used by a workflow be stored?', options: ['In the YAML file', 'In repository secrets', 'In README.md', 'In a commit message'], answer: 1, explain: 'Use ${{ secrets.NAME }} in the workflow.' },
    { chapterId: 'actions', q: 'What does a matrix strategy do?', options: ['Runs the same job with different settings, e.g. several Python versions', 'Encrypts secrets', 'Merges branches', 'Creates tags'], answer: 0, explain: 'Jobs run in parallel for each combination.' },
    { chapterId: 'actions', q: 'What does Dependabot do?', options: ['Writes tests', 'Opens pull requests to update dependencies', 'Deploys the app', 'Reviews code'], answer: 1, explain: 'Including security updates.' },
  ],
};
