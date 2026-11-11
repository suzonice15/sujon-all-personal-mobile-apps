// C++ chapter: Classes and Objects.

export default {
  id: 'classes-objects',
  title: 'Classes & Objects',
  description: 'Constructors, destructors, encapsulation and this',
  icon: 'class',
  lessons: [
    {
      id: 'cpp-class-basics',
      title: 'Classes',
      blocks: [
        { type: 'text', value: 'A class groups data and behaviour. Members are private by default. A constructor initialises the object, and a destructor releases anything it owns.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>

class Student {
private:
    std::string name;
    int score;

public:
    Student(std::string name, int score) : name(name), score(score) {}

    bool passed() const {
        return score >= 60;
    }

    std::string getName() const {
        return name;
    }
};

int main() {
    Student student("Ayesha", 92);
    std::cout << student.getName() << " " << student.passed() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'The member initialiser list runs before the constructor body. Initialise members there instead of assigning in the body.' },
      ],
    },
    {
      id: 'cpp-encapsulation',
      title: 'Encapsulation',
      blocks: [
        { type: 'text', value: 'Keep data private and expose methods that protect the invariants. A class that lets any code set an invalid balance is a bug waiting to happen.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

class Account {
private:
    int balance;

public:
    explicit Account(int initial) : balance(initial) {}

    void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    int getBalance() const {
        return balance;
    }
};

int main() {
    Account account(100);
    account.deposit(50);
    std::cout << account.getBalance() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'A getter marked const promises not to modify the object. It can be called on a const object or reference.' },
      ],
    },
    {
      id: 'cpp-constructors-destructors',
      title: 'Constructors and destructors',
      blocks: [
        { type: 'text', value: 'A destructor runs when an object goes out of scope. It is where you release owned resources. This pattern is called RAII: resource acquisition is initialisation.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

class Logger {
public:
    Logger() {
        std::cout << "open\\n";
    }

    ~Logger() {
        std::cout << "close\\n";
    }
};

int main() {
    {
        Logger logger;
        std::cout << "working\\n";
    }
    std::cout << "done\\n";
    return 0;
}` },
        { type: 'note', value: 'A destructor must not throw. If cleanup can fail, log it or provide an explicit close method that can report the error.' },
      ],
    },
    {
      id: 'cpp-rule-of-three',
      title: 'Copying and the rule of three',
      blocks: [
        { type: 'text', value: 'If a class owns a resource, the compiler-generated copy would duplicate the pointer and free it twice. The rule of three says: if you need a destructor, copy constructor or copy assignment, you probably need all three.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

class Buffer {
private:
    int *data;
    int size;

public:
    explicit Buffer(int size) : data(new int[size]), size(size) {}

    ~Buffer() {
        delete[] data;
    }

    Buffer(const Buffer &) = delete;
    Buffer &operator=(const Buffer &) = delete;

    int getSize() const {
        return size;
    }
};

int main() {
    Buffer buffer(10);
    std::cout << buffer.getSize() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Modern C++ prefers the rule of zero: hold resources in smart pointers or standard containers so you do not need to write any of the three.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'classes-objects',
      q: 'What is the default access of a class member?',
      options: ['public', 'private', 'protected', 'package'],
      answer: 1,
      explain: 'class members are private by default; struct members are public.',
    },
    {
      chapterId: 'classes-objects',
      q: 'When does a destructor run?',
      options: ['When the object is created', 'When the object goes out of scope', 'Only on new', 'Only on delete'],
      answer: 1,
      explain: 'Automatic objects are destroyed at the end of scope.',
    },
    {
      chapterId: 'classes-objects',
      q: 'What does a const member function promise?',
      options: ['It returns const', 'It does not modify the object', 'It is static', 'It is private'],
      answer: 1,
      explain: 'It can be called on const objects and cannot change members.',
    },
    {
      chapterId: 'classes-objects',
      q: 'What is the rule of three?',
      options: [
        'Destructor, copy constructor and copy assignment go together',
        'Three constructors are required',
        'A class needs three methods',
        'Three files per class',
      ],
      answer: 0,
      explain: 'Owning a resource affects all three special members.',
    },
  ],
};
