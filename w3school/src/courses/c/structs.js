// C chapter: Structs and Enums.

export default {
  id: 'structs',
  title: 'Structs & Enums',
  description: 'Group related data and name a set of values',
  icon: 'workspaces',
  lessons: [
    {
      id: 'c-struct-basics',
      title: 'Structs',
      blocks: [
        { type: 'text', value: 'A struct groups fields of different types into one value. Members are accessed with a dot. A struct is copied by value when assigned or passed to a function.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

struct Student {
    char name[20];
    int score;
};

int main(void) {
    struct Student student = {"Ayesha", 92};
    printf("%s %d\\n", student.name, student.score);
    return 0;
}` },
        { type: 'note', value: 'Names inside a struct do not collide with other structs. Use a descriptive name for the struct type.' },
      ],
    },
    {
      id: 'c-typedef',
      title: 'typedef',
      blocks: [
        { type: 'text', value: 'typedef creates an alias for a type. It removes the repeated struct keyword and is the usual style for public C types.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

int main(void) {
    Point point = {2, 3};
    printf("(%d, %d)\\n", point.x, point.y);
    return 0;
}` },
        { type: 'note', value: 'A typedef is not a new type; it is another name for the same type. The compiler still treats it structurally.' },
      ],
    },
    {
      id: 'c-array-of-structs',
      title: 'Arrays of structs',
      blocks: [
        { type: 'text', value: 'An array of structs stores records contiguously. Iterate and access fields with a dot. This is the basis of simple tables and in-memory databases.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

typedef struct {
    char title[20];
    int price;
} Course;

int main(void) {
    Course courses[2] = {{"SQL", 5000}, {"C", 3000}};

    for (int i = 0; i < 2; i++) {
        printf("%s %d\\n", courses[i].title, courses[i].price);
    }
    return 0;
}` },
      ],
    },
    {
      id: 'c-struct-pointers-enums',
      title: 'Struct pointers and enums',
      blocks: [
        { type: 'text', value: 'A pointer to a struct uses -> to access members. An enum names a set of integer constants, which makes code easier to read than magic numbers.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int score;
} Student;

typedef enum {
    PENDING,
    APPROVED,
    REJECTED
} Status;

int main(void) {
    Student *student = malloc(sizeof(Student));
    if (student == NULL) {
        return 1;
    }

    student->score = 92;
    Status status = APPROVED;

    printf("%d %d\\n", student->score, status);
    free(student);
    return 0;
}` },
        { type: 'note', value: 'student->score is shorthand for (*student).score. Both are correct; the arrow is easier to read.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'structs',
      q: 'How do you access a struct member from a value?',
      options: ['value->member', 'value.member', 'value[member]', 'value::member'],
      answer: 1,
      explain: 'Use a dot for a struct value and an arrow for a pointer.',
    },
    {
      chapterId: 'structs',
      q: 'What does typedef do?',
      options: ['Creates a new type', 'Creates an alias for a type', 'Allocates memory', 'Defines a function'],
      answer: 1,
      explain: 'It gives an existing type another name.',
    },
    {
      chapterId: 'structs',
      q: 'What is the value of the first enum constant by default?',
      options: ['1', '0', '-1', 'Random'],
      answer: 1,
      explain: 'Enum constants start at 0 unless assigned explicitly.',
    },
    {
      chapterId: 'structs',
      q: 'What does pointer->field do?',
      options: ['Same as (*pointer).field', 'Same as pointer.field', 'Frees the field', 'Creates a field'],
      answer: 0,
      explain: 'The arrow dereferences the pointer and accesses the member.',
    },
  ],
};
