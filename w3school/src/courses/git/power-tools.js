// Git chapter: Power Tools. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'power-tools',
  title: 'Power Tools',
  description: 'Worktrees, submodules vs subtrees, sparse checkout, reverting merges, splitting commits and rewriting history',
  icon: 'build',
  lessons: [
    {
      id: 'git-worktrees',
      title: 'Worktrees: Several Branches at Once',
      blocks: [
        { type: 'text', value: 'A worktree is a second folder attached to the same repository, checked out on another branch. Review a colleague\'s PR or fix a hotfix without stashing or disturbing your current work.' },
        { type: 'code', lang: 'text', value: String.raw`$ git worktree add ../shop-hotfix hotfix/payment-timeout
Preparing worktree (checking out 'hotfix/payment-timeout')
$ cd ../shop-hotfix          # a full working copy on that branch, sharing the same .git objects
$ git commit -am "Increase payment timeout to 30s" && git push

$ git worktree list
/home/nadia/shop          3f2a1b0 [feature/search]
/home/nadia/shop-hotfix   9c8d7e6 [hotfix/payment-timeout]

$ git worktree remove ../shop-hotfix` },
      ],
    },
    {
      id: 'git-submodules-subtrees',
      title: 'Submodules vs Subtrees',
      blocks: [
        { type: 'text', value: 'Sometimes a project needs another repository inside it (a shared design system, a vendored library). Git offers two approaches; both have trade-offs, and a package manager (npm, Composer, pip) is often the better answer.' },
        { type: 'code', lang: 'text', value: String.raw`# Submodule: a pointer to a specific commit of another repo
$ git submodule add git@github.com:codenest/ui-kit.git libs/ui-kit
$ git commit -m "Add ui-kit as a submodule"
$ git clone --recurse-submodules git@github.com:codenest/shop.git      # others must clone like this
$ git submodule update --remote libs/ui-kit                              # move to the latest ui-kit commit

# Subtree: copies the other repo's files (and optionally history) into a folder
$ git subtree add --prefix=libs/ui-kit git@github.com:codenest/ui-kit.git main --squash
$ git subtree pull --prefix=libs/ui-kit git@github.com:codenest/ui-kit.git main --squash` },
        { type: 'list', items: [
          'Submodules: exact version pinning and a separate history, but easy to forget git submodule update, and confusing for newcomers.',
          'Subtrees: simple for people who only use the code (it is just files), harder to contribute changes back.',
          'This is the same problem that broke our w3school folder inside the parent repository: a nested .git folder makes the parent store only a pointer (a "gitlink").',
        ] },
      ],
    },
    {
      id: 'git-revert-merge-split',
      title: 'Reverting a Merge and Splitting a Commit',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`# A merged feature broke production: revert the WHOLE merge commit.
# -m 1 means "keep parent 1 (main), undo what parent 2 (the feature) brought in"
$ git log --oneline -3
a9b8c7d (HEAD -> main) Merge pull request #57 from feature/password-reset
...
$ git revert -m 1 a9b8c7d
[main 4e5f6a7] Revert "Merge pull request #57 from feature/password-reset"

# Careful: to bring the feature back later, revert the revert (git revert 4e5f6a7);
# merging the branch again would bring in nothing, because Git thinks it is already merged.` },
        { type: 'code', lang: 'text', value: String.raw`# Split one big commit into two during an interactive rebase
$ git rebase -i HEAD~3                  # mark the big commit with "edit"
Stopped at 5c6d7e8... Add cart and fix header
$ git reset HEAD~1                      # undo that commit, keep its changes unstaged
$ git add cart.py && git commit -m "Add cart"
$ git add header.html && git commit -m "Fix header alignment"
$ git rebase --continue` },
      ],
    },
    {
      id: 'git-rewrite-history',
      title: 'Rewriting History Safely: filter-repo',
      blocks: [
        { type: 'text', value: 'To remove a file from EVERY commit (a leaked secret, a 2 GB video) use git filter-repo (recommended) or BFG. This rewrites all commit hashes, so coordinate with the team: everyone must re-clone.' },
        { type: 'code', lang: 'text', value: String.raw`$ pip install git-filter-repo
$ git clone --mirror git@github.com:codenest/shop.git && cd shop.git

$ git filter-repo --path .env --invert-paths                 # delete .env from all history
$ git filter-repo --replace-text <(echo "sk_live_51H...==>REMOVED")   # scrub a key everywhere
$ git filter-repo --strip-blobs-bigger-than 50M              # remove huge files

$ git push --force --mirror
# Then: rotate the leaked secret anyway, and ask GitHub support to clear cached views if needed.` },
        { type: 'note', value: 'Rewriting history does NOT make a leaked secret safe: it may already be copied. Rotate it first; clean the history second.' },
      ],
    },
    {
      id: 'git-big-repos',
      title: 'Working with Very Large Repositories',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`$ git clone --depth 1 https://github.com/torvalds/linux.git      # shallow: only the latest commit
$ git clone --filter=blob:none https://github.com/org/huge.git   # partial: file contents on demand

$ git sparse-checkout init --cone            # in a monorepo, check out only what you work on
$ git sparse-checkout set apps/mobile packages/ui

$ git maintenance start                      # background gc, commit-graph and prefetch for speed` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'power-tools', q: 'What does git worktree add do?', options: ['Clones a new repository', 'Creates another working folder of the same repo, on another branch', 'Adds a submodule', 'Creates a tag'], answer: 1, explain: 'No need to stash to work on two branches at once.' },
    { chapterId: 'power-tools', q: 'What does a submodule store in the parent repository?', options: ['All files of the other repo', 'A pointer to a specific commit of the other repo', 'Nothing', 'A zip file'], answer: 1, explain: 'Clone with --recurse-submodules to get its files.' },
    { chapterId: 'power-tools', q: 'How do you revert a merge commit?', options: ['git revert <merge>', 'git revert -m 1 <merge>', 'git reset --merge', 'It cannot be reverted'], answer: 1, explain: '-m chooses the parent to keep (1 = the mainline).' },
    { chapterId: 'power-tools', q: 'Which tool removes a file from all commits in history?', options: ['git rm', 'git filter-repo', 'git stash', 'git clean'], answer: 1, explain: 'It rewrites every commit; coordinate with your team.' },
    { chapterId: 'power-tools', q: 'What does git clone --depth 1 give you?', options: ['The full history', 'Only the most recent commit (a shallow clone)', 'Only one branch name', 'An empty repo'], answer: 1, explain: 'Fast for CI and huge repositories.' },
  ],
};
