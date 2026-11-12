// C# chapter: Variables and Types.

export default {
  id: 'variables-types',
  title: 'Variables & Types',
  description: 'Value types, reference types, strings and null',
  icon: 'category',
  lessons: [
    {
      id: 'cs-value-reference',
      title: 'Value types and reference types',
      blocks: [
        { type: 'text', value: 'This is the most important idea in C#. A value type holds the data directly, like a box with the value inside. A reference type holds an address that points to the data, like a note with a house address.' },
        { type: 'list', items: [
          'Value types: int, double, bool, char, struct, enum',
          'Reference types: string, arrays, classes, objects',
          'Copying a value type copies the value',
          'Copying a reference type copies the address, not the object',
        ] },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        int a = 10;
        int b = a;      // copy the value
        b = 20;
        Console.WriteLine(a); // 10

        int[] first = { 1, 2, 3 };
        int[] second = first; // copy the reference
        second[0] = 99;
        Console.WriteLine(first[0]); // 99
    }
}` },
        { type: 'note', value: 'If changing one variable changes another, they probably share the same object. That is normal for reference types, not a bug.' },
      ],
    },
    {
      id: 'cs-built-in-types',
      title: 'Built-in types',
      blocks: [
        { type: 'text', value: 'The common types are int for whole numbers, double for decimals, decimal for money, bool for true/false, char for one character and string for text.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        int age = 21;
        double height = 1.75;
        decimal price = 4999.50m;
        bool active = true;
        char grade = 'A';
        string name = "Ayesha";

        var city = "Dhaka"; // compiler infers string

        Console.WriteLine($"{name}, {age}, {height}, {price}, {active}, {grade}, {city}");
    }
}` },
        { type: 'note', value: 'Use decimal for money. double is fine for measurements, but it cannot represent every decimal exactly.' },
      ],
    },
    {
      id: 'cs-strings-null',
      title: 'Strings and null',
      blocks: [
        { type: 'text', value: 'A string is a reference type but behaves like a value: it is immutable, so every change creates a new string. Null means "no object". Modern C# can warn you before you use a null value.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        string name = "Ayesha";
        string upper = name.ToUpper();
        Console.WriteLine(upper);

        string? nickname = null;
        Console.WriteLine(nickname?.Length ?? 0); // 0, no crash

        string text = $"{name} has {name.Length} letters";
        Console.WriteLine(text);
    }
}` },
        { type: 'list', items: [
          'string? means the value may be null',
          '?. accesses a member only when the object is not null',
          '?? provides a fallback when the left side is null',
          '$"..." is string interpolation',
        ] },
        { type: 'note', value: 'Enable nullable reference types in new projects. The compiler then warns you about possible nulls before they crash at runtime.' },
      ],
    },
    {
      id: 'cs-conversions',
      title: 'Conversions',
      blocks: [
        { type: 'text', value: 'A widening conversion is safe and automatic, such as int to double. A narrowing conversion needs a cast and can lose data. Converting text to a number needs parsing.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        int whole = 5;
        double widened = whole;      // safe

        double decimalValue = 9.7;
        int narrowed = (int)decimalValue; // 9, data lost

        string input = "42";
        int parsed = int.Parse(input);

        if (int.TryParse("abc", out int safe))
        {
            Console.WriteLine(safe);
        }
        else
        {
            Console.WriteLine("Not a number");
        }

        Console.WriteLine($"{widened} {narrowed} {parsed}");
    }
}` },
        { type: 'note', value: 'Prefer TryParse for user input. Parse throws an exception when the text is not a number.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'variables-types',
      q: 'Which is a value type?',
      options: ['string', 'int', 'array', 'class'],
      answer: 1,
      explain: 'int, double, bool and char are value types.',
    },
    {
      chapterId: 'variables-types',
      q: 'What happens when you copy an array variable?',
      options: ['The array is cloned', 'Both variables point to the same array', 'It becomes null', 'It throws'],
      answer: 1,
      explain: 'Arrays are reference types; only the reference is copied.',
    },
    {
      chapterId: 'variables-types',
      q: 'Which type is best for money?',
      options: ['double', 'float', 'decimal', 'int'],
      answer: 2,
      explain: 'decimal avoids floating-point rounding for currency.',
    },
    {
      chapterId: 'variables-types',
      q: 'What does ?? do?',
      options: ['Compares two values', 'Provides a fallback when the left side is null', 'Casts a type', 'Loops'],
      answer: 1,
      explain: 'It is the null-coalescing operator.',
    },
  ],
};
