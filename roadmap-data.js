/* ==========================================================================
   Get Set GO — roadmap content
   Edit this file to change the curriculum. index.html renders whatever's here.

   unit = {
     id, title, outline, flag?, star?,
     res: [ [type, title, url, source, note?] ]     type: doc|video|repo|article
     note: [ [kind, html] ]                          kind: warn|info|rule
     code: [ {cap, body} ]
     tbl:  {head:[], rows:[[]]}
     do:   "practice task"
   }
   Mark the single best resource for a unit by putting `1` as a 6th element.
   ========================================================================== */

const ANCHORS = [
  ["A Tour of Go", "https://go.dev/tour/", "Interactive, official, complete"],
  ["Go Playground", "https://go.dev/play/", "Share runnable snippets in PRs instead of screenshots"],
  ["Go by Example", "https://gobyexample.com/", "Copy-ready snippet for nearly every unit below"],
  ["pkg.go.dev", "https://pkg.go.dev/std", "Search-first destination for any package"],
  ["Effective Go", "https://go.dev/doc/effective_go", "The style bible — week 1, then again week 3"],
  ["Code Review Comments", "https://go.dev/wiki/CodeReviewComments", "The checklist your reviewer will actually use"]
];

const DAYS = [
{
  n: 1, title: "Language Foundations",
  blurb: "Ten units, zero to competent-reader. Unit 1.9 is where most bugs are born — do not rush it.",
  units: [

  { id:"1.1", min:25, title:"Why Go?",
    outline:"The beginnings of Go · Go vs other languages · Supported platforms, cross compiling · Key distinguishing features",
    res:[
      ["video","Rob Pike — Go Proverbs","https://www.youtube.com/@golang","youtube.com","15 min on the official channel. The design philosophy in one sitting — nothing explains <em>why</em> Go looks like this more efficiently.",1],
      ["doc","Go FAQ — Origins & Design","https://go.dev/doc/faq","go.dev","Why no exceptions, no inheritance, no generics for 12 years — answered by the authors"],
      ["doc","Cross compiling","https://go.dev/wiki/WindowsCrossCompiling","go.dev","One command, three operating systems, zero runtime dependencies"],
      ["article","Go at Google: Language Design in the Service of Software Engineering","https://go.dev/talks/2012/splash.article","go.dev","Rob Pike's essay on the problems Go was built to solve at Google scale"]
    ],
    code:[{cap:"Run this live — it's the most convincing demo for a room of Java or Python developers",body:
`GOOS=linux   GOARCH=amd64 go build -o app-linux
GOOS=windows GOARCH=amd64 go build -o app.exe
GOOS=darwin  GOARCH=arm64 go build -o app-mac`}],
    do:"Cross-compile Hello World for all three platforms. Note the binary size, and that it needs no JVM, no interpreter, no node_modules."
  },

  { id:"1.2", min:25, title:"Setting Up Go",
    outline:"Downloading & installing · Go environment variables · Why Git, Mercurial? · Go Playground",
    res:[
      ["doc","Tutorial: Get started with Go","https://go.dev/doc/tutorial/getting-started","go.dev","Official, 15 minutes, zero to a running module",1],
      ["doc","Installation","https://go.dev/doc/install","go.dev","Install Go 1.26"],
      ["doc","go env and environment variables","https://pkg.go.dev/cmd/go#hdr-Environment_variables","pkg.go.dev","GOPATH, GOMODCACHE, GOPROXY, GOSUMDB"],
      ["article","Inside the Go Playground","https://go.dev/blog/playground","go.dev","Why time.Now() always returns 2009 — it compiles server-side with a faked clock"]
    ],
    note:[["info","<b>On “Why Git, Mercurial?”</b> — a holdover from the pre-modules era, when <code>go get</code> cloned straight from version control. Since Go 1.13 the toolchain fetches through the <a href='https://proxy.golang.org' target='_blank' rel='noopener'>module proxy</a> and verifies against the <a href='https://sum.golang.org' target='_blank' rel='noopener'>checksum database</a>. You still need Git for your own source control and for private repos via <code>GOPRIVATE</code> — the toolchain just no longer needs Mercurial or Bazaar for public packages."]],
    do:"Run go env, then explain in your own words what GOPATH, GOMODCACHE, GOPROXY and GOSUMDB each do."
  },

  { id:"1.3", min:30, title:"Basic Program, Go Tools",
    outline:"Hello World, packages, import and main · go build · go run",
    res:[
      ["doc","How to Write Go Code","https://go.dev/doc/code","go.dev","Official. Packages, imports, main, and the build lifecycle — with the <em>why</em> most tutorials skip",1],
      ["doc","go command reference","https://pkg.go.dev/cmd/go","pkg.go.dev","Skim once, return often"],
      ["repo","golang/example","https://github.com/golang/example","github.com","Canonical minimal Go programs, maintained by the Go team"],
      ["video","TechWorld with Nana — Golang Full Course","https://www.youtube.com/@TechWorldwithNana","youtube.com","First hour covers the toolchain cleanly"]
    ],
    code:[{cap:"Print this and pin it at your desk",body:
`go run .                       # compile + run, no binary left behind
go build -o bin/app ./cmd/app  # produce a binary
go install ./cmd/app           # build + drop it in $GOPATH/bin
go vet ./...                   # static analysis — before EVERY commit
gofmt -l -w .                  # format (goimports also fixes imports)
go doc strings.Builder         # inline docs, no browser needed
go clean -cache                # when the build cache misbehaves`}],
    do:"Write Hello World in package main. Move a function into a package `greet` and import it. Now lowercase the function name and read the compiler error carefully."
  },

  { id:"1.4", min:40, title:"Working with Strings",
    outline:"String functions · String formatting",
    res:[
      ["article","Strings, bytes, runes and characters in Go","https://go.dev/blog/strings","go.dev","The one article that explains why <code>len(\"नमस्ते\")</code> is <b>18</b>, not 6. Non-negotiable for an Indian-language product.",1],
      ["doc","strings","https://pkg.go.dev/strings","pkg.go.dev"],
      ["doc","fmt","https://pkg.go.dev/fmt","pkg.go.dev","Read the verb table at the top of the page"],
      ["doc","strconv","https://pkg.go.dev/strconv","pkg.go.dev"],
      ["repo","Go by Example: String Functions","https://gobyexample.com/string-functions","gobyexample.com"],
      ["article","100 Go Mistakes — strings","https://100go.co/","100go.co","Especially “inefficient string concatenation” — use strings.Builder, never += in a loop"]
    ],
    do:"Write wordfreq.go — read a file, count word frequency, print the top 10 sorted by count desc then alphabetically. Then run it on a Hindi text file and explain the byte-vs-rune difference in your output."
  },

  { id:"1.5", min:30, title:"Variables and Assignment",
    outline:"var, := , new · Multiple assignment · Values · Variables · Constants",
    res:[
      ["doc","A Tour of Go — Basics through Constants","https://go.dev/tour/basics/1","go.dev","12 interactive slides you can't skim, because you have to run each one",1],
      ["doc","Effective Go — Names, Constants","https://go.dev/doc/effective_go#names","go.dev"],
      ["article","Constants","https://go.dev/blog/constants","go.dev","Rob Pike on arbitrary-precision untyped constants — why <code>const big = 1 &lt;&lt; 62</code> compiles but <code>var x int8 = 300</code> doesn't"],
      ["repo","Go by Example: Variables & Constants","https://gobyexample.com/variables","gobyexample.com"]
    ],
    tbl:{head:["","Use it for","Scope"],rows:[
      ["<code>var x int</code>","Zero-valued declaration; package-level vars","Anywhere"],
      ["<code>x := 10</code>","Declare + infer type","<b>Function bodies only</b>"],
      ["<code>p := new(int)</code>","Allocate, get a *int to the zero value","Anywhere"]
    ]},
    do:"Write an iota block for HTTP status categories. Add a String() method, then try golang.org/x/tools/cmd/stringer to generate it for you."
  },

  { id:"1.6", min:50, title:"Errors",
    outline:"Errors in Go · Error conventions · Custom errors, panic and recover, defer",
    res:[
      ["article","Working with Errors in Go 1.13","https://go.dev/blog/go1.13-errors","go.dev","%w wrapping, errors.Is, errors.As. <b>This is the modern standard and how we handle errors at IndiaMART.</b> Most older tutorials predate it and teach the wrong thing.",1],
      ["article","Error handling and Go","https://go.dev/blog/error-handling-and-go","go.dev","The foundational piece — read before the 1.13 article"],
      ["article","Defer, Panic and Recover","https://go.dev/blog/defer-panic-and-recover","go.dev","LIFO ordering and argument-evaluation timing"],
      ["article","Dave Cheney — Don't just check errors, handle them gracefully","https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully","dave.cheney.net","For <em>judgement</em>: when to wrap, when to log, when to return"],
      ["doc","errors","https://pkg.go.dev/errors","pkg.go.dev","Note errors.Join (Go 1.20+) for combining failures"]
    ],
    note:[["rule","<b>The six rules, ordered by how often they're broken.</b><ol><li>Errors are <b>values</b>, returned <b>last</b>, checked with <code>if err != nil</code>.</li><li>Wrap with <code>%w</code> when you add context: <code>fmt.Errorf(\"fetch user %s: %w\", id, err)</code>.</li><li><code>errors.Is</code> compares against a <b>sentinel</b>. <code>errors.As</code> extracts a <b>type</b>.</li><li>Error strings are lowercase, no trailing punctuation.</li><li><b>Never log and return the same error.</b> Pick one — logging at every layer is how you get 40 lines of noise for one failure.</li><li><code>panic</code> is for unrecoverable programmer errors. <code>recover</code> belongs in exactly one place: your HTTP panic-recovery middleware.</li></ol>"]],
    do:"Define ErrNotFound (sentinel) and a ValidationError type. Build a handler → service → repo chain wrapping at each layer, then map to 404/400/500 using errors.Is and errors.As."
  },

  { id:"1.7", min:35, title:"Functions",
    outline:"Writing a function · Return values · Multiple return values · Closures",
    res:[
      ["doc","A Tour of Go — Functions & Closures","https://go.dev/tour/moretypes/24","go.dev","The Fibonacci-generator exercise is the one that makes closures click",1],
      ["doc","Effective Go — Functions","https://go.dev/doc/effective_go#functions","go.dev"],
      ["repo","Go by Example: Closures","https://gobyexample.com/closures","gobyexample.com","Also: Multiple Return Values, Variadic Functions"],
      ["article","Range over function iterators","https://go.dev/blog/range-functions","go.dev","Go 1.23+. Advanced — come back after Day 4"]
    ],
    code:[{cap:"Named returns interact with defer in ways that surprise people",body:
`func f() (result int) {
    defer func() { result *= 2 }()
    return 5          // returns 10
}`}],
    note:[["warn","Use named returns for documentation on short functions, or when a deferred function genuinely needs to modify the result. Don't use them to avoid declaring variables."]],
    do:"Write a `type Middleware func(http.Handler) http.Handler` and chain three of them. You've just written the closure pattern under every Go web framework — you'll use it directly on Day 3."
  },

  { id:"1.8", min:40, title:"Pointers, Parameters, Return Values",
    outline:"Pointers · Parameters · Pass by value, pass by reference",
    res:[
      ["video","Jon Calhoun — pointers & value-vs-pointer receivers","https://www.calhoun.io/","calhoun.io","The clearest explanation of the thing that trips up every Java and Python developer",1],
      ["doc","A Tour of Go — Pointers","https://go.dev/tour/moretypes/1","go.dev"],
      ["article","Code Review Comments — Receiver Type","https://go.dev/wiki/CodeReviewComments#receiver-type","go.dev","The actual decision rule. Memorise this table."],
      ["video","Anthony GG — Pointers in Go","https://www.youtube.com/@anthonygg_","youtube.com"]
    ],
    note:[["rule","<b>The single most important sentence in this unit.</b><br>Go is <b>always</b> pass-by-value. There is no pass-by-reference. When you pass a pointer you pass a <em>copy of the pointer</em>, which happens to point at the same memory. Slices, maps and channels feel like references because their headers contain a pointer — but the header itself is still copied.<br><br>Internalise that and unit 1.9's slice-aliasing bug and unit 2.1's value-receiver bug both become obvious."]],
    do:"Build an IntStack with Push, Pop, Peek, Len. Write Push with a value receiver first, watch it silently do nothing, then fix it and comment exactly why."
  },

  { id:"1.9", min:75, title:"Arrays, Slices, Maps, for", flag:"Highest bug density in the workshop",
    outline:"for · Arrays, slices · Maps · Range, continue, break, goto, fallthrough",
    res:[
      ["article","Go Slices: usage and internals","https://go.dev/blog/slices-intro","go.dev","Slice header, aliasing, append growth, three-index slices. <b>If a trainee reads one article all workshop, this is it.</b>",1],
      ["article","Go maps in action","https://go.dev/blog/go-maps-in-action","go.dev","The nil-map write panic and the comma-ok idiom"],
      ["article","The mechanics of 'append'","https://go.dev/blog/slices","go.dev","The deeper follow-up"],
      ["doc","slices and maps (stdlib since Go 1.21)","https://pkg.go.dev/slices","pkg.go.dev","slices.Sort, slices.Contains, maps.Keys. <b>Use these instead of hand-rolling</b> — most tutorials predate them."],
      ["article","100 Go Mistakes #20–#28","https://100go.co/","100go.co","Twenty minutes that will save you a production incident"],
      ["repo","Go by Example: Slices, Maps, Range","https://gobyexample.com/slices","gobyexample.com"]
    ],
    code:[{cap:"The four traps, in the order you'll hit them",body:
`// 1 — ALIASING: a slice is a window onto a shared array
a := []int{1, 2, 3, 4}
b := a[1:3]
b[0] = 99
fmt.Println(a)              // [1 99 3 4]  — you mutated the caller's data

// 2 — APPEND WRITES IN PLACE when len < cap
a = []int{1, 2, 3, 4}
b = a[1:3]                  // len 2, cap 3
b = append(b, 100)
fmt.Println(a)              // [1 2 3 100]
b = a[1:3:3]                // three-index slice → append now copies

// 3 — NIL MAP WRITE PANICS
var m map[string]int
m["a"] = 1                  // panic: assignment to entry in nil map
m = make(map[string]int)    // fix

// 4 — RANGE YIELDS A COPY
type P struct{ N int }
ps := []P{{1}, {2}}
for _, p := range ps { p.N *= 10 }
fmt.Println(ps)             // [{1} {2}] — unchanged
for i := range ps { ps[i].N *= 10 }   // fix: index directly`}],
    note:[["info","<b>On goto and fallthrough.</b> Both exist, both are in the TOC for completeness, and you should essentially never use either. <code>fallthrough</code> is explicit <em>because</em> Go made non-fallthrough the default — that's a feature. <code>goto</code> is legal, but if you reach for it, restructure the function instead."]],
    do:"Predict all four outputs before running them. Paste each into the Go Playground and share your links in the team channel. Then write the fix for each in three sentences."
  },

  { id:"1.10", min:40, title:"Generics",
    outline:"Type parameters and constraints · Writing generic functions and types · When (and when not) to use generics",
    res:[
      ["doc","Tutorial: Getting started with generics","https://go.dev/doc/tutorial/generics","go.dev","Official, hands-on, 20 minutes",1],
      ["article","An Introduction To Generics","https://go.dev/blog/intro-generics","go.dev","The concepts"],
      ["article","When To Use Generics","https://go.dev/blog/when-generics","go.dev","The <em>judgement</em> half your TOC explicitly asks for. Short version: use them for data structures and for functions over slices/maps/channels of any element type. Not just because a function takes two types."],
      ["video","Ian Lance Taylor — Generics in Go","https://www.youtube.com/@golang","youtube.com","From the person who designed them"]
    ],
    do:"Write generic Map, Filter, Reduce. Then delete them and use the slices package instead — and comment why the stdlib version is better. That deletion is the actual lesson."
  }
]},

{
  n: 2, title: "OOP, Modules, Concurrency Foundations",
  blurb: "Interfaces are the conceptual centre of Go. Unit 2.1 is the one to give the most room to.",
  units: [

  { id:"2.1", min:90, title:"OOP — Structs, Interfaces, Encapsulation, Inheritance, Polymorphism", flag:"Most important conceptual unit",
    outline:"Structs, members, anonymous members · Methods · Pointer & value receivers · How structs take the place of objects · Encapsulation, data hiding · Inheritance with composition · Polymorphism",
    res:[
      ["doc","Effective Go — Interfaces & Embedding","https://go.dev/doc/effective_go#interfaces","go.dev","Official, and directly answers the TOC's “how structs take the place of objects”",1],
      ["doc","A Tour of Go — Methods and interfaces","https://go.dev/tour/methods/1","go.dev","26 slides. Do all of them."],
      ["article","The Laws of Reflection","https://go.dev/blog/laws-of-reflection","go.dev","Read the Interfaces section only. An interface value is a <b>(type, value) pair</b> — which is what makes the typed-nil trap comprehensible."],
      ["repo","tmrts/go-patterns","https://github.com/tmrts/go-patterns","github.com","Design patterns written idiomatically <em>in Go</em>, not translated from Java. Best repo here if you're coming from Java."],
      ["video","Anthony GG — interfaces in practice","https://www.youtube.com/@anthonygg_","youtube.com","Real backend usage, not toy Shape/Circle examples"],
      ["article","Code Review Comments — Interfaces","https://go.dev/wiki/CodeReviewComments#interfaces","go.dev","Where to <em>define</em> an interface: at the consumer, not the producer"]
    ],
    tbl:{head:["You want","Java / C++","Go"],rows:[
      ["A class","<code>class User { }</code>","<code>type User struct { }</code>"],
      ["A method","inside the class body","<code>func (u User) Name() string</code> — receiver outside"],
      ["Private","<code>private</code> keyword","<b>lowercase first letter</b>"],
      ["Public","<code>public</code> keyword","<b>Uppercase first letter</b>"],
      ["Inheritance","<code>extends Base</code>","<b>Embedding</b> — <code>type Admin struct { User }</code>"],
      ["Interface","<code>implements Serializable</code>","<b>Implicit</b> — no declaration, you just have the methods"],
      ["Constructor","<code>new User()</code>","<code>func NewUser(...) *User</code> — a plain function, by convention"]
    ]},
    note:[
      ["warn","<b>Three things that will bite you.</b><ol><li><b>Embedding is not inheritance.</b> Admin embedding User <em>promotes</em> User's methods, but there's no virtual dispatch — User's methods can never call an overridden Admin method. Composition, not is-a.</li><li><b>Method sets.</b> Value-receiver methods belong to both T and *T; pointer-receiver methods belong <b>only to *T</b>. So if an interface needs both, only *T satisfies it.</li><li><b>Typed nil.</b> <code>var p *MyErr = nil; var e error = p; e == nil</code> → <b>false</b>. The type word is non-nil.</li></ol>"],
      ["rule","<b>Accept interfaces, return structs.</b> · <b>The bigger the interface, the weaker the abstraction.</b> · Define the interface where it's <em>used</em>, keep it to 1–3 methods, and don't create one until you have a second implementation or a test that needs a mock."]
    ],
    do:"Define `Notifier interface { Send(ctx, to, body string) error }`. Implement SMS, Email and Mock. Write a Dispatcher that fans out to []Notifier, and unit-test it with only the mock — no network. This is the exact shape of our CCS notification layer."
  },

  { id:"2.2", min:45, title:"Dependency Management",
    outline:"Go Modules (go.mod, go.sum) · go get, semantic versioning · Workspace structure, GOPATH, vendor, dep",
    res:[
      ["doc","Managing dependencies","https://go.dev/doc/modules/managing-dependencies","go.dev","Official, and exactly scoped to this unit",1],
      ["doc","Go Modules Reference","https://go.dev/ref/mod","go.dev","The complete spec — a lookup, not a read-through"],
      ["article","Using Go Modules","https://go.dev/blog/using-go-modules","go.dev","The original 4-part series; still the clearest narrative introduction"],
      ["doc","Module version numbering","https://go.dev/doc/modules/version-numbers","go.dev","SemVer, and the v2+ import-path rule that surprises everyone exactly once"],
      ["doc","Go workspaces (go.work)","https://go.dev/doc/tutorial/workspaces","go.dev","Multi-module local development"]
    ],
    code:[{cap:"Essential commands",body:
`go mod init github.com/indiamart/myservice
go get github.com/google/uuid@v1.6.0     # pin an exact version
go get -u ./...                          # upgrade minor/patch
go mod tidy                              # add missing, drop unused
go mod why github.com/some/dep           # "why is this in my build?"
go mod graph                             # full dependency graph
go list -m -u all                        # what has updates available`}],
    note:[
      ["info","<b>Historical note — so old tutorials don't confuse you.</b> GOPATH, <code>vendor/</code> and <b>dep</b> are in the TOC for context, not for use. <b>dep</b> was the pre-modules dependency manager, <b>deprecated since 2020</b> — you'll never start a new project with it. <b>GOPATH</b> no longer decides where your code lives, but still matters for GOMODCACHE and <code>$GOPATH/bin</code>. <b>vendor/</b> is optional — use it only for hermetic or air-gapped builds."],
      ["rule","<b>go.sum is not a lock file.</b> go.mod pins versions; go.sum records <b>cryptographic hashes</b>, so a tampered upstream is caught at build time. That's why you commit both, and why you never hand-edit go.sum."]
    ],
    do:"go mod init a fresh module. Add github.com/google/uuid, inspect go.sum, remove the import, run go mod tidy and watch it disappear. Then go mod why something you didn't add directly."
  },

  { id:"2.3", min:45, title:"Goroutines, Parallelism",
    outline:"Concurrency with goroutines · Concurrency and parallelism",
    res:[
      ["video","Rob Pike — Concurrency is not Parallelism","https://www.youtube.com/@golang","youtube.com","30 min. <b>Mandatory. Watch it twice.</b> Concurrency is about <em>structure</em>; parallelism is about <em>execution</em>. All of Day 3 depends on holding that distinction.",1],
      ["article","Concurrency is not parallelism (slides)","https://go.dev/blog/waza-talk","go.dev","The written companion"],
      ["doc","A Tour of Go — Concurrency","https://go.dev/tour/concurrency/1","go.dev"],
      ["article","Scheduling in Go — the G-M-P model","https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2-go-scheduler.html","ardanlabs.com","Conceptual level only. Knowing goroutines are runtime-scheduled, not OS-scheduled, explains why 100,000 of them is normal."]
    ],
    note:[["warn","<b>Loop variable capture — know both behaviours.</b><br><code>for i := 0; i &lt; 3; i++ { go func() { fmt.Print(i) }() }</code><br><b>Go 1.22+:</b> <code>i</code> is fresh per iteration → prints 0, 1, 2 each once, in non-deterministic order.<br><b>Before 1.22:</b> all three closures shared one <code>i</code> → typically <code>3 3 3</code>.<br>You write 1.26, but any legacy repo you inherit still has the old semantics."]],
    do:"Launch 5 goroutines that print their index. Run it 10 times and watch the ordering change. Then set runtime.GOMAXPROCS(1) and observe what changes — and what doesn't."
  },

  { id:"2.4", min:35, title:"Handling Race Conditions",
    outline:"Example of a race condition",
    res:[
      ["doc","Data Race Detector","https://go.dev/doc/articles/race_detector","go.dev","How to run it, and what it can't catch — it only sees code paths that actually execute, which is why you run it over your whole test suite in CI",1],
      ["article","Introducing the Go Race Detector","https://go.dev/blog/race-detector","go.dev","The announcement, with a worked example"],
      ["doc","The Go Memory Model","https://go.dev/ref/mem","go.dev","Advanced — read after you've hit a real race"],
      ["article","100 Go Mistakes — concurrency","https://100go.co/","100go.co","A <em>data race</em> and a <em>race condition</em> are not the same thing, and the detector only finds the first"]
    ],
    code:[{cap:"Put the second line in CI. Non-negotiable.",body:
`go run -race main.go
go test -race ./...`}],
    note:[["warn","<b>The one that isn't a data race and isn't recoverable.</b> 100 goroutines writing to a plain <code>map[string]int</code> gives you <code>fatal error: concurrent map writes</code>. That's a <em>runtime abort</em>, not a panic — <code>recover()</code> cannot catch it and it takes the whole process down. Go's built-in map is never safe for concurrent writes."]],
    do:"Write a counter incremented by 1000 goroutines with no synchronisation. Run with -race and read the report carefully — it gives you both the read site and the write site. Keep the output; you'll fix it in 2.5."
  },

  { id:"2.5", min:50, title:"SyncGroup, Wait, Mutexes",
    outline:"Sync, Wait · Mutexes · Deadlocks with mutexes · RW mutexes",
    res:[
      ["doc","sync package docs","https://pkg.go.dev/sync","pkg.go.dev","Genuinely the best resource here. Read Mutex, RWMutex, WaitGroup, Once and their examples end to end — the doc comments contain the rules most tutorials omit.",1],
      ["doc","sync/atomic","https://pkg.go.dev/sync/atomic","pkg.go.dev","atomic.Int64 (typed atomics, Go 1.19+) are cleaner than the old function forms"],
      ["doc","golang.org/x/sync/errgroup","https://pkg.go.dev/golang.org/x/sync/errgroup","pkg.go.dev","WaitGroup + error propagation + context cancellation. Once you understand WaitGroup, this is what you'll actually use."],
      ["repo","Go by Example: WaitGroups, Mutexes, Atomic Counters","https://gobyexample.com/waitgroups","gobyexample.com"],
      ["repo","learn-go-with-tests — Sync","https://github.com/quii/learn-go-with-tests","github.com","Builds a concurrency-safe counter test-first"]
    ],
    note:[
      ["rule","<b>The five rules.</b><ol><li><code>wg.Add(1)</code> goes <b>before</b> <code>go func()</code>, never inside. Inside, Wait can return before the goroutine is scheduled. <em>(Go 1.25+ added wg.Go(fn) which handles this for you.)</em></li><li><code>defer wg.Done()</code> as the first line inside — it survives a panic.</li><li><code>defer mu.Unlock()</code> immediately after <code>mu.Lock()</code>. Always.</li><li><b>Never copy a Mutex.</b> Embedding one means that struct is passed by pointer forever. go vet catches this.</li><li>RWMutex only pays off on read-heavy workloads. Under write contention it's <em>slower</em> than a plain Mutex — benchmark, don't assume.</li></ol>"],
      ["warn","<b>Deadlock, the classic form.</b> Goroutine A takes mu1 then mu2; goroutine B takes mu2 then mu1. Fix: always acquire multiple locks in a <b>globally consistent order</b>, and write that order down in a comment."]
    ],
    do:"Fix the racy counter from 2.4 three ways — Mutex, RWMutex, atomic.Int64. Benchmark all three with go test -bench=. -benchmem. The result will surprise you, and that surprise is the lesson."
  },

  { id:"2.6", min:35, title:"Configuration Management",
    outline:"Environment-based configuration · Binding config to structs · Config libraries overview",
    res:[
      ["article","The Twelve-Factor App — Config","https://12factor.net/config","12factor.net","Not Go-specific, and that's the point. It's the <em>principle</em>: config lives in the environment, never in the repo.",1],
      ["doc","os.LookupEnv and flag","https://pkg.go.dev/os#LookupEnv","pkg.go.dev","Start here. For most services stdlib is enough and adds zero dependencies."],
      ["repo","caarlos0/env","https://github.com/caarlos0/env","github.com","Best for new joiners — struct-tag based, tiny, no magic"],
      ["repo","spf13/viper","https://github.com/spf13/viper","github.com","The library in your TOC. Powerful (files, env, remote KV, live reload) but heavy — reach for it when you need multi-source config, not by default."],
      ["repo","kelseyhightower/envconfig","https://github.com/kelseyhightower/envconfig","github.com","The older, equally clean alternative"],
      ["repo","joho/godotenv","https://github.com/joho/godotenv","github.com","Loads .env for local development only. Never in production."]
    ],
    code:[{cap:"Struct-tag config with caarlos0/env",body:
`type Config struct {
    Port    int           \`env:"PORT" envDefault:"8080"\`
    DBDSN   string        \`env:"DB_DSN,required"\`
    Timeout time.Duration \`env:"TIMEOUT" envDefault:"5s"\`
}`}],
    note:[["rule","<b>Never commit secrets.</b> Add .env to .gitignore on day one. <b>Fail fast at startup</b> — parse and validate all config in main() before the server starts; a service that boots with a missing DB password and dies on the first request is worse than one that refuses to boot. <b>Config is a struct, passed explicitly</b> — no global singleton, no init() magic."]],
    do:"Build a Config struct read from env with sane defaults and one required field. Make the service refuse to start with a clear message when it's missing. Do it once with pure stdlib, once with caarlos0/env, and decide which you'd defend in review."
  }
]},

{
  n: 3, title: "Channels, Concurrency Patterns, Web Services",
  blurb: "Two of your TOC's labs live here — the search engine (3.1) and the load balancer (3.2). Both come straight from Rob Pike's talks.",
  units: [

  { id:"3.1", min:75, title:"Channels", flag:"Lab: build a simple search engine",
    outline:"Buffered channels · Directional channels · Channel types · Select · Project: build a simple search engine",
    res:[
      ["video","Rob Pike — Go Concurrency Patterns","https://www.youtube.com/@golang","youtube.com","Google I/O 2012. <b>This talk literally builds the search-engine project in your TOC</b> — Google Search 1.0 → 2.0 → 3.0, adding fan-out, then timeouts, then replication. Watch before the lab, not after.",1],
      ["article","Go Concurrency Patterns — slides","https://go.dev/talks/2012/concurrency.slide","go.dev","The slide deck for the talk above"],
      ["doc","A Tour of Go — Channels through Default Selection","https://go.dev/tour/concurrency/2","go.dev"],
      ["repo","Go by Example: Channels, Buffering, Select, Timeouts","https://gobyexample.com/channels","gobyexample.com","Also Directions and Non-Blocking Operations"],
      ["repo","learn-go-with-tests — Select","https://github.com/quii/learn-go-with-tests","github.com","Test-driven, which forces you to actually understand blocking semantics"]
    ],
    tbl:{head:["Operation","Nil channel","Open, empty","Closed"],rows:[
      ["<b>Send</b>","blocks forever","blocks until a receiver is ready","<b>panics</b>"],
      ["<b>Receive</b>","blocks forever","blocks until a sender is ready","zero value, <code>ok == false</code>"],
      ["<b>Close</b>","panics","fine","<b>panics</b>"]
    ]},
    code:[{cap:"Directional types are free documentation and free compile-time safety",body:
`func producer(out chan<- int)   // send-only: can't accidentally receive
func consumer(in  <-chan int)   // receive-only: can't accidentally close`}],
    note:[["rule","<b>Only the sender closes</b>, and only when there is exactly one sender. With multiple senders, coordinate with a WaitGroup and close in a separate goroutine after Wait(). And remember: <code>select</code> with <code>default</code> is <b>non-blocking</b> — that's how you return 503 instead of hanging when a queue is full."]],
    do:"Build the concurrent search engine. Query 3 fake backends (Web, Image, Video), fan out with goroutines, fan in with a channel, add a select timeout so one slow backend can't stall the search, then add replication so you take the first of two replicas."
  },

  { id:"3.2", min:90, title:"Concurrency in the Real World", flag:"Lab: build a load balancer",
    outline:"Rate limiting, bursty rate limiting · Worker pool · Project: load balancer · Context — cancellation, deadlines, propagation",
    res:[
      ["article","Go Concurrency Patterns: Pipelines and cancellation","https://go.dev/blog/pipelines","go.dev","Fan-out/fan-in, done channels, bounded parallelism. <b>The mental model behind every Kafka consumer we run.</b>",1],
      ["article","Go Concurrency Patterns: Context","https://go.dev/blog/context","go.dev","Official, and definitive for the context half of this unit"],
      ["doc","context","https://pkg.go.dev/context","pkg.go.dev","Read the whole package doc — it's short and every paragraph matters"],
      ["repo","Go by Example: Rate Limiting","https://gobyexample.com/rate-limiting","gobyexample.com","Covers <b>both</b> steady and bursty rate limiting, exactly as your TOC lists them"],
      ["doc","golang.org/x/time/rate","https://pkg.go.dev/golang.org/x/time/rate","pkg.go.dev","The production token-bucket limiter. rate.NewLimiter(10, 30) = 10/sec sustained, burst 30."],
      ["video","Sameer Ajmani — Advanced Go Concurrency Patterns","https://www.youtube.com/@golang","youtube.com","Google I/O 2013. Worker pools and cancellation."],
      ["article","Alex Edwards — How to Rate Limit HTTP Requests","https://www.alexedwards.net/blog/how-to-rate-limit-http-requests","alexedwards.net","Per-IP middleware you can lift straight into your capstone"]
    ],
    note:[
      ["rule","<b>Context rules — the four that get broken.</b><ol><li><code>ctx</code> is <b>always the first parameter</b>, named ctx. Never store it in a struct.</li><li><b><code>defer cancel()</code> — always</b>, even when the timeout will fire anyway. Skipping it leaks the timer and the child context; go vet's lostcancel flags it.</li><li>Cancellation is <b>cooperative</b>. Nothing gets killed. A goroutine that never selects on <code>ctx.Done()</code> runs forever regardless of the deadline.</li><li><code>context.Value</code> is for request-scoped metadata (request ID, trace ID, user ID) — not optional parameters. Typed unexported key, never a bare string.</li></ol>"],
      ["warn","<b>The most common goroutine leak in production Go.</b><br>An unbuffered channel plus a <code>time.After</code> timeout: if the timeout fires, nobody ever receives, and the worker blocks on its send <b>forever</b>. Fix: buffer the channel so the send always completes, or thread a context the worker checks."]
    ],
    do:"Build the load balancer. N workers, jobs dispatched to the least-loaded worker (a heap works nicely), results on a per-request channel, and a context timeout that cancels cleanly with zero goroutine leaks. Verify with runtime.NumGoroutine() before and after — the numbers must match."
  },

  { id:"3.3", min:45, title:"Templates and Data Formats",
    outline:"HTML and text templates · JSON, marshalling, unmarshalling",
    res:[
      ["article","JSON and Go","https://go.dev/blog/json","go.dev","Marshal, Unmarshal, struct tags, interface{} decoding, streaming. Covers the whole JSON half of this unit.",1],
      ["doc","encoding/json","https://pkg.go.dev/encoding/json","pkg.go.dev"],
      ["doc","html/template","https://pkg.go.dev/html/template","pkg.go.dev","Contextually auto-escaping — the safe one"],
      ["repo","Go by Example: JSON & Text Templates","https://gobyexample.com/json","gobyexample.com"],
      ["article","Alex Edwards — template rendering patterns","https://www.alexedwards.net/blog","alexedwards.net","Practical caching and layout composition"]
    ],
    code:[{cap:"Struct tags — the whole vocabulary",body:
`type User struct {
    ID        string    \`json:"id"\`
    Email     string    \`json:"email"\`
    Password  string    \`json:"-"\`                  // NEVER serialised
    Nickname  string    \`json:"nickname,omitempty"\` // dropped when zero
    CreatedAt time.Time \`json:"created_at"\`
}`},
    {cap:"Two habits to adopt immediately",body:
`dec := json.NewDecoder(r.Body)
dec.DisallowUnknownFields()      // typos become 400s, not silent no-ops`}],
    note:[
      ["rule","<code>json:\"-\"</code> on the password field is a one-character defence against the most common security bug in a first backend service."],
      ["warn","<b>html/template vs text/template.</b> Identical APIs, but html/template is <b>contextually auto-escaping</b> — it knows whether it's writing into HTML, an attribute, JavaScript or a URL. For anything reaching a browser, <b>always html/template</b>. Using text/template for HTML is an XSS vulnerability, which connects straight to unit 4.9."]
    ],
    do:"Marshal a User with json:\"-\" on the password and confirm it's absent. Then render an HTML page with html/template, inject <script>alert(1)</script> as a username, and watch it get escaped. Swap to text/template and watch the alert fire."
  },

  { id:"3.4", min:90, title:"Building Web Servers, Using Regex in Go",
    outline:"http package · Running a web server and handling requests · HTTP return codes · Regex · Routes, variables · Serving static files",
    res:[
      ["article","Mat Ryer — How I Write HTTP Services in Go After 13 Years","https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/","grafana.com","<b>Read this twice.</b> More practically useful for our work than any video on this list: handler structure, dependency injection without a framework, testability, graceful shutdown.",1],
      ["article","Routing Enhancements for Go 1.22","https://go.dev/blog/routing-enhancements","go.dev","Method patterns and path wildcards in stdlib ServeMux. <b>This changed the answer to “which router?” and most tutorials predate it.</b>"],
      ["doc","net/http","https://pkg.go.dev/net/http","pkg.go.dev","Read Handler, HandlerFunc, ServeMux and Server"],
      ["doc","Writing Web Applications","https://go.dev/doc/articles/wiki/","go.dev","Official long-form tutorial — builds a wiki with templates and regex validation"],
      ["doc","regexp","https://pkg.go.dev/regexp","pkg.go.dev","Go uses RE2: linear time, no catastrophic backtracking — but <b>no backreferences or lookahead</b>. The adjustment if you're coming from PCRE."],
      ["video","Coder's Gyan — Master Golang in One Video (Hindi)","https://www.youtube.com/watch?v=yZgwW6Yuc_E","youtube.com","The back half is a real-world API project"]
    ],
    code:[{cap:"Go 1.22+ routing — this is now stdlib, no library needed",body:
`mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", getUser)     // method + wildcard
mux.HandleFunc("POST /users",     createUser)
mux.Handle("GET /static/", http.StripPrefix("/static/",
    http.FileServer(http.Dir("./public"))))

func getUser(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")                    // no mux.Vars(), no third-party
}`},
    {cap:"Always set server timeouts — a default http.Server{} has none",body:
`srv := &http.Server{
    Addr:              ":8080",
    Handler:           mux,
    ReadHeaderTimeout: 5 * time.Second,
    ReadTimeout:       10 * time.Second,
    WriteTimeout:      15 * time.Second,
    IdleTimeout:       60 * time.Second,
}`}],
    note:[["warn","Missing timeouts are the <b>number-one cause of goroutine and file-descriptor exhaustion</b> in Go services. The same applies outbound — never use <code>http.DefaultClient</code>, it has no timeout."],
    ["info","<b>Status codes you'll actually use:</b> 200 OK · 201 Created · 202 Accepted · 204 No Content · 301/302 redirect · 400 bad request · 401 unauthenticated · 403 authenticated-but-forbidden · 404 not found · 409 conflict · 422 unprocessable · 429 rate limited · 500 server error · 503 unavailable."]],
    do:"Build /healthz plus one CRUD resource with in-memory storage, three middlewares (request-ID, logging, panic recovery), static file serving, and graceful shutdown via srv.Shutdown(ctx). No framework — you need to know what Gin does for you before Day 4 hands you Gin."
  },

  { id:"3.5", min:30, title:"Context gorilla package",
    outline:"Installing gorilla mux · Routing URLs, sub-routers",
    res:[
      ["article","Routing Enhancements for Go 1.22","https://go.dev/blog/routing-enhancements","go.dev","Read alongside gorilla, and understand what gorilla was solving",1],
      ["repo","gorilla/mux","https://github.com/gorilla/mux","github.com","The library in your TOC"],
      ["repo","go-chi/chi","https://github.com/go-chi/chi","github.com","The most common migration target: zero dependencies, http.Handler-native, actively maintained"]
    ],
    tbl:{head:["Concept","gorilla/mux","stdlib 1.22+","chi"],rows:[
      ["Path variable","<code>mux.Vars(r)[\"id\"]</code>","<code>r.PathValue(\"id\")</code>","<code>chi.URLParam(r,\"id\")</code>"],
      ["Method match","<code>.Methods(\"GET\")</code>","<code>\"GET /path\"</code>","<code>r.Get(\"/path\", h)</code>"],
      ["Sub-router","<code>.PathPrefix(\"/api\").Subrouter()</code>","nested mux + StripPrefix","<code>r.Route(\"/api\", ...)</code>"],
      ["Middleware","<code>r.Use(mw)</code>","manual wrapping","<code>r.Use(mw)</code>"]
    ]},
    note:[["warn","<b>Trainer note — the ecosystem moved under this unit.</b> Worth 5 minutes in the room, because trainees <em>will</em> find contradictory advice online.<br><br><b>Dec 2022</b> — the entire Gorilla toolkit, mux included, was <b>archived</b>. <b>Jul 2023</b> — volunteers <b>revived and un-archived</b> it. <b>2026</b> — activity stayed low; <a href='https://endoflife.date/gorilla' target='_blank' rel='noopener'>endoflife.date</a> now tracks Gorilla as <b>discontinued</b>. Meanwhile <b>Go 1.22</b> added method matching and path wildcards to stdlib ServeMux, covering most of what people used mux for.<br><br><b>Teach:</b> gorilla's <em>concepts</em> — sub-routers, path variables, route middleware — because you'll meet them in existing IndiaMART code. For anything new, stdlib first, chi when you need sub-router composition."]],
    do:"Build the same two routes three times — gorilla, stdlib, chi — and write three sentences on which you'd choose for a new IndiaMART service and why."
  },

  { id:"3.6", min:75, title:"Build REST Services",
    outline:"What is REST? · CRUD and REST · HTTP requests and REST · A REST project in Go · NEW: API versioning, pagination patterns, request/response validation",
    res:[
      ["repo","ThreeDotsLabs/wild-workouts-go-ddd-example","https://github.com/ThreeDotsLabs/wild-workouts-go-ddd-example","github.com","<b>Best repo on this list.</b> A deliberately badly-written Go service refactored into a good one, commit by commit, with an article series explaining each step. Read it after you've written your own.",1],
      ["article","Mat Ryer — How I Write HTTP Services in Go","https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/","grafana.com","Again, because it's the best resource for the <em>structure</em> of a Go REST service"],
      ["doc","Tutorial: Developing a RESTful API with Go","https://go.dev/doc/tutorial/web-service-gin","go.dev","Official — uses Gin, which bridges into Day 4"],
      ["repo","go-playground/validator","https://github.com/go-playground/validator","github.com","Struct-tag request validation, the de-facto standard (and what Gin uses internally)"],
      ["article","Microsoft REST API Guidelines","https://github.com/microsoft/api-guidelines","github.com","Versioning and pagination conventions, language-agnostic"]
    ],
    tbl:{head:["Versioning approach","Example","Verdict"],rows:[
      ["URL path","<code>/api/v1/users</code>","<b>Most common, most visible, easiest to route and debug. Start here.</b>"],
      ["Header","<code>Accept: application/vnd.im.v1+json</code>","Purer REST, harder to curl, invisible in logs"],
      ["Query param","<code>/api/users?version=1</code>","Avoid — caches and proxies handle it badly"]
    ]},
    note:[
      ["info","<b>Pagination — two patterns.</b> <b>Offset/limit</b> (<code>?limit=20&amp;offset=40</code>) is simple and jumps to any page, but degrades on large offsets and can skip or duplicate rows when data shifts mid-scroll. Fine for admin UIs. <b>Cursor/keyset</b> (<code>?limit=20&amp;after=&lt;cursor&gt;</code>) is stable under concurrent writes and constant-time regardless of depth — <b>use this for anything user-facing at IndiaMART scale.</b> Always cap limit server-side and reject invalid values with 400 rather than silently clamping."],
      ["rule","Validate at the <b>transport boundary</b>, before anything reaches your service layer. Return a machine-readable error shape and use it everywhere: <code>{\"error\":\"validation_failed\",\"detail\":\"email is required\"}</code>. Never leak internal errors or stack traces to the client."]
    ],
    do:"Build a versioned REST API — /api/v1/<resource> — with full CRUD, cursor pagination, struct-tag validation and a consistent error envelope. In-memory for now; Day 4 swaps in MySQL."
  }
]},

{
  n: 4, title: "Files, Databases, gRPC, Testing, Deployment",
  blurb: "The widest day by far. Use the scope table below — several of these are demo-and-discuss, not full labs.",
  units: [

  { id:"4.1", min:45, title:"Files",
    outline:"Reading files, writing files · Reading and writing to any pipe · Multipart file upload using REST",
    res:[
      ["doc","os and io package docs","https://pkg.go.dev/io","pkg.go.dev","The best resource here, because the whole unit is one idea: io.Reader and io.Writer are the universal interfaces, and <em>everything</em> implements them.",1],
      ["doc","bufio","https://pkg.go.dev/bufio","pkg.go.dev"],
      ["doc","mime/multipart","https://pkg.go.dev/mime/multipart","pkg.go.dev"],
      ["repo","Go by Example: Reading & Writing Files","https://gobyexample.com/reading-files","gobyexample.com","Also Line Filters"],
      ["article","Alex Edwards — How to Process File Uploads in Go","https://www.alexedwards.net/blog/how-to-properly-parse-a-multipart-form","alexedwards.net","The multipart half of this unit, done properly"]
    ],
    note:[["rule","<b>The mental model that makes this unit trivial.</b> A file, a network connection, an HTTP body, a gzip stream, stdin, a bytes.Buffer and a strings.Reader are <em>all</em> just <code>io.Reader</code>s. Write your functions to take io.Reader, not *os.File, and they become testable with a one-line <code>strings.NewReader(\"test data\")</code> — no temp files, no fixtures. That habit is what your TOC's “reading and writing to any pipe” is pointing at."]],
    code:[{cap:"Stream large files; don't load them into memory",body:
`f, err := os.Open("huge.log")
defer f.Close()
sc := bufio.NewScanner(f)
for sc.Scan() { process(sc.Text()) }
if err := sc.Err(); err != nil { ... }   // ← people forget this constantly`},
    {cap:"Multipart upload — three things that bite",body:
`r.ParseMultipartForm(10 << 20)             // 10 MB cap; the rest spills to disk
file, hdr, err := r.FormFile("upload")
defer file.Close()

// 1. ALWAYS cap the size — unbounded uploads are a trivial DoS
// 2. NEVER trust hdr.Filename — it's attacker-controlled.
//    filepath.Base() it, or better, generate your own name.
//    "../../etc/passwd" is a real filename someone will send you.
// 3. Sniff the type yourself with http.DetectContentType on the
//    first 512 bytes. The client Content-Type is a suggestion.`}],
    do:"Add POST /api/upload to your Day 3 service: 5 MB cap, only image/png and image/jpeg verified by sniffing, stored under a generated UUID filename. Then try to break your own endpoint with a path-traversal filename."
  },

  { id:"4.2", min:75, title:"Databases",
    outline:"init and then main, importing to register with init, sql package · Working with MySQL",
    res:[
      ["article","go-database-sql.org","http://go-database-sql.org/","go-database-sql.org","The definitive database/sql tutorial. Driver registration, connection pooling, nil handling, and the mistakes everyone makes. <b>Best single resource in the whole of Day 4.</b>",1],
      ["doc","database/sql","https://pkg.go.dev/database/sql","pkg.go.dev","Read SetMaxOpenConns, SetMaxIdleConns, SetConnMaxLifetime carefully"],
      ["doc","Accessing relational databases","https://go.dev/doc/database/","go.dev","Official tutorial hub"],
      ["repo","go-sql-driver/mysql","https://github.com/go-sql-driver/mysql","github.com","The MySQL driver. Read the README on DSN parameters, especially parseTime=true."],
      ["repo","sqlc","https://sqlc.dev/","sqlc.dev","Generates type-safe Go from your SQL. Worth demoing — you write SQL, it writes the boilerplate. Better than an ORM."],
      ["repo","jmoiron/sqlx","https://github.com/jmoiron/sqlx","github.com","Thin extension over database/sql with struct scanning — the gentler step up"],
      ["repo","golang-migrate/migrate","https://github.com/golang-migrate/migrate","github.com","Schema migrations"]
    ],
    code:[{cap:"The init() + blank-import pattern your TOC calls out",body:
`import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"   // blank import: side effect only
)

// The driver's init() calls sql.Register("mysql", &MySQLDriver{}).
// The _ says "I import this purely to run its init()".
// That's why sql.Open("mysql", dsn) works with no visible reference —
// and why removing it gives you a RUNTIME error, not a compile error.`},
    {cap:"Pool configuration — the settings nobody sets until there's an incident",body:
`db.SetMaxOpenConns(25)                   // MUST be set; default is unlimited
db.SetMaxIdleConns(25)                   // match MaxOpenConns to avoid churn
db.SetConnMaxLifetime(5 * time.Minute)   // below MySQL wait_timeout / LB idle timeout`}],
    note:[
      ["warn","<b>sql.Open does not connect.</b> It validates arguments and prepares the pool lazily. Always follow with <code>db.PingContext(ctx)</code> at startup so a bad DSN fails immediately instead of on the first request."],
      ["rule","<b>The four non-negotiables.</b><ol><li>Always use the <b>Context variants</b> — QueryContext, ExecContext, QueryRowContext. That's how a cancelled HTTP request stops the database work behind it.</li><li>Always <code>defer rows.Close()</code>, and always check <code>rows.Err()</code> after the loop. A leaked rows holds a connection until GC — that's how pools starve.</li><li><b>Never build SQL with fmt.Sprintf.</b> Placeholders only. This is the entire SQL-injection answer in unit 4.9.</li><li>Transactions: <code>tx, _ := db.BeginTx(ctx, nil)</code> then <code>defer tx.Rollback()</code> immediately — rollback after a successful commit is a harmless no-op, and you never leak an open transaction on an early return.</li></ol>"]
    ],
    do:"Swap your Day 3 in-memory store for MySQL. Configure the pool. Add one transactional write path. Then deliberately kill MySQL mid-request and make sure your service returns a clean 503 instead of a panic."
  },

  { id:"4.3", min:40, title:"Gin Web Framework",
    outline:"Why Gin? · Building web applications using Gin · Latency discussion",
    res:[
      ["doc","Tutorial: Developing a RESTful API with Go and Gin","https://go.dev/doc/tutorial/web-service-gin","go.dev","Official Go tutorial, uses Gin, exactly scoped to this unit",1],
      ["repo","gin-gonic/gin","https://github.com/gin-gonic/gin","github.com"],
      ["doc","Gin examples","https://gin-gonic.com/docs/examples/","gin-gonic.com","Binding, validation, file upload, middleware, graceful shutdown"]
    ],
    tbl:{head:["Gin gives you","What it costs"],rows:[
      ["Radix-tree router with path params","A gin.Context that isn't http.Handler — some lock-in"],
      ["c.ShouldBindJSON + struct-tag validation","Magic you didn't write, in your request path"],
      ["Built-in logger + panic recovery","An extra dependency to keep patched"],
      ["Big middleware ecosystem","Slightly more to learn than stdlib"]
    ]},
    note:[
      ["info","<b>Since Go 1.22 the router argument for Gin is much weaker</b> — stdlib gives you method matching and path wildcards. What Gin still buys you is binding + validation + middleware ecosystem in one package. That's a legitimate reason. “The stdlib can't route” is no longer one."],
      ["rule","<b>On the latency discussion.</b> Gin's benchmarks measure <em>routing</em> overhead — hundreds of nanoseconds. Your real request is dominated by the database call (milliseconds) and network I/O. <b>Framework choice is essentially never your latency problem.</b> The lesson: measure before you optimise, and use the pprof and benchmarking skills from 4.5/4.6 rather than trusting a framework benchmark chart."]
    ],
    do:"Port your Day 3 REST API to Gin. Benchmark both with hey or wrk against the same database. Write down the difference — then write down what fraction of total latency it represents. That number is the point of the exercise."
  },

  { id:"4.4", min:45, title:"Build gRPC Services", flag:"Demo scope only",
    outline:"Protobuf vs JSON · Synchronous gRPC · Asynchronous gRPC · Unidirectional & bidirectional streaming",
    res:[
      ["doc","gRPC Go Quick Start","https://grpc.io/docs/languages/go/quickstart/","grpc.io","Official, working service in about 15 minutes. Follow with the Basics Tutorial, which covers all four streaming modes.",1],
      ["doc","Protocol Buffers — Go tutorial","https://protobuf.dev/getting-started/gotutorial/","protobuf.dev"],
      ["repo","grpc/grpc-go — examples/","https://github.com/grpc/grpc-go/tree/master/examples","github.com","A runnable sample for each streaming mode"],
      ["article","protobuf.dev — encoding","https://protobuf.dev/programming-guides/encoding/","protobuf.dev","<em>Why</em> protobuf is smaller — 10 minutes if the JSON-vs-protobuf question comes up"]
    ],
    tbl:{head:["","JSON","Protobuf"],rows:[
      ["Human readable","curl-able, log-able","binary — you need tooling"],
      ["Payload size","Larger","~3–10× smaller"],
      ["Parse speed","Slower (reflection)","Faster (generated code)"],
      ["Schema","Optional, drifts","<b>Enforced, versioned, generated</b>"],
      ["Browser support","Native","Needs grpc-web or a gateway"],
      ["Debuggability","Trivial","Needs grpcurl"]
    ]},
    code:[{cap:"The four modes",body:
`rpc GetUser   (Req)        returns (Resp);        // 1. unary — "synchronous"
rpc ListUsers (Req)        returns (stream Resp); // 2. server streaming
rpc Upload    (stream Req) returns (Resp);        // 3. client streaming
rpc Chat      (stream Req) returns (stream Resp); // 4. bidirectional`}],
    note:[
      ["rule","<b>The real reason to use gRPC internally isn't speed — it's the enforced schema.</b> A .proto is a contract both sides compile against, so a breaking change fails at build time instead of at 2am. gRPC for <b>service-to-service</b>; JSON/REST at the <b>public edge</b>."],
      ["info","<b>A note on “asynchronous gRPC”.</b> gRPC-Go has no separate async API the way gRPC-C++ does — every Go call is a blocking call on a goroutine, which <em>is</em> Go's async model. What your TOC means in practice is <b>streaming</b> plus fire-and-forget patterns. Worth saying plainly so nobody hunts for an AsyncClient that doesn't exist."]
    ],
    do:"Define a .proto with one unary and one server-streaming method. Generate with protoc-gen-go + protoc-gen-go-grpc, implement the server, call it from a Go client, inspect with grpcurl. Then stop — the depth belongs in the 30-day plan."
  },

  { id:"4.5", min:75, title:"Unit Testing",
    outline:"Writing and running unit tests · Table driven tests, go cover · Debugging and profiling · NEW: Mocking & test doubles",
    res:[
      ["repo","quii/learn-go-with-tests","https://github.com/quii/learn-go-with-tests","github.com","Free, TDD-driven, and it teaches Go <em>through</em> testing rather than bolting testing on at the end. <b>Best resource in the entire roadmap for this unit.</b>",1],
      ["doc","testing","https://pkg.go.dev/testing","pkg.go.dev"],
      ["doc","net/http/httptest","https://pkg.go.dev/net/http/httptest","pkg.go.dev","ResponseRecorder and httptest.Server — essential for testing your Day 3 handlers"],
      ["article","go.dev/wiki/TableDrivenTests","https://go.dev/wiki/TableDrivenTests","go.dev","The canonical Go test idiom, exactly as your TOC names it"],
      ["article","Using Subtests and Sub-benchmarks","https://go.dev/blog/subtests","go.dev","t.Run, t.Parallel"],
      ["article","Profiling Go Programs","https://go.dev/blog/pprof","go.dev"],
      ["repo","go-delve/delve","https://github.com/go-delve/delve","github.com","The Go debugger, for the debugging half of this unit"]
    ],
    code:[{cap:"Table-driven test — the shape reviewers expect",body:
`func TestValidate(t *testing.T) {
    tests := []struct {
        name    string
        in      Input
        wantErr bool
    }{
        {"valid",         Input{Email: "a@b.com"}, false},
        {"missing email", Input{},                 true},
        {"bad email",     Input{Email: "nope"},    true},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := Validate(tt.in)
            if (err != nil) != tt.wantErr {
                t.Errorf("Validate() error = %v, wantErr %v", err, tt.wantErr)
            }
        })
    }
}`},
    {cap:"Coverage",body:
`go test -race -coverprofile=cover.out ./...
go tool cover -html=cover.out          # annotated source in a browser
go tool cover -func=cover.out          # per-function summary`}],
    note:[
      ["warn","<b>Your TOC's phrasing predates a change.</b> The original <code>github.com/golang/mock</code> was <b>archived by Google in June 2023</b>. The maintained successor is <b><code>go.uber.org/mock</code></b> — same API, same mockgen, so migration is a one-line import change. <b>Teach go.uber.org/mock, not golang/mock.</b><br><code>go install go.uber.org/mock/mockgen@latest</code>"],
      ["rule","<b>Mocking, in preference order.</b><ol><li><b>Hand-written fakes.</b> For a 1–3 method interface, a hand-written struct is clearer than any generated mock and adds zero dependencies. <b>This is the idiomatic Go default — start here.</b></li><li><a href='https://github.com/uber-go/mock' target='_blank' rel='noopener'>uber-go/mock</a> — many large interfaces, strict call/order assertions</li><li><a href='https://github.com/stretchr/testify' target='_blank' rel='noopener'>stretchr/testify</a> — require/assert plus testify/mock. Very widely used; be aware it pulls you away from stdlib idiom.</li><li><a href='https://github.com/vektra/mockery' target='_blank' rel='noopener'>vektra/mockery</a> — friendlier CLI, better generics support</li><li><a href='https://github.com/DATA-DOG/go-sqlmock' target='_blank' rel='noopener'>go-sqlmock</a> for the DB layer, or <a href='https://github.com/testcontainers/testcontainers-go' target='_blank' rel='noopener'>testcontainers-go</a> to run real MySQL in Docker. Slower, far more honest.</li></ol>"],
      ["info","Target 60–80% coverage on business logic. Chasing 100% produces tests that assert implementation details and break on every refactor."]
    ],
    do:"Get your Day 3 service to ≥70% coverage with table-driven tests. Test handlers with httptest.ResponseRecorder, mock the notifier with a hand-written fake, then regenerate the same mock with mockgen — and compare which test you'd rather read in six months."
  },

  { id:"4.6", min:30, title:"Benchmarking", flag:"Demo scope",
    outline:"What are benchmarks? · Writing and running benchmarks · Additional libraries for testing",
    res:[
      ["doc","testing — Benchmarks","https://pkg.go.dev/testing#hdr-Benchmarks","pkg.go.dev","Official, and it explains the b.N loop, which is the one thing people get wrong",1],
      ["article","Dave Cheney — High Performance Go Workshop","https://dave.cheney.net/high-performance-go-workshop/dotgo-paris.html","dave.cheney.net","For <em>methodology</em>: how to avoid measuring the wrong thing, and how to know when a difference is real"],
      ["doc","benchstat","https://pkg.go.dev/golang.org/x/perf/cmd/benchstat","pkg.go.dev","Statistical comparison of before/after. <b>The tool that turns benchmarking from vibes into evidence.</b>"],
      ["article","Profiling Go Programs","https://go.dev/blog/pprof","go.dev","Profile first, then benchmark the hot path"]
    ],
    code:[{cap:"The workflow that actually produces a defensible number",body:
`go test -bench=. -benchmem -count=10 ./... > old.txt
# ...make your change...
go test -bench=. -benchmem -count=10 ./... > new.txt
benchstat old.txt new.txt          # is the difference significant?`}],
    note:[["rule","<b>The four rules.</b><ol><li><code>b.N</code> is chosen by the framework — never hardcode an iteration count.</li><li><code>b.ResetTimer()</code> after expensive setup.</li><li><b>-benchmem always.</b> Allocations are usually the real story; ns/op is the symptom.</li><li><b>-count=10 + benchstat.</b> A single run tells you nothing — machine noise is larger than most optimisations.</li></ol>"]],
    do:"Benchmark += string concatenation against strings.Builder for 1000 iterations. Look at allocs/op, not time. Then benchmark append into make([]int, 0, n) versus a nil slice. Both results are memorable."
  },

  { id:"4.7", min:75, title:"Deploy and Monitor Services",
    outline:"Docker build & deploy · Track outbound requests, DB calls · GC, goroutine activity, memory · NEW: Structured logging & correlation IDs · Basic Prometheus metrics",
    res:[
      ["article","Structured Logging with slog","https://go.dev/blog/slog","go.dev","<b>log/slog has been in the standard library since Go 1.21</b> — the modern answer for the logging half of this unit",1],
      ["doc","Docker's Go language guide","https://docs.docker.com/language/golang/","docs.docker.com","Build, run, multi-stage images. Officially maintained."],
      ["doc","log/slog","https://pkg.go.dev/log/slog","pkg.go.dev"],
      ["repo","prometheus/client_golang","https://github.com/prometheus/client_golang","github.com","See examples/random for the minimal working setup"],
      ["repo","rs/zerolog","https://github.com/rs/zerolog","github.com","Zero-allocation JSON logger — the fastest option, and the one in your TOC"],
      ["article","A Guide to the Go Garbage Collector","https://go.dev/doc/gc-guide","go.dev","Official, and the best explanation of the GC overview this unit asks for"],
      ["article","OpenTelemetry Go","https://opentelemetry.io/docs/languages/go/","opentelemetry.io","Distributed tracing — for the “track outbound requests and DB calls” line"]
    ],
    code:[{cap:"Multi-stage Dockerfile — the ~15 MB image. The most impressive five minutes of Day 4.",body:
`FROM golang:1.26 AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download                       # cached layer — deps change rarely
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app ./cmd/server

FROM gcr.io/distroless/static-nonroot
COPY --from=build /app /app
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/app"]`},
    {cap:"Correlation IDs — the pattern, in full",body:
`func RequestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := r.Header.Get("X-Request-ID")
        if id == "" { id = uuid.NewString() }
        ctx := context.WithValue(r.Context(), ctxKeyReqID{}, id)
        w.Header().Set("X-Request-ID", id)
        logger := slog.With("request_id", id)
        ctx = context.WithValue(ctx, ctxKeyLogger{}, logger)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}`}],
    note:[
      ["warn","<b>On the logging libraries in your TOC.</b> <code>log/slog</code> is now <b>stdlib</b> and should be the default — zero dependencies, structured, and every library is converging on its Handler interface. <b>logrus is in maintenance mode</b> (its own README says so). <b>zerolog is actively maintained and faster than slog</b> — a legitimate choice when logging is genuinely hot-path. <b>Teach slog; mention zerolog as the performance option; treat logrus as legacy you'll meet in old code.</b>"],
      ["rule","<b>Propagate the request-ID header on every outbound call</b> — HTTP, gRPC, Kafka. That's what makes one user complaint traceable across six services, and it's why unit 3.2's context propagation mattered."],
      ["info","<b>The four golden signals to expose on /metrics:</b> request <b>rate</b>, <b>errors</b>, <b>duration</b> (a histogram, so you get p50/p95/p99) and <b>saturation</b> (in-flight requests, DB pool utilisation). <code>promhttp.Handler()</code> gives you Go runtime metrics — goroutine count, heap, GC pause — for free, covering your TOC's “goroutine activity and memory” line."],
      ["warn","<b>Never expose /debug/pprof or /metrics publicly.</b> Bind them to an internal port or put them behind auth. /debug/pprof will happily hand an attacker a heap dump."]
    ],
    do:"Containerise with the multi-stage build above and confirm the image is under 30 MB. Add slog JSON logging with request-ID propagation, a /metrics endpoint with a duration histogram, and /debug/pprof on a separate internal port. Then load-test it and read the heap profile."
  },

  { id:"4.8", min:30, title:"Discussion on Frameworks in Go", flag:"Discussion, 30 min",
    outline:"Framework for microservices in Go · Gin web application framework",
    res:[
      ["article","Mat Ryer — How I Write HTTP Services in Go","https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/","grafana.com","The strongest argument that for most services you don't need a framework at all",1],
      ["repo","awesome-go — Web Frameworks","https://github.com/avelino/awesome-go#web-frameworks","github.com","The full landscape"],
      ["repo","go-kit/kit","https://github.com/go-kit/kit","github.com","Microservice toolkit — explicit, verbose, powerful"],
      ["repo","go-micro/go-micro","https://github.com/go-micro/go-micro","github.com","Opinionated microservices framework with service discovery baked in"]
    ],
    tbl:{head:["Option","Reach for it when"],rows:[
      ["<b>stdlib net/http</b>","Default since Go 1.22. Most services. Zero dependencies, zero lock-in."],
      ["<b>chi</b>","You want sub-router composition and a middleware ecosystem, still http.Handler-native"],
      ["<b>Gin</b>","You want binding + validation + middleware in one package and accept gin.Context"],
      ["<b>Echo</b>","Similar to Gin, more batteries, higher lock-in"],
      ["<b>Fiber</b>","Only if chasing raw throughput. Built on fasthttp, <b>not net/http</b> — incompatible with the entire http.Handler middleware ecosystem. Know that before adopting."],
      ["<b>go-kit / go-micro</b>","Large microservice estates needing discovery, transport abstraction, circuit breaking"]
    ]},
    note:[["rule","<b>The point of this unit isn't to pick a winner.</b> It's this: Go's stdlib is unusually strong, so the Go community reaches for frameworks far less than the Java or Node communities do. Every dependency is something you patch, audit and eventually migrate off. Start with stdlib; add a framework when you can name the specific problem it solves."]],
    do:"Each trainee names one framework and argues for it in two minutes. Then the group picks a default for a new IndiaMART service and writes down why. The written rationale is the deliverable."
  },

  { id:"4.9", min:50, title:"Security Basics",
    outline:"Input validation · SQL injection prevention · Secrets & configuration management",
    res:[
      ["repo","OWASP Go Secure Coding Practices Guide","https://github.com/OWASP/Go-SCP","github.com","Free, Go-specific, a chapter per topic. <b>Best single resource for this unit</b> and the one to hand out.",1],
      ["article","govulncheck","https://go.dev/blog/govulncheck","go.dev","Official vulnerability scanner. <b>Put this in CI on Monday.</b> It reports only vulnerabilities your code actually <em>reaches</em>, so the signal-to-noise beats a generic dependency scanner."],
      ["doc","golang.org/x/crypto/bcrypt","https://pkg.go.dev/golang.org/x/crypto/bcrypt","pkg.go.dev","Password hashing. <b>Never</b> SHA-256 a password."],
      ["doc","crypto/subtle","https://pkg.go.dev/crypto/subtle","pkg.go.dev","ConstantTimeCompare for tokens, to avoid timing attacks"],
      ["repo","securego/gosec","https://github.com/securego/gosec","github.com","Static security analysis; also available as a golangci-lint linter"],
      ["article","OWASP Top 10","https://owasp.org/www-project-top-ten/","owasp.org","The vulnerability classes themselves"]
    ],
    code:[{cap:"SQL injection — the entire answer, in two lines",body:
`// ❌ NEVER
db.Query(fmt.Sprintf("SELECT * FROM users WHERE email = '%s'", email))

// ✅ ALWAYS — placeholders; driver sends value and query separately
db.QueryContext(ctx, "SELECT * FROM users WHERE email = ?", email)`}],
    note:[
      ["rule","<b>Input validation — the principles.</b><ol><li><b>Validate at the boundary</b>, before anything reaches your service layer.</li><li><b>Allow-list, not deny-list.</b> Define what's valid; reject everything else. Deny-lists always have a gap.</li><li><b>Bound everything</b> — string lengths, array sizes, request bodies (http.MaxBytesReader), file uploads, pagination limits.</li><li><code>DisallowUnknownFields()</code> on your JSON decoder.</li><li><b>Escape on output, not input.</b> html/template does this contextually (unit 3.3).</li></ol>"],
      ["warn","<b>Secrets.</b> Never in the repo — .gitignore your .env on day one and audit with <a href='https://github.com/gitleaks/gitleaks' target='_blank' rel='noopener'>gitleaks</a> before your first push. Never log a secret: give secret types a <code>String()</code> that returns <code>[REDACTED]</code>, so even an accidental <code>%v</code> is safe. Rotate on exposure — a secret pushed to GitHub is compromised even if you force-push it away, because the commit is already scraped."],
      ["rule","<b>Three more that belong in a first backend service.</b> Hash passwords with <b>bcrypt</b> (cost ≥ 12) and compare with <code>bcrypt.CompareHashAndPassword</code>, never <code>==</code>. Return <b>the same error</b> for “unknown user” and “wrong password”, or you've built an account-enumeration oracle for free. Return <b>404, not 403</b>, when someone requests another user's resource — a 403 confirms the resource exists, which is exactly what an enumeration attack needs."]
    ],
    do:"Run govulncheck ./... and gosec ./... against your Day 3 service and fix everything. Then deliberately write the vulnerable fmt.Sprintf query, exploit it with ' OR '1'='1, and fix it. Doing the attack once is worth ten slides about it."
  },

  { id:"4.10", min:720, title:"Capstone Project", flag:"3–4 days, auto-graded out of 10",
    outline:"End-to-end project integrating REST + Database + Testing + Docker deployment",
    res:[
      ["article","GoShort — capstone brief","#capstone","this package","REST + MySQL + tests + Docker, with an auto-grader that clones your commit, runs 64 black-box tests and returns a score out of 10 with a report naming every lost point",1]
    ],
    tbl:{head:["TOC requirement","Where it lands in GoShort","Units"],rows:[
      ["<b>REST</b>","Versioned CRUD API, validation, pagination, consistent error envelope","3.4, 3.6"],
      ["<b>Database</b>","MySQL via database/sql, pool config, one transactional path","4.2"],
      ["<b>Testing</b>","Table-driven, httptest handlers, mocked store, ≥60% coverage","4.5"],
      ["<b>Docker</b>","Multi-stage build, &lt;30 MB image, graceful shutdown","4.7"],
      ["<i>bonus</i>","bcrypt auth, ownership isolation, slog + correlation IDs, /metrics","4.7, 4.9"]
    ]},
    do:"Build GoShort — a URL shortener with user accounts. Register/login with bcrypt, bearer tokens, per-user link ownership, base62 short codes, click analytics, MySQL persistence, table-driven tests and a multi-stage Docker build. Submit repo URL + commit SHA."
  }
]}
];

/* ---- Scope guidance: what realistically fits in 4 classroom days ---- */
const SCOPE = [
  ["full","Full depth in the room","1.1–1.9, 2.1, 2.3–2.5, 3.1, 3.3, 3.4","Teach + lab. The foundation — don't rush it."],
  ["partial","Taught, needs reinforcement after","1.10, 2.2, 2.6, 3.2, 3.6, 4.1, 4.2, 4.5, 4.7","Teach + short lab, then assign in the 30-day plan"],
  ["demo","Demo / discussion only","3.5, 4.3, 4.4, 4.6, 4.8, 4.9","Live demo and Q&A. Your TOC already scopes gRPC this way."],
  ["after","Post-workshop","4.10 Capstone","3–4 days of individual work, auto-graded"]
];

/* ---- Errata: where the TOC has aged ---- */
const ERRATA = [
  ["dep","2.2","Deprecated since 2020, superseded by modules","Mention as history only"],
  ["gorilla/mux","3.5","Archived Dec 2022, revived Jul 2023, now tracked as discontinued. Go 1.22 stdlib covers most use cases.","Concepts yes; stdlib or chi for anything new"],
  ["gomock","4.5","github.com/golang/mock archived by Google, June 2023","go.uber.org/mock — same API, one-line import change"],
  ["logrus","4.7","Maintenance mode, no new features. log/slog is stdlib since Go 1.21.","slog default; zerolog when hot-path; logrus as legacy"]
];

/* ---- Indian creators, mapped to the units they help with ---- */
const CREATORS = [
  ["Hitesh Choudhary — Let's go with golang","Day 1–2 fundamentals in Hindi. The most-watched Hindi Go series, with code on GitHub so you can follow along.","https://www.youtube.com/playlist?list=PLRAV69dS1uWQGDQoBYMZWKjzuhCaOnBpa","Code: github.com/hiteshchoudhary/golang","https://github.com/hiteshchoudhary/golang"],
  ["Coder's Gyan — Master Golang in One Video (Hindi)","The catch-up video if you miss a day. Ends in a real-world API project — good companion to units 3.4 and 3.6.","https://www.youtube.com/watch?v=yZgwW6Yuc_E","",""],
  ["Telusko (Navin Reddy)","Slower-paced Go fundamentals in Indian English. Good if Hitesh's pace is too fast.","https://www.youtube.com/@Telusko","",""],
  ["Arpit Bhayani — Asli Engineering","Not a Go tutorial — backend depth. Rate limiters, DB internals, system design. Best companion to units 3.2 and 4.2.","https://www.youtube.com/@AsliEngineering","",""],
  ["Kunal Kushwaha","Docker, Kubernetes, cloud-native — the ecosystem unit 4.7 lives in.","https://www.youtube.com/@KunalKushwaha","",""]
];

const INTL = [
  ["The Go Programming Language (official)","https://www.youtube.com/@golang","GopherCon talks — three are mandatory"],
  ["Anthony GG","https://www.youtube.com/@anthonygg_","Production backend patterns. Highest signal on this list."],
  ["Jon Calhoun","https://www.calhoun.io/","Pointers, slices, interfaces — and Gophercises"],
  ["TechWorld with Nana","https://www.youtube.com/@TechWorldwithNana","Toolchain and Docker"],
  ["Melkey","https://www.youtube.com/@MelkeyDev","Modern Go backends"]
];

/* ---- 30-day consolidation ---- */
const PLAN = [
  ["Week 1","Re-do Day 1 + 2 units solo, no notes. Work through learn-go-with-tests start to finish.","All exercises pushed to a personal repo"],
  ["Week 2","Concurrency depth: re-implement the search engine and load balancer from scratch. Read 100go.co concurrency section end to end.","Both projects, -race clean, zero goroutine leaks"],
  ["Week 3","Build the capstone (4.10).","Submitted repo + auto-graded score"],
  ["Week 4","Read real Go: geektutu/7days-golang or ThreeDotsLabs/wild-workouts. Then review a teammate's capstone against Code Review Comments.","10 written review comments on someone else's PR"]
];

const INDEX = {
  "Official": [["Tour","https://go.dev/tour/"],["Effective Go","https://go.dev/doc/effective_go"],["Spec","https://go.dev/ref/spec"],["pkg.go.dev","https://pkg.go.dev/std"],["Blog","https://go.dev/blog/"],["Wiki","https://go.dev/wiki/"],["FAQ","https://go.dev/doc/faq"],["Playground","https://go.dev/play/"],["Modules Ref","https://go.dev/ref/mod"],["GC Guide","https://go.dev/doc/gc-guide"]],
  "Learn": [["Go by Example","https://gobyexample.com/"],["learn-go-with-tests","https://github.com/quii/learn-go-with-tests"],["100 Go Mistakes","https://100go.co/"],["Exercism","https://exercism.org/tracks/go"],["Gophercises","https://gophercises.com/"],["inancgumus/learngo","https://github.com/inancgumus/learngo"],["go-database-sql.org","http://go-database-sql.org/"]],
  "Repos": [["awesome-go","https://github.com/avelino/awesome-go"],["go-patterns","https://github.com/tmrts/go-patterns"],["7days-golang","https://github.com/geektutu/7days-golang"],["wild-workouts","https://github.com/ThreeDotsLabs/wild-workouts-go-ddd-example"],["project-layout","https://github.com/golang-standards/project-layout"],["uber-go/guide","https://github.com/uber-go/guide"],["OWASP Go-SCP","https://github.com/OWASP/Go-SCP"],["cheat-sheet","https://github.com/a8m/golang-cheat-sheet"]],
  "Blogs": [["Dave Cheney","https://dave.cheney.net/"],["Alex Edwards","https://www.alexedwards.net/blog"],["Ardan Labs","https://www.ardanlabs.com/blog/"],["Three Dots Labs","https://threedots.tech/"],["Mat Ryer on HTTP services","https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/"],["Google Go Style Guide","https://google.github.io/styleguide/go/"]],
  "Stay current": [["Golang Weekly","https://golangweekly.com/"],["Go Time podcast","https://changelog.com/gotime"],["r/golang","https://www.reddit.com/r/golang/"],["Gophers Slack","https://invite.slack.golangbridge.org/"]]
};
