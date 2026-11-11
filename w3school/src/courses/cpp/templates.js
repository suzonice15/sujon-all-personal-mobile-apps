// C++ chapter: Templates.

export default {
  id: 'templates',
  title: 'Templates',
  description: 'Write code once for many types without losing safety',
  icon: 'code',
  lessons: [
    {
      id: 'cpp-function-templates',
      title: 'Function templates',
      blocks: [
        { type: 'text', value: 'A function template declares a type parameter. The compiler generates a concrete function for each type used, so there is no runtime cost.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

template <typename T>
T maxOf(T a, T b) {
    return a > b ? a : b;
}

int main() {
    std::cout << maxOf(3, 7) << " " << maxOf(2.5, 1.5) << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Templates are checked when instantiated. A type that does not support > produces a compile error at the call site.' },
      ],
    },
    {
      id: 'cpp-class-templates',
      title: 'Class templates',
      blocks: [
        { type: 'text', value: 'A class template stores a type parameter for its members. Standard containers such as vector and map are class templates.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>

template <typename T>
class Box {
private:
    T value;

public:
    explicit Box(T value) : value(value) {}

    T get() const {
        return value;
    }
};

int main() {
    Box<std::string> text("SQL");
    Box<int> number(42);

    std::cout << text.get() << " " << number.get() << "\\n";
    return 0;
}` },
      ],
    },
    {
      id: 'cpp-template-constraints',
      title: 'Constraints',
      blocks: [
        { type: 'text', value: 'A template can require that a type supports an operation. C++20 concepts express this clearly; before concepts, a static_assert or a well-named trait was used.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <type_traits>

template <typename T>
T add(T a, T b) {
    static_assert(std::is_arithmetic_v<T>, "add requires a numeric type");
    return a + b;
}

int main() {
    std::cout << add(2, 3) << "\\n";
    return 0;
}` },
        { type: 'note', value: 'A clear constraint produces a readable error. Without one, a bad type produces a long message deep inside the template.' },
      ],
    },
    {
      id: 'cpp-templates-tradeoffs',
      title: 'Trade-offs',
      blocks: [
        { type: 'list', items: [
          'Templates give type safety and zero-cost abstraction',
          'They can increase compile time and binary size',
          'Error messages can be long without concepts',
          'Template code usually lives in headers',
          'Do not template when a concrete type is enough',
        ] },
        { type: 'text', value: 'Templates are the foundation of the STL. Learn them after classes and references, not before.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'templates',
      q: 'What does a function template do?',
      options: ['Generates a function for each used type', 'Runs at runtime', 'Removes type checking', 'Creates a class'],
      answer: 0,
      explain: 'The compiler instantiates a concrete function per type.',
    },
    {
      chapterId: 'templates',
      q: 'Is a template checked before it is instantiated?',
      options: ['Yes, fully', 'Only syntax; type errors appear at instantiation', 'No', 'Only at runtime'],
      answer: 1,
      explain: 'Most type errors surface when a concrete type is substituted.',
    },
    {
      chapterId: 'templates',
      q: 'What does static_assert do?',
      options: ['Runs a test at runtime', 'Fails compilation when a condition is false', 'Allocates memory', 'Creates a variable'],
      answer: 1,
      explain: 'It stops the build with a readable message.',
    },
    {
      chapterId: 'templates',
      q: 'Where does template code usually live?',
      options: ['In a .cpp file only', 'In a header', 'In the linker', 'In the OS'],
      answer: 1,
      explain: 'The compiler needs the definition to instantiate it at the call site.',
    },
  ],
};
