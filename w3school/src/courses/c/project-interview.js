// C chapter: Project and Interview Practice.

export default {
  id: 'project-interview',
  title: 'Project & Interview Prep',
  description: 'Build a record system and a linked list in C',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'c-project-records',
      title: 'Project: student records',
      blocks: [
        { type: 'text', value: 'Build a small record system with a struct array. Calculate an average, find the best student, and filter by score. These are the building blocks of every data program.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[20];
    int score;
} Student;

int main(void) {
    Student students[3] = {
        {"Ayesha", 92},
        {"Rahim", 78},
        {"Nusrat", 88}
    };

    int total = 0;
    int best = 0;

    for (int i = 0; i < 3; i++) {
        total += students[i].score;
        if (students[i].score > students[best].score) {
            best = i;
        }
    }

    printf("average=%.1f\\n", total / 3.0);
    printf("best=%s\\n", students[best].name);
    return 0;
}` },
        { type: 'note', value: 'Store the index of the best record, not the record itself. Copying the whole struct is unnecessary work.' },
      ],
    },
    {
      id: 'c-project-linked-list',
      title: 'Project: linked list',
      blocks: [
        { type: 'text', value: 'A linked list node holds a value and a pointer to the next node. The list ends when next is NULL. Remember to free every node you allocate.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *create(int value) {
    Node *node = malloc(sizeof(Node));
    if (node == NULL) {
        return NULL;
    }
    node->value = value;
    node->next = NULL;
    return node;
}

int main(void) {
    Node *head = create(1);
    if (head == NULL) {
        return 1;
    }

    head->next = create(2);
    if (head->next == NULL) {
        free(head);
        return 1;
    }

    for (Node *current = head; current != NULL; current = current->next) {
        printf("%d ", current->value);
    }
    printf("\\n");

    free(head->next);
    free(head);
    return 0;
}` },
        { type: 'note', value: 'Free nodes in the reverse order or keep the next pointer before freeing the current node. Otherwise you use freed memory to find the next node.' },
      ],
    },
    {
      id: 'c-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the difference between malloc and calloc?',
          'What is a dangling pointer?',
          'Why is sizeof(array) wrong inside a function?',
          'What does undefined behaviour mean?',
          'How do you detect a memory leak?',
          'What is the difference between a struct and a union?',
          'How does a linked list differ from an array?',
          'What is a double free and why is it dangerous?',
          'How do you make a header safe to include twice?',
          'Why is strncpy still easy to misuse?',
        ] },
        { type: 'text', value: 'C interviews focus on memory and ownership. For every allocation, say who frees it. For every pointer, say whether it may be NULL. That discipline is the answer interviewers look for.' },
        { type: 'note', value: 'Practise with AddressSanitizer and valgrind. Seeing a real leak or overflow teaches more than memorising definitions.' },
      ],
    },
    {
      id: 'c-debug-tools',
      title: 'Debugging toolkit',
      blocks: [
        { type: 'code', lang: 'text', tryIt: false, value: `# Compile with warnings and sanitizers
gcc -Wall -Wextra -Werror -std=c17 -g \\
    -fsanitize=address,undefined main.c -o main

# Run under a debugger
gdb ./main

# Check for leaks on Linux
valgrind --leak-check=full ./main` },
        { type: 'list', items: [
          '-Wall -Wextra -Werror: catch suspicious code early',
          '-g: keep debug symbols',
          'AddressSanitizer: out-of-bounds and use-after-free',
          'UndefinedBehaviorSanitizer: signed overflow and bad shifts',
          'gdb: breakpoints and stack traces',
          'valgrind: leaks and invalid reads',
        ] },
        { type: 'note', value: 'A program that "works" without sanitizers may still be broken. Run the tools before you call it done.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'project-interview',
      q: 'Why keep the index of the best record?',
      options: ['It is shorter', 'It avoids copying the whole struct', 'It sorts the array', 'It frees memory'],
      answer: 1,
      explain: 'An index is enough to refer to the record later.',
    },
    {
      chapterId: 'project-interview',
      q: 'How does a linked list end?',
      options: ['With a zero value', 'With a NULL next pointer', 'With a length field', 'At the array end'],
      answer: 1,
      explain: 'The last node points to NULL.',
    },
    {
      chapterId: 'project-interview',
      q: 'Which tool detects use-after-free?',
      options: ['AddressSanitizer', 'Prettier', 'npm audit', 'javac'],
      answer: 0,
      explain: 'AddressSanitizer reports invalid memory access at runtime.',
    },
    {
      chapterId: 'project-interview',
      q: 'What should you state for every allocation?',
      options: ['Its color', 'Who frees it', 'Its file name', 'Its hash'],
      answer: 1,
      explain: 'Ownership makes leaks and double frees visible in review.',
    },
  ],
};
