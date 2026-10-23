// Git chapter: Best Practices and Security. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'best-practices',
  title: 'Best Practices & Security',
  description: 'Secrets, large files, signed commits, monorepos, README and a professional GitHub profile',
  icon: 'verified-user',
  lessons: [
    {
      id: 'git-secrets',
      title: 'Keeping Secrets Out of Git',
      blocks: [
        { type: 'text', value: 'Bots scan GitHub for leaked keys within minutes of a push. A committed secret stays in the history even after you delete the file in a later commit.' },
        { type: 'list', items: [
          'Keep secrets in .env files that are in .gitignore, and commit a .env.example with dummy values.',
          'Use your platform\'s secret store in production and CI (GitHub secrets, cloud secret managers).',
          'Turn on GitHub push protection: it blocks pushes that contain recognised tokens.',
          'If a secret was pushed: REVOKE and rotate it first (that is the real fix), then remove it from history with git filter-repo or the BFG Repo-Cleaner and force-push.',
          'Run gitleaks or detect-secrets in pre-commit hooks and CI.',
        ] },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo ".env" > .gitignore
echo "DB_PASSWORD=real-secret" > .env
echo "DB_PASSWORD=change-me" > .env.example
echo "app code" > app.py
git add .
git status
git commit -m "Add app with example config"
git ls-files` },
      ],
    },
    {
      id: 'git-large-files',
      title: 'Large Files, Git LFS and Monorepos',
      blocks: [
        { type: 'list', items: [
          'Git is designed for text. Big binaries (videos, design files, datasets) make every clone slow, forever.',
          'GitHub rejects files over 100 MB. Use Git LFS for large assets: git lfs install; git lfs track "*.psd".',
          'Never commit build output, dependencies (node_modules, vendor) or APK files: build them in CI instead and attach them to Releases.',
          'Monorepo: many projects in one repository (Google, Meta). Easy shared changes; needs tooling (Nx, Turborepo, sparse checkout).',
          'Polyrepo: one repository per service. Clear ownership; cross-repo changes are harder.',
          'For huge repositories: git clone --depth 1 (shallow) or --filter=blob:none (partial clone).',
        ] },
      ],
    },
    {
      id: 'git-signing-identity',
      title: 'Signed Commits and Your Identity',
      blocks: [
        { type: 'text', value: 'Anyone can set user.name to your name. Signing commits with an SSH or GPG key proves they came from you, and GitHub shows a "Verified" badge.' },
        { type: 'code', lang: 'text', value: String.raw`$ git config --global gpg.format ssh
$ git config --global user.signingkey ~/.ssh/id_ed25519.pub
$ git config --global commit.gpgsign true
# GitHub -> Settings -> SSH and GPG keys -> New SSH key -> Key type: Signing key

$ git log --show-signature -1
Good "git" signature for nadia@example.com with ED25519 key SHA256:...` },
      ],
    },
    {
      id: 'git-portfolio',
      title: 'A Professional GitHub Profile',
      blocks: [
        { type: 'list', items: [
          'Pin your 4-6 best projects. Quality beats quantity.',
          'Every project needs a README: what it does, a screenshot or GIF, how to run it, the tech stack, and a live demo link.',
          'Add a licence (MIT is common for portfolio projects).',
          'Write meaningful commit messages and use branches and PRs even in solo projects: employers do look.',
          'Create a profile README (a repository named exactly like your username).',
          'Contribute to open source, even documentation fixes.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`# CodeNest Shop

Online shop backend with FastAPI and PostgreSQL. [Live demo](https://shop.codenest.app)

![screenshot](docs/screenshot.png)

## Features
- Product catalogue with search and filters
- Cart and checkout with bKash sandbox payments
- Admin dashboard

## Run locally
    git clone https://github.com/nadia-r/codenest-shop.git
    cd codenest-shop
    cp .env.example .env
    docker compose up

## Tech
Python 3.14 · FastAPI · SQLAlchemy · PostgreSQL · Docker · GitHub Actions` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'best-practices', q: 'You accidentally pushed an API key. What is the most important first step?', options: ['Delete the file and commit', 'Revoke/rotate the key immediately', 'Make the repo private', 'Rename the variable'], answer: 1, explain: 'Assume it is already copied; then clean the history.' },
    { chapterId: 'best-practices', q: 'What should you commit instead of your real .env?', options: ['Nothing', 'A .env.example with dummy values', 'The .env encrypted with base64', 'A screenshot'], answer: 1, explain: 'It documents which settings are needed.' },
    { chapterId: 'best-practices', q: 'What is Git LFS for?', options: ['Faster commits', 'Storing large binary files outside the normal Git objects', 'Signing commits', 'Linting'], answer: 1, explain: 'Git itself is optimised for text.' },
    { chapterId: 'best-practices', q: 'What does a signed commit prove?', options: ['That the code is bug-free', 'That the commit was made by the holder of the signing key', 'That CI passed', 'That it was reviewed'], answer: 1, explain: 'GitHub shows a Verified badge.' },
    { chapterId: 'best-practices', q: 'What makes a portfolio repository stand out?', options: ['Many empty repos', 'A clear README with screenshots, setup steps and a demo link', 'No commit messages', 'Only one huge commit'], answer: 1, explain: 'Recruiters spend seconds per repo.' },
  ],
};
