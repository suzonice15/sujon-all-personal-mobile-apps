// Git chapter: Practice Projects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Each project is a realistic scenario you replay (and change) in the Try it playground.

export default {
  id: 'projects',
  title: 'Practice Scenarios',
  description: 'Realistic team scenarios: feature work, hotfixes, conflicts and recovering from mistakes',
  icon: 'construction',
  lessons: [
    {
      id: 'git-project-portfolio',
      title: 'Scenario 1: Build a Portfolio Site, Commit by Commit',
      blocks: [
        { type: 'text', value: 'Build a small site with a clean history: one commit per logical step, a feature branch per page, and a tag for the first release. Then try it yourself with your own pages.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git config --global user.name "Nadia Rahman"
git config --global user.email "nadia@example.com"
git init
echo "node_modules/" > .gitignore
echo "# Nadia's Portfolio" > README.md
git add .
git commit -m "chore: initial project setup"
echo "<h1>Nadia Rahman</h1>" > index.html
git add index.html
git commit -m "feat: add home page"
git switch -c feature/projects
echo "<h2>Projects</h2>" > projects.html
echo "<li>CodeNest Shop</li>" >> projects.html
git add projects.html
git commit -m "feat: add projects page"
echo "<a href=projects.html>Projects</a>" >> index.html
git commit -am "feat: link projects from home"
git switch main
git merge --no-ff feature/projects
git branch -d feature/projects
git tag -a v1.0.0 -m "First public version"
git log --oneline` },
        { type: 'list', items: [
          'Challenge: add a contact page on its own branch and merge it.',
          'Challenge: change the README, then look at git diff before committing.',
          'Real world: create the repository on GitHub, push it, and publish it with GitHub Pages.',
        ] },
      ],
    },
    {
      id: 'git-project-hotfix',
      title: 'Scenario 2: Urgent Hotfix While Working on a Feature',
      blocks: [
        { type: 'text', value: 'You are halfway through a feature when production breaks. Shelve your work, fix the bug on a hotfix branch from main, release it, then return to your feature and bring the fix into it.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "total = price * qty" > checkout.py
git add .
git commit -m "Add checkout"
git tag v1.0.0
git switch -c feature/coupons
echo "coupon = None" >> checkout.py
git commit -am "WIP: coupon support"
echo "apply_coupon(total)" >> checkout.py
# Production bug reported! Shelve the unfinished edit
git stash
git switch main
git switch -c hotfix/negative-total
echo "total = max(0, total)" > guard.py
git add guard.py
git commit -m "fix: never allow a negative total"
git switch main
git merge hotfix/negative-total
git tag v1.0.1
git branch -d hotfix/negative-total
# Back to the feature: get the fix, restore the unfinished work
git switch feature/coupons
git merge main
git stash pop
git status -s
git log --oneline --all` },
      ],
    },
    {
      id: 'git-project-team-conflict',
      title: 'Scenario 3: Two Developers, One File',
      blocks: [
        { type: 'text', value: 'Nadia and Rafi both change the price list. Nadia\'s branch is merged first; Rafi has to resolve the conflict, keeping both changes.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "keyboard = 1500" > prices.txt
echo "mouse = 450" >> prices.txt
git add .
git commit -m "Add price list"
git switch -c nadia/keyboard-sale
echo "keyboard = 1200" > prices.txt
echo "mouse = 450" >> prices.txt
git commit -am "Discount keyboard"
git switch main
git switch -c rafi/new-products
echo "keyboard = 1500" > prices.txt
echo "mouse = 450" >> prices.txt
echo "webcam = 3500" >> prices.txt
git commit -am "Add webcam"
# Nadia's PR is merged first (fast-forward)
git switch main
git merge nadia/keyboard-sale
# Rafi brings main into his branch before his PR can merge
git switch rafi/new-products
git merge main
git status
cat prices.txt` },
        { type: 'text', value: 'Here Git could merge automatically because the changes touched different lines. Now try the version below, where both developers change the SAME line, and resolve it.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "mouse = 450" > prices.txt
git add .
git commit -m "Add mouse"
git switch -c nadia
echo "mouse = 400" > prices.txt
git commit -am "Nadia: mouse 400"
git switch main
git switch -c rafi
echo "mouse = 499" > prices.txt
git commit -am "Rafi: mouse 499"
git switch main
git merge nadia
git switch rafi
git merge main
cat prices.txt
# The team agreed on 420
echo "mouse = 420" > prices.txt
git add prices.txt
git commit -m "Merge main: agree mouse price 420"
git log --oneline` },
      ],
    },
    {
      id: 'git-project-recovery',
      title: 'Scenario 4: Fixing Common Mistakes',
      blocks: [
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "app" > app.py
git add .
git commit -m "Add app"
# Mistake 1: committed to main instead of a feature branch
echo "half-done search" >> app.py
git commit -am "Search (should be on a branch)"
git branch feature/search
git reset --hard HEAD~1
git log --oneline --all
# Mistake 2: staged a secret
echo "KEY=abc123" > .env
git add .env
git restore --staged .env
echo ".env" > .gitignore
git add .gitignore
git commit -m "Ignore .env"
git status -s
# Mistake 3: a commit broke production; undo it safely
echo "breaking change" >> app.py
git commit -am "Refactor app"
git revert HEAD
git log --oneline
cat app.py` },
        { type: 'list', items: [
          'Wrong branch, not pushed: create the right branch at HEAD, then reset the wrong branch back.',
          'Secret staged but not committed: git restore --staged, add it to .gitignore.',
          'Bad commit already shared: git revert, never reset.',
          'Lost commits: git reflog (real computer).',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'projects', q: 'You committed to main by mistake (not pushed). Best fix?', options: ['Delete the repository', 'git branch feature/x, then git reset --hard HEAD~1 on main', 'git push --force', 'git revert on main'], answer: 1, explain: 'The new branch keeps the commit; main moves back.' },
    { chapterId: 'projects', q: 'In the hotfix scenario, why branch the fix from main and not from the feature?', options: ['It is faster', 'So the release contains only the fix, not unfinished feature work', 'Git requires it', 'Features cannot be branched'], answer: 1, explain: 'Then merge main into the feature to get the fix there too.' },
    { chapterId: 'projects', q: 'Two branches changed different lines of one file. What happens on merge?', options: ['Always a conflict', 'Git merges them automatically', 'One change is lost', 'The merge is refused'], answer: 1, explain: 'Conflicts only occur on overlapping changes.' },
    { chapterId: 'projects', q: 'Why did Rafi merge main into his branch before his PR?', options: ['To delete Nadia\'s work', 'To resolve conflicts on his branch so the PR merges cleanly', 'To rename the branch', 'To create a tag'], answer: 1, explain: 'Keep your branch up to date with main.' },
  ],
};
