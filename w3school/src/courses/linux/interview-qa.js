// Linux & Bash interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the difference between the kernel, a distribution and a shell?',
      a: 'The kernel manages hardware, processes and memory. A distribution packages the kernel with tools and a package manager. The shell is the program that reads and runs your commands.',
      level: 'basic',
    },
    {
      q: 'What does the shebang do?',
      a: 'The first line #!/usr/bin/env bash tells the system which interpreter runs the script when it is executed directly.',
      level: 'basic',
    },
    {
      q: 'What is an exit code?',
      a: 'A number a process returns to its parent. 0 means success, non-zero means failure. Shells use it for &&, || and if.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between an absolute and a relative path?',
      a: 'An absolute path starts at / and is independent of the current directory. A relative path is resolved from the current directory.',
      level: 'basic',
    },
  ],
  'files-directories': [
    {
      q: 'What does rm -rf do and why is it dangerous?',
      a: 'It removes files and directories recursively without prompting. There is no trash bin, so a wrong path deletes data permanently.',
      level: 'basic',
    },
    {
      q: 'What is the difference between cp and mv?',
      a: 'cp copies, leaving the source. mv moves or renames, so the source path no longer exists.',
      level: 'basic',
    },
    {
      q: 'How do you find files larger than 100 MB?',
      a: 'find . -type f -size +100M. Add -maxdepth to limit the scan and -print0 with xargs for safe handling.',
      level: 'intermediate',
    },
    {
      q: 'Why quote paths in shell commands?',
      a: 'Unquoted spaces split the path into multiple arguments. Quoting keeps it as one word and prevents glob expansion.',
      level: 'intermediate',
    },
  ],
  'viewing-files': [
    {
      q: 'When use less instead of cat?',
      a: 'Use less for long files: it pages, searches and does not flood the terminal. cat is fine for short files or for piping.',
      level: 'basic',
    },
    {
      q: 'What does grep -r do?',
      a: 'It searches recursively through a directory tree and prints matching lines with file names.',
      level: 'basic',
    },
    {
      q: 'Why sort before uniq?',
      a: 'uniq only removes adjacent duplicates. Sorting groups equal lines so all duplicates are adjacent.',
      level: 'intermediate',
    },
    {
      q: 'What does tail -f do?',
      a: 'It prints the end of a file and keeps the file open, printing new lines as they are appended. It is the standard way to watch a log.',
      level: 'basic',
    },
  ],
  permissions: [
    {
      q: 'What do the three permission groups mean?',
      a: 'Owner, group and others. Each has read, write and execute bits. The owner is the file creator or the user set by chown.',
      level: 'basic',
    },
    {
      q: 'What does chmod 755 mean?',
      a: '7 for the owner (read, write, execute), 5 for group and 5 for others (read and execute). It is common for directories and scripts.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between sudo and su?',
      a: 'sudo runs one command with elevated privileges, usually as root. su switches to another user for a whole session.',
      level: 'intermediate',
    },
    {
      q: 'What does umask control?',
      a: 'The default permission bits removed from new files and directories. A umask of 022 produces 644 files and 755 directories.',
      level: 'advanced',
    },
  ],
  'pipes-redirection': [
    {
      q: 'What is the difference between > and >>?',
      a: '> truncates the file and writes. >> appends. Both create the file if it does not exist.',
      level: 'basic',
    },
    {
      q: 'What does 2>&1 do?',
      a: 'It points stderr (file descriptor 2) at the same destination as stdout (1), so both streams are captured together.',
      level: 'intermediate',
    },
    {
      q: 'What is a pipe?',
      a: 'A connection that sends the stdout of one process into the stdin of another, allowing small commands to be composed.',
      level: 'basic',
    },
    {
      q: 'Why use find -print0 with xargs -0?',
      a: 'NUL separates filenames so spaces and newlines in names are not split into separate arguments.',
      level: 'advanced',
    },
  ],
  processes: [
    {
      q: 'What is a PID?',
      a: 'The process identifier, unique while the process runs. Signals and many tools use it to target a process.',
      level: 'basic',
    },
    {
      q: 'What is the difference between SIGTERM and SIGKILL?',
      a: 'SIGTERM asks the process to stop and can be caught for cleanup. SIGKILL cannot be caught and terminates immediately, risking incomplete cleanup.',
      level: 'intermediate',
    },
    {
      q: 'How do you keep a process running after logout?',
      a: 'Use nohup, disown, screen or tmux. For production, use systemd or a container platform so the process restarts automatically.',
      level: 'intermediate',
    },
    {
      q: 'What does a zombie process mean?',
      a: 'A child that exited but whose parent has not read its exit status. The parent must call wait(); zombies hold a process table entry but no memory.',
      level: 'advanced',
    },
  ],
  networking: [
    {
      q: 'What is the loopback address?',
      a: '127.0.0.1 (or ::1). It refers to the local machine and is not reachable from the network.',
      level: 'basic',
    },
    {
      q: 'How do you check which process listens on a port?',
      a: 'ss -tulpn (or netstat -tulpn) shows listening sockets and the owning process. Run it with sudo for process names you do not own.',
      level: 'intermediate',
    },
    {
      q: 'How does SSH key authentication work?',
      a: 'The client proves it holds the private key. The server has the matching public key in authorized_keys. No password is sent.',
      level: 'intermediate',
    },
    {
      q: 'Why bind a service to 127.0.0.1?',
      a: 'It makes the service reachable only from the local machine, so a reverse proxy can expose it while the network cannot reach it directly.',
      level: 'advanced',
    },
  ],
  'package-management': [
    {
      q: 'What is a package repository?',
      a: 'A server that hosts packages and metadata. The package manager downloads, verifies signatures and installs dependencies.',
      level: 'basic',
    },
    {
      q: 'What does apt update do compared with apt upgrade?',
      a: 'update refreshes the package index. upgrade installs newer versions of already installed packages.',
      level: 'basic',
    },
    {
      q: 'Why avoid installing random .deb files?',
      a: 'A package runs install scripts as root. Use the official repository unless you trust and have inspected the source.',
      level: 'intermediate',
    },
    {
      q: 'What is a version manager used for?',
      a: 'It installs and switches language runtimes per project without changing system packages, avoiding conflicts and permission issues.',
      level: 'intermediate',
    },
  ],
  'bash-scripting': [
    {
      q: 'What does set -euo pipefail do?',
      a: 'e exits on a failed command, u errors on undefined variables, and pipefail makes a pipeline fail when any stage fails. Together they make scripts fail fast.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between $@ and $*?',
      a: '$@ expands to separate quoted arguments; $* expands to one string. Quote "$@" to preserve argument boundaries.',
      level: 'intermediate',
    },
    {
      q: 'How do you make a variable local to a function?',
      a: 'Declare it with local inside the function. Otherwise it becomes global and can leak between calls.',
      level: 'basic',
    },
    {
      q: 'How do you check that a file exists?',
      a: '[ -f path ] checks a regular file, [ -d path ] checks a directory, and [ -e path ] checks any existing path.',
      level: 'basic',
    },
  ],
  'cron-systemd': [
    {
      q: 'How do you schedule a job every day at 3 AM?',
      a: '0 3 * * * /path/to/script.sh. Five fields: minute, hour, day of month, month, day of week.',
      level: 'basic',
    },
    {
      q: 'Why does a cron job fail when it works in the terminal?',
      a: 'Cron has a minimal environment: a different PATH, no shell profile and no working directory guarantee. Use absolute paths and redirect output to a log.',
      level: 'intermediate',
    },
    {
      q: 'What does systemctl enable do?',
      a: 'It makes a unit start automatically at boot. enable --now also starts it immediately.',
      level: 'intermediate',
    },
    {
      q: 'How do you find why a service failed?',
      a: 'systemctl status shows the last lines and the exit code. journalctl -u unit -b shows the full log for the current boot.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'What makes a deploy script safe?',
      a: 'set -euo pipefail, checked inputs, absolute paths, a release directory, a symlink switch, and a health check after restart. It should be safe to run twice.',
      level: 'intermediate',
    },
    {
      q: 'How do you roll back a deployment?',
      a: 'Keep the previous release and point the symlink back to it, then restart the service. Verify with a health check and logs.',
      level: 'advanced',
    },
    {
      q: 'How do you analyse a log for the top errors?',
      a: 'grep the error level, extract the message field, sort, uniq -c, sort -nr and head. Test each stage separately.',
      level: 'basic',
    },
    {
      q: 'What is the most common cause of production accidents?',
      a: 'Human error with destructive commands: a wrong path, an unquoted variable, or sudo on the wrong target. Checklists and backups reduce the damage.',
      level: 'basic',
    },
  ],
};
