// TypeScript chapter: Classes and OOP.

export default {
  id: 'classes-oop',
  title: 'Classes & OOP',
  description: 'Typed classes, access modifiers and interfaces',
  icon: 'class',
  lessons: [
    {
      id: 'ts-class-basics',
      title: 'Typed classes',
      blocks: [
        { type: 'text', value: 'A class groups data and behaviour. TypeScript adds types to the fields, the constructor and every method, so the class cannot be used incorrectly.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `class Student {
  name: string;
  score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }

  passed(): boolean {
    return this.score >= 60;
  }
}

const ayesha = new Student('Ayesha', 92);
console.log(ayesha.name, ayesha.passed());` },
        { type: 'text', value: 'Fields must be initialised in the constructor or at declaration. Otherwise the compiler reports that the property has no initializer, which prevents undefined values at runtime.' },
        { type: 'note', value: 'Prefer functions and plain objects when there is no state to protect. Classes shine when behaviour and private data belong together.' },
      ],
    },
    {
      id: 'ts-access-modifiers',
      title: 'Access modifiers and parameter properties',
      blocks: [
        { type: 'text', value: 'public is the default. private hides a member from outside the class. protected allows subclasses to use it. readonly combines with them to prevent reassignment.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `class Account {
  constructor(
    public readonly id: number,
    private balance: number
  ) {}

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new Account(1, 100);
account.deposit(50);
console.log(account.id, account.getBalance());` },
        { type: 'text', value: 'Writing public/private in the constructor parameters is shorthand for declaring the field and assigning it. It removes a lot of boilerplate.' },
        { type: 'note', value: 'private and protected are compile-time only. JavaScript still exposes the field at runtime. For real privacy, use #private fields, which TypeScript supports.' },
      ],
    },
    {
      id: 'ts-abstract-interfaces',
      title: 'Abstract classes and interfaces',
      blocks: [
        { type: 'text', value: 'An interface describes what a class must be able to do. An abstract class can provide shared code and still force subclasses to implement specific methods.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `interface Named {
  name: string;
}

abstract class Animal implements Named {
  constructor(public name: string) {}

  abstract sound(): string;

  describe(): string {
    return this.name + ' says ' + this.sound();
  }
}

class Dog extends Animal {
  sound(): string {
    return 'woof';
  }
}

console.log(new Dog('Tom').describe());` },
        { type: 'text', value: 'You cannot create an instance of an abstract class. You extend it and provide the missing methods. If a subclass forgets sound(), the compiler stops the build.' },
        { type: 'note', value: 'Prefer interfaces for contracts between unrelated classes. Use abstract classes when subclasses genuinely share implementation.' },
      ],
    },
    {
      id: 'ts-static-getters',
      title: 'Static members and getters',
      blocks: [
        { type: 'text', value: 'static members belong to the class itself, not to an instance. Getters look like properties but run code, which keeps the API clean.' },
        { type: 'code', lang: 'ts', tryIt: true, value: `class Counter {
  private static count = 0;

  static next(): number {
    Counter.count += 1;
    return Counter.count;
  }
}

class Temperature {
  constructor(private celsius: number) {}

  get fahrenheit(): number {
    return this.celsius * 9 / 5 + 32;
  }
}

console.log(Counter.next(), Counter.next());
console.log(new Temperature(25).fahrenheit);` },
        { type: 'text', value: 'Static members are useful for factories, counters and configuration. Use them sparingly: heavy global state makes testing harder.' },
        { type: 'note', value: 'A getter must not have parameters. If you need arguments, use a normal method instead.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'classes-oop',
      q: 'What does private mean in TypeScript?',
      options: ['The member is hidden at runtime', 'The compiler blocks access outside the class', 'The member is readonly', 'The member is static'],
      answer: 1,
      explain: 'private is a compile-time restriction. Runtime privacy needs #private fields.',
    },
    {
      chapterId: 'classes-oop',
      q: 'What is a parameter property?',
      options: [
        'A constructor parameter that also declares and assigns a field',
        'A method parameter',
        'A static field',
        'A getter',
      ],
      answer: 0,
      explain: 'Writing public/private in the constructor saves declaring and assigning the field manually.',
    },
    {
      chapterId: 'classes-oop',
      q: 'Can you instantiate an abstract class?',
      options: ['Yes, always', 'No, it must be extended', 'Only with new', 'Only if it has no methods'],
      answer: 1,
      explain: 'Abstract classes are incomplete and must be subclassed.',
    },
    {
      chapterId: 'classes-oop',
      q: 'What does a static member belong to?',
      options: ['Each instance', 'The class itself', 'The module', 'The global object'],
      answer: 1,
      explain: 'Static members are shared on the class, not copied per instance.',
    },
    {
      chapterId: 'classes-oop',
      q: 'What is the difference between an interface and an abstract class?',
      options: [
        'An interface cannot contain implementation; an abstract class can share code',
        'An interface can be instantiated',
        'An abstract class cannot have methods',
        'They are identical',
      ],
      answer: 0,
      explain: 'Interfaces describe a contract. Abstract classes can implement shared behaviour and leave abstract methods to subclasses.',
    },
  ],
};
