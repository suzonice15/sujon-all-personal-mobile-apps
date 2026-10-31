// Git chapter: .gitignore and Tags. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'ignore-tags',
  title: '.gitignore, Tags & Releases',
  description: 'Ignoring files, never committing secrets, tags and semantic versioning',
  icon: 'label',
  lessons: [
    {
      id: 'git-gitignore',
      title: '.gitignore',
      blocks: [
        { type: 'text', value: 'A .gitignore file lists files Git should not track: dependencies, build output, logs, editor files and, above all, secrets. Commit the .gitignore itself so the whole team shares it.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore
echo "dist/" >> .gitignore
mkdir node_modules
echo "library code" > node_modules/lib.js
echo "DB_PASSWORD=secret" > .env
echo "debug output" > server.log
echo "console.log('hi')" > app.js
git status
git add .
git ls-files
git commit -m "Initial commit with .gitignore"` },
        { type: 'code', lang: 'text', value: String.raw`# Pattern cheat sheet
*.log            all .log files in any folder
/build           only the build folder at the project root
docs/*.pdf       pdf files directly inside docs/
**/temp          a temp folder at any depth
!important.log   exception: DO track this file
.env*            .env, .env.local, .env.production...

# Ready-made templates: github.com/github/gitignore (Node, Python, Laravel, Android...)` },
        { type: 'note', value: '.gitignore only affects untracked files. If a file is already committed, run git rm --cached <file>, then commit. If it was a secret, consider it leaked: change the password or key immediately.' },
      ],
    },
    {
      id: 'git-tags',
      title: 'Tags',
      blocks: [
        { type: 'text', value: 'A tag is a permanent name for a specific commit, usually a release (v1.0.0). Unlike a branch, a tag does not move. Annotated tags (-a) also store who tagged, when, and a message; use them for releases.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "v1 features" > app.txt
git add .
git commit -m "First release"
git tag -a v1.0.0 -m "Version 1.0.0"
echo "bug fix" >> app.txt
git commit -am "Fix login bug"
git tag -a v1.0.1 -m "Patch release"
echo "new feature" >> app.txt
git commit -am "Add dark mode"
git tag
git log --oneline
git show v1.0.0
git diff v1.0.0 v1.0.1` },
        { type: 'code', lang: 'text', value: String.raw`$ git push origin v1.0.1        # tags are NOT pushed automatically
$ git push origin --tags         # push all tags
$ git switch --detach v1.0.0     # look at the code of an old release` },
      ],
    },
    {
      id: 'git-semver-releases',
      title: 'Semantic Versioning and GitHub Releases',
      blocks: [
        { type: 'list', items: [
          'MAJOR.MINOR.PATCH, e.g. 2.4.1.',
          'PATCH (2.4.1 -> 2.4.2): bug fixes only, nothing breaks.',
          'MINOR (2.4.1 -> 2.5.0): new features, still backwards compatible.',
          'MAJOR (2.4.1 -> 3.0.0): breaking changes; users must update their code.',
          'Pre-releases: 3.0.0-beta.1, 3.0.0-rc.1.',
          'On GitHub, a Release is a tag plus release notes and downloadable files (APK, zip). "Generate release notes" lists merged pull requests automatically.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`## CodeNest v1.4.0 (2026-03-10)

### Added
- PHP and Python courses with live Try it
### Fixed
- Skill test timer pauses when the app is in the background (#88)
### Changed
- Dashboard menu shows text beside the icons` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'ignore-tags', q: 'What should be in .gitignore for a Node project?', options: ['package.json', 'node_modules/ and .env', 'src/', 'README.md'], answer: 1, explain: 'Dependencies are reinstalled from package.json; secrets never belong in git.' },
    { chapterId: 'ignore-tags', q: 'You added .env to .gitignore but it still appears in commits. Why?', options: ['.gitignore is broken', 'The file was already tracked; run git rm --cached .env', 'You must restart your computer', 'Only GitHub reads .gitignore'], answer: 1, explain: '.gitignore only affects untracked files.' },
    { chapterId: 'ignore-tags', q: 'How does a tag differ from a branch?', options: ['Tags move with each commit; branches do not', 'A tag permanently names one commit; a branch moves forward', 'They are identical', 'Tags are only on GitHub'], answer: 1, explain: 'Use tags for releases.' },
    { chapterId: 'ignore-tags', q: 'A release fixes bugs without new features. Version 2.4.1 becomes...', options: ['3.0.0', '2.5.0', '2.4.2', '2.4.1.1'], answer: 2, explain: 'Bug fixes bump PATCH.' },
    { chapterId: 'ignore-tags', q: 'Are tags pushed by a normal git push?', options: ['Yes, always', 'No, push them with git push origin <tag> or --tags', 'Only annotated tags', 'Only on main'], answer: 1, explain: 'Tags must be pushed explicitly.' },
  ],
};
