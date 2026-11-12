// Go chapter: Slices and Maps.

export default {
  id: 'slices-maps',
  title: 'Slices & Maps',
  description: 'Dynamic arrays, capacity and key-value lookup',
  icon: 'view-list',
  lessons: [
    {
      id: 'go-slices',
      title: 'Slices',
      blocks: [
        { type: 'text', value: 'A slice is a view over an array with a length and a capacity. append grows it when needed. Most Go code uses slices, not raw arrays.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    values := []int{1, 2, 3}
    values = append(values, 4, 5)

    fmt.Println(values)
    fmt.Println(len(values), cap(values))
    fmt.Println(values[1:3])
}` },
        { type: 'note', value: 'A slice shares its backing array. Two slices over the same array can see each other\'s changes. Copy with copy() when you need independence.' },
      ],
    },
    {
      id: 'go-maps',
      title: 'Maps',
      blocks: [
        { type: 'text', value: 'A map stores key-value pairs. Reading a missing key returns the zero value. Use the comma-ok form to distinguish missing from zero.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    scores := map[string]int{"Ayesha": 92}
    scores["Rahim"] = 78

    score, ok := scores["Nusrat"]
    fmt.Println(score, ok)

    delete(scores, "Rahim")
    fmt.Println(len(scores))
}` },
        { type: 'note', value: 'Maps are not safe for concurrent writes. Use sync.RWMutex or a sync.Map when multiple goroutines access one map.' },
      ],
    },
    {
      id: 'go-copy-append',
      title: 'copy and append',
      blocks: [
        { type: 'text', value: 'append may reuse the backing array and overwrite data. copy makes an independent slice. Make a new slice when you return it to a caller.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    source := []int{1, 2, 3}
    target := make([]int, len(source))
    copy(target, source)

    target[0] = 99
    fmt.Println(source[0], target[0])
}` },
        { type: 'note', value: 'make([]T, len, cap) creates a slice with a known length and capacity. Preallocating avoids repeated growth in a loop.' },
      ],
    },
    {
      id: 'go-range-values',
      title: 'Range semantics',
      blocks: [
        { type: 'text', value: 'range gives a copy of each element. To modify the slice, use the index. To modify struct fields, use the index or a slice of pointers.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

type Student struct {
    Score int
}

func main() {
    students := []Student{{Score: 10}, {Score: 20}}

    for i := range students {
        students[i].Score += 5
    }

    for _, s := range students {
        fmt.Println(s.Score)
    }
}` },
        { type: 'note', value: 'A common bug is for _, v := range items { v.Field = x }. v is a copy, so the original is unchanged.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'slices-maps',
      q: 'What does append return?',
      options: ['Nothing', 'A new or grown slice', 'An error', 'A map'],
      answer: 1,
      explain: 'It returns the updated slice; assign it back.',
    },
    {
      chapterId: 'slices-maps',
      q: 'What does a missing map key return?',
      options: ['nil always', 'The zero value of the value type', 'An error', 'A panic'],
      answer: 1,
      explain: 'Use the comma-ok form to detect absence.',
    },
    {
      chapterId: 'slices-maps',
      q: 'Why use copy?',
      options: ['To share the array', 'To create an independent slice', 'To sort', 'To delete'],
      answer: 1,
      explain: 'It copies elements into a separate backing array.',
    },
    {
      chapterId: 'slices-maps',
      q: 'Are maps safe for concurrent writes?',
      options: ['Yes', 'No, use a mutex or sync.Map', 'Only in main', 'Only for strings'],
      answer: 1,
      explain: 'Concurrent map writes can crash the program.',
    },
  ],
};
