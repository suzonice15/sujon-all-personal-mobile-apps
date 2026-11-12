// Swift chapter: Optionals & Collections.

export default {
  id: 'optionals-collections',
  title: 'Optionals & Collections',
  description: 'Safe unwrapping, arrays, dictionaries and sets',
  icon: 'view-list',
  lessons: [
    {
      id: 'swift-optional-chaining',
      title: 'Optional chaining and nil coalescing',
      blocks: [
        { type: 'text', value: 'Optional chaining with ?. calls a method or reads a property only when the optional holds a value; the whole expression becomes nil otherwise. ?? supplies a default when the value is nil.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `struct Course { var title: String? }
let course: Course? = Course(title: "Swift")

print(course?.title ?? "No title")
print(course?.title?.uppercased() ?? "NONE")

var nickname: String? = nil
print(nickname ?? "anonymous")` },
        { type: 'note', value: 'Chain ?. through several optionals. If any link is nil, the result is nil and the rest is not evaluated.' },
      ],
    },
    {
      id: 'swift-collections',
      title: 'Arrays, dictionaries and sets',
      blocks: [
        { type: 'text', value: 'Array is an ordered list, Dictionary maps keys to values, and Set holds unique values. All three are value types and are passed by copy.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `var courses = ["HTML", "CSS", "JS"]
courses.append("Swift")
print(courses[0])
print(courses.count)

var scores: [String: Int] = ["Ayesha": 92, "Rahim": 78]
print(scores["Ayesha"] ?? 0)
scores["Nusrat"] = 88

var unique = Set([1, 2, 2, 3])
print(unique.sorted())` },
        { type: 'list', items: [
          'Array: ordered, allows duplicates',
          'Dictionary: key to value, keys must be hashable',
          'Set: unique, unordered, fast membership test',
          'All three are value types, so assignment copies',
        ] },
      ],
    },
    {
      id: 'swift-higher-order',
      title: 'Higher-order collection methods',
      blocks: [
        { type: 'text', value: 'map, filter, reduce, sorted and forEach transform collections in one line. They return new collections and leave the original unchanged.' },
        { type: 'code', lang: 'swift', tryIt: false, value: `let prices = [5000, 6000, 2000, 7500]

let cheap = prices.filter { $0 < 6000 }.map { $0 + 500 }
print(cheap)

let total = prices.reduce(0) { $0 + $1 }
print(total)

let sorted = prices.sorted { $0 > $1 }
print(sorted)` },
        { type: 'note', value: 'Chaining creates intermediate arrays. For very large data, use lazy sequences with .lazy to avoid allocating each step.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'optionals-collections',
      q: 'What does optional chaining ?. do?',
      options: ['Force unwraps', 'Calls the member only if the optional holds a value, else returns nil', 'Creates a new optional', 'Loops'],
      answer: 1,
      explain: 'The whole expression becomes nil if any link is nil.',
    },
    {
      chapterId: 'optionals-collections',
      q: 'Which collection holds unique values?',
      options: ['Array', 'Dictionary', 'Set', 'Tuple'],
      answer: 2,
      explain: 'A Set stores unique, hashable values.',
    },
    {
      chapterId: 'optionals-collections',
      q: 'What does map do on an array?',
      options: ['Filters items', 'Transforms each item into a new array', 'Sorts items', 'Removes items'],
      answer: 1,
      explain: 'map returns a new array of transformed values.',
    },
    {
      chapterId: 'optionals-collections',
      q: 'Are Swift arrays value types?',
      options: ['Yes, they are copied on assignment', 'No, they are shared references', 'Only when empty', 'Only on iOS'],
      answer: 0,
      explain: 'Arrays, dictionaries and sets are all value types.',
    },
  ],
};
