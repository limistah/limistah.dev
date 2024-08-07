---
title: Go - constant variables and const keyword
date: 2024-05-12
tags: [programming, go ]
category: Go
---

## Brief

Programming languages have the notion of constants which means "variables that can not be mutated once declared and initialized". 

Go also has almost the same meaning, but in a different context. To initialize a variable as a constant with a value of 10, we can do something like this:

```go
const DISCOUNT = 10
```

In Go, constants mean "storing a literal to a variable", this can be seen as a version of pattern matching in Erlang.

[Literals in go](https://www.phind.com/search?cache=n05row4wk42ocrf4520s6vzm) are constructs that can create an instance of strings, numbers, booleans, composite structures, functions, or expressions. Hence unlike many programming languages, constants in go can be `const FN = fun () { fmt.Println("Hello World") }`.

### An explanation

Initializing a variable as a constant means the variable holds the value and possibly the type of the literal it is assigned to. Anywhere the `DISCOUNT` above is used, the compiler assumes that as writing the integer literal `10`.

At compile time, the compiler swaps all representations of a constant value with the value it was assigned to. Such that

```go
func main () {
  fmt.Println("%v", DISCOUNT)
}
```

would become

```go
func main () {
  fmt.Println("%v", 10)
}
```

### Big difference

In some programming languages, Constants mean the value of a variable once declared and initialized can never change

In contrast to what we have understood – constants are used to enforce that a variable is immutable, in Go, constants can be used to assign names to a literal exactly once, while at compile time, the name is swapped with the value of the constant - ensuring cleaner code, the idiomatic go.



Shalom...
