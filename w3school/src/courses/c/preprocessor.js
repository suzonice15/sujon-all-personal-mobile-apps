// C chapter: The Preprocessor.

export default {
  id: 'preprocessor',
  title: 'The Preprocessor',
  description: 'Macros, headers and conditional compilation',
  icon: 'settings',
  lessons: [
    {
      id: 'c-define',
      title: '#define',
      blocks: [
        { type: 'text', value: 'The preprocessor runs before the compiler. #define creates a textual replacement. It has no type checking, so prefer const or enum where possible.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

#define MAX_LESSONS 12

int main(void) {
    printf("%d\\n", MAX_LESSONS);
    return 0;
}` },
        { type: 'note', value: 'Because #define is textual, a typo can produce a confusing error far from the definition. Use it for constants and include guards, not for complex logic.' },
      ],
    },
    {
      id: 'c-macro-pitfalls',
      title: 'Macro pitfalls',
      blocks: [
        { type: 'text', value: 'A macro argument is substituted as text, not evaluated as a value. Parenthesise every parameter and the whole expression, or the precedence rules will surprise you.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

#define BAD_SQUARE(x) x * x
#define GOOD_SQUARE(x) ((x) * (x))

int main(void) {
    printf("%d\\n", BAD_SQUARE(2 + 1));
    printf("%d\\n", GOOD_SQUARE(2 + 1));
    return 0;
}` },
        { type: 'text', value: 'BAD_SQUARE(2 + 1) expands to 2 + 1 * 2 + 1, which is 5, not 9. GOOD_SQUARE expands to ((2 + 1) * (2 + 1)), which is 9. This is why macros are dangerous.' },
        { type: 'note', value: 'Prefer an inline function for anything with logic. The compiler can type-check and debug an inline function; it cannot do either for a macro.' },
      ],
    },
    {
      id: 'c-header-guard',
      title: 'Header guards',
      blocks: [
        { type: 'text', value: 'A header included twice would define the same types twice. A guard makes the second include a no-op. Modern compilers also support #pragma once, which is shorter but not standard C.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#ifndef COURSE_H
#define COURSE_H

int add(int a, int b);

#endif` },
        { type: 'note', value: 'Put declarations in the header and definitions in a .c file. Including a .c file is almost always a mistake.' },
      ],
    },
    {
      id: 'c-conditional-compilation',
      title: 'Conditional compilation',
      blocks: [
        { type: 'text', value: '#if, #ifdef and #ifndef include or exclude code before compilation. Use them for platform-specific code and debug-only logging.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

#define DEBUG 1

int main(void) {
#if DEBUG
    printf("debug build\\n");
#else
    printf("release build\\n");
#endif
    return 0;
}` },
        { type: 'note', value: 'Do not hide large amounts of logic behind #ifdef. It makes the code hard to read and easy to break. Keep platform differences small and behind a small interface.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'preprocessor',
      q: 'When does the preprocessor run?',
      options: ['At runtime', 'Before compilation', 'After linking', 'Only in debug builds'],
      answer: 1,
      explain: 'It transforms the source text before the compiler sees it.',
    },
    {
      chapterId: 'preprocessor',
      q: 'Why is #define BAD_SQUARE(x) x * x wrong?',
      options: ['It is too slow', 'The argument is substituted without parentheses', 'It cannot take numbers', 'It needs a semicolon'],
      answer: 1,
      explain: 'Operator precedence changes the result for expressions like 2 + 1.',
    },
    {
      chapterId: 'preprocessor',
      q: 'What is a header guard for?',
      options: ['To encrypt the header', 'To prevent double inclusion', 'To compile faster', 'To link libraries'],
      answer: 1,
      explain: 'It makes the second include of the same header harmless.',
    },
    {
      chapterId: 'preprocessor',
      q: 'What is a safer alternative to a function-like macro?',
      options: ['A global variable', 'An inline function', 'A comment', 'A typedef'],
      answer: 1,
      explain: 'An inline function is type-checked and debuggable.',
    },
  ],
};
