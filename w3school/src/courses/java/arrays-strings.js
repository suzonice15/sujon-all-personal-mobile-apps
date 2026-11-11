// Java chapter: Arrays and Strings.

export default {
  id: 'arrays-strings',
  title: 'Arrays & Strings',
  description: 'Fixed-size arrays, String methods and StringBuilder',
  icon: 'view-column',
  lessons: [
    {
      id: 'java-arrays',
      title: 'Arrays',
      blocks: [
        { type: 'text', value: 'An array has a fixed length chosen at creation. Access by index is O(1). Going past the end throws ArrayIndexOutOfBoundsException.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] scores = { 85, 92, 78 };
        Arrays.sort(scores);

        System.out.println(Arrays.toString(scores));
        System.out.println(scores.length);
        System.out.println(scores[0]);
    }
}` },
        { type: 'note', value: 'length is a field, not a method. Use scores.length, not scores.length().' },
      ],
    },
    {
      id: 'java-enhanced-for',
      title: 'Enhanced for and 2D arrays',
      blocks: [
        { type: 'text', value: 'The enhanced for loop reads every element without managing an index. A 2D array is an array of arrays, so each row can have a different length.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        int[][] grid = {
            { 1, 2 },
            { 3, 4 }
        };

        for (int[] row : grid) {
            for (int value : row) {
                System.out.print(value + " ");
            }
            System.out.println();
        }
    }
}` },
        { type: 'note', value: 'The enhanced for loop cannot modify the array structure. If you need the index or need to change elements, use a normal for loop.' },
      ],
    },
    {
      id: 'java-string-methods',
      title: 'String methods',
      blocks: [
        { type: 'text', value: 'Strings are immutable. trim removes surrounding whitespace, toUpperCase returns a new string, and equals compares content. split and join are common for parsing.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        String text = "  Hello Java  ";
        String clean = text.trim();

        System.out.println(clean);
        System.out.println(clean.toUpperCase());
        System.out.println(clean.contains("Java"));
        System.out.println(clean.replace("Java", "World"));

        String[] parts = "a,b,c".split(",");
        System.out.println(parts.length);
    }
}` },
        { type: 'note', value: 'Never compare strings with ==. Use equals for content and equalsIgnoreCase when case should not matter.' },
      ],
    },
    {
      id: 'java-stringbuilder',
      title: 'StringBuilder',
      blocks: [
        { type: 'text', value: 'Building a string with += in a loop creates a new object every time. StringBuilder appends to a mutable buffer, so the work stays linear.' },
        { type: 'code', lang: 'java', tryIt: false, value: `public class Main {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder();

        for (int i = 1; i <= 3; i++) {
            builder.append(i).append(" ");
        }

        System.out.println(builder.toString().trim());
        System.out.println(builder.reverse());
    }
}` },
        { type: 'note', value: 'Use StringBuilder for loops and repeated concatenation. For a few joins, String.join or a literal is clearer.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'arrays-strings',
      q: 'How do you read an array length?',
      options: ['length()', 'size()', 'length', 'count'],
      answer: 2,
      explain: 'length is a field on arrays; size() is for collections.',
    },
    {
      chapterId: 'arrays-strings',
      q: 'What does an out-of-range index cause?',
      options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'A compile error', 'It wraps around'],
      answer: 1,
      explain: 'Java checks the index and throws at runtime.',
    },
    {
      chapterId: 'arrays-strings',
      q: 'Which class builds strings efficiently in a loop?',
      options: ['String', 'StringBuilder', 'StringBuffer only', 'Array'],
      answer: 1,
      explain: 'StringBuilder is mutable and avoids repeated allocation.',
    },
    {
      chapterId: 'arrays-strings',
      q: 'What does trim() do?',
      options: ['Removes internal spaces', 'Removes leading and trailing whitespace', 'Uppercases text', 'Splits the string'],
      answer: 1,
      explain: 'trim returns a new string without surrounding whitespace.',
    },
  ],
};
