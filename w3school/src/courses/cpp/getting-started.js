// C++ chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'C++ vs C, your first program and how compilation works',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'cpp-what-is',
      title: 'What is C++?',
      blocks: [
        { type: 'text', value: 'C++ is a compiled language built on C. It adds classes, references, templates, exceptions and the Standard Template Library, while keeping direct control of memory.' },
        { type: 'list', items: [
          'C speed with higher-level abstractions',
          'Used for games, browsers, operating systems and competitive programming',
          'The STL gives vectors, maps, sets and algorithms',
          'Manual memory management with new and delete, plus smart pointers',
        ] },
        { type: 'note', value: 'C++ is not "C with classes". Templates, RAII and references change how you design code. Learn the idioms, not just the syntax.' },
      ],
    },
    {
      id: 'cpp-first-program',
      title: 'Your first program',
      blocks: [
        { type: 'text', value: 'std::cout writes to standard output. The << operator sends a value into the stream. std::endl adds a newline and flushes; "\\n" is usually enough.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}` },
        { type: 'list', items: [
          '#include <iostream> brings in the I/O library',
          'int main() is the entry point',
          'std::cout is the standard output stream',
          'return 0 reports success',
        ] },
        { type: 'note', value: 'Avoid using namespace std; in headers. It pollutes every file that includes the header. Use std:: explicitly or a using declaration inside a small scope.' },
      ],
    },
    {
      id: 'cpp-compile-run',
      title: 'Compile and run',
      blocks: [
        { type: 'text', value: 'g++ or clang++ compiles C++ source to an executable. Enable warnings and a modern standard from day one.' },
        { type: 'code', lang: 'text', tryIt: false, value: `g++ -Wall -Wextra -std=c++17 main.cpp -o main
./main

# Address and undefined-behaviour sanitizers
g++ -Wall -Wextra -std=c++17 -g \\
    -fsanitize=address,undefined main.cpp -o main` },
        { type: 'note', value: 'C++ has undefined behaviour just like C. Sanitizers catch many mistakes that appear to work in a normal build.' },
      ],
    },
    {
      id: 'cpp-c-differences',
      title: 'C vs C++',
      blocks: [
        { type: 'list', items: [
          'C++ has classes, references, templates and exceptions',
          'C uses malloc/free; C++ uses new/delete and smart pointers',
          'C++ has std::string and std::vector instead of raw arrays',
          'C headers such as <stdio.h> become <cstdio> in C++',
          'C++ supports function overloading and namespaces',
        ] },
        { type: 'text', value: 'Most C code compiles as C++, but the reverse is not true. Prefer the C++ standard library for new code and use C APIs only when a library requires them.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Which header provides std::cout?',
      options: ['<stdio.h>', '<iostream>', '<string>', '<vector>'],
      answer: 1,
      explain: '<iostream> declares the standard input and output streams.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does << do in std::cout << value?',
      options: ['Compares values', 'Sends the value into the stream', 'Creates a pointer', 'Allocates memory'],
      answer: 1,
      explain: 'The insertion operator writes the value to the output stream.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why avoid using namespace std; in headers?',
      options: ['It is slower', 'It pollutes every file that includes the header', 'It is not valid C++', 'It breaks templates'],
      answer: 1,
      explain: 'A using directive in a header changes name lookup for all includers.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which compiler is commonly used for C++?',
      options: ['g++', 'javac', 'node', 'npm'],
      answer: 0,
      explain: 'g++ (GCC) and clang++ are the common C++ compilers.',
    },
  ],
};
