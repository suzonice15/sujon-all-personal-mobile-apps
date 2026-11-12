// Go chapter: Structs and Methods.

export default {
  id: 'structs-methods',
  title: 'Structs & Methods',
  description: 'Data grouping, value and pointer receivers, embedding',
  icon: 'workspaces',
  lessons: [
    {
      id: 'go-structs',
      title: 'Structs',
      blocks: [
        { type: 'text', value: 'A struct groups fields. Use a named field initializer for clarity. An empty struct value has zero values for every field.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

type Student struct {
    Name  string
    Score int
}

func main() {
    s := Student{Name: "Ayesha", Score: 92}
    fmt.Println(s.Name, s.Score)

    var empty Student
    fmt.Printf("%q %d\\n", empty.Name, empty.Score)
}` },
        { type: 'note', value: 'Field names are part of the initializer. Do not rely on positional initialization; adding a field later breaks it.' },
      ],
    },
    {
      id: 'go-methods',
      title: 'Methods and receivers',
      blocks: [
        { type: 'text', value: 'A method is a function with a receiver. A value receiver gets a copy; a pointer receiver can change the original. Use pointer receivers when the method mutates the struct.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

type Student struct {
    Name  string
    Score int
}

func (s Student) Passed() bool {
    return s.Score >= 60
}

func (s *Student) AddPoints(p int) {
    s.Score += p
}

func main() {
    s := Student{Name: "Ayesha", Score: 92}
    s.AddPoints(5)
    fmt.Println(s.Name, s.Passed(), s.Score)
}` },
        { type: 'note', value: 'Be consistent: if one method uses a pointer receiver, use pointer receivers for the other methods of that type too.' },
      ],
    },
    {
      id: 'go-embedding',
      title: 'Embedding',
      blocks: [
        { type: 'text', value: 'Go composes types by embedding. The embedded type\'s fields and methods are promoted, which gives reuse without inheritance.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

type Person struct {
    Name string
}

func (p Person) Greet() string {
    return "Hello, " + p.Name
}

type Student struct {
    Person
    Score int
}

func main() {
    s := Student{Person: Person{Name: "Ayesha"}, Score: 92}
    fmt.Println(s.Greet(), s.Score)
}` },
        { type: 'note', value: 'Embedding is not inheritance. It is composition with promoted fields. If the relationship is not "is a", use a named field instead.' },
      ],
    },
    {
      id: 'go-struct-tags',
      title: 'Struct tags',
      blocks: [
        { type: 'text', value: 'A struct tag adds metadata for encoding, validation or database mapping. The json tag controls the field name in JSON.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "encoding/json"
    "fmt"
)

type Course struct {
    ID       int    \`json:"id"\`
    Title    string \`json:"title"\`
    Password string \`json:"-"\`
}

func main() {
    data, _ := json.Marshal(Course{ID: 1, Title: "SQL", Password: "secret"})
    fmt.Println(string(data))
}` },
        { type: 'note', value: 'The json:"-" tag hides a field completely. Never expose a password field in an API response.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'structs-methods',
      q: 'What is a pointer receiver used for?',
      options: ['To copy the struct', 'To modify the original struct', 'To create a package', 'To import JSON'],
      answer: 1,
      explain: 'A pointer receiver can change the value.',
    },
    {
      chapterId: 'structs-methods',
      q: 'What does embedding do?',
      options: ['Inherits private fields', 'Promotes fields and methods of another type', 'Creates an interface', 'Starts a goroutine'],
      answer: 1,
      explain: 'It composes types with promoted members.',
    },
    {
      chapterId: 'structs-methods',
      q: 'What does the json:"-" tag do?',
      options: ['Renames a field', 'Hides a field from JSON', 'Makes it required', 'Sorts it'],
      answer: 1,
      explain: 'It excludes the field from encoding.',
    },
    {
      chapterId: 'structs-methods',
      q: 'What is the zero value of a struct field?',
      options: ['nil always', 'The zero value of its type', 'An error', 'Undefined'],
      answer: 1,
      explain: 'Each field gets its type\'s zero value.',
    },
  ],
};
