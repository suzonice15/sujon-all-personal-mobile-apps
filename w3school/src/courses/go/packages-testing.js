// Go chapter: Packages and Testing.

export default {
  id: 'packages-testing',
  title: 'Packages & Testing',
  description: 'Modules, packages, tests and benchmarks',
  icon: 'build',
  lessons: [
    {
      id: 'go-packages',
      title: 'Packages and modules',
      blocks: [
        { type: 'text', value: 'A package groups related files in one folder. A module is a set of packages with a go.mod file. Exported names start with a capital letter; lowercase names are private to the package.' },
        { type: 'code', lang: 'go', tryIt: false, value: `// math/math.go
package math

func Add(a, b int) int {
    return a + b
}

// main.go
package main

import (
    "fmt"
    "example.com/codenest/math"
)

func main() {
    fmt.Println(math.Add(2, 3))
}` },
        { type: 'note', value: 'Keep package names short and meaningful. Avoid util and common; they become a dumping ground with no clear responsibility.' },
      ],
    },
    {
      id: 'go-testing',
      title: 'Testing',
      blocks: [
        { type: 'text', value: 'A test file ends with _test.go. A test function starts with Test and takes *testing.T. Table-driven tests cover several cases with little duplication.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package math

import "testing"

func TestAdd(t *testing.T) {
    tests := []struct {
        name string
        a, b int
        want int
    }{
        {"positive", 2, 3, 5},
        {"negative", -2, -3, -5},
        {"zero", 0, 0, 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Add(tt.a, tt.b)
            if got != tt.want {
                t.Fatalf("got %d, want %d", got, tt.want)
            }
        })
    }
}` },
        { type: 'note', value: 'Use t.Run for subtests. It gives each case a name and lets you run one case with -run.' },
      ],
    },
    {
      id: 'go-benchmarks',
      title: 'Benchmarks',
      blocks: [
        { type: 'text', value: 'A benchmark measures performance. It starts with Benchmark and takes *testing.B. The b.N loop runs enough times to get a stable measurement.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package math

import "testing"

func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(2, 3)
    }
}

// go test -bench=. -benchmem` },
        { type: 'note', value: 'Benchmark before and after a change. A micro-benchmark that does not reflect real usage can mislead you.' },
      ],
    },
    {
      id: 'go-testing-practices',
      title: 'Testing practices',
      blocks: [
        { type: 'list', items: [
          'Test behaviour, not private helpers',
          'Use table-driven tests for input variations',
          'Test errors, not only success',
          'Use t.TempDir for files',
          'Use httptest for HTTP handlers',
          'Run go test ./... in CI',
        ] },
        { type: 'text', value: 'Go tests are plain functions, not a separate framework. That makes them fast and easy to read.' },
        { type: 'note', value: 'Race conditions are bugs. Run go test -race ./... in CI to catch them.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'packages-testing',
      q: 'What makes a name exported?',
      options: ['A capital first letter', 'A lowercase first letter', 'A comment', 'A tag'],
      answer: 0,
      explain: 'Capitalized names are visible outside the package.',
    },
    {
      chapterId: 'packages-testing',
      q: 'What does a test file end with?',
      options: ['.go', '_test.go', '.test.js', '.spec.go'],
      answer: 1,
      explain: 'The _test.go suffix marks a test file.',
    },
    {
      chapterId: 'packages-testing',
      q: 'What is a table-driven test?',
      options: ['A database test', 'A slice of cases run with t.Run', 'A benchmark', 'A mock'],
      answer: 1,
      explain: 'It covers many inputs without duplicating code.',
    },
    {
      chapterId: 'packages-testing',
      q: 'Which flag detects data races?',
      options: ['-cover', '-race', '-bench', '-v'],
      answer: 1,
      explain: 'go test -race enables the race detector.',
    },
  ],
};
