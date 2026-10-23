// Git chapter: Collaboration on GitHub. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'collaboration',
  title: 'Pull Requests & Code Review',
  description: 'Feature branches, pull requests, reviews, forks, issues and open source',
  icon: 'groups',
  lessons: [
    {
      id: 'git-pr-workflow',
      title: 'The Pull Request Workflow',
      blocks: [
        { type: 'text', value: 'A pull request (PR) asks the team to review and merge your branch into main. It is where code review, discussion and automated checks happen. This is how almost every professional team works.' },
        { type: 'code', lang: 'text', value: String.raw`$ git switch main && git pull                 # start from the latest main
$ git switch -c feature/142-password-reset
# ... edit, commit small focused commits ...
$ git commit -m "Add password reset email"
$ git push -u origin feature/142-password-reset
remote: Create a pull request for 'feature/142-password-reset' on GitHub by visiting:
remote:   https://github.com/codenest/shop/pull/new/feature/142-password-reset

$ gh pr create --title "Add password reset" --body "Closes #142"   # or use the website
https://github.com/codenest/shop/pull/57

# Reviewer asks for changes -> commit and push again; the PR updates automatically
$ git commit -am "Expire reset links after 1 hour"
$ git push

# After approval: "Squash and merge" on GitHub, then clean up locally
$ git switch main && git pull
$ git branch -d feature/142-password-reset` },
      ],
    },
    {
      id: 'git-good-prs',
      title: 'Writing Good Pull Requests',
      blocks: [
        { type: 'list', items: [
          'Small: aim for under 400 changed lines. Big PRs get shallow reviews and hide bugs.',
          'One purpose per PR: do not mix a refactor, a bug fix and a new feature.',
          'Clear title and description: what, why, how to test, screenshots for UI changes.',
          'Link the issue: "Closes #142" closes it automatically when merged.',
          'Make CI green (tests, lint) before asking for review.',
          'Review your own diff first: you will catch debug prints and typos.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`## What
Adds a "Forgot password?" flow: request form, emailed link, reset form.

## Why
Support gets ~20 tickets a week from locked-out users. Closes #142.

## How to test
1. Go to /login -> "Forgot password?"
2. Enter nadia@example.com and open the email in Mailpit (localhost:8025)
3. Set a new password and log in

## Notes
- Links expire after 1 hour and work only once
- No user enumeration: the page says "If the account exists, we sent an email"` },
      ],
    },
    {
      id: 'git-code-review',
      title: 'Reviewing Code',
      blocks: [
        { type: 'list', items: [
          'Look for correctness, security, readability and tests first; style is the linter\'s job.',
          'Ask questions instead of giving orders: "What happens if the cart is empty here?"',
          'Prefix minor points with "nit:" so the author knows they are optional.',
          'Approve when it is good enough to merge and can be improved later; perfect is the enemy of done.',
          'Use GitHub suggestions (```suggestion blocks) so the author can apply small fixes with one click.',
          'Respond to review comments politely, fix or explain, and resolve each conversation.',
        ] },
        { type: 'note', value: 'Code review is a skill employers test in interviews. Practise by reviewing open-source pull requests and your classmates\' projects.' },
      ],
    },
    {
      id: 'git-forks-open-source',
      title: 'Forks and Contributing to Open Source',
      blocks: [
        { type: 'text', value: 'You cannot push to other people\'s repositories. Instead you fork (copy) the repo to your account, push to your fork, and open a pull request to the original ("upstream").' },
        { type: 'code', lang: 'text', value: String.raw`$ gh repo fork django/django --clone          # fork + clone + add upstream remote
$ cd django
$ git remote -v
origin    git@github.com:nadia-r/django.git (fetch)
upstream  git@github.com:django/django.git (fetch)

$ git switch -c fix/docs-typo
$ git commit -am "Fix typo in the tutorial"
$ git push -u origin fix/docs-typo
$ gh pr create --repo django/django

# Keep your fork up to date
$ git fetch upstream
$ git switch main && git merge upstream/main && git push` },
        { type: 'list', items: [
          'Read CONTRIBUTING.md and the code of conduct first.',
          'Start with issues labelled "good first issue" or documentation fixes.',
          'Comment on the issue before working on it, so two people do not do the same work.',
          'Open-source contributions are excellent proof of skill on your CV.',
        ] },
      ],
    },
    {
      id: 'git-issues-projects',
      title: 'Issues, Projects and Discussions',
      blocks: [
        { type: 'list', items: [
          'Issues: bug reports and feature requests, with labels (bug, enhancement), assignees and milestones.',
          'Issue templates (.github/ISSUE_TEMPLATE) make reporters include steps to reproduce, expected vs actual behaviour and versions.',
          'Projects: Kanban boards (To do / In progress / Done) linked to issues and PRs.',
          'Keywords in PRs and commits close issues: Closes #12, Fixes #12, Resolves #12.',
          'CODEOWNERS file: automatically requests review from the owners of the changed files.',
          'Discussions: Q&A and ideas that are not yet concrete issues.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'collaboration', q: 'What is a pull request?', options: ['Downloading code', 'A request to review and merge your branch into another branch', 'A git command', 'A bug report'], answer: 1, explain: 'PRs are where review and CI happen.' },
    { chapterId: 'collaboration', q: 'What makes a good PR?', options: ['As many changes as possible', 'Small, focused, with a clear description and passing CI', 'No description', 'Mixing several unrelated features'], answer: 1, explain: 'Small PRs get better reviews.' },
    { chapterId: 'collaboration', q: 'What does "Closes #142" in a PR description do?', options: ['Nothing', 'Closes issue 142 automatically when the PR is merged', 'Deletes the branch', 'Locks the repo'], answer: 1, explain: 'Also works with Fixes and Resolves.' },
    { chapterId: 'collaboration', q: 'How do you contribute to a repository you cannot push to?', options: ['Ask for the password', 'Fork it, push to your fork, open a pull request to the original', 'Email the files', 'Clone and push --force'], answer: 1, explain: 'The original repo is usually called upstream.' },
    { chapterId: 'collaboration', q: 'In code review, "nit:" means...', options: ['A critical bug', 'A minor, optional suggestion', 'Not interesting', 'Needs immediate testing'], answer: 1, explain: 'It helps authors prioritise feedback.' },
  ],
};
