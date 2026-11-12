// Swift chapter: Functions & Closures.

export default {
  id: 'functions-closures',
  title: 'Functions & Closures',
  description: 'Parameters, return values, closures and trailing closure syntax',
  icon: 'functions',
  lessons: [
    {
      id: 'swift-functions',
      title: 'Functions',
      blocks: [
        { type: 'text', value: 'A function declares its parameters with labels. The first label is the argument label used at the call site; the second is the parameter name inside the function. Return values follow ->.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `func greet(name: String, times: Int = 1) -> String {
    var result = ""
    for _ in 0..<times {
        result += "Hello, \\(name)! "
    }
    return result
}

print(greet(name: "Ayesha"))
print(greet(name: "Rahim", times: 2))

func add(_ a: Int, _ b: Int) -> Int { a + b }
print(add(2, 3))` },
        { type: 'note', value: 'Use _ to omit the argument label. Default values make a parameter optional at the call site.' },
      ],
    },
    {
      id: 'swift-closures',
      title: 'Closures',
      blocks: [
        { type: 'text', value: 'A closure is an inline function. It captures values from its surrounding scope. Swift infers parameter and return types when they can be determined, and a single-expression closure returns its value automatically.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `let numbers = [1, 2, 3, 4, 5]

let doubled = numbers.map { $0 * 2 }
print(doubled)

let evens = numbers.filter { $0 % 2 == 0 }
print(evens)

let total = numbers.reduce(0) { $0 + $1 }
print(total)` },
        { type: 'note', value: '$0 is the shorthand for the first closure parameter. Named parameters read better in longer closures.' },
      ],
    },
    {
      id: 'swift-trailing',
      title: 'Trailing closure syntax',
      blocks: [
        { type: 'text', value: 'When a closure is the last argument, you can write it outside the parentheses. This is the style used throughout SwiftUI and makes code read like a declarative description.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `func run(times: Int, action: () -> Void) {
    for _ in 0..<times { action() }
}

run(times: 3) {
    print("tick")
}

// Trailing closure with a return value
let result = [1, 2, 3].map { value in
    value * value
}
print(result)` },
        { type: 'note', value: 'Trailing closures are the reason SwiftUI code looks like a tree of views. The view builder is just a function taking a closure.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'functions-closures',
      q: 'What does _ before a parameter name do?',
      options: ['Makes it optional', 'Omits the argument label at the call site', 'Makes it private', 'Makes it mutable'],
      answer: 1,
      explain: 'An underscore suppresses the argument label.',
    },
    {
      chapterId: 'functions-closures',
      q: 'What does $0 mean in a closure?',
      options: ['The first parameter', 'The return value', 'The index', 'The closure itself'],
      answer: 0,
      explain: '$0 is shorthand for the first closure parameter.',
    },
    {
      chapterId: 'functions-closures',
      q: 'When can you use trailing closure syntax?',
      options: ['Always', 'When the closure is the last argument', 'Only with map', 'Only with SwiftUI'],
      answer: 1,
      explain: 'The closure moves outside the parentheses when it is last.',
    },
    {
      chapterId: 'functions-closures',
      q: 'What is a default parameter value?',
      options: ['A value used when the argument is omitted', 'A constant', 'A global variable', 'A nil check'],
      answer: 0,
      explain: 'Default values make parameters optional at the call site.',
    },
  ],
};
