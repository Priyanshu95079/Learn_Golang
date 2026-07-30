/* ==========================================================================
   Get Set GO — v2 (updated Jul 2026)
   ==========================================================================
   THREE KINDS OF LINK PER UNIT:

     doc     → Go by Example / official docs. Syntax and runnable code.
     concept → A recent article (Medium, dev.to, JetBrains, Better Stack,
               Earthly…) that explains the WHY. All 2022 or later.
     video   → One short, focused YouTube video. Never a playlist.

   FRESHNESS RULE: every concept article 2022 or later.
   Every video 2022 or later unless noted.

   VERIFIED VIDEO IDS
     446E-r0rXHI  Fireship · Go in 100 Seconds
     X4q1OM0voO0  Hitesh Choudhary · get started with golang (Hindi)
     fTKsaPiThwM  Anthony GG · Golang generics in 6 minutes (Jul 2022)
     5EyxhMhvHTo  Goroutines & Channels: Go Concurrency Made Easy (Mar 2025)
     ZWekqs2CIpI  Golang WaitGroups — beginner to pro (Sep 2024)
     3QESpVGiiB8  Advanced Golang: Goroutines, Channels & Mutex (Feb 2024)
     fXzzF5y6UEU  Melkey · Golang Context Explained — Timeout (Sep 2023)
     2XEQsJLsLN0  Golang pointers explained, once and for all (Jun 2024)
     4OVJ-ir9hL8  Practical Explanation of Golang INTERFACES (Mar 2024)
     c8H0w4yBL10  This is your last video about Golang Structs (May 2024)
     cmlKLz5S6G4  Understanding Channels in Go with Code Examples (Aug 2024)
     74R05iKjW5o  Golang Error Handling and Custom Errors 2024 (Aug 2024)
     fVbI_3v0Zys  Strings, Bytes and Runes in Go — intermediate (Dec 2022)
     AdSJBBYK5ZA  Golang Closures Explained (2024)
     -RGBJqidEJs  Arrays, Maps & Slices in Go (Mar 2023)
     EdV1rx5613g  Go modules and packages explained (Dec 2024)
     1c7ttSJDMAI  Select Statement in Go — complete guide
     ENVAdZOZVrY  Go JSON Encoding and Decoding Tutorial
     3tpGH3dsvAQ  Build a web server with Go — no framework (Apr 2024)
     tcJYTk7bU7U  Go 1.22 ServeMux — Path Variables (2024)
     ybtx1UkCwik  Reading And Writing Files in Go
     Y7a0sNKdoQk  SQL Databases in Golang with database/sql (Sep 2023)
     z1gyPrMc-yI  Environment Variables in Your Golang Application (Aug 2023)
     w-nZp39_UPk  Writing Tests in Go — testing package basics (Jul 2022)
     i5YcZEvIrFA  Table Driven Tests in Golang (Oct 2022)
     f8Zy4o1wELI  How to benchmark in your Go tests
     ptoKy-COIlE  Go Structured Logging with slog Package (Dec 2023)
     2QMoLyfIJx8  Dockerfile for Golang — multi-stage build 2024 (Jan 2024)
     RFqLm8HLjQU  Password Hashing in Golang Using bcrypt
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
    concept:["Why Should Developers Learn Go in 2024?", "https://medium.com/the-code-compass/why-should-developers-learn-go-in-2024-0558b8e7b3db", "Medium · The Code Compass · 2024 · trade-offs vs Python/Java"],
    video:["Go in 100 Seconds", "https://www.youtube.com/watch?v=446E-r0rXHI", "Fireship · 2 min"],
    do:"Cross-compile Hello World: GOOS=windows go build. No JVM or interpreter needed."
  },

  { id:"1.2", title:"Setting Up Go", min:20,
    why:"Install the toolchain and get your first program running.",
    doc:["Tutorial: Get started with Go", "https://go.dev/doc/tutorial/getting-started", "go.dev · official, hands-on"],
    concept:["Go from the beginning — your first program", "https://dev.to/itnext/go-from-the-beginning-your-first-program-52n5", "dev.to · ITNEXT · 2022 · step-by-step with explanations"],
    video:["How to get started with golang", "https://www.youtube.com/watch?v=X4q1OM0voO0", "Hitesh Choudhary · 11 min · Hindi"],
    do:"go mod init a folder, write Hello World, run it with go run ."
  },

  { id:"1.3", title:"Hello World & Go Tools", min:20,
    why:"Packages, imports, and the four commands you'll type every day.",
    doc:["Go by Example: Hello World", "https://gobyexample.com/hello-world", "gobyexample · 1 page"],
    concept:["Go CLI Tools: go fmt, go vet, go build and go run", "https://earthly.dev/blog/go-fmt/", "Earthly · 2023 · practical guide with examples"],
    do:"Split Hello World into two files: package main, and a package greet it imports."
  },

  { id:"1.4", title:"Strings & Runes", min:25,
    why:"Go strings are UTF-8 bytes, not characters — this trips up everyone once.",
    doc:["Go by Example: Strings and Runes", "https://gobyexample.com/strings-and-runes", "gobyexample · runnable"],
    concept:["Rune vs Byte in Go String Operations", "https://medium.com/@AlexanderObregon/rune-vs-byte-in-go-string-operations-780c0f2dd92c", "Medium · Alexander Obregon · 2023 · with ASCII/Unicode diagrams"],
    video:["Strings, Bytes and Runes in Go", "https://www.youtube.com/watch?v=fVbI_3v0Zys", "YouTube · 10 min · Dec 2022 · intermediate level"],
    watch:"len(\"नमस्ते\") is 18, not 6 — that's bytes, not letters.",
    do:"Print len() of an English word and a Hindi word side by side."
  },

  { id:"1.5", title:"Variables & Constants", min:15,
    why:"var vs := vs const — three ways to name a value, three different rules.",
    doc:["Go by Example: Variables", "https://gobyexample.com/variables", "gobyexample · runnable"],
    concept:["Variables, Constants, and Types in Go — The Right Way", "https://medium.com/@akashkamati/variables-constants-and-types-in-go-the-right-way-d399b7dea481", "Medium · 2025 · iota, typed vs untyped constants"],
    do:"Declare the same value three ways (var, :=, const) and note where each is legal."
  },

  { id:"1.6", title:"Errors", min:30,
    why:"Go has no exceptions. An error is just a value you check — get this habit right early.",
    doc:["Go by Example: Errors", "https://gobyexample.com/errors", "gobyexample · runnable"],
    concept:["Effective Error Handling in Golang", "https://earthly.dev/blog/golang-errors/", "Earthly · Brandon Schurman · 2023 · errors.Is, errors.As, %w wrapping"],
    video:["Golang Error Handling and Custom Errors", "https://www.youtube.com/watch?v=74R05iKjW5o", "YouTube · 12 min · Aug 2024"],
    watch:"Wrap with fmt.Errorf(\"...: %w\", err), unwrap with errors.Is. Any tutorial telling you to install github.com/pkg/errors is out of date — the standard library has done this since Go 1.13.",
    do:"Write a function returning (int, error). Wrap the error with %w, then check it with errors.Is."
  },

  { id:"1.7", title:"Functions & Closures", min:20,
    why:"Multiple return values and closures — two things most languages don't have built in.",
    doc:["Go by Example: Functions", "https://gobyexample.com/functions", "gobyexample · runnable"],
    concept:["Understanding Closures in Go: A Beginner's Guide", "https://medium.com/@sanhdoan/understanding-closures-in-go-a-beginners-guide-2795f6dae640", "Medium · 2025 · practical closure patterns"],
    video:["Golang Closures Explained", "https://www.youtube.com/watch?v=AdSJBBYK5ZA", "YouTube · 8 min · 2024"],
    do:"Write a function that returns two values, and one closure that remembers a count."
  },

  { id:"1.8", title:"Pointers", min:25,
    why:"Go passes everything by value — a pointer just points at where the original lives.",
    doc:["Go by Example: Pointers", "https://gobyexample.com/pointers", "gobyexample · runnable"],
    concept:["Pass by Value and Pass by Reference in Go", "https://betterprogramming.pub/pass-by-value-and-reference-in-go-94423b6accf1", "Better Programming · 2022 · with memory diagrams"],
    video:["Golang pointers explained, once and for all", "https://www.youtube.com/watch?v=2XEQsJLsLN0", "YouTube · 7 min · Jun 2024"],
    watch:"Passing a struct copies it. Passing *Struct lets a function change the caller's original.",
    do:"Write a function that doubles an int through a pointer parameter, and one that fails to."
  },

  { id:"1.9", title:"Arrays, Slices & Maps", min:35,
    why:"The most-used data structures in Go, and the single biggest source of beginner bugs.",
    doc:["Go by Example: Slices", "https://gobyexample.com/slices", "gobyexample · runnable"],
    concept:["Demystifying Golang Slices", "https://medium.com/@andreiboar/demystifying-golang-slices-83ffe3550db5", "Medium · Andrei Boar · May 2024 · backing arrays, aliasing, the copy fix"],
    video:["Arrays, Maps & Slices in Go — full walkthrough", "https://www.youtube.com/watch?v=-RGBJqidEJs", "YouTube · 12 min · Mar 2023"],
    watch:"A slice shares memory with its parent. b := a[1:3]; b[0]=99 also changes a.",
    do:"Predict, then run: a := []int{1,2,3,4}; b := a[1:3]; b[0]=99; print a."
  },

  { id:"1.10", title:"Generics", min:20,
    why:"Write one function that works for int, string, or any type — without repeating yourself.",
    doc:["Go by Example: Generics", "https://gobyexample.com/generics", "gobyexample · runnable"],
    concept:["Mastering Generics in Go: A Comprehensive Guide", "https://medium.com/hprog99/mastering-generics-in-go-a-comprehensive-guide-4d05ec4b12b", "Medium · Apr 2023 · type constraints, union types, any vs comparable"],
    video:["Golang generics in 6 minutes", "https://www.youtube.com/watch?v=fTKsaPiThwM", "Anthony GG · 6 min · Jul 2022"],
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
    concept:["Structs, Methods, and Receivers in Go", "https://dev.to/jpoly1219/structs-methods-and-receivers-in-go-5g4f", "dev.to · Jacob Kim · Jan 2023 · value vs pointer receivers explained"],
    video:["This is your last video about Golang Structs!", "https://www.youtube.com/watch?v=c8H0w4yBL10", "YouTube · 14 min · May 2024"],
    watch:"Uppercase field names are public, lowercase are private — no keywords needed.",
    do:"Define a struct User with a Greet() method."
  },

  { id:"2.2", title:"Interfaces", min:35,
    why:"This replaces inheritance. The most important idea in the whole course.",
    doc:["Go by Example: Interfaces", "https://gobyexample.com/interfaces", "gobyexample · runnable"],
    concept:["Explaining Go Interfaces — What They Are and Why They Matter", "https://www.bytesizego.com/blog/explaining-go-interfaces", "ByteSizeGo · 2024 · real-world examples, duck typing vs explicit"],
    video:["Practical Explanation of Golang INTERFACES", "https://www.youtube.com/watch?v=4OVJ-ir9hL8", "YouTube · 10 min · Mar 2024"],
    watch:"You never write \"implements\". If your type has the methods, it satisfies the interface. That's the whole mechanism.",
    do:"Write a Shape interface with Area(), then a Circle and Rectangle that satisfy it."
  },

  { id:"2.3", title:"Packages & Modules", min:20,
    why:"How Go finds, versions and locks the code you depend on.",
    doc:["Managing dependencies", "https://go.dev/doc/modules/managing-dependencies", "go.dev · official"],
    concept:["A Complete Guide to Go Packages, Modules, and Project Setup", "https://medium.com/@emusbeny/go-beyond-basics-a-complete-guide-to-go-packages-modules-and-project-setup-9ae082fbf3cd", "Medium · Nov 2024 · go.mod, go.sum, versioning, tidy"],
    video:["Go modules and packages explained", "https://www.youtube.com/watch?v=EdV1rx5613g", "YouTube · 10 min · Dec 2024"],
    do:"go get one small package, look at go.mod and go.sum, then go mod tidy."
  },

  { id:"2.4", title:"Goroutines", min:30,
    why:"The `go` keyword — how Go runs thousands of things at once, cheaply.",
    doc:["Go by Example: Goroutines", "https://gobyexample.com/goroutines", "gobyexample · runnable"],
    concept:["Go Concurrency: Goroutines, Channels & Clean Patterns", "https://dev.to/aleksei_aleinikov/go-concurrency-2025-goroutines-channels-clean-patterns-3d2c", "dev.to · 2025 · goroutine lifecycle, leaks, clean patterns"],
    video:["Goroutines and Channels: Go Concurrency Made Easy", "https://www.youtube.com/watch?v=5EyxhMhvHTo", "YouTube · Mar 2025 · short and focused"],
    do:"Launch 5 goroutines that each print a number. Run twice — the order isn't fixed."
  },

  { id:"2.5", title:"WaitGroups", min:20,
    why:"How main waits for all its goroutines to finish before exiting.",
    doc:["Go by Example: WaitGroups", "https://gobyexample.com/waitgroups", "gobyexample · runnable"],
    concept:["WaitGroups in Go — sync.WaitGroup explained", "https://dev.to/jpoly1219/waitgroups-in-go-3dkj", "dev.to · Jacob Kim · Aug 2022 · common pitfalls with Add/Done/Wait"],
    video:["Golang WaitGroups — from beginner to pro", "https://www.youtube.com/watch?v=ZWekqs2CIpI", "YouTube · 10 min · Sep 2024"],
    watch:"Call wg.Add(1) before go func(), never inside it, or Wait() can return too early.",
    do:"Launch 10 goroutines that each sleep briefly, and make main wait for all of them."
  },

  { id:"2.6", title:"Race Conditions & Mutex", min:30,
    why:"Two goroutines touching one variable at once causes bugs a normal test won't catch.",
    doc:["Go by Example: Mutexes", "https://gobyexample.com/mutexes", "gobyexample · runnable"],
    concept:["Data Race Detector", "https://go.dev/doc/articles/race_detector", "go.dev · official · how to run -race and read its output"],
    video:["Advanced Golang: Goroutines, Channels & Mutex in practice", "https://www.youtube.com/watch?v=3QESpVGiiB8", "YouTube · 15 min · Feb 2024 · real-world race example + mutex fix"],
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
    concept:["Advanced Insights into Go Channels: Buffered and Unbuffered", "https://medium.com/@aditimishra_541/advanced-insights-into-go-channels-unbuffered-and-buffered-channels-d76d705bcc24", "Medium · Aditi Mishra · Dec 2024 · blocking behaviour with diagrams"],
    video:["Understanding Channels in Go with Code Examples", "https://www.youtube.com/watch?v=cmlKLz5S6G4", "YouTube · 10 min · Aug 2024"],
    watch:"Sending on a closed channel panics. Only the sender should ever close a channel.",
    do:"Send 5 numbers over a channel to another goroutine, close it, then range over it."
  },

  { id:"3.2", title:"Select & Timeouts", min:25,
    why:"How you wait on several channels at once, and give up if one is too slow.",
    doc:["Go by Example: Select", "https://gobyexample.com/select", "gobyexample · runnable"],
    concept:["A Deep Dive into Go's select Statement", "https://leapcell.medium.com/a-deep-dive-into-gos-select-2f6b8aaaf7cc", "Medium · Leapcell · 2025 · all branching cases, default, nil channels"],
    video:["Select Statement in Go — complete guide", "https://www.youtube.com/watch?v=1c7ttSJDMAI", "YouTube · 8 min · Go tutorial series"],
    watch:"select with a default case never blocks — that's how you avoid hanging forever.",
    do:"Use select with time.After to give up on a slow channel after 1 second."
  },

  { id:"3.3", title:"Context", min:30,
    why:"How you tell a slow goroutine to stop — across functions, goroutines and network calls.",
    doc:["Go by Example: Context", "https://gobyexample.com/context", "gobyexample · runnable"],
    concept:["Context for Cancellation and Timeouts in Go", "https://gautam007.medium.com/context-for-cancellation-and-timeouts-in-go-49077c25df5f", "Medium · Jul 2024 · WithCancel, WithTimeout, WithDeadline patterns"],
    video:["Golang Context Explained — How To Use With Timeout", "https://www.youtube.com/watch?v=fXzzF5y6UEU", "Melkey · 12 min · Sep 2023"],
    watch:"Always write `defer cancel()` right after creating a context with a timeout.",
    do:"Wrap a 3-second sleep in a context with a 1-second timeout, print which one wins."
  },

  { id:"3.4", title:"JSON", min:20,
    why:"How Go structs turn into the JSON your API actually sends and receives.",
    doc:["Go by Example: JSON", "https://gobyexample.com/json", "gobyexample · runnable"],
    concept:["A Comprehensive Guide to Using JSON in Go", "https://betterstack.com/community/guides/scaling-go/json-in-go/", "Better Stack · 2024 · marshal, unmarshal, custom MarshalJSON, omitempty"],
    video:["Go JSON Encoding and Decoding Tutorial", "https://www.youtube.com/watch?v=ENVAdZOZVrY", "YouTube · 10 min · focused JSON tutorial"],
    watch:"Tag a field `json:\"-\"` to keep it out of the response — use this for passwords.",
    do:"Marshal a struct with a password field tagged json:\"-\" and confirm it's missing."
  },

  { id:"3.5", title:"Your First Web Server", min:30,
    why:"Serve an HTTP response with only the standard library, no framework.",
    doc:["Go by Example: HTTP Server", "https://gobyexample.com/http-server", "gobyexample · runnable"],
    concept:["Go's http.ServeMux Is All You Need", "https://dev.to/encore/gos-httpservemux-is-all-you-need-6mb", "dev.to · Encore · why you can skip the frameworks"],
    video:["Build a web server with Go — no framework needed", "https://www.youtube.com/watch?v=3tpGH3dsvAQ", "YouTube · 12 min · Apr 2024"],
    do:"Build GET /health that returns {\"status\":\"ok\"} using only net/http."
  },

  { id:"3.6", title:"Routing & Path Variables", min:25,
    why:"How a URL like /users/42 gets the 42 into your handler — no router library needed.",
    doc:["Routing Enhancements for Go 1.22", "https://go.dev/blog/routing-enhancements", "go.dev · the current way, official"],
    video:["Go 1.22 ServeMux — Path Variables in practice", "https://www.youtube.com/watch?v=tcJYTk7bU7U", "YouTube · 10 min · 2024"],
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
    concept:["Efficient File Reading in Go: Examples and Benchmark Comparisons", "https://medium.com/@smart_byte_labs/efficient-file-reading-in-go-examples-and-benchmark-comparisons-2335b097431a", "Medium · SmartByteLabs · Oct 2024 · os vs bufio, when to buffer"],
    video:["Reading And Writing Files in Go", "https://www.youtube.com/watch?v=ybtx1UkCwik", "YouTube · 10 min · os and bufio walkthrough"],
    do:"Read a text file, count its lines, print the count."
  },

  { id:"4.2", title:"Talking to a Database", min:30,
    why:"How a Go service reads and writes rows without an ORM.",
    doc:["Accessing relational databases", "https://go.dev/doc/database/", "go.dev · official tutorial"],
    concept:["Getting Started with the database/sql Package", "https://blog.jetbrains.com/go/2023/02/28/getting-started-with-the-database-sql-package/", "JetBrains GoLand Blog · Feb 2023 · query, scan, placeholder syntax"],
    video:["SQL Databases in Golang with database/sql", "https://www.youtube.com/watch?v=Y7a0sNKdoQk", "YouTube · 12 min · Sep 2023"],
    watch:"Never build SQL with fmt.Sprintf — always use a ? placeholder, or you've written a SQL injection bug.",
    do:"Connect to any local MySQL/SQLite and run one SELECT with a placeholder."
  },

  { id:"4.3", title:"Environment & Config", min:15,
    why:"Real services read settings from the environment, never hardcode them.",
    doc:["Go by Example: Environment Variables", "https://gobyexample.com/environment-variables", "gobyexample · runnable"],
    concept:["Streamlining Go Configuration and Environment Variables", "https://nattrio.medium.com/streamlining-go-configuration-and-environment-variables-management-2f5ebacf66e3", "Medium · May 2024 · os.Getenv, defaults, .env file patterns"],
    video:["How to Use Environment Variables in Golang", "https://www.youtube.com/watch?v=z1gyPrMc-yI", "YouTube · 8 min · Aug 2023"],
    do:"Read PORT from the environment, defaulting to 8080 when it's not set."
  },

  { id:"4.4", title:"Writing Your First Test", min:25,
    why:"How Go tests work — no separate framework, just the testing package.",
    doc:["Go by Example: Testing and Benchmarking", "https://gobyexample.com/testing-and-benchmarking", "gobyexample · runnable"],
    concept:["Comprehensive Guide to Testing in Go", "https://blog.jetbrains.com/go/2022/11/22/comprehensive-guide-to-testing-in-go/", "JetBrains GoLand Blog · Nov 2022 · unit tests, subtests, testify"],
    video:["Writing Tests in Go — testing package basics", "https://www.youtube.com/watch?v=w-nZp39_UPk", "YouTube · 10 min · Jul 2022"],
    do:"Write one test for your 1.7 function using go test."
  },

  { id:"4.5", title:"Table-Driven Tests", min:20,
    why:"The Go way to test many inputs without copy-pasting the same test four times.",
    doc:["Table-driven tests", "https://go.dev/wiki/TableDrivenTests", "go.dev wiki · the canonical pattern"],
    concept:["Table-Driven Testing in Go", "https://2h3ph3rd.medium.com/table-driven-testing-in-go-c6816ac32448", "Medium · Francesco Pastore · Feb 2023 · struct-slice pattern with t.Run"],
    video:["Table Driven Tests in Golang", "https://www.youtube.com/watch?v=i5YcZEvIrFA", "YouTube · 10 min · Oct 2022"],
    do:"Rewrite your 4.4 test to check 4 different inputs in one table."
  },

  { id:"4.6", title:"Benchmarking", min:15,
    why:"Measure whether a change actually made your code faster, instead of guessing.",
    doc:["Go by Example: Testing and Benchmarking", "https://gobyexample.com/testing-and-benchmarking", "gobyexample · benchmark half"],
    concept:["Benchmarking in Golang for Performance Optimization", "https://dsysd-dev.medium.com/a-comprehensive-guide-to-benchmarking-in-golang-for-performance-optimization-9045c025e66a", "Medium · dsysd dev · Jul 2023 · BenchmarkXxx syntax, -benchmem, reading ns/op"],
    video:["How to benchmark in your Go tests", "https://www.youtube.com/watch?v=f8Zy4o1wELI", "YouTube · 8 min · benchmarking tutorial"],
    do:"Benchmark += versus strings.Builder for 100 iterations."
  },

  { id:"4.7", title:"Logging", min:15,
    why:"Structured logs you can search, instead of scattered Println calls.",
    doc:["Go by Example: Logging", "https://gobyexample.com/logging", "gobyexample · covers log/slog"],
    concept:["Structured Logging with slog", "https://go.dev/blog/slog", "go.dev · official introduction · handlers, levels, attrs"],
    video:["Go Structured Logging with the slog Package", "https://www.youtube.com/watch?v=ptoKy-COIlE", "YouTube · 10 min · Dec 2023"],
    do:"Replace one fmt.Println with slog.Info and a structured field."
  },

  { id:"4.8", title:"Packaging with Docker", min:30,
    why:"Ship your service as one small container image anyone can run.",
    doc:["Docker's Go language guide", "https://docs.docker.com/language/golang/", "docker.com · official"],
    concept:["Optimizing Multi-Stage Builds with Dockerfile in GoLang", "https://medium.com/@kittipat_1413/optimizing-multi-stage-builds-with-dockerfile-in-golang-a2ee8ed37ec6", "Medium · Jul 2023 · scratch/distroless images, layer caching strategy"],
    video:["Dockerfile for Golang — multi-stage build 2024", "https://www.youtube.com/watch?v=2QMoLyfIJx8", "YouTube · 12 min · Jan 2024 · distroless final stage"],
    do:"Write a 2-stage Dockerfile for your server, confirm the image is under 40 MB."
  },

  { id:"4.9", title:"Basic Security Habits", min:20,
    why:"The three mistakes that turn a first project into a real vulnerability.",
    doc:["OWASP Go Secure Coding Practices", "https://github.com/OWASP/Go-SCP", "OWASP · free, chapter per topic"],
    concept:["Preventing SQL Injection with Golang", "https://dev.to/wiliamvj/preventing-sql-injection-with-golang-41m5", "dev.to · Wiliam V. Joaquim · Mar 2024 · parameterized queries + bcrypt patterns"],
    video:["Password Hashing in Golang Using bcrypt", "https://www.youtube.com/watch?v=RFqLm8HLjQU", "YouTube · 10 min · hash, compare, cost factor"],
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
  "Watch": [["Go in 100 Seconds — Fireship","https://www.youtube.com/watch?v=446E-r0rXHI"],
    ["Goroutines & Channels Made Easy","https://www.youtube.com/watch?v=5EyxhMhvHTo"],
    ["Golang Context Explained — Melkey","https://www.youtube.com/watch?v=fXzzF5y6UEU"],
    ["Golang generics in 6 min — Anthony GG","https://www.youtube.com/watch?v=fTKsaPiThwM"],
    ["Hitesh Choudhary — start here (Hindi)","https://www.youtube.com/watch?v=X4q1OM0voO0"]],
  "Practice": [["Go Playground","https://go.dev/play/"],["Exercism Go track","https://exercism.org/tracks/go"],
    ["Gophercises","https://gophercises.com/"]]
};
