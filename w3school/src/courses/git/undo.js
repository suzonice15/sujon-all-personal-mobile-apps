// Git chapter: Undoing Things. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'undo',
  title: 'Undoing Things',
  description: 'restore, reset (soft/mixed/hard), revert, amend, stash and recovering with reflog',
  icon: 'undo',
  lessons: [
    {
      id: 'git-restore',
      title: 'Discard and Unstage Changes: git restore',
      blocks: [
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "Good text" > page.txt
git add .
git commit -m "Add page"
# Oops: a bad edit you do NOT want to keep
echo "Bad edit" > page.txt
git status -s
git restore page.txt
cat page.txt
# Oops: staged a file you did not mean to commit
echo "secret=123" > .env
git add .env
git status -s
git restore --staged .env
git status -s` },
        { type: 'note', value: 'git restore <file> throws away uncommitted changes for good: there is no undo for that. When unsure, git stash first.' },
      ],
    },
    {
      id: 'git-reset',
      title: 'git reset: soft, mixed and hard',
      blocks: [
        { type: 'text', value: 'git reset moves the current branch back to an earlier commit. The mode decides what happens to the changes from the commits you "undo".' },
        { type: 'list', items: [
          '--soft: undo the commits, keep their changes STAGED (ready to commit again). Great for squashing your last few commits into one.',
          '--mixed (default): undo the commits, keep the changes in your files but UNSTAGED.',
          '--hard: undo the commits AND delete their changes from your files. Dangerous.',
        ] },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "1" > log.txt
git add .
git commit -m "Step 1"
echo "2" >> log.txt
git commit -am "Step 2"
echo "3" >> log.txt
git commit -am "Step 3"
git log --oneline
# Undo the last commit but keep its change in the file (mixed)
git reset HEAD~1
git status -s
cat log.txt
# Throw away the change and go back one more commit (hard)
git reset --hard HEAD~1
git log --oneline
cat log.txt` },
        { type: 'note', value: 'Golden rule: never reset commits that you have already pushed to a shared branch. Others have them too, and their history would no longer match yours. Use git revert instead.' },
      ],
    },
    {
      id: 'git-revert',
      title: 'git revert: Undo Safely on Shared Branches',
      blocks: [
        { type: 'text', value: 'git revert creates a NEW commit that does the opposite of an old one. History is never rewritten, so it is safe on main even after pushing. This is how you roll back a bad deploy.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "price = 100" > shop.cfg
git add .
git commit -m "Set price"
echo "discount = 90" >> shop.cfg
git commit -am "Add 90% discount (oops)"
echo "currency = BDT" >> shop.cfg
git commit -am "Add currency"
git revert HEAD~1
git log --oneline
cat shop.cfg
git show HEAD` },
      ],
    },
    {
      id: 'git-amend-stash',
      title: 'Amending Commits and Stashing Work',
      blocks: [
        { type: 'text', value: 'git commit --amend replaces the LAST commit with a new one: fix its message or add a forgotten file. Only amend commits you have not pushed yet.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "<h1>Contact</h1>" > contact.html
git add .
git commit -m "Add contcat page"
git log --oneline
# Fix the typo in the message
git commit --amend -m "Add contact page"
# Forgot the stylesheet: stage it and add it to the same commit
echo "h1 { color: teal; }" > contact.css
git add contact.css
git commit --amend --no-edit
git log --oneline
git show HEAD` },
        { type: 'text', value: 'git stash puts your uncommitted changes on a shelf so you get a clean working tree, for example to fix an urgent bug on another branch. git stash pop brings them back.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "v1" > app.txt
git add .
git commit -m "App v1"
# Half-finished work...
echo "half done feature" >> app.txt
git status -s
# ...urgent bug! Shelve the work:
git stash
git status
git stash list
git switch -c hotfix
echo "bugfix" > fix.txt
git add .
git commit -m "Fix urgent bug"
git switch main
git stash pop
cat app.txt` },
        { type: 'note', value: 'Useful variations on a real computer: git stash push -m "wip: search", git stash -u (include untracked files), git stash show -p, git stash drop.' },
      ],
    },
    {
      id: 'git-reflog',
      title: 'Recovering "Lost" Commits with reflog',
      blocks: [
        { type: 'text', value: 'Git almost never loses committed work. The reflog records every position HEAD has been at, even after reset --hard or deleting a branch. Commits stay recoverable for about 90 days.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "product list" > shop.txt
git add .
git commit -m "Add product list"
echo "cart" >> shop.txt
git commit -am "Add cart"
echo "payment" >> shop.txt
git commit -am "Add payment page"
# Disaster: two commits "gone"
git reset --hard HEAD~2
git log --oneline
# The reflog still knows where HEAD was
git reflog
git reset --hard HEAD@{1}
git log --oneline
cat shop.txt` },
        { type: 'code', lang: 'text', value: String.raw`$ git reset --hard HEAD~3          # oops, three commits "gone"
HEAD is now at 1a2b3c4 Add login

$ git reflog
1a2b3c4 HEAD@{0}: reset: moving to HEAD~3
9f8e7d6 HEAD@{1}: commit: Add payment page
5c4b3a2 HEAD@{2}: commit: Add cart
7d6e5f4 HEAD@{3}: commit: Add product list

$ git reset --hard 9f8e7d6         # everything is back
HEAD is now at 9f8e7d6 Add payment page

$ git branch rescue 9f8e7d6        # or keep it on a new branch` },
        { type: 'list', items: [
          'Committed work: almost always recoverable with reflog.',
          'Staged but never committed: often recoverable with git fsck --lost-found (harder).',
          'Never staged or committed: gone after git restore or reset --hard. Commit early, commit often.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'undo', q: 'Which command discards unstaged changes to a file?', options: ['git reset --soft', 'git restore <file>', 'git revert <file>', 'git stash list'], answer: 1, explain: 'This cannot be undone.' },
    { chapterId: 'undo', q: 'What does git reset --soft HEAD~1 do?', options: ['Deletes the last commit and its changes', 'Undoes the last commit but keeps its changes staged', 'Creates a revert commit', 'Pushes to GitHub'], answer: 1, explain: '--mixed would leave them unstaged; --hard would delete them.' },
    { chapterId: 'undo', q: 'Which is safe for undoing a commit that is already pushed to main?', options: ['git reset --hard', 'git revert', 'git commit --amend', 'Deleting the .git folder'], answer: 1, explain: 'revert adds a new commit instead of rewriting history.' },
    { chapterId: 'undo', q: 'What does git stash do?', options: ['Deletes changes', 'Temporarily shelves uncommitted changes so the working tree is clean', 'Creates a branch', 'Commits to a hidden branch on GitHub'], answer: 1, explain: 'git stash pop brings them back.' },
    { chapterId: 'undo', q: 'You ran reset --hard and lost commits. What helps?', options: ['Nothing', 'git reflog to find the old commit hash', 'git status', 'git init'], answer: 1, explain: 'Then reset or branch to that hash.' },
  ],
};
