// Swift chapter: Control Flow.

export default {
  id: 'control-flow',
  title: 'Control Flow',
  description: 'if, switch, for, while and ranges',
  icon: 'call-split',
  lessons: [
    {
      id: 'swift-if-switch',
      title: 'if and switch',
      blocks: [
        { type: 'text', value: 'if is a statement and an expression. switch must be exhaustive: every case must be covered, or a default is required. switch has no fall-through, so break is not needed.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `let score = 82

let grade = if score >= 80 { "A" } else if score >= 60 { "B" } else { "F" }
print(grade)

let day = 3
switch day {
case 1: print("Monday")
case 2: print("Tuesday")
case 3, 4: print("Midweek")
default: print("Other")
}` },
        { type: 'note', value: 'Because switch is exhaustive, adding a new case to an enum forces every switch to handle it. That is a powerful safety feature.' },
      ],
    },
    {
      id: 'swift-loops',
      title: 'Loops and ranges',
      blocks: [
        { type: 'text', value: 'for-in iterates over ranges, arrays and other sequences. while runs while a condition holds. repeat-while checks the condition after the body, so it runs at least once.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `for i in 1...3 { print(i) }          // 1, 2, 3
for i in 1..<3 { print(i) }         // 1, 2

let names = ["Ayesha", "Rahim"]
for name in names { print(name) }

var n = 3
while n > 0 { print(n); n -= 1 }

var m = 0
repeat { m += 1 } while m < 3
print(m)` },
        { type: 'note', value: '... includes the end value; ..< excludes it. Use ..< when iterating over array indices.' },
      ],
    },
    {
      id: 'swift-control-transfer',
      title: 'break, continue and guard',
      blocks: [
        { type: 'text', value: 'break exits a loop and continue skips to the next iteration. guard let is for early exit: it unwraps an optional and exits the function or block if the value is nil.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `func greet(_ name: String?) {
    guard let name = name else {
        print("no name given")
        return
    }
    print("Hello, \\(name)")
}

greet(nil)
greet("Ayesha")` },
        { type: 'note', value: 'guard let keeps the happy path un-indented. Use it at the top of a function to handle the missing or invalid case and return early.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'control-flow',
      q: 'Does a Swift switch fall through to the next case?',
      options: ['Yes, always', 'No, each case is separate', 'Only with break', 'Only with default'],
      answer: 1,
      explain: 'Swift switch has no fall-through; break is not needed.',
    },
    {
      chapterId: 'control-flow',
      q: 'What does 1...3 produce?',
      options: ['1 and 2', '1, 2 and 3', '2 and 3', '1 only'],
      answer: 1,
      explain: 'The closed range includes both ends.',
    },
    {
      chapterId: 'control-flow',
      q: 'What does guard let do?',
      options: ['Loops while true', 'Unwraps an optional and exits early if it is nil', 'Creates a class', 'Throws an error'],
      answer: 1,
      explain: 'It handles the missing case and returns.',
    },
    {
      chapterId: 'control-flow',
      q: 'Which loop checks its condition after the body?',
      options: ['while', 'for', 'repeat-while', 'if'],
      answer: 2,
      explain: 'repeat-while runs the body at least once.',
    },
  ],
};
