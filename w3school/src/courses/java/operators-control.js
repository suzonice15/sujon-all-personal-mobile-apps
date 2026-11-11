// Java chapter: Operators and Control Flow.

export default {
  id: 'operators-control',
  title: 'Operators & Control Flow',
  description: 'Arithmetic, conditions, switch and loops',
  icon: 'call-split',
  lessons: [
    {
      id: 'java-operators',
      title: 'Operators',
      blocks: [
        { type: 'text', value: 'Arithmetic operators are +, -, *, / and %. Integer division drops the remainder. Comparison operators return boolean. && and || short-circuit, which matters when the right side has side effects.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        int a = 7;
        int b = 3;

        System.out.println(a + b);
        System.out.println(a / b);
        System.out.println(a % b);
        System.out.println(a > b && b > 0);
    }
}` },
        { type: 'note', value: 'Use parentheses when mixing && and ||. Java gives && higher precedence, and the intent is easy to misread without them.' },
      ],
    },
    {
      id: 'java-if-switch',
      title: 'Conditions and switch',
      blocks: [
        { type: 'text', value: 'if/else chooses a branch. A switch on a small set of values is clearer, and the arrow form avoids fall-through bugs.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        int score = 82;

        if (score >= 80) {
            System.out.println("A");
        } else if (score >= 60) {
            System.out.println("B");
        } else {
            System.out.println("F");
        }

        String role = "admin";
        switch (role) {
            case "admin" -> System.out.println("Full access");
            case "student" -> System.out.println("Learn");
            default -> System.out.println("Guest");
        }
    }
}` },
        { type: 'note', value: 'The old colon switch falls through unless every case ends with break. The arrow form has no fall-through and is preferred in modern Java.' },
      ],
    },
    {
      id: 'java-loops',
      title: 'Loops',
      blocks: [
        { type: 'text', value: 'for is best when the count is known. while is best when the condition decides. do/while runs at least once. break exits the loop and continue skips to the next iteration.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("i = " + i);
        }

        int n = 3;
        while (n > 0) {
            System.out.println("n = " + n);
            n--;
        }
    }
}` },
        { type: 'note', value: 'Avoid changing the loop variable inside the body when a for loop already controls it. That is a common source of skipped or infinite iterations.' },
      ],
    },
    {
      id: 'java-scope',
      title: 'Scope',
      blocks: [
        { type: 'text', value: 'A variable declared inside a block exists only inside that block. A local variable must be initialised before use. Fields live as long as the object.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    static int calls = 0;

    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            int inner = i * 2;
            System.out.println(inner);
        }

        calls++;
        System.out.println("calls = " + calls);
    }
}` },
        { type: 'note', value: 'A field with the same name as a parameter is hidden by the parameter. Use this.name to reach the field inside a constructor or method.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'operators-control',
      q: 'What is 7 / 3 for two ints?',
      options: ['2.33', '2', '3', 'An error'],
      answer: 1,
      explain: 'Integer division drops the fractional part.',
    },
    {
      chapterId: 'operators-control',
      q: 'Which switch form avoids fall-through?',
      options: ['The arrow form', 'The colon form', 'The if form', 'A loop'],
      answer: 0,
      explain: 'Modern arrow cases do not fall through.',
    },
    {
      chapterId: 'operators-control',
      q: 'Which loop always runs at least once?',
      options: ['for', 'while', 'do/while', 'foreach'],
      answer: 2,
      explain: 'do/while checks its condition after the body.',
    },
    {
      chapterId: 'operators-control',
      q: 'What does && do?',
      options: ['Always evaluates both sides', 'Short-circuits when the left is false', 'Compares strings', 'Loops'],
      answer: 1,
      explain: 'If the left side is false, the right side is not evaluated.',
    },
  ],
};
