// Git chapter: Configuration and Line Endings. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'config',
  title: 'Configuration, Aliases & Line Endings',
  description: 'Config levels, aliases, work vs personal identities, .gitattributes and CRLF/LF',
  icon: 'tune',
  lessons: [
    {
      id: 'git-config-levels',
      title: 'Where Settings Live',
      blocks: [
        { type: 'list', items: [
          '--system: every user on the computer (rarely used).',
          '--global: your user (~/.gitconfig): name, email, editor, aliases.',
          '--local (default inside a repo): this repository only (.git/config): remotes, per-project overrides.',
          'More specific wins: local overrides global, global overrides system.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`$ git config --list --show-origin
file:/home/nadia/.gitconfig     user.name=Nadia Rahman
file:/home/nadia/.gitconfig     user.email=nadia@example.com
file:.git/config                remote.origin.url=git@github.com:codenest/shop.git
file:.git/config                user.email=nadia@codenest.app       # overrides global here

$ git config --global --edit          # open ~/.gitconfig in your editor` },
      ],
    },
    {
      id: 'git-aliases-useful-settings',
      title: 'Aliases and Settings That Save Time',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`# ~/.gitconfig
[user]
    name = Nadia Rahman
    email = nadia@example.com
[init]
    defaultBranch = main
[pull]
    rebase = true                 # pull = fetch + rebase (no "Merge branch 'main'" noise)
[push]
    autoSetupRemote = true        # first git push creates the upstream automatically
[fetch]
    prune = true                  # remove deleted remote branches on fetch
[rerere]
    enabled = true                # remember how you resolved a conflict and reuse it
[diff]
    colorMoved = zebra            # show moved code blocks differently
[alias]
    st = status -sb
    co = switch
    lg = log --oneline --graph --decorate --all
    last = log -1 HEAD --stat
    undo = reset --soft HEAD~1    # undo the last commit, keep the changes staged
    amend = commit --amend --no-edit` },
        { type: 'note', value: 'With these aliases, git lg shows the whole branch graph and git undo safely takes back your last local commit.' },
      ],
    },
    {
      id: 'git-identities',
      title: 'Separate Work and Personal Identities',
      blocks: [
        { type: 'text', value: 'Committing to your company repo with your personal email (or the other way round) is a common mistake. Conditional includes switch identity automatically based on the folder.' },
        { type: 'code', lang: 'text', value: String.raw`# ~/.gitconfig
[user]
    name = Nadia Rahman
    email = nadia@example.com                 # personal default
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work

# ~/.gitconfig-work
[user]
    email = nadia.rahman@company.com
    signingkey = ~/.ssh/id_ed25519_work.pub

# Every repository inside ~/work/ now uses the work email automatically
$ cd ~/work/billing-api && git config user.email
nadia.rahman@company.com` },
      ],
    },
    {
      id: 'git-line-endings',
      title: 'Line Endings: CRLF, LF and .gitattributes',
      blocks: [
        { type: 'text', value: 'Windows ends lines with CRLF (\\r\\n), macOS and Linux with LF (\\n). Without rules, every line of a file can look changed when a Windows and a Mac developer edit it, and shell scripts break on Linux servers. This is the reason for the warning many Windows users see: "LF will be replaced by CRLF the next time Git touches it".' },
        { type: 'code', lang: 'text', value: String.raw`# .gitattributes (commit it, so the rule is the same for everyone)
* text=auto eol=lf          # store text with LF in the repository and check out LF
*.bat text eol=crlf         # Windows batch files need CRLF
*.sh  text eol=lf
*.png binary                # never touch binary files
*.jpg binary
*.pdf binary

# Apply the new rules to files already in the repo
$ git add --renormalize .
$ git commit -m "Normalize line endings"` },
        { type: 'list', items: [
          'Prefer .gitattributes in the repo over each person\'s core.autocrlf setting: it works the same on every machine.',
          'If you still use core.autocrlf: true on Windows, input on macOS/Linux.',
          'Configure your editor to use LF (VS Code: "files.eol": "\\n").',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'config', q: 'Which config level wins if the same key is set in several places?', options: ['system', 'global', 'local (the repository)', 'The first one set'], answer: 2, explain: 'More specific settings override general ones.' },
    { chapterId: 'config', q: 'What does pull.rebase = true change?', options: ['pull deletes branches', 'git pull rebases your local commits instead of creating a merge commit', 'push becomes forced', 'Nothing'], answer: 1, explain: 'It keeps history linear when you pull.' },
    { chapterId: 'config', q: 'How can Git use your work email only inside ~/work/?', options: ['It cannot', 'With [includeIf "gitdir:~/work/"] in ~/.gitconfig', 'By renaming the folder', 'With a branch name'], answer: 1, explain: 'Conditional includes load extra config per folder.' },
    { chapterId: 'config', q: 'Why commit a .gitattributes file with "* text=auto eol=lf"?', options: ['To ignore files', 'So everyone stores and checks out text with consistent line endings', 'To compress the repo', 'To sign commits'], answer: 1, explain: 'It prevents whole-file diffs caused by CRLF/LF changes.' },
    { chapterId: 'config', q: 'What does rerere do?', options: ['Re-runs tests', 'Remembers how you resolved a conflict and reuses it', 'Resets a branch', 'Renames a remote'], answer: 1, explain: '"Reuse recorded resolution", great for long-running branches.' },
  ],
};
