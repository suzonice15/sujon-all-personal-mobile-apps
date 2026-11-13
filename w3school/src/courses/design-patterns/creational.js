// Design Patterns chapter: Creational Patterns.

export default {
  id: 'creational',
  title: 'Creational Patterns',
  description: 'Singleton, Factory, Builder and Prototype',
  icon: 'add-box',
  lessons: [
    {
      id: 'dp-singleton-factory',
      title: 'Singleton and Factory',
      blocks: [
        { type: 'text', value: 'Singleton guarantees one instance of a class and provides a global access point. Factory hides object creation behind a method so callers ask for a type, not a concrete class.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// Singleton
class Config {
    private static final Config INSTANCE = new Config();
    private Config() {}
    static Config get() { return INSTANCE; }
}

// Factory
interface Payment { void pay(int amount); }
class CardPayment implements Payment { public void pay(int a) { } }
class BkashPayment implements Payment { public void pay(int a) { } }

class PaymentFactory {
    static Payment create(String method) {
        return switch (method) {
            case "card" -> new CardPayment();
            case "bkash" -> new BkashPayment();
            default -> throw new IllegalArgumentException("unknown method");
        };
    }
}` },
        { type: 'note', value: 'A Singleton is often an anti-pattern because it hides dependencies and makes testing hard. Prefer dependency injection instead.' },
      ],
    },
    {
      id: 'dp-builder',
      title: 'Builder',
      blocks: [
        { type: 'text', value: 'Builder constructs a complex object step by step. It is useful when a constructor has many parameters or when the object has optional parts.' },
        { type: 'code', lang: 'java', tryIt: false, value: `class Course {
    private final String title;
    private final int price;
    private final boolean published;

    private Course(Builder b) {
        this.title = b.title;
        this.price = b.price;
        this.published = b.published;
    }

    static class Builder {
        private String title;
        private int price;
        private boolean published;

        Builder title(String t) { this.title = t; return this; }
        Builder price(int p) { this.price = p; return this; }
        Builder published(boolean p) { this.published = p; return this; }
        Course build() { return new Course(this); }
    }
}

Course c = new Course.Builder().title("Patterns").price(6000).build();` },
        { type: 'note', value: 'A builder with many parameters is a sign the object has too many responsibilities. Consider splitting it.' },
      ],
    },
    {
      id: 'dp-prototype-abstract',
      title: 'Prototype and Abstract Factory',
      blocks: [
        { type: 'text', value: 'Prototype creates new objects by cloning an existing one, which is useful when construction is expensive. Abstract Factory creates families of related objects without naming their concrete classes.' },
        { type: 'list', items: [
          'Prototype: clone instead of construct',
          'Abstract Factory: create a family of related objects',
          'Use Prototype when building an object is costly',
          'Use Abstract Factory when you switch whole product families',
        ] },
        { type: 'note', value: 'In modern languages, serialization or copy constructors often replace a hand-written Prototype. The pattern still describes the idea.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'creational',
      q: 'What does Singleton guarantee?',
      options: ['Many instances', 'Exactly one instance with a global access point', 'No instances', 'A new instance per call'],
      answer: 1,
      explain: 'Singleton provides one shared instance.',
    },
    {
      chapterId: 'creational',
      q: 'What does a Factory hide?',
      options: ['The database', 'Object creation behind a method', 'The interface', 'The tests'],
      answer: 1,
      explain: 'Callers ask for a type, not a concrete class.',
    },
    {
      chapterId: 'creational',
      q: 'When is Builder useful?',
      options: ['For simple objects', 'When a constructor has many parameters or optional parts', 'Only for strings', 'Never'],
      answer: 1,
      explain: 'Builder handles complex construction step by step.',
    },
    {
      chapterId: 'creational',
      q: 'Why is Singleton often considered an anti-pattern?',
      options: ['It is too fast', 'It hides dependencies and makes testing hard', 'It uses too much memory', 'It is not thread-safe'],
      answer: 1,
      explain: 'Global state makes tests and dependencies unclear.',
    },
  ],
};
