// Kotlin chapter: Classes and Objects.

export default {
  id: 'classes-objects',
  title: 'Classes & Objects',
  description: 'Constructors, properties, data classes and objects',
  icon: 'class',
  lessons: [
    {
      id: 'kotlin-class-basics',
      title: 'Classes and constructors',
      blocks: [
        { type: 'text', value: 'A class declares a primary constructor in the header. val and var in the constructor also create properties. init blocks run when the object is created.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `class Student(val name: String, var score: Int) {
    init {
        require(score >= 0) { "Score cannot be negative" }
    }

    fun passed(): Boolean = score >= 60
}

fun main() {
    val s = Student("Ayesha", 92)
    println("\${s.name} \${s.passed()}")
}` },
        { type: 'note', value: 'require checks a precondition and throws IllegalArgumentException. It is a concise way to protect the invariant.' },
      ],
    },
    {
      id: 'kotlin-data-class',
      title: 'Data classes',
      blocks: [
        { type: 'text', value: 'A data class generates equals, hashCode, toString and copy. Use it for value-like data such as a point or an API response.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `data class Course(val id: Int, val title: String, val price: Int)

fun main() {
    val a = Course(1, "SQL", 5000)
    val b = a.copy(price = 5500)

    println(a)
    println(a == Course(1, "SQL", 5000))
    println(b)
}` },
        { type: 'note', value: 'A data class needs at least one constructor parameter and cannot be abstract, open, sealed or inner.' },
      ],
    },
    {
      id: 'kotlin-objects-companion',
      title: 'Objects and companion objects',
      blocks: [
        { type: 'text', value: 'object creates a singleton. A companion object holds static-like members for a class. Both are useful for constants and factories.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `class Counter private constructor() {
    companion object {
        private var count = 0

        fun next(): Int {
            count++
            return count
        }
    }
}

fun main() {
    println(Counter.next())
    println(Counter.next())
}` },
        { type: 'note', value: 'A companion object is not the same as Java static, but it is the idiomatic replacement for constants and factories.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'classes-objects',
      q: 'What does val in a constructor do?',
      options: ['Creates a local variable', 'Creates a read-only property', 'Creates a static field', 'Nothing'],
      answer: 1,
      explain: 'It declares and initialises a property.',
    },
    {
      chapterId: 'classes-objects',
      q: 'What does a data class generate?',
      options: ['Only a constructor', 'equals, hashCode, toString and copy', 'A database table', 'A route'],
      answer: 1,
      explain: 'It gives value semantics for free.',
    },
    {
      chapterId: 'classes-objects',
      q: 'What is a companion object?',
      options: ['A singleton tied to a class', 'A private method', 'A lambda', 'An interface'],
      answer: 0,
      explain: 'It holds static-like members.',
    },
  ],
};
