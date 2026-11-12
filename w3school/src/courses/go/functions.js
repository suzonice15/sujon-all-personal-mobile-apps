// Go chapter: Functions.

export default {
  id: 'functions',
  title: 'Functions',
  description: 'Multiple returns, variadic args, closures and defer',
  icon: 'functions',
  lessons: [
    {
      id: 'go-functions-basics',
      title: 'Function basics',
      blocks: [
        { type: 'text', value: 'A function declares parameter names and types, then a return type. Multiple parameters of the same type can share the type. Functions are values and can be passed around.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func add(a, b int) int {
    return a + b
}

func greet(name string) {
    fmt.Println("Hello,", name)
}

func main() {
    fmt.Println(add(2, 3))
    greet("Ayesha")
}` },
        { type: 'note', value: 'Go has no default arguments and no overloading. Use a struct for options when a function has many optional values.' },
      ],
    },
    {
      id: 'go-multiple-returns',
      title: 'Multiple returns',
      blocks: [
        { type: 'text', value: 'A function can return several values. The common pattern is a result and an error. The caller must handle both.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "fmt"
    "strconv"
)

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(result, strconv.Itoa(result))
}` },
        { type: 'note', value: 'Return the error last by convention. Callers read it as result, err := f().' },
      ],
    },
    {
      id: 'go-variadic-closures',
      title: 'Variadic and closures',
      blocks: [
        { type: 'text', value: 'A variadic parameter accepts any number of arguments. A closure captures variables from its surrounding scope. Both are simple and used often.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    fmt.Println(sum(1, 2, 3))
    next := counter()
    fmt.Println(next(), next())
}` },
        { type: 'note', value: 'A closure keeps its captured variable alive. That is useful for counters, but be careful when a goroutine captures a loop variable; pass it explicitly.' },
      ],
    },
    {
      id: 'go-defer',
      title: 'defer',
      blocks: [
        { type: 'text', value: 'defer schedules a call to run when the function returns. It is used for cleanup: closing files, unlocking mutexes and releasing resources. Deferred calls run in reverse order.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    defer fmt.Println("first deferred")
    defer fmt.Println("second deferred")

    fmt.Println("body")
}` },
        { type: 'note', value: 'defer runs even if the function panics. That makes it reliable for cleanup, but avoid a defer inside a long loop because it accumulates until the function returns.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'functions',
      q: 'How does Go return an error?',
      options: ['By throwing', 'As a second return value', 'By a global variable', 'By printing'],
      answer: 1,
      explain: 'The result, err pattern is the idiom.',
    },
    {
      chapterId: 'functions',
      q: 'What is a variadic parameter?',
      options: ['A fixed list', 'Any number of arguments', 'A pointer', 'A map'],
      answer: 1,
      explain: '...int collects arguments into a slice.',
    },
    {
      chapterId: 'functions',
      q: 'When does defer run?',
      options: ['Immediately', 'When the function returns', 'At program start', 'Never'],
      answer: 1,
      explain: 'Deferred calls run as the function exits.',
    },
    {
      chapterId: 'functions',
      q: 'Does Go support function overloading?',
      options: ['Yes', 'No', 'Only for methods', 'Only for main'],
      answer: 1,
      explain: 'Use different names or an options struct.',
    },
  ],
};
