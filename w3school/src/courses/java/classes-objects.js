// Java chapter: Classes and Objects.

export default {
  id: 'classes-objects',
  title: 'Classes & Objects',
  description: 'Fields, constructors, encapsulation and toString',
  icon: 'class',
  lessons: [
    {
      id: 'java-class-basics',
      title: 'Classes and objects',
      blocks: [
        { type: 'text', value: 'A class is a blueprint. An object is an instance with its own field values. The constructor initialises the object and has the same name as the class.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class Student {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }

    boolean passed() {
        return score >= 60;
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student("Ayesha", 92);
        System.out.println(student.name + " " + student.passed());
    }
}` },
        { type: 'note', value: 'this refers to the current object. It is required when a parameter has the same name as a field.' },
      ],
    },
    {
      id: 'java-encapsulation',
      title: 'Encapsulation',
      blocks: [
        { type: 'text', value: 'Make fields private and expose behaviour through methods. That lets the class protect its invariants and change its internals without breaking callers.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class Account {
    private int balance;

    Account(int balance) {
        this.balance = balance;
    }

    int getBalance() {
        return balance;
    }

    void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Account account = new Account(100);
        account.deposit(50);
        System.out.println(account.getBalance());
    }
}` },
        { type: 'note', value: 'A public field lets any code set an invalid value. A setter can validate; a business method can enforce the rule that matters.' },
      ],
    },
    {
      id: 'java-static',
      title: 'Static members',
      blocks: [
        { type: 'text', value: 'A static field belongs to the class and is shared by every instance. A static method cannot use this because there is no instance.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class Counter {
    static int count = 0;

    static int next() {
        count++;
        return count;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Counter.next());
        System.out.println(Counter.next());
        System.out.println(Counter.count);
    }
}` },
        { type: 'note', value: 'Use static for constants and pure helpers. Avoid mutable static state in a server: it is shared across requests and hard to test.' },
      ],
    },
    {
      id: 'java-tostring-equals',
      title: 'toString and equals',
      blocks: [
        { type: 'text', value: 'Override toString for readable logging. Override equals and hashCode together when objects are used as map keys or compared by value.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class Point {
    int x;
    int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Point point = new Point(2, 3);
        System.out.println(point);
    }
}` },
        { type: 'note', value: 'Two objects with equal fields are still different references unless you override equals. Records generate toString, equals and hashCode for you in modern Java.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'classes-objects',
      q: 'What is a constructor used for?',
      options: ['Deleting an object', 'Initialising a new object', 'Compiling the class', 'Creating a package'],
      answer: 1,
      explain: 'It runs when an object is created with new and sets up its fields.',
    },
    {
      chapterId: 'classes-objects',
      q: 'What does encapsulation mean?',
      options: ['All fields are public', 'Fields are private and accessed through methods', 'Every class is final', 'No constructors'],
      answer: 1,
      explain: 'It protects state and exposes behaviour instead of raw data.',
    },
    {
      chapterId: 'classes-objects',
      q: 'Which member is shared by all instances?',
      options: ['A private field', 'A static field', 'A constructor', 'A local variable'],
      answer: 1,
      explain: 'Static members belong to the class, not to one object.',
    },
    {
      chapterId: 'classes-objects',
      q: 'Which method gives a readable object description?',
      options: ['toString', 'equals', 'hashCode', 'main'],
      answer: 0,
      explain: 'toString is used by printing and string concatenation.',
    },
  ],
};
