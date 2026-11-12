// Go chapter: Syntax and Types.

export default {
  id: 'syntax-types',
  title: 'Syntax & Types',
  description: 'Variables, short declarations, zero values and constants',
  icon: 'category',
  lessons: [
    {
      id: 'go-variables',
      title: 'Variables',
      blocks: [
        { type: 'text', value: 'Use var for an explicit declaration and := for a short declaration inside a function. The type is fixed; Go does not change a variable from int to string.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    var name string = "Ayesha"
    age := 21
    var price float64 = 99.5
    active := true

    fmt.Println(name, age, price, active)
}` },
        { type: 'note', value: ':= declares and assigns in one step. It only works inside a function. Use var at package level.' },
      ],
    },
    {
      id: 'go-zero-values',
      title: 'Zero values',
      blocks: [
        { type: 'text', value: 'A declared variable always has a value. The zero value is 0 for numbers, false for bool, "" for string and nil for pointers, slices and maps. There is no undefined.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    var number int
    var text string
    var active bool
    var pointer *int

    fmt.Printf("%d %q %t %v\\n", number, text, active, pointer)
}` },
        { type: 'note', value: 'Zero values remove a whole class of bugs. You do not need to initialise every field before using a struct.' },
      ],
    },
    {
      id: 'go-constants-iota',
      title: 'Constants and iota',
      blocks: [
        { type: 'text', value: 'const creates a compile-time constant. iota counts lines inside a const block, which is perfect for enums.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

type Status int

const (
    Pending Status = iota
    Approved
    Rejected
)

const MaxLessons = 12

func main() {
    fmt.Println(Pending, Approved, Rejected)
    fmt.Println(MaxLessons)
}` },
        { type: 'note', value: 'Go has no enum keyword. A named integer type with iota constants is the idiom.' },
      ],
    },
    {
      id: 'go-conversions',
      title: 'Conversions',
      blocks: [
        { type: 'text', value: 'Go does not convert types automatically. You must convert explicitly, and a conversion can lose data. Strings and numbers need strconv.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    whole := 5
    decimal := float64(whole)

    other := 9.7
    narrowed := int(other)

    text := strconv.Itoa(42)
    number, err := strconv.Atoi("42")
    if err != nil {
        fmt.Println("not a number")
    }

    fmt.Println(decimal, narrowed, text, number)
}` },
        { type: 'note', value: 'strconv.Atoi returns an error, so it is the safe way to parse user input. A failed parse is a normal outcome, not a crash.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'syntax-types',
      q: 'What does := do?',
      options: ['Compares values', 'Declares and assigns a variable', 'Creates a constant', 'Imports a package'],
      answer: 1,
      explain: 'It is a short variable declaration inside a function.',
    },
    {
      chapterId: 'syntax-types',
      q: 'What is the zero value of a string?',
      options: ['nil', '""', '0', 'undefined'],
      answer: 1,
      explain: 'Strings default to an empty string.',
    },
    {
      chapterId: 'syntax-types',
      q: 'What does iota do?',
      options: ['Counts constants in a const block', 'Loops forever', 'Imports a package', 'Formats text'],
      answer: 0,
      explain: 'It increments for each constant line.',
    },
    {
      chapterId: 'syntax-types',
      q: 'How do you convert a string to an int safely?',
      options: ['int(text)', 'strconv.Atoi(text)', 'text.(int)', 'parse(text)'],
      answer: 1,
      explain: 'Atoi returns an error you can handle.',
    },
  ],
};
