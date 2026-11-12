// Kotlin chapter: Control Flow.

export default {
  id: 'control-flow',
  title: 'Control Flow',
  description: 'if expressions, when, ranges and loops',
  icon: 'call-split',
  lessons: [
    {
      id: 'kotlin-if-when',
      title: 'if and when',
      blocks: [
        { type: 'text', value: 'if is an expression: it returns a value. when replaces a long if/else chain and is also an expression. It is exhaustive for enums and sealed types.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun main() {
    val score = 82

    val grade = if (score >= 80) "A" else if (score >= 60) "B" else "F"
    println(grade)

    val label = when {
        score >= 80 -> "excellent"
        score >= 60 -> "passed"
        else -> "try again"
    }
    println(label)
}` },
        { type: 'note', value: 'Because if and when are expressions, you can assign their result directly. That removes many temporary variables.' },
      ],
    },
    {
      id: 'kotlin-ranges-loops',
      title: 'Ranges and loops',
      blocks: [
        { type: 'text', value: 'for iterates over ranges, arrays and collections. in checks membership. downTo, until and step control the range.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun main() {
    for (i in 1..3) println(i)

    for (i in 3 downTo 1) println(i)

    for (i in 1 until 3) println(i)

    val names = listOf("Ayesha", "Rahim")
    for (name in names) println(name)

    if ("Rahim" in names) println("found")
}` },
        { type: 'note', value: 'Ranges are inclusive: 1..3 is 1, 2, 3. Use until when you want to exclude the end.' },
      ],
    },
    {
      id: 'kotlin-loops-flow',
      title: 'break, continue and labels',
      blocks: [
        { type: 'text', value: 'break exits a loop and continue skips to the next iteration. A label lets break or continue target an outer loop.' },
        { type: 'code', lang: 'kotlin', tryIt: false, value: `fun main() {
    outer@ for (i in 1..3) {
        for (j in 1..3) {
            if (i == 2 && j == 2) break@outer
            if (j == 2) continue
            println("$i,$j")
        }
    }
}` },
        { type: 'note', value: 'Labels are rare. If you need many, the function is probably too complex and can be split.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'control-flow',
      q: 'What is special about if in Kotlin?',
      options: ['It needs a semicolon', 'It is an expression that returns a value', 'It cannot have else', 'It is a loop'],
      answer: 1,
      explain: 'if returns a value.',
    },
    {
      chapterId: 'control-flow',
      q: 'What does 1..3 include?',
      options: ['1 and 3 only', '1, 2, 3', '1, 2', '0, 1, 2, 3'],
      answer: 1,
      explain: 'The range is inclusive.',
    },
    {
      chapterId: 'control-flow',
      q: 'What does until do?',
      options: ['Includes the end', 'Excludes the end', 'Reverses the range', 'Skips numbers'],
      answer: 1,
      explain: '1 until 3 is 1 and 2.',
    },
  ],
};
