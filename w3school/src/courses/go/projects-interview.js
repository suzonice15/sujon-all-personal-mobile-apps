// Go chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a CLI and a small API, then prepare',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'go-project-cli',
      title: 'Project: CLI tool',
      blocks: [
        { type: 'text', value: 'A CLI reads arguments, does one job and exits with a meaningful code. This example greets a name and handles the missing-argument case.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "fmt"
    "os"
)

func main() {
    if len(os.Args) < 2 {
        fmt.Fprintln(os.Stderr, "usage: greet <name>")
        os.Exit(1)
    }

    name := os.Args[1]
    fmt.Println("Hello,", name)
}` },
        { type: 'note', value: 'Exit code 0 means success; non-zero means failure. Scripts and CI depend on it.' },
      ],
    },
    {
      id: 'go-project-api',
      title: 'Project: courses API',
      blocks: [
        { type: 'text', value: 'Combine a mux, JSON handlers, a store and middleware. Keep handlers thin: parse, call the store, write the response.' },
        { type: 'code', lang: 'go', tryIt: false, fragment: true, value: `type Course struct {
    ID    int    \`json:"id"\`
    Title string \`json:"title"\`
}

type Store struct {
    mu      sync.Mutex
    courses []Course
}

func (s *Store) List() []Course {
    s.mu.Lock()
    defer s.mu.Unlock()
    return append([]Course(nil), s.courses...)
}

func listHandler(store *Store) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(store.List())
    }
}` },
        { type: 'note', value: 'The store locks because HTTP handlers run concurrently. A map or slice without a lock is a data race.' },
      ],
    },
    {
      id: 'go-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is a goroutine and how is it different from a thread?',
          'What is a channel and when do you close it?',
          'What is the zero value and why does it matter?',
          'Value receiver versus pointer receiver?',
          'How do interfaces work without an implements keyword?',
          'How do you handle errors and wrap them?',
          'What is a slice and how does append work?',
          'How do you test an HTTP handler?',
          'What is a data race and how do you detect it?',
          'Why does Go compile quickly?',
        ] },
        { type: 'text', value: 'Strong answers are concrete: name the type, the function and the failure mode. "Use a buffered channel and close it from the sender" beats "use channels".' },
        { type: 'note', value: 'Be ready to write a small concurrent program and a table-driven test live. Those two exercises cover most junior Go interviews.' },
      ],
    },
    {
      id: 'go-learning-path',
      title: 'Learning path',
      blocks: [
        { type: 'list', items: [
          'Week 1: syntax, types, control flow, functions',
          'Week 2: structs, methods, interfaces, errors',
          'Week 3: slices, maps, concurrency',
          'Week 4: packages, testing, HTTP',
          'Week 5: build a complete API with tests',
          'Week 6: deployment and observability',
        ] },
        { type: 'text', value: 'Go is small enough to learn quickly, but the standard library and idioms take practice. Build a real service, not only exercises.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What does exit code 1 mean?',
      options: ['Success', 'Failure', 'A warning', 'A restart'],
      answer: 1,
      explain: 'Non-zero means the command failed.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why does the store use a mutex?',
      options: ['HTTP handlers run concurrently', 'To sort courses', 'To encode JSON', 'To reduce memory'],
      answer: 0,
      explain: 'Shared state needs synchronization.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What test style suits many input cases?',
      options: ['Table-driven tests', 'Benchmarks', 'Manual testing', 'Mocks only'],
      answer: 0,
      explain: 'A table of cases with t.Run is the Go idiom.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a Go learner build?',
      options: ['Only exercises', 'A complete API with tests', 'A UI only', 'A slide deck'],
      answer: 1,
      explain: 'A real service teaches design and operations.',
    },
  ],
};
