// Kotlin chapter: Functions and Lambdas.

export default {
  id: 'functions-lambdas',
  title: 'Functions & Lambdas',
  description: 'Default arguments, extension functions and higher-order functions',
  icon: 'functions',
  lessons: [
    {
      id: 'kotlin-functions',
      title: 'Functions',
      blocks: [
        { type: 'text', value: 'A function uses fun. Parameters are name: Type. A single-expression function can use =. Default and named arguments make calls readable.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun greet(name: String, title: String = "Student"): String {
    return "$title $name"
}

fun add(a: Int, b: Int) = a + b

fun main() {
    println(greet("Ayesha"))
    println(greet("Rahim", title = "Mr."))
    println(add(2, 3))
}` },
        { type: 'note', value: 'Named arguments prevent the classic bug of swapping two same-typed values.' },
      ],
    },
    {
      id: 'kotlin-extension',
      title: 'Extension functions',
      blocks: [
        { type: 'text', value: 'An extension function adds a method to an existing type without changing it. It is resolved statically, so it cannot access private members.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun String.initials(): String {
    return split(" ").mapNotNull { it.firstOrNull() }.joinToString("")
}

fun main() {
    println("Ayesha Rahman".initials())
}` },
        { type: 'note', value: 'Use extensions for small, local helpers. Do not turn every utility into an extension; naming and discoverability matter.' },
      ],
    },
    {
      id: 'kotlin-lambdas',
      title: 'Lambdas and higher-order functions',
      blocks: [
        { type: 'text', value: 'A lambda is a function value: { x -> x * 2 }. A higher-order function takes a function or returns one. The last lambda argument can move outside the parentheses.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun applyAll(values: List<Int>, transform: (Int) -> Int): List<Int> {
    return values.map(transform)
}

fun main() {
    val doubled = applyAll(listOf(1, 2, 3)) { it * 2 }
    println(doubled)

    val evens = listOf(1, 2, 3, 4).filter { it % 2 == 0 }
    println(evens)
}` },
        { type: 'note', value: 'it is the implicit name for a single lambda parameter. Name parameters explicitly when the lambda is long or has more than one.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'functions-lambdas',
      q: 'How do you give a parameter a default value?',
      options: ['name := "x"', 'name: String = "x"', 'default name', 'name?'],
      answer: 1,
      explain: 'Write the default after the type.',
    },
    {
      chapterId: 'functions-lambdas',
      q: 'What is an extension function?',
      options: ['A new class', 'A function added to an existing type', 'A private method', 'A lambda'],
      answer: 1,
      explain: 'It adds behaviour without changing the type.',
    },
    {
      chapterId: 'functions-lambdas',
      q: 'What is it in a lambda?',
      options: ['The class', 'The single implicit parameter', 'The return value', 'A loop label'],
      answer: 1,
      explain: 'It is the implicit name for one parameter.',
    },
  ],
};
