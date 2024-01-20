---
title: Autocompile Go
date: 2021-08-21
tags: [go, autocompile, livereload]
category: Go
excerpt: Build and run your Go project automatically while developing
---

First, install CompileDaemon:

```bash
$ go get github.com/githubnemo/CompileDaemon && go install github.com/githubnemo/CompileDaemon
```

Then, from the root of the project, create a Make file:

```bash
$ touch Makefile
```

And add the below content:

```makefile
GOCMD ?= go
GOBUILD = $(GOCMD) build
GOCLEAN = $(GOCMD) clean
GOTEST = $(GOCMD) test
GOGET = $(GOCMD) get
BINARY_NAME = project_name
BINARY_UNIX = $(BINARY_NAME)_unix

default: all

all: test build
build:
	$(GOBUILD) -o ../$(BINARY_NAME) -v -ldflags="-X main.VERSION=$(TAG)"

test:
	$(GOTEST) -v ./...

clean:
	$(GOCLEAN)
	rm -f $(BINARY_NAME)
	rm -f $(BINARY_UNIX)

run: build
	./$(BINARY_NAME)

dev:
	CompileDaemon -build="$(GOBUILD) -o ../$(BINARY_NAME)" -command="../$(BINARY_NAME)" -color="true" -exclude-dir=.git -exclude=".#*"
```

Finally, from the root of your project:

```bash
$ make dev
```

Voila!
