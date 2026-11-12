// Kotlin chapter: Syntax and Types.

export default {
  id: 'syntax-types',
  title: 'Syntax & Types',
  description: 'val, var, null safety and type inference',
  icon: 'category',
  lessons: [
    {
      id: 'kotlin-val-var',
      title: 'val and var',
      blocks: [
        { type: 'text', value: 'val is a read-only reference; var can be reassigned. Prefer val. The compiler infers types, but you can write them explicitly.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun main() {
    val name: String = "Ayesha"
    var age = 21
    age = 22

    val price: Double = 99.5
    val active = true

    println("$name is $age, price $price, active $active")
}` },
        { type: 'note', value: 'val does not mean the object is immutable; it means the reference cannot be reassigned. A val list can still be mutable.' },
      ],
    },
    {
      id: 'kotlin-null-safety',
      title: 'Null safety',
      blocks: [
        { type: 'text', value: 'A String cannot be null. A String? may be null, and the compiler forces you to handle it with ?., ?: or a null check.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun main() {
    val nickname: String? = null
    println(nickname?.length ?: 0)

    val text: String? = "Kotlin"
    if (text != null) {
        println(text.uppercase())
    }

    val length = text?.length ?: 0
    println(length)
}` },
        { type: 'note', value: 'The !! operator forces a null check at runtime and throws if the value is null. Avoid it; use ?. and ?: instead.' },
      ],
    },
    {
      id: 'kotlin-conversions',
      title: 'Conversions and strings',
      blocks: [
        { type: 'text', value: 'Kotlin does not convert numbers implicitly. Use toInt(), toDouble() and toDoubleOrNull() for safe parsing. String templates make formatting easy.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun main() {
    val whole = 5
    val decimal = whole.toDouble()

    val parsed = "42".toInt()
    val invalid = "abc".toIntOrNull() ?: 0

    val name = "Ayesha"
    println("$name has \${name.length} letters")
    println("$decimal $parsed $invalid")
}` },
        { type: 'note', value: 'toIntOrNull is the safe parse. toInt throws NumberFormatException on bad input.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'syntax-types',
      q: 'What does val mean?',
      options: ['The value can change', 'The reference cannot be reassigned', 'It is nullable', 'It is a constant at compile time'],
      answer: 1,
      explain: 'The reference is read-only; the object may still be mutable.',
    },
    {
      chapterId: 'syntax-types',
      q: 'What does String? mean?',
      options: ['A required string', 'A string that may be null', 'A list', 'A number'],
      answer: 1,
      explain: 'The question mark marks a nullable type.',
    },
    {
      chapterId: 'syntax-types',
      q: 'What does ?: do?',
      options: ['Casts a type', 'Provides a fallback when the left side is null', 'Compares values', 'Loops'],
      answer: 1,
      explain: 'It is the Elvis operator.',
    },
  ],
};
