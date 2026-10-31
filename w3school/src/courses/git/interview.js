// Git chapter: Interview Preparation. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'interview',
  title: 'Interview Preparation',
  description: 'The Git and GitHub questions employers ask most, with answers',
  icon: 'work',
  lessons: [
    {
      id: 'git-interview-core',
      title: 'Top Questions',
      blocks: [
        { type: 'heading', value: '1. git merge vs git rebase' },
        { type: 'text', value: 'Both integrate changes. merge keeps the true history and adds a merge commit; rebase replays your commits on top of another branch for a linear history but rewrites commits. Rebase local/personal branches; merge (or squash-merge) shared ones.' },
        { type: 'heading', value: '2. git fetch vs git pull' },
        { type: 'text', value: 'fetch downloads new commits into remote-tracking branches without changing your work. pull = fetch + merge (or rebase) into the current branch.' },
        { type: 'heading', value: '3. reset vs revert' },
        { type: 'text', value: 'reset moves the branch pointer back (soft keeps changes staged, mixed unstaged, hard deletes them) and rewrites history. revert adds a new commit that undoes an old one; it is safe on shared branches.' },
        { type: 'heading', value: '4. What is the staging area?' },
        { type: 'text', value: 'The index: a snapshot of what will go into the next commit. It lets you build focused commits from a messy working tree.' },
        { type: 'heading', value: '5. How do you resolve a merge conflict?' },
        { type: 'text', value: 'Open the files with conflict markers, edit them to the correct final content, remove the markers, git add the files, then git commit (or git merge --abort to cancel). Run the tests before committing.' },
        { type: 'heading', value: '6. What is a detached HEAD?' },
        { type: 'text', value: 'HEAD points directly at a commit instead of a branch, e.g. after checking out a tag. New commits there belong to no branch; create one with git switch -c to keep them.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`# Show the difference between reset and revert in one run
git init
echo "1" > f.txt
git add .
git commit -m "One"
echo "2" >> f.txt
git commit -am "Two"
git revert HEAD
git log --oneline
git reset --hard HEAD~2
git log --oneline` },
      ],
    },
    {
      id: 'git-interview-scenarios',
      title: 'Scenario Questions',
      blocks: [
        { type: 'list', items: [
          '"You pushed a commit with a password." Revoke and rotate the secret first, then rewrite history with git filter-repo or BFG, force-push, and ask collaborators to re-clone. Enable secret scanning.',
          '"Your PR has conflicts with main." Update your branch (merge main into it, or rebase onto main), resolve conflicts locally, run tests, push.',
          '"Find which commit introduced a bug." git bisect with a good and a bad commit, ideally git bisect run with a test.',
          '"Combine your 8 messy commits into one before review." git rebase -i main and squash/fixup, or use Squash and merge.',
          '"You need one fix from main on the release branch." git cherry-pick <hash> onto release/x.',
          '"Someone force-pushed and your commits vanished from the remote." Your local clone and reflog still have them; push them back and protect the branch.',
          '"How does your team use Git?" Describe the workflow: branches, PRs with review, CI checks, merge strategy, releases and tags.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'interview', q: 'Which is safe for undoing a commit on a shared branch?', options: ['git reset --hard', 'git revert', 'git rebase -i', 'git commit --amend'], answer: 1, explain: 'It adds a new commit instead of rewriting history.' },
    { chapterId: 'interview', q: 'What does git pull do?', options: ['Only downloads', 'fetch + merge (or rebase) into the current branch', 'Uploads commits', 'Deletes remote branches'], answer: 1, explain: 'fetch alone never changes your branch.' },
    { chapterId: 'interview', q: 'Which tool finds the commit that introduced a bug?', options: ['git blame', 'git bisect', 'git stash', 'git tag'], answer: 1, explain: 'Binary search through history.' },
    { chapterId: 'interview', q: 'Rebasing creates new commits. What does this mean for shared branches?', options: ['Nothing', 'Others\' copies diverge, so do not rebase shared branches', 'Commits get smaller', 'Tags are deleted'], answer: 1, explain: 'The golden rule of rebasing.' },
  ],
};
