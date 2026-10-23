// Git interview questions, grouped by chapter id (see src/courses/index.js).
// Questions with tryIt: true open their commands in the Git playground.

export default {
  'getting-started': [
    { level: 'basic', q: 'What is Git and why is it used?', a: 'Git is a distributed version control system. It records the history of changes, lets several people work in parallel on branches, makes it easy to review and merge work, and lets you go back to any earlier version.' },
    { level: 'basic', q: 'What is the difference between Git and GitHub?', a: 'Git is the tool that tracks history on your computer. GitHub (like GitLab and Bitbucket) hosts Git repositories online and adds collaboration features: pull requests, code review, issues, Actions CI/CD and permissions.' },
    { level: 'intermediate', q: 'What does "distributed" mean for Git?', a: 'Every clone contains the complete history, so developers can commit, branch and view history offline, and any clone can restore a lost server. Centralised systems like SVN keep history only on the server.' },
  ],
  basics: [
    { level: 'basic', q: 'Explain working tree, staging area and repository.', a: 'The working tree is your editable files; the staging area (index) holds the snapshot chosen for the next commit (git add); the repository (.git) stores committed history (git commit).' },
    { level: 'basic', q: 'What makes a good commit?', a: 'One logical change, a clear imperative subject line under ~50 characters, a body explaining why when needed, and code that builds and passes tests.' },
    { level: 'intermediate', q: 'How do you stage only part of a file?', a: 'git add -p (patch mode) lets you pick individual hunks to stage, so unrelated changes in the same file go into separate commits.' },
  ],
  history: [
    { level: 'basic', q: 'How do you see the history of a project?', a: 'git log, with options such as --oneline, --graph --all, -p (with diffs), --author, --since and --grep; git show <commit> for one commit.' },
    { level: 'intermediate', q: 'What is the difference between git diff and git diff --staged?', a: 'git diff compares the working tree with the staging area (unstaged changes). git diff --staged (or --cached) compares the staging area with the last commit (what will be committed).', code: String.raw`git init
echo "a" > f.txt
git add .
git commit -m "a"
echo "b" >> f.txt
git add f.txt
echo "c" >> f.txt
git diff
git diff --staged`, lang: 'git', tryIt: true },
    { level: 'advanced', q: 'How do you find who introduced a line and why?', a: 'git blame <file> shows the commit for each line; git show <hash> shows that commit\'s message and diff; git log -S "text" finds commits that added or removed a string.' },
  ],
  branches: [
    { level: 'basic', q: 'What is a branch in Git?', a: 'A lightweight movable pointer to a commit (a file in .git/refs/heads containing a hash). Creating and switching branches is instant, which encourages one branch per feature or fix.' },
    { level: 'intermediate', q: 'What is HEAD?', a: 'A reference to the current position: usually the current branch (ref: refs/heads/main), which in turn points to its latest commit. In detached HEAD it points directly to a commit.' },
    { level: 'intermediate', q: 'git switch vs git checkout?', a: 'git checkout does many things (switch branches, restore files, detach HEAD). Git 2.23 split it into git switch (branches) and git restore (files) to be clearer and safer. Both still work.' },
  ],
  merging: [
    { level: 'basic', q: 'What is a fast-forward merge?', a: 'When the target branch has no new commits since the feature branched off, Git simply moves the target pointer forward to the feature\'s commit; no merge commit is created.' },
    { level: 'intermediate', q: 'What is a merge conflict and how do you resolve it?', a: 'It happens when both branches change the same lines. Git marks the file with <<<<<<<, =======, >>>>>>>; you edit it to the correct content, remove the markers, git add, and git commit. git merge --abort cancels.', code: String.raw`git init
echo "x = 1" > a.txt
git add .
git commit -m "x 1"
git switch -c other
echo "x = 2" > a.txt
git commit -am "x 2"
git switch main
echo "x = 3" > a.txt
git commit -am "x 3"
git merge other
cat a.txt`, lang: 'git', tryIt: true },
    { level: 'advanced', q: 'Why might a team use --no-ff merges?', a: 'They always create a merge commit, so each feature is grouped in history and can be reverted as one unit with git revert -m 1 <merge>, even when a fast-forward was possible.' },
  ],
  undo: [
    { level: 'basic', q: 'How do you discard local changes to a file?', a: 'git restore <file> (older: git checkout -- <file>). To unstage: git restore --staged <file>. Discarded uncommitted changes cannot be recovered.' },
    { level: 'intermediate', q: 'Explain git reset --soft, --mixed and --hard.', a: 'All move the current branch to the given commit. --soft keeps the undone changes staged, --mixed (default) keeps them in the working tree unstaged, --hard deletes them from the working tree too.' },
    { level: 'intermediate', q: 'When do you use revert instead of reset?', a: 'When the commits are already pushed or shared. revert adds a new inverse commit and keeps history intact; reset rewrites history and would break other people\'s clones.' },
    { level: 'advanced', q: 'How do you recover a commit after reset --hard?', a: 'git reflog lists every position HEAD has been at; find the hash and run git reset --hard <hash> or git branch rescue <hash>. Unreachable commits are kept for about 90 days by default.' },
  ],
  'ignore-tags': [
    { level: 'basic', q: 'What is .gitignore?', a: 'A file listing patterns of files Git should not track, such as dependencies, build output, logs and secrets. It does not affect files that are already tracked; untrack them with git rm --cached.' },
    { level: 'intermediate', q: 'Lightweight vs annotated tags?', a: 'A lightweight tag is just a name for a commit. An annotated tag (git tag -a) is a full object with tagger, date and message, can be signed, and is recommended for releases.' },
  ],
  remotes: [
    { level: 'basic', q: 'What does git clone do?', a: 'It copies a remote repository with its full history, creates remote-tracking branches (origin/*) and checks out the default branch.' },
    { level: 'intermediate', q: 'git fetch vs git pull?', a: 'fetch downloads new commits into origin/* without changing your branches; pull = fetch + merge (or rebase with --rebase) into your current branch.' },
    { level: 'intermediate', q: 'Why is git push --force dangerous and what is safer?', a: 'It overwrites the remote branch and can delete other people\'s commits. --force-with-lease refuses if the remote has commits you have not seen. Never force-push shared branches.' },
  ],
  collaboration: [
    { level: 'basic', q: 'What is a pull request?', a: 'A request to merge a branch, with a place for discussion, code review, and automated checks before the change lands in the target branch.' },
    { level: 'intermediate', q: 'What do you look for when reviewing code?', a: 'Correctness and edge cases, security, tests, readability and naming, consistency with the codebase, and performance where it matters. Be kind and specific, and separate blocking issues from nits.' },
    { level: 'intermediate', q: 'What is a fork?', a: 'Your own copy of someone else\'s repository on GitHub. You push to your fork and open a pull request to the original (upstream). Used for open-source contributions.' },
  ],
  rebase: [
    { level: 'intermediate', q: 'What does git rebase do?', a: 'It replays your commits on top of another base commit, producing new commits and a linear history. Conflicts are resolved commit by commit with git rebase --continue.' },
    { level: 'advanced', q: 'What is interactive rebase used for?', a: 'git rebase -i lets you reorder, squash, fixup, reword, edit or drop commits to clean up a branch before review or merge.' },
    { level: 'advanced', q: 'What is cherry-pick?', a: 'git cherry-pick <commit> applies the changes of a specific commit onto the current branch as a new commit, e.g. backporting a fix to a release branch.' },
  ],
  workflows: [
    { level: 'intermediate', q: 'Describe GitHub Flow.', a: 'main is always deployable; each change goes on a short-lived branch, opened as a pull request with CI checks and review, merged into main, and deployed. Branches are deleted after merging.' },
    { level: 'advanced', q: 'Git Flow vs trunk-based development?', a: 'Git Flow uses develop, feature, release and hotfix branches for planned versioned releases. Trunk-based development has everyone integrating small changes into main daily, using feature flags and strong automated testing; it enables continuous delivery.' },
    { level: 'intermediate', q: 'What are Conventional Commits?', a: 'A message convention (feat:, fix:, docs:, refactor:, BREAKING CHANGE) that makes history readable and lets tools generate changelogs and semantic version numbers automatically.' },
  ],
  actions: [
    { level: 'basic', q: 'What is CI/CD?', a: 'Continuous Integration builds and tests every change automatically; Continuous Delivery/Deployment automatically releases changes that pass. GitHub Actions, GitLab CI and Jenkins are common tools.' },
    { level: 'intermediate', q: 'How do you keep secrets safe in GitHub Actions?', a: 'Store them as repository or environment secrets and reference them with ${{ secrets.NAME }}; never write them in workflow files or logs. Limit permissions with the permissions: key and use environments with reviewers for production.' },
  ],
  internals: [
    { level: 'advanced', q: 'What are Git\'s object types?', a: 'Blob (file content), tree (directory of names pointing to blobs and trees), commit (tree + parents + author + message) and annotated tag. All are stored by the hash of their content.' },
    { level: 'advanced', q: 'Why does changing an old commit change every later commit hash?', a: 'Each commit includes its parent\'s hash in its own content. Changing a commit changes its hash, so every descendant changes too. This makes history tamper-evident.' },
  ],
  'best-practices': [
    { level: 'intermediate', q: 'What do you do if a secret is pushed to GitHub?', a: 'Revoke and rotate it immediately, then remove it from all history with git filter-repo or BFG, force-push, notify the team to re-clone, and enable secret scanning and push protection to prevent repeats.' },
    { level: 'intermediate', q: 'How do you handle large binary files?', a: 'Avoid committing them; build artifacts in CI and attach them to releases. For assets that must be versioned, use Git LFS. Use shallow or partial clones for very large repositories.' },
  ],
  projects: [
    { level: 'intermediate', q: 'You committed to the wrong branch. How do you fix it?', a: 'If not pushed: create the correct branch at the current commit (git branch feature/x), then move the wrong branch back (git reset --hard HEAD~1) and switch to the new branch. If pushed, cherry-pick to the right branch and revert on the wrong one.' },
  ],
  config: [
    { level: 'intermediate', q: 'A pull request shows every line of a file as changed, but only one line was edited. Why, and how do you prevent it?', a: 'Usually line endings (CRLF vs LF) or file mode changes. Commit a .gitattributes file such as "* text=auto eol=lf", run git add --renormalize . once, and configure editors to use LF. git diff --stat and git diff --ignore-all-space help confirm the cause.' },
    { level: 'intermediate', q: 'How do you make sure work commits use your company email?', a: 'Use a conditional include in ~/.gitconfig: [includeIf "gitdir:~/work/"] path = ~/.gitconfig-work, where that file sets user.email (and signing key). Every repository under ~/work/ then uses the work identity automatically.' },
  ],
  'power-tools': [
    { level: 'advanced', q: 'How do you revert a merge commit, and what is the catch?', a: 'git revert -m 1 <merge> undoes the changes the merge brought in, keeping parent 1 (the mainline). The catch: Git still considers the branch merged, so merging it again brings nothing. To restore the feature, revert the revert commit.' },
    { level: 'advanced', q: 'Submodules vs subtrees: when would you use each?', a: 'Submodules pin another repo at an exact commit and keep histories separate; good for large independently released components, but everyone must clone with --recurse-submodules and run submodule update. Subtrees copy the code in, simple for consumers but harder to push changes upstream. Often a package manager is the better choice.' },
    { level: 'advanced', q: 'When would you use git worktree?', a: 'To work on two branches at the same time without stashing or cloning again, for example reviewing a PR or making a hotfix while a feature is half done. Each worktree is a separate folder sharing the same object database.' },
  ],
  troubleshooting: [
    { level: 'intermediate', q: 'git push is rejected as non-fast-forward. What do you do?', a: 'Someone pushed first. Run git pull --rebase (or fetch and merge), resolve any conflicts, run the tests, then push. Do not force-push a shared branch; if you must update your own rewritten branch, use --force-with-lease.' },
    { level: 'intermediate', q: 'What does "refusing to merge unrelated histories" mean?', a: 'The two branches have no common commit, typically because the GitHub repo was created with a README while the local repo has its own first commit. If combining them is intended, use git pull origin main --allow-unrelated-histories and resolve conflicts.' },
  ],
  challenges: [
    { level: 'intermediate', q: 'How do you copy one bug fix from main to a release branch without other features?', a: 'Switch to the release branch and git cherry-pick <fix-commit> (with -x to record the source). Run the tests, then tag the patch release, for example v1.0.1.' },
  ],
  interview: [
    { level: 'intermediate', q: 'Describe how your team uses Git day to day.', a: 'Explain your branch naming, how you keep branches up to date, PR size and review rules, required CI checks, merge strategy (squash, merge or rebase), how releases are tagged, and how hotfixes are handled.' },
  ],
};
