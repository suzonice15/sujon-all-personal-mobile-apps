// C++ chapter: Operators and Control Flow.

export default {
  id: 'operators-control',
  title: 'Operators & Control Flow',
  description: 'Arithmetic, conditions, switch and loops',
  icon: 'call-split',
  lessons: [
    {
      id: 'cpp-operators',
      title: 'Operators',
      blocks: [
        { type: 'text', value: 'Arithmetic, comparison and logical operators work like C. Integer division drops the remainder. && and || short-circuit. The conditional operator ?: chooses between two values.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int main() {
    int a = 7;
    int b = 3;

    std::cout << a + b << " " << a / b << " " << a % b << "\\n";
    std::cout << (a > b ? "bigger" : "smaller") << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Do not confuse = with ==. A good compiler warns about assignment in a condition, but the warning is not guaranteed in every context.' },
      ],
    },
    {
      id: 'cpp-if-switch',
      title: 'Conditions and switch',
      blocks: [
        { type: 'text', value: 'if/else chooses a branch. switch compares an integral value against case labels. Modern C++ allows switch initialisers and [[fallthrough]].' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int main() {
    int score = 82;

    if (score >= 80) {
        std::cout << "A\\n";
    } else if (score >= 60) {
        std::cout << "B\\n";
    } else {
        std::cout << "F\\n";
    }

    char grade = 'B';
    switch (grade) {
        case 'A': std::cout << "Excellent\\n"; break;
        case 'B': std::cout << "Good\\n"; break;
        default: std::cout << "Keep going\\n";
    }
    return 0;
}` },
      ],
    },
    {
      id: 'cpp-loops',
      title: 'Loops',
      blocks: [
        { type: 'text', value: 'for, while and do/while work like C. Range-based for is the C++ addition: it iterates over any container without an index.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <vector>

int main() {
    for (int i = 1; i <= 3; i++) {
        std::cout << "i=" << i << "\\n";
    }

    std::vector<int> values = {10, 20, 30};
    for (int value : values) {
        std::cout << value << " ";
    }
    std::cout << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Use const auto& in a range-for when you only read, to avoid copying each element. Use auto& when you need to modify elements.' },
      ],
    },
    {
      id: 'cpp-scope',
      title: 'Scope and lifetime',
      blocks: [
        { type: 'text', value: 'A variable lives from its declaration to the end of its block. Objects with automatic storage are destroyed at the end of scope, which is the basis of RAII.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>

int main() {
    {
        std::string inner = "temporary";
        std::cout << inner << "\\n";
    } // inner is destroyed here

    int count = 0;
    for (int i = 0; i < 3; i++) {
        count += i;
    }
    std::cout << count << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Do not return a reference or pointer to a local variable. It is destroyed when the function ends, leaving a dangling reference.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'operators-control',
      q: 'What is 7 / 3 for two ints?',
      options: ['2.33', '2', '3', 'An error'],
      answer: 1,
      explain: 'Integer division truncates the fractional part.',
    },
    {
      chapterId: 'operators-control',
      q: 'What does range-based for iterate over?',
      options: ['Only arrays', 'Any container with begin and end', 'Only vectors', 'Only strings'],
      answer: 1,
      explain: 'It works with any range that provides begin() and end().',
    },
    {
      chapterId: 'operators-control',
      q: 'What is the conditional operator?',
      options: ['?:', '??', '&&', '::'],
      answer: 0,
      explain: 'condition ? valueIfTrue : valueIfFalse.',
    },
    {
      chapterId: 'operators-control',
      q: 'What happens to a local object at the end of its scope?',
      options: ['It is leaked', 'Its destructor runs', 'It becomes global', 'It is copied'],
      answer: 1,
      explain: 'Automatic objects are destroyed when scope ends, enabling RAII.',
    },
  ],
};
