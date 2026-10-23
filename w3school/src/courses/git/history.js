// Git chapter: Exploring History. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'history',
  title: 'Exploring History',
  description: 'git log, show, diff, HEAD~n references and finding who changed what',
  icon: 'history',
  lessons: [
    {
      id: 'git-log',
      title: 'git log',
      blocks: [
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git config --global user.name "Rafi"
git config --global user.email "rafi@example.com"
git init
echo "v1" > app.txt
git add .
git commit -m "Create app"
echo "v2" >> app.txt
git commit -am "Add login"
echo "v3" >> app.txt
git commit -am "Add dashboard"
git log
git log --oneline
git log --oneline -2` },
        { type: 'text', value: 'Range syntax answers "what is on one branch that is not on another". Very handy before merging or deploying.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git config --global user.name "Nadia"
git init
echo "app" > app.py
git add .
git commit -m "Start app"
git switch -c feature/cart
echo "def add_to_cart(): pass" > cart.py
git add .
git commit -m "Add cart"
echo "def remove_from_cart(): pass" >> cart.py
git commit -am "Remove items from cart"
git switch main
# What will merging feature/cart bring in?
git log --oneline main..feature/cart
# Who wrote how many commits?
git shortlog -sn
# Search the tracked files
git switch feature/cart
git grep -n "cart"` },
        { type: 'code', lang: 'text', value: String.raw`# More log options on a real computer
$ git log --oneline --graph --all --decorate     # branch structure as ASCII art
$ git log --author="Nadia" --since="2 weeks ago"
$ git log --grep="payment"                       # search commit messages
$ git log -p app.py                              # history of one file with diffs
$ git log -S "calculate_tax"                     # commits that added/removed this text
$ git shortlog -sn                               # commits per author` },
      ],
    },
    {
      id: 'git-diff-show',
      title: 'git diff and git show',
      blocks: [
        { type: 'text', value: 'git diff shows changes that are NOT staged yet. git diff --staged shows what WILL go into the next commit. git show displays one commit and its changes. Lines starting with + were added, - were removed.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "price = 100" > cart.py
echo "tax = 0.05" >> cart.py
git add .
git commit -m "Add cart"
echo "price = 100" > cart.py
echo "tax = 0.15" >> cart.py
echo "discount = 10" >> cart.py
git diff
git add cart.py
git diff
git diff --staged
git commit -m "Update tax and add discount"
git show HEAD` },
      ],
    },
    {
      id: 'git-references',
      title: 'HEAD, Hashes and Relative References',
      blocks: [
        { type: 'text', value: 'Every commit has a unique SHA-1 hash; the first 7 characters are usually enough. HEAD means "the commit you are on". HEAD~1 is its parent, HEAD~2 the grandparent. You can use these anywhere a commit is expected.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "1" > f.txt
git add .
git commit -m "First"
echo "2" >> f.txt
git commit -am "Second"
echo "3" >> f.txt
git commit -am "Third"
git log --oneline
git show HEAD~2
git diff HEAD~2 HEAD
git log --oneline HEAD~1` },
        { type: 'note', value: 'HEAD~1 follows the first parent. A merge commit has two parents: HEAD^1 is the branch you were on, HEAD^2 is the branch you merged in.' },
      ],
    },
    {
      id: 'git-blame-search',
      title: 'Who Changed This Line? blame and bisect',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`$ git blame checkout.py
a1b2c3d4 (Nadia 2026-03-02 10:14:05 +0600 12)     total = subtotal + shipping
9f8e7d6c (Rafi  2026-03-09 16:40:21 +0600 13)     total -= discount       # <- who added this?
a1b2c3d4 (Nadia 2026-03-02 10:14:05 +0600 14)     return round(total, 2)

$ git show 9f8e7d6c          # read the commit message: WHY was it added?` },
        { type: 'text', value: 'git bisect finds the commit that introduced a bug with a binary search: you mark a good and a bad commit, and Git checks out the middle one until it finds the culprit. 1,000 commits need only about 10 steps.' },
        { type: 'code', lang: 'text', value: String.raw`$ git bisect start
$ git bisect bad                 # the current version has the bug
$ git bisect good v1.2.0         # this old version was fine
Bisecting: 37 revisions left to test after this (roughly 5 steps)
$ npm test                       # test this version...
$ git bisect good                # ...or git bisect bad
...
3e1f9a2 is the first bad commit
    Round prices before applying the discount
$ git bisect reset               # back to where you started

# Fully automatic: git bisect run pytest tests/test_checkout.py` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'history', q: 'What does git log --oneline show?', options: ['Only the last commit', 'One line per commit: short hash and subject', 'The diff of every commit', 'Only merge commits'], answer: 1, explain: 'Great for a quick overview.' },
    { chapterId: 'history', q: 'What does git diff show by default?', options: ['Staged changes', 'Unstaged changes in the working tree', 'The last commit', 'Remote changes'], answer: 1, explain: 'Use git diff --staged for what will be committed.' },
    { chapterId: 'history', q: 'What is HEAD~2?', options: ['Two branches back', 'The grandparent of the current commit', 'The second file', 'Two commits ahead'], answer: 1, explain: '~n walks back n first-parent steps.' },
    { chapterId: 'history', q: 'Which command shows who last changed each line of a file?', options: ['git log', 'git blame', 'git who', 'git diff'], answer: 1, explain: 'Then git show <hash> explains why.' },
    { chapterId: 'history', q: 'What does git bisect do?', options: ['Splits a repository', 'Binary-searches history to find the commit that introduced a bug', 'Deletes half of the commits', 'Merges two branches'], answer: 1, explain: 'About log2(n) steps for n commits.' },
  ],
};
