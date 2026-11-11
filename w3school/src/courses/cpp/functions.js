// C++ chapter: Functions.

export default {
  id: 'functions',
  title: 'Functions',
  description: 'Overloading, default arguments, references and recursion',
  icon: 'functions',
  lessons: [
    {
      id: 'cpp-function-basics',
      title: 'Function basics',
      blocks: [
        { type: 'text', value: 'A function has a return type, a name and parameters. C++ checks the argument types at compile time. A function must be declared before it is called.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int add(int a, int b) {
    return a + b;
}

int main() {
    std::cout << add(2, 3) << "\\n";
    return 0;
}` },
        { type: 'note', value: 'C++ allows overloading, so the compiler chooses a function by its parameter list, not just its name.' },
      ],
    },
    {
      id: 'cpp-overloading-defaults',
      title: 'Overloading and default arguments',
      blocks: [
        { type: 'text', value: 'Overloading gives several functions the same name with different parameters. Default arguments let a caller omit trailing parameters.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>

std::string greet(const std::string &name, const std::string &title = "Student") {
    return title + " " + name;
}

int square(int value) {
    return value * value;
}

double square(double value) {
    return value * value;
}

int main() {
    std::cout << greet("Ayesha") << "\\n";
    std::cout << square(5) << " " << square(2.5) << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Default arguments are part of the declaration. Put them in the header, not in the definition, or callers will not see them.' },
      ],
    },
    {
      id: 'cpp-references',
      title: 'Passing by reference',
      blocks: [
        { type: 'text', value: 'A reference parameter is an alias for the caller\'s variable, so the function can modify it. A const reference gives read-only access without copying.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>

void rename(std::string &name) {
    name = "Updated";
}

void print(const std::string &name) {
    std::cout << name << "\\n";
}

int main() {
    std::string name = "Ayesha";
    rename(name);
    print(name);
    return 0;
}` },
        { type: 'note', value: 'Use T& to modify, const T& to read, and T by value for small types. The choice is part of the function contract.' },
      ],
    },
    {
      id: 'cpp-recursion',
      title: 'Recursion',
      blocks: [
        { type: 'text', value: 'A recursive function calls itself with a smaller input and stops at a base case. Deep recursion uses stack space and can overflow.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    std::cout << factorial(5) << "\\n";
    return 0;
}` },
        { type: 'note', value: 'C++ does not guarantee tail-call optimisation. For deep recursion, use a loop or an explicit stack.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'functions',
      q: 'What is function overloading?',
      options: ['Same name, different parameters', 'Same name, same parameters', 'Different name, same parameters', 'A function inside a loop'],
      answer: 0,
      explain: 'The compiler chooses by the argument list at the call site.',
    },
    {
      chapterId: 'functions',
      q: 'Where should default arguments be declared?',
      options: ['In the definition only', 'In the declaration visible to callers', 'In main', 'Nowhere'],
      answer: 1,
      explain: 'Callers need to see the default value at the declaration.',
    },
    {
      chapterId: 'functions',
      q: 'What does a const reference parameter prevent?',
      options: ['Copying only', 'Modification through the parameter', 'Recursion', 'Overloading'],
      answer: 1,
      explain: 'It gives read-only access without a copy.',
    },
    {
      chapterId: 'functions',
      q: 'What risk does deep recursion carry?',
      options: ['Stack overflow', 'A compile error', 'A memory leak', 'A type error'],
      answer: 0,
      explain: 'Each call keeps a stack frame until the base case unwinds.',
    },
  ],
};
