// C chapter: Pointers.

export default {
  id: 'pointers',
  title: 'Pointers',
  description: 'Addresses, dereferencing and pointer arithmetic',
  icon: 'arrow-forward',
  lessons: [
    {
      id: 'c-pointer-basics',
      title: 'Address and dereference',
      blocks: [
        { type: 'text', value: 'A pointer stores a memory address. & takes the address of a variable, and * reads or writes the value at that address. A pointer type says how many bytes one step moves and how to interpret the data.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    int value = 42;
    int *pointer = &value;

    printf("%d %d\\n", value, *pointer);

    *pointer = 100;
    printf("%d\\n", value);
    return 0;
}` },
        { type: 'note', value: 'Dereferencing an invalid pointer is undefined behaviour. It may crash, or it may silently corrupt another variable.' },
      ],
    },
    {
      id: 'c-pointer-arithmetic',
      title: 'Pointer arithmetic',
      blocks: [
        { type: 'text', value: 'Adding 1 to an int pointer moves by sizeof(int) bytes, not one byte. Array indexing is defined as pointer arithmetic: values[i] is *(values + i).' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    int values[3] = {10, 20, 30};
    int *pointer = values;

    printf("%d %d %d\\n", *pointer, *(pointer + 1), *(pointer + 2));

    for (int i = 0; i < 3; i++) {
        printf("%d ", *(values + i));
    }
    printf("\\n");
    return 0;
}` },
        { type: 'note', value: 'Pointer arithmetic is only defined inside the same array (or one past the end). Moving outside it is undefined behaviour.' },
      ],
    },
    {
      id: 'c-null-pointers',
      title: 'NULL pointers',
      blocks: [
        { type: 'text', value: 'A pointer that does not point to anything should be NULL. Check before dereferencing. Functions that may fail, such as malloc, return NULL.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    int *pointer = NULL;

    if (pointer == NULL) {
        printf("No target\\n");
    }

    if (pointer != NULL) {
        printf("%d\\n", *pointer);
    }
    return 0;
}` },
        { type: 'note', value: 'NULL is not the same as an uninitialised pointer. An uninitialised pointer holds garbage and must never be dereferenced.' },
      ],
    },
    {
      id: 'c-arrays-decay',
      title: 'Arrays decay to pointers',
      blocks: [
        { type: 'text', value: 'When an array is passed to a function, it decays to a pointer to its first element. The function does not know the length, so pass the size as a second parameter.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

void printAll(int values[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", values[i]);
    }
    printf("\\n");
}

int main(void) {
    int values[3] = {1, 2, 3};
    printAll(values, 3);
    return 0;
}` },
        { type: 'note', value: 'Inside the function, sizeof(values) is the size of a pointer, not the array. This is why hardcoded sizeof tricks fail after the array decays.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'pointers',
      q: 'What does &value give you?',
      options: ['The value', 'The address of value', 'A copy of value', 'The size'],
      answer: 1,
      explain: 'The address-of operator returns a pointer to the variable.',
    },
    {
      chapterId: 'pointers',
      q: 'What does *pointer do?',
      options: ['Multiplies', 'Reads or writes the value at the address', 'Creates a pointer', 'Frees memory'],
      answer: 1,
      explain: 'Dereferencing accesses the pointed-to value.',
    },
    {
      chapterId: 'pointers',
      q: 'Adding 1 to an int pointer moves by how many bytes?',
      options: ['1', '2', 'sizeof(int)', '4 always'],
      answer: 2,
      explain: 'Pointer arithmetic is scaled by the pointed-to type.',
    },
    {
      chapterId: 'pointers',
      q: 'What does an array become when passed to a function?',
      options: ['A copy', 'A pointer to its first element', 'A string', 'A struct'],
      answer: 1,
      explain: 'Arrays decay to pointers; the length is lost.',
    },
  ],
};
