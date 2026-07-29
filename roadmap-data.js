/* ==========================================================================
   Get Set GO — final
   ==========================================================================
   THREE KINDS OF LINK PER UNIT, each doing a different job:

     doc     → Go by Example. Syntax and runnable code. One short page.
     concept → A recent article that explains the IDEA, for the units where
               the idea is genuinely hard. Only on those units — the easy
               ones don't need it and adding it would just be noise.
     video   → One exact short video. Never a playlist, never a channel.

   FRESHNESS RULE APPLIED: every `concept` article is dated 2024 or later,
   and the date is shown in the source label so it can be re-checked. Every
   video is 2024 or later unless noted.

   REMOVED IN THIS PASS:
     - a 2020 dev.to errors article that taught github.com/pkg/errors
       (superseded by stdlib %w / errors.Is / errors.As in Go 1.13)
     - most freeCodeCamp timestamp cuts, replaced with short focused videos
       where a good one exists. Where one genuinely doesn't, the unit has no
       video rather than a padded one.

   VERIFIED VIDEO IDS
     446E-r0rXHI  Fireship · Go in 100 Seconds
     X4q1OM0voO0  Hitesh Choudhary · get started with golang (Hindi)
     5EyxhMhvHTo  Goroutines and Channels: Go Concurrency Made Easy (Mar 2025)
     3QESpVGiiB8  Advanced Golang: Goroutines & Channels (Feb 2024)
     _zKkEp6edYI  Understanding Go Context — Everything You Need (Jun 2024)
     BkzgYfygDy8  Golang Context Package: It's More Than You Think (Oct 2024)
     YS4e4q9oBaU  freeCodeCamp full course — used only as a fallback
   ========================================================================== */

const ANCHORS = [
  ["Go by Example", "https://gobyexample.com/", "One short page of runnable code per topic. Your daily reference."],
  ["A Tour of Go", "https://go.dev/tour/", "Official, interactive, runs in the browser. Do this first."],
  ["Go Playground", "https://go.dev/play/", "Paste code, hit Run, share the link."],
  ["Learn Go with Tests", "https://quii.gitbook.io/learn-go-with-tests", "Free book. The most recommended free Go resource there is."],
  ["Effective Go", "https://go.dev/doc/effective_go", "How Go is meant to be written. Skim now, re-read in a month."],
  ["100 Go Mistakes", "https://100go.co/", "The traps you're about to fall into, each explained briefly."]
];

const DAYS = [
{
  n: 1, title: "Language Foundations",
  blurb: "Syntax, plus the two ideas (slices, pointers) that cause the most bugs later.",
  units: [

  { id:"1.1", title:"Why Go?", min:10,
    why:"Go trades flexibility for speed and simplicity. Worth knowing the trade before you start.",
    doc:["Go FAQ — why Go looks like this", "https://go.dev/doc/faq", "go.dev · official"],
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
    do:"Split Hello World into two files: package main, and a package greet it imports."
  },

  { id:"1.4", title:"Strings & Runes", min:25,
    why:"Go strings are UTF-8 bytes, not characters — this trips up everyone once.",
    doc:["Go by Example: Strings and Runes", "https://gobyexample.com/strings-and-runes", "gobyexample · runnable"],
    concept:["Strings, bytes, runes and characters", "https://go.dev/blog/strings", "go.dev · the definitive explanation"],
    watch:"len(\"नमस्ते\") is 18, not 6 — that's bytes, not letters.",
    do:"Print len() of an English word and a Hindi word side by side."
  },

  { id:"1.5", title:"Variables & Constants", min:15,
    why:"var vs := vs const — three ways to name a value, three different rules.",
    doc:["Go by Example: Variables", "https://gobyexample.com/variables", "gobyexample · runnable"],
    do:"Declare the same value three ways (var, :=, const) and note where each is legal."
  },

  { id:"1.6", title:"Errors", min:30,
    why:"Go has no exceptions. An error is just a value you check — get this habit right early.",
    doc:["Go by Example: Errors", "https://gobyexample.com/errors", "gobyexample · runnable"],
    concept:["Error Wrapping with Go's Standard Library", "https://medium.com/@AlexanderObregon/error-wrapping-with-gos-standard-library-0a345eeea019", "Medium · Nov 2025 · %w, errors.Is, errors.As"],
    watch:"Wrap with fmt.Errorf(\"...: %w\", err), compare with errors.Is. Any tutorial telling you to install github.com/pkg/errors is out of date — the standard library has done this since Go 1.13.",
    do:"Write a function returning (int, error). Wrap the error with %w, then check it with errors.Is."
  },

  { id:"1.7", title:"Functions & Closures", min:20,
    why:"Multiple return values and closures — two things most languages don't have built in.",
    doc:["Go by Example: Functions", "https://gobyexample.com/functions", "gobyexample · runnable"],
    do:"Write a function that returns two values, and one closure that remembers a count."
  },

  { id:"1.8", title:"Pointers", min:25,
    why:"Go passes everything by value — a pointer just points at where the original lives.",
    doc:["Go by Example: Pointers", "https://gobyexample.com/pointers", "gobyexample · runnable"],
    watch:"Passing a struct copies it. Passing *Struct lets a function change the caller's original.",
    do:"Write a function that doubles an int through a pointer parameter, and one that fails to."
  },

  { id:"1.9", title:"Arrays, Slices & Maps", min:35,
    why:"The most-used data structures in Go, and the single biggest source of beginner bugs.",
    doc:["Go by Example: Slices", "https://gobyexample.com/slices", "gobyexample · runnable"],
    concept:["Go Slices: usage and internals", "https://go.dev/blog/slices-intro", "go.dev · why aliasing happens, with diagrams"],
    watch:"A slice shares memory with its parent. b := a[1:3]; b[0]=99 also changes a.",
    do:"Predict, then run: a := []int{1,2,3,4}; b := a[1:3]; b[0]=99; print a."
  },

  { id:"1.10", title:"Generics", min:20,
    why:"Write one function that works for int, string, or any type — without repeating yourself.",
    doc:["Go by Example: Generics", "https://gobyexample.com/generics", "gobyexample · runnable"],
    concept:["Tutorial: Getting started with generics", "https://go.dev/doc/tutorial/generics", "go.dev · official walkthrough"],
    do:"Write a generic Max[T int|float64](a, b T) T function."
  }
]},

{
  n: 2, title: "Structs, Interfaces & Concurrency",
  blurb: "How Go does OOP without classes, and your first goroutine. Unit 2.2 is the big one.",
  units: [

  { id:"2.1", title:"Structs & Methods", min:30,
    why:"Structs group data. Methods are functions attached to them. Together they replace classes.",
    doc:["Go by Example: Structs", "https://gobyexample.com/structs", "gobyexample · runnable"],
    watch:"Uppercase field names are public, lowercase are private — no keywords needed.",
    do:"Define a struct User with a Greet() method."
  },

  { id:"2.2", title:"Interfaces", min:35,
    why:"This replaces inheritance. The most important idea in the whole course.",
    doc:["Go by Example: Interfaces", "https://gobyexample.com/interfaces", "gobyexample · runnable"],
    concept:["Effective Go — Interfaces & embedding", "https://go.dev/doc/effective_go#interfaces", "go.dev · how Go intends them to be used"],
    watch:"You never write \"implements\". If your type has the methods, it satisfies the interface. That's the whole mechanism.",
    do:"Write a Shape interface with Area(), then a Circle and Rectangle that satisfy it."
  },

  { id:"2.3", title:"Packages & Modules", min:20,
    why:"How Go finds, versions and locks the code you depend on.",
    doc:["Managing dependencies", "https://go.dev/doc/modules/managing-dependencies", "go.dev · official"],
    do:"go get one small package, look at go.mod and go.sum, then go mod tidy."
  },

  { id:"2.4", title:"Goroutines", min:30,
    why:"The `go` keyword — how Go runs thousands of things at once, cheaply.",
    doc:["Go by Example: Goroutines", "https://gobyexample.com/goroutines", "gobyexample · runnable"],
    concept:["Go Concurrency: Goroutines, Channels & Clean Patterns", "https://dev.to/aleksei_aleinikov/go-concurrency-2025-goroutines-channels-clean-patterns-3d2c", "dev.to · 2025 · patterns and habits"],
    video:["Goroutines and Channels: Go Concurrency Made Easy", "https://www.youtube.com/watch?v=5EyxhMhvHTo", "Mar 2025 · short and focused"],
    do:"Launch 5 goroutines that each print a number. Run twice — the order isn't fixed."
  },

  { id:"2.5", title:"WaitGroups", min:20,
    why:"How main waits for all its goroutines to finish before exiting.",
    doc:["Go by Example: WaitGroups", "https://gobyexample.com/waitgroups", "gobyexample · runnable"],
    video:["Advanced Golang: Goroutines, Channels & WaitGroups", "https://www.youtube.com/watch?v=3QESpVGiiB8", "Feb 2024 · real-world example"],
    watch:"Call wg.Add(1) before go func(), never inside it, or Wait() can return too early.",
    do:"Launch 10 goroutines that each sleep briefly, and make main wait for all of them."
  },

  { id:"2.6", title:"Race Conditions & Mutex", min:30,
    why:"Two goroutines touching one variable at once causes bugs a normal test won't catch.",
    doc:["Go by Example: Mutexes", "https://gobyexample.com/mutexes", "gobyexample · runnable"],
    concept:["Data Race Detector", "https://go.dev/doc/articles/race_detector", "go.dev · official, how to run -race"],
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
    doc:["Go by Example: Channels", "https://gobyexample.com/channels", "gobyexample · runnable"],
    concept:["Go Concurrency Guide: inside goroutines and channels", "https://levelup.gitconnected.com/go-concurrency-guide-2025-inside-goroutines-and-channels-3795fdb916e9", "Level Up Coding · 2025 · buffered vs unbuffered"],
    video:["Goroutines and Channels: Go Concurrency Made Easy", "https://www.youtube.com/watch?v=5EyxhMhvHTo", "Mar 2025 · short and focused"],
    watch:"Sending on a closed channel panics. Only the sender should ever close a channel.",
    do:"Send 5 numbers over a channel to another goroutine, close it, then range over it."
  },

  { id:"3.2", title:"Select & Timeouts", min:25,
    why:"How you wait on several channels at once, and give up if one is too slow.",
    doc:["Go by Example: Select", "https://gobyexample.com/select", "gobyexample · runnable"],
    watch:"select with a default case never blocks — that's how you avoid hanging forever.",
    do:"Use select with time.After to give up on a slow channel after 1 second."
  },

  { id:"3.3", title:"Context", min:30,
    why:"How you tell a slow goroutine to stop — across functions, goroutines and network calls.",
    doc:["Go by Example: Context", "https://gobyexample.com/context", "gobyexample · runnable"],
    concept:["Understanding Go's Context: A Beginner-Friendly Guide", "https://medium.com/@siddharthnarayan/understanding-gos-context-a-beginner-friendly-guide-1c72de4ad671", "Medium · Jan 2025 · coffee-shop analogy"],
    video:["Understanding Go Context — Everything You Need to Know", "https://www.youtube.com/watch?v=_zKkEp6edYI", "Jun 2024 · cancellation and values"],
    watch:"Always write `defer cancel()` right after creating a context with a timeout.",
    do:"Wrap a 3-second sleep in a context with a 1-second timeout, print which one wins."
  },

  { id:"3.4", title:"JSON", min:20,
    why:"How Go structs turn into the JSON your API actually sends and receives.",
    doc:["Go by Example: JSON", "https://gobyexample.com/json", "gobyexample · runnable"],
    watch:"Tag a field `json:\"-\"` to keep it out of the response — use this for passwords.",
    do:"Marshal a struct with a password field tagged json:\"-\" and confirm it's missing."
  },

  { id:"3.5", title:"Your First Web Server", min:30,
    why:"Serve an HTTP response with only the standard library, no framework.",
    doc:["Go by Example: HTTP Server", "https://gobyexample.com/http-server", "gobyexample · runnable"],
    concept:["Go's http.ServeMux Is All You Need", "https://dev.to/encore/gos-httpservemux-is-all-you-need-6mb", "dev.to · why you can skip the frameworks"],
    do:"Build GET /health that returns {\"status\":\"ok\"} using only net/http."
  },

  { id:"3.6", title:"Routing & Path Variables", min:25,
    why:"How a URL like /users/42 gets the 42 into your handler — no router library needed.",
    doc:["Routing Enhancements for Go 1.22", "https://go.dev/blog/routing-enhancements", "go.dev · the current way, official"],
    watch:"Since Go 1.22 you write \"GET /users/{id}\" and read it with r.PathValue(\"id\"). Older tutorials tell you to install gorilla/mux — you don't need it any more.",
    do:"Add GET /users/{id} to your server and return the id from the URL."
  }
]},

{
  n: 4, title: "Testing & Shipping",
  blurb: "Prove your code works, then package it so anyone can run it.",
  units: [

  { id:"4.1", title:"Reading & Writing Files", min:20,
    why:"Files, HTTP bodies and network streams all read and write the same way in Go.",
    doc:["Go by Example: Reading Files", "https://gobyexample.com/reading-files", "gobyexample · runnable"],
    do:"Read a text file, count its lines, print the count."
  },

  { id:"4.2", title:"Talking to a Database", min:30,
    why:"How a Go service reads and writes rows without an ORM.",
    doc:["Accessing relational databases", "https://go.dev/doc/database/", "go.dev · official tutorial"],
    watch:"Never build SQL with fmt.Sprintf — always use a ? placeholder, or you've written a SQL injection bug.",
    do:"Connect to any local MySQL/SQLite and run one SELECT with a placeholder."
  },

  { id:"4.3", title:"Environment & Config", min:15,
    why:"Real services read settings from the environment, never hardcode them.",
    doc:["Go by Example: Environment Variables", "https://gobyexample.com/environment-variables", "gobyexample · runnable"],
    do:"Read PORT from the environment, defaulting to 8080 when it's not set."
  },

  { id:"4.4", title:"Writing Your First Test", min:25,
    why:"How Go tests work — no separate framework, just the testing package.",
    doc:["Go by Example: Testing and Benchmarking", "https://gobyexample.com/testing-and-benchmarking", "gobyexample · runnable"],
    concept:["Learn Go with Tests — Hello, World", "https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/hello-world", "quii · free book, actively maintained"],
    do:"Write one test for your 1.7 function using go test."
  },

  { id:"4.5", title:"Table-Driven Tests", min:20,
    why:"The Go way to test many inputs without copy-pasting the same test four times.",
    doc:["Table-driven tests", "https://go.dev/wiki/TableDrivenTests", "go.dev wiki · the canonical pattern"],
    do:"Rewrite your 4.4 test to check 4 different inputs in one table."
  },

  { id:"4.6", title:"Benchmarking", min:15,
    why:"Measure whether a change actually made your code faster, instead of guessing.",
    doc:["Go by Example: Testing and Benchmarking", "https://gobyexample.com/testing-and-benchmarking", "gobyexample · benchmark half"],
    do:"Benchmark += versus strings.Builder for 100 iterations."
  },

  { id:"4.7", title:"Logging", min:15,
    why:"Structured logs you can search, instead of scattered Println calls.",
    doc:["Go by Example: Logging", "https://gobyexample.com/logging", "gobyexample · covers log/slog"],
    concept:["Structured Logging with slog", "https://go.dev/blog/slog", "go.dev · official introduction"],
    do:"Replace one fmt.Println with slog.Info and a structured field."
  },

  { id:"4.8", title:"Packaging with Docker", min:30,
    why:"Ship your service as one small container image anyone can run.",
    doc:["Docker's Go language guide", "https://docs.docker.com/language/golang/", "docker.com · official"],
    do:"Write a 2-stage Dockerfile for your server, confirm the image is under 40 MB."
  },

  { id:"4.9", title:"Basic Security Habits", min:20,
    why:"The three mistakes that turn a first project into a real vulnerability.",
    doc:["OWASP Go Secure Coding Practices", "https://github.com/OWASP/Go-SCP", "OWASP · free, chapter per topic"],
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
    ["100 Go Mistakes","https://100go.co/"]],
  "Watch": [["Go in 100 Seconds","https://www.youtube.com/watch?v=446E-r0rXHI"],
    ["Goroutines & Channels made easy","https://www.youtube.com/watch?v=5EyxhMhvHTo"],
    ["Understanding Go Context","https://www.youtube.com/watch?v=_zKkEp6edYI"],
    ["Hitesh Choudhary — start here (Hindi)","https://www.youtube.com/watch?v=X4q1OM0voO0"]],
  "Practice": [["Go Playground","https://go.dev/play/"],["Exercism Go track","https://exercism.org/tracks/go"],
    ["Gophercises","https://gophercises.com/"]]
};
