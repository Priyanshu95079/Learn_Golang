/* ==========================================================================
   Get Set GO — fresher edition v2
   Every "read" link below is a SPECIFIC page (not a doc homepage), verified
   before inclusion. Where a dense official doc was replaced, it's replaced
   with a well-known, visually-formatted tutorial (DigitalOcean's "How To
   Code in Go" series, or a well-known individual blog) covering the exact
   same topic. Only two videos are included — both individually verified
   as specific, single videos, not channel or playlist links.
   ========================================================================== */

const ANCHORS = [
  ["A Tour of Go", "https://go.dev/tour/", "Interactive, official. Do this first."],
  ["Go Playground", "https://go.dev/play/", "Run and share Go code from your browser."],
  ["Go by Example", "https://gobyexample.com/", "One short page per topic, with runnable code."],
  ["pkg.go.dev", "https://pkg.go.dev/std", "Look up any standard library function."],
  ["How To Code in Go", "https://www.digitalocean.com/community/tutorial-series/how-to-code-in-go", "A free, step-by-step tutorial series — the main source for this roadmap."],
  ["Code Review Comments", "https://go.dev/wiki/CodeReviewComments", "What your reviewer will actually check for."]
];

const DAYS = [
{
  n: 1, title: "Language Foundations",
  blurb: "The syntax, plus the one habit (slices) that causes the most bugs later.",
  units: [

  { id:"1.1", title:"Why Go?", min:15,
    why:"Go trades flexibility for speed and simplicity. Know the trade before you write a line.",
    doc:["Go FAQ — design goals", "https://go.dev/doc/faq"],
    video:["Go in 100 Seconds", "https://www.youtube.com/watch?v=446E-r0rXHI", "Fireship · 2 min"],
    do:"Cross-compile Hello World: GOOS=windows go build. No JVM, no interpreter needed."
  },

  { id:"1.2", title:"Setting Up Go", min:20,
    why:"Get the toolchain installed and your first module running.",
    doc:["Tutorial: Get started with Go", "https://go.dev/doc/tutorial/getting-started"],
    video:["How to get started with Golang", "https://www.youtube.com/watch?v=X4q1OM0voO0", "Hitesh Choudhary · Ep. 1, Hindi"],
    do:"go mod init a folder, write Hello World, run it with go run ."
  },

  { id:"1.3", title:"Basic Program, Go Tools", min:20,
    why:"Packages, imports, and the four commands you'll type all day.",
    doc:["How to Write Go Code", "https://go.dev/doc/code"],
    do:"Split Hello World into two files: package main, and a package greet it imports."
  },

  { id:"1.4", title:"Working with Strings", min:25,
    why:"Go strings are UTF-8 bytes, not characters — this trips up everyone once.",
    doc:["Strings, bytes, runes and characters in Go", "https://go.dev/blog/strings"],
    watch:"len(\"नमस्ते\") is 18, not 6 — that's bytes, not letters.",
    do:"Print len() of an English word and a Hindi word side by side."
  },

  { id:"1.5", title:"Variables and Assignment", min:15,
    why:"var vs := vs const — three ways to make a name, three different rules.",
    doc:["A Tour of Go — Basics", "https://go.dev/tour/basics/8"],
    do:"Declare the same value three ways (var, :=, const) and note where each is legal."
  },

  { id:"1.6", title:"Errors", min:25,
    why:"Go has no exceptions. An error is just a value you check — get this habit right early.",
    doc:["Handling Errors in Go", "https://www.digitalocean.com/community/tutorials/handling-errors-in-go", "DigitalOcean · step-by-step"],
    watch:"Always check `if err != nil` right after the call. Never log an error AND return it.",
    do:"Write a function returning (int, error). Call it and handle both paths."
  },

  { id:"1.7", title:"Functions", min:20,
    why:"Multiple returns and closures — two things most languages don't have built in.",
    doc:["How To Define and Call Functions in Go", "https://www.digitalocean.com/community/tutorials/how-to-define-and-call-functions-in-go", "DigitalOcean · step-by-step"],
    do:"Write a function that returns two values, and one closure that remembers a count."
  },

  { id:"1.8", title:"Pointers", min:25,
    why:"Go passes everything by value — a pointer just points at where the original lives.",
    doc:["Understanding Pointers in Go", "https://www.digitalocean.com/community/tutorials/understanding-pointers-in-go", "DigitalOcean · step-by-step"],
    watch:"Passing a struct copies it. Passing *Struct lets a function change the caller's original.",
    do:"Write a function that doubles an int through a pointer parameter."
  },

  { id:"1.9", title:"Arrays, Slices, Maps", min:35,
    why:"The most-used data structures in Go, and the single biggest source of new-developer bugs.",
    doc:["Understanding Arrays and Slices in Go", "https://www.digitalocean.com/community/tutorials/understanding-arrays-and-slices-in-go", "DigitalOcean · step-by-step"],
    watch:"A slice shares memory with its parent. b := a[1:3]; b[0]=99 also changes a.",
    do:"Predict, then run: a := []int{1,2,3,4}; b := a[1:3]; b[0]=99; print a."
  },

  { id:"1.10", title:"Generics", min:20,
    why:"Write one function that works for int, string, or any type — without repeating yourself.",
    doc:["Tutorial: Getting started with generics", "https://go.dev/doc/tutorial/generics"],
    do:"Write a generic Max[T int|float64](a, b T) T function."
  }
]},

{
  n: 2, title: "Structs, Modules, Concurrency Basics",
  blurb: "How Go does OOP without classes, and your first goroutine.",
  units: [

  { id:"2.1", title:"Structs & Interfaces", min:35,
    why:"This replaces classes and inheritance. It's the most important idea in the course.",
    doc:["How To Use Interfaces in Go", "https://www.digitalocean.com/community/tutorials/how-to-use-interfaces-in-go", "DigitalOcean · step-by-step"],
    watch:"Uppercase field/method names are public, lowercase are private — no keywords needed.",
    do:"Define a struct User with a Greet() method, then a second struct that embeds User."
  },

  { id:"2.2", title:"Dependency Management", min:20,
    why:"How Go finds and locks the versions of code you depend on.",
    doc:["Managing dependencies", "https://go.dev/doc/modules/managing-dependencies"],
    do:"go get one small package, look at go.mod and go.sum, then go mod tidy."
  },

  { id:"2.3", title:"Goroutines", min:25,
    why:"The `go` keyword — how Go runs many things at once, cheaply.",
    doc:["How To Run Multiple Functions Concurrently in Go", "https://www.digitalocean.com/community/tutorials/how-to-run-multiple-functions-concurrently-in-go", "DigitalOcean · step-by-step"],
    do:"Launch 5 goroutines that each print a number. Run it twice — the order isn't fixed."
  },

  { id:"2.4", title:"Race Conditions", min:20,
    why:"Two goroutines touching the same variable at once causes bugs a normal test won't catch.",
    doc:["Data Race Detector", "https://go.dev/doc/articles/race_detector"],
    watch:"Run everything with go run -race at least once. It catches races a passing test can hide.",
    do:"Increment a shared counter from 100 goroutines with no protection, run with -race, watch it fail."
  },

  { id:"2.5", title:"WaitGroup & Mutex", min:30,
    why:"The two tools that make goroutines wait for each other and share data safely.",
    doc:["Understanding Mutexes", "https://www.alexedwards.net/blog/understanding-mutexes", "Alex Edwards · blog, worked example"],
    watch:"Call wg.Add(1) before go func(), never inside it, or Wait() can return too early.",
    do:"Fix your 2.4 counter with a sync.Mutex, then confirm -race is clean."
  },

  { id:"2.6", title:"Configuration Management", min:15,
    why:"Real services read settings from the environment, never hardcode them.",
    doc:["os.LookupEnv", "https://pkg.go.dev/os#LookupEnv"],
    do:"Read a PORT variable from the environment, with 8080 as the default."
  }
]},

{
  n: 3, title: "Channels & Web Basics",
  blurb: "How goroutines talk to each other, and your first HTTP handler.",
  units: [

  { id:"3.1", title:"Channels", min:30,
    why:"How goroutines send data to each other safely, without a shared variable.",
    doc:["How To Run Multiple Functions Concurrently in Go", "https://www.digitalocean.com/community/tutorials/how-to-run-multiple-functions-concurrently-in-go", "DigitalOcean · same tutorial, channels half"],
    watch:"Sending on a closed channel panics. Only the sender should ever close a channel.",
    do:"Send 5 numbers over a channel to another goroutine, close it, then range over it."
  },

  { id:"3.2", title:"Context & Timeouts", min:25,
    why:"How you tell a slow goroutine to give up, instead of waiting forever.",
    doc:["How To Use Contexts in Go", "https://www.digitalocean.com/community/tutorials/how-to-use-contexts-in-go", "DigitalOcean · step-by-step"],
    watch:"Always write `defer cancel()` right after creating a context with a timeout.",
    do:"Wrap a 3-second sleep in a context with a 1-second timeout, print which one wins."
  },

  { id:"3.3", title:"JSON", min:20,
    why:"How Go structs turn into the JSON your API actually sends and receives.",
    doc:["How To Use JSON in Go", "https://www.digitalocean.com/community/tutorials/how-to-use-json-in-go", "DigitalOcean · step-by-step"],
    watch:"Tag a field `json:\"-\"` to keep it out of the response — use this for passwords.",
    do:"Marshal a struct with a password field tagged json:\"-\" and confirm it's missing."
  },

  { id:"3.4", title:"Your First Web Server", min:30,
    why:"Serve an HTTP response with only the standard library, no framework.",
    doc:["How To Make an HTTP Server in Go", "https://www.digitalocean.com/community/tutorials/how-to-make-an-http-server-in-go", "DigitalOcean · step-by-step"],
    do:"Build GET /health that returns {\"status\":\"ok\"} using only net/http."
  },

  { id:"3.5", title:"Path Variables & Routing", min:20,
    why:"How a URL like /users/42 gets the 42 into your handler.",
    doc:["Routing Enhancements for Go 1.22", "https://go.dev/blog/routing-enhancements"],
    do:"Add GET /users/{id} to your server and return the id from the URL."
  },

  { id:"3.6", title:"A Simple REST Endpoint", min:30,
    why:"Put the last five units together into one real endpoint.",
    doc:["How To Make HTTP Requests in Go", "https://www.digitalocean.com/community/tutorials/how-to-make-http-requests-in-go", "DigitalOcean · step-by-step"],
    do:"Build POST /users that reads a JSON body and returns it with a generated id."
  }
]},

{
  n: 4, title: "Testing & Shipping",
  blurb: "Prove your code works, then package it so anyone can run it.",
  units: [

  { id:"4.1", title:"Reading & Writing Files", min:20,
    why:"Every format — files, HTTP bodies, network — reads and writes the same way in Go.",
    doc:["os package — ReadFile", "https://pkg.go.dev/os#ReadFile"],
    do:"Read a text file, count its lines, print the count."
  },

  { id:"4.2", title:"Talking to a Database", min:30,
    why:"How a Go service reads and writes rows without an ORM.",
    doc:["go-database-sql.org", "http://go-database-sql.org/"],
    watch:"Never build SQL with fmt.Sprintf — always use a ? placeholder.",
    do:"Connect to any local MySQL/SQLite and run one SELECT with a placeholder parameter."
  },

  { id:"4.3", title:"Using the Gin Framework", min:25,
    why:"What a web framework adds on top of net/http — routing, binding, middleware.",
    doc:["Tutorial: RESTful API with Go and Gin", "https://go.dev/doc/tutorial/web-service-gin"],
    do:"Rebuild your 3.6 endpoint in Gin and compare the line count."
  },

  { id:"4.4", title:"Writing Your First Test", min:25,
    why:"How Go tests work — no separate framework, just the testing package.",
    doc:["Tutorial: Add a test", "https://go.dev/doc/tutorial/add-a-test"],
    do:"Write one test for your 1.7 function using go test."
  },

  { id:"4.5", title:"Table-Driven Tests", min:20,
    why:"The Go-idiomatic way to test many inputs without copy-pasting the same test four times.",
    doc:["Table-driven tests", "https://go.dev/wiki/TableDrivenTests"],
    do:"Rewrite your 4.4 test to check 4 different inputs in one table-driven test."
  },

  { id:"4.6", title:"Basic Benchmarking", min:15,
    why:"Measure whether a change actually made your code faster, instead of guessing.",
    doc:["testing — Benchmarks", "https://pkg.go.dev/testing#hdr-Benchmarks"],
    do:"Benchmark += versus strings.Builder for 100 iterations."
  },

  { id:"4.7", title:"Logging", min:15,
    why:"Structured logs you can search, instead of scattered Printf calls.",
    doc:["Structured Logging with slog", "https://go.dev/blog/slog"],
    do:"Replace one fmt.Println with slog.Info and a structured field."
  },

  { id:"4.8", title:"Packaging with Docker", min:30,
    why:"Ship your service as one small container image anyone can run.",
    doc:["Docker's Go language guide", "https://docs.docker.com/language/golang/"],
    do:"Write a 2-stage Dockerfile for your 3.6 server, confirm the image is under 30 MB."
  },

  { id:"4.9", title:"Basic Security Habits", min:20,
    why:"The three mistakes that turn a first project into a real vulnerability.",
    doc:["OWASP Go Secure Coding Practices", "https://github.com/OWASP/Go-SCP"],
    watch:"Hash passwords with bcrypt, never store them plain. Always use a ? placeholder in SQL.",
    do:"Check your 4.2 query uses a placeholder, not string concatenation."
  },

  { id:"4.10", title:"Mini Project", min:240,
    why:"Put everything together: a REST endpoint, a test, a Dockerfile.",
    doc:["Capstone brief", "#capstone"],
    do:"Build a small \"notes\" API — create, list, get by id — with one test and a Dockerfile."
  }
]}
];

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
  "Tutorials": [["How To Code in Go series","https://www.digitalocean.com/community/tutorial-series/how-to-code-in-go"],
    ["Go by Example","https://gobyexample.com/"],["Go Playground","https://go.dev/play/"]],
  "Practice": [["Exercism Go track","https://exercism.org/tracks/go"],
    ["Code Review Comments","https://go.dev/wiki/CodeReviewComments"],["100 Go Mistakes","https://100go.co/"]]
};
