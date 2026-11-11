// C chapter: Arrays and Strings.

export default {
  id: 'arrays-strings',
  title: 'Arrays & Strings',
  description: 'Fixed arrays, C strings and safe copying',
  icon: 'view-column',
  lessons: [
    {
      id: 'c-arrays',
      title: 'Arrays',
      blocks: [
        { type: 'text', value: 'A C array is a contiguous block of elements. The length is fixed at declaration, and there is no bounds check. Reading or writing past the end is undefined behaviour.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    int scores[3] = {85, 92, 78};
    int total = 0;

    for (int i = 0; i < 3; i++) {
        total += scores[i];
    }

    printf("total=%d avg=%.1f\\n", total, total / 3.0);
    return 0;
}` },
        { type: 'note', value: 'The valid indices are 0 to length - 1. Loop with i < length, never i <= length.' },
      ],
    },
    {
      id: 'c-strings',
      title: 'C strings',
      blocks: [
        { type: 'text', value: 'A C string is a char array ending with a null terminator \'\\0\'. The length in the array must include space for that terminator. string.h provides strlen, strcmp and strcpy.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <string.h>

int main(void) {
    char name[20] = "Ayesha";

    printf("%s has %zu letters\\n", name, strlen(name));
    printf("compare: %d\\n", strcmp(name, "Ayesha"));
    return 0;
}` },
        { type: 'note', value: 'strcmp returns 0 when strings are equal, not 1. Never compare strings with ==; that compares addresses.' },
      ],
    },
    {
      id: 'c-safe-copy',
      title: 'Safe copying',
      blocks: [
        { type: 'text', value: 'strcpy does not know the destination size and can overflow it. Use snprintf or strncpy with an explicit terminator. snprintf is usually the simplest safe choice.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <string.h>

int main(void) {
    char source[] = "SQL";
    char target[10];

    snprintf(target, sizeof(target), "%s", source);
    printf("%s\\n", target);
    return 0;
}` },
        { type: 'note', value: 'Never use gets. It cannot know the buffer size and was removed from the C standard. Prefer fgets for input.' },
      ],
    },
    {
      id: 'c-2d-arrays',
      title: '2D arrays',
      blocks: [
        { type: 'text', value: 'A 2D array is an array of arrays. It is stored row by row in memory, which is why looping row then column is cache friendly.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    int grid[2][2] = {{1, 2}, {3, 4}};

    for (int row = 0; row < 2; row++) {
        for (int col = 0; col < 2; col++) {
            printf("%d ", grid[row][col]);
        }
        printf("\\n");
    }
    return 0;
}` },
        { type: 'note', value: 'When passing a 2D array to a function, the column count is part of the type: void print(int grid[][2], int rows).' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'arrays-strings',
      q: 'What is the last valid index of int a[5]?',
      options: ['5', '4', '6', '0'],
      answer: 1,
      explain: 'Indices run from 0 to length - 1, so 4.',
    },
    {
      chapterId: 'arrays-strings',
      q: 'What ends a C string?',
      options: ['A newline', 'A null terminator', 'A space', 'The array length'],
      answer: 1,
      explain: 'The zero byte \\0 marks the end.',
    },
    {
      chapterId: 'arrays-strings',
      q: 'Why is strcpy dangerous?',
      options: ['It is slow', 'It does not know the destination size', 'It changes the source', 'It only copies numbers'],
      answer: 1,
      explain: 'A long source can overflow the destination buffer.',
    },
    {
      chapterId: 'arrays-strings',
      q: 'What does strcmp return for equal strings?',
      options: ['1', '0', '-1', 'true'],
      answer: 1,
      explain: 'Zero means the contents are equal.',
    },
  ],
};
