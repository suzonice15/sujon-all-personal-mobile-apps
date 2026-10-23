// Git chapter: Branches. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'branches',
  title: 'Branches',
  description: 'Creating, switching, listing, renaming and deleting branches',
  icon: 'call-split',
  lessons: [
    {
      id: 'git-branch-basics',
      title: 'What a Branch Is',
      blocks: [
        { type: 'text', value: 'A branch is just a movable label pointing at a commit. Creating one is instant and free. Work on a new feature in its own branch, and main stays stable and deployable until the feature is ready.' },
        { type: 'code', lang: 'text', value: String.raw`          main
           │
  A ── B ── C              git switch -c feature/login
            \
             D ── E        feature/login  (HEAD)

HEAD = "where you are now"; it points at the current branch.` },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "home" > index.html
git add .
git commit -m "Home page"
git branch feature/login
git branch
git switch feature/login
echo "login form" > login.html
git add login.html
git commit -m "Add login page"
git log --oneline --all
git switch main
ls
git switch feature/login
ls` },
        { type: 'note', value: 'Switching branches changes the files in your folder to match that branch. login.html disappears on main because it only exists in feature/login. Nothing is lost.' },
      ],
    },
    {
      id: 'git-switch-checkout',
      title: 'switch, checkout and Creating Branches',
      blocks: [
        { type: 'list', items: [
          'git switch <name>: move to an existing branch (modern, clear).',
          'git switch -c <name>: create a branch and move to it.',
          'git checkout <name> / git checkout -b <name>: the older all-in-one command; you will see it in tutorials and scripts.',
          'git restore <file>: the modern way to discard file changes (older: git checkout -- <file>).',
        ] },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "v1" > app.txt
git add .
git commit -m "First version"
git switch -c feature/search
echo "search" >> app.txt
git commit -am "Add search"
git checkout -b feature/dark-mode
echo "dark mode" >> app.txt
git commit -am "Add dark mode"
git branch -v
git checkout main
cat app.txt` },
      ],
    },
    {
      id: 'git-branch-manage',
      title: 'Renaming, Deleting and Branch Naming',
      blocks: [
        { type: 'code', lang: 'git', tryIt: true, expectErrors: true, value: String.raw`git init
echo "app" > app.txt
git add .
git commit -m "Start"
git branch feature/typo
git branch experiment
git branch -m experiment spike/payment-api
git branch
# Delete a branch that was never used
git branch -d feature/typo
# Git protects unmerged work
git switch spike/payment-api
echo "try stripe" >> app.txt
git commit -am "Try payment API"
git switch main
git branch -d spike/payment-api
git branch -D spike/payment-api
git branch` },
        { type: 'list', items: [
          'Use prefixes: feature/, fix/, hotfix/, chore/, docs/, release/.',
          'Include the ticket number when your team uses one: feature/142-password-reset.',
          'Lowercase words separated by hyphens; no spaces.',
          'Delete branches after they are merged; keep the branch list short.',
        ] },
      ],
    },
    {
      id: 'git-switch-dirty',
      title: 'Switching With Uncommitted Changes',
      blocks: [
        { type: 'text', value: 'Git refuses to switch branches if it would overwrite changes you have not committed. Commit them, stash them (Undo chapter), or discard them first.' },
        { type: 'code', lang: 'git', tryIt: true, expectErrors: true, value: String.raw`git init
echo "v1" > config.txt
git add .
git commit -m "Config v1"
git switch -c other
echo "v2" > config.txt
git commit -am "Config v2 on other"
git switch main
echo "local edit" > config.txt
git switch other
# Save the edit temporarily, switch, and bring it back later
git stash
git switch other
cat config.txt` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'branches', q: 'What is a Git branch?', options: ['A copy of all files', 'A movable pointer to a commit', 'A separate repository', 'A folder on GitHub'], answer: 1, explain: 'That is why creating branches is instant.' },
    { chapterId: 'branches', q: 'Which command creates a branch AND switches to it?', options: ['git branch -c name', 'git switch -c name', 'git new name', 'git create name'], answer: 1, explain: 'git checkout -b name does the same in older style.' },
    { chapterId: 'branches', q: 'What does HEAD point to?', options: ['The first commit', 'The current branch / commit you are on', 'The remote server', 'The newest branch'], answer: 1, explain: 'HEAD moves when you switch or commit.' },
    { chapterId: 'branches', q: 'git branch -d refuses to delete a branch. Why?', options: ['It is the current branch or has unmerged commits', 'Branches cannot be deleted', 'The name is too long', 'You must be online'], answer: 0, explain: '-D forces it when you are sure.' },
    { chapterId: 'branches', q: 'Why might git switch fail?', options: ['The branch is too old', 'Your uncommitted changes would be overwritten', 'You have too many branches', 'Git is offline'], answer: 1, explain: 'Commit, stash or discard the changes first.' },
  ],
};
