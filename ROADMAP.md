# Golang Learning Roadmap
## Aligned to "Get Set GO" — 4-Day Workshop TOC
### Back End Developers + AE Freshers · IndiaMART Tech Shubharambh

**Target:** Go 1.26 (current stable) · **Format:** every TOC unit → its best resources
**Legend:** 📘 Official docs · 🎥 Video · 🐙 GitHub · 📝 Article/blog · 🛠 Practice · 🏆 **Best single resource for this unit**

---

## How to use this roadmap

1. **One unit at a time.** Each unit below maps 1:1 to a row in the workshop TOC. Do them in order — the sequence is deliberate.
2. **🏆 first, everything else only if needed.** Each unit has exactly one 🏆 marked resource. If you're short on time, do only those and the 🛠 practice. The rest are there when a topic doesn't click.
3. **Type the code.** Don't copy-paste. Muscle memory matters for the first three weeks.
4. **`go doc` before Google.** Try `go doc strings.Builder` in your terminal right now. The stdlib docs are the primary source; everything else is commentary.
5. **Read stdlib source.** Ctrl+Click into `sort.Slice`, `sync.WaitGroup`, `http.ServeMux`. It's the best Go you will ever read.

> ⚠️ **Reality check on the 4 days.** This TOC spans Hello World → gRPC → Prometheus. That is roughly a 3-week syllabus compressed into 4 classroom days. Treat the workshop as **guided exposure**, not mastery, and use the [30-day consolidation plan](#-post-workshop--30-day-consolidation-plan) at the end. Section 🎓 flags which units realistically land in the room and which need self-study afterwards.

---

## Day 0 — Do this before you walk in

Two hours, the night before. It's the difference between spending Day 1 learning Go and spending Day 1 fighting your PATH.

| | Resource |
|---|---|
| 📘 | [Download & install Go](https://go.dev/doc/install) — install **Go 1.26** |
| 🏆 📘 | **[A Tour of Go](https://go.dev/tour/)** — do the **Basics** and **Methods** modules. This is the single highest-leverage 90 minutes you can spend before the workshop. |
| 🐙 | [a8m/golang-cheat-sheet](https://github.com/a8m/golang-cheat-sheet) — print it, bring it |
| 🎥 | [Hitesh Choudhary — *Let's go with golang*](https://www.youtube.com/playlist?list=PLRAV69dS1uWQGDQoBYMZWKjzuhCaOnBpa) Ep. 1–3 (Hindi) — [code files](https://github.com/hiteshchoudhary/golang) |

**Verify your setup:**
```bash
go version          # expect go1.26.x
go env GOPATH GOMODCACHE
git --version
go install golang.org/x/tools/cmd/goimports@latest
```

---

## 🔖 The Six Anchors — bookmark these now

| Resource | Why | Link |
|---|---|---|
| **A Tour of Go** | Interactive, official, complete | https://go.dev/tour/ |
| **Go Playground** | Share reproducible snippets in PRs and Slack instead of screenshots | https://go.dev/play/ |
| **Go by Example** | Copy-ready snippet for nearly every unit in this TOC | https://gobyexample.com/ |
| **pkg.go.dev** | Search-first destination for any package | https://pkg.go.dev/std |
| **Effective Go** | The style bible — read once in Week 1, again in Week 3 | https://go.dev/doc/effective_go |
| **Go Code Review Comments** | The exact checklist your reviewer will use on your PR | https://go.dev/wiki/CodeReviewComments |

**Three GitHub repos that carry the whole roadmap:**
- 🐙 [**quii/learn-go-with-tests**](https://github.com/quii/learn-go-with-tests) — free TDD-driven book. Referenced repeatedly below. If you finish only one thing outside the workshop, finish this.
- 🐙 [**teivah/100-go-mistakes**](https://github.com/teivah/100-go-mistakes) ([100go.co](https://100go.co/)) — the mistakes you're about to make, with fixes
- 🐙 [**avelino/awesome-go**](https://github.com/avelino/awesome-go) — check here *before* you `go get` anything

---
---

# 📅 DAY 01 — Language Foundations

---

### 1.1 · Why Go?
*The beginnings of Go · Go vs other languages · Supported platforms, cross compiling · Key distinguishing features*

- 🏆 🎥 **[Rob Pike — *Go Proverbs*](https://www.youtube.com/@golang)** (15 min, official @golang channel) — the design philosophy in one sitting. Nothing else explains *why* Go looks like this as efficiently.
- 📘 [Go FAQ](https://go.dev/doc/faq) — read §"Origins" and §"Design". This is where "why no generics for 12 years", "why no exceptions", "why no inheritance" are answered by the authors.
- 📘 [Cross compilation](https://go.dev/wiki/WindowsCrossCompiling) — and try it yourself:
  ```bash
  GOOS=linux   GOARCH=amd64 go build -o app-linux
  GOOS=windows GOARCH=amd64 go build -o app.exe
  GOOS=darwin  GOARCH=arm64 go build -o app-mac
  ```
  One command, three OSes, zero runtime dependencies. **This is the single most convincing demo for a room of Java/Python developers** — run it live.
- 📝 [Go at Google: Language Design in the Service of Software Engineering](https://go.dev/talks/2012/splash.article) — Rob Pike's essay on the problems Go was built to solve at Google scale.

🛠 **Practice:** cross-compile a Hello World for all three platforms. Note the binary size and that it needs no JVM, no interpreter, no `node_modules`.

---

### 1.2 · Setting Up Go
*Downloading & installing · Go environment variables · Why Git/Mercurial? · Go Playground*

- 🏆 📘 **[Tutorial: Get started with Go](https://go.dev/doc/tutorial/getting-started)** — official, 15 minutes, gets you from zero to a running module.
- 📘 [Installation](https://go.dev/doc/install) · [`go env` and environment variables](https://pkg.go.dev/cmd/go#hdr-Environment_variables)
- 📘 [Go Playground](https://go.dev/play/) — and read [Inside the Go Playground](https://go.dev/blog/playground) to understand what it actually does (it compiles server-side in a sandbox, with a faked clock — which is why `time.Now()` always returns 2009).

> **On "Why Git, Mercurial, etc.?"** — this line is a holdover from the pre-modules era, when `go get` cloned directly from VCS. Since Go 1.13 the toolchain fetches through the [Go module proxy](https://proxy.golang.org) and verifies against the [checksum database](https://sum.golang.org). **You still need Git** for your own source control and for `go get` on private repos (`GOPRIVATE`), but the toolchain no longer needs Mercurial/Bazaar/SVN for public packages.

🛠 **Practice:** run `go env`, then explain what `GOPATH`, `GOMODCACHE`, `GOPROXY` and `GOSUMDB` each do.

---

### 1.3 · Basic Program, Go Tools
*Hello World · packages, import, main · `go build` · `go run`*

- 🏆 📘 **[How to Write Go Code](https://go.dev/doc/code)** — official. Explains packages, imports, `main`, and the build/run/install lifecycle properly. Most tutorials skip the *why*; this one doesn't.
- 📘 [`go` command reference](https://pkg.go.dev/cmd/go) — skim once, return often
- 🐙 [golang/example](https://github.com/golang/example) — canonical minimal Go programs maintained by the Go team
- 🎥 [TechWorld with Nana — *Golang Full Course*](https://www.youtube.com/@TechWorldwithNana) (first hour) — clean, well-paced walkthrough of the toolchain

**Reference card — print and pin:**
```
go run .                       # compile + run, no binary left behind
go build -o bin/app ./cmd/app  # produce a binary
go install ./cmd/app           # build + put it in $GOPATH/bin
go vet ./...                   # static analysis — run before EVERY commit
gofmt -l -w .                  # format (or goimports, which also fixes imports)
go doc strings.Builder         # inline docs, no browser needed
go clean -cache                # when the build cache misbehaves
```

🛠 **Practice:** write Hello World in a package `main`, then move a function into a second package `greet` and import it. Break the visibility (lowercase the function name) and read the compiler error carefully.

---

### 1.4 · Working with Strings
*String functions · String formatting*

- 🏆 📝 **[Strings, bytes, runes and characters in Go](https://go.dev/blog/strings)** — official blog. The one article that explains why `len("नमस्ते")` is **18**, not 6, and why `for i, r := range s` doesn't increment `i` by one. Non-negotiable reading for an Indian-language product.
- 📘 [`strings`](https://pkg.go.dev/strings) · [`fmt`](https://pkg.go.dev/fmt) (read the verb table at the top) · [`strconv`](https://pkg.go.dev/strconv) · [`unicode/utf8`](https://pkg.go.dev/unicode/utf8)
- 🐙 [Go by Example: String Functions](https://gobyexample.com/string-functions) · [String Formatting](https://gobyexample.com/string-formatting)
- 📝 [100go.co](https://100go.co/) §strings — especially **"inefficient string concatenation"**: use `strings.Builder`, not `+=` in a loop.

🛠 **Practice:** write `wordfreq.go` — read a text file, count word frequency, print the top 10 sorted by count desc then alphabetically. Use `bufio.Scanner`, `strings.Fields`, `sort.Slice`. Then run it on a Hindi text file and explain the byte-vs-rune difference in your output.

---

### 1.5 · Variables and Assignment
*`var`, `:=`, `new` · Multiple assignment · Values · Variables · Constants*

- 🏆 📘 **[A Tour of Go — Basics](https://go.dev/tour/basics/1)** through *Constants* — 12 interactive slides, and you can't skim them because you have to run each one.
- 📘 [Effective Go § Names, § Constants](https://go.dev/doc/effective_go#names)
- 📝 [Constants (Go blog)](https://go.dev/blog/constants) — Rob Pike on why Go's untyped constants have arbitrary precision. Explains why `const big = 1 << 62` compiles but `var x int8 = 300` doesn't.
- 🐙 [Go by Example: Variables](https://gobyexample.com/variables) · [Constants](https://gobyexample.com/constants)

**The three you must be able to distinguish:**
| | Use it for | Scope |
|---|---|---|
| `var x int` | Zero-valued declaration; package-level vars | Anywhere |
| `x := 10` | Declare + infer type | **Function bodies only** |
| `p := new(int)` | Allocate, get a `*int` pointing at the zero value | Anywhere |

🛠 **Practice:** write an `iota` block for HTTP status categories (`Informational = 1 + iota`, `Success`, `Redirect`, ...). Then add `String()` to it and try [`stringer`](https://pkg.go.dev/golang.org/x/tools/cmd/stringer) to generate it for you.

---

### 1.6 · Errors
*Errors in Go · Error conventions · Custom errors, `panic` and `recover`, `defer`*

- 🏆 📝 **[Working with Errors in Go 1.13](https://go.dev/blog/go1.13-errors)** — official. `%w` wrapping, `errors.Is`, `errors.As`. This is the modern standard and **this is how we handle errors at IndiaMART.** Most older tutorials predate it and will teach you the wrong thing.
- 📝 [Error handling and Go](https://go.dev/blog/error-handling-and-go) — the foundational piece; read it *before* the 1.13 article
- 📝 [Defer, Panic and Recover](https://go.dev/blog/defer-panic-and-recover) — official; covers LIFO ordering and argument-evaluation timing
- 📝 [Dave Cheney — *Don't just check errors, handle them gracefully*](https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully) — 🏆 for *judgement*: when to wrap, when to log, when to return
- 📘 [`errors`](https://pkg.go.dev/errors) — note `errors.Join` (Go 1.20+) for combining multiple failures

**The rules, in order of how often they're broken:**
1. Errors are **values**, returned **last**, checked with `if err != nil`.
2. Wrap with `%w` when you add context: `fmt.Errorf("fetch user %s: %w", id, err)`.
3. `errors.Is` compares against a **sentinel** (`ErrNotFound`). `errors.As` extracts a **type** (`*ValidationError`).
4. Error strings are lowercase, no trailing punctuation: `"user not found"`, not `"User not found."`.
5. **Never log and return the same error.** Pick one. Logging at every layer is how you get 40 lines of noise for one failure.
6. `panic` is for unrecoverable programmer errors. In library code, almost never. `recover` belongs in exactly one place: your HTTP panic-recovery middleware.

🛠 **Practice:** define `ErrNotFound` (sentinel) and a `ValidationError` struct type. Build a 3-layer chain — handler → service → repo — wrapping at each layer. Then map to `404` / `400` / `500` in the handler using `errors.Is` and `errors.As`.

---

### 1.7 · Functions
*Writing a function · Return values · Multiple return values · Closures*

- 🏆 📘 **[A Tour of Go — Functions & Closures](https://go.dev/tour/moretypes/24)** — the closure exercise (Fibonacci generator) is the one that makes closures click.
- 📘 [Effective Go § Functions](https://go.dev/doc/effective_go#functions)
- 🐙 [Go by Example: Functions](https://gobyexample.com/functions) · [Multiple Return Values](https://gobyexample.com/multiple-return-values) · [Variadic Functions](https://gobyexample.com/variadic-functions) · [Closures](https://gobyexample.com/closures)
- 📝 [go.dev/blog/range-functions](https://go.dev/blog/range-functions) — range-over-function iterators (Go 1.23+). Advanced; come back to it after Day 4.

⚠️ **Named returns.** They're legal and occasionally elegant, but they interact with `defer` in ways that surprise people:
```go
func f() (result int) {
    defer func() { result *= 2 }()
    return 5          // returns 10
}
```
Use them for documentation on short functions, or when a deferred function genuinely needs to modify the result. Don't use them to avoid declaring variables.

🛠 **Practice:** write a `Middleware func(http.Handler) http.Handler` type and chain three of them. You've now written the closure pattern that underpins every Go web framework — you'll use it directly on Day 3.

---

### 1.8 · Pointers, Parameters, Return Values
*Pointers · Parameters · Pass by value, pass by reference*

- 🏆 🎥 **Jon Calhoun — pointers & value-vs-pointer receivers** ([calhoun.io](https://www.calhoun.io/)) — the clearest explanation available of the thing that trips up every Java and Python developer.
- 📘 [A Tour of Go — Pointers](https://go.dev/tour/moretypes/1)
- 📝 [Go Code Review Comments § Receiver Type](https://go.dev/wiki/CodeReviewComments#receiver-type) — the actual decision rule for when to use a pointer receiver. Memorise this table.
- 🎥 [Anthony GG — *Pointers in Go*](https://www.youtube.com/@anthonygg_)

**The single most important sentence in this unit:**
> **Go is *always* pass-by-value.** There is no pass-by-reference. When you pass a pointer, you are passing a *copy of the pointer* — which happens to point at the same memory. Slices, maps and channels feel like references because their headers contain a pointer, but the header itself is still copied.

Internalise that and Day 1's slice-aliasing bug and Day 2's value-receiver bug both become obvious.

🛠 **Practice:** build an `IntStack` type with `Push`, `Pop() (int, error)`, `Peek`, `Len`. Write `Push` with a **value** receiver first, watch it silently do nothing, then fix it and write a comment explaining exactly why.

---

### 1.9 · Arrays, Slices, Maps, `for`
*`for` · Arrays, slices · Maps · `range`, `continue`, `break`, `goto`, `fallthrough`*
### ⚠️ Highest bug-density unit in the entire workshop

- 🏆 📝 **[Go Slices: usage and internals](https://go.dev/blog/slices-intro)** — official. Slice header (pointer/len/cap), aliasing, `append` growth, the three-index slice. **If a trainee reads one article all workshop, this is it.**
- 📝 [Go maps in action](https://go.dev/blog/go-maps-in-action) — official; covers the nil-map write panic and the comma-ok idiom
- 📝 [Arrays, slices (and strings): The mechanics of 'append'](https://go.dev/blog/slices) — the deeper follow-up
- 🐙 [Go by Example: Slices](https://gobyexample.com/slices) · [Maps](https://gobyexample.com/maps) · [Range](https://gobyexample.com/range)
- 📝 [100go.co](https://100go.co/) mistakes #20–#28 — the slice/map section. Twenty minutes, and it will save you a production incident.
- 📘 [`slices`](https://pkg.go.dev/slices) and [`maps`](https://pkg.go.dev/maps) — stdlib since Go 1.21. `slices.Sort`, `slices.Contains`, `maps.Keys`. **Use these instead of hand-rolling.** Most tutorials predate them.

**The four traps, in the order you'll hit them:**

```go
// 1 — ALIASING: a slice is a window onto a shared array
a := []int{1, 2, 3, 4}
b := a[1:3]
b[0] = 99
fmt.Println(a)              // [1 99 3 4]  — you just mutated the caller's data

// 2 — APPEND WRITES IN PLACE when len < cap
a = []int{1, 2, 3, 4}
b = a[1:3]                  // len 2, cap 3
b = append(b, 100)
fmt.Println(a)              // [1 2 3 100]
b = a[1:3:3]                // three-index slice caps it → append now copies

// 3 — NIL MAP WRITE PANICS
var m map[string]int
m["a"] = 1                  // panic: assignment to entry in nil map
m = make(map[string]int)    // fix

// 4 — RANGE YIELDS A COPY
type P struct{ N int }
ps := []P{{1}, {2}}
for _, p := range ps { p.N *= 10 }
fmt.Println(ps)             // [{1} {2}] — unchanged
for i := range ps { ps[i].N *= 10 }   // fix: index directly
```

**On `goto` and `fallthrough`:** both exist, both are in the TOC for completeness, and you should essentially never use either. `fallthrough` in a `switch` is explicit *because* Go made non-fallthrough the default — that's a feature. `goto` is legal but if you reach for it, restructure the function instead. Know they exist; don't put them in a PR.

🛠 **Practice:** predict the output of all four snippets above *before* running them. Paste each into [go.dev/play](https://go.dev/play/) and share your links in the team channel. Then write the fix for each in three sentences.

---

### 1.10 · Generics
*Type parameters and constraints · Writing generic functions and types · When (and when not) to use generics*

- 🏆 📘 **[Tutorial: Getting started with generics](https://go.dev/doc/tutorial/generics)** — official, hands-on, 20 minutes.
- 📝 [An Introduction To Generics](https://go.dev/blog/intro-generics) — the concepts
- 📝 [**When To Use Generics**](https://go.dev/blog/when-generics) — 🏆 for the *judgement* half of this unit, which the TOC explicitly asks for. Short version: use generics for **data structures** and for functions operating on **slices/maps/channels of any element type**. Do **not** use them just because a function takes two types.
- 🎥 GopherCon — **Ian Lance Taylor, *Generics in Go*** ([@golang](https://www.youtube.com/@golang)) — from the person who designed them
- 📘 [`constraints`](https://pkg.go.dev/golang.org/x/exp/constraints) — note `comparable` and `~` (approximation) in the [spec](https://go.dev/ref/spec#General_interfaces)

🛠 **Practice:** write generic `Map[T, U]`, `Filter[T]`, `Reduce[T, U]`. Then **delete them** and use [`slices`](https://pkg.go.dev/slices) instead — and write a comment explaining why the stdlib version is better. That deletion is the actual lesson of this unit.

---
---

# 📅 DAY 02 — OOP, Modules, Concurrency Foundations

---

### 2.1 · OOP — Structs, Interfaces, Encapsulation, Inheritance, Polymorphism
*Structs, struct members, anonymous members · Methods on structs · Pointer & value receivers · How structs take the place of objects · Encapsulation, "object hierarchy", data hiding · Struct inheritance with composition · Polymorphism*
### ⭐ The most important conceptual unit in the workshop

- 🏆 📘 **[Effective Go § Interfaces and other types](https://go.dev/doc/effective_go#interfaces)** and **§ Embedding** — official, and it directly answers the TOC's "how structs take the place of objects".
- 📘 [A Tour of Go — Methods and interfaces](https://go.dev/tour/methods/1) — 26 slides, do all of them
- 📝 [The Laws of Reflection](https://go.dev/blog/laws-of-reflection) — read only §"Interfaces". It explains that an interface value is a **(type, value) pair**, which is what makes the typed-nil trap comprehensible.
- 🐙 [tmrts/go-patterns](https://github.com/tmrts/go-patterns) — design patterns written *idiomatically in Go*, not translated from Java. **Best repo for this unit** if you're coming from a Java background.
- 🎥 [Anthony GG — interfaces in practice](https://www.youtube.com/@anthonygg_) — real backend usage, not toy `Shape`/`Circle` examples
- 📝 [Go Code Review Comments § Interfaces](https://go.dev/wiki/CodeReviewComments#interfaces) — where to *define* an interface (answer: at the consumer, not the producer)

**Translating from the OOP you already know:**

| You want | Java/C++ | Go |
|---|---|---|
| A class | `class User { }` | `type User struct { }` |
| A method | inside the class body | `func (u User) Name() string` — receiver outside |
| Private | `private` keyword | **lowercase first letter** |
| Public | `public` keyword | **Uppercase first letter** |
| Inheritance | `extends Base` | **Embedding** — `type Admin struct { User }` |
| Interface | `implements Serializable` | **Implicit** — no declaration; you satisfy it by having the methods |
| Polymorphism | virtual dispatch | interface dispatch |
| Constructor | `new User()` | `func NewUser(...) *User` — a plain function, by convention |

**Three things that will bite you:**

1. **Embedding is not inheritance.** `Admin` embedding `User` *promotes* `User`'s methods, but there is no virtual dispatch — `User`'s methods can never call an overridden `Admin` method. Composition, not is-a.
2. **Method sets.** Value receiver methods belong to both `T` and `*T`; pointer receiver methods belong **only to `*T`**. So if an interface needs both, only `*T` satisfies it.
3. **Typed nil:**
   ```go
   var p *MyErr = nil
   var e error = p
   fmt.Println(e == nil)   // false — the type word is non-nil
   ```

**Design rules to carry into Day 3:**
> **Accept interfaces, return structs.** · **The bigger the interface, the weaker the abstraction.** · Define the interface where it's *used*, keep it to 1–3 methods, and don't create one until you have a second implementation (or a test that needs a mock).

🛠 **Practice:** define `type Notifier interface { Send(ctx context.Context, to, body string) error }`. Implement `SMSNotifier`, `EmailNotifier` and `MockNotifier`. Write a `Dispatcher` that fans out to `[]Notifier`, and unit-test it using **only the mock — no network**. This is the exact shape of our CCS notification layer; do it properly and your first real ticket will look familiar.

---

### 2.2 · Dependency Management
*Go Modules (`go.mod`, `go.sum`) as the primary approach · `go get` with modules, semantic versioning basics · Workspace directory structure, GOPATH, vendor directory, `dep`*

- 🏆 📘 **[Managing dependencies](https://go.dev/doc/modules/managing-dependencies)** — official, and exactly scoped to this unit.
- 📘 [Go Modules Reference](https://go.dev/ref/mod) — the complete spec; use it as a lookup, not a read-through
- 📝 [Using Go Modules](https://go.dev/blog/using-go-modules) — the original 4-part blog series; still the clearest narrative introduction
- 📘 [Module version numbering](https://go.dev/doc/modules/version-numbers) — SemVer, and the **v2+ import-path rule** (`example.com/mod/v2`), which surprises everyone exactly once
- 📘 [Go workspaces (`go.work`)](https://go.dev/doc/tutorial/workspaces) — for multi-module local development

**Essential commands:**
```bash
go mod init github.com/indiamart/myservice
go get github.com/google/uuid@v1.6.0     # pin an exact version
go get -u ./...                          # upgrade minor/patch
go mod tidy                              # add missing, drop unused — run before every PR
go mod why github.com/some/dep           # "why is this in my build?"
go mod graph                             # full dependency graph
go list -m -u all                        # what has updates available
go mod vendor                            # only if your org requires vendoring
```

> 🕰 **Historical note — read this so you're not confused by old tutorials.** `GOPATH`, the `vendor/` directory and **`dep`** are all in the TOC for context, not for use.
> - **`dep`** was the pre-modules dependency manager. It has been **deprecated since 2020**. You will never start a new project with it. You may still meet it in a legacy repo — if you do, migrate to modules.
> - **`GOPATH`** no longer determines where your code lives. It still matters for `GOMODCACHE` and `$GOPATH/bin` (where `go install` puts binaries — make sure that's on your `PATH`).
> - **`vendor/`** is optional. Use it only for hermetic/air-gapped builds; otherwise the module proxy and `go.sum` already give you reproducibility.
>
> **`go.sum` is not a lock file.** `go.mod` pins versions; `go.sum` records **cryptographic hashes** so a tampered upstream is detected at build time. That's why you commit both, and why you never hand-edit `go.sum`.

🛠 **Practice:** `go mod init` a fresh module. Add `github.com/google/uuid`, inspect `go.sum`, remove the import, run `go mod tidy`, and watch the dependency disappear. Then run `go mod why` on something you didn't add directly and trace where it came from.

---

### 2.3 · Goroutines, Parallelism
*Concurrency with goroutines · Concurrency and parallelism*

- 🏆 🎥 **[Rob Pike — *Concurrency is not Parallelism*](https://www.youtube.com/@golang)** (30 min). **Mandatory. Watch it twice.** Concurrency is about *structure* — dealing with many things at once. Parallelism is about *execution* — doing many things at once. Everything in Day 3 depends on holding that distinction.
- 📝 [Concurrency is not parallelism (blog + slides)](https://go.dev/blog/waza-talk) — the written companion
- 📘 [A Tour of Go — Concurrency](https://go.dev/tour/concurrency/1)
- 🐙 [Go by Example: Goroutines](https://gobyexample.com/goroutines)
- 📝 [Go scheduler / G-M-P model](https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2-go-scheduler.html) — Ardan Labs. Read at a conceptual level only; you don't need the internals to write correct code, but knowing goroutines are **runtime**-scheduled, not OS-scheduled, explains why 100,000 of them is normal.

**Why this matters practically:** a goroutine starts at ~2 KB of stack that grows on demand; an OS thread is ~1 MB fixed. That ratio is the entire reason Go took over backend infrastructure.

⚠️ **Loop variable capture — you must know both behaviours:**
```go
for i := 0; i < 3; i++ {
    go func() { fmt.Print(i, " ") }()
}
```
**Go 1.22+:** `i` is a fresh variable per iteration → prints `0`,`1`,`2` each once, in **non-deterministic order**.
**Before Go 1.22:** all three closures shared one `i` → typically `3 3 3`.
You're writing 1.26, but any legacy repo you inherit still has the old semantics. Know both.

🛠 **Practice:** launch 5 goroutines that each print their index. Run it 10 times and observe the ordering change. Then add `runtime.GOMAXPROCS(1)` and observe what changes — and what doesn't.

---

### 2.4 · Handling Race Conditions
*Example of a race condition*

- 🏆 📘 **[Data Race Detector](https://go.dev/doc/articles/race_detector)** — official. How to run it, what it can and cannot catch (it only detects races on code paths that *actually execute*, which is why you run it in CI over your whole test suite).
- 📝 [Introducing the Go Race Detector](https://go.dev/blog/race-detector) — the announcement post, with a worked example
- 📘 [The Go Memory Model](https://go.dev/ref/mem) — advanced; read after you've hit a real race
- 📝 [100go.co](https://100go.co/) §concurrency — the difference between a *data race* and a *race condition* (they are not the same thing, and the detector only finds the first)

**Run this and watch it fail:**
```bash
go run -race main.go
go test -race ./...        # THIS BELONGS IN CI. Non-negotiable.
```

**The one that isn't a data race and isn't recoverable:**
```go
m := map[string]int{}
// 100 goroutines writing to m concurrently
// → fatal error: concurrent map writes
```
That's a *runtime* abort, not a panic. `recover()` cannot catch it and it takes the whole process down. Go's built-in map is not safe for concurrent writes — ever.

🛠 **Practice:** write a counter incremented by 1000 goroutines with no synchronisation. Run with `-race` and read the report carefully — it tells you both the read site and the write site. Keep the output; you'll fix it in the next unit.

---

### 2.5 · SyncGroup, Wait, Mutexes
*Sync, Wait · Mutexes · Deadlocks with mutexes · RW mutexes*

- 🏆 📘 **[`sync` package docs](https://pkg.go.dev/sync)** — genuinely the best resource here. Read `Mutex`, `RWMutex`, `WaitGroup`, `Once` and their examples end to end. The doc comments contain the rules most tutorials omit.
- 📘 [`sync/atomic`](https://pkg.go.dev/sync/atomic) — `atomic.Int64` etc. (typed atomics, Go 1.19+) are cleaner than the old function forms
- 🐙 [Go by Example: WaitGroups](https://gobyexample.com/waitgroups) · [Mutexes](https://gobyexample.com/mutexes) · [Atomic Counters](https://gobyexample.com/atomic-counters)
- 🐙 [learn-go-with-tests — Sync](https://github.com/quii/learn-go-with-tests/blob/main/sync/v2/sync.go) — builds a concurrency-safe counter test-first
- 📘 [`golang.org/x/sync/errgroup`](https://pkg.go.dev/golang.org/x/sync/errgroup) — WaitGroup + error propagation + context cancellation. Once you've understood `WaitGroup`, this is what you'll actually use.

**The five rules:**
1. `wg.Add(1)` goes **before** `go func()`, never inside it. Inside, `Wait` can return before the goroutine is scheduled. *(Go 1.25+ added `wg.Go(fn)` which handles this for you.)*
2. `defer wg.Done()` as the first line inside — it survives a panic.
3. `defer mu.Unlock()` immediately after `mu.Lock()`. Always.
4. **Never copy a `Mutex`.** Embedding one in a struct means that struct must be passed by pointer forever. `go vet` catches this.
5. `RWMutex` only pays off on read-heavy workloads. Under write contention it's *slower* than a plain `Mutex` — benchmark, don't assume.

**Deadlock, the classic form:**
```go
// goroutine A: mu1.Lock(); mu2.Lock()
// goroutine B: mu2.Lock(); mu1.Lock()   // ← deadlock
```
Fix: always acquire multiple locks in a **globally consistent order**. Write that order down in a comment.

🛠 **Practice:** take the racy counter from 2.4 and fix it three ways — `sync.Mutex`, `sync.RWMutex`, `atomic.Int64`. Benchmark all three with `go test -bench=. -benchmem`. The result will surprise you, and that surprise is the lesson.

---

### 2.6 · Configuration Management
*Environment-based configuration · Binding config to structs · Config libraries overview (e.g. viper)*

- 🏆 📝 **[The Twelve-Factor App — Config](https://12factor.net/config)** — not Go-specific, and that's the point. It's the *principle*: config lives in the environment, never in the repo. Everything else in this unit is implementation.
- 📘 [`os.Getenv` / `os.LookupEnv`](https://pkg.go.dev/os#LookupEnv) · [`flag`](https://pkg.go.dev/flag) — start here. For most services, **stdlib is enough** and adds zero dependencies.
- 🐙 [spf13/viper](https://github.com/spf13/viper) — the library named in the TOC. Powerful (files, env, remote KV, live reload) but heavy. Reach for it when you genuinely need multi-source config, not by default.
- 🐙 [caarlos0/env](https://github.com/caarlos0/env) — 🏆 *for new joiners*. Struct-tag based, tiny, no magic:
  ```go
  type Config struct {
      Port     int           `env:"PORT" envDefault:"8080"`
      DBDSN    string        `env:"DB_DSN,required"`
      Timeout  time.Duration `env:"TIMEOUT" envDefault:"5s"`
  }
  ```
- 🐙 [kelseyhightower/envconfig](https://github.com/kelseyhightower/envconfig) — the older, equally clean alternative
- 🐙 [joho/godotenv](https://github.com/joho/godotenv) — loads `.env` for **local development only**. Never in production.

**The rules:**
- **Never commit secrets.** Add `.env` to `.gitignore` on day one. (Your capstone grader checks for this.)
- **Fail fast at startup.** Parse and validate all config in `main()` before the server starts. A service that boots with a missing DB password and dies on the first request is worse than one that refuses to boot.
- **Config is a struct, passed explicitly.** No global `Config` singleton, no `init()` magic.

🛠 **Practice:** build a `Config` struct read from env with sane defaults and one `required` field. Make the service refuse to start with a clear error message when it's missing. Do it once with pure stdlib, once with `caarlos0/env`, and decide which you'd defend in review.

---
---

# 📅 DAY 03 — Channels, Concurrency Patterns, Web Services

---

### 3.1 · Channels
*Buffered channels · Directional channels · Channel types · Select channels · **Project: build a simple search engine***

- 🏆 🎥 **[Rob Pike — *Go Concurrency Patterns*](https://www.youtube.com/@golang)** (Google I/O 2012). **This talk literally builds the search-engine project in your TOC** — Google Search 1.0 → 2.0 → 3.0, adding fan-out then timeouts then replication. Watch it before the lab, not after. Slides: [talks.golang.org/2012/concurrency.slide](https://go.dev/talks/2012/concurrency.slide)
- 📘 [A Tour of Go — Channels](https://go.dev/tour/concurrency/2) through *Default Selection*
- 🐙 [Go by Example: Channels](https://gobyexample.com/channels) · [Buffering](https://gobyexample.com/channel-buffering) · [Directions](https://gobyexample.com/channel-directions) · [Select](https://gobyexample.com/select) · [Timeouts](https://gobyexample.com/timeouts) · [Non-Blocking Ops](https://gobyexample.com/non-blocking-channel-operations)
- 🐙 [learn-go-with-tests — Select](https://github.com/quii/learn-go-with-tests) — test-driven, which forces you to actually understand blocking semantics

**Channel semantics — memorise this table, it's most of the bugs:**

| Operation | Nil channel | Open, empty | Closed |
|---|---|---|---|
| **Send** | blocks forever | blocks until receiver ready (unbuffered) | **panics** 💥 |
| **Receive** | blocks forever | blocks until sender ready | returns zero value, `ok == false` |
| **Close** | panics | fine | **panics** 💥 |

**Directional types** are free documentation and free compile-time safety:
```go
func producer(out chan<- int)   // send-only: can't accidentally receive
func consumer(in  <-chan int)   // receive-only: can't accidentally close
```

**`select` with `default` is non-blocking** — this is how you implement "return 503 instead of hanging when the queue is full", which you'll need on Day 4.

**Rule:** *only the sender closes, and only when there is exactly one sender.* If you have multiple senders, coordinate with a `WaitGroup` and close in a separate goroutine after `Wait()`.

🛠 **Project (per TOC):** build the concurrent search engine. Query 3 fake backends (Web, Image, Video), fan out with goroutines, fan in with a channel, add a `select` timeout so a slow backend can't stall the whole search, then add replication so you take the first of two replicas. That's Pike's talk, implemented.

---

### 3.2 · Concurrency in the Real World
*Rate limiting, bursty rate limiting · Worker pool · **Project: load balancer** · Context package — cancellation, deadlines/timeouts, propagation across goroutines*

- 🏆 📝 **[Go Concurrency Patterns: Pipelines and cancellation](https://go.dev/blog/pipelines)** — official. Fan-out/fan-in, done channels, bounded parallelism. **This is the mental model behind every Kafka consumer we run.**
- 🏆 📝 **[Go Concurrency Patterns: Context](https://go.dev/blog/context)** — official, and the definitive resource for the context half of this unit.
- 📘 [`context`](https://pkg.go.dev/context) — read the whole package doc; it's short and every paragraph matters
- 🐙 [Go by Example: Rate Limiting](https://gobyexample.com/rate-limiting) — covers **both** steady and bursty rate limiting, exactly as the TOC lists them, using `time.Tick` and a buffered channel
- 📘 [`golang.org/x/time/rate`](https://pkg.go.dev/golang.org/x/time/rate) — the production token-bucket limiter. `rate.NewLimiter(10, 30)` = 10/sec sustained, burst of 30.
- 🎥 [Sameer Ajmani — *Advanced Go Concurrency Patterns*](https://www.youtube.com/@golang) (Google I/O 2013) — worker pools and cancellation
- 🎥 [Anthony GG — concurrency patterns series](https://www.youtube.com/@anthonygg_) — worker pools and load balancers in production style
- 📝 [Alex Edwards — *How to Rate Limit HTTP Requests*](https://www.alexedwards.net/blog/how-to-rate-limit-http-requests) — per-IP rate limiting middleware you can lift straight into your capstone

**Context rules — the four that get broken:**
1. `ctx` is **always the first parameter**, named `ctx`. Never store it in a struct.
2. **`defer cancel()` — always.** Even when the timeout will fire anyway. Skipping it leaks the timer and the child context; `go vet`'s `lostcancel` check flags it.
3. Cancellation is **cooperative**. Nothing gets killed. `ctx.Done()` closes and *your code* must notice and return. A goroutine that never selects on `ctx.Done()` will run forever regardless of the deadline.
4. `context.Value` is for **request-scoped metadata** (request ID, trace ID, authenticated user ID) — not for passing optional parameters. Use a typed unexported key, never a bare string.

`ctx.Err()` returns `context.DeadlineExceeded` (timeout) or `context.Canceled` (explicit `cancel()`). They're distinct sentinels; check with `errors.Is`.

**The most common goroutine leak in production Go:**
```go
ch := make(chan int)                       // unbuffered
go func() { ch <- expensiveCall() }()
select {
case v := <-ch:                 return v
case <-time.After(time.Second): return 0   // ← nobody ever receives; worker blocks forever
}
```
Fix: buffer the channel (`make(chan int, 1)`) so the send always completes, or thread a context the worker checks.

🛠 **Project (per TOC):** build the load balancer. A pool of N workers, jobs dispatched to the least-loaded worker (a heap works nicely), results returned on a per-request channel, and a `context` timeout that cancels cleanly with zero goroutine leaks. Verify with `runtime.NumGoroutine()` before and after — the numbers must match.

---

### 3.3 · Templates and Data Formats
*HTML and text templates · JSON, marshalling, unmarshalling*

- 🏆 📝 **[JSON and Go](https://go.dev/blog/json)** — official. Marshal, Unmarshal, struct tags, `interface{}` decoding, streaming. Covers the whole JSON half of this unit.
- 📘 [`encoding/json`](https://pkg.go.dev/encoding/json) · [`html/template`](https://pkg.go.dev/html/template) · [`text/template`](https://pkg.go.dev/text/template)
- 🐙 [Go by Example: JSON](https://gobyexample.com/json) · [Text Templates](https://gobyexample.com/text-templates)
- 📝 [Alex Edwards — template rendering patterns](https://www.alexedwards.net/blog) — practical caching and layout composition
- 🐙 [Practical: use `json.RawMessage`](https://pkg.go.dev/encoding/json#RawMessage) for deferred/polymorphic decoding

**Struct tags — the whole vocabulary:**
```go
type User struct {
    ID        string    `json:"id"`
    Email     string    `json:"email"`
    Password  string    `json:"-"`                  // NEVER serialised — use this
    Nickname  string    `json:"nickname,omitempty"` // dropped when zero
    CreatedAt time.Time `json:"created_at"`
    Internal  string    `json:"-"`
}
```
> 🔐 `json:"-"` on the password field is a one-character defence against the single most common security bug in a first backend service. Use it, *and* keep the hash in a separate type that never reaches the transport layer.

**Two habits to adopt immediately:**
```go
dec := json.NewDecoder(r.Body)
dec.DisallowUnknownFields()      // reject typos and unexpected fields → 400
```
Use `json.Decoder`/`Encoder` for streams (HTTP bodies, files); use `json.Marshal`/`Unmarshal` only for in-memory `[]byte`.

**`html/template` vs `text/template`:** they have identical APIs, but `html/template` is **contextually auto-escaping** — it knows whether it's writing into HTML, an attribute, JavaScript or a URL, and escapes accordingly. **For anything reaching a browser, always `html/template`.** Using `text/template` for HTML is an XSS vulnerability. This connects directly to Day 4's Security Basics unit.

🛠 **Practice:** define a `User` with `json:"-"` on the password. Marshal it and confirm the password is absent. Then build a small HTML page with `html/template`, inject `<script>alert(1)</script>` as a username, and watch it get escaped. Swap to `text/template` and watch the alert fire. That demo is worth ten minutes of classroom time.

---

### 3.4 · Building Web Servers, Using Regex in Go
*`http` package · Running a web server and handling requests · HTTP return codes · Regex · Routes, variables · Serving static files*

- 🏆 📝 **[Mat Ryer — *How I Write HTTP Services in Go After 13 Years*](https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/)** — **read this twice.** More practically useful for our work than any video on this list: handler structure, dependency injection without a framework, testability, graceful shutdown.
- 🏆 📝 **[Routing Enhancements for Go 1.22](https://go.dev/blog/routing-enhancements)** — method-based patterns and path wildcards in stdlib `ServeMux`. **This changed the answer to "which router?" and most tutorials you'll find predate it.**
- 📘 [`net/http`](https://pkg.go.dev/net/http) — read the `Handler`, `HandlerFunc`, `ServeMux` and `Server` docs
- 📘 [Writing Web Applications](https://go.dev/doc/articles/wiki/) — the official long-form tutorial; builds a wiki with templates and regex validation
- 📘 [`regexp`](https://pkg.go.dev/regexp) — Go uses RE2: **linear time, no catastrophic backtracking**, but also **no backreferences or lookahead**. If you've come from PCRE, that's the adjustment.
- 🎥 [Melkey](https://www.youtube.com/@MelkeyDev) / [Anthony GG](https://www.youtube.com/@anthonygg_) — "build a REST API in Go" series
- 🎥 [Coder's Gyan — *Master Golang in One Video* (Hindi)](https://www.youtube.com/watch?v=yZgwW6Yuc_E) — the back half is a real-world API project

**Go 1.22+ routing — this is now stdlib:**
```go
mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}",    getUser)      // method + wildcard, no library
mux.HandleFunc("POST /users",        createUser)
mux.HandleFunc("GET /static/",       http.StripPrefix("/static/",
                   http.FileServer(http.Dir("./public"))).ServeHTTP)

func getUser(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")                        // no mux.Vars(), no third-party
}
```

⚠️ **Always set server timeouts.** A default `http.Server{}` has none, and that is the number-one cause of goroutine and file-descriptor exhaustion in Go services:
```go
srv := &http.Server{
    Addr:              ":8080",
    Handler:           mux,
    ReadHeaderTimeout: 5 * time.Second,
    ReadTimeout:       10 * time.Second,
    WriteTimeout:      15 * time.Second,
    IdleTimeout:       60 * time.Second,
}
```
The same applies to `http.Client` — never use `http.DefaultClient` for outbound calls; it has no timeout.

**Status codes you'll actually use:** `200` OK · `201` Created · `202` Accepted · `204` No Content · `301`/`302` redirect · `400` bad request · `401` unauthenticated · `403` authenticated-but-forbidden · `404` not found · `409` conflict · `422` unprocessable · `429` rate limited · `500` server error · `503` unavailable.

🛠 **Practice:** build `/healthz` plus one CRUD resource with in-memory storage, three middlewares (request-ID, logging, panic recovery), static file serving, and graceful shutdown via `srv.Shutdown(ctx)`. **No framework.** You need to know what Gin does for you before Day 4 hands you Gin.

---

### 3.5 · Context gorilla package
*Installing gorilla mux · Routing URLs, sub-routers*

- 🐙 [gorilla/mux](https://github.com/gorilla/mux) — the library in the TOC. Docs: [pkg.go.dev/github.com/gorilla/mux](https://pkg.go.dev/github.com/gorilla/mux)
- 🏆 📝 **[Routing Enhancements for Go 1.22](https://go.dev/blog/routing-enhancements)** — read this *alongside* gorilla, and understand what gorilla was solving.
- 🐙 [go-chi/chi](https://github.com/go-chi/chi) — the most common migration target: zero dependencies, `http.Handler`-native, actively maintained

> ⚠️ **Trainer note — the ecosystem moved under this unit.** Worth 5 minutes in the room, because trainees *will* find contradictory advice online.
>
> - **Dec 2022** — the entire Gorilla toolkit, including `mux`, was **archived**.
> - **Jul 2023** — a group of volunteers **revived and un-archived** it.
> - **2026** — activity has stayed low; [endoflife.date](https://endoflife.date/gorilla) now tracks Gorilla as **discontinued**.
> - Meanwhile **Go 1.22 (Feb 2024)** added method matching and path wildcards to stdlib `ServeMux` — which covers the majority of what people used `mux` for.
>
> **What to teach:** understand gorilla's *concepts* — sub-routers, path variables, route middleware — because you'll meet them in existing IndiaMART code. For **anything new**, use stdlib `ServeMux` first, and `chi` when you need sub-router composition or a middleware ecosystem. Don't start a greenfield service on `gorilla/mux` in 2026.

**Concept mapping, so the older code still reads clearly:**

| Concept | gorilla/mux | stdlib (1.22+) | chi |
|---|---|---|---|
| Path variable | `mux.Vars(r)["id"]` | `r.PathValue("id")` | `chi.URLParam(r, "id")` |
| Method match | `.Methods("GET")` | `"GET /path"` | `r.Get("/path", h)` |
| Sub-router | `r.PathPrefix("/api").Subrouter()` | nested mux + `StripPrefix` | `r.Route("/api", ...)` |
| Middleware | `r.Use(mw)` | manual wrapping | `r.Use(mw)` |

🛠 **Practice:** build the same two routes three times — gorilla, stdlib, chi — and write three sentences on which you'd choose for a new IndiaMART service and why.

---

### 3.6 · Build REST Services
*What is REST? · CRUD and REST · HTTP requests and REST · A REST project in Go · **NEW:** API versioning, pagination patterns, request/response validation*

- 🏆 📝 **[Mat Ryer — How I Write HTTP Services in Go](https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/)** — again, because it's the best single resource for the *structure* of a Go REST service.
- 📘 [Tutorial: Developing a RESTful API with Go](https://go.dev/doc/tutorial/web-service-gin) — official (uses Gin, which bridges into Day 4)
- 🐙 [ThreeDotsLabs/wild-workouts-go-ddd-example](https://github.com/ThreeDotsLabs/wild-workouts-go-ddd-example) — 🏆 **best repo on this list.** A deliberately badly-written Go service refactored into a good one, commit by commit, with an [article series](https://threedots.tech/) explaining each step. Read it after you've written your own.
- 📝 [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines) — for versioning and pagination conventions, language-agnostic
- 🐙 [go-playground/validator](https://github.com/go-playground/validator) — struct-tag request validation, the de-facto standard (and what Gin uses internally)
- 📝 [Alex Edwards — organising database access & JSON responses](https://www.alexedwards.net/blog)

**On the three NEW items your TOC added:**

**API versioning** — three approaches, pick one and be consistent:
| | Example | Verdict |
|---|---|---|
| URL path | `/api/v1/users` | **Most common, most visible, easiest to route and debug. Start here.** |
| Header | `Accept: application/vnd.im.v1+json` | Purer REST, harder to test with curl, invisible in logs |
| Query param | `/api/users?version=1` | Avoid — caches and proxies handle it badly |

**Pagination** — two patterns:
- **Offset/limit** (`?limit=20&offset=40`) — simple, jumps to any page, but degrades badly on large offsets and can skip/duplicate rows when data shifts mid-scroll. Fine for admin UIs.
- **Cursor/keyset** (`?limit=20&after=<opaque-cursor>`) — stable under concurrent writes, constant-time regardless of depth. **Use this for anything user-facing at IndiaMART scale.**

Always return the total (or an explicit `has_more`), always cap `limit` server-side, and always reject invalid values with `400` rather than silently clamping.

**Request/response validation** — validate at the **transport boundary**, before anything reaches your service layer:
```go
dec := json.NewDecoder(r.Body)
dec.DisallowUnknownFields()                 // typos become 400s, not silent no-ops
if err := dec.Decode(&in); err != nil { ... }
if err := validate.Struct(in); err != nil { ... }   // go-playground/validator
```
Return a **machine-readable error shape** and use it everywhere: `{"error":"validation_failed","detail":"email is required"}`. Never leak internal errors or stack traces to the client.

🛠 **Project (per TOC):** build a versioned REST API — `/api/v1/<resource>` — with full CRUD, cursor pagination, struct-tag validation, and a consistent error envelope. In-memory storage for now; Day 4 swaps in MySQL.

---
---

# 📅 DAY 04 — Files, Databases, gRPC, Testing, Deployment

---

### 4.1 · Files
*Reading files, writing files · Reading and writing to any pipe · Multipart file upload using REST*

- 🏆 📘 **[`os`](https://pkg.go.dev/os)** and **[`io`](https://pkg.go.dev/io)** package docs — the best resource here, because the whole unit is really one idea: `io.Reader` and `io.Writer` are the universal interfaces, and *everything* implements them.
- 📘 [`bufio`](https://pkg.go.dev/bufio) · [`io/fs`](https://pkg.go.dev/io/fs) · [`mime/multipart`](https://pkg.go.dev/mime/multipart)
- 🐙 [Go by Example: Reading Files](https://gobyexample.com/reading-files) · [Writing Files](https://gobyexample.com/writing-files) · [Line Filters](https://gobyexample.com/line-filters)
- 📝 [Alex Edwards — *How to Process File Uploads in Go*](https://www.alexedwards.net/blog/how-to-properly-parse-a-multipart-form) — the multipart half of this unit, done properly

**The mental model that makes this unit trivial:**
> A file, a network connection, an HTTP body, a gzip stream, `stdin`, a `bytes.Buffer` and a `strings.Reader` are all just `io.Reader`s. Write your functions to take `io.Reader`, not `*os.File`, and they become testable with a one-line `strings.NewReader("test data")` — no temp files, no fixtures.

That single habit is what the TOC's "reading and writing to any pipe" is pointing at.

```go
// Small files
data, err := os.ReadFile("in.txt")
err = os.WriteFile("out.txt", data, 0644)

// Large files — stream, don't load into memory
f, err := os.Open("huge.log")
defer f.Close()
sc := bufio.NewScanner(f)
for sc.Scan() { process(sc.Text()) }
if err := sc.Err(); err != nil { ... }   // ← people forget this constantly

// Copy anything to anything
io.Copy(dst, src)
```

⚠️ **Multipart upload — three things that bite:**
```go
r.ParseMultipartForm(10 << 20)             // 10 MB cap; the rest spills to disk
file, hdr, err := r.FormFile("upload")
defer file.Close()
```
1. **Always cap the size** — both `ParseMultipartForm` and an `http.MaxBytesReader` wrapper. Unbounded uploads are a trivial DoS.
2. **Never trust `hdr.Filename`.** It's attacker-controlled. `filepath.Base()` it, or better, generate your own name. `../../etc/passwd` is a real filename someone will send you.
3. **Sniff the content type yourself** with `http.DetectContentType` on the first 512 bytes. The client-supplied `Content-Type` is a suggestion, not a fact.

🛠 **Practice:** add a `POST /api/upload` endpoint to your Day 3 REST service: 5 MB cap, allow only `image/png` and `image/jpeg` (verified by sniffing, not by the header), store under a generated UUID filename, return the URL. Then try to break your own endpoint with a path-traversal filename.

---

### 4.2 · Databases
*`init` and then `main`, importing to register with `init`, `sql` package · Working with MySQL*

- 🏆 📝 **[go-database-sql.org](http://go-database-sql.org/)** — the definitive tutorial for `database/sql`. Covers the driver-registration pattern your TOC calls out, connection pooling, `nil` handling, and the mistakes everyone makes. **Best single resource in the whole of Day 4.**
- 📘 [`database/sql`](https://pkg.go.dev/database/sql) — read `DB.SetMaxOpenConns`, `SetMaxIdleConns`, `SetConnMaxLifetime` docs carefully
- 📘 [Accessing relational databases](https://go.dev/doc/database/) — official tutorial hub
- 🐙 [go-sql-driver/mysql](https://github.com/go-sql-driver/mysql) — the MySQL driver. Read its README on DSN parameters, especially `parseTime=true` and `loc`.
- 🐙 [sqlc](https://sqlc.dev/) — generates type-safe Go from your SQL. **Worth demoing**: you write SQL, it writes the boilerplate. My recommendation over an ORM.
- 🐙 [jmoiron/sqlx](https://github.com/jmoiron/sqlx) — thin extension over `database/sql` with struct scanning; the gentler step up
- 🐙 [golang-migrate/migrate](https://github.com/golang-migrate/migrate) — schema migrations
- 🐙 [DATA-DOG/go-sqlmock](https://github.com/DATA-DOG/go-sqlmock) — mock the DB in unit tests (connects to 4.5)

**The `init()` + blank-import pattern your TOC calls out — this is what it means:**
```go
import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"   // blank import: we want the side effect only
)
```
The driver package's `init()` calls `sql.Register("mysql", &MySQLDriver{})`. The `_` says "I'm importing this purely to run its `init()`". That's why `sql.Open("mysql", dsn)` works with no visible reference to the driver — and why removing the blank import produces `unknown driver "mysql"` at runtime rather than a compile error. It's the clearest real-world example of `init()` in the stdlib ecosystem.

⚠️ **`sql.Open` does not connect.** It just validates arguments and prepares the pool lazily. Always follow with `db.PingContext(ctx)` at startup so a bad DSN fails immediately instead of on the first request.

**Pool configuration — the settings nobody sets until there's an incident:**
```go
db.SetMaxOpenConns(25)                   // MUST be set; the default is unlimited
db.SetMaxIdleConns(25)                   // match MaxOpenConns to avoid churn
db.SetConnMaxLifetime(5 * time.Minute)   // below your MySQL wait_timeout / LB idle timeout
```

**The four non-negotiables:**
1. **Always use the `Context` variants** — `QueryContext`, `ExecContext`, `QueryRowContext`. This is how a cancelled HTTP request stops the database work behind it.
2. **Always `defer rows.Close()`**, and always check `rows.Err()` after the loop. A leaked `rows` holds a connection until GC — that's how pools starve.
3. **Never build SQL with `fmt.Sprintf`.** Placeholders only: `db.QueryContext(ctx, "SELECT ... WHERE id = ?", id)`. This is the entire SQL-injection answer in Day 4's Security Basics unit.
4. **Transactions:** `tx, _ := db.BeginTx(ctx, nil)`, then `defer tx.Rollback()` immediately — rollback after a successful commit is a harmless no-op, and this guarantees you never leak an open transaction on an early return.

🛠 **Practice:** swap your Day 3 in-memory store for MySQL. Configure the pool. Add one transactional write path (create parent + children, all or nothing). Then deliberately kill MySQL mid-request and make sure your service returns a clean `503` instead of a panic.

---

### 4.3 · Gin Web Framework
*Why Gin? · Building web applications using Gin · Latency discussion*

- 🏆 📘 **[Tutorial: Developing a RESTful API with Go and Gin](https://go.dev/doc/tutorial/web-service-gin)** — official Go tutorial, uses Gin, exactly scoped to this unit.
- 🐙 [gin-gonic/gin](https://github.com/gin-gonic/gin) — repo + [docs](https://gin-gonic.com/docs/)
- 📝 [Gin examples](https://gin-gonic.com/docs/examples/) — binding, validation, file upload, middleware, graceful shutdown

**"Why Gin?" — the honest answer, which is what makes it teachable:**

| Gin gives you | What it costs |
|---|---|
| Radix-tree router with path params | A `gin.Context` that isn't `http.Handler` — some lock-in |
| `c.ShouldBindJSON` + validation via struct tags | Magic you didn't write, in your request path |
| Built-in logger + panic recovery middleware | An extra dependency to keep patched |
| Big middleware ecosystem | Slightly more to learn than stdlib |

**Since Go 1.22, the router argument for Gin is much weaker** — stdlib gives you method matching and path wildcards. What Gin still buys you is **binding + validation + middleware ecosystem** in one package. That's a legitimate reason to use it; "the stdlib can't route" is no longer one.

**On the latency discussion:** Gin's benchmarks measure *routing* overhead — hundreds of nanoseconds. Your actual request is dominated by the database call (milliseconds) and network I/O. **Framework choice is essentially never your latency problem.** The right lesson from this unit is: measure before you optimise, and put the `pprof` and benchmarking skills from 4.5/4.6 to work rather than trusting a framework benchmark chart.

🛠 **Practice:** port your Day 3 REST API to Gin. Then benchmark both with `hey` or `wrk` against the *same* database. Write down the difference. Then write down what fraction of total latency it represents. That number is the point of the exercise.

---

### 4.4 · Build gRPC Services
*Protobuf vs JSON · Synchronous gRPC services · Asynchronous gRPC services · Unidirectional & bidirectional streaming — overview/demo only*

- 🏆 📘 **[gRPC Go Quick Start](https://grpc.io/docs/languages/go/quickstart/)** — official, and gets a working service running in about 15 minutes. Follow it with [Basics Tutorial](https://grpc.io/docs/languages/go/basics/), which covers **all four streaming modes**.
- 📘 [Protocol Buffers — Go tutorial](https://protobuf.dev/getting-started/gotutorial/) · [proto3 language guide](https://protobuf.dev/programming-guides/proto3/)
- 🐙 [grpc/grpc-go](https://github.com/grpc/grpc-go) — see [`examples/`](https://github.com/grpc/grpc-go/tree/master/examples), which has a runnable sample for each streaming mode
- 📝 [protobuf.dev — encoding](https://protobuf.dev/programming-guides/encoding/) — *why* protobuf is smaller; worth 10 minutes if the JSON-vs-protobuf question comes up

**Protobuf vs JSON — the trade, honestly stated:**

| | JSON | Protobuf |
|---|---|---|
| Human readable | ✅ curl-able, log-able | ❌ binary; you need tooling |
| Payload size | Larger | ~3–10× smaller |
| Parse speed | Slower (reflection) | Faster (generated code) |
| Schema | Optional, drifts | **Enforced, versioned, generated** |
| Browser support | Native | Needs grpc-web / a gateway |
| Debuggability | Trivial | Needs `grpcurl` |

**The real reason to use gRPC internally isn't speed — it's the enforced schema.** A `.proto` file is a contract both sides compile against, so a breaking change fails at build time instead of at 2 a.m. Use gRPC for **service-to-service**; keep JSON/REST at the **public edge**.

**The four modes (per the TOC):**
```proto
rpc GetUser   (Req)        returns (Resp);        // 1. unary — "synchronous"
rpc ListUsers (Req)        returns (stream Resp); // 2. server streaming
rpc Upload    (stream Req) returns (Resp);        // 3. client streaming
rpc Chat      (stream Req) returns (stream Resp); // 4. bidirectional
```

> 📝 **A note on "asynchronous gRPC".** gRPC-Go doesn't have a separate async API the way gRPC-C++ does — every Go call is a blocking call on a goroutine, which *is* Go's async model. What the TOC means in practice is **streaming** (modes 2–4) plus fire-and-forget patterns. Worth stating plainly so nobody goes hunting for an `AsyncClient` that doesn't exist.

🛠 **Practice (demo scope):** define a `.proto` with one unary and one server-streaming method. Generate with `protoc-gen-go` + `protoc-gen-go-grpc`. Implement the server, call it from a Go client, then inspect it with `grpcurl`. Stop there — this unit is scoped as overview/demo, and the depth belongs in the 30-day plan.

---

### 4.5 · Unit Testing
*Writing and running unit tests · Table driven tests, `go cover` · Debugging and profiling · **NEW:** Mocking & test doubles*

- 🏆 🐙 **[quii/learn-go-with-tests](https://github.com/quii/learn-go-with-tests)** — free, TDD-driven, and it teaches Go *through* testing rather than bolting testing on at the end. **Best resource in the entire roadmap for this unit.**
- 📘 [`testing`](https://pkg.go.dev/testing) · [Add a test (official tutorial)](https://go.dev/doc/tutorial/add-a-test)
- 📝 [Using Subtests and Sub-benchmarks](https://go.dev/blog/subtests) — `t.Run`, `t.Parallel`
- 📝 [go.dev/wiki/TableDrivenTests](https://go.dev/wiki/TableDrivenTests) — the canonical Go test idiom, exactly as your TOC names it
- 📘 [`net/http/httptest`](https://pkg.go.dev/net/http/httptest) — `ResponseRecorder` and `httptest.Server`. Essential for testing the Day 3 handlers.
- 📝 [Profiling Go Programs](https://go.dev/blog/pprof) · 📘 [`runtime/pprof`](https://pkg.go.dev/runtime/pprof) · 📘 [`net/http/pprof`](https://pkg.go.dev/net/http/pprof)
- 🐙 [go-delve/delve](https://github.com/go-delve/delve) — the Go debugger, for the "debugging" half of this unit

**Table-driven test — this is the shape reviewers expect:**
```go
func TestValidate(t *testing.T) {
    tests := []struct {
        name    string
        in      Input
        wantErr bool
    }{
        {"valid", Input{Email: "a@b.com"}, false},
        {"missing email", Input{}, true},
        {"bad email", Input{Email: "nope"}, true},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := Validate(tt.in)
            if (err != nil) != tt.wantErr {
                t.Errorf("Validate() error = %v, wantErr %v", err, tt.wantErr)
            }
        })
    }
}
```

**Coverage:**
```bash
go test -race -coverprofile=cover.out ./...
go tool cover -html=cover.out          # opens the annotated source in a browser
go tool cover -func=cover.out          # per-function summary
```
Target 60–80% on business logic. Chasing 100% produces tests that assert implementation details and break on every refactor.

**On mocking (the NEW item) — in preference order:**

1. 🏆 **Hand-written fakes.** For a 1–3 method interface, a hand-written struct is clearer than any generated mock and adds zero dependencies. **Start here — this is the idiomatic Go default.**
   ```go
   type fakeNotifier struct{ sent []string }
   func (f *fakeNotifier) Send(ctx context.Context, to, body string) error {
       f.sent = append(f.sent, to); return nil
   }
   ```
2. 🐙 [**uber-go/mock**](https://github.com/uber-go/mock) (`go.uber.org/mock`) — when you have many large interfaces and want strict call/order assertions.
   > ⚠️ **Important, and your TOC's phrasing predates this:** the original `github.com/golang/mock` was **archived by Google in June 2023**. The maintained successor is **`go.uber.org/mock`** — same API, same `mockgen`, so migration is a one-line import change. **Teach `go.uber.org/mock`, not `golang/mock`.** Install: `go install go.uber.org/mock/mockgen@latest`
3. 🐙 [stretchr/testify](https://github.com/stretchr/testify) — `require`/`assert` plus `testify/mock`. Very widely used. Assertions are convenient; be aware they pull you away from stdlib idiom.
4. 🐙 [vektra/mockery](https://github.com/vektra/mockery) — generates testify-style mocks with a friendlier CLI and better generics support.
5. 🐙 [DATA-DOG/go-sqlmock](https://github.com/DATA-DOG/go-sqlmock) for the DB layer, or [testcontainers-go](https://github.com/testcontainers/testcontainers-go) to run a real MySQL in Docker for integration tests. The second is slower and far more honest.

🛠 **Practice:** get your Day 3 service to **≥70% coverage** with table-driven tests. Test handlers with `httptest.ResponseRecorder`, mock the notifier with a hand-written fake, then regenerate the same mock with `mockgen` and compare which test you'd rather read in six months.

---

### 4.6 · Benchmarking
*What are benchmarks? · Writing and running benchmarks · Additional libraries for testing*

- 🏆 📘 **[`testing` § Benchmarks](https://pkg.go.dev/testing#hdr-Benchmarks)** — official, and it explains the `b.N` loop, which is the one thing people get wrong.
- 📝 [Dave Cheney — *High Performance Go Workshop*](https://dave.cheney.net/high-performance-go-workshop/dotgo-paris.html) — 🏆 for benchmarking *methodology*: how to avoid measuring the wrong thing, and how to know when a difference is real
- 🐙 [golang/perf — `benchstat`](https://pkg.go.dev/golang.org/x/perf/cmd/benchstat) — statistical comparison of before/after runs. **This is the tool that turns benchmarking from vibes into evidence.**
- 📝 [go.dev/blog/pprof](https://go.dev/blog/pprof) — profile first, then benchmark the hot path

```go
func BenchmarkConcat(b *testing.B) {
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        var s string
        for j := 0; j < 100; j++ { s += "x" }
    }
}
```
```bash
go test -bench=. -benchmem -count=10 ./... > old.txt
# ...make your change...
go test -bench=. -benchmem -count=10 ./... > new.txt
benchstat old.txt new.txt          # is the difference statistically significant?
```

**The four rules:**
1. `b.N` is chosen by the framework — never hardcode an iteration count.
2. `b.ResetTimer()` after expensive setup; `b.StopTimer()`/`StartTimer()` around anything you're not measuring.
3. **`-benchmem` always.** Allocations are usually the real story; ns/op is the symptom.
4. **`-count=10` + `benchstat`.** A single run tells you nothing — machine noise is larger than most optimisations.

🛠 **Practice:** benchmark `+=` string concatenation against `strings.Builder` for 1000 iterations. Look at the `allocs/op` column, not the time. Then benchmark `append` to a preallocated `make([]int, 0, n)` versus a nil slice. Both results are memorable.

---

### 4.7 · Deploy and Monitor Services
*Build & deploy microservices with Docker · Track outbound requests, DB calls and other behaviour · Overview of GC, goroutine activity and memory · **NEW:** Structured logging & correlation IDs · Basic Prometheus metrics*

- 🏆 📘 **[Docker's Go language guide](https://docs.docker.com/language/golang/)** — build, run, and multi-stage images, officially maintained.
- 🏆 📝 **[Structured Logging with slog](https://go.dev/blog/slog)** — official. **`log/slog` has been in the standard library since Go 1.21**, and this is the modern answer for the logging half of this unit.
- 📘 [`log/slog`](https://pkg.go.dev/log/slog) · [`runtime/metrics`](https://pkg.go.dev/runtime/metrics) · [`net/http/pprof`](https://pkg.go.dev/net/http/pprof)
- 🐙 [prometheus/client_golang](https://github.com/prometheus/client_golang) — see [`examples/random`](https://github.com/prometheus/client_golang/tree/main/examples/random) for the minimal working setup
- 🐙 [rs/zerolog](https://github.com/rs/zerolog) — zero-allocation JSON logger; the fastest option, and the one named in your TOC
- 🐙 [uber-go/zap](https://github.com/uber-go/zap) — the other high-performance choice, widely used
- 📝 [OpenTelemetry Go](https://opentelemetry.io/docs/languages/go/) — distributed tracing, for the "track outbound requests and DB calls" line
- 📝 [A Guide to the Go Garbage Collector](https://go.dev/doc/gc-guide) — 🏆 official, and the best explanation of the GC overview this unit asks for

**Multi-stage Dockerfile — the ~15 MB image:**
```dockerfile
FROM golang:1.26 AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download                       # cached layer — deps change rarely
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app ./cmd/server

FROM gcr.io/distroless/static-nonroot
COPY --from=build /app /app
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/app"]
```
`CGO_ENABLED=0` gives a static binary; `-ldflags="-s -w"` strips debug info; distroless has no shell, so there's nothing for an attacker to pivot into. **This is the single most impressive five minutes of Day 4** — a Go service in a 15 MB image versus a 400 MB JVM image.

> ⚠️ **On the logging libraries in your TOC.** `log/slog` is now **stdlib** and should be the default — zero dependencies, structured, and every library is converging on its `Handler` interface. **`logrus` is in maintenance mode** (its own README says so; no new features). **`zerolog` is actively maintained and faster than slog** — a legitimate choice when logging is genuinely hot-path. Recommendation: **teach `slog`, mention `zerolog` as the performance option, and treat `logrus` as legacy you'll meet in old code.**

**Correlation IDs — the pattern, in full:**
```go
func RequestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := r.Header.Get("X-Request-ID")
        if id == "" { id = uuid.NewString() }
        ctx := context.WithValue(r.Context(), ctxKeyReqID{}, id)
        w.Header().Set("X-Request-ID", id)
        logger := slog.With("request_id", id)
        ctx = context.WithValue(ctx, ctxKeyLogger{}, logger)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```
Then **propagate that header on every outbound call** — HTTP, gRPC, Kafka. That's what makes one user complaint traceable across six services. This is why unit 3.2's context propagation mattered.

**The four golden signals to expose** (`/metrics`): request **rate**, **errors**, **duration** (a histogram, so you get p50/p95/p99), and **saturation** (in-flight requests, DB pool utilisation). `promhttp.Handler()` gives you Go runtime metrics — goroutine count, heap, GC pause — for free, which covers the TOC's "goroutine activity and memory" line.

⚠️ **Never expose `/debug/pprof` or `/metrics` publicly.** Bind them to an internal port or put them behind auth. `/debug/pprof` in particular will happily hand an attacker a heap dump.

🛠 **Practice:** containerise your service with the multi-stage build above and confirm the image is under 30 MB. Add `slog` JSON logging with request-ID propagation, a `/metrics` endpoint with a request-duration histogram, and `/debug/pprof` on a *separate* internal port. Then load-test it and read the heap profile.

---

### 4.8 · Discussion on Frameworks in Go
*Framework for microservices in Go · Gin web application framework*

- 🏆 📝 **[Mat Ryer — How I Write HTTP Services in Go](https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/)** — the strongest argument that for most services, you don't need a framework at all.
- 🐙 [avelino/awesome-go § Web Frameworks](https://github.com/avelino/awesome-go#web-frameworks) — the full landscape
- 🐙 [go-kit/kit](https://github.com/go-kit/kit) — microservice toolkit; explicit, verbose, powerful
- 🐙 [go-micro/go-micro](https://github.com/go-micro/go-micro) — opinionated microservices framework with service discovery baked in
- 🐙 [encoredev/encore](https://github.com/encoredev/encore) — modern "infrastructure from code" approach; interesting to demo

**The honest landscape:**

| Option | Reach for it when |
|---|---|
| **stdlib `net/http`** | Default since Go 1.22. Most services. Zero dependencies, zero lock-in. |
| **chi** | You want sub-router composition and a middleware ecosystem, still `http.Handler`-native |
| **Gin** | You want binding + validation + middleware in one package and accept `gin.Context` |
| **Echo** | Similar to Gin, more batteries, higher lock-in |
| **Fiber** | Only if you're chasing raw throughput — it's built on fasthttp, **not** `net/http`, so it's incompatible with the entire `http.Handler` middleware ecosystem. Know that before you adopt it. |
| **go-kit / go-micro** | Large microservice estates needing discovery, transport abstraction, circuit breaking |

**The point of this unit isn't to pick a winner.** It's this: Go's stdlib is unusually strong, so the Go community reaches for frameworks far less than the Java or Node communities do. Every dependency is something you patch, audit and eventually migrate off. Start with stdlib; add a framework when you can name the specific problem it solves for you.

🛠 **Discussion (30 min, in the room):** each trainee names one framework and argues for it in two minutes. Then the group picks a default for a new IndiaMART service and writes down *why*. The written rationale is the deliverable.

---

### 4.9 · Security Basics
*Input validation · SQL injection prevention · Secrets & configuration management*

- 🏆 🐙 **[OWASP Go Secure Coding Practices Guide](https://github.com/OWASP/Go-SCP)** — free, Go-specific, chapter per topic. **Best single resource for this unit** and the one to hand out.
- 📝 [OWASP Top 10](https://owasp.org/www-project-top-ten/) — the vulnerability classes themselves
- 📘 [`golang.org/x/crypto/bcrypt`](https://pkg.go.dev/golang.org/x/crypto/bcrypt) — password hashing. **Never** SHA-256 a password. Never store plaintext.
- 📘 [`crypto/subtle`](https://pkg.go.dev/crypto/subtle) — `ConstantTimeCompare` for tokens, to avoid timing attacks
- 🐙 [go-playground/validator](https://github.com/go-playground/validator) — struct-tag input validation
- 📝 [`govulncheck`](https://go.dev/blog/govulncheck) — 🏆 official vulnerability scanner. `go install golang.org/x/vuln/cmd/govulncheck@latest` then `govulncheck ./...`. **Put this in CI on Monday.** It reports only vulnerabilities your code actually *reaches*, so the signal-to-noise is far better than a generic dependency scanner.
- 🐙 [securego/gosec](https://github.com/securego/gosec) — static security analysis; also available as a `golangci-lint` linter

**SQL injection — the entire answer, in two lines:**
```go
// ❌ NEVER
db.Query(fmt.Sprintf("SELECT * FROM users WHERE email = '%s'", email))
// ✅ ALWAYS — placeholders; the driver sends value and query separately
db.QueryContext(ctx, "SELECT * FROM users WHERE email = ?", email)
```
Placeholders can't parameterise identifiers (table/column names). If those must be dynamic, validate against an **allow-list** — never interpolate user input into them.

**Input validation — the principles:**
1. **Validate at the boundary**, before anything reaches your service layer.
2. **Allow-list, not deny-list.** Define what's valid; reject everything else. Deny-lists always have a gap.
3. **Bound everything** — string lengths, array sizes, request bodies (`http.MaxBytesReader`), file uploads, pagination limits.
4. `DisallowUnknownFields()` on your JSON decoder — turns silent typos into `400`s.
5. **Escape on output, not input.** `html/template` does this contextually. (Back to 3.3.)

**Secrets:**
- Never in the repo. `.gitignore` your `.env` on day one, and audit with [gitleaks](https://github.com/gitleaks/gitleaks) before your first push.
- Environment variables, or a secret manager (Vault / AWS Secrets Manager / K8s Secrets).
- **Never log a secret.** Give secret types a `String()` method that returns `"[REDACTED]"` — then even an accidental `%v` is safe.
- Rotate on exposure. A secret pushed to GitHub is compromised even if you force-push it away; the commit is already scraped.

**Three more that belong in a first backend service:**
- Hash passwords with **bcrypt** (cost ≥ 12) or argon2id. Compare with `bcrypt.CompareHashAndPassword`, never `==`.
- Return **the same error** for "unknown user" and "wrong password" — otherwise you've built an account-enumeration oracle for free.
- Return **`404`, not `403`**, when someone requests another user's resource. A `403` confirms the resource exists, which is exactly what an enumeration attack needs.

🛠 **Practice:** run `govulncheck ./...` and `gosec ./...` against your Day 3 service and fix everything they find. Then deliberately write the vulnerable `fmt.Sprintf` query, exploit it with `' OR '1'='1`, and fix it. Doing the attack once is worth ten slides about it.

---

### 4.10 · 🎓 Capstone Project
*End-to-end project integrating REST + Database + Testing + Docker deployment*

Your TOC's capstone is exactly what this roadmap has been building toward. The package already ships one that matches — see **`04_Capstone_Project_Brief.md`** (**GoShort**, a URL shortener with user accounts) and **`05_Auto_Evaluation_System.md`**.

**To match this TOC exactly, make one change:** the shipped brief specifies in-memory storage. Swap it for **MySQL**, and the capstone then covers all four required areas:

| TOC requirement | Where it lands in GoShort | Units |
|---|---|---|
| **REST** | Versioned CRUD API, validation, pagination, consistent error envelope | 3.4, 3.6 |
| **Database** | MySQL via `database/sql`, pool config, one transactional path | 4.2 |
| **Testing** | Table-driven tests, `httptest` handlers, mocked store, ≥60% coverage | 4.5 |
| **Docker** | Multi-stage build, <30 MB image, graceful shutdown | 4.7 |
| *(bonus)* | bcrypt auth, ownership isolation, `slog` + correlation IDs, `/metrics` | 4.7, 4.9 |

The auto-grader clones the submitted commit, builds it, runs it in a sandbox, executes 64 black-box HTTP tests plus security probes, and returns a score out of 10 with a report naming every lost point and the unit that teaches it.

> 🔧 **One change needed in the grader** if you swap to MySQL: the rubric's in-memory assumption in `autograder/rubric.yaml` and the contract suite's setup will need a `docker compose` step to stand up MySQL before boot. Say the word and I'll wire that up.

---
---

## 🎓 What realistically fits in 4 days

An honest allocation, so nobody plans a session that can't land:

| Coverage | Units | Approach |
|---|---|---|
| ✅ **Full depth in the room** | 1.1–1.9, 2.1, 2.3–2.5, 3.1, 3.3, 3.4 | Teach + lab. These are the foundation; don't rush them. |
| ⚡ **Taught, needs reinforcement after** | 1.10, 2.2, 2.6, 3.2, 3.6, 4.1, 4.2, 4.5, 4.7 | Teach + short lab, then assign in the 30-day plan |
| 👁 **Demo / discussion only** | 3.5, 4.3, 4.4, 4.6, 4.8, 4.9 | Live demo and Q&A. The TOC already scopes gRPC this way — do the same for benchmarking and frameworks. |
| 📦 **Post-workshop** | 4.10 Capstone | 3–4 days of individual work, auto-graded |

**If you're forced to cut something, cut in this order:** 4.4 gRPC → 4.6 Benchmarking → 4.8 Frameworks discussion → 3.5 gorilla.
**Never cut:** 1.9 slices/maps, 2.1 interfaces, 2.4 race conditions, 3.1 channels, 3.2 context. Those five are what separate someone who can write Go from someone who can only read it.

---

## 📅 Post-Workshop — 30-Day Consolidation Plan

Four days creates exposure. These four weeks create competence.

| Week | Focus | Deliverable |
|---|---|---|
| **1** | Re-do Day 1 + 2 units solo, no notes. Work through [learn-go-with-tests](https://github.com/quii/learn-go-with-tests) start to finish. | All exercises pushed to a personal repo |
| **2** | Concurrency depth: re-implement the search engine and load balancer from scratch. Read [100go.co](https://100go.co/) §concurrency end to end. | Both projects, `-race` clean, zero goroutine leaks |
| **3** | Build the capstone (4.10). | Submitted repo + auto-graded score |
| **4** | Read real Go: pick one of [geektutu/7days-golang](https://github.com/geektutu/7days-golang) (build a web framework / ORM / RPC framework from scratch) or [wild-workouts](https://github.com/ThreeDotsLabs/wild-workouts-go-ddd-example). Then review a teammate's capstone against [CodeReviewComments](https://go.dev/wiki/CodeReviewComments). | 10 written review comments on someone else's PR |

**Daily, 30 minutes, throughout:** [Exercism Go track](https://exercism.org/tracks/go) — 2 exercises/day, free mentoring · [Gophercises](https://gophercises.com/) · [inancgumus/learngo](https://github.com/inancgumus/learngo)

---

## 🇮🇳 Indian Creators — for Hindi/Hinglish explanation

Useful when a concept doesn't land in English, and for Indian-context project examples.

| Creator | Best for | Link |
|---|---|---|
| **Hitesh Choudhary — *Let's go with golang*** | Day 1–2 fundamentals in Hindi. The most-watched Hindi Go series, with code on GitHub so you can follow along. | [Playlist](https://www.youtube.com/playlist?list=PLRAV69dS1uWQGDQoBYMZWKjzuhCaOnBpa) · [Code](https://github.com/hiteshchoudhary/golang) |
| **Coder's Gyan — *Master Golang in One Video* (Hindi)** | The catch-up video if you miss a day. Ends in a real-world API project — good companion to units 3.4/3.6. | [Video](https://www.youtube.com/watch?v=yZgwW6Yuc_E) |
| **Telusko (Navin Reddy)** | Slower-paced Go fundamentals in Indian English. Good if Hitesh's pace is too fast. | [Channel](https://www.youtube.com/@Telusko) |
| **Arpit Bhayani — *Asli Engineering*** | Not a Go tutorial — backend **depth**. Rate limiters, DB internals, system design. Best companion to units 3.2 and 4.2. | [Channel](https://www.youtube.com/@AsliEngineering) |
| **Kunal Kushwaha** | Docker/Kubernetes/cloud-native — the ecosystem unit 4.7 lives in. | [Channel](https://www.youtube.com/@KunalKushwaha) |

**International channels referenced throughout:** [@golang](https://www.youtube.com/@golang) (GopherCon talks) · [Anthony GG](https://www.youtube.com/@anthonygg_) (production backend patterns — highest signal on this list) · [Jon Calhoun](https://www.calhoun.io/) (pointers, slices, interfaces) · [TechWorld with Nana](https://www.youtube.com/@TechWorldwithNana) (toolchain + Docker) · [Melkey](https://www.youtube.com/@MelkeyDev) (modern Go backends)

---

## ⚠️ Trainer's Errata — where the TOC has aged

Four items where the ecosystem moved after this TOC was written. Each is worth 2 minutes in the room, because trainees searching online **will** find contradictory advice and lose time to it.

| TOC says | Reality in 2026 | Teach |
|---|---|---|
| **`dep`** (unit 2.2) | Deprecated since 2020, superseded by modules | Mention as history only |
| **gorilla/mux** (unit 3.5) | Archived Dec 2022, revived Jul 2023, [now tracked as discontinued](https://endoflife.date/gorilla). Go 1.22 stdlib `ServeMux` covers most of its use cases. | Concepts yes (you'll meet it in legacy code); stdlib or `chi` for anything new |
| **`gomock`** (unit 4.5) | `github.com/golang/mock` **archived by Google, June 2023** | **`go.uber.org/mock`** — same API, one-line import change |
| **`logrus`** (unit 4.7) | In maintenance mode, no new features. `log/slog` is stdlib since Go 1.21. | **`slog`** as default; `zerolog` when logging is hot-path; `logrus` as legacy |

Two more worth mentioning as *additions* rather than corrections: **`slices`/`maps`** became stdlib in Go 1.21 (unit 1.9 — most tutorials still hand-roll these), and **`govulncheck`** should be in CI from day one (unit 4.9).

---

## 🖨 Reference Card

```
# build & run
go run .                        go build -o bin/app ./cmd/app
go install ./cmd/app            GOOS=linux GOARCH=amd64 go build

# quality — run all four before every commit
gofmt -l -w .                   go vet ./...
golangci-lint run               go test -race -cover ./...

# modules
go mod init <path>              go mod tidy
go get pkg@v1.2.3               go mod why <pkg>

# testing & performance
go test -run TestName -v ./pkg  go test -bench=. -benchmem -count=10
go tool cover -html=cover.out   benchstat old.txt new.txt
go tool pprof cpu.out           dlv debug ./cmd/server

# security
govulncheck ./...               gosec ./...

# docs
go doc net/http.Handler         go doc -all strings
```

---

## 📚 Master Resource Index

**Official** — [Tour](https://go.dev/tour/) · [Effective Go](https://go.dev/doc/effective_go) · [Spec](https://go.dev/ref/spec) · [pkg.go.dev](https://pkg.go.dev/std) · [Blog](https://go.dev/blog/) · [Wiki](https://go.dev/wiki/) · [FAQ](https://go.dev/doc/faq) · [Playground](https://go.dev/play/) · [Modules Ref](https://go.dev/ref/mod) · [GC Guide](https://go.dev/doc/gc-guide)

**Learn** — [Go by Example](https://gobyexample.com/) · [learn-go-with-tests](https://github.com/quii/learn-go-with-tests) · [100go.co](https://100go.co/) · [Exercism](https://exercism.org/tracks/go) · [Gophercises](https://gophercises.com/) · [inancgumus/learngo](https://github.com/inancgumus/learngo) · [go-database-sql.org](http://go-database-sql.org/)

**Repos** — [awesome-go](https://github.com/avelino/awesome-go) · [go-patterns](https://github.com/tmrts/go-patterns) · [7days-golang](https://github.com/geektutu/7days-golang) · [wild-workouts](https://github.com/ThreeDotsLabs/wild-workouts-go-ddd-example) · [project-layout](https://github.com/golang-standards/project-layout) · [uber-go/guide](https://github.com/uber-go/guide) · [OWASP Go-SCP](https://github.com/OWASP/Go-SCP) · [cheat-sheet](https://github.com/a8m/golang-cheat-sheet)

**Blogs** — [Dave Cheney](https://dave.cheney.net/) · [Alex Edwards](https://www.alexedwards.net/blog) · [Ardan Labs](https://www.ardanlabs.com/blog/) · [Three Dots Labs](https://threedots.tech/) · [Mat Ryer on HTTP services](https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/) · [Google Go Style Guide](https://google.github.io/styleguide/go/)

**Stay current** — [Golang Weekly](https://golangweekly.com/) · [Go Time podcast](https://changelog.com/gotime) · [r/golang](https://www.reddit.com/r/golang/) · [Gophers Slack](https://invite.slack.golangbridge.org/)

---

*Every unit above maps 1:1 to a row in the Get Set GO TOC. Work top to bottom and you'll have covered the syllabus with the best free resource available for each topic.*
