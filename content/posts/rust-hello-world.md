---
title: Rust - Hello World
date: 2025-09-23
tags: [rust]
category: Rust
description: The basic Rust program that can ever exist
summary: The basic Rust program that can ever exist
---

### Motivation

Just like in many other programming languages, the easiest and most re-invented program is the hello world program. This post shows how to create an Hello World program in Rust.

## The main fn

Rust like its pairs uses an entry point for all of its programs, this is the code that executes first before any other when a Rust program is executed.

### Function in Rust

A function statement in Rust has the below structure:

```rust
fn name() {
	// Change The World!
}
```

It starts with the `fn` keyword followed by the name for the function and a parantheses to take the arguments for the function then a pair of braces for the block of code that should run whenever the function is called/invoked.

### The `main` fn

Rust like its pairs uses an entry point for all of its programs, this is the code that runs first before any other when a Rust program is executed.

The main function declaration looks like this:

```rust
fn main() {
	// Some awesome code
}
```

### Printing to standard output

The hello world program needs to print something to the screen, Rust provides an inbuilt function called `println` that handles this I/O operation. Its duty is to take whatever value is passed to it and send to the standard output, which is mostly the terminal that the program is running on.

### Bringing it together

Having an entry point for the program, also, a function to output to standard output, a useful program can be built.

Hence, a hello world program

```rust
fn main() {
	println!("hello world!");
}
```

\*Ignore the `!` after the `println` statement for now.

Save the code in a file named `main.rs` then compile using the [rustc](https://doc.rust-lang.org/rustc/) tool. If you might need to [install it](/posts/rust-installation/).

```bash
rustc main.rs
```

This will produce an executable binary that can be executed by typing this in the command line.

```bash
./main
```

And it should output:

```bash
> hello world
```



Phew!!!

