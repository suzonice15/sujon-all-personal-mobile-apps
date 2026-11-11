// Linux chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Deploy scripts, log analysis and safe habits',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'linux-project-deploy',
      title: 'Project: deploy script',
      blocks: [
        { type: 'text', value: 'A deploy script should fail fast, check its inputs and leave a clear log. This example copies a build, restarts a service and keeps the previous release.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `#!/usr/bin/env bash
set -euo pipefail

release="release-$(date +%Y%m%d-%H%M%S)"
target="/srv/app/$release"

echo "Deploying to $target"
mkdir -p "$target"
tar -xzf app.tar.gz -C "$target"

ln -sfn "$target" /srv/app/current

sudo systemctl restart codenest
sudo systemctl is-active --quiet codenest
echo "Deploy complete: $release"` },
        { type: 'note', value: 'A symlink to a release folder makes rollback a single ln -sfn to the previous release. It is the simplest zero-downtime pattern.' },
      ],
    },
    {
      id: 'linux-project-logs',
      title: 'Project: log analysis',
      blocks: [
        { type: 'text', value: 'Answer real questions from logs: which errors are most common, which IPs fail most, and when did errors spike?' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Top 10 error messages
grep "ERROR" app.log | cut -d " " -f 4- | sort | uniq -c | sort -nr | head -n 10

# Requests per hour
cut -d " " -f 2 app.log | cut -d ":" -f 1 | sort | uniq -c

# Most frequent client IPs
awk '{print $1}' access.log | sort | uniq -c | sort -nr | head -n 5` },
        { type: 'note', value: 'Test each pipeline stage alone before chaining it. A wrong field number silently produces a plausible but wrong answer.' },
      ],
    },
    {
      id: 'linux-safety',
      title: 'Safety habits',
      blocks: [
        { type: 'list', items: [
          'Read a command before pressing Enter, especially with rm or sudo',
          'Quote variables and paths with spaces',
          'Use set -euo pipefail in scripts',
          'Test destructive commands on a copy first',
          'Keep backups and verify they restore',
          'Never run curl | bash as root without reading the script',
          'Use ssh keys and disable password login',
        ] },
        { type: 'text', value: 'Most production disasters are not clever attacks. They are a wrong path, a missing quote or a command run as root by mistake.' },
      ],
    },
    {
      id: 'linux-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What happens when you run a command in the shell?',
          'Explain the difference between a process and a thread.',
          'What is the difference between > and >>?',
          'How do you find which process uses a port?',
          'Explain file permissions and chmod 755.',
          'How do you make a script safe to run twice?',
          'What does set -euo pipefail do?',
          'How do you schedule a job every day?',
          'How do you debug a service that will not start?',
          'How do you deploy without downtime?',
        ] },
        { type: 'text', value: 'Strong answers name the command, the flag and the reason. "Use ss -tulpn to find the process on port 3000" is better than "check the ports".' },
        { type: 'note', value: 'Practise on a real VM or container. The terminal is learned by typing, not by reading alone.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Why use a release symlink?',
      options: ['To save disk', 'To switch versions and roll back quickly', 'To encrypt files', 'To start cron'],
      answer: 1,
      explain: 'Pointing current at a release makes rollback a single link change.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which command shows the most frequent lines?',
      options: ['sort | uniq -c | sort -nr', 'cat | head', 'ls | wc', 'grep -v'],
      answer: 0,
      explain: 'Count duplicates then sort by the count.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why read a script before running it with sudo?',
      options: ['It is faster', 'It can run anything as root', 'It changes permissions', 'It needs a password'],
      answer: 1,
      explain: 'Root access means the script can change or delete anything.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What makes a script safe to run twice?',
      options: ['Using random names', 'Idempotent operations such as mkdir -p and checked writes', 'Running as root', 'Deleting everything first'],
      answer: 1,
      explain: 'Idempotence means a second run reaches the same state without damage.',
    },
  ],
};
