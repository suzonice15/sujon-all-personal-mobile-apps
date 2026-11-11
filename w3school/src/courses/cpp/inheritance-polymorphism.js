// C++ chapter: Inheritance and Polymorphism.

export default {
  id: 'inheritance-polymorphism',
  title: 'Inheritance',
  description: 'Base classes, virtual functions and abstract interfaces',
  icon: 'account-tree',
  lessons: [
    {
      id: 'cpp-inheritance',
      title: 'Inheritance',
      blocks: [
        { type: 'text', value: 'A derived class inherits the accessible members of its base class. public inheritance models an "is a" relationship. Call the base constructor in the initialiser list.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <string>

class Animal {
protected:
    std::string name;

public:
    explicit Animal(std::string name) : name(name) {}

    std::string getName() const {
        return name;
    }
};

class Dog : public Animal {
public:
    explicit Dog(std::string name) : Animal(name) {}
};

int main() {
    Dog dog("Tom");
    std::cout << dog.getName() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Prefer composition when the relationship is "has a". Inheritance creates tight coupling and is easy to overuse.' },
      ],
    },
    {
      id: 'cpp-virtual',
      title: 'virtual and override',
      blocks: [
        { type: 'text', value: 'A virtual function is chosen at runtime from the actual object type. override asks the compiler to verify that the function really overrides a base method.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <memory>
#include <string>

class Animal {
public:
    virtual std::string sound() const {
        return "...";
    }

    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    std::string sound() const override {
        return "woof";
    }
};

int main() {
    std::unique_ptr<Animal> animal = std::make_unique<Dog>();
    std::cout << animal->sound() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'A base class with virtual functions needs a virtual destructor. Otherwise deleting through a base pointer skips the derived destructor.' },
      ],
    },
    {
      id: 'cpp-abstract',
      title: 'Abstract classes',
      blocks: [
        { type: 'text', value: 'A pure virtual function has no implementation and makes the class abstract. Derived classes must implement it before they can be instantiated.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Square : public Shape {
private:
    double side;

public:
    explicit Square(double side) : side(side) {}

    double area() const override {
        return side * side;
    }
};

int main() {
    Square square(3);
    std::cout << square.area() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'An abstract class defines a contract. It cannot be instantiated, but it can be passed by reference or pointer.' },
      ],
    },
    {
      id: 'cpp-polymorphism',
      title: 'Polymorphism in practice',
      blocks: [
        { type: 'text', value: 'A container of base pointers can hold different derived objects. Each call to a virtual function dispatches to the correct override.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <memory>
#include <vector>

class Animal {
public:
    virtual std::string sound() const = 0;
    virtual ~Animal() = default;
};

class Cat : public Animal {
public:
    std::string sound() const override { return "meow"; }
};

class Dog : public Animal {
public:
    std::string sound() const override { return "woof"; }
};

int main() {
    std::vector<std::unique_ptr<Animal>> animals;
    animals.push_back(std::make_unique<Cat>());
    animals.push_back(std::make_unique<Dog>());

    for (const auto &animal : animals) {
        std::cout << animal->sound() << "\\n";
    }
    return 0;
}` },
        { type: 'note', value: 'Virtual dispatch has a small cost. Do not avoid it in a design that needs it; measure before optimising it away.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'inheritance-polymorphism',
      q: 'What does virtual enable?',
      options: ['Compile-time overloading', 'Runtime dispatch to the derived override', 'Faster code', 'Multiple inheritance'],
      answer: 1,
      explain: 'The actual object type chooses the function at runtime.',
    },
    {
      chapterId: 'inheritance-polymorphism',
      q: 'Why does a polymorphic base need a virtual destructor?',
      options: ['To compile', 'To run the derived destructor when deleting through a base pointer', 'To make it abstract', 'To enable copy'],
      answer: 1,
      explain: 'Without it, deleting through a base pointer skips derived cleanup.',
    },
    {
      chapterId: 'inheritance-polymorphism',
      q: 'What does = 0 on a virtual function mean?',
      options: ['It returns zero', 'It is pure virtual and makes the class abstract', 'It is private', 'It is static'],
      answer: 1,
      explain: 'The class cannot be instantiated until the function is implemented.',
    },
    {
      chapterId: 'inheritance-polymorphism',
      q: 'What does override do?',
      options: ['Forces a new function', 'Checks that the function overrides a base method', 'Makes it virtual', 'Deletes it'],
      answer: 1,
      explain: 'It turns a signature mistake into a compile error.',
    },
  ],
};
