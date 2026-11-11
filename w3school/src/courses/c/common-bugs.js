// C chapter: Common Bugs.

export default {
  id: 'common-bugs',
  title: 'Common Bugs',
  description: 'Buffer overflows, off-by-one and undefined behaviour',
  icon: 'bug-report',
  lessons: [
    {
      id: 'c-buffer-overflow',
      title: 'Buffer overflow',
      blocks: [
        { type: 'text', value: 'Writing past the end of an array corrupts whatever is next in memory. It may crash, silently change another variable, or create a security hole. C never checks the bounds for you.' },
        { type: 'code', lang: 'c', tryIt: false, safe: false, value: `#include <stdio.h>
#include <string.h>

int main(void) {
    char name[5];

    // Bug: "Ayesha" needs 7 bytes including the null terminator.
    strcpy(name, "Ayesha");

    printf("%s\\n", name);
    return 0;
}` },
        { type: 'text', value: 'The fix is to size the buffer for the data plus the terminator, and to use a bounded copy such as snprintf. The safe code is shown in the Arrays & Strings chapter.' },
        { type: 'note', value: 'This is undefined behaviour. The program may appear to work on your machine and fail on another. That is why bounds matter.' },
      ],
    },
    {
      id: 'c-off-by-one',
      title: 'Off-by-one',
      blocks: [
        { type: 'text', value: 'The valid indices of an array of length n are 0 to n-1. A loop with <= n reads one element past the end.' },
        { type: 'code', lang: 'c', tryIt: false, safe: false, value: `#include <stdio.h>

int main(void) {
    int values[3] = {10, 20, 30};

    // Bug: i == 3 is out of bounds.
    for (int i = 0; i <= 3; i++) {
        printf("%d\\n", values[i]);
    }
    return 0;
}` },
        { type: 'text', value: 'Write loops as i < length. Use sizeof(array) / sizeof(array[0]) when the array type is visible, and pass the size explicitly to functions.' },
      ],
    },
    {
      id: 'c-uninitialized',
      title: 'Uninitialised variables',
      blocks: [
        { type: 'text', value: 'A local variable without an initialiser holds whatever was left on the stack. Reading it is undefined behaviour and can leak data from another function.' },
        { type: 'code', lang: 'c', tryIt: false, safe: false, value: `#include <stdio.h>

int main(void) {
    int value;

    // Bug: value has not been assigned.
    printf("%d\\n", value);
    return 0;
}` },
        { type: 'text', value: 'Initialise every variable at declaration: int value = 0;. For structs, use {0} to zero all fields. Compilers warn with -Wuninitialized in many cases.' },
        { type: 'note', value: 'malloc does not zero memory. Use calloc when you need zeroed bytes.' },
      ],
    },
    {
      id: 'c-format-string',
      title: 'Format strings and unsafe input',
      blocks: [
        { type: 'text', value: 'A wrong printf specifier is undefined behaviour. Passing user input as the format string is worse: the input can read memory with %s or %p. Always use a literal format.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    char name[20] = "Ayesha";

    // Safe: the format is a literal, the data is an argument.
    printf("%s\\n", name);
    return 0;
}` },
        { type: 'list', items: [
          'Never use gets; use fgets with a size',
          'Never pass user input as the printf format',
          'Use snprintf for bounded formatting',
          'Compile with -Wall -Wextra and treat warnings as errors',
          'Run AddressSanitizer while developing',
        ] },
        { type: 'note', value: 'Undefined behaviour is not "it works on my machine". It means the compiler may do anything, including remove the code you expected to run.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'common-bugs',
      q: 'What happens when you write past an array?',
      options: ['C resizes it', 'Undefined behaviour', 'A safe error', 'The array grows'],
      answer: 1,
      explain: 'C has no bounds checking, so the result is undefined.',
    },
    {
      chapterId: 'common-bugs',
      q: 'Which loop condition avoids an off-by-one?',
      options: ['i <= length', 'i < length', 'i <= length + 1', 'i != length'],
      answer: 1,
      explain: 'Indices run from 0 to length - 1.',
    },
    {
      chapterId: 'common-bugs',
      q: 'What does an uninitialised local contain?',
      options: ['Zero', 'Garbage from the stack', 'NULL', 'A compiler error always'],
      answer: 1,
      explain: 'The value is indeterminate and reading it is undefined behaviour.',
    },
    {
      chapterId: 'common-bugs',
      q: 'Why is gets unsafe?',
      options: ['It is slow', 'It does not take a buffer size', 'It only reads numbers', 'It is deprecated only'],
      answer: 1,
      explain: 'It can overflow any buffer. Use fgets instead.',
    },
  ],
};
