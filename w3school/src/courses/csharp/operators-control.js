// C# chapter: Operators and Control Flow.

export default {
  id: 'operators-control',
  title: 'Operators & Control Flow',
  description: 'Math, conditions, switch and loops',
  icon: 'call-split',
  lessons: [
    {
      id: 'cs-operators',
      title: 'Operators',
      blocks: [
        { type: 'text', value: 'Operators work like a calculator: +, -, *, / and %. Integer division drops the remainder. Comparison operators return true or false, and && / || combine conditions.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        int a = 7;
        int b = 3;

        Console.WriteLine(a + b);
        Console.WriteLine(a / b); // 2, not 2.33
        Console.WriteLine(a % b); // 1
        Console.WriteLine(a > b && b > 0);

        double exact = (double)a / b;
        Console.WriteLine(exact);
    }
}` },
        { type: 'note', value: 'If you want a decimal result from two ints, cast one of them to double first.' },
      ],
    },
    {
      id: 'cs-conditions',
      title: 'if, else and switch',
      blocks: [
        { type: 'text', value: 'if/else chooses a branch. switch is cleaner when you compare one value against several options. The switch expression is a short way to return a value.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        int score = 82;

        if (score >= 80)
        {
            Console.WriteLine("A");
        }
        else if (score >= 60)
        {
            Console.WriteLine("B");
        }
        else
        {
            Console.WriteLine("F");
        }

        string label = score >= 60 ? "Passed" : "Failed";
        Console.WriteLine(label);

        string grade = score switch
        {
            >= 80 => "A",
            >= 60 => "B",
            _ => "F"
        };
        Console.WriteLine(grade);
    }
}` },
        { type: 'note', value: 'The _ in a switch expression is the default case. It matches anything not handled above.' },
      ],
    },
    {
      id: 'cs-loops',
      title: 'Loops',
      blocks: [
        { type: 'text', value: 'for is best when you know the count. foreach is best for collections. while repeats while a condition is true. do/while runs at least once.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        for (int i = 1; i <= 3; i++)
        {
            Console.WriteLine($"i = {i}");
        }

        string[] names = { "Ayesha", "Rahim", "Nusrat" };
        foreach (string name in names)
        {
            Console.WriteLine(name);
        }

        int n = 3;
        while (n > 0)
        {
            Console.WriteLine($"n = {n}");
            n--;
        }
    }
}` },
        { type: 'note', value: 'foreach cannot change the collection while it runs. If you need to remove items, collect them first or loop backwards with for.' },
      ],
    },
    {
      id: 'cs-break-continue',
      title: 'break and continue',
      blocks: [
        { type: 'text', value: 'break exits the loop immediately. continue skips the rest of the current iteration and moves to the next one. Use them to keep the main path readable.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `using System;

class Program
{
    static void Main()
    {
        for (int i = 1; i <= 10; i++)
        {
            if (i % 2 == 0)
            {
                continue; // skip even numbers
            }

            if (i > 7)
            {
                break; // stop after 7
            }

            Console.WriteLine(i);
        }
    }
}` },
        { type: 'note', value: 'A loop with a break in the middle is sometimes clearer than a complex condition in the header. Choose readability.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'operators-control',
      q: 'What is 7 / 3 for two ints?',
      options: ['2.33', '2', '3', 'An error'],
      answer: 1,
      explain: 'Integer division drops the fraction.',
    },
    {
      chapterId: 'operators-control',
      q: 'Which loop is best for a collection?',
      options: ['for', 'foreach', 'while', 'do/while'],
      answer: 1,
      explain: 'foreach reads every item without managing an index.',
    },
    {
      chapterId: 'operators-control',
      q: 'What does continue do?',
      options: ['Exits the loop', 'Skips to the next iteration', 'Restarts the loop', 'Throws'],
      answer: 1,
      explain: 'It skips the rest of the current iteration.',
    },
    {
      chapterId: 'operators-control',
      q: 'What does _ mean in a switch expression?',
      options: ['A variable', 'The default case', 'A comment', 'A loop'],
      answer: 1,
      explain: 'It matches any value not handled earlier.',
    },
  ],
};
