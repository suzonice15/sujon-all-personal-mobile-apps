// OS chapter: Filesystems.

export default {
  id: 'filesystems',
  title: 'Filesystems',
  description: 'Inodes, directories, permissions and journaling',
  icon: 'folder',
  lessons: [
    {
      id: 'os-inodes',
      title: 'Inodes and directories',
      blocks: [
        { type: 'text', value: 'A filesystem maps names to inodes. An inode stores metadata and data block pointers, not the name. A directory is a table of names and inode numbers.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ls -li
# inode number, permissions, owner, size, name

stat file.txt
df -h
du -sh .` },
        { type: 'note', value: 'A hard link is another name for the same inode. A symbolic link is a small file containing a path.' },
      ],
    },
    {
      id: 'os-permissions',
      title: 'Permissions',
      blocks: [
        { type: 'text', value: 'Unix permissions have owner, group and others with read, write and execute bits. Directories use execute to mean "can enter".' },
        { type: 'code', lang: 'bash', tryIt: false, value: `chmod 755 deploy.sh
chmod 600 id_rsa
chown app:app data/
umask 022` },
        { type: 'note', value: 'A private key with 644 is readable by every user on the machine. 600 is the correct default.' },
      ],
    },
    {
      id: 'os-journaling',
      title: 'Journaling and consistency',
      blocks: [
        { type: 'text', value: 'A journal records changes before they are applied. After a crash, the filesystem replays or discards the journal instead of scanning the whole disk.' },
        { type: 'list', items: [
          'Journaling improves crash recovery',
          'fsck checks and repairs',
          'A filesystem is not a backup',
          'Copy-on-write filesystems such as ZFS and Btrfs add snapshots',
          'Sync writes are slower but safer for critical data',
        ] },
        { type: 'note', value: 'Power loss can lose buffered writes. For a database, use the engine settings that match your durability requirement.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'filesystems',
      q: 'What does an inode store?',
      options: ['The filename', 'Metadata and data block pointers', 'Only permissions', 'The network'],
      answer: 1,
      explain: 'The name lives in the directory entry.',
    },
    {
      chapterId: 'filesystems',
      q: 'What does chmod 600 give?',
      options: ['Everyone read', 'Owner read and write only', 'Everyone execute', 'No access'],
      answer: 1,
      explain: 'It is private to the owner.',
    },
    {
      chapterId: 'filesystems',
      q: 'Why journaling?',
      options: ['To encrypt', 'To recover quickly after a crash', 'To compress', 'To network'],
      answer: 1,
      explain: 'The journal avoids a full disk scan.',
    },
  ],
};
