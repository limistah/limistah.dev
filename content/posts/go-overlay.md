---
title: Managing local configuration with Go -overlay flag
tags: [go, compiler]
date: 2026-09-20
category: go
summary: Control the behavior of Go programs using custom Go files overriding the original file at compile time without affecting the eventual binaries.
---

### Motivation

I was working on a local stack setup for some of my projects, and I need a local dependencies setup that doesn't tamper with the actual config that the team relies on or modify the worktree, and importantly, _avoiding merge conflicts_.

A little research helped me discover the Go compiler's [`-overlay=overlay.json`](https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies) flag that completely answers my question.

## The `-overlay` flag

The Go compiler has a lot of useful configuration, which I believe can come in useful in certain circumstances. One that I believe should be popular due to the inherent behavior it enables is the `-overlay` flag.

The flag expects a relative path to a JSON file that specifies Go source files and paths to their replacement files, but both files(original and replacement) do not need to contain the same code. This is useful and can be powerful in areas of bespoke functionality that never affects the base source code.

## When this is useful

In this age of agentic software engineering, features like this in everyday tools enable coding agents to do the unbelievable. Take, for instance, my special use case:

> I need to be able to run both the frontend and backend of my project locally, provide runtime configuration to the backend code without altering any part of the source code, inherently preserving the upstream behavior of the project, while customizing the local copy to behave how I want.

Or even more bespoke:

> Having a generic file that works in production on how the software is meant to behave, but the runtime differs a little bit from the production environment. There can be different implementations across the environment; then apply them at compile time in those different environments.

For my use case, it makes it easier for an AI agent to work completely offline, with all the dependencies provided. An `env` file can not work here because the secrets that I rely on, which I don't want to replicate locally or regenerate across my dependent services, are more than just infrastructure secrets. The goal is to always rely on my upstream secret management, then customize only a subset of the keys before runtime, and no better way to do that than overlaying the original file that loads the secrets to override the upstream values.

The other use cases for this should be obvious, but as with many of the features of technologies, you appreciate they exist when you need them; this is one of those features for me.

## How to set this up

Suppose you have this project

```txt
myapp/
├── go.mod
├── main.go
└── config/
    └── config.go
```

and in your `config.go`

```go
package config

const Environment = "production"
```

And in `main.go`

```go
package main

import (
	"fmt"
	"myapp/config"
)

func main() {
	fmt.Println(config.Environment)
}
```

When you run this program, you should get the obvious result:

```txt
production
```

### Setting up an alternative config file

Suppose you create another directory:

```txt
overlay/
└── config.go
```

And `overlay/config.go` contains:

```go
package config

const Environment = "development"
```

Also, in the project root, create an `overlay.json` file that contains:

```json
{
  "Replace": {
    "/absolute/path/to/myapp/config/config.go": "/absolute/path/to/myapp/overlay/config.go"
  }
}
```

Then compile with:

```bash
go build -overlay=overlay.json.

```

The Go compiler will behave as if the original project's `config/config.go` contained:

```go
package config

const Environment = "development"
```

As such, `go build -overlay=overlay.json .` will produce a binary where the value of `config. Environment` is `development`.

{{< figure src="/assets/go-overlay.jpeg" title="Go compiler overlay" caption="" align="center" >}}

Neat!!!
