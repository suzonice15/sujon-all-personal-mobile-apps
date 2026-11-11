// Linux chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Kernel, distributions, the shell and your first commands',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'linux-what-is',
      title: 'What is Linux?',
      blocks: [
        { type: 'text', value: 'Linux is an operating system kernel. A distribution (distro) packages the kernel with tools, a package manager and a desktop or server setup. Ubuntu, Debian, Fedora and Arch are common distros.' },
        { type: 'list', items: [
          'The kernel talks to hardware and manages processes and memory',
          'The shell reads commands and runs programs',
          'Most servers, Android and cloud platforms run Linux',
          'The terminal is the fastest way to work on a server',
        ] },
        { type: 'note', value: 'You do not need to memorise every command. You need to understand files, processes, permissions and how to find help.' },
      ],
    },
    {
      id: 'linux-first-commands',
      title: 'Your first commands',
      blocks: [
        { type: 'text', value: 'A command is a program name plus arguments. Press Enter to run it. The prompt shows your user, host and current directory.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `pwd          # print the current directory
whoami       # your username
date         # current date and time
uname -a     # kernel and system information
echo "Hello, Linux"` },
        { type: 'text', value: 'Output appears below the command. A command that succeeds returns exit code 0; a failure returns a non-zero code. You can check the last one with echo $?.' },
        { type: 'note', value: 'Commands are case sensitive. ls works; LS does not.' },
      ],
    },
    {
      id: 'linux-help',
      title: 'Getting help',
      blocks: [
        { type: 'text', value: 'Every command has documentation. man opens the manual, --help prints a quick summary, and tldr shows practical examples if installed.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `man ls
ls --help
tldr tar

# Search the manual pages
man -k "copy files"` },
        { type: 'text', value: 'Read the first paragraph and the examples. You rarely need the full manual for daily work.' },
        { type: 'note', value: 'If a command is not found, the package is probably not installed. Chapter 8 covers installing software.' },
      ],
    },
    {
      id: 'linux-shell',
      title: 'The shell',
      blocks: [
        { type: 'text', value: 'Bash is the default shell on most Linux systems. It expands variables, globs and command substitution before running the program.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `name="Ayesha"
echo "Hello, $name"

# Command substitution: use the output of date
echo "Today is $(date +%F)"

# Glob: list every .txt file
ls *.txt` },
        { type: 'list', items: [
          'Single quotes keep everything literal',
          'Double quotes allow variable expansion',
          'Backticks are the old form of $()',
          'A semicolon runs commands in sequence',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Which command prints the current directory?',
      options: ['cd', 'pwd', 'ls', 'dir'],
      answer: 1,
      explain: 'pwd stands for print working directory.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is a distribution?',
      options: ['A Linux kernel', 'A packaged Linux system with tools and a package manager', 'A shell', 'A file system'],
      answer: 1,
      explain: 'A distro combines the kernel with software and a package manager.',
    },
    {
      chapterId: 'getting-started',
      q: 'How do you read the manual for ls?',
      options: ['ls --readme', 'man ls', 'help ls', 'cat ls'],
      answer: 1,
      explain: 'man opens the manual page.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does $? show?',
      options: ['The current user', 'The exit code of the last command', 'The current directory', 'The shell version'],
      answer: 1,
      explain: '0 means success; a non-zero value means failure.',
    },
  ],
};
