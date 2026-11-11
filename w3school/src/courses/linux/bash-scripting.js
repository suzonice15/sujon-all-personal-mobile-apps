// Linux chapter: Bash Scripting.

export default {
  id: 'bash-scripting',
  title: 'Bash Scripting',
  description: 'Variables, arguments, conditions and safe scripts',
  icon: 'code',
  lessons: [
    {
      id: 'linux-script-basics',
      title: 'Your first script',
      blocks: [
        { type: 'text', value: 'A script is a text file of commands. The shebang tells the system which interpreter to use. Make it executable, then run it.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `#!/usr/bin/env bash
set -euo pipefail

name="Ayesha"
echo "Hello, $name"

today=$(date +%F)
echo "Today is $today"` },
        { type: 'list', items: [
          '#!/usr/bin/env bash finds bash on the PATH',
          'set -e stops on a failed command',
          'set -u errors on an undefined variable',
          'set -o pipefail makes a failed pipe stage fail the pipeline',
        ] },
        { type: 'note', value: 'Use bash script.sh while developing. chmod +x script.sh lets you run ./script.sh with the shebang.' },
      ],
    },
    {
      id: 'linux-script-arguments',
      title: 'Arguments',
      blocks: [
        { type: 'text', value: 'Scripts receive arguments as $1, $2 and so on. $# is the count, $@ is all arguments, and $0 is the script name.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <source> <destination>" >&2
  exit 1
fi

source="$1"
destination="$2"

echo "Copying $source to $destination"
cp -r "$source" "$destination"` },
        { type: 'note', value: 'Always quote "$@" and "$1". Unquoted arguments split on spaces and glob characters expand unexpectedly.' },
      ],
    },
    {
      id: 'linux-script-conditions',
      title: 'Conditions and tests',
      blocks: [
        { type: 'text', value: '[ ] (or [[ ]]) tests a condition. -f checks a file, -d checks a directory, -z checks an empty string, and -eq compares numbers.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `if [ -f config.json ]; then
  echo "config exists"
else
  echo "missing config" >&2
  exit 1
fi

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root" >&2
  exit 1
fi

[[ "$name" == "Ayesha" ]] && echo "hello"` },
      ],
    },
    {
      id: 'linux-script-loops',
      title: 'Loops and functions',
      blocks: [
        { type: 'text', value: 'A for loop iterates over a list. A while loop runs until a condition changes. Functions group reusable steps and take arguments like a script.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `backup() {
  local target="$1"
  local stamp
  stamp=$(date +%Y%m%d-%H%M%S)
  tar -czf "backup-$stamp.tar.gz" "$target"
  echo "created backup-$stamp.tar.gz"
}

for dir in src docs; do
  [ -d "$dir" ] && backup "$dir"
done

count=0
while [ "$count" -lt 3 ]; do
  echo "attempt $count"
  count=$((count + 1))
done` },
        { type: 'note', value: 'Use local inside functions. Without it, variables leak into the global scope and cause surprising bugs.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'bash-scripting',
      q: 'What does set -e do?',
      options: ['Enables echo', 'Stops the script on a failed command', 'Exits the shell', 'Edits a file'],
      answer: 1,
      explain: 'It makes the script fail fast instead of continuing after an error.',
    },
    {
      chapterId: 'bash-scripting',
      q: 'What is $#?',
      options: ['The script name', 'The number of arguments', 'The last argument', 'The exit code'],
      answer: 1,
      explain: 'It counts the positional arguments.',
    },
    {
      chapterId: 'bash-scripting',
      q: 'Why quote "$@"?',
      options: ['To sort arguments', 'To preserve each argument as one word', 'To make them global', 'To print them'],
      answer: 1,
      explain: 'Quoted "$@" keeps arguments with spaces intact.',
    },
    {
      chapterId: 'bash-scripting',
      q: 'What does local do?',
      options: ['Makes a variable global', 'Keeps a variable inside the function', 'Exports a variable', 'Deletes it'],
      answer: 1,
      explain: 'It limits the variable scope to the function.',
    },
  ],
};
