---
title: Managing local configuration with Go -overlay flag
tags: [go, compiler]
category: go
summary: Control the behavior of Go programs using custom Go files overriding the original file at compile time without affecting the eventual binaries.
---

###

I was working on a local stack setup for some of my work, but I don't want to tamper with the actual config that the team relies on, importantly, avoiding merge conflicts. Looking deeper on how I can achieve this, I found the Go compiler -overlay flag which works perfectly for my usecase. Enjoy.

## The `-overlay` flag

The Go compiler has a lot of useful configuration, and I believe they can come usefule in certain circumstances. One that I believe should be popular due to the inherent behavior it enables is the -overlay flag.

The flag expects a relative path to a Go source file, and a path to a replacement file, and both file does not need to contain exactly the same code, and this can be very useful in areas of bespoke functionality that never affects the base source code.

## When this is useful

In this age of agentic software engineering, features like this in everyday tools enable coding agent to do the unbelievable. Take for instance my special usecase:

I need to be able to run the frontend and backend of my project locally, provide runtime configuration to the backend code without altering any part of the original source code, inherently preserving the upstream behavior of the project, while customizing the local copy to behave how I want.

Or

I want to have a generic file that works on production on how the software is meant to behave, but, the runtime differs a little bit from the production environment, I want to have different implementation across the environment, then apply them at compile time in these different environment.

For my usecase, it makes easier for AI agent to work completely offline, all dependencies provided for. An env file can not work here because the secret that I rely on are more than the infrastructure secrets which I don't want to replicate locally or regenerate across my dependent services. The goal is to always rely on my upstream secret management, then, customize only a subset of the keys before runtime, and no better way to do that than overlaying the original file that loads the secrets to override the upstream values.

The other usecases for this should be obvious. But as many of the features of technologies, you appreciate they exist when you need them, this is one of those features for me.

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

And in the `main.go`

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

When you run this program you should get the obvious result:

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

go build -overlay=overlay.json .

```

The Go compiler will behave as if the original project's `config/config.go` contained:

```go
package config

const Environment = "development"
```

As such, `go build -overlay=overlay.json .` will produce a binary where `config.Environment` value is `development`.

Neat!!!
