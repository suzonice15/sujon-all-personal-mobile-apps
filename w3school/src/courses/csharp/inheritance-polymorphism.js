// C# chapter: Inheritance and Polymorphism.

export default {
  id: 'inheritance-polymorphism',
  title: 'Inheritance & Interfaces',
  description: 'Reuse, override and program to a contract',
  icon: 'account-tree',
  lessons: [
    {
      id: 'cs-inheritance',
      title: 'Inheritance',
      blocks: [
        { type: 'text', value: 'Inheritance lets a child class reuse a parent class. The child gets the parent members and can add its own. Use it only when the relationship is truly "is a".' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Animal
{
    public string Name { get; }

    public Animal(string name)
    {
        Name = name;
    }

    public virtual string Sound() => "...";
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }

    public override string Sound() => "woof";
}

class Program
{
    static void Main()
    {
        var dog = new Dog("Tom");
        Console.WriteLine($"{dog.Name} says {dog.Sound()}");
    }
}` },
        { type: 'note', value: 'base(name) calls the parent constructor. A child constructor must always run a parent constructor first.' },
      ],
    },
    {
      id: 'cs-polymorphism',
      title: 'Polymorphism',
      blocks: [
        { type: 'text', value: 'Polymorphism means one call can run different code depending on the real object. A parent variable can hold a child object; the overridden method runs.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;
using System.Collections.Generic;

class Animal
{
    public virtual string Sound() => "...";
}

class Cat : Animal
{
    public override string Sound() => "meow";
}

class Dog : Animal
{
    public override string Sound() => "woof";
}

class Program
{
    static void Main()
    {
        var animals = new List<Animal> { new Cat(), new Dog() };

        foreach (var animal in animals)
        {
            Console.WriteLine(animal.Sound());
        }
    }
}` },
        { type: 'note', value: 'Virtual means "a child may replace this". Override means "I am replacing it". Without virtual, the parent method always wins.' },
      ],
    },
    {
      id: 'cs-abstract',
      title: 'Abstract classes',
      blocks: [
        { type: 'text', value: 'An abstract class is an incomplete blueprint. It cannot be created directly. It can provide shared code and force children to implement specific methods.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

abstract class Shape
{
    public abstract double Area();

    public void Describe()
    {
        Console.WriteLine($"Area is {Area():F2}");
    }
}

class Square : Shape
{
    private readonly double side;

    public Square(double side)
    {
        this.side = side;
    }

    public override double Area() => side * side;
}

class Program
{
    static void Main()
    {
        new Square(3).Describe();
    }
}` },
        { type: 'note', value: 'Use an abstract class when children share code. Use an interface when you only need a contract.' },
      ],
    },
    {
      id: 'cs-interfaces',
      title: 'Interfaces',
      blocks: [
        { type: 'text', value: 'An interface lists what a class can do, not how. A class can implement many interfaces, so unrelated types can share a capability.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

interface INamed
{
    string Name { get; }
}

interface IPrintable
{
    void Print();
}

class Student : INamed, IPrintable
{
    public string Name { get; }

    public Student(string name)
    {
        Name = name;
    }

    public void Print()
    {
        Console.WriteLine($"Student: {Name}");
    }
}

class Program
{
    static void Main()
    {
        IPrintable item = new Student("Ayesha");
        item.Print();
    }
}` },
        { type: 'note', value: 'Program to an interface when the caller only needs the behaviour. It makes testing and replacing implementations easier.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'inheritance-polymorphism',
      q: 'Which keyword lets a child replace a parent method?',
      options: ['new', 'override', 'static', 'sealed'],
      answer: 1,
      explain: 'The parent marks virtual; the child uses override.',
    },
    {
      chapterId: 'inheritance-polymorphism',
      q: 'Can an abstract class be instantiated?',
      options: ['Yes', 'No, it must be subclassed', 'Only with new', 'Only if it has no methods'],
      answer: 1,
      explain: 'It is incomplete by design.',
    },
    {
      chapterId: 'inheritance-polymorphism',
      q: 'How many interfaces can a class implement?',
      options: ['One', 'Two', 'Many', 'None'],
      answer: 2,
      explain: 'A class can implement multiple interfaces.',
    },
    {
      chapterId: 'inheritance-polymorphism',
      q: 'What does base(name) do?',
      options: ['Creates a child', 'Calls the parent constructor', 'Overrides a method', 'Deletes the parent'],
      answer: 1,
      explain: 'It passes the argument to the parent constructor.',
    },
  ],
};
