// Go chapter: HTTP API.

export default {
  id: 'http-api',
  title: 'HTTP API',
  description: 'net/http, JSON, handlers and middleware',
  icon: 'api',
  lessons: [
    {
      id: 'go-http-server',
      title: 'A simple server',
      blocks: [
        { type: 'text', value: 'net/http is in the standard library. A handler is a function that reads a request and writes a response. Register handlers and call ListenAndServe.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "ok")
    })

    http.ListenAndServe(":3000", nil)
}` },
        { type: 'note', value: 'HandleFunc registers on the default mux. For real services, create your own http.ServeMux so tests can build the server without global state.' },
      ],
    },
    {
      id: 'go-json-handler',
      title: 'JSON handlers',
      blocks: [
        { type: 'text', value: 'Set the content type before writing. Decode the body with a limit, validate, and encode the response. Always set the status code deliberately.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "encoding/json"
    "net/http"
)

type Course struct {
    ID    int    \`json:"id"\`
    Title string \`json:"title"\`
}

func coursesHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    if r.Method != http.MethodGet {
        w.WriteHeader(http.StatusMethodNotAllowed)
        return
    }

    json.NewEncoder(w).Encode([]Course{{ID: 1, Title: "SQL"}})
}` },
        { type: 'note', value: 'Decode errors and validation failures should return 400, not 500. A 500 tells the client to retry a request that will never work.' },
      ],
    },
    {
      id: 'go-middleware',
      title: 'Middleware',
      blocks: [
        { type: 'text', value: 'Middleware wraps a handler: it can log, authenticate, add headers or recover from a panic. Compose small functions rather than one giant handler.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "log"
    "net/http"
    "time"
)

func logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Println(r.Method, r.URL.Path, time.Since(start))
    })
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("ok"))
    })
    http.ListenAndServe(":3000", logging(mux))
}` },
        { type: 'note', value: 'Wrap the mux, not each route, for cross-cutting concerns such as logging and recovery.' },
      ],
    },
    {
      id: 'go-graceful-shutdown',
      title: 'Graceful shutdown',
      blocks: [
        { type: 'text', value: 'On SIGTERM, stop accepting new requests, let in-flight requests finish, then exit. This is what makes a deploy safe.' },
        { type: 'code', lang: 'go', tryIt: false, value: `package main

import (
    "context"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func main() {
    srv := &http.Server{Addr: ":3000"}

    go srv.ListenAndServe()

    stop := make(chan os.Signal, 1)
    signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)
    <-stop

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    srv.Shutdown(ctx)
}` },
        { type: 'note', value: 'Without graceful shutdown, a deploy can drop requests that were already being served.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'http-api',
      q: 'Which package provides an HTTP server?',
      options: ['net/http', 'net/tcp', 'os/http', 'http/server'],
      answer: 0,
      explain: 'net/http is in the standard library.',
    },
    {
      chapterId: 'http-api',
      q: 'What should a handler set before writing JSON?',
      options: ['Content-Type', 'Server', 'Cookie', 'Date only'],
      answer: 0,
      explain: 'Set application/json so the client parses it.',
    },
    {
      chapterId: 'http-api',
      q: 'What does middleware wrap?',
      options: ['A handler', 'A database', 'A goroutine', 'A package'],
      answer: 0,
      explain: 'It adds behaviour around the next handler.',
    },
    {
      chapterId: 'http-api',
      q: 'Why graceful shutdown?',
      options: ['To finish in-flight requests', 'To restart faster', 'To enable CORS', 'To compile'],
      answer: 0,
      explain: 'It prevents dropped requests during a deploy.',
    },
  ],
};
