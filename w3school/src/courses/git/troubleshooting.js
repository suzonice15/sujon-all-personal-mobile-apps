// Git chapter: Troubleshooting. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'troubleshooting',
  title: 'Troubleshooting Common Errors',
  description: 'The error messages you will meet in real projects, what they mean and how to fix them',
  icon: 'healing',
  lessons: [
    {
      id: 'git-errors-local',
      title: 'Local Errors',
      blocks: [
        { type: 'code', lang: 'git', tryIt: true, expectErrors: true, value: String.raw`# Each command below fails on purpose. Read the message, then the fix in the lesson.
git status
git init
git commit -m "nothing yet"
echo "a" > a.txt
git add a.txt
git commit -m "First"
git switch does-not-exist
git branch -d main
git add missing.txt
git log HEAD~5` },
        { type: 'list', items: [
          '"fatal: not a git repository": you are in the wrong folder (cd into the project) or forgot git init.',
          '"nothing to commit": you did not stage anything; run git add first, or there are no changes.',
          '"invalid reference" / "unknown revision": the branch, tag or HEAD~n does not exist; check git branch -a and git log --oneline.',
          '"Cannot delete branch checked out": switch to another branch first.',
          '"pathspec did not match any files": a typo in the file name, or you are in a different folder than you think.',
          '"Your local changes would be overwritten by checkout": commit, stash or restore your changes before switching.',
        ] },
      ],
    },
    {
      id: 'git-errors-remote',
      title: 'Remote and Authentication Errors',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`$ git push
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
# Fix: your SSH key is not added to GitHub (ssh -T git@github.com to test), or the
# remote uses SSH but you only set up HTTPS. Check: git remote -v

$ git push https://github.com/codenest/shop.git
remote: Support for password authentication was removed.
# Fix: use a personal access token or the GitHub CLI (gh auth login) instead of your password.

$ git push
 ! [rejected]        main -> main (non-fast-forward)
# Fix: git pull --rebase, resolve any conflicts, then git push. Never --force on shared branches.

$ git pull
fatal: Need to specify how to reconcile divergent branches.
# Fix (choose once): git config --global pull.rebase true   (or false for merge)

$ git pull origin main
fatal: refusing to merge unrelated histories
# Happens when the GitHub repo was created WITH a README and your local repo has its own first commit.
# Fix: git pull origin main --allow-unrelated-histories, resolve, commit.

$ git push
fatal: The current branch feature/x has no upstream branch.
# Fix: git push -u origin feature/x   (or set push.autoSetupRemote = true)` },
      ],
    },
    {
      id: 'git-errors-situations',
      title: 'Confusing Situations',
      blocks: [
        { type: 'list', items: [
          '"You are in detached HEAD state": you checked out a tag or commit. To keep new work: git switch -c new-branch. To leave: git switch main.',
          '"warning: LF will be replaced by CRLF": line-ending conversion on Windows. Add a .gitattributes file (Configuration chapter).',
          'A huge file was rejected ("exceeds GitHub\'s file size limit of 100 MB"): remove it from history (git filter-repo) and use Git LFS or an external storage.',
          'Every line of a file shows as changed: line endings or file mode changed (git diff --stat shows the scope; git config core.fileMode false on Windows if only modes differ).',
          'A file keeps coming back after .gitignore: it is still tracked; git rm --cached it.',
          '"index.lock: File exists": another Git process is running or crashed. If none is running, delete .git/index.lock.',
          'Merge conflicts in package-lock.json or composer.lock: accept one side, then regenerate with npm install / composer update and commit the result.',
        ] },
        { type: 'note', value: 'When stuck: read the full error message (Git usually suggests the fix in a "hint:" line), run git status, then git log --oneline --graph --all to see where you are. Nothing committed is lost: git reflog remembers.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'troubleshooting', q: 'You see "Permission denied (publickey)" on push. What is the likely cause?', options: ['The repository is empty', 'Your SSH key is not set up with GitHub', 'You have uncommitted changes', 'The branch is protected'], answer: 1, explain: 'Test with ssh -T git@github.com.' },
    { chapterId: 'troubleshooting', q: 'What does "refusing to merge unrelated histories" usually mean?', options: ['A merge conflict', 'The remote and local repos started with different first commits', 'You are offline', 'A typo in the branch name'], answer: 1, explain: 'Often a README created on GitHub; use --allow-unrelated-histories.' },
    { chapterId: 'troubleshooting', q: 'How do you keep work done in detached HEAD?', options: ['git stash only', 'git switch -c new-branch before leaving', 'git push --force', 'It cannot be kept'], answer: 1, explain: 'A branch gives the commits a name.' },
    { chapterId: 'troubleshooting', q: 'Push says "no upstream branch". What fixes it?', options: ['git push -u origin <branch>', 'git init', 'git pull --force', 'Delete the branch'], answer: 0, explain: '-u links the local branch to the remote one.' },
    { chapterId: 'troubleshooting', q: 'Where does Git usually suggest the fix for an error?', options: ['Nowhere', 'In the hint: lines of the message', 'On GitHub only', 'In the commit log'], answer: 1, explain: 'Read the whole message before searching the web.' },
  ],
};
