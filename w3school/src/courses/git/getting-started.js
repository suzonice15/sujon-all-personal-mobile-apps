// Git chapter: Getting Started. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What version control is, Git vs GitHub, installing and configuring Git',
  icon: 'play-circle-outline',
  lessons: [
    {
      id: 'git-what-is-vcs',
      title: 'What Is Version Control?',
      blocks: [
        { type: 'text', value: 'Version control records every change to your files over time. You can see who changed what and why, go back to any earlier version, and work on several ideas in parallel without breaking the working version. No more "final_v2_REALLY_final.zip".' },
        { type: 'list', items: [
          'Git is the version control system used by almost every software team in the world. It runs on your computer.',
          'GitHub (and GitLab, Bitbucket) are websites that host Git repositories online and add collaboration: pull requests, code review, issues, CI/CD.',
          'Git is distributed: every developer has the full history on their own machine, so you can commit offline and nothing is lost if a server dies.',
          'Every job as a developer expects Git. It is also how you build a public portfolio on GitHub.',
        ] },
        { type: 'note', value: 'In this course, Try it opens a real Git playground: a fresh repository where you type git commands and see real output. Change the commands and run them as often as you like.' },
      ],
    },
    {
      id: 'git-install-config',
      title: 'Installing and Configuring Git',
      blocks: [
        { type: 'list', items: [
          'Windows: install Git for Windows from git-scm.com (it includes Git Bash).',
          'macOS: xcode-select --install, or brew install git.',
          'Linux: sudo apt install git (Debian/Ubuntu) or sudo dnf install git.',
          'Check: git --version',
        ] },
        { type: 'text', value: 'Tell Git who you are once per computer. Every commit records this name and email. Use the same email as your GitHub account so commits link to your profile.' },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git --version
git config --global user.name "Nadia Rahman"
git config --global user.email "nadia@example.com"
git config user.name
git config user.email` },
        { type: 'code', lang: 'text', value: String.raw`$ git config --global init.defaultBranch main      # new repos start on "main"
$ git config --global core.editor "code --wait"     # use VS Code for commit messages
$ git config --global pull.rebase false             # merge (default) when pulling
$ git config --list --show-origin                   # see every setting and where it comes from
$ git config --global alias.st status               # shortcut: git st` },
      ],
    },
    {
      id: 'git-mental-model',
      title: 'The Three Areas: Working Tree, Staging, Repository',
      blocks: [
        { type: 'text', value: 'Understanding these three places is the key to Git. Almost every command moves changes between them.' },
        { type: 'list', items: [
          'Working tree: the files you see and edit in your folder.',
          'Staging area (index): the changes you have chosen for the next commit. git add puts them here.',
          'Repository (.git folder): the saved history of commits. git commit stores the staged snapshot permanently.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`  edit files          git add            git commit
working tree  ───────────▶  staging area  ───────────▶  repository
     ▲                                                       │
     └──────────────── git restore / git switch ◀────────────┘` },
        { type: 'code', lang: 'git', tryIt: true, value: String.raw`git init
echo "Hello" > hello.txt
# 1. The file exists only in the working tree
git status -s
# 2. Now it is staged
git add hello.txt
git status -s
# 3. Now it is saved in the repository
git commit -m "Add hello.txt"
git status` },
        { type: 'note', value: 'In git status -s, the first column is the staging area and the second is the working tree: "A " = added and staged, " M" = modified but not staged, "??" = untracked.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'getting-started', q: 'What is the difference between Git and GitHub?', options: ['They are the same', 'Git is the version control tool; GitHub hosts Git repositories online with collaboration features', 'GitHub is a newer version of Git', 'Git only works on Windows'], answer: 1, explain: 'Git runs locally; GitHub, GitLab and Bitbucket host repositories.' },
    { chapterId: 'getting-started', q: 'What does "Git is distributed" mean?', options: ['It is split across many servers', 'Every clone has the full history, so you can work offline', 'It only works with a network', 'It is free'], answer: 1, explain: 'Each developer has a complete copy of the repository.' },
    { chapterId: 'getting-started', q: 'Which command sets your name for all repositories on your computer?', options: ['git name "Nadia"', 'git config --global user.name "Nadia"', 'git user --set "Nadia"', 'git init --name "Nadia"'], answer: 1, explain: '--global writes it to your user-level config.' },
    { chapterId: 'getting-started', q: 'What does git add do?', options: ['Saves a commit', 'Puts changes into the staging area for the next commit', 'Uploads to GitHub', 'Creates a branch'], answer: 1, explain: 'git commit then stores the staged snapshot.' },
    { chapterId: 'getting-started', q: 'In git status -s, what does ?? mean?', options: ['A conflict', 'An untracked file', 'A deleted file', 'A staged file'], answer: 1, explain: 'Git sees the file but is not tracking it yet.' },
  ],
};
