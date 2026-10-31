// Git chapter: Hands-on Challenges. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Each challenge gives a starting repository in Try it. Add your own commands at the end
// until your output matches the "Expected result" shown in the lesson.

export default {
  id: 'challenges',
  title: 'Hands-on Challenges',
  description: 'Solve real Git tasks yourself in the playground and compare with the expected result',
  icon: 'emoji-events',
  lessons: [
    {
      id: 'git-challenge-1',
      title: 'Challenge 1: Two Focused Commits',
      blocks: [
        { type: 'text', value: 'Task: the starting script leaves two unrelated changes in the working tree. Add commands at the end so they become TWO commits: first "Fix price in cart" (cart.txt), then "Add contact page" (contact.html). Finish with git log --oneline.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "price = 100" > cart.txt
git add .
git commit -m "Add cart"
echo "price = 120" > cart.txt
echo "<h1>Contact</h1>" > contact.html
git status -s
# Your commands here:
` },
        { type: 'code', lang: 'text', value: String.raw`Expected result (hashes will differ if your commands differ):
xxxxxxx (HEAD -> main) Add contact page
xxxxxxx Fix price in cart
xxxxxxx Add cart` },
        { type: 'note', value: 'Hint: git add cart.txt, then commit; then git add contact.html, then commit.' },
      ],
    },
    {
      id: 'git-challenge-2',
      title: 'Challenge 2: Resolve the Conflict',
      blocks: [
        { type: 'text', value: 'Task: merging the branch "copy" causes a conflict in title.txt. Resolve it so the file contains exactly "Learn to code with CodeNest", commit the merge, and show the log.' },
        { type: 'code', lang: 'git', tryIt: true, expectErrors: true, value: String.raw`git init
echo "Learn to code" > title.txt
git add .
git commit -m "Add title"
git switch -c copy
echo "Learn to code with CodeNest" > title.txt
git commit -am "Better title"
git switch main
echo "Learn coding" > title.txt
git commit -am "Shorter title"
git merge copy
# Your commands here:
` },
        { type: 'code', lang: 'text', value: String.raw`Expected result:
$ cat title.txt
Learn to code with CodeNest
$ git log --oneline
xxxxxxx (HEAD -> main) Merge branch 'copy'   (or your own message)
xxxxxxx Shorter title
xxxxxxx (copy) Better title
xxxxxxx Add title` },
        { type: 'note', value: 'Hint: overwrite the file with echo "..." > title.txt, git add title.txt, git commit -m "...".' },
      ],
    },
    {
      id: 'git-challenge-3',
      title: 'Challenge 3: Move a Commit to the Right Branch',
      blocks: [
        { type: 'text', value: 'Task: "Add search" was committed on main by mistake. Make main point back to "Add home", and have the commit on a new branch feature/search. Finish with git log --oneline --all.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "home" > index.html
git add .
git commit -m "Add home"
echo "search" > search.html
git add .
git commit -m "Add search"
# Your commands here:
` },
        { type: 'code', lang: 'text', value: String.raw`Expected result:
xxxxxxx (feature/search) Add search
xxxxxxx (HEAD -> main) Add home` },
        { type: 'note', value: 'Hint: git branch feature/search (it keeps the commit), then git reset --hard HEAD~1 on main.' },
      ],
    },
    {
      id: 'git-challenge-4',
      title: 'Challenge 4: Rescue Lost Work',
      blocks: [
        { type: 'text', value: 'Task: someone ran reset --hard and "Add payment" seems lost. Use the reflog to bring main back to "Add payment" and show the file.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "cart" > shop.txt
git add .
git commit -m "Add cart"
echo "payment" >> shop.txt
git commit -am "Add payment"
git reset --hard HEAD~1
git log --oneline
# Your commands here:
` },
        { type: 'code', lang: 'text', value: String.raw`Expected result:
$ git log --oneline
xxxxxxx (HEAD -> main) Add payment
xxxxxxx Add cart
$ cat shop.txt
cart
payment` },
        { type: 'note', value: 'Hint: git reflog shows the commit at HEAD@{1}; git reset --hard HEAD@{1}.' },
      ],
    },
    {
      id: 'git-challenge-5',
      title: 'Challenge 5: Backport a Fix and Tag a Release',
      blocks: [
        { type: 'text', value: 'Task: copy ONLY the commit "Fix rounding" from main to the branch release/1.0 (not "Add dark mode"), then tag release/1.0 as v1.0.1. Finish with git log --oneline on release/1.0.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "total = round(x)" > money.py
git add .
git commit -m "Money helpers"
git branch release/1.0
echo "theme = dark" > theme.py
git add .
git commit -m "Add dark mode"
echo "total = round(x, 2)" > money.py
git commit -am "Fix rounding"
# Your commands here:
` },
        { type: 'code', lang: 'text', value: String.raw`Expected result:
xxxxxxx (HEAD -> release/1.0, tag: v1.0.1) Fix rounding
xxxxxxx Money helpers` },
        { type: 'note', value: 'Hint: git switch release/1.0, git cherry-pick main, git tag v1.0.1.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'challenges', q: 'In Challenge 3, why create the branch BEFORE resetting main?', options: ['It is faster', 'The new branch keeps a name on the commit, so reset does not lose it', 'Git requires branches first', 'To trigger CI'], answer: 1, explain: 'Then reset only moves main.' },
    { chapterId: 'challenges', q: 'In Challenge 5, which command copies a single commit to another branch?', options: ['git merge', 'git cherry-pick', 'git rebase -i', 'git stash'], answer: 1, explain: 'merge would bring dark mode too.' },
  ],
};
