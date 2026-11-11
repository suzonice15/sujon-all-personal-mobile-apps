// C++ chapter: Variables and Types.

export default {
  id: 'variables-types',
  title: 'Variables & Types',
  description: 'Built-in types, auto, const, references and std::string',
  icon: 'category',
  lessons: [
    {
      id: 'cpp-types',
      title: 'Built-in types',
      blocks: [
        { type: 'text', value: 'C++ keeps the C numeric types and adds bool, references and the std::string class. Use std::string instead of char arrays for text.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>

int main() {
    int age = 21;
    double price = 99.5;
    bool active = true;
    std::string name = "Ayesha";
    auto city = std::string("Dhaka");

    std::cout << name << " " << age << " " << price
              << " " << active << " " << city << "\\n";
    return 0;
}` },
        { type: 'note', value: 'auto deduces the type from the initialiser. It is still static typing: the type is fixed at compile time and cannot change later.' },
      ],
    },
    {
      id: 'cpp-const-basics',
      title: 'const and references',
      blocks: [
        { type: 'text', value: 'A reference is another name for an existing variable. const makes a value read-only. A const reference lets a function read an object without copying it or modifying it.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>

void printName(const std::string &name) {
    std::cout << name << "\\n";
}

int main() {
    int value = 10;
    int &ref = value;
    ref = 20;

    const int limit = 100;
    printName("Ayesha");

    std::cout << value << " " << limit << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Pass large objects as const T& to avoid a copy. Pass small types such as int by value. A reference must be initialised and cannot be reseated.' },
      ],
    },
    {
      id: 'cpp-casts',
      title: 'Casts',
      blocks: [
        { type: 'text', value: 'C++ provides named casts: static_cast for safe conversions, dynamic_cast for polymorphic types, const_cast to remove const, and reinterpret_cast for low-level reinterpretation.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int main() {
    double decimal = 9.7;
    int narrowed = static_cast<int>(decimal);
    int whole = 5;
    double widened = static_cast<double>(whole);

    std::cout << narrowed << " " << widened << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Prefer static_cast over a C-style cast. Named casts are searchable and state the intent, which matters in code review.' },
      ],
    },
    {
      id: 'cpp-string',
      title: 'std::string',
      blocks: [
        { type: 'text', value: 'std::string manages its own memory and grows automatically. It supports +, size(), substr(), find() and comparison with ==.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>

int main() {
    std::string first = "Code";
    std::string second = "Nest";
    std::string full = first + second;

    std::cout << full << "\\n";
    std::cout << full.size() << "\\n";
    std::cout << full.substr(0, 4) << "\\n";
    return 0;
}` },
        { type: 'note', value: 'std::string is not null-terminated in the C sense for its API, but c_str() returns a null-terminated view for C functions.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'variables-types',
      q: 'What does auto do?',
      options: ['Makes the variable dynamic', 'Deduces the type from the initialiser', 'Removes the type', 'Creates a reference'],
      answer: 1,
      explain: 'auto is compile-time type deduction, not dynamic typing.',
    },
    {
      chapterId: 'variables-types',
      q: 'Why pass a large object as const T&?',
      options: ['To modify it', 'To avoid a copy and prevent modification', 'To make it global', 'To allocate it on the heap'],
      answer: 1,
      explain: 'A const reference avoids copying and guarantees read-only access.',
    },
    {
      chapterId: 'variables-types',
      q: 'Which cast is preferred for a numeric conversion?',
      options: ['reinterpret_cast', 'const_cast', 'static_cast', 'C-style cast'],
      answer: 2,
      explain: 'static_cast states the intent and is checked by the compiler where possible.',
    },
    {
      chapterId: 'variables-types',
      q: 'What type should text use in C++?',
      options: ['char[]', 'std::string', 'int', 'void*'],
      answer: 1,
      explain: 'std::string manages memory and length automatically.',
    },
  ],
};
