---
title: Cargo - The Rust package manager
date: 2025-09-27
tags: [rust, cargo]
category: Rust
description: Cargo's Rust package manager, how to install and what functionality it provides
summary: Cargo's Rust package manager, how to install and what functionality it provides
draft: true
---

### Motivation

A complete installation of Rust includes Cargo. In this post, I share what Cargo is, and the functionality that it provides, and a how to install it if it is not currently installed.

## Cargo...

Cargo is a package manager that works similar to how many other package managers work. It is responsible for managing the dependencies of a Rust project. Dependencies – also called packages, are external code that live somewhere else written and maintained by other people with the intention of providint shared functionalities that do not need to be invented. In Rust packages are called crates mostly, still I will interchange between package and crate frequently - be aware.

### Checking installation

The easiest way to check if Cargo is installed is by running the help command of Cargo

```bash
cargo --help
```

It should show a result similar to this:

![image-20250927204829772](/assets/image-20250927204829772.png)

In anycase there is an error, do check this post on [how to install Rust](/post/rust-installation/)

## Functionalities

As seen from the help page, Cargo can do a lot of stuffs, but for everyday Rust development, the `new`, `build`, `add`, `run`, `test` can come handy.

### `cargo new` command

The recommended way of creating a new Rust project is by running `cargo new` command. It

#### The cargo.toml file

This is a manifest file used to manage the information about a Rust project managed by cargo, it is in toml format. It contains the name of the project, the version for the project, and the dependencies. To add a new dependency to the cargo.toml file, run `cargo install name-of-package`  

### `cargo build` command



### `cargo run` command



