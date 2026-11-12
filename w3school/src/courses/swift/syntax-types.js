// Swift chapter: Syntax & Types.

export default {
  id: 'syntax-types',
  title: 'Syntax & Types',
  description: 'Constants, variables, types and optionals',
  icon: 'category',
  lessons: [
    {
      id: 'swift-val-var',
      title: 'let and var',
      blocks: [
        { type: 'text', value: 'Use let for values that never change and var for values that do. Swift infers the type, but you can write it explicitly. Prefer let: it makes state easier to reason about and the compiler can optimize it.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `let name: String = "Ayesha"
var age = 21
age = 22

let price: Double = 99.5
let active = true

print("\\(name) \\(age) \\(price) \\(active)")` },
        { type: 'note', value: 'A let binding cannot be reassigned. Trying to change it is a compile error, not a runtime one.' },
      ],
    },
    {
      id: 'swift-optionals',
      title: 'Optionals',
      blocks: [
        { type: 'text', value: 'An optional may hold a value or nil. String? means a string that can be missing. You unwrap it safely with if let, guard let or the nil-coalescing operator ??. Force unwrapping with ! crashes when the value is nil.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `var nickname: String? = nil
print(nickname ?? "no nickname")

nickname = "Ayu"
if let name = nickname {
    print("Hi, \\(name)")
}

guard let name2 = nickname else {
    fatalError("missing")
}
print(name2)` },
        { type: 'note', value: 'Avoid force unwrapping with !. Use if let, guard let or ??. A crash from a nil unwrap is the Swift equivalent of a null pointer exception.' },
      ],
    },
    {
      id: 'swift-types',
      title: 'Types and type inference',
      blocks: [
        { type: 'text', value: 'Swift is strongly typed. Int, Double, String, Bool and Character are the common types. Collections are Array, Dictionary and Set. Type inference keeps the code short without losing safety.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `let whole: Int = 42
let decimal = 3.14            // Double
let text = "Swift"            // String
let flag: Bool = true

let numbers = [1, 2, 3]       // Array<Int>
let scores = ["Ayesha": 92]   // Dictionary<String, Int>
let unique = Set([1, 2, 2])   // Set<Int>

print(numbers, scores, unique)` },
        { type: 'note', value: 'Swift does not convert numbers implicitly. Write Double(whole) to convert an Int to a Double.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'syntax-types',
      q: 'What does String? mean?',
      options: ['A required string', 'A string that may be nil', 'A list of strings', 'A number'],
      answer: 1,
      explain: 'The question mark marks an optional.',
    },
    {
      chapterId: 'syntax-types',
      q: 'What does ?? do?',
      options: ['Force unwraps', 'Provides a fallback when the left side is nil', 'Compares values', 'Loops'],
      answer: 1,
      explain: 'It is the nil-coalescing operator.',
    },
    {
      chapterId: 'syntax-types',
      q: 'Which keyword declares a variable that can change?',
      options: ['let', 'var', 'const', 'mut'],
      answer: 1,
      explain: 'var declares a mutable variable.',
    },
    {
      chapterId: 'syntax-types',
      q: 'Does Swift convert Int to Double implicitly?',
      options: ['Yes, always', 'No, you must convert explicitly', 'Only in math', 'Only in print'],
      answer: 1,
      explain: 'Swift requires explicit conversion between number types.',
    },
  ],
};
