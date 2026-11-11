// C chapter: Files.

export default {
  id: 'files',
  title: 'Files',
  description: 'Read, write and check errors with stdio',
  icon: 'folder',
  lessons: [
    {
      id: 'c-file-write',
      title: 'Writing a file',
      blocks: [
        { type: 'text', value: 'fopen opens a file and returns a FILE pointer, or NULL on failure. Always check it. fclose flushes and releases the handle.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    FILE *file = fopen("demo.txt", "w");
    if (file == NULL) {
        printf("Cannot open file\\n");
        return 1;
    }

    fprintf(file, "Hello, file!\\n");
    fclose(file);
    return 0;
}` },
        { type: 'note', value: 'Modes: "w" overwrites, "a" appends, "r" reads, "rb" and "wb" are binary. Forgetting fclose can lose buffered data.' },
      ],
    },
    {
      id: 'c-file-read',
      title: 'Reading a file',
      blocks: [
        { type: 'text', value: 'fgets reads one line into a buffer and stops at the size limit or newline. It returns NULL at end of file or on error. This is safer than gets, which does not take a size.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    char line[100];
    FILE *file = fopen("demo.txt", "r");
    if (file == NULL) {
        printf("Cannot open file\\n");
        return 1;
    }

    while (fgets(line, sizeof(line), file) != NULL) {
        printf("%s", line);
    }

    fclose(file);
    return 0;
}` },
        { type: 'note', value: 'A line longer than the buffer is split across multiple fgets calls. Check whether the last character is a newline if that matters.' },
      ],
    },
    {
      id: 'c-binary-files',
      title: 'Binary files',
      blocks: [
        { type: 'text', value: 'fwrite and fread copy raw bytes. The file is not portable across architectures if it contains structs with padding or different endianness. For portable data, use a text format.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

typedef struct {
    int id;
    double score;
} Record;

int main(void) {
    Record out = {1, 92.5};
    FILE *file = fopen("record.bin", "wb");
    if (file == NULL) {
        return 1;
    }
    fwrite(&out, sizeof(out), 1, file);
    fclose(file);

    Record in;
    file = fopen("record.bin", "rb");
    if (file == NULL) {
        return 1;
    }
    fread(&in, sizeof(in), 1, file);
    fclose(file);

    printf("%d %.1f\\n", in.id, in.score);
    return 0;
}` },
        { type: 'note', value: 'Always check the return value of fwrite and fread. A partial read or a full disk is a real failure, not a theoretical one.' },
      ],
    },
    {
      id: 'c-file-errors',
      title: 'File errors',
      blocks: [
        { type: 'list', items: [
          'fopen returns NULL: the path, permission or disk is the problem',
          'fgets returns NULL: end of file or read error',
          'fwrite returns fewer items than requested: the write failed',
          'Use perror or strerror(errno) to see the system message',
          'Close the file on every path, including error paths',
        ] },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <errno.h>
#include <string.h>

int main(void) {
    FILE *file = fopen("missing.txt", "r");
    if (file == NULL) {
        printf("Error: %s\\n", strerror(errno));
        return 1;
    }

    fclose(file);
    return 0;
}` },
        { type: 'note', value: 'perror prints the message for the current errno. Include errno.h and string.h when you use it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'files',
      q: 'What does fopen return on failure?',
      options: ['0', 'NULL', '-1', 'An empty file'],
      answer: 1,
      explain: 'Check for NULL before using the FILE pointer.',
    },
    {
      chapterId: 'files',
      q: 'Which function reads a line safely?',
      options: ['gets', 'fgets', 'scanf only', 'readLine'],
      answer: 1,
      explain: 'fgets takes the buffer size and cannot overflow it in the same way.',
    },
    {
      chapterId: 'files',
      q: 'What must you do with an open file?',
      options: ['Nothing', 'fclose it', 'free it', 'Delete it'],
      answer: 1,
      explain: 'fclose flushes buffers and releases the handle.',
    },
    {
      chapterId: 'files',
      q: 'Why can a struct written with fwrite be non-portable?',
      options: ['It is too large', 'Padding and endianness differ between systems', 'C cannot write structs', 'It is encrypted'],
      answer: 1,
      explain: 'Raw struct bytes depend on the ABI and byte order.',
    },
  ],
};
