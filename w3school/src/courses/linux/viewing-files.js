// Linux chapter: Viewing Files.

export default {
  id: 'viewing-files',
  title: 'Viewing Files',
  description: 'Read, search and summarise text from the terminal',
  icon: 'description',
  lessons: [
    {
      id: 'linux-cat-less',
      title: 'cat, less, head and tail',
      blocks: [
        { type: 'text', value: 'cat prints a whole file. less is a pager for long files. head and tail show the start or end, and tail -f follows a log as it grows.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `cat README.md
less README.md
head -n 20 app.log
tail -n 50 app.log
tail -f app.log` },
        { type: 'note', value: 'In less, press q to quit, / to search and space to page down. On a server, less is safer than cat for a large file.' },
      ],
    },
    {
      id: 'linux-grep',
      title: 'grep',
      blocks: [
        { type: 'text', value: 'grep searches text line by line. It is one of the most used commands in development and operations.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `grep "error" app.log
grep -i "error" app.log       # ignore case
grep -n "error" app.log       # show line numbers
grep -r "TODO" src/           # search a directory
grep -v "debug" app.log       # invert the match` },
        { type: 'note', value: 'grep uses regular expressions by default in extended mode with -E. Start with plain text and add regex when needed.' },
      ],
    },
    {
      id: 'linux-wc-sort-uniq',
      title: 'wc, sort and uniq',
      blocks: [
        { type: 'text', value: 'wc counts lines, words and bytes. sort orders lines. uniq removes adjacent duplicates, so sort first.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `wc -l app.log
sort names.txt
sort names.txt | uniq
sort names.txt | uniq -c | sort -nr | head -n 5` },
        { type: 'list', items: [
          'wc -l counts lines',
          'sort -n sorts numbers',
          'uniq only removes adjacent duplicates',
          'uniq -c counts occurrences',
        ] },
      ],
    },
    {
      id: 'linux-cut-tr',
      title: 'cut and tr',
      blocks: [
        { type: 'text', value: 'cut selects fields from each line. tr translates or deletes characters. They are useful for simple CSV and log parsing.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `cut -d "," -f 1,3 users.csv
cut -c 1-10 app.log
tr '[:lower:]' '[:upper:]' < names.txt
tr -d '\\r' < windows.txt > unix.txt` },
        { type: 'note', value: 'For real CSV with quoted commas, use a proper parser. cut is fine for simple, well-formed data.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'viewing-files',
      q: 'Which command follows a log in real time?',
      options: ['cat -f', 'tail -f', 'head -f', 'less -f'],
      answer: 1,
      explain: 'tail -f waits for new lines appended to the file.',
    },
    {
      chapterId: 'viewing-files',
      q: 'What does grep -r do?',
      options: ['Reverses the match', 'Searches recursively', 'Reads a file', 'Removes lines'],
      answer: 1,
      explain: 'It walks a directory and searches every file.',
    },
    {
      chapterId: 'viewing-files',
      q: 'Why sort before uniq?',
      options: ['uniq needs sorted input to remove all duplicates', 'sort is faster', 'uniq only works on numbers', 'No reason'],
      answer: 0,
      explain: 'uniq compares adjacent lines, so duplicates must be grouped first.',
    },
    {
      chapterId: 'viewing-files',
      q: 'What does cut -d "," -f 1,3 do?',
      options: ['Sorts by columns', 'Selects fields 1 and 3 using comma as delimiter', 'Counts lines', 'Deletes columns'],
      answer: 1,
      explain: 'It extracts the chosen fields from each line.',
    },
  ],
};
