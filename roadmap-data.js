/* ==========================================================================
   Get Set GO — fresher edition, final
   ==========================================================================
   RESOURCE RULES USED HERE
   - "read" is a friendly tutorial (DigitalOcean / dev.to / Medium / LinkedIn)
     wherever one exists. Official go.dev pages are used ONLY when the page is
     genuinely short and there is no clearer alternative.
   - "video" is ALWAYS a single exact video URL. Many jump straight to the
     right minute of the freeCodeCamp course using a &t= timestamp, so a
     fresher lands on the topic itself, not a 7-hour video's start.
   - No channel links. No playlist links. Anywhere.

   Verified video sources used:
     YS4e4q9oBaU  freeCodeCamp · Learn Go Programming (chapters timestamped)
     yyUHQIec83I  TechWorld with Nana · Golang Full Course
     446E-r0rXHI  Fireship · Go in 100 Seconds
     X4q1OM0voO0  Hitesh Choudhary · How to get started with golang (Hindi)
   ========================================================================== */

const ANCHORS = [
  ["A Tour of Go", "https://go.dev/tour/", "Interactive. Run Go in your browser, no setup."],
  ["Go Playground", "https://go.dev/play/", "Paste code, hit Run. Great for testing an idea."],
  ["Go by Example", "https://gobyexample.com/", "One short page per topic, all runnable."],
  ["How To Code in Go", "https://www.digitalocean.com/community/tutorial-series/how-to-code-in-go", "Free step-by-step tutorials. The main source used here."],
  ["freeCodeCamp Go course", "https://www.youtube.com/watch?v=YS4e4q9oBaU", "The 7-hour video most units link into at the right minute."],
  ["100 Go Mistakes", "https://100go.co/", "Common beginner traps, each explained in a paragraph."]
];

const DAYS = [
{
  n: 1, title: "Language Foundations",
  blurb: "Syntax, plus the one habit (slices) that causes the most bugs later.",
  units: [

  { id:"1.1", title:"Why Go?", min:10,
    why:"Go trades flexibility for speed and simplicity. Worth knowing the trade before you start.",
    doc:["Why Go? A beginner's take", "https://dev.to/thisismemukul/getting-started-with-golang-a-beginners-guide-e8p", "dev.to · 4 min read"],
    video:["Go in 100 Seconds", "https://www.youtube.com/watch?v=446E-r0rXHI", "Fireship · 2 min"],
    do:"Cross-compile Hello World: GOOS=windows go build. No JVM or interpreter needed."
  },

  { id:"1.2", title:"Setting Up Go", min:20,
    why:"Install the toolchain and get your first program running.",
    doc:["Tutorial: Get started with Go", "https://go.dev/doc/tutorial/getting-started", "go.dev · short, hands-on"],
    video:["How to get started with golang", "https://www.youtube.com/watch?v=X4q1OM0voO0", "Hitesh Choudhary · 11 min, Hindi"],
    do:"go mod init a folder, write Hello World, run it with go run ."
  },

  { id:"1.3", title:"Basic Program & Go Tools", min:20,
    why:"Packages, imports, and the four commands you'll type every day.",
    doc:["How To Build and Install Go Programs", "https://www.digitalocean.com/community/tutorials/how-to-build-and-install-go-programs", "DigitalOcean · step-by-step"],
    video:["Go course — Introduction & first program", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=0s", "freeCodeCamp · starts at 0:00"],
    do:"Split Hello World into two files: package main, and a package greet it imports."
  },

  { id:"1.4", title:"Strings & Basic Types", min:25,
    why:"Go strings are UTF-8 bytes, not characters — this trips up everyone once.",
    doc:["Strings, bytes and runes", "https://go.dev/blog/strings", "go.dev blog · worked examples"],
    video:["Go course — Primitives", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=3425s", "freeCodeCamp · jumps to 57:05"],
    watch:"len(\"नमस्ते\") is 18, not 6 — that's bytes, not letters.",
    do:"Print len() of an English word and a Hindi word side by side."
  },

  { id:"1.5", title:"Variables & Constants", min:20,
    why:"var vs := vs const — three ways to name a value, three different rules.",
    doc:["How To Use Variables and Constants in Go", "https://www.digitalocean.com/community/tutorials/how-to-use-variables-and-constants-in-go", "DigitalOcean · step-by-step"],
    video:["Go course — Variables", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=2148s", "freeCodeCamp · jumps to 35:48"],
    do:"Declare the same value three ways (var, :=, const) and note where each is legal."
  },

  { id:"1.6", title:"Errors", min:25,
    why:"Go has no exceptions. An error is just a value you check — get this habit right early.",
    doc:["Error handling in Go", "https://dev.to/abakermi/errors-handling-in-go-8g0", "dev.to · 5 min read"],
    video:["Go course — Defer, Panic and Recover", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=13294s", "freeCodeCamp · jumps to 3:41:34"],
    watch:"Check `if err != nil` right after the call. Never log an error AND return it.",
    do:"Write a function returning (int, error). Call it and handle both paths."
  },

  { id:"1.7", title:"Functions", min:20,
    why:"Multiple return values and closures — two things most languages don't have built in.",
    doc:["How To Define and Call Functions in Go", "https://www.digitalocean.com/community/tutorials/how-to-define-and-call-functions-in-go", "DigitalOcean · step-by-step"],
    video:["Go course — Functions", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=15690s", "freeCodeCamp · jumps to 4:21:30"],
    do:"Write a function that returns two values, and one closure that remembers a count."
  },

  { id:"1.8", title:"Pointers", min:25,
    why:"Go passes everything by value — a pointer just points at where the original lives.",
    doc:["Understanding Pointers in Go", "https://www.digitalocean.com/community/tutorials/understanding-pointers-in-go", "DigitalOcean · step-by-step"],
    video:["Go course — Pointers", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=14637s", "freeCodeCamp · jumps to 4:03:57"],
    watch:"Passing a struct copies it. Passing *Struct lets a function change the caller's original.",
    do:"Write a function that doubles an int through a pointer parameter."
  },

  { id:"1.9", title:"Arrays, Slices & Maps", min:35,
    why:"The most-used data structures in Go, and the single biggest source of beginner bugs.",
    doc:["Mastering Go Slices: Zero to Hero", "https://dev.to/shrsv/mastering-go-slices-a-deep-dive-from-zero-to-hero-1n97", "dev.to · diagrams + examples"],
    video:["Go course — Arrays and Slices", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=6473s", "freeCodeCamp · jumps to 1:47:53"],
    watch:"A slice shares memory with its parent. b := a[1:3]; b[0]=99 also changes a.",
    do:"Predict, then run: a := []int{1,2,3,4}; b := a[1:3]; b[0]=99; print a."
  },

  { id:"1.10", title:"Generics", min:20,
    why:"Write one function that works for int, string, or any type — without repeating yourself.",
    doc:["Tutorial: Getting started with generics", "https://go.dev/doc/tutorial/generics", "go.dev · short, hands-on"],
    do:"Write a generic Max[T int|float64](a, b T) T function."
  }
]},

{
  n: 2, title: "Structs, Modules & Concurrency Basics",
  blurb: "How Go does OOP without classes, and your first goroutine.",
  units: [

  { id:"2.1", title:"Structs & Methods", min:30,
    why:"Structs are how Go groups data. Methods are functions attached to them.",
    doc:["Array, Slices, Maps, Struct explained", "https://medium.com/@Rushabh_/exploring-gos-core-2-unlocking-array-slices-maps-and-struct-adaa5cd6b4c1", "Medium · 13 min, illustrated"],
    video:["Go course — Maps and Structs", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=8240s", "freeCodeCamp · jumps to 2:17:20"],
    watch:"Uppercase field names are public, lowercase are private — no keywords needed.",
    do:"Define a struct User with a Greet() method."
  },

  { id:"2.2", title:"Interfaces", min:30,
    why:"This replaces inheritance. The most important idea in the whole course.",
    doc:["How To Use Interfaces in Go", "https://www.digitalocean.com/community/tutorials/how-to-use-interfaces-in-go", "DigitalOcean · step-by-step"],
    video:["Go course — Interfaces", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=17879s", "freeCodeCamp · jumps to 4:57:59"],
    watch:"You never write \"implements\". If your type has the methods, it satisfies the interface.",
    do:"Write a Shape interface with Area(), then a Circle and Rectangle that satisfy it."
  },

  { id:"2.3", title:"Packages & Modules", min:20,
    why:"How Go finds, versions and locks the code you depend on.",
    doc:["How to Use Go Modules", "https://www.digitalocean.com/community/tutorials/how-to-use-go-modules", "DigitalOcean · step-by-step"],
    video:["Golang Full Course — packages & modules", "https://www.youtube.com/watch?v=yyUHQIec83I", "TechWorld with Nana · 3h24m"],
    do:"go get one small package, look at go.mod and go.sum, then go mod tidy."
  },

  { id:"2.4", title:"Goroutines", min:25,
    why:"The `go` keyword — how Go runs many things at once, cheaply.",
    doc:["How To Run Multiple Functions Concurrently", "https://www.digitalocean.com/community/tutorials/how-to-run-multiple-functions-concurrently-in-go", "DigitalOcean · step-by-step"],
    video:["Go course — Goroutines", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=20037s", "freeCodeCamp · jumps to 5:33:57"],
    do:"Launch 5 goroutines that each print a number. Run twice — the order isn't fixed."
  },

  { id:"2.5", title:"Race Conditions", min:20,
    why:"Two goroutines touching one variable at once causes bugs a normal test won't catch.",
    doc:["Prevent Race Conditions with sync.Mutex", "https://www.linkedin.com/pulse/prevent-race-conditions-like-pro-mastering-syncmutex-go-agarwal-so9sc", "LinkedIn · real-world example"],
    watch:"Run everything with go run -race at least once. It catches races a passing test hides.",
    do:"Increment a shared counter from 100 goroutines with no lock, run with -race, watch it fail."
  },

  { id:"2.6", title:"WaitGroup & Mutex", min:25,
    why:"The two tools that make goroutines wait for each other and share data safely.",
    doc:["Mutex vs RWMutex in simple terms", "https://dev.to/mohamadharith/the-difference-between-syncmutex-and-syncrwmutex-in-golang-explained-in-simple-terms-58pl", "dev.to · plain-English, 6 min"],
    watch:"Call wg.Add(1) before go func(), never inside it, or Wait() can return too early.",
    do:"Fix your 2.5 counter with a sync.Mutex, then confirm -race is clean."
  }
]},

{
  n: 3, title: "Channels & Web Basics",
  blurb: "How goroutines talk to each other, and your first HTTP handler.",
  units: [

  { id:"3.1", title:"Channels", min:30,
    why:"How goroutines send data to each other safely, without a shared variable.",
    doc:["How To Run Multiple Functions Concurrently", "https://www.digitalocean.com/community/tutorials/how-to-run-multiple-functions-concurrently-in-go", "DigitalOcean · channels section"],
    video:["Go course — Channels", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=21910s", "freeCodeCamp · jumps to 6:05:10"],
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
    video:["Golang Full Course — building a web app", "https://www.youtube.com/watch?v=yyUHQIec83I", "TechWorld with Nana · 3h24m"],
    do:"Build GET /health that returns {\"status\":\"ok\"} using only net/http."
  },

  { id:"3.5", title:"Routing & Path Variables", min:20,
    why:"How a URL like /users/42 gets the 42 into your handler.",
    doc:["Routing Enhancements for Go 1.22", "https://go.dev/blog/routing-enhancements", "go.dev blog · short"],
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
    why:"Files, HTTP bodies and network streams all read and write the same way in Go.",
    doc:["os package — ReadFile", "https://pkg.go.dev/os#ReadFile", "pkg.go.dev · one function"],
    do:"Read a text file, count its lines, print the count."
  },

  { id:"4.2", title:"Talking to a Database", min:30,
    why:"How a Go service reads and writes rows without an ORM.",
    doc:["go-database-sql.org", "http://go-database-sql.org/", "guide · short chapters"],
    watch:"Never build SQL with fmt.Sprintf — always use a ? placeholder.",
    do:"Connect to any local MySQL/SQLite and run one SELECT with a placeholder."
  },

  { id:"4.3", title:"Using the Gin Framework", min:25,
    why:"What a web framework adds on top of net/http — routing, binding, middleware.",
    doc:["Tutorial: RESTful API with Go and Gin", "https://go.dev/doc/tutorial/web-service-gin", "go.dev · hands-on tutorial"],
    do:"Rebuild your 3.6 endpoint in Gin and compare the line count."
  },

  { id:"4.4", title:"Writing Your First Test", min:25,
    why:"How Go tests work — no separate framework, just the testing package.",
    doc:["Tutorial: Add a test", "https://go.dev/doc/tutorial/add-a-test", "go.dev · short, hands-on"],
    do:"Write one test for your 1.7 function using go test."
  },

  { id:"4.5", title:"Table-Driven Tests", min:20,
    why:"The Go way to test many inputs without copy-pasting the same test four times.",
    doc:["Table-driven tests", "https://go.dev/wiki/TableDrivenTests", "go.dev wiki · one page"],
    do:"Rewrite your 4.4 test to check 4 different inputs in one table."
  },

  { id:"4.6", title:"Basic Benchmarking", min:15,
    why:"Measure whether a change actually made your code faster, instead of guessing.",
    doc:["testing — Benchmarks", "https://pkg.go.dev/testing#hdr-Benchmarks", "pkg.go.dev · one section"],
    do:"Benchmark += versus strings.Builder for 100 iterations."
  },

  { id:"4.7", title:"Logging", min:15,
    why:"Structured logs you can search, instead of scattered Printf calls.",
    doc:["Structured Logging with slog", "https://go.dev/blog/slog", "go.dev blog · examples"],
    do:"Replace one fmt.Println with slog.Info and a structured field."
  },

  { id:"4.8", title:"Packaging with Docker", min:30,
    why:"Ship your service as one small container image anyone can run.",
    doc:["Docker's Go language guide", "https://docs.docker.com/language/golang/", "docker.com · step-by-step"],
    do:"Write a 2-stage Dockerfile for your 3.6 server, confirm the image is under 30 MB."
  },

  { id:"4.9", title:"Basic Security Habits", min:20,
    why:"The three mistakes that turn a first project into a real vulnerability.",
    doc:["OWASP Go Secure Coding Practices", "https://github.com/OWASP/Go-SCP", "OWASP · chapter per topic"],
    watch:"Hash passwords with bcrypt, never plain. Always use a ? placeholder in SQL.",
    do:"Check your 4.2 query uses a placeholder, not string concatenation."
  },

  { id:"4.10", title:"Mini Project", min:240,
    why:"Put it all together: a REST endpoint, a test, a Dockerfile.",
    doc:["Capstone brief", "#capstone", "internal"],
    do:"Build a small notes API — create, list, get by id — with one test and a Dockerfile."
  }
]}
];

const SCOPE = [
  ["full","Core, teach fully","1.1–1.9, 2.1–2.2, 2.4–2.6, 3.1, 3.4","Freshers need these before writing real code."],
  ["partial","Teach, revisit later","1.10, 2.3, 3.2–3.3, 3.5–3.6, 4.1–4.2","Cover the idea; depth comes with practice."],
  ["demo","Show, don't drill","4.3, 4.6, 4.8–4.9","A live demo is enough at this stage."],
  ["after","Take-home","4.10 Mini Project","Once the basics feel comfortable."]
];

const PLAN = [
  ["Week 1","Redo Day 1 units without notes.","All 10 units re-typed from scratch."],
  ["Week 2","Day 2 + 3: goroutines and one HTTP handler.","A server that responds on 2 routes."],
  ["Week 3","Build the mini project (4.10).","Working notes API with a test."],
  ["Week 4","Read one real Go file at work; ask a senior to walk through it.","A list of questions you asked."]
];

const INDEX = {
  "Video": [["freeCodeCamp Go course","https://www.youtube.com/watch?v=YS4e4q9oBaU"],
    ["TechWorld with Nana Go course","https://www.youtube.com/watch?v=yyUHQIec83I"],
    ["Hitesh Choudhary — start here (Hindi)","https://www.youtube.com/watch?v=X4q1OM0voO0"],
    ["Go in 100 Seconds","https://www.youtube.com/watch?v=446E-r0rXHI"]],
  "Tutorials": [["How To Code in Go series","https://www.digitalocean.com/community/tutorial-series/how-to-code-in-go"],
    ["Go by Example","https://gobyexample.com/"],["A Tour of Go","https://go.dev/tour/"],
    ["Go Playground","https://go.dev/play/"]],
  "Practice": [["Exercism Go track","https://exercism.org/tracks/go"],
    ["100 Go Mistakes","https://100go.co/"],
    ["Code Review Comments","https://go.dev/wiki/CodeReviewComments"]]
};
