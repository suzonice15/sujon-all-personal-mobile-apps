// C chapter: Dynamic Memory.

export default {
  id: 'memory',
  title: 'Dynamic Memory',
  description: 'malloc, calloc, realloc and the rules of free',
  icon: 'memory',
  lessons: [
    {
      id: 'c-malloc',
      title: 'malloc',
      blocks: [
        { type: 'text', value: 'malloc reserves a block of bytes on the heap and returns a pointer, or NULL if it fails. Check the result before using it. free releases the block when you are done.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *values = malloc(3 * sizeof(int));
    if (values == NULL) {
        return 1;
    }

    for (int i = 0; i < 3; i++) {
        values[i] = (i + 1) * 10;
    }

    for (int i = 0; i < 3; i++) {
        printf("%d ", values[i]);
    }
    printf("\\n");

    free(values);
    return 0;
}` },
        { type: 'note', value: 'Always multiply by sizeof(type). malloc(3) allocates three bytes, not three integers.' },
      ],
    },
    {
      id: 'c-calloc-realloc',
      title: 'calloc and realloc',
      blocks: [
        { type: 'text', value: 'calloc zeroes the memory, which avoids reading uninitialised values. realloc grows or shrinks a block. Assign realloc to a temporary first: on failure it returns NULL and the original block must still be freed.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *values = calloc(3, sizeof(int));
    if (values == NULL) {
        return 1;
    }

    int *bigger = realloc(values, 5 * sizeof(int));
    if (bigger == NULL) {
        free(values);
        return 1;
    }
    values = bigger;

    values[4] = 50;
    printf("%d\\n", values[4]);

    free(values);
    return 0;
}` },
        { type: 'note', value: 'values = realloc(values, ...) leaks the original block when realloc fails. Always use a temporary.' },
      ],
    },
    {
      id: 'c-free-rules',
      title: 'The rules of free',
      blocks: [
        { type: 'list', items: [
          'Every malloc, calloc or realloc result must be freed exactly once',
          'Never free memory you did not allocate',
          'Never use memory after free',
          'Set the pointer to NULL after free to catch double frees',
          'Do not free stack memory or string literals',
        ] },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = malloc(sizeof(int));
    if (data == NULL) {
        return 1;
    }

    *data = 7;
    printf("%d\\n", *data);

    free(data);
    data = NULL;
    return 0;
}` },
        { type: 'note', value: 'A memory leak is memory that is never freed. The program still runs, but its memory use grows until the system kills it.' },
      ],
    },
    {
      id: 'c-stack-heap',
      title: 'Stack versus heap',
      blocks: [
        { type: 'list', items: [
          'Stack: automatic, fast, freed when the function returns',
          'Heap: manual, larger, freed only by free',
          'Returning a pointer to a local variable is a dangling pointer',
          'Returning heap memory is fine if the caller frees it',
        ] },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <stdlib.h>

int *makeValue(void) {
    int *value = malloc(sizeof(int));
    if (value == NULL) {
        return NULL;
    }
    *value = 42;
    return value;
}

int main(void) {
    int *value = makeValue();
    if (value == NULL) {
        return 1;
    }
    printf("%d\\n", *value);
    free(value);
    return 0;
}` },
        { type: 'note', value: 'If a function returns heap memory, document that the caller owns it and must free it. Ownership must be explicit in C.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'memory',
      q: 'What does malloc return on failure?',
      options: ['0', 'NULL', '-1', 'A random pointer'],
      answer: 1,
      explain: 'Always check for NULL before using the result.',
    },
    {
      chapterId: 'memory',
      q: 'What is the difference between malloc and calloc?',
      options: ['calloc zeroes the memory', 'malloc is slower', 'calloc cannot fail', 'They are identical'],
      answer: 0,
      explain: 'calloc sets every byte to zero.',
    },
    {
      chapterId: 'memory',
      q: 'Why assign realloc to a temporary?',
      options: ['For speed', 'To avoid leaking the original block on failure', 'To zero the memory', 'To free it twice'],
      answer: 1,
      explain: 'If realloc fails, the original pointer is still valid and must be freed.',
    },
    {
      chapterId: 'memory',
      q: 'What is a dangling pointer?',
      options: ['A pointer to freed memory', 'A NULL pointer', 'A pointer to an array', 'A pointer to a function'],
      answer: 0,
      explain: 'Using it after free is undefined behaviour.',
    },
  ],
};
