---
title: Running Go programs with a specific version
date: 2024-05-10
tags: [go, versioning, backward-compatibility]
excerpt: This post shares how you can run an old version of Go while still having your machine's default Go - which is newer.
category: Go
---

## Brief

Although Go releases are incremental and follow the Go compatibility promise: unless the change is required for a bug or security fix, the version starting with 1 won't experience any backward-breaking change to the language or standard library, you can have a reason to use an old version of the language.

Is there a clean way to do this?

## Recommendation

I recommend a tool like go version manager that helps to manage a systemwide version of the language. The advantage of this is the ease it allows. A simple `gvm use 1.22`, would ensure the `1.2` version of the langugage is installed system-wide.

## Optimal Solution

A better approach is not to compromise the global Go installation but to run a specific code with a specific version of Go installation and discard the installation once done. Go supports this easily.

To do this, firstly, use the `go get` command to download a specific version of the language as a package:

```bash
go get golang.org/dl/go1.22.3
```

The above command would download an executable named after the version. Now, use the executable to issue a final command that would do the setup.

```bash
go1.22.3 download
```

Once this is done, use the named executable(go1.22.3) to run go commands, example:

```bash
go1.22.3 run main.go
```

### Cleanup

Cleaning up the installation is the same as deleting the installation from the filesystem. The command `go1.22.3 env GOROOT` reveals the installation folder for the version of the go executable, now use `rm` command to delete it.

```bash
rm -rf $(go1.22.3 env GOROOT)
```

Finally, the system wide go installation, `go1.22.3` is a package that has an executable, remove the installed executable with the command:

```bash
rm $(go env GOPATH)/bin/go1.22.3
```

[Obrigado](https://translate.google.com/?sl=auto&tl=en&text=Obrigado&op=translate)
