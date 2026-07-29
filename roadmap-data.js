/* ==========================================================================
   Get Set GO — fresher edition
   Rewritten per manager review: too vast for new joiners. Every unit now
   carries exactly ONE official doc (a specific page, not a whole section)
   and, only where a real single video exists (not a channel link), ONE
   verified video. Everything else is a two-line "why" and a one-line task.

   unit = {
     id, title, min,
     why:   1 short sentence — what this buys you, in plain language
     doc:   [title, url]                — one specific official page
     video: [title, url, source]        — OPTIONAL, only if verified & specific
     watch: "short gotcha"              — OPTIONAL, only for real trip-hazards
     do:    "one-line practice task"
   }
   ========================================================================== */

const ANCHORS = [
  ["A Tour of Go", "https://go.dev/tour/", "Interactive, official. Do this first."],
  ["Go Playground", "https://go.dev/play/", "Run and share Go code from your browser."],
  ["Go by Example", "https://gobyexample.com/", "One short page per topic, with runnable code."],
  ["pkg.go.dev", "https://pkg.go.dev/std", "Look up any standard library function."],
  ["Effective Go", "https://go.dev/doc/effective_go", "The style guide. Skim now, re-read in week 3."],
  ["Code Review Comments", "https://go.dev/wiki/CodeReviewComments", "What your reviewer will actually check for."]
];

const DAYS = [
{
  n: 1, title: "Language Foundations",
  blurb: "The syntax and the two habits (slices, pointers) that cause the most bugs later.",
  units: [

  { id:"1.1", title:"Why Go?", min:20,
    why:"Go trades some flexibility for speed, simplicity, and one build step. Know the trade before you write a line.",
    doc:["Go FAQ — design goals", "https://go.dev/doc/faq"],
    video:["Go in 100 Seconds", "https://www.youtube.com/watch?v=446E-r0rXHI", "Fireship · 2 min"],
    do:"Cross-compile Hello World: GOOS=windows go build. Note it needs no JVM, no interpreter."
  },

  { id:"1.2", title:"Setting Up Go", min:20,
    why:"Get the toolchain installed and your first module running.",
    doc:["Tutorial: Get started with Go", "https://go.dev/doc/tutorial/getting-started"],
    video:["Let's go with golang — Hindi playlist", "https://www.youtube.com/playlist?list=PLRAV69dS1uWQGDQoBYMZWKjzuhCaOnBpa", "Hitesh Choudhary · Ep. 1"],
    do:"go mod init a folder, write Hello World, run it with go run ."
  },

  { id:"1.3", title:"Basic Program, Go Tools", min:25,
    why:"Packages, imports, and the four commands you'll type all day.",
    doc:["How to Write Go Code", "https://go.dev/doc/code"],
    do:"Split Hello World into two files: package main, and a package greet it imports."
  },

  { id:"1.4", title:"Working with Strings", min:30,
    why:"Go strings are UTF-8 bytes, not characters — this trips up everyone once.",
    doc:["Strings, bytes, runes and characters in Go", "https://go.dev/blog/strings"],
    watch:"len(\"नमस्ते\") is 18, not 6 — that's bytes, not letters. Loop with range, not an index, when the text might not be plain English.",
    do:"Print len() of an English word and a Hindi word side by side. Explain the difference in one sentence."
  },

  { id:"1.5", title:"Variables and Assignment", min:20,
    why:"var vs := vs const — three ways to make a name, three different rules.",
    doc:["A Tour of Go — Basics", "https://go.dev/tour/basics/8"],
    do:"Declare the same value three ways (var, :=, const) and note where each is legal."
  },

  { id:"1.6", title:"Errors", min:35,
    why:"Go has no exceptions. An error is just a value you check — this is the one habit to get right early.",
    doc:["Working with Errors in Go 1.13", "https://go.dev/blog/go1.13-errors"],
    watch:"Always check `if err != nil` right after the call. Never log an error AND return it — pick one.",
    do:"Write a function returning (int, error). Call it and handle both paths."
  },

  { id:"1.7", title:"Functions", min:25,
    why:"Multiple returns and closures — two things most languages don't have built in.",
    doc:["A Tour of Go — Functions", "https://go.dev/tour/moretypes/24"],
    do:"Write a function that returns two values, and one closure that remembers a count between calls."
  },

  { id:"1.8", title:"Pointers, Parameters, Return Values", min:30,
    why:"Go passes everything by value — a pointer just makes the value \"the address of something\".",
    doc:["A Tour of Go — Pointers", "https://go.dev/tour/moretypes/1"],
    watch:"Passing a struct copies it. Passing *Struct lets a function change the caller's original.",
    do:"Write a function that doubles an int through a pointer parameter, and prove a non-pointer version doesn't work."
  },

  { id:"1.9", title:"Arrays, Slices, Maps, for", min:45,
    why:"The most-used data structures in Go, and the single biggest source of new-developer bugs.",
    doc:["Go Slices: usage and internals", "https://go.dev/blog/slices-intro"],
    watch:"A slice shares memory with its parent. b := a[1:3]; b[0] = 99  also changes a. Copy with copy() if you need an independent slice.",
    do:"Predict, then run: a := []int{1,2,3,4}; b := a[1:3]; b[0] = 99; print a. Explain the result in one sentence."
  },

  { id:"1.10", title:"Generics", min:25,
    why:"Write one function that works for int, string, or any type — without repeating yourself.",
    doc:["Tutorial: Getting started with generics", "https://go.dev/doc/tutorial/generics"],
    do:"Write a generic Max[T int|float64](a, b T) T function."
  }
]},

{
  n: 2, title: "Structs, Modules, Concurrency Basics",
  blurb: "How Go does OOP without classes, how dependencies work, and your first goroutine.",
  units: [

  { id:"2.1", title:"Structs & Interfaces", min:50,
    why:"This replaces classes and inheritance. It's the most important idea in the whole course.",
    doc:["Effective Go — Interfaces and embedding", "https://go.dev/doc/effective_go#embedding"],
    watch:"Uppercase field/method names are public, lowercase are private — that's the whole rule, no keywords needed.",
    do:"Define a struct User with a Greet() method, then a second struct that embeds User."
  },

  { id:"2.2", title:"Dependency Management", min:25,
    why:"How Go finds and locks the versions of code you depend on.",
    doc:["Managing dependencies", "https://go.dev/doc/modules/managing-dependencies"],
    do:"go get one small package, look at what changed in go.mod and go.sum, then go mod tidy."
  },

  { id:"2.3", title:"Goroutines & Parallelism", min:30,
    why:"The `go` keyword — how Go runs many things at once, cheaply.",
    doc:["A Tour of Go — Concurrency", "https://go.dev/tour/concurrency/1"],
    do:"Launch 5 goroutines that each print a number. Run it twice — notice the order isn't fixed."
  },

  { id:"2.4", title:"Race Conditions", min:25,
    why:"Two goroutines touching the same variable at once causes bugs a normal test won't catch.",
    doc:["Data Race Detector", "https://go.dev/doc/articles/race_detector"],
    watch:"Run everything with go run -race at least once. It catches races a passing test can hide.",
    do:"Increment a shared counter from 100 goroutines with no protection, run with -race, and watch it fail."
  },

  { id:"2.5", title:"WaitGroup & Mutex", min:35,
    why:"The two tools that make goroutines wait for each other and share data safely.",
    doc:["sync package", "https://pkg.go.dev/sync"],
    watch:"Call wg.Add(1) before go func(), never inside it — otherwise Wait() can return too early.",
    do:"Fix your 2.4 counter with a sync.Mutex, then confirm -race is clean."
  },

  { id:"2.6", title:"Configuration Management", min:20,
    why:"Real services read settings from the environment, never hardcode them.",
    doc:["os.LookupEnv", "https://pkg.go.dev/os#LookupEnv"],
    do:"Read a PORT variable from the environment, with 8080 as the default if it's not set."
  }
]},

{
  n: 3, title: "Channels & Web Basics",
  blurb: "How goroutines talk to each other, and your first HTTP handler.",
  units: [

  { id:"3.1", title:"Channels", min:40,
    why:"How goroutines send data to each other safely, without a shared variable.",
    doc:["A Tour of Go — Channels", "https://go.dev/tour/concurrency/2"],
    watch:"Sending on a closed channel panics. Only the sender should ever close a channel.",
    do:"Send 5 numbers from one goroutine to another over a channel, then close it and range over it."
  },

  { id:"3.2", title:"Context & Timeouts", min:35,
    why:"How you tell a slow goroutine to give up, instead of waiting forever.",
    doc:["Go Concurrency Patterns: Context", "https://go.dev/blog/context"],
    watch:"Always write `defer cancel()` right after creating a context with a timeout.",
    do:"Wrap a 3-second sleep in a context with a 1-second timeout, and print which one wins."
  },

  { id:"3.3", title:"JSON", min:25,
    why:"How Go structs turn into the JSON your API actually sends and receives.",
    doc:["JSON and Go", "https://go.dev/blog/json"],
    watch:"Tag a field `json:\"-\"` to keep it out of the response — use this for passwords.",
    do:"Marshal a struct with a password field tagged json:\"-\" and confirm it's missing from the output."
  },

  { id:"3.4", title:"Your First Web Server", min:40,
    why:"Serve an HTTP response with only the standard library, no framework.",
    doc:["Routing Enhancements for Go 1.22", "https://go.dev/blog/routing-enhancements"],
    do:"Build GET /health that returns {\"status\":\"ok\"} using only net/http."
  },

  { id:"3.5", title:"Path Variables & Routing", min:25,
    why:"How a URL like /users/42 gets the 42 into your handler.",
    doc:["Routing Enhancements for Go 1.22", "https://go.dev/blog/routing-enhancements"],
    do:"Add GET /users/{id} to your server and return the id from the URL in the response."
  },

  { id:"3.6", title:"A Simple REST Endpoint", min:35,
    why:"Put the last five units together into one real endpoint.",
    doc:["Tutorial: Developing a RESTful API with Go", "https://go.dev/doc/tutorial/web-service-gin"],
    do:"Build POST /users that reads a JSON body and returns it back with a generated id."
  }
]},

{
  n: 4, title: "Testing & Shipping",
  blurb: "Prove your code works, then package it so anyone can run it.",
  units: [

  { id:"4.1", title:"Reading & Writing Files", min:25,
    why:"Every format — files, HTTP bodies, network — reads and writes the same way in Go.",
    doc:["os package", "https://pkg.go.dev/os#ReadFile"],
    do:"Read a text file, count its lines, print the count."
  },

  { id:"4.2", title:"Talking to a Database", min:40,
    why:"How a Go service reads and writes rows without an ORM.",
    doc:["go-database-sql.org", "http://go-database-sql.org/"],
    watch:"Never build SQL with fmt.Sprintf — always use a ? placeholder, or you've written a SQL injection bug.",
    do:"Connect to any local MySQL/SQLite and run one SELECT with a placeholder parameter."
  },

  { id:"4.3", title:"Using the Gin Framework", min:30,
    why:"What a web framework adds on top of net/http — routing, binding, middleware.",
    doc:["Tutorial: RESTful API with Go and Gin", "https://go.dev/doc/tutorial/web-service-gin"],
    do:"Rebuild your 3.6 endpoint in Gin and compare the line count to the plain net/http version."
  },

  { id:"4.4", title:"Writing Your First Test", min:35,
    why:"How Go tests work — no separate framework, just the testing package.",
    doc:["Tutorial: Add a test", "https://go.dev/doc/tutorial/add-a-test"],
    do:"Write one test for your 1.7 function using go test."
  },

  { id:"4.5", title:"Table-Driven Tests", min:30,
    why:"The Go-idiomatic way to test many inputs without copy-pasting the same test four times.",
    doc:["Table-driven tests", "https://go.dev/wiki/TableDrivenTests"],
    do:"Rewrite your 4.4 test to check 4 different inputs in one table-driven test."
  },

  { id:"4.6", title:"Basic Benchmarking", min:20,
    why:"Measure whether a change actually made your code faster, instead of guessing.",
    doc:["testing — Benchmarks", "https://pkg.go.dev/testing#hdr-Benchmarks"],
    do:"Benchmark string concatenation with += versus strings.Builder for 100 iterations."
  },

  { id:"4.7", title:"Logging", min:20,
    why:"Structured logs you can search, instead of scattered Printf calls.",
    doc:["Structured Logging with slog", "https://go.dev/blog/slog"],
    do:"Replace one fmt.Println in your code with slog.Info and a structured field."
  },

  { id:"4.8", title:"Packaging with Docker", min:35,
    why:"Ship your service as one small container image anyone can run.",
    doc:["Docker's Go language guide", "https://docs.docker.com/language/golang/"],
    do:"Write a 2-stage Dockerfile for your 3.6 server and confirm the image is under 30 MB."
  },

  { id:"4.9", title:"Basic Security Habits", min:25,
    why:"The three mistakes that turn a first project into a real vulnerability.",
    doc:["OWASP Go Secure Coding Practices", "https://github.com/OWASP/Go-SCP"],
    watch:"Hash passwords with bcrypt, never store them plain. Use a ? placeholder for every SQL query, always.",
    do:"Check your 4.2 query uses a placeholder, not string concatenation."
  },

  { id:"4.10", title:"Mini Project", min:240,
    why:"Put everything together: a REST endpoint, a test, a Dockerfile.",
    doc:["Capstone brief", "#capstone"],
    do:"Build a small \"notes\" API — create, list, get by id — with one table-driven test and a Dockerfile."
  }
]}
];

/* ---- Trainer reference — kept short on purpose ---- */
const SCOPE = [
  ["full","Core, teach fully","1.1–1.9, 2.1, 2.3–2.5, 3.1, 3.4","These are the ones freshers must have before writing real code."],
  ["partial","Teach, revisit later","1.10, 2.2, 2.6, 3.2–3.3, 3.5–3.6, 4.1–4.2","Cover the idea; depth comes with practice."],
  ["demo","Show, don't drill","4.3, 4.6, 4.8–4.9","A live demo is enough at this stage."],
  ["after","Take-home", "4.10 Mini Project","Do this after the basics feel comfortable."]
];

const PLAN = [
  ["Week 1","Redo Day 1 units without notes.","All 10 units re-typed from scratch."],
  ["Week 2","Day 2 + 3, focus on goroutines and one HTTP handler.","A server that responds on 2 routes."],
  ["Week 3","Build the mini project (4.10).","Working notes API with a test."],
  ["Week 4","Read one real Go file at work, ask a senior to walk through it.","A list of questions you asked."]
];

const INDEX = {
  "Official": [["Tour of Go","https://go.dev/tour/"],["Effective Go","https://go.dev/doc/effective_go"],
    ["pkg.go.dev","https://pkg.go.dev/std"],["Go Blog","https://go.dev/blog/"],["Go FAQ","https://go.dev/doc/faq"]],
  "Practice": [["Go by Example","https://gobyexample.com/"],["Go Playground","https://go.dev/play/"],
    ["Exercism Go track","https://exercism.org/tracks/go"]],
  "Reference": [["Code Review Comments","https://go.dev/wiki/CodeReviewComments"],
    ["100 Go Mistakes","https://100go.co/"],["awesome-go","https://github.com/avelino/awesome-go"]]
};
