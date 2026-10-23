// Git chapter: Basics. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'basics',
  title: 'Your First Repository',
  description: 'init, status, add, commit, staging part of your changes and good commit messages',
  icon: 'folder-special',
  lessons: [
    {
      id: 'git-init-commit',
      title: 'init, add, commit',
      blocks: [
        { type: 'text', value: 'git init turns the current folder into a repository (it creates a hidden .git folder). Then the everyday loop is: edit files, check with git status, stage with git add, save with git commit.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "<h1>CodeNest</h1>" > index.html
echo "body { margin: 0; }" > style.css
git status
git add index.html style.css
git status
git commit -m "Add home page and styles"
git log` },
        { type: 'note', value: 'git add . stages everything in the current folder (new, changed and deleted files). It is convenient, but check git status first so you do not commit something by accident.' },
      ],
    },
    {
      id: 'git-staging-partial',
      title: 'Choosing What Goes Into a Commit',
      blocks: [
        { type: 'text', value: 'The staging area lets you split work into small, logical commits, even when you changed many files at once. Each commit should do one thing.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "Home" > index.html
echo "About" > about.html
git add .
git commit -m "Add pages"
# Two unrelated changes...
echo "Fix typo on home" >> index.html
echo "New contact page" > contact.html
git status -s
# ...become two separate commits
git add index.html
git commit -m "Fix typo on home page"
git add contact.html
git commit -m "Add contact page"
git log --oneline` },
        { type: 'code', lang: 'text', value: String.raw`# On a real computer you can even stage PART of a file, hunk by hunk:
$ git add -p index.html
@@ -1,3 +1,4 @@
 <h1>CodeNest</h1>
+<p>Learn to code</p>
Stage this hunk [y,n,q,a,d,s,e,?]? y` },
      ],
    },
    {
      id: 'git-commit-all-remove',
      title: 'commit -a, Deleting and Moving Files',
      blocks: [
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "v1" > notes.txt
echo "draft" > draft.txt
echo "old" > old-name.txt
git add .
git commit -m "Initial files"
# -a stages every change to TRACKED files (not new files)
echo "v2" >> notes.txt
git commit -am "Update notes"
# Delete and rename through git so it records the change
git rm draft.txt
git mv old-name.txt new-name.txt
git status
git commit -m "Remove draft, rename file"
ls` },
        { type: 'note', value: 'git rm --cached file stops tracking a file but keeps it on disk. That is how you fix "I accidentally committed my .env file" (then add it to .gitignore and change the secret).' },
      ],
    },
    {
      id: 'git-commit-messages',
      title: 'Writing Good Commit Messages',
      blocks: [
        { type: 'text', value: 'Your history is documentation for your future self and your team. A good message explains WHAT changed and WHY, not how.' },
        { type: 'list', items: [
          'Subject line: imperative mood, about 50 characters, no full stop: "Add password reset email", not "added stuff".',
          'Leave a blank line, then a body explaining why the change was needed, if it is not obvious.',
          'One logical change per commit: easier to review, revert and find bugs in.',
          'Many teams use Conventional Commits: feat:, fix:, docs:, refactor:, test:, chore: (Workflows chapter).',
        ] },
        { type: 'code', lang: 'text', value: String.raw`Bad:   "fix"   "changes"   "asdf"   "update files"   "final version"

Good:  Fix crash when cart is empty

       The checkout page divided by the number of items, which threw
       ZeroDivisionError for an empty cart. Show an "empty cart" message
       instead and add a test.

       Closes #142` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'basics', q: 'What does git init create?', options: ['A GitHub account', 'A hidden .git folder that stores the repository', 'A first commit', 'A branch called master on GitHub'], answer: 1, explain: 'The .git folder holds all history and settings.' },
    { chapterId: 'basics', q: 'Does git commit -am "msg" include brand-new files?', options: ['Yes', 'No, -a only stages changes to already tracked files', 'Only .txt files', 'Only if they are small'], answer: 1, explain: 'New files need git add first.' },
    { chapterId: 'basics', q: 'Why use the staging area instead of committing everything?', options: ['It is required', 'To group related changes into small, focused commits', 'To delete files', 'To make Git faster'], answer: 1, explain: 'Focused commits are easier to review and revert.' },
    { chapterId: 'basics', q: 'Which is the best commit subject line?', options: ['fixed stuff', 'Update', 'Fix crash when cart is empty', 'final final version'], answer: 2, explain: 'Imperative, specific, short.' },
    { chapterId: 'basics', q: 'How do you stop tracking a file but keep it on disk?', options: ['git rm file', 'git rm --cached file', 'git delete file', 'rm file'], answer: 1, explain: 'Then add it to .gitignore.' },
  ],
};
