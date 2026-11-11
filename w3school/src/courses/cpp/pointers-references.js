// C++ chapter: Pointers and References.

export default {
  id: 'pointers-references',
  title: 'Pointers & References',
  description: 'Addresses, dereferencing, references and nullptr',
  icon: 'arrow-forward',
  lessons: [
    {
      id: 'cpp-pointers',
      title: 'Pointers',
      blocks: [
        { type: 'text', value: 'A pointer stores an address. & takes an address, * dereferences it. Prefer nullptr over NULL or 0 for an empty pointer.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int main() {
    int value = 42;
    int *pointer = &value;

    std::cout << value << " " << *pointer << "\\n";
    *pointer = 100;
    std::cout << value << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Dereferencing a null or dangling pointer is undefined behaviour. Check before use and set a pointer to nullptr after deleting it.' },
      ],
    },
    {
      id: 'cpp-references-intro',
      title: 'References',
      blocks: [
        { type: 'text', value: 'A reference is an alias, not a separate object. It must be initialised and cannot be reseated to another variable. References are safer than pointers when null is not allowed.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int main() {
    int value = 10;
    int &ref = value;

    ref = 20;
    std::cout << value << " " << ref << "\\n";
    return 0;
}` },
        { type: 'note', value: 'A reference parameter documents that the argument must exist. A pointer parameter documents that null is possible.' },
      ],
    },
    {
      id: 'cpp-const-refs',
      title: 'const references',
      blocks: [
        { type: 'text', value: 'A const reference gives read-only access without copying. It is the default way to pass large objects such as strings and vectors.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>
#include <vector>

void printAll(const std::vector<std::string> &names) {
    for (const auto &name : names) {
        std::cout << name << " ";
    }
    std::cout << "\\n";
}

int main() {
    std::vector<std::string> names = {"Ayesha", "Rahim"};
    printAll(names);
    return 0;
}` },
      ],
    },
    {
      id: 'cpp-pointer-arithmetic',
      title: 'Pointer arithmetic',
      blocks: [
        { type: 'text', value: 'Adding 1 to an int pointer moves by sizeof(int) bytes. Pointer arithmetic is defined only within an array or one past the end. Most modern C++ avoids it in favour of iterators.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int main() {
    int values[3] = {10, 20, 30};
    int *pointer = values;

    std::cout << *pointer << " " << *(pointer + 1) << " " << *(pointer + 2) << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Use iterators or range-based for instead of raw pointer arithmetic. They express intent and work with containers that are not contiguous.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'pointers-references',
      q: 'What does &value give you?',
      options: ['The value', 'The address of value', 'A copy', 'The size'],
      answer: 1,
      explain: 'The address-of operator returns a pointer.',
    },
    {
      chapterId: 'pointers-references',
      q: 'What must a reference be?',
      options: ['Null', 'Initialised', 'Static', 'Global'],
      answer: 1,
      explain: 'A reference must bind to an object when it is created.',
    },
    {
      chapterId: 'pointers-references',
      q: 'Why use const T& for a large parameter?',
      options: ['To modify it', 'To avoid a copy and prevent modification', 'To make it a pointer', 'To allocate it'],
      answer: 1,
      explain: 'It is read-only and copy-free.',
    },
    {
      chapterId: 'pointers-references',
      q: 'What should an empty pointer be?',
      options: ['0', 'NULL only', 'nullptr', 'An uninitialised value'],
      answer: 2,
      explain: 'nullptr is type-safe and the modern C++ choice.',
    },
  ],
};
