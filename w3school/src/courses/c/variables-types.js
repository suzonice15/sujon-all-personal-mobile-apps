// C chapter: Variables and Types.

export default {
  id: 'variables-types',
  title: 'Variables & Types',
  description: 'Integers, decimals, characters, sizeof and casting',
  icon: 'category',
  lessons: [
    {
      id: 'c-primitive-types',
      title: 'Primitive types',
      blocks: [
        { type: 'text', value: 'C types have a size that depends on the platform. int is usually 4 bytes, char is 1 byte, and double is usually 8. sizeof tells you the exact size on the current machine.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    int age = 21;
    float price = 99.5f;
    double ratio = 0.75;
    char grade = 'A';

    printf("%d %.1f %.2f %c\\n", age, price, ratio, grade);
    return 0;
}` },
        { type: 'list', items: [
          'char - one byte, also used for small integers',
          'short, int, long, long long - increasing integer sizes',
          'float, double - decimal numbers; double is more precise',
          'Use size_t for sizes and counts',
        ] },
      ],
    },
    {
      id: 'c-sizeof',
      title: 'sizeof',
      blocks: [
        { type: 'text', value: 'sizeof is evaluated by the compiler and returns the size in bytes. Use %zu for size_t in printf. Never hardcode a size when sizeof can compute it.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    int values[10];

    printf("int: %zu bytes\\n", sizeof(int));
    printf("double: %zu bytes\\n", sizeof(double));
    printf("array: %zu bytes\\n", sizeof(values));
    printf("elements: %zu\\n", sizeof(values) / sizeof(values[0]));
    return 0;
}` },
        { type: 'note', value: 'sizeof an array works only where the array type is visible. Inside a function that received the array as a parameter, it is just a pointer and sizeof returns the pointer size.' },
      ],
    },
    {
      id: 'c-constants-casting',
      title: 'Constants and casting',
      blocks: [
        { type: 'text', value: 'const makes a variable read-only. #define creates a textual constant before compilation. Casting converts between types, sometimes losing data.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

#define MAX_LESSONS 12

int main(void) {
    const double PI = 3.14159;
    int whole = (int) 9.7;

    printf("%d %d %.2f\\n", MAX_LESSONS, whole, PI);
    return 0;
}` },
        { type: 'note', value: 'Casting a double to int truncates. Use round() from math.h when you want rounding instead.' },
      ],
    },
    {
      id: 'c-format-specifiers',
      title: 'Format specifiers',
      blocks: [
        { type: 'list', items: [
          '%d - int',
          '%u - unsigned int',
          '%ld - long',
          '%f - float or double in printf',
          '%lf - double in scanf',
          '%c - char',
          '%s - string',
          '%zu - size_t',
          '%p - pointer address',
        ] },
        { type: 'text', value: 'A wrong specifier is undefined behaviour. printf may print garbage or crash. Match the type exactly, and enable -Wformat so the compiler checks.' },
        { type: 'note', value: 'In printf, float is promoted to double, so %f works for both. In scanf you must use %lf for double and %f for float.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'variables-types',
      q: 'Which operator returns the size of a type in bytes?',
      options: ['size()', 'sizeof', 'length', 'count'],
      answer: 1,
      explain: 'sizeof is a compile-time operator.',
    },
    {
      chapterId: 'variables-types',
      q: 'Which specifier prints size_t?',
      options: ['%d', '%zu', '%s', '%c'],
      answer: 1,
      explain: '%zu matches size_t.',
    },
    {
      chapterId: 'variables-types',
      q: 'What does (int) 9.7 produce?',
      options: ['10', '9', '9.7', 'An error'],
      answer: 1,
      explain: 'Casting truncates the fractional part.',
    },
    {
      chapterId: 'variables-types',
      q: 'Which is the safe way to get an array length?',
      options: ['sizeof(array) / sizeof(array[0])', 'array.length', 'length(array)', 'count(array)'],
      answer: 0,
      explain: 'This works where the array type is visible, not after it decays to a pointer.',
    },
  ],
};
