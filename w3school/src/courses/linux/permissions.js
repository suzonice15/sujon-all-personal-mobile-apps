// Linux chapter: Permissions.

export default {
  id: 'permissions',
  title: 'Permissions',
  description: 'Users, groups, rwx and safe sudo',
  icon: 'lock',
  lessons: [
    {
      id: 'linux-rwx',
      title: 'Reading permissions',
      blocks: [
        { type: 'text', value: 'Every file has an owner, a group and permissions for owner, group and others. ls -l shows them as rwx triples plus the file type.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ls -l
# -rw-r--r--  1 ayesha staff  1200 Jan 1 10:00 notes.txt
#  ^ ^  ^  ^
#  | |  |  +-- others: read
#  | |  +----- group: read
#  | +-------- owner: read, write
#  +---------- regular file` },
        { type: 'list', items: [
          'r - read (4)',
          'w - write (2)',
          'x - execute (1)',
          'd - directory',
          '- - regular file',
          'l - symbolic link',
        ] },
      ],
    },
    {
      id: 'linux-chmod',
      title: 'chmod',
      blocks: [
        { type: 'text', value: 'chmod changes permissions. Numeric mode adds the values for user, group and others. Symbolic mode is clearer for small changes.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `chmod 755 deploy.sh      # rwxr-xr-x
chmod 644 config.json    # rw-r--r--
chmod +x deploy.sh       # add execute for everyone
chmod u+w,g-w file.txt   # owner write, group no write` },
        { type: 'note', value: 'A script needs execute permission to run as ./script.sh. Running bash script.sh works without it, but the shebang path is then ignored.' },
      ],
    },
    {
      id: 'linux-chown-sudo',
      title: 'chown and sudo',
      blocks: [
        { type: 'text', value: 'chown changes the owner. chgrp changes the group. sudo runs a command as root, which is powerful and dangerous.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `sudo chown ayesha:staff app.log
sudo chgrp www-data uploads
sudo systemctl restart nginx` },
        { type: 'note', value: 'Avoid sudo when a normal user can do the job. Never run a downloaded script with sudo before reading it.' },
      ],
    },
    {
      id: 'linux-umask',
      title: 'umask and defaults',
      blocks: [
        { type: 'text', value: 'umask decides the default permissions for new files and directories. It masks bits from 666 for files and 777 for directories.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `umask          # e.g. 0022
umask 077      # new files private to the owner

touch private.txt
ls -l private.txt` },
        { type: 'note', value: 'A umask of 022 gives files 644 and directories 755. A umask of 077 gives files 600 and directories 700.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'permissions',
      q: 'What does the x permission allow?',
      options: ['Read', 'Write', 'Execute', 'Delete'],
      answer: 2,
      explain: 'Execute allows running a file as a program.',
    },
    {
      chapterId: 'permissions',
      q: 'What does chmod 755 give the owner?',
      options: ['Read only', 'Read and write only', 'Read, write and execute', 'No access'],
      answer: 2,
      explain: '7 = 4 + 2 + 1 = rwx.',
    },
    {
      chapterId: 'permissions',
      q: 'What does sudo do?',
      options: ['Copies files', 'Runs a command as root', 'Creates a user', 'Changes the shell'],
      answer: 1,
      explain: 'It elevates privileges for that command.',
    },
    {
      chapterId: 'permissions',
      q: 'What does a umask of 077 give new files?',
      options: ['600', '644', '755', '777'],
      answer: 0,
      explain: '666 minus 077 leaves 600, private to the owner.',
    },
  ],
};
