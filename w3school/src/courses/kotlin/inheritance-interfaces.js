// Kotlin chapter: Inheritance and Interfaces.

export default {
  id: 'inheritance-interfaces',
  title: 'Inheritance & Interfaces',
  description: 'open, override, abstract, interfaces and sealed classes',
  icon: 'account-tree',
  lessons: [
    {
      id: 'kotlin-inheritance',
      title: 'Inheritance',
      blocks: [
        { type: 'text', value: 'Classes are final by default. Mark a class open to allow inheritance and a member open or override to allow overriding. This prevents accidental fragile base classes.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `open class Animal(val name: String) {
    open fun sound(): String = "..."
}

class Dog(name: String) : Animal(name) {
    override fun sound(): String = "woof"
}

fun main() {
    val dog = Dog("Tom")
    println("\${dog.name} says \${dog.sound()}")
}` },
        { type: 'note', value: 'Final by default is a deliberate design choice. You opt in to extension instead of fighting accidental overrides.' },
      ],
    },
    {
      id: 'kotlin-interfaces',
      title: 'Interfaces',
      blocks: [
        { type: 'text', value: 'An interface can declare abstract members and provide default implementations. A class can implement many interfaces, and properties can be declared in an interface.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `interface Named {
    val name: String
}

interface Printable {
    fun print() {
        println("Printable")
    }
}

class Student(override val name: String) : Named, Printable

fun main() {
    val s = Student("Ayesha")
    println(s.name)
    s.print()
}` },
        { type: 'note', value: 'If two interfaces provide the same default method, the class must override it and can call super<Interface>.print().' },
      ],
    },
    {
      id: 'kotlin-sealed-abstract',
      title: 'Sealed and abstract classes',
      blocks: [
        { type: 'text', value: 'A sealed class restricts subclasses to the same package or file. It is perfect for a fixed set of states, and when becomes exhaustive.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `sealed class Result {
    data class Success(val value: Int) : Result()
    data class Failure(val message: String) : Result()
}

fun describe(result: Result): String = when (result) {
    is Result.Success -> "ok: \${result.value}"
    is Result.Failure -> "error: \${result.message}"
}

fun main() {
    println(describe(Result.Success(42)))
    println(describe(Result.Failure("offline")))
}` },
        { type: 'note', value: 'A sealed class is a closed set; an abstract class is open for anyone to extend. Choose sealed for known states and abstract for shared implementation.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'inheritance-interfaces',
      q: 'Are Kotlin classes open by default?',
      options: ['Yes', 'No, they are final by default', 'Only data classes', 'Only in Android'],
      answer: 1,
      explain: 'You must mark them open to inherit.',
    },
    {
      chapterId: 'inheritance-interfaces',
      q: 'What is a sealed class for?',
      options: ['A fixed set of subclasses', 'A database table', 'A thread', 'A lambda'],
      answer: 0,
      explain: 'It models a closed set of states.',
    },
    {
      chapterId: 'inheritance-interfaces',
      q: 'How many interfaces can a class implement?',
      options: ['One', 'Two', 'Many', 'None'],
      answer: 2,
      explain: 'A class can implement multiple interfaces.',
    },
  ],
};
