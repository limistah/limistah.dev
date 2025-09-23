---
title: Rust - Hello World
date: 2025-09-23
tags: [rust]
category: Rust
description: The basic Rust program that can ever exist
summary: The basic Rust program that can ever exist
---

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

A function statement starts with the fn keyword followed by the name for the function and a parantheses to take the arguments for the function then a pair of braces for the block of code that should run whenever the function is called/invoked.

### The `main` fn

Rust like its pairs uses an entry point for all of its programs, this is the code that executes first before any other when a Rust program is executed.

The main function declaration will look like this:

```rust
fn main() {
	// Some awesome code
}
```

### Printing to standard output

The hello world program needs to print something on the screen, Rust provides an inbuilt function that handles this I/O operation called `println`. Its duty is to take whatever value is passed to it and send to the standard output, which is mostly the terminal that the program is running on.

### Bringing it together

Having an entry point for the program, also, a function to output to standard output, a useful program can be built.

```rust
fn main() {
	println!("hello world!");
}
```

\*Ignore the `!` after the println statement for now.

Save the file as `main.rs` and compile this using the rustc tool.

```bash
rustc main.rs
```

This will produce an executable binary that can be executed by running

```bash
./main
```

```bash
> hello world
```

Phew!!!

