// Go chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Go is, why it is simple and your first program',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'go-what-is',
      title: 'What is Go?',
      blocks: [
        { type: 'text', value: 'Go is a compiled language from Google. It is small, readable and designed for servers, command-line tools and concurrent systems. A Go program compiles to a single binary.' },
        { type: 'list', items: [
          'Simple syntax with very few keywords',
          'Fast compilation and fast runtime',
          'Goroutines for easy concurrency',
          'Built-in HTTP server and testing tools',
          'A single static binary with no runtime to install',
        ] },
        { type: 'note', value: 'Go deliberately leaves features out. There is one loop (for), no classes, and formatting is handled by gofmt so teams stop arguing about style.' },
      ],
    },
    {
      id: 'go-first-program',
      title: 'Your first program',
      blocks: [
        { type: 'text', value: 'Every Go file belongs to a package. The executable package is main and it must have a main function. fmt provides printing.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}` },
        { type: 'list', items: [
          'package main builds an executable',
          'import "fmt" brings in formatting and printing',
          'func main() is the entry point',
          'fmt.Println prints a line',
        ] },
        { type: 'note', value: 'Go does not use semicolons at the end of lines. The compiler inserts them, and gofmt keeps the layout consistent.' },
      ],
    },
    {
      id: 'go-toolchain',
      title: 'The toolchain',
      blocks: [
        { type: 'text', value: 'The go command builds, runs, tests and formats. A module is a project with a go.mod file that records its dependencies.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `go mod init example.com/codenest
go run .
go build -o app .
go test ./...
gofmt -w .
go vet ./...` },
        { type: 'list', items: [
          'go run - compile and run quickly during development',
          'go build - produce a binary',
          'go test - run tests',
          'gofmt - format the code',
          'go vet - find suspicious code',
        ] },
        { type: 'note', value: 'Run gofmt automatically in your editor. Formatting is not a debate in Go; it is part of the toolchain.' },
      ],
    },
    {
      id: 'go-project-structure',
      title: 'Project structure',
      blocks: [
        { type: 'text', value: 'A small service can live in one package. As it grows, split it into internal packages with clear responsibilities. The cmd folder holds entry points.' },
        { type: 'code', lang: 'text', tryIt: false, value: `codenest/
  go.mod
  cmd/api/main.go
  internal/courses/handler.go
  internal/courses/service.go
  internal/courses/repository.go
  internal/db/db.go` },
        { type: 'note', value: 'The internal folder prevents other modules from importing your private packages. Use it for application code, not for a library you want to share.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Which package builds an executable?',
      options: ['package app', 'package main', 'package exec', 'package lib'],
      answer: 1,
      explain: 'An executable is package main with func main.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does go run do?',
      options: ['Builds and runs the program', 'Only formats code', 'Runs tests', 'Downloads packages'],
      answer: 0,
      explain: 'It compiles and executes in one step.',
    },
    {
      chapterId: 'getting-started',
      q: 'What file records module dependencies?',
      options: ['package.json', 'go.mod', 'pom.xml', 'requirements.txt'],
      answer: 1,
      explain: 'go.mod defines the module and its requirements.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why does Go have gofmt?',
      options: ['To make code slower', 'To keep formatting consistent automatically', 'To encrypt code', 'To hide errors'],
      answer: 1,
      explain: 'A single standard format removes style debates.',
    },
  ],
};
