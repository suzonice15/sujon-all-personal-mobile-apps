// C++ chapter: Project and Interview Practice.

export default {
  id: 'project-interview',
  title: 'Project & Interview Prep',
  description: 'Build a course manager and prepare for questions',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'cpp-project-manager',
      title: 'Project: course manager',
      blocks: [
        { type: 'text', value: 'Combine a class, a vector and an algorithm. The manager owns a collection and exposes behaviour instead of raw data. This is the shape of most real C++ code.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

class Course {
public:
    std::string title;
    int price;

    Course(std::string title, int price) : title(title), price(price) {}
};

class CourseManager {
private:
    std::vector<Course> courses;

public:
    void add(const Course &course) {
        courses.push_back(course);
    }

    int total() const {
        int sum = 0;
        for (const auto &course : courses) {
            sum += course.price;
        }
        return sum;
    }

    void sortByPrice() {
        std::sort(courses.begin(), courses.end(),
                  [](const Course &a, const Course &b) {
                      return a.price < b.price;
                  });
    }

    void print() const {
        for (const auto &course : courses) {
            std::cout << course.title << " " << course.price << "\\n";
        }
    }
};

int main() {
    CourseManager manager;
    manager.add(Course("SQL", 5000));
    manager.add(Course("C++", 6000));
    manager.add(Course("Git", 2000));

    manager.sortByPrice();
    manager.print();
    std::cout << manager.total() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'The lambda passed to sort is a small function that compares two courses. It keeps the ordering rule next to the call.' },
      ],
    },
    {
      id: 'cpp-project-linked-list',
      title: 'Project: linked list',
      blocks: [
        { type: 'text', value: 'A class-based linked list shows ownership and pointers together. The destructor frees every node, so the list does not leak.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

class Node {
public:
    int value;
    Node *next;

    explicit Node(int value) : value(value), next(nullptr) {}
};

class List {
private:
    Node *head = nullptr;

public:
    ~List() {
        Node *current = head;
        while (current != nullptr) {
            Node *next = current->next;
            delete current;
            current = next;
        }
    }

    void add(int value) {
        Node *node = new Node(value);
        node->next = head;
        head = node;
    }

    void print() const {
        for (Node *current = head; current != nullptr; current = current->next) {
            std::cout << current->value << " ";
        }
        std::cout << "\\n";
    }
};

int main() {
    List list;
    list.add(1);
    list.add(2);
    list.add(3);
    list.print();
    return 0;
}` },
        { type: 'note', value: 'The destructor walks the list and deletes each node. Modern C++ would use unique_ptr for next and avoid the manual loop entirely.' },
      ],
    },
    {
      id: 'cpp-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the difference between a pointer and a reference?',
          'What is RAII and why does it matter?',
          'When do you use unique_ptr versus shared_ptr?',
          'What is the rule of three and the rule of zero?',
          'Why does a polymorphic base need a virtual destructor?',
          'What is the difference between vector and list?',
          'What does const correctness mean?',
          'What is undefined behaviour in C++?',
          'How do templates avoid runtime cost?',
          'What is move semantics?',
        ] },
        { type: 'text', value: 'C++ interviews reward precision about ownership and lifetime. For every pointer, say who owns it. For every class, say what its destructor does.' },
        { type: 'note', value: 'Move semantics is the one advanced topic worth reading early: it explains why returning a vector by value is cheap and why std::move exists.' },
      ],
    },
    {
      id: 'cpp-build-tools',
      title: 'Build tools',
      blocks: [
        { type: 'list', items: [
          'CMake - the standard cross-platform build system',
          'Make / Ninja - build backends used by CMake',
          'vcpkg / Conan - package managers for C++ libraries',
          'clang-tidy / cppcheck - static analysis',
          'AddressSanitizer / UBSan - runtime bug detection',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `cmake -S . -B build
cmake --build build
./build/app

# With sanitizers
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug \\
      -DCMAKE_CXX_FLAGS="-fsanitize=address,undefined"` },
        { type: 'note', value: 'A C++ project without CMake and sanitizers is hard to build and hard to trust. Set both up on day one.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'project-interview',
      q: 'What does a lambda passed to sort do?',
      options: ['Allocates memory', 'Defines the comparison rule', 'Frees the vector', 'Creates a thread'],
      answer: 1,
      explain: 'The lambda returns whether the first argument comes before the second.',
    },
    {
      chapterId: 'project-interview',
      q: 'What does the list destructor need to do?',
      options: ['Nothing', 'Delete every node', 'Sort the nodes', 'Copy the nodes'],
      answer: 1,
      explain: 'Each node was allocated with new and must be deleted.',
    },
    {
      chapterId: 'project-interview',
      q: 'Which pointer expresses exclusive ownership?',
      options: ['shared_ptr', 'unique_ptr', 'weak_ptr', 'raw pointer'],
      answer: 1,
      explain: 'unique_ptr cannot be copied, so ownership is unambiguous.',
    },
    {
      chapterId: 'project-interview',
      q: 'Which tool is the standard C++ build system?',
      options: ['npm', 'CMake', 'Gradle', 'Maven'],
      answer: 1,
      explain: 'CMake generates builds for Make, Ninja and IDEs.',
    },
  ],
};
