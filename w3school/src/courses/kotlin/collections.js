// Kotlin chapter: Collections.

export default {
  id: 'collections',
  title: 'Collections',
  description: 'List, Map, Set and functional operations',
  icon: 'view-list',
  lessons: [
    {
      id: 'kotlin-collections-basics',
      title: 'List, Set and Map',
      blocks: [
        { type: 'text', value: 'Kotlin separates read-only and mutable collections. listOf is read-only; mutableListOf can change. Use the read-only type unless you need mutation.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun main() {
    val names = listOf("Ayesha", "Rahim")
    val scores = mapOf("Ayesha" to 92, "Rahim" to 78)
    val unique = setOf(1, 2, 2, 3)

    println(names[0])
    println(scores["Ayesha"])
    println(unique.size)
}` },
        { type: 'note', value: 'A read-only List is not deeply immutable. The interface prevents mutation through that reference, but the underlying collection may still change elsewhere.' },
      ],
    },
    {
      id: 'kotlin-collection-ops',
      title: 'Functional operations',
      blocks: [
        { type: 'text', value: 'filter, map, sortedBy, groupBy and sumOf cover most list work. They return new collections and read like the question you are asking.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `data class Course(val title: String, val price: Int)

fun main() {
    val courses = listOf(
        Course("SQL", 5000),
        Course("Kotlin", 6000),
        Course("Git", 2000)
    )

    val cheap = courses
        .filter { it.price < 6000 }
        .sortedBy { it.price }
        .map { it.title }

    println(cheap)
    println(courses.sumOf { it.price })
    println(courses.groupBy { it.price >= 5000 })
}` },
        { type: 'note', value: 'Chained operations create intermediate lists. For very large data, use asSequence() to process lazily.' },
      ],
    },
    {
      id: 'kotlin-destructuring',
      title: 'Destructuring',
      blocks: [
        { type: 'text', value: 'data classes and pairs support destructuring. It keeps iteration and map entries readable.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `data class Point(val x: Int, val y: Int)

fun main() {
    val (x, y) = Point(2, 3)
    println("$x $y")

    val scores = mapOf("Ayesha" to 92)
    for ((name, score) in scores) {
        println("$name $score")
    }
}` },
        { type: 'note', value: 'Destructuring is positional. If a data class field order changes, the destructured names may silently mean something else.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'collections',
      q: 'What is the difference between listOf and mutableListOf?',
      options: ['listOf is read-only', 'mutableListOf is faster', 'They are identical', 'listOf is a map'],
      answer: 0,
      explain: 'listOf exposes a read-only interface.',
    },
    {
      chapterId: 'collections',
      q: 'Which operation transforms each element?',
      options: ['filter', 'map', 'sumOf', 'groupBy'],
      answer: 1,
      explain: 'map returns a new list of transformed values.',
    },
    {
      chapterId: 'collections',
      q: 'Why use asSequence?',
      options: ['To sort', 'To process lazily without intermediate lists', 'To make it mutable', 'To encrypt'],
      answer: 1,
      explain: 'Sequences avoid building a list per step.',
    },
  ],
};
