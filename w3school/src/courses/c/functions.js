// C chapter: Functions.

export default {
  id: 'functions',
  title: 'Functions',
  description: 'Declarations, parameters, pointers and recursion',
  icon: 'functions',
  lessons: [
    {
      id: 'c-function-basics',
      title: 'Function basics',
      blocks: [
        { type: 'text', value: 'A function has a return type, a name and a parameter list. Define it before main, or declare a prototype before main and define it later.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main(void) {
    printf("%d\\n", add(2, 3));
    return 0;
}` },
        { type: 'note', value: 'A function with no parameters is written (void), not (). In C, () means "unspecified parameters", which disables type checking at the call site.' },
      ],
    },
    {
      id: 'c-prototypes',
      title: 'Prototypes',
      blocks: [
        { type: 'text', value: 'A prototype tells the compiler the function signature before its definition. This lets main call a function that is defined later and lets the compiler check the arguments.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int square(int value);

int main(void) {
    printf("%d\\n", square(5));
    return 0;
}

int square(int value) {
    return value * value;
}` },
        { type: 'note', value: 'Put prototypes in a header file when several .c files use the function. That is how a C project shares code.' },
      ],
    },
    {
      id: 'c-pass-by-value',
      title: 'Pass by value and pointers',
      blocks: [
        { type: 'text', value: 'C passes every argument by value. To let a function change a caller\'s variable, pass its address and dereference the pointer inside.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

void change(int *value) {
    *value = 99;
}

int main(void) {
    int number = 5;
    change(&number);
    printf("%d\\n", number);
    return 0;
}` },
        { type: 'note', value: 'Arrays are the exception in practice: passing an array passes a pointer to its first element, so the function can modify the elements. The size must be passed separately.' },
      ],
    },
    {
      id: 'c-recursion',
      title: 'Recursion',
      blocks: [
        { type: 'text', value: 'A recursive function calls itself with a smaller input and stops at a base case. Every call uses stack space, so deep recursion can overflow the stack.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main(void) {
    printf("%d\\n", factorial(5));
    return 0;
}` },
        { type: 'note', value: 'C does not guarantee tail-call optimisation. For deep recursion, rewrite with a loop or an explicit stack.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'functions',
      q: 'What does a prototype do?',
      options: ['Runs the function', 'Declares the function signature before its definition', 'Allocates memory', 'Creates a header'],
      answer: 1,
      explain: 'It lets the compiler check calls before the definition is seen.',
    },
    {
      chapterId: 'functions',
      q: 'How does C pass arguments?',
      options: ['By reference', 'By value', 'By name', 'By pointer always'],
      answer: 1,
      explain: 'Every argument is copied; pass a pointer to modify the caller\'s variable.',
    },
    {
      chapterId: 'functions',
      q: 'What does void in a parameter list mean?',
      options: ['Any parameters', 'No parameters', 'One pointer', 'A return value'],
      answer: 1,
      explain: 'void explicitly means the function takes no arguments.',
    },
    {
      chapterId: 'functions',
      q: 'What is the risk of deep recursion?',
      options: ['A compile error', 'Stack overflow', 'A memory leak', 'Slow printing'],
      answer: 1,
      explain: 'Each call consumes stack space until the limit is reached.',
    },
  ],
};
