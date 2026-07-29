/* ==========================================================================
   Get Set GO — vetted edition
   ==========================================================================
   HOW RESOURCES WERE CHOSEN (after review feedback that earlier picks were
   stale and not well researched):

   1. PRIMARY read is Go by Example for almost every unit.
      Why: it is listed on go.dev's own wiki as a recommended resource, is
      actively maintained (Context, Logging, HTTP Server and Custom Errors
      pages were all added recently), and every page is ONE short page of
      runnable, annotated code. That is exactly what a fresher needs.

   2. OFFICIAL go.dev pages are used where the official page is both current
      and the clearest thing available — generics tutorial, modules, the
      Go 1.22 routing post, the slog post.

   3. DEEPER read is offered only where a fresher will realistically want
      more: Learn Go with Tests and Alex Edwards, both actively maintained
      and the two most-recommended free Go resources in the community.

   4. NO random blog posts. The previous version linked a 2020 dev.to article
      that taught github.com/pkg/errors for wrapping — an approach superseded
      by the standard library's %w / errors.Is / errors.As in Go 1.13. That is
      exactly the kind of stale material this rewrite removes.

   5. VIDEOS are single exact URLs. Most deep-link to the right minute of the
      freeCodeCamp course with a &t= timestamp, so nobody is handed a 7-hour
      video and told to find their own way.
   ========================================================================== */

const ANCHORS = [
  ["Go by Example", "https://gobyexample.com/", "One short page of runnable code per topic. Your main reference."],
  ["A Tour of Go", "https://go.dev/tour/", "Official, interactive, runs in the browser. Do this first."],
  ["Go Playground", "https://go.dev/play/", "Paste code, hit Run, share the link."],
  ["Learn Go with Tests", "https://quii.gitbook.io/learn-go-with-tests", "Free book. The most recommended free Go resource there is."],
  ["Effective Go", "https://go.dev/doc/effective_go", "How Go is meant to be written. Skim now, re-read in a month."],
  ["pkg.go.dev", "https://pkg.go.dev/std", "Look up any standard library function."]
];

const DAYS = [
{
  n: 1, title: "Language Foundations",
  blurb: "Syntax, plus the one habit (slices) that causes the most bugs later.",
  units: [

  { id:"1.1", title:"Why Go?", min:10,
    why:"Go trades flexibility for speed and simplicity. Worth knowing the trade before you start.",
    doc:["Go FAQ — why Go looks like this", "https://go.dev/doc/faq", "go.dev · official, answered by the authors"],
    video:["Go in 100 Seconds", "https://www.youtube.com/watch?v=446E-r0rXHI", "Fireship · 2 min"],
    do:"Cross-compile Hello World: GOOS=windows go build. No JVM or interpreter needed."
  },

  { id:"1.2", title:"Setting Up Go", min:20,
    why:"Install the toolchain and get your first program running.",
    doc:["Tutorial: Get started with Go", "https://go.dev/doc/tutorial/getting-started", "go.dev · official, hands-on"],
    video:["How to get started with golang", "https://www.youtube.com/watch?v=X4q1OM0voO0", "Hitesh Choudhary · 11 min, Hindi"],
    do:"go mod init a folder, write Hello World, run it with go run ."
  },

  { id:"1.3", title:"Hello World & Go Tools", min:20,
    why:"Packages, imports, and the four commands you'll type every day.",
    doc:["Go by Example: Hello World", "https://gobyexample.com/hello-world", "gobyexample · 1 page"],
    more:["How to Write Go Code", "https://go.dev/doc/code", "go.dev · packages and the build cycle"],
    video:["Go course — Introduction", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=0s", "freeCodeCamp · starts at 0:00"],
    do:"Split Hello World into two files: package main, and a package greet it imports."
  },

  { id:"1.4", title:"Strings & Runes", min:25,
    why:"Go strings are UTF-8 bytes, not characters — this trips up everyone once.",
    doc:["Go by Example: Strings and Runes", "https://gobyexample.com/strings-and-runes", "gobyexample · 1 page, runnable"],
    more:["Strings, bytes, runes and characters", "https://go.dev/blog/strings", "go.dev blog · the deep explanation"],
    video:["Go course — Primitives", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=3425s", "freeCodeCamp · jumps to 57:05"],
    watch:"len(\"नमस्ते\") is 18, not 6 — that's bytes, not letters.",
    do:"Print len() of an English word and a Hindi word side by side."
  },

  { id:"1.5", title:"Variables & Constants", min:15,
    why:"var vs := vs const — three ways to name a value, three different rules.",
    doc:["Go by Example: Variables", "https://gobyexample.com/variables", "gobyexample · 1 page, runnable"],
    video:["Go course — Variables", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=2148s", "freeCodeCamp · jumps to 35:48"],
    do:"Declare the same value three ways (var, :=, const) and note where each is legal."
  },

  { id:"1.6", title:"Errors", min:25,
    why:"Go has no exceptions. An error is just a value you check — get this habit right early.",
    doc:["Go by Example: Errors", "https://gobyexample.com/errors", "gobyexample · 1 page, current"],
    more:["Working with Errors in Go 1.13", "https://go.dev/blog/go1.13-errors", "go.dev · the official %w, errors.Is, errors.As reference"],
    video:["Go course — Defer, Panic and Recover", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=13294s", "freeCodeCamp · jumps to 3:41:34"],
    watch:"Wrap with fmt.Errorf(\"...: %w\", err) and compare with errors.Is. Anything telling you to use github.com/pkg/errors is out of date.",
    do:"Write a function returning (int, error). Call it and handle both paths."
  },

  { id:"1.7", title:"Functions & Closures", min:20,
    why:"Multiple return values and closures — two things most languages don't have built in.",
    doc:["Go by Example: Functions", "https://gobyexample.com/functions", "gobyexample · 1 page, runnable"],
    more:["Go by Example: Closures", "https://gobyexample.com/closures", "gobyexample · the closure page"],
    video:["Go course — Functions", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=15690s", "freeCodeCamp · jumps to 4:21:30"],
    do:"Write a function that returns two values, and one closure that remembers a count."
  },

  { id:"1.8", title:"Pointers", min:25,
    why:"Go passes everything by value — a pointer just points at where the original lives.",
    doc:["Go by Example: Pointers", "https://gobyexample.com/pointers", "gobyexample · 1 page, runnable"],
    video:["Go course — Pointers", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=14637s", "freeCodeCamp · jumps to 4:03:57"],
    watch:"Passing a struct copies it. Passing *Struct lets a function change the caller's original.",
    do:"Write a function that doubles an int through a pointer parameter."
  },

  { id:"1.9", title:"Arrays, Slices & Maps", min:35,
    why:"The most-used data structures in Go, and the single biggest source of beginner bugs.",
    doc:["Go by Example: Slices", "https://gobyexample.com/slices", "gobyexample · 1 page, runnable"],
    more:["Go Slices: usage and internals", "https://go.dev/blog/slices-intro", "go.dev blog · why aliasing happens"],
    video:["Go course — Arrays and Slices", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=6473s", "freeCodeCamp · jumps to 1:47:53"],
    watch:"A slice shares memory with its parent. b := a[1:3]; b[0]=99 also changes a.",
    do:"Predict, then run: a := []int{1,2,3,4}; b := a[1:3]; b[0]=99; print a."
  },

  { id:"1.10", title:"Generics", min:20,
    why:"Write one function that works for int, string, or any type — without repeating yourself.",
    doc:["Go by Example: Generics", "https://gobyexample.com/generics", "gobyexample · 1 page, runnable"],
    more:["Tutorial: Getting started with generics", "https://go.dev/doc/tutorial/generics", "go.dev · official walkthrough"],
    do:"Write a generic Max[T int|float64](a, b T) T function."
  }
]},

{
  n: 2, title: "Structs, Modules & Concurrency Basics",
  blurb: "How Go does OOP without classes, and your first goroutine.",
  units: [

  { id:"2.1", title:"Structs & Methods", min:30,
    why:"Structs group data. Methods are functions attached to them. Together they replace classes.",
    doc:["Go by Example: Structs", "https://gobyexample.com/structs", "gobyexample · 1 page, runnable"],
    more:["Go by Example: Methods", "https://gobyexample.com/methods", "gobyexample · the methods page"],
    video:["Go course — Maps and Structs", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=8240s", "freeCodeCamp · jumps to 2:17:20"],
    watch:"Uppercase field names are public, lowercase are private — no keywords needed.",
    do:"Define a struct User with a Greet() method."
  },

  { id:"2.2", title:"Interfaces", min:30,
    why:"This replaces inheritance. The most important idea in the whole course.",
    doc:["Go by Example: Interfaces", "https://gobyexample.com/interfaces", "gobyexample · 1 page, runnable"],
    more:["Effective Go — Interfaces", "https://go.dev/doc/effective_go#interfaces", "go.dev · how Go intends them to be used"],
    video:["Go course — Interfaces", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=17879s", "freeCodeCamp · jumps to 4:57:59"],
    watch:"You never write \"implements\". If your type has the methods, it satisfies the interface.",
    do:"Write a Shape interface with Area(), then a Circle and Rectangle that satisfy it."
  },

  { id:"2.3", title:"Packages & Modules", min:20,
    why:"How Go finds, versions and locks the code you depend on.",
    doc:["Managing dependencies", "https://go.dev/doc/modules/managing-dependencies", "go.dev · official, scoped to this"],
    video:["Golang Full Course — packages & modules", "https://www.youtube.com/watch?v=yyUHQIec83I", "TechWorld with Nana · 3h24m"],
    do:"go get one small package, look at go.mod and go.sum, then go mod tidy."
  },

  { id:"2.4", title:"Goroutines", min:25,
    why:"The `go` keyword — how Go runs many things at once, cheaply.",
    doc:["Go by Example: Goroutines", "https://gobyexample.com/goroutines", "gobyexample · 1 page, runnable"],
    video:["Go course — Goroutines", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=20037s", "freeCodeCamp · jumps to 5:33:57"],
    do:"Launch 5 goroutines that each print a number. Run twice — the order isn't fixed."
  },

  { id:"2.5", title:"WaitGroups", min:20,
    why:"How main waits for all its goroutines to finish before exiting.",
    doc:["Go by Example: WaitGroups", "https://gobyexample.com/waitgroups", "gobyexample · 1 page, runnable"],
    watch:"Call wg.Add(1) before go func(), never inside it, or Wait() can return too early.",
    do:"Launch 10 goroutines that each sleep briefly, and make main wait for all of them."
  },

  { id:"2.6", title:"Race Conditions & Mutex", min:30,
    why:"Two goroutines touching one variable at once causes bugs a normal test won't catch.",
    doc:["Go by Example: Mutexes", "https://gobyexample.com/mutexes", "gobyexample · 1 page, runnable"],
    more:["Data Race Detector", "https://go.dev/doc/articles/race_detector", "go.dev · official, how to run -race"],
    watch:"Run everything with go run -race at least once. It catches races a passing test hides.",
    do:"Increment a shared counter from 100 goroutines with no lock, run with -race, watch it fail. Then fix it with a sync.Mutex."
  }
]},

{
  n: 3, title: "Channels & Web Basics",
  blurb: "How goroutines talk to each other, and your first HTTP handler.",
  units: [

  { id:"3.1", title:"Channels", min:30,
    why:"How goroutines send data to each other safely, without a shared variable.",
    doc:["Go by Example: Channels", "https://gobyexample.com/channels", "gobyexample · 1 page, runnable"],
    more:["Go by Example: Closing Channels", "https://gobyexample.com/closing-channels", "gobyexample · closing and ranging"],
    video:["Go course — Channels", "https://www.youtube.com/watch?v=YS4e4q9oBaU&t=21910s", "freeCodeCamp · jumps to 6:05:10"],
    watch:"Sending on a closed channel panics. Only the sender should ever close a channel.",
    do:"Send 5 numbers over a channel to another goroutine, close it, then range over it."
  },

  { id:"3.2", title:"Select & Timeouts", min:25,
    why:"How you wait on several channels at once, and give up if one is too slow.",
    doc:["Go by Example: Select", "https://gobyexample.com/select", "gobyexample · 1 page, runnable"],
    more:["Go by Example: Timeouts", "https://gobyexample.com/timeouts", "gobyexample · the timeout pattern"],
    watch:"select with a default case never blocks — that's how you avoid hanging forever.",
    do:"Use select with time.After to give up on a slow channel after 1 second."
  },

  { id:"3.3", title:"Context", min:25,
    why:"How you tell a slow goroutine to stop, across function and network boundaries.",
    doc:["Go by Example: Context", "https://gobyexample.com/context", "gobyexample · 1 page, runnable"],
    watch:"Always write `defer cancel()` right after creating a context with a timeout.",
    do:"Wrap a 3-second sleep in a context with a 1-second timeout, print which one wins."
  },

  { id:"3.4", title:"JSON", min:20,
    why:"How Go structs turn into the JSON your API actually sends and receives.",
    doc:["Go by Example: JSON", "https://gobyexample.com/json", "gobyexample · 1 page, runnable"],
    watch:"Tag a field `json:\"-\"` to keep it out of the response — use this for passwords.",
    do:"Marshal a struct with a password field tagged json:\"-\" and confirm it's missing."
  },

  { id:"3.5", title:"Your First Web Server", min:30,
    why:"Serve an HTTP response with only the standard library, no framework.",
    doc:["Go by Example: HTTP Server", "https://gobyexample.com/http-server", "gobyexample · 1 page, runnable"],
    more:["Let's Go — free sample chapters", "https://www.alexedwards.net/blog", "Alex Edwards · the most recommended Go web resource"],
    video:["Golang Full Course — building a web app", "https://www.youtube.com/watch?v=yyUHQIec83I", "TechWorld with Nana · 3h24m"],
    do:"Build GET /health that returns {\"status\":\"ok\"} using only net/http."
  },

  { id:"3.6", title:"Routing & Path Variables", min:25,
    why:"How a URL like /users/42 gets the 42 into your handler — no router library needed.",
    doc:["Routing Enhancements for Go 1.22", "https://go.dev/blog/routing-enhancements", "go.dev blog · the current way, official"],
    watch:"Since Go 1.22 you write \"GET /users/{id}\" and read it with r.PathValue(\"id\"). Older tutorials tell you to install gorilla/mux — you don't need it.",
    do:"Add GET /users/{id} to your server and return the id from the URL."
  }
]},

{
  n: 4, title: "Testing & Shipping",
  blurb: "Prove your code works, then package it so anyone can run it.",
  units: [

  { id:"4.1", title:"Reading & Writing Files", min:20,
    why:"Files, HTTP bodies and network streams all read and write the same way in Go.",
    doc:["Go by Example: Reading Files", "https://gobyexample.com/reading-files", "gobyexample · 1 page, runnable"],
    do:"Read a text file, count its lines, print the count."
  },

  { id:"4.2", title:"Talking to a Database", min:30,
    why:"How a Go service reads and writes rows without an ORM.",
    doc:["Accessing relational databases", "https://go.dev/doc/database/", "go.dev · official tutorial hub"],
    more:["go-database-sql.org", "http://go-database-sql.org/", "the long-standing community guide"],
    watch:"Never build SQL with fmt.Sprintf — always use a ? placeholder.",
    do:"Connect to any local MySQL/SQLite and run one SELECT with a placeholder."
  },

  { id:"4.3", title:"Environment & Config", min:15,
    why:"Real services read settings from the environment, never hardcode them.",
    doc:["Go by Example: Environment Variables", "https://gobyexample.com/environment-variables", "gobyexample · 1 page, runnable"],
    do:"Read PORT from the environment, defaulting to 8080 when it's not set."
  },

  { id:"4.4", title:"Writing Your First Test", min:25,
    why:"How Go tests work — no separate framework, just the testing package.",
    doc:["Go by Example: Testing and Benchmarking", "https://gobyexample.com/testing-and-benchmarking", "gobyexample · 1 page, runnable"],
    more:["Learn Go with Tests — first chapter", "https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/hello-world", "quii · free book, most recommended"],
    do:"Write one test for your 1.7 function using go test."
  },

  { id:"4.5", title:"Table-Driven Tests", min:20,
    why:"The Go way to test many inputs without copy-pasting the same test four times.",
    doc:["Table-driven tests", "https://go.dev/wiki/TableDrivenTests", "go.dev wiki · the canonical pattern"],
    more:["Learn Go with Tests — iteration", "https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/iteration", "quii · worked through test-first"],
    do:"Rewrite your 4.4 test to check 4 different inputs in one table."
  },

  { id:"4.6", title:"Benchmarking", min:15,
    why:"Measure whether a change actually made your code faster, instead of guessing.",
    doc:["Go by Example: Testing and Benchmarking", "https://gobyexample.com/testing-and-benchmarking", "gobyexample · benchmark half of the page"],
    do:"Benchmark += versus strings.Builder for 100 iterations."
  },

  { id:"4.7", title:"Logging", min:15,
    why:"Structured logs you can search, instead of scattered Println calls.",
    doc:["Go by Example: Logging", "https://gobyexample.com/logging", "gobyexample · covers log/slog"],
    more:["Structured Logging with slog", "https://go.dev/blog/slog", "go.dev blog · official introduction"],
    do:"Replace one fmt.Println with slog.Info and a structured field."
  },

  { id:"4.8", title:"Packaging with Docker", min:30,
    why:"Ship your service as one small container image anyone can run.",
    doc:["Docker's Go language guide", "https://docs.docker.com/language/golang/", "docker.com · official, step-by-step"],
    do:"Write a 2-stage Dockerfile for your server, confirm the image is under 40 MB."
  },

  { id:"4.9", title:"Basic Security Habits", min:20,
    why:"The three mistakes that turn a first project into a real vulnerability.",
    doc:["OWASP Go Secure Coding Practices", "https://github.com/OWASP/Go-SCP", "OWASP · free, a chapter per topic"],
    watch:"Hash passwords with bcrypt, never plain. Always use a ? placeholder in SQL.",
    do:"Check your database query uses a placeholder, not string concatenation."
  },

  { id:"4.10", title:"Mini Project — ShortLink", min:240,
    why:"Put it all together: a REST endpoint, a test, a Dockerfile. Scored out of 10.",
    doc:["Project brief", "#capstone", "your trainer shares this"],
    do:"Build the URL shortener: POST /shorten, GET /r/{code} redirect, click counting, one test, a Dockerfile."
  }
]}
];

const SCOPE = [
  ["full","Core, teach fully","1.1–1.9, 2.1–2.2, 2.4–2.6, 3.1, 3.5","Freshers need these before writing real code."],
  ["partial","Teach, revisit later","1.10, 2.3, 3.2–3.4, 3.6, 4.1–4.3","Cover the idea; depth comes with practice."],
  ["demo","Show, don't drill","4.6, 4.8–4.9","A live demo is enough at this stage."],
  ["after","Take-home","4.10 Mini Project","Once the basics feel comfortable."]
];

const PLAN = [
  ["Week 1","Redo Day 1 units without notes.","All 10 units re-typed from scratch."],
  ["Week 2","Day 2 + 3: goroutines and one HTTP handler.","A server that responds on 2 routes."],
  ["Week 3","Build the mini project (4.10).","Working ShortLink with a test."],
  ["Week 4","Read one real Go file at work; ask a senior to walk through it.","A list of questions you asked."]
];

const INDEX = {
  "Read": [["Go by Example","https://gobyexample.com/"],["A Tour of Go","https://go.dev/tour/"],
    ["Effective Go","https://go.dev/doc/effective_go"],["Learn Go with Tests","https://quii.gitbook.io/learn-go-with-tests"],
    ["Practical Go Lessons","https://www.practical-go-lessons.com/"]],
  "Watch": [["freeCodeCamp Go course","https://www.youtube.com/watch?v=YS4e4q9oBaU"],
    ["TechWorld with Nana Go course","https://www.youtube.com/watch?v=yyUHQIec83I"],
    ["Hitesh Choudhary — start here (Hindi)","https://www.youtube.com/watch?v=X4q1OM0voO0"],
    ["Go in 100 Seconds","https://www.youtube.com/watch?v=446E-r0rXHI"]],
  "Practice": [["Go Playground","https://go.dev/play/"],["Exercism Go track","https://exercism.org/tracks/go"],
    ["Gophercises","https://gophercises.com/"],["100 Go Mistakes","https://100go.co/"]]
};
