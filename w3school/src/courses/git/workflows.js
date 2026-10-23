// Git chapter: Branching Workflows. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'workflows',
  title: 'Team Workflows',
  description: 'GitHub Flow, Git Flow, trunk-based development, Conventional Commits and releases',
  icon: 'account-tree',
  lessons: [
    {
      id: 'git-github-flow',
      title: 'GitHub Flow',
      blocks: [
        { type: 'text', value: 'The simplest and most popular workflow for web apps and teams that deploy often. There is one long-lived branch, main, which is always deployable.' },
        { type: 'list', items: [
          '1. Create a branch from main for each change (feature/..., fix/...).',
          '2. Commit and push regularly.',
          '3. Open a pull request early; CI runs tests on every push.',
          '4. Review, discuss, improve.',
          '5. Merge into main (often squash merge), then deploy automatically.',
          '6. Delete the branch.',
        ] },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "v1" > app.txt
git add .
git commit -m "Initial app"
# Feature 1
git switch -c feature/search
echo "search" >> app.txt
git commit -am "feat: add search"
git switch main
git merge --no-ff feature/search
git branch -d feature/search
# Feature 2
git switch -c fix/login-redirect
echo "redirect fix" > login.txt
git add .
git commit -m "fix: redirect to dashboard after login"
git switch main
git merge --no-ff fix/login-redirect
git branch -d fix/login-redirect
git log --oneline` },
      ],
    },
    {
      id: 'git-flow-trunk',
      title: 'Git Flow and Trunk-Based Development',
      blocks: [
        { type: 'list', items: [
          'Git Flow: main (released code), develop (integration), feature/*, release/*, hotfix/*. Suits products with planned versions (mobile apps, installed software). Heavier process.',
          'Trunk-based: everyone integrates small changes into main at least daily; unfinished work hides behind feature flags. Used by high-performing teams with strong automated tests.',
          'Release branches: release/1.4 is cut from main for stabilisation; fixes are cherry-picked into it.',
          'Choose the simplest workflow your team can deploy safely with; for most web teams that is GitHub Flow.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`Git Flow
main     ──●────────────────────●──────────●──      (tags v1.0, v1.1)
            \                  / \        /
develop      ●──●──●──●──●──●─    ●──●──●
               \     /    \    /
feature/x       ●──●       ●──●   release/1.1` },
      ],
    },
    {
      id: 'git-conventional-commits',
      title: 'Conventional Commits and Changelogs',
      blocks: [
        { type: 'text', value: 'Conventional Commits is a simple message format that both humans and tools understand. Tools can then generate changelogs and decide the next version number automatically (feat -> MINOR, fix -> PATCH, BREAKING CHANGE -> MAJOR).' },
        { type: 'code', lang: 'text', value: String.raw`<type>(optional scope): <short description>

feat(cart): add coupon codes
fix(auth): redirect to dashboard after login
docs: explain local setup in README
refactor(api): extract payment client
test(cart): cover empty cart checkout
chore(deps): bump django to 5.1.4
perf(search): cache popular queries
ci: run tests on pull requests

feat(api)!: remove v1 endpoints

BREAKING CHANGE: clients must use /api/v2.` },
        { type: 'note', value: 'Enforce it with commitlint and a git hook, and generate releases with tools like release-please or semantic-release.' },
      ],
    },
    {
      id: 'git-hooks',
      title: 'Git Hooks: Automatic Checks Before Commit',
      blocks: [
        { type: 'text', value: 'Hooks are scripts Git runs at certain moments (pre-commit, commit-msg, pre-push). Use them to run formatters, linters and quick tests before bad code ever reaches a commit.' },
        { type: 'code', lang: 'text', value: String.raw`# The pre-commit framework (works for any language)
$ pip install pre-commit
$ cat .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.7.4
    hooks: [{ id: ruff, args: [--fix] }, { id: ruff-format }]
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v5.0.0
    hooks: [{ id: detect-private-key }, { id: check-added-large-files }]
$ pre-commit install

# JavaScript projects often use husky + lint-staged
$ npx husky init
$ echo "npx lint-staged" > .husky/pre-commit` },
        { type: 'note', value: 'Hooks run on each developer\'s machine and can be skipped (git commit --no-verify), so always repeat the same checks in CI.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'workflows', q: 'In GitHub Flow, how many long-lived branches are there?', options: ['One: main', 'Two: main and develop', 'One per developer', 'None'], answer: 0, explain: 'Feature branches are short-lived.' },
    { chapterId: 'workflows', q: 'Which workflow uses develop, release/* and hotfix/* branches?', options: ['GitHub Flow', 'Git Flow', 'Trunk-based development', 'Forking workflow'], answer: 1, explain: 'It suits planned, versioned releases.' },
    { chapterId: 'workflows', q: 'Which Conventional Commit type bumps the MINOR version?', options: ['fix', 'feat', 'docs', 'chore'], answer: 1, explain: 'fix bumps PATCH; a breaking change bumps MAJOR.' },
    { chapterId: 'workflows', q: 'What is a pre-commit hook?', options: ['A GitHub page', 'A script that runs automatically before each commit', 'A branch protection rule', 'A merge strategy'], answer: 1, explain: 'Often runs formatters and linters.' },
    { chapterId: 'workflows', q: 'How does trunk-based development hide unfinished features?', options: ['Long-lived branches', 'Feature flags', 'Private repositories', 'git stash'], answer: 1, explain: 'Code is merged daily but switched off until ready.' },
  ],
};
