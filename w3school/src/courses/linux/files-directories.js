// Linux chapter: Files and Directories.

export default {
  id: 'files-directories',
  title: 'Files & Directories',
  description: 'Navigate, create, copy, move and delete',
  icon: 'folder',
  lessons: [
    {
      id: 'linux-navigate',
      title: 'Navigating',
      blocks: [
        { type: 'text', value: 'Linux has a single tree that starts at /. Your home directory is ~. A path starting with / is absolute; everything else is relative to the current directory.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `pwd
ls            # list names
ls -la        # long format, including hidden files
cd /etc       # absolute path
cd ~          # home directory
cd ..         # parent directory
cd -          # previous directory` },
        { type: 'note', value: 'A name starting with a dot is hidden. . is the current directory and .. is the parent.' },
      ],
    },
    {
      id: 'linux-create-delete',
      title: 'Create, copy and delete',
      blocks: [
        { type: 'text', value: 'mkdir creates directories, touch creates empty files, cp copies, mv moves or renames, and rm removes. rm does not use a trash bin.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `mkdir -p projects/api
touch projects/api/index.js
cp projects/api/index.js projects/api/index.backup.js
mv projects/api/index.backup.js projects/api/old.js
rm projects/api/old.js

# Copy or remove a directory recursively
cp -r projects projects-backup
rm -r projects-backup` },
        { type: 'note', value: 'Double-check the path before rm -r. There is no undo. Use rm -i for a confirmation prompt on important files.' },
      ],
    },
    {
      id: 'linux-find',
      title: 'Finding files',
      blocks: [
        { type: 'text', value: 'find walks a directory tree. which shows the path of an executable. locate searches an index and is faster but may be stale.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `find . -name "*.js"
find . -type d -name node_modules
find . -size +10M

which node
which python3` },
        { type: 'list', items: [
          'find is precise and works everywhere',
          'locate needs updatedb to refresh its index',
          'which searches PATH, not the whole disk',
          'Use -maxdepth to avoid scanning too deep',
        ] },
      ],
    },
    {
      id: 'linux-paths',
      title: 'Useful path tricks',
      blocks: [
        { type: 'text', value: 'Brace expansion creates several paths at once. Tilde expands to your home directory. Spaces in names need quoting.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `mkdir -p src/{components,pages,utils}
touch "my notes.txt"
ls src
cat "my notes.txt"` },
        { type: 'note', value: 'Always quote paths that may contain spaces: "$file", not $file. Unquoted paths are split into separate arguments.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'files-directories',
      q: 'What is the root of the Linux file tree?',
      options: ['C:\\', '/', '~', '.'],
      answer: 1,
      explain: 'Everything starts at the root directory /.',
    },
    {
      chapterId: 'files-directories',
      q: 'Which command creates a directory and its parents?',
      options: ['mkdir -p', 'touch -p', 'cp -r', 'rm -r'],
      answer: 0,
      explain: 'mkdir -p creates missing parent directories.',
    },
    {
      chapterId: 'files-directories',
      q: 'What does rm -r do?',
      options: ['Removes a file only', 'Removes a directory recursively', 'Renames a file', 'Reads a file'],
      answer: 1,
      explain: 'It deletes the directory and everything inside it.',
    },
    {
      chapterId: 'files-directories',
      q: 'Why quote a path with spaces?',
      options: ['To make it executable', 'To keep it as one argument', 'To hide it', 'To compress it'],
      answer: 1,
      explain: 'Unquoted spaces split the path into multiple arguments.',
    },
  ],
};
