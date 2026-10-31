// Git chapter: How Git Works Inside. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'internals',
  title: 'How Git Works Inside',
  description: 'Blobs, trees, commits, refs, the .git folder and why hashes change',
  icon: 'memory',
  lessons: [
    {
      id: 'git-objects',
      title: 'Objects: Blobs, Trees and Commits',
      blocks: [
        { type: 'text', value: 'Git is a content-addressed database. Every piece of data is an object stored under the SHA-1 hash of its content. Understanding the three main object types explains everything else Git does.' },
        { type: 'list', items: [
          'Blob: the content of one file (no name, just bytes). Two identical files share one blob.',
          'Tree: a directory listing: names, file modes and the hashes of blobs and sub-trees.',
          'Commit: a pointer to one root tree (the full snapshot), the parent commit(s), author, committer, date and message.',
          'Annotated tag: a named pointer to a commit, with tagger and message.',
          'Git stores snapshots, not differences; it compresses similar objects into pack files to save space.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`$ git cat-file -p HEAD                  # a commit object
tree 8f3a2b91c0d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8
parent 4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c
author Nadia <nadia@example.com> 1773115260 +0600
committer Nadia <nadia@example.com> 1773115260 +0600

Add checkout page

$ git cat-file -p 8f3a2b9                # its tree
100644 blob 2e65efe2a145dda7ee51d1741299f848e5bf752e    index.html
040000 tree 61a1b4c1d8e9f0a2b3c4d5e6f7a8b9c0d1e2f3a4    src

$ git cat-file -p 2e65efe                # a blob: just the file content
<h1>CodeNest</h1>` },
      ],
    },
    {
      id: 'git-refs-head',
      title: 'Refs, HEAD and the .git Folder',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`.git/
├── HEAD                    ref: refs/heads/main   (which branch you are on)
├── config                  repository settings and remotes
├── index                   the staging area (binary)
├── objects/                all blobs, trees, commits, tags (zlib-compressed)
├── refs/
│   ├── heads/main          a 40-character commit hash: THAT is a branch
│   ├── remotes/origin/main
│   └── tags/v1.0.0
└── logs/                   the reflog` },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "hello" > a.txt
git add .
git commit -m "First"
git branch feature
# A branch file just stores a commit hash; HEAD stores which branch you are on
cat .git/HEAD
cat .git/refs/heads/main
cat .git/refs/heads/feature
git switch feature
cat .git/HEAD
git log --oneline` },
        { type: 'note', value: 'Detached HEAD means HEAD points straight at a commit instead of a branch (for example after git switch --detach v1.0.0). New commits there belong to no branch: create one with git switch -c name before leaving, or they are only reachable through the reflog.' },
      ],
    },
    {
      id: 'git-why-hashes',
      title: 'Why Hashes Change and History Is Safe',
      blocks: [
        { type: 'list', items: [
          'A commit hash depends on its tree, parents, author, date and message. Change anything and you get a different hash.',
          'Because each commit contains its parent\'s hash, changing an old commit changes every commit after it. That is why rebase and amend create new commits, and why history is tamper-evident.',
          'Two commits with the same hash have the same content and the same full history behind them.',
          'Git is moving from SHA-1 to SHA-256 for stronger security; most hosting still uses SHA-1 today.',
        ] },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "base" > base.txt
git add .
git commit -m "Base"
echo "same content" > file.txt
git add .
git commit -m "Message A"
git log --oneline
# Undo that commit but keep the staged files, then commit the SAME snapshot again
git reset --soft HEAD~1
git commit -m "Message B"
# Same files, same parent, different message -> a different hash
git log --oneline` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'internals', q: 'What does a blob store?', options: ['A file name', 'The content of a file', 'A commit message', 'A branch'], answer: 1, explain: 'Names live in tree objects.' },
    { chapterId: 'internals', q: 'What is a branch, internally?', options: ['A folder copy', 'A small file containing a commit hash', 'A tree object', 'A tag'], answer: 1, explain: '.git/refs/heads/<name> holds the hash.' },
    { chapterId: 'internals', q: 'What does .git/HEAD usually contain?', options: ['The latest commit message', 'ref: refs/heads/<current branch>', 'The remote URL', 'All file contents'], answer: 1, explain: 'In detached HEAD it contains a commit hash instead.' },
    { chapterId: 'internals', q: 'Why does amending a commit change its hash?', options: ['Git adds a random number', 'The hash is computed from the content, including message and date', 'Hashes change every day', 'It does not'], answer: 1, explain: 'Different content, different hash.' },
    { chapterId: 'internals', q: 'Does Git store diffs or snapshots?', options: ['Only diffs', 'Snapshots (compressed with delta packing)', 'Neither', 'Only the latest file'], answer: 1, explain: 'Each commit points to a full tree.' },
  ],
};
