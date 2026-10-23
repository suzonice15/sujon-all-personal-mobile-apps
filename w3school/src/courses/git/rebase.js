// Git chapter: Rebase and Advanced History. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Rebase and cherry-pick are not available in the Try it playground, so these show real output.

export default {
  id: 'rebase',
  title: 'Rebase, Cherry-pick & Clean History',
  description: 'Rebase vs merge, interactive rebase, squashing, cherry-pick and the golden rule',
  icon: 'low-priority',
  lessons: [
    {
      id: 'git-rebase-basics',
      title: 'Rebase vs Merge',
      blocks: [
        { type: 'text', value: 'Both integrate changes from one branch into another. merge keeps the real history with a merge commit. rebase replays your commits on top of the other branch, as if you had started from its latest commit, giving a straight line.' },
        { type: 'code', lang: 'text', value: String.raw`Before:            A ── B ── C ── D        main
                         \
                          E ── F            feature

git merge main:    A ── B ── C ── D ─────── M    (feature, merge commit M)
                         \               /
                          E ───────── F

git rebase main:   A ── B ── C ── D ── E' ── F'  (feature: new commits E', F')` },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "home" > index.html
git add .
git commit -m "Home page"
git switch -c feature/search
echo "search box" > search.html
git add .
git commit -m "Add search page"
echo "filters" >> search.html
git commit -am "Add search filters"
git switch main
echo "footer" > footer.html
git add .
git commit -m "Add footer"
git log --oneline --all
# Replay the feature commits on top of the new main
git switch feature/search
git rebase main
git log --oneline
# Now main can fast-forward: a straight line, no merge commit
git switch main
git merge feature/search
git log --oneline` },
        { type: 'code', lang: 'text', value: String.raw`$ git switch feature/search
$ git rebase main
Successfully rebased and updated refs/heads/feature/search.

# Conflict during a rebase: fix the file, then
$ git add search.py
$ git rebase --continue
# or give up and go back:
$ git rebase --abort` },
        { type: 'note', value: 'The golden rule of rebasing: never rebase commits that other people already have (pushed shared branches). Rebasing creates NEW commits (E\', F\'), so their copies and yours would diverge. Rebase your own local or personal feature branches only.' },
      ],
    },
    {
      id: 'git-interactive-rebase',
      title: 'Interactive Rebase: Squash, Reword, Reorder',
      blocks: [
        { type: 'text', value: 'git rebase -i lets you clean up your branch before opening a pull request: combine "wip" commits, fix messages, drop debug commits, reorder.' },
        { type: 'code', lang: 'text', value: String.raw`$ git log --oneline
c3d4e5f fix typo again
b2c3d4e wip
a1b2c3d Add search page
9f8e7d6 (main) Add product list

$ git rebase -i main          # Git opens your editor with:
pick a1b2c3d Add search page
pick b2c3d4e wip
pick c3d4e5f fix typo again

# Change it to:
pick   a1b2c3d Add search page
squash b2c3d4e wip                 # merge into the previous commit
fixup  c3d4e5f fix typo again      # like squash, but discard this message

# Other commands: reword (r) change message, edit (e) stop to amend, drop (d) delete

$ git log --oneline
7a8b9c0 Add search page
9f8e7d6 (main) Add product list

$ git push --force-with-lease      # needed because history changed (your own branch only!)` },
        { type: 'note', value: 'Many teams skip manual squashing and use GitHub\'s "Squash and merge" button, which turns the whole PR into one commit on main.' },
      ],
    },
    {
      id: 'git-cherry-pick',
      title: 'Cherry-pick',
      blocks: [
        { type: 'text', value: 'git cherry-pick copies one specific commit onto your current branch. Typical use: a bug fix landed on main and must also go to the release/1.x branch.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "price = 100" > invoice.py
echo "vat = 0.15" >> invoice.py
git add .
git commit -m "Invoice v1"
git tag v1.0
git branch release/1.0
echo "dark mode" > theme.py
git add .
git commit -m "Add dark mode"
echo "price = 100" > invoice.py
echo "vat = round(0.15, 2)" >> invoice.py
git commit -am "Fix VAT rounding on invoices"
git log --oneline
# The release branch needs the fix, but not dark mode
git switch release/1.0
git cherry-pick -x main
git log --oneline
ls
git log -n 1` },
        { type: 'code', lang: 'text', value: String.raw`$ git log --oneline main -3
e5f6a7b Fix VAT rounding on invoices
d4e5f6a Add dark mode
c3d4e5f Update README

$ git switch release/1.4
$ git cherry-pick e5f6a7b
[release/1.4 1a2b3c4] Fix VAT rounding on invoices
 Date: Tue Mar 10 14:22:05 2026 +0600
 1 file changed, 2 insertions(+), 1 deletion(-)

$ git cherry-pick -x e5f6a7b       # adds "(cherry picked from commit e5f6a7b...)" to the message` },
      ],
    },
    {
      id: 'git-merge-strategies',
      title: 'Merge, Squash or Rebase? Choosing a Team Policy',
      blocks: [
        { type: 'list', items: [
          'Create a merge commit: full history, every feature visible as a merge. History can look busy.',
          'Squash and merge: each PR becomes ONE commit on main. Clean, easy to revert a whole feature. Loses the individual commits.',
          'Rebase and merge: replays the PR commits onto main, linear history, keeps each commit. Requires clean commits.',
          'Most teams choose squash merge for application code. Agree on one policy and configure it in the repository settings.',
          'Whatever you choose: keep main always deployable and protected by required reviews and CI checks.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'rebase', q: 'What does git rebase main do on a feature branch?', options: ['Deletes main', 'Replays the feature commits on top of the latest main', 'Creates a merge commit', 'Pushes to main'], answer: 1, explain: 'The result is a linear history with new commit hashes.' },
    { chapterId: 'rebase', q: 'What is the golden rule of rebasing?', options: ['Always rebase main', 'Never rebase commits that others already have (shared, pushed branches)', 'Rebase only on Fridays', 'Never use merge'], answer: 1, explain: 'Rebasing rewrites commits.' },
    { chapterId: 'rebase', q: 'In interactive rebase, what does squash do?', options: ['Deletes a commit', 'Combines a commit with the previous one', 'Renames a branch', 'Splits a commit'], answer: 1, explain: 'fixup does the same but discards the message.' },
    { chapterId: 'rebase', q: 'What is git cherry-pick for?', options: ['Choosing a branch', 'Copying a specific commit onto the current branch', 'Deleting commits', 'Picking a remote'], answer: 1, explain: 'Common for backporting fixes to release branches.' },
    { chapterId: 'rebase', q: 'After rewriting your own pushed feature branch, which push is safest?', options: ['git push --force', 'git push --force-with-lease', 'git push --delete', 'git push --all'], answer: 1, explain: 'It refuses if someone else pushed in the meantime.' },
  ],
};
