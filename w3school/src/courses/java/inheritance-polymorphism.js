// Java chapter: Inheritance and Polymorphism.

export default {
  id: 'inheritance-polymorphism',
  title: 'Inheritance',
  description: 'extends, overriding, abstract classes and polymorphism',
  icon: 'account-tree',
  lessons: [
    {
      id: 'java-extends',
      title: 'extends and super',
      blocks: [
        { type: 'text', value: 'A subclass inherits the accessible fields and methods of its parent. super calls the parent constructor or method. Constructors are not inherited.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    String sound() {
        return "...";
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    @Override
    String sound() {
        return "woof";
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Tom");
        System.out.println(dog.name + " says " + dog.sound());
    }
}` },
        { type: 'note', value: 'A Java class can extend only one class, but it can implement many interfaces. Favour composition when the relationship is not truly "is a".' },
      ],
    },
    {
      id: 'java-polymorphism',
      title: 'Polymorphism',
      blocks: [
        { type: 'text', value: 'A parent reference can hold a child object. The overridden method that runs is chosen at runtime from the actual object type. That is dynamic dispatch.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class Animal {
    String sound() {
        return "...";
    }
}

class Cat extends Animal {
    String sound() {
        return "meow";
    }
}

class Dog extends Animal {
    String sound() {
        return "woof";
    }
}

public class Main {
    public static void main(String[] args) {
        Animal[] animals = { new Cat(), new Dog() };

        for (Animal animal : animals) {
            System.out.println(animal.sound());
        }
    }
}` },
        { type: 'note', value: 'Do not use instanceof chains to reimplement dispatch. Put the behaviour in a method and let the object decide.' },
      ],
    },
    {
      id: 'java-abstract',
      title: 'Abstract classes',
      blocks: [
        { type: 'text', value: 'An abstract class cannot be instantiated. It can implement shared methods and declare abstract methods that every subclass must provide.' },
        { type: 'code', lang: 'java', tryIt: false, value: `abstract class Shape {
    abstract double area();

    void describe() {
        System.out.println("Area is " + area());
    }
}

class Square extends Shape {
    private final double side;

    Square(double side) {
        this.side = side;
    }

    @Override
    double area() {
        return side * side;
    }
}

public class Main {
    public static void main(String[] args) {
        new Square(3).describe();
    }
}` },
        { type: 'note', value: 'An abstract class is for shared code plus a partial contract. An interface is for a contract that unrelated classes can implement.' },
      ],
    },
    {
      id: 'java-final-instanceof',
      title: 'final and instanceof',
      blocks: [
        { type: 'text', value: 'final prevents overriding a method or extending a class. instanceof checks the runtime type and, in modern Java, can bind a variable in the same expression.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class Animal { }
class Dog extends Animal { }

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();

        if (animal instanceof Dog dog) {
            System.out.println("It is a dog: " + dog.getClass().getSimpleName());
        }
    }
}` },
        { type: 'note', value: 'instanceof is fine at a system boundary, such as parsing untrusted input. Inside a well-designed hierarchy, polymorphism is usually cleaner.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'inheritance-polymorphism',
      q: 'Which keyword extends a class?',
      options: ['implements', 'extends', 'inherits', 'super'],
      answer: 1,
      explain: 'class Dog extends Animal inherits from Animal.',
    },
    {
      chapterId: 'inheritance-polymorphism',
      q: 'What does super(name) do?',
      options: ['Creates a new class', 'Calls the parent constructor', 'Overrides a method', 'Deletes the parent'],
      answer: 1,
      explain: 'super(...) invokes the parent constructor with the given arguments.',
    },
    {
      chapterId: 'inheritance-polymorphism',
      q: 'Which method runs when a parent reference points to a child object?',
      options: ['Always the parent method', 'The overridden child method', 'Neither', 'A compile error'],
      answer: 1,
      explain: 'Dynamic dispatch chooses the method from the actual object type.',
    },
    {
      chapterId: 'inheritance-polymorphism',
      q: 'Can an abstract class be instantiated?',
      options: ['Yes', 'No, it must be subclassed', 'Only with new', 'Only if it has no methods'],
      answer: 1,
      explain: 'It may have unimplemented methods, so Java forbids direct instantiation.',
    },
  ],
};
