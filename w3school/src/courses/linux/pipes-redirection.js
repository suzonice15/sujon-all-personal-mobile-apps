// Linux chapter: Pipes and Redirection.

export default {
  id: 'pipes-redirection',
  title: 'Pipes & Redirection',
  description: 'Connect commands and control their input and output',
  icon: 'sync-alt',
  lessons: [
    {
      id: 'linux-redirection',
      title: 'Standard streams',
      blocks: [
        { type: 'text', value: 'Every command has standard input (stdin), standard output (stdout) and standard error (stderr). Redirection connects them to files.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `echo "hello" > notes.txt      # overwrite
echo "more" >> notes.txt      # append
cat notes.txt

command 2> error.log          # only stderr
command > out.log 2>&1        # both streams to one file
command < input.txt           # stdin from a file` },
        { type: 'note', value: '> overwrites the file immediately. Use >> when you mean to append. A typo in a path can create a new file instead of failing.' },
      ],
    },
    {
      id: 'linux-pipes',
      title: 'Pipes',
      blocks: [
        { type: 'text', value: 'A pipe sends the stdout of one command into the stdin of the next. Small focused commands combine into powerful pipelines.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ls | wc -l
cat app.log | grep "ERROR" | wc -l
cat names.txt | sort | uniq -c | sort -nr | head -n 10` },
        { type: 'list', items: [
          'Each stage reads from the previous one',
          'The pipeline stops if a stage fails, depending on pipefail',
          'Use tee to view output and save it at the same time',
          'Keep each stage simple and test it alone',
        ] },
      ],
    },
    {
      id: 'linux-tee-xargs',
      title: 'tee and xargs',
      blocks: [
        { type: 'text', value: 'tee writes to a file and passes the data on. xargs turns input lines into arguments for another command.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ls | tee files.txt | wc -l

find . -name "*.log" -print0 | xargs -0 rm
find . -name "*.js" | xargs grep -n "TODO"` },
        { type: 'note', value: 'Use -print0 with find and -0 with xargs so filenames with spaces are handled correctly.' },
      ],
    },
    {
      id: 'linux-command-substitution',
      title: 'Command substitution',
      blocks: [
        { type: 'text', value: '$() runs a command and substitutes its output. It is useful for dates, paths and IDs inside scripts.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `today=$(date +%F)
backup="backup-$today.tar.gz"

echo "Creating $backup"
tar -czf "$backup" src/

echo "Files: $(ls src | wc -l)"` },
        { type: 'note', value: 'Quote command substitution when the output may contain spaces or newlines. Unquoted output is split into words.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'pipes-redirection',
      q: 'What does > do?',
      options: ['Appends to a file', 'Overwrites a file with stdout', 'Reads from stdin', 'Sends stderr'],
      answer: 1,
      explain: 'Single > truncates and writes; >> appends.',
    },
    {
      chapterId: 'pipes-redirection',
      q: 'What does | do?',
      options: ['Runs commands in parallel', 'Sends stdout of one command to stdin of the next', 'Redirects stderr', 'Creates a file'],
      answer: 1,
      explain: 'A pipe connects the output of one process to the input of another.',
    },
    {
      chapterId: 'pipes-redirection',
      q: 'What does 2>&1 do?',
      options: ['Sends stderr to stdout', 'Sends stdout to a file', 'Duplicates a process', 'Reads two files'],
      answer: 0,
      explain: 'It points file descriptor 2 (stderr) at the same place as 1 (stdout).',
    },
    {
      chapterId: 'pipes-redirection',
      q: 'Why use find -print0 with xargs -0?',
      options: ['To run faster', 'To handle filenames with spaces safely', 'To sort output', 'To compress files'],
      answer: 1,
      explain: 'Null separators avoid splitting names that contain spaces.',
    },
  ],
};
