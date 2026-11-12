// Go chapter: Control Flow.

export default {
  id: 'control-flow',
  title: 'Control Flow',
  description: 'if, switch, for and range',
  icon: 'call-split',
  lessons: [
    {
      id: 'go-if',
      title: 'if and else',
      blocks: [
        { type: 'text', value: 'if conditions do not need parentheses. You can declare a variable in the condition, which is useful for errors and short calculations.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    score := 82

    if score >= 80 {
        fmt.Println("A")
    } else if score >= 60 {
        fmt.Println("B")
    } else {
        fmt.Println("F")
    }

    if doubled := score * 2; doubled > 150 {
        fmt.Println(doubled)
    }
}` },
        { type: 'note', value: 'A variable declared in an if statement is scoped to that if/else block. It keeps temporary values out of the rest of the function.' },
      ],
    },
    {
      id: 'go-switch',
      title: 'switch',
      blocks: [
        { type: 'text', value: 'switch is flexible: it can compare values or use conditions without an expression. There is no automatic fall-through, so break is not needed.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    role := "admin"

    switch role {
    case "admin":
        fmt.Println("Full access")
    case "student":
        fmt.Println("Learn")
    default:
        fmt.Println("Guest")
    }

    score := 82
    switch {
    case score >= 80:
        fmt.Println("excellent")
    case score >= 60:
        fmt.Println("passed")
    default:
        fmt.Println("try again")
    }
}` },
        { type: 'note', value: 'Use fallthrough only when you truly want the next case. It is rare and should be commented.' },
      ],
    },
    {
      id: 'go-for',
      title: 'for',
      blocks: [
        { type: 'text', value: 'for is the only loop in Go. It can look like a classic for, a while loop, or an infinite loop. range iterates over slices, maps, strings and channels.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    for i := 1; i <= 3; i++ {
        fmt.Println(i)
    }

    n := 3
    for n > 0 {
        fmt.Println(n)
        n--
    }

    for {
        break
    }
}` },
        { type: 'note', value: 'There is no while keyword. for condition { } is the while loop in Go.' },
      ],
    },
    {
      id: 'go-range',
      title: 'range',
      blocks: [
        { type: 'text', value: 'range gives the index and value for a slice, and the key and value for a map. Use _ to ignore a value you do not need.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    names := []string{"Ayesha", "Rahim"}

    for i, name := range names {
        fmt.Println(i, name)
    }

    scores := map[string]int{"Ayesha": 92, "Rahim": 78}
    for name, score := range scores {
        fmt.Println(name, score)
    }

    for _, name := range names {
        if name == "Rahim" {
            continue
        }
        fmt.Println(name)
    }
}` },
        { type: 'note', value: 'Map iteration order is random in Go. Sort the keys if the output must be stable.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'control-flow',
      q: 'Does an if condition need parentheses?',
      options: ['Yes', 'No', 'Only for strings', 'Only in functions'],
      answer: 1,
      explain: 'Go writes if x > 0 { } directly.',
    },
    {
      chapterId: 'control-flow',
      q: 'How many loop keywords does Go have?',
      options: ['for and while', 'Only for', 'for, while and do', 'None'],
      answer: 1,
      explain: 'for covers every loop shape.',
    },
    {
      chapterId: 'control-flow',
      q: 'What does range give for a map?',
      options: ['Index and value', 'Key and value', 'Only keys', 'Only values'],
      answer: 1,
      explain: 'It yields the key and the value.',
    },
    {
      chapterId: 'control-flow',
      q: 'What is fallthrough?',
      options: ['A loop', 'Explicitly continuing into the next case', 'A function', 'An import'],
      answer: 1,
      explain: 'Switch cases do not fall through unless you ask.',
    },
  ],
};
