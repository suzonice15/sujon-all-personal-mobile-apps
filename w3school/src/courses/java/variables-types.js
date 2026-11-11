// Java chapter: Variables and Types.

export default {
  id: 'variables-types',
  title: 'Variables & Types',
  description: 'Primitives, String, casting and constants',
  icon: 'category',
  lessons: [
    {
      id: 'java-primitives',
      title: 'Primitive types',
      blocks: [
        { type: 'text', value: 'Java has eight primitive types. The most common are int, long, double, boolean and char. They are not objects and they cannot be null.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        int age = 21;
        long population = 8_000_000_000L;
        double price = 99.5;
        boolean active = true;
        char grade = 'A';

        System.out.println(age);
        System.out.println(population);
        System.out.println(price);
        System.out.println(active);
        System.out.println(grade);
    }
}` },
        { type: 'list', items: [
          'byte, short, int, long - whole numbers',
          'float, double - decimals; double is the default',
          'char - one UTF-16 character',
          'boolean - true or false',
        ] },
        { type: 'note', value: 'Use int for normal counters, long for money in paisa or timestamps, and BigDecimal for exact decimal money calculations.' },
      ],
    },
    {
      id: 'java-strings',
      title: 'Strings',
      blocks: [
        { type: 'text', value: 'String is an object, not a primitive. Strings are immutable: every operation returns a new string. Use StringBuilder when you build a long string in a loop.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        String name = "Ayesha";
        String city = "Dhaka";

        System.out.println(name + " from " + city);
        System.out.println(name.length());
        System.out.println(name.toUpperCase());
        System.out.println(name.equals("Ayesha"));
    }
}` },
        { type: 'note', value: 'Compare strings with equals, not ==. == compares references, and two equal strings may be different objects.' },
      ],
    },
    {
      id: 'java-var-constants',
      title: 'var and constants',
      blocks: [
        { type: 'text', value: 'var lets the compiler infer the type from the initialiser. It is still statically typed; the type is fixed after declaration. final makes a variable constant.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    static final int MAX_LESSONS = 12;

    public static void main(String[] args) {
        var course = "SQL";
        var price = 5000;

        System.out.println(course + " costs " + price);
        System.out.println("Max lessons: " + MAX_LESSONS);
    }
}` },
        { type: 'list', items: [
          'var only works for local variables with an initialiser',
          'final prevents reassignment',
          'static final constants are shared by the class',
          'Constants are usually written in UPPER_SNAKE_CASE',
        ] },
      ],
    },
    {
      id: 'java-casting',
      title: 'Casting',
      blocks: [
        { type: 'text', value: 'Widening conversion is automatic and safe. Narrowing conversion needs an explicit cast and can lose data. Java never silently turns a double into an int.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        int whole = 5;
        double widened = whole;

        double decimal = 9.7;
        int narrowed = (int) decimal;

        System.out.println(widened);
        System.out.println(narrowed);
    }
}` },
        { type: 'note', value: 'Casting a double to int truncates, it does not round. Use Math.round when rounding is the intent.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'variables-types',
      q: 'Which type stores true or false?',
      options: ['int', 'char', 'boolean', 'double'],
      answer: 2,
      explain: 'boolean holds one of two values: true or false.',
    },
    {
      chapterId: 'variables-types',
      q: 'How should two strings be compared?',
      options: ['With ==', 'With equals', 'With >', 'With compareTo only'],
      answer: 1,
      explain: 'equals compares content; == compares references.',
    },
    {
      chapterId: 'variables-types',
      q: 'What does final mean for a variable?',
      options: ['It is static', 'It cannot be reassigned', 'It is null', 'It is a string'],
      answer: 1,
      explain: 'final makes the binding constant after initialisation.',
    },
    {
      chapterId: 'variables-types',
      q: 'What does (int) 9.7 produce?',
      options: ['10', '9', '9.7', 'An error'],
      answer: 1,
      explain: 'Casting to int truncates the decimal part.',
    },
  ],
};
