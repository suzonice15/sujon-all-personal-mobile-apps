// Java chapter: Interfaces.

export default {
  id: 'interfaces',
  title: 'Interfaces',
  description: 'Contracts, default methods and multiple inheritance of type',
  icon: 'extension',
  lessons: [
    {
      id: 'java-interface-basics',
      title: 'Interfaces as contracts',
      blocks: [
        { type: 'text', value: 'An interface declares what a class can do, not how. A class implements the interface and provides the methods. Code can depend on the interface instead of a concrete class.' },
        { type: 'code', lang: 'java', tryIt: false, value: `interface Named {
    String name();
}

class Student implements Named {
    @Override
    public String name() {
        return "Ayesha";
    }
}

public class Main {
    public static void main(String[] args) {
        Named named = new Student();
        System.out.println(named.name());
    }
}` },
        { type: 'note', value: 'Interface methods are public by default. Implementations must be public too; a package-private method does not satisfy the contract.' },
      ],
    },
    {
      id: 'java-default-methods',
      title: 'Default methods',
      blocks: [
        { type: 'text', value: 'An interface can provide a default implementation. Implementations inherit it unless they choose to override. This lets libraries add methods without breaking every class.' },
        { type: 'code', lang: 'java', tryIt: false, value: `interface Greeter {
    String name();

    default String greet() {
        return "Hello, " + name();
    }
}

class Student implements Greeter {
    @Override
    public String name() {
        return "Ayesha";
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Student().greet());
    }
}` },
      ],
    },
    {
      id: 'java-multiple-interfaces',
      title: 'Multiple interfaces',
      blocks: [
        { type: 'text', value: 'A class can implement several interfaces. This is how Java gets multiple inheritance of type without the diamond problem of state.' },
        { type: 'code', lang: 'java', tryIt: false, value: `interface Reader {
    String read();
}

interface Writer {
    void write(String text);
}

class Device implements Reader, Writer {
    @Override
    public String read() {
        return "data";
    }

    @Override
    public void write(String text) {
        System.out.println("write " + text);
    }
}

public class Main {
    public static void main(String[] args) {
        Device device = new Device();
        System.out.println(device.read());
        device.write("ok");
    }
}` },
        { type: 'note', value: 'If two interfaces define the same default method, the class must override it and can call InterfaceName.super.method().' },
      ],
    },
    {
      id: 'java-interface-vs-abstract',
      title: 'Interface or abstract class?',
      blocks: [
        { type: 'list', items: [
          'Use an interface for a capability shared by unrelated classes',
          'Use an abstract class when subclasses share fields and code',
          'A class can implement many interfaces but extend one class',
          'Prefer interfaces in public APIs; they are easier to implement and test',
        ] },
        { type: 'text', value: 'Example: Comparable is an interface because many unrelated types can be compared. A base class Animal is abstract because animals share state and behaviour.' },
        { type: 'note', value: 'Program to an interface, not an implementation. A method that accepts a List works with ArrayList, LinkedList and any future implementation.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'interfaces',
      q: 'Which keyword implements an interface?',
      options: ['extends', 'implements', 'inherits', 'with'],
      answer: 1,
      explain: 'class Student implements Named provides the interface methods.',
    },
    {
      chapterId: 'interfaces',
      q: 'What is a default method?',
      options: ['A method with a body in an interface', 'A private method', 'A static field', 'A constructor'],
      answer: 0,
      explain: 'It provides an implementation that classes inherit unless they override it.',
    },
    {
      chapterId: 'interfaces',
      q: 'How many interfaces can a class implement?',
      options: ['Only one', 'Two', 'Many', 'None'],
      answer: 2,
      explain: 'A class can implement any number of interfaces.',
    },
    {
      chapterId: 'interfaces',
      q: 'When is an abstract class better than an interface?',
      options: ['When subclasses share fields and code', 'When you need many implementations', 'When there is no state', 'Never'],
      answer: 0,
      explain: 'Abstract classes can hold state and shared implementation.',
    },
  ],
};
