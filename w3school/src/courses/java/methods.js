// Java chapter: Methods.

export default {
  id: 'methods',
  title: 'Methods',
  description: 'Parameters, return values, overloading and recursion',
  icon: 'functions',
  lessons: [
    {
      id: 'java-method-basics',
      title: 'Method basics',
      blocks: [
        { type: 'text', value: 'A method has a name, parameters and a return type. static methods belong to the class and can be called without creating an object. A method that returns nothing uses void.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    static void greet(String name) {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) {
        System.out.println(add(2, 3));
        greet("Ayesha");
    }
}` },
        { type: 'note', value: 'Java passes arguments by value. For an object, the value is the reference, so the method can change the object but cannot reassign the caller\'s variable.' },
      ],
    },
    {
      id: 'java-overloading',
      title: 'Overloading',
      blocks: [
        { type: 'text', value: 'Overloading means several methods share a name but differ in parameter types or count. The compiler chooses based on the arguments at the call site.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    static String format(int value) {
        return "int " + value;
    }

    static String format(double value) {
        return "double " + value;
    }

    static String format(String value) {
        return "text " + value;
    }

    public static void main(String[] args) {
        System.out.println(format(3));
        System.out.println(format(3.5));
        System.out.println(format("SQL"));
    }
}` },
        { type: 'note', value: 'Overloading is resolved at compile time. Two methods that differ only by return type are not valid overloads and will not compile.' },
      ],
    },
    {
      id: 'java-pass-by-value',
      title: 'Pass by value',
      blocks: [
        { type: 'text', value: 'Primitives are copied, so the caller is unaffected. Object references are copied too, but both copies point to the same object, so changes to the object are visible.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    static void changePrimitive(int value) {
        value = 99;
    }

    static void changeArray(int[] values) {
        values[0] = 99;
    }

    public static void main(String[] args) {
        int number = 5;
        changePrimitive(number);

        int[] numbers = { 5 };
        changeArray(numbers);

        System.out.println(number);
        System.out.println(numbers[0]);
    }
}` },
      ],
    },
    {
      id: 'java-recursion',
      title: 'Recursion',
      blocks: [
        { type: 'text', value: 'A recursive method calls itself with a smaller input and stops at a base case. Every call uses stack space, so deep recursion can throw StackOverflowError.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    static int factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));
    }
}` },
        { type: 'note', value: 'For very deep recursion, rewrite the method as a loop or use an explicit stack. Java does not optimise tail calls.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'methods',
      q: 'What does void mean in a method signature?',
      options: ['It returns null', 'It returns nothing', 'It is static', 'It takes no parameters'],
      answer: 1,
      explain: 'void means the method does not return a value.',
    },
    {
      chapterId: 'methods',
      q: 'What is method overloading?',
      options: ['Same name, different parameters', 'Same name, same parameters', 'Different name, same parameters', 'A method inside a loop'],
      answer: 0,
      explain: 'The signature differs by parameter types or count.',
    },
    {
      chapterId: 'methods',
      q: 'What happens when an int is passed to a method?',
      options: ['The original is modified', 'A copy is passed', 'The method returns it', 'It becomes a String'],
      answer: 1,
      explain: 'Java passes primitives by value, so the caller keeps the original.',
    },
    {
      chapterId: 'methods',
      q: 'What risk does deep recursion carry?',
      options: ['StackOverflowError', 'A compile error', 'NullPointerException', 'It is always faster'],
      answer: 0,
      explain: 'Each call uses stack space, and the stack is finite.',
    },
  ],
};
