// C chapter: Operators and Control Flow.

export default {
  id: 'operators-control',
  title: 'Operators & Control Flow',
  description: 'Arithmetic, conditions, switch and loops',
  icon: 'call-split',
  lessons: [
    {
      id: 'c-operators',
      title: 'Operators',
      blocks: [
        { type: 'text', value: 'Arithmetic is +, -, *, / and %. Integer division drops the remainder. Comparison returns 0 for false and 1 for true. C has no boolean type in older standards; use stdbool.h for bool.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    int a = 7;
    int b = 3;

    printf("%d %d %d\\n", a + b, a / b, a % b);
    printf("%d\\n", a > b);
    return 0;
}` },
        { type: 'note', value: 'A single = assigns; == compares. The compiler warns about accidental assignment in a condition with -Wall, but do not rely on it.' },
      ],
    },
    {
      id: 'c-if-else',
      title: 'if and else',
      blocks: [
        { type: 'text', value: 'Any non-zero value is true, including negative numbers. Always use braces when the body is more than one line, and compare pointers with NULL explicitly.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    int score = 82;

    if (score >= 80) {
        printf("A\\n");
    } else if (score >= 60) {
        printf("B\\n");
    } else {
        printf("F\\n");
    }
    return 0;
}` },
      ],
    },
    {
      id: 'c-switch',
      title: 'switch',
      blocks: [
        { type: 'text', value: 'switch compares an integer or char against case labels. Without break, execution falls through to the next case. Sometimes fall-through is intentional, so comment it.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    char grade = 'B';

    switch (grade) {
        case 'A':
            printf("Excellent\\n");
            break;
        case 'B':
            printf("Good\\n");
            break;
        default:
            printf("Keep going\\n");
    }
    return 0;
}` },
        { type: 'note', value: 'A missing break is one of the most common C bugs. The compiler can warn with -Wimplicit-fallthrough.' },
      ],
    },
    {
      id: 'c-loops',
      title: 'Loops',
      blocks: [
        { type: 'text', value: 'for is best for a known count. while checks before the body. do/while checks after, so it runs at least once. break exits; continue skips to the next iteration.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 3; i++) {
        printf("i=%d\\n", i);
    }

    int n = 3;
    while (n > 0) {
        printf("n=%d\\n", n);
        n--;
    }
    return 0;
}` },
        { type: 'note', value: 'Declaring int i inside the for header requires C99 or later. Use -std=c17 and you are fine.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'operators-control',
      q: 'What is 7 / 3 for two ints?',
      options: ['2.33', '2', '3', 'An error'],
      answer: 1,
      explain: 'Integer division drops the fractional part.',
    },
    {
      chapterId: 'operators-control',
      q: 'What does a missing break do in switch?',
      options: ['Stops the program', 'Falls through to the next case', 'Returns 0', 'Skips the switch'],
      answer: 1,
      explain: 'Execution continues into the next case label.',
    },
    {
      chapterId: 'operators-control',
      q: 'Which loop always runs at least once?',
      options: ['for', 'while', 'do/while', 'switch'],
      answer: 2,
      explain: 'do/while checks its condition after the body.',
    },
    {
      chapterId: 'operators-control',
      q: 'What is the difference between = and ==?',
      options: ['None', '= assigns, == compares', '== assigns', '= compares'],
      answer: 1,
      explain: 'Mixing them is a common bug; -Wall warns about it in conditions.',
    },
  ],
};
