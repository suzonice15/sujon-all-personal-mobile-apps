// Git chapter: Remotes and GitHub. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Remotes need a server, so these samples show real terminal output instead of Try it.

export default {
  id: 'remotes',
  title: 'GitHub & Remotes',
  description: 'Creating a GitHub repo, SSH keys, clone, remote, push, fetch and pull',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'git-github-setup',
      title: 'GitHub Account and SSH Keys',
      blocks: [
        { type: 'text', value: 'A remote is a copy of your repository on another computer, usually GitHub. To talk to GitHub securely without typing a password every time, use an SSH key (or HTTPS with a personal access token, or the GitHub CLI).' },
        { type: 'code', lang: 'text', value: String.raw`$ ssh-keygen -t ed25519 -C "nadia@example.com"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/nadia/.ssh/id_ed25519): [Enter]
Enter passphrase (empty for no passphrase): ********

$ cat ~/.ssh/id_ed25519.pub              # copy this PUBLIC key
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... nadia@example.com
# GitHub -> Settings -> SSH and GPG keys -> New SSH key -> paste

$ ssh -T git@github.com
Hi nadia-r! You've successfully authenticated, but GitHub does not provide shell access.

# Alternative: the GitHub CLI handles login and keys for you
$ gh auth login` },
        { type: 'note', value: 'Never share the private key (id_ed25519 without .pub). Turn on two-factor authentication for your GitHub account.' },
      ],
    },
    {
      id: 'git-push-new-repo',
      title: 'Pushing a Project to GitHub',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`# 1. On GitHub: New repository -> "codenest-shop" (no README, so it stays empty)

# 2. In your project folder
$ git remote add origin git@github.com:nadia-r/codenest-shop.git
$ git remote -v
origin  git@github.com:nadia-r/codenest-shop.git (fetch)
origin  git@github.com:nadia-r/codenest-shop.git (push)

$ git push -u origin main
Enumerating objects: 24, done.
Counting objects: 100% (24/24), done.
Writing objects: 100% (24/24), 8.31 KiB | 8.31 MiB/s, done.
To github.com:nadia-r/codenest-shop.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.

# 3. From now on, simply:
$ git push` },
        { type: 'list', items: [
          'origin is just the conventional name of the main remote.',
          '-u (--set-upstream) links your local main to origin/main, so later git push / git pull need no arguments.',
          'Shortcut with the GitHub CLI: gh repo create codenest-shop --public --source=. --push',
        ] },
      ],
    },
    {
      id: 'git-clone',
      title: 'Cloning a Repository',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`$ git clone git@github.com:nadia-r/codenest-shop.git
Cloning into 'codenest-shop'...
remote: Enumerating objects: 124, done.
Receiving objects: 100% (124/124), 52.10 KiB | 1.04 MiB/s, done.
Resolving deltas: 100% (41/41), done.

$ cd codenest-shop
$ git log --oneline -3          # the full history came with it
$ git branch -a                 # local and remote-tracking branches
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
  remotes/origin/feature/cart

$ git switch feature/cart       # creates a local branch tracking origin/feature/cart
branch 'feature/cart' set up to track 'origin/feature/cart'.` },
      ],
    },
    {
      id: 'git-fetch-pull',
      title: 'fetch, pull and Staying Up to Date',
      blocks: [
        { type: 'text', value: 'git fetch downloads new commits from the remote into remote-tracking branches (origin/main) without touching your work. git pull is git fetch followed by git merge (or rebase) into your current branch.' },
        { type: 'code', lang: 'text', value: String.raw`$ git fetch
From github.com:nadia-r/codenest-shop
   3f2a1b0..8c9d0e1  main       -> origin/main

$ git status
On branch main
Your branch is behind 'origin/main' by 2 commits, and can be fast-forwarded.

$ git log --oneline main..origin/main      # what is new on the remote?
8c9d0e1 Add product search
5b6a7c8 Fix price rounding

$ git pull
Updating 3f2a1b0..8c9d0e1
Fast-forward
 search.py | 42 ++++++++++++++++++++++
 cart.py   |  3 +-

$ git pull --rebase       # replay your local commits on top instead of a merge commit` },
      ],
    },
    {
      id: 'git-push-rejected',
      title: 'When Push Is Rejected',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`$ git push
To github.com:nadia-r/codenest-shop.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com:nadia-r/codenest-shop.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. Integrate the remote changes (e.g. 'git pull ...') before pushing again.

$ git pull --rebase        # take their commits, put yours on top
$ git push                 # now it works` },
        { type: 'list', items: [
          'Never "fix" this with git push --force on a shared branch: you would delete your teammates\' commits.',
          'If you must force-push your OWN feature branch after a rebase, use git push --force-with-lease: it refuses if someone else pushed in the meantime.',
          'Protect main on GitHub (Settings -> Branches) so nobody can force-push or push without a pull request.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'remotes', q: 'What is "origin"?', options: ['The first commit', 'The default name of the main remote repository', 'The main branch', 'A GitHub feature'], answer: 1, explain: 'It is just a conventional name.' },
    { chapterId: 'remotes', q: 'What does git push -u origin main do?', options: ['Deletes main', 'Pushes main and sets origin/main as its upstream', 'Pulls changes', 'Creates a fork'], answer: 1, explain: 'Later git push and git pull need no arguments.' },
    { chapterId: 'remotes', q: 'git fetch vs git pull?', options: ['They are identical', 'fetch only downloads; pull downloads AND merges into your branch', 'pull only downloads', 'fetch uploads'], answer: 1, explain: 'fetch is always safe; pull changes your branch.' },
    { chapterId: 'remotes', q: 'Your push is rejected because the remote has new commits. What should you do?', options: ['git push --force', 'git pull (or pull --rebase), then push', 'Delete the repository', 'Clone again'], answer: 1, explain: 'Integrate their work first.' },
    { chapterId: 'remotes', q: 'Which file must you NEVER share?', options: ['id_ed25519.pub', 'id_ed25519 (the private key)', '.gitignore', 'README.md'], answer: 1, explain: 'Only the .pub public key goes to GitHub.' },
  ],
};
