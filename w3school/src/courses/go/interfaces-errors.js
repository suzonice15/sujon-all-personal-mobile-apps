// Go chapter: Interfaces and Errors.

export default {
  id: 'interfaces-errors',
  title: 'Interfaces & Errors',
  description: 'Implicit interfaces, error values and wrapping',
  icon: 'extension',
  lessons: [
    {
      id: 'go-interfaces',
      title: 'Interfaces',
      blocks: [
        { type: 'text', value: 'An interface lists methods. A type implements it automatically by having those methods; there is no implements keyword. Keep interfaces small.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

type Shape interface {
    Area() float64
}

type Square struct{ Side float64 }

func (s Square) Area() float64 {
    return s.Side * s.Side
}

func main() {
    var shape Shape = Square{Side: 3}
    fmt.Println(shape.Area())
}` },
        { type: 'note', value: 'A one-method interface is often enough. The standard library uses tiny interfaces such as io.Reader and io.Writer.' },
      ],
    },
    {
      id: 'go-error-type',
      title: 'The error type',
      blocks: [
        { type: 'text', value: 'error is a built-in interface with one method, Error() string. Functions return it as the last value. A nil error means success.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found")

func find(id int) error {
    if id != 1 {
        return fmt.Errorf("course %d: %w", id, ErrNotFound)
    }
    return nil
}

func main() {
    err := find(2)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("missing")
    }
}` },
        { type: 'note', value: 'Wrap with %w so errors.Is and errors.As can inspect the cause. Do not compare error strings in code.' },
      ],
    },
    {
      id: 'go-custom-errors',
      title: 'Custom errors',
      blocks: [
        { type: 'text', value: 'A custom error type carries structured data. Use errors.As to extract it from a wrapped error.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "errors"
    "fmt"
)

type ValidationError struct {
    Field string
}

func (e ValidationError) Error() string {
    return "invalid field: " + e.Field
}

func validate(title string) error {
    if title == "" {
        return ValidationError{Field: "title"}
    }
    return nil
}

func main() {
    err := validate("")
    var v ValidationError
    if errors.As(err, &v) {
        fmt.Println(v.Field)
    }
}` },
        { type: 'note', value: 'Return the concrete error value, not a pointer, unless the type needs mutable state. errors.As works with either.' },
      ],
    },
    {
      id: 'go-panic-recover',
      title: 'panic and recover',
      blocks: [
        { type: 'text', value: 'panic stops normal flow and unwinds the stack. recover catches a panic inside a deferred function. Use panic for programmer errors, not for expected failures.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func safeDivide(a, b int) (result int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("recovered:", r)
        }
    }()
    return a / b
}

func main() {
    fmt.Println(safeDivide(10, 2))
    fmt.Println(safeDivide(10, 0))
}` },
        { type: 'note', value: 'Expected failures such as a missing record or invalid input should return an error. Reserve panic for impossible states and startup configuration.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'interfaces-errors',
      q: 'How does a type implement an interface?',
      options: ['With the implements keyword', 'By defining the required methods', 'By extending it', 'By importing it'],
      answer: 1,
      explain: 'Go interfaces are satisfied implicitly.',
    },
    {
      chapterId: 'interfaces-errors',
      q: 'What does a nil error mean?',
      options: ['Failure', 'Success', 'A panic', 'A warning'],
      answer: 1,
      explain: 'nil error means no error occurred.',
    },
    {
      chapterId: 'interfaces-errors',
      q: 'What does %w do in fmt.Errorf?',
      options: ['Wraps an error for errors.Is/As', 'Prints a warning', 'Writes a file', 'Creates a goroutine'],
      answer: 0,
      explain: 'It preserves the cause chain.',
    },
    {
      chapterId: 'interfaces-errors',
      q: 'When should you panic?',
      options: ['For invalid user input', 'For impossible programmer states', 'For a missing record', 'Every error'],
      answer: 1,
      explain: 'Expected failures should be returned as errors.',
    },
  ],
};
