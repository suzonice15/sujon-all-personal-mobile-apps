// C++ chapter: Memory and Smart Pointers.

export default {
  id: 'memory-smart-pointers',
  title: 'Memory & Smart Pointers',
  description: 'new, delete, RAII, unique_ptr and shared_ptr',
  icon: 'memory',
  lessons: [
    {
      id: 'cpp-new-delete',
      title: 'new and delete',
      blocks: [
        { type: 'text', value: 'new allocates on the heap and calls a constructor. delete destroys and frees. Arrays use new[] and delete[]. Mixing them is undefined behaviour.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int main() {
    int *value = new int(42);
    std::cout << *value << "\\n";

    delete value;
    value = nullptr;
    return 0;
}` },
        { type: 'note', value: 'Every new needs exactly one delete. Manual pairing is error-prone, which is why modern C++ prefers smart pointers.' },
      ],
    },
    {
      id: 'cpp-unique-ptr',
      title: 'unique_ptr',
      blocks: [
        { type: 'text', value: 'unique_ptr owns one object exclusively and frees it automatically. It cannot be copied, only moved. Use make_unique to create one.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <memory>
#include <string>

class Course {
public:
    std::string title = "SQL";
};

int main() {
    auto course = std::make_unique<Course>();
    std::cout << course->title << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Pass a unique_ptr by reference when the function only uses the object. Pass it by value only when you are transferring ownership.' },
      ],
    },
    {
      id: 'cpp-shared-ptr',
      title: 'shared_ptr',
      blocks: [
        { type: 'text', value: 'shared_ptr shares ownership with reference counting. The object is freed when the last owner is destroyed. Use it only when ownership is genuinely shared.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <memory>

int main() {
    auto first = std::make_shared<int>(42);
    auto second = first;

    std::cout << *first << " " << first.use_count() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Two shared_ptr objects that point to each other create a reference cycle and leak. Use weak_ptr to break the cycle.' },
      ],
    },
    {
      id: 'cpp-raii',
      title: 'RAII',
      blocks: [
        { type: 'text', value: 'RAII ties resource lifetime to object lifetime. The constructor acquires, the destructor releases, and scope handles the rest. It works for memory, files, locks and sockets.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <mutex>

std::mutex m;

void work() {
    std::lock_guard<std::mutex> lock(m);
    std::cout << "locked\\n";
} // lock released here

int main() {
    work();
    return 0;
}` },
        { type: 'note', value: 'RAII is the core C++ idiom. If you write manual cleanup with delete or unlock, ask whether a guard object would be safer.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'memory-smart-pointers',
      q: 'Which smart pointer is exclusive?',
      options: ['shared_ptr', 'weak_ptr', 'unique_ptr', 'raw pointer'],
      answer: 2,
      explain: 'unique_ptr cannot be copied, only moved.',
    },
    {
      chapterId: 'memory-smart-pointers',
      q: 'What happens when the last shared_ptr is destroyed?',
      options: ['Nothing', 'The object is freed', 'It becomes weak', 'It leaks'],
      answer: 1,
      explain: 'Reference counting reaches zero and the object is deleted.',
    },
    {
      chapterId: 'memory-smart-pointers',
      q: 'What is RAII?',
      options: ['A sorting algorithm', 'Tying resource lifetime to object lifetime', 'A type of pointer', 'A build tool'],
      answer: 1,
      explain: 'Constructors acquire, destructors release, scope guarantees cleanup.',
    },
    {
      chapterId: 'memory-smart-pointers',
      q: 'What problem do reference cycles cause?',
      options: ['Faster frees', 'Leaks because the count never reaches zero', 'Compile errors', 'Stack overflow'],
      answer: 1,
      explain: 'Each shared_ptr keeps the other alive. weak_ptr breaks the cycle.',
    },
  ],
};
