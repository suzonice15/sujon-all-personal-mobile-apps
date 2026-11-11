// Java chapter: Collections.

export default {
  id: 'collections',
  title: 'Collections',
  description: 'List, Map and Set with generics',
  icon: 'view-list',
  lessons: [
    {
      id: 'java-arraylist',
      title: 'ArrayList',
      blocks: [
        { type: 'text', value: 'ArrayList is a resizable array. Index access is O(1), appending is amortized O(1), and inserting in the middle is O(n). It is the default List implementation.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Ayesha");
        names.add("Rahim");
        names.remove("Rahim");

        System.out.println(names);
        System.out.println(names.size());
        System.out.println(names.contains("Ayesha"));
    }
}` },
        { type: 'note', value: 'Declare the variable as List, not ArrayList, so the implementation can change later.' },
      ],
    },
    {
      id: 'java-hashmap',
      title: 'HashMap',
      blocks: [
        { type: 'text', value: 'A Map stores key-value pairs with average O(1) lookup. Keys must be unique. Use HashMap for speed and LinkedHashMap when insertion order matters.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Ayesha", 92);
        scores.put("Rahim", 78);

        System.out.println(scores.get("Ayesha"));
        System.out.println(scores.containsKey("Nusrat"));
        System.out.println(scores.getOrDefault("Nusrat", 0));
    }
}` },
        { type: 'note', value: 'Objects used as keys must implement equals and hashCode consistently. Mutable keys can become unreachable inside the map.' },
      ],
    },
    {
      id: 'java-hashset',
      title: 'HashSet',
      blocks: [
        { type: 'text', value: 'A Set stores unique values. add returns false when the value already exists. HashSet is fast; TreeSet keeps sorted order; LinkedHashSet keeps insertion order.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<Integer> seen = new HashSet<>();
        System.out.println(seen.add(1));
        System.out.println(seen.add(1));
        System.out.println(seen.add(2));

        System.out.println(seen);
        System.out.println(seen.contains(2));
    }
}` },
      ],
    },
    {
      id: 'java-iterate-sort',
      title: 'Iteration and sorting',
      blocks: [
        { type: 'text', value: 'Collections.sort sorts a List in place. For objects, pass a Comparator. Never modify a collection while iterating with a for-each; use an Iterator.remove or collect the removals first.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> values = new ArrayList<>(List.of(5, 2, 9, 1));
        Collections.sort(values);

        for (int value : values) {
            System.out.print(value + " ");
        }
        System.out.println();

        Collections.sort(values, Collections.reverseOrder());
        System.out.println(values);
    }
}` },
        { type: 'note', value: 'For a custom order, use values.sort(Comparator.comparing(Course::getTitle)). Comparators are composable with thenComparing.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'collections',
      q: 'Which List implementation is a resizable array?',
      options: ['LinkedList', 'ArrayList', 'HashSet', 'HashMap'],
      answer: 1,
      explain: 'ArrayList stores elements in a backing array.',
    },
    {
      chapterId: 'collections',
      q: 'What does Map.getOrDefault do?',
      options: ['Throws if missing', 'Returns a fallback when the key is absent', 'Adds the key', 'Deletes the key'],
      answer: 1,
      explain: 'It avoids a null check for missing keys.',
    },
    {
      chapterId: 'collections',
      q: 'What does Set.add return when the value exists?',
      options: ['true', 'false', 'null', 'The old value'],
      answer: 1,
      explain: 'A Set keeps unique values, so a duplicate add returns false.',
    },
    {
      chapterId: 'collections',
      q: 'Why must map keys implement hashCode?',
      options: ['To sort them', 'To find the bucket for lookup', 'To print them', 'To make them immutable'],
      answer: 1,
      explain: 'The hash code decides the bucket; equals confirms the key.',
    },
  ],
};
