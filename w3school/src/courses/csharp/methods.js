// C# chapter: Methods.

export default {
  id: 'methods',
  title: 'Methods',
  description: 'Parameters, return values, ref, out and overloading',
  icon: 'functions',
  lessons: [
    {
      id: 'cs-method-basics',
      title: 'Method basics',
      blocks: [
        { type: 'text', value: 'A method is a named block of code you can call. It can take parameters and return a value. A method that returns nothing uses void.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static int Add(int a, int b)
    {
        return a + b;
    }

    static void Greet(string name)
    {
        Console.WriteLine($"Hello, {name}");
    }

    static void Main()
    {
        Console.WriteLine(Add(2, 3));
        Greet("Ayesha");
    }
}` },
        { type: 'note', value: 'A method name should say what it does. Add, CalculateTotal and SendEmail are clearer than DoStuff.' },
      ],
    },
    {
      id: 'cs-optional-named',
      title: 'Optional and named arguments',
      blocks: [
        { type: 'text', value: 'A parameter with a default value becomes optional. Named arguments let the caller choose the order and make the call easier to read.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static string Greet(string name, string title = "Student")
    {
        return $"{title} {name}";
    }

    static void Main()
    {
        Console.WriteLine(Greet("Ayesha"));
        Console.WriteLine(Greet("Rahim", "Mr."));
        Console.WriteLine(Greet(title: "Dr.", name: "Nusrat"));
    }
}` },
        { type: 'note', value: 'Optional parameters must come after required ones. Defaults are evaluated at the call site, so changing a default requires recompiling the caller.' },
      ],
    },
    {
      id: 'cs-ref-out',
      title: 'ref and out',
      blocks: [
        { type: 'text', value: 'Normally a method gets a copy of a value. ref lets it change the caller variable. out is used when the method must assign the value, like TryParse.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Double(ref int value)
    {
        value *= 2;
    }

    static bool TryHalf(int input, out int result)
    {
        if (input % 2 != 0)
        {
            result = 0;
            return false;
        }
        result = input / 2;
        return true;
    }

    static void Main()
    {
        int number = 5;
        Double(ref number);
        Console.WriteLine(number); // 10

        if (TryHalf(10, out int half))
        {
            Console.WriteLine(half);
        }
    }
}` },
        { type: 'note', value: 'ref and out are useful but easy to overuse. Prefer returning a value or a small result object when it makes the method easier to read.' },
      ],
    },
    {
      id: 'cs-overloading',
      title: 'Overloading',
      blocks: [
        { type: 'text', value: 'Overloading means several methods share a name but differ in parameters. C# picks the right one from the arguments. It makes an API feel natural.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static string Format(int value) => $"int {value}";
    static string Format(double value) => $"double {value}";
    static string Format(string value) => $"text {value}";

    static void Main()
    {
        Console.WriteLine(Format(3));
        Console.WriteLine(Format(3.5));
        Console.WriteLine(Format("SQL"));
    }
}` },
        { type: 'note', value: 'A method that differs only by return type is not a valid overload. The parameter list must differ.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'methods',
      q: 'What does void mean?',
      options: ['Returns null', 'Returns nothing', 'Takes no parameters', 'Is static'],
      answer: 1,
      explain: 'The method does not return a value.',
    },
    {
      chapterId: 'methods',
      q: 'What is an optional parameter?',
      options: ['A parameter with a default value', 'A parameter without a type', 'A static parameter', 'A null parameter'],
      answer: 0,
      explain: 'The caller may omit it.',
    },
    {
      chapterId: 'methods',
      q: 'What does out require?',
      options: ['The method must assign the parameter', 'The caller must pass null', 'The method returns void', 'The parameter is optional'],
      answer: 0,
      explain: 'out is for values the method produces.',
    },
    {
      chapterId: 'methods',
      q: 'What is method overloading?',
      options: ['Same name, different parameters', 'Same name, same parameters', 'Different name, same parameters', 'A loop'],
      answer: 0,
      explain: 'The compiler chooses by the argument list.',
    },
  ],
};
