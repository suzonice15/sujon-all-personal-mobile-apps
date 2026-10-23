// Git chapter: Merging and Conflicts. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'merging',
  title: 'Merging & Conflicts',
  description: 'Fast-forward and three-way merges, --no-ff, and resolving merge conflicts',
  icon: 'merge-type',
  lessons: [
    {
      id: 'git-fast-forward',
      title: 'Fast-Forward Merges',
      blocks: [
        { type: 'text', value: 'If main has not moved since you created your branch, merging just slides the main label forward to your latest commit. No new commit is needed: a fast-forward.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "home" > index.html
git add .
git commit -m "Home page"
git switch -c feature/about
echo "about" > about.html
git add .
git commit -m "Add about page"
echo "team" >> about.html
git commit -am "Add team section"
git switch main
git merge feature/about
git log --oneline
git branch -d feature/about` },
      ],
    },
    {
      id: 'git-three-way',
      title: 'Three-Way Merges and Merge Commits',
      blocks: [
        { type: 'text', value: 'If both branches have new commits, Git combines them with a merge commit that has two parents. When the changes touch different files or different parts of a file, Git merges them automatically.' },
        { type: 'code', lang: 'text', value: String.raw`  A ── B ── C ──────── M   main      (M = merge commit, parents C and E)
        \             /
         D ──────── E        feature` },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "header" > page.html
git add .
git commit -m "Base page"
git switch -c feature/footer
echo "footer" > footer.html
git add .
git commit -m "Add footer"
git switch main
echo "nav" > nav.html
git add .
git commit -m "Add navigation"
git merge feature/footer
git log --oneline
git log -n 1
ls` },
        { type: 'note', value: 'git merge --no-ff feature always creates a merge commit, even when a fast-forward is possible. Many teams use it (GitHub\'s default "Create a merge commit") so each feature appears as one unit in the history.' },
      ],
    },
    {
      id: 'git-conflicts',
      title: 'Resolving Merge Conflicts',
      blocks: [
        { type: 'text', value: 'A conflict happens when both branches changed the same lines. Git stops, marks the file, and lets you decide. It is normal and not dangerous: nothing is lost.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "Welcome to our shop" > banner.txt
git add .
git commit -m "Add banner"
git switch -c sale
echo "Big sale: 50% off!" > banner.txt
git commit -am "Sale banner"
git switch main
echo "Free delivery in Dhaka" > banner.txt
git commit -am "Delivery banner"
git merge sale
git status
cat banner.txt
# Resolve: edit the file to the final text (remove the markers)
echo "Big sale: 50% off! Free delivery in Dhaka" > banner.txt
git add banner.txt
git status
git commit -m "Merge sale banner with delivery message"
git log --oneline` },
        { type: 'list', items: [
          '<<<<<<< marks the start of your side (the branch you are on), ======= separates, >>>>>>> ends their side.',
          'Edit the file to the correct final content and delete all three marker lines.',
          'git add the file to mark it resolved, then git commit to finish the merge.',
          'Changed your mind? git merge --abort returns to the state before the merge.',
          'VS Code shows "Accept Current / Incoming / Both" buttons above each conflict.',
        ] },
      ],
    },
    {
      id: 'git-merge-abort',
      title: 'Aborting a Merge and Avoiding Conflicts',
      blocks: [
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "price = 100" > config.txt
git add .
git commit -m "Price 100"
git switch -c a
echo "price = 120" > config.txt
git commit -am "Raise price"
git switch main
echo "price = 90" > config.txt
git commit -am "Lower price"
git merge a
git merge --abort
git status
cat config.txt` },
        { type: 'list', items: [
          'Merge main into your branch often (or rebase) so differences stay small.',
          'Keep branches short-lived: days, not weeks.',
          'Agree on formatting (Prettier, Black, Ruff) so whitespace changes do not conflict.',
          'Split big files and avoid many people editing the same file at the same time.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'merging', q: 'When does Git do a fast-forward merge?', options: ['Always', 'When the target branch has no new commits since the feature branched off', 'When there are conflicts', 'Only with --no-ff'], answer: 1, explain: 'The branch label simply moves forward.' },
    { chapterId: 'merging', q: 'How many parents does a merge commit have?', options: ['0', '1', '2 (or more)', 'It has no parents'], answer: 2, explain: 'One for each merged branch.' },
    { chapterId: 'merging', q: 'What causes a merge conflict?', options: ['Merging too many files', 'Both branches changed the same lines', 'A missing commit message', 'Using --no-ff'], answer: 1, explain: 'Git cannot decide which version is right.' },
    { chapterId: 'merging', q: 'After editing a conflicted file, what do you do?', options: ['git push', 'git add the file, then git commit', 'git merge again', 'Delete the branch'], answer: 1, explain: 'git add marks the conflict as resolved.' },
    { chapterId: 'merging', q: 'How do you cancel a merge in progress?', options: ['git merge --abort', 'git cancel', 'git reset --soft', 'Close the terminal'], answer: 0, explain: 'It restores the state before the merge started.' },
  ],
};
