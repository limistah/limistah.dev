---
title: An introduction to Erlang
date: 2021-06-12
tags: [Erlang, distributed-programming]
excerpt: What is Erlang, how Jor Armstrong came about it, and variable basics.
---

If you have used WhatsApp or Facebook Chat, then you have one way or the other interacted with an Erlang-backed system.

Erlang is a language created for the telecommunication industry by [Jor Armstrong](<https://en.wikipedia.org/wiki/Joe_Armstrong_(programmer)>), [_Robert Virding,_]() and _Mike Williams_ in 1986. It was recorded that [Jor Armstrong](<https://en.wikipedia.org/wiki/Joe_Armstrong_(programmer)>) claimed he was provided a library and did not know what to do with it, then they taught him to solve the reliability and concurrent problem of the telecommunication industry, and that gave birth to Erlang.

The strength of Erlang lies in running scalable applications in a [Distributed environment](https://en.wikipedia.org/wiki/Distributed_computing). It allows computers to network with each other with a very little overhead on the programmer and the operating system.

In this post, we will be getting a formal introduction to Erlang and we are just covering the basics. We would be covering variables, funcs (functions), modules, types, records, maps, processes, and distributed systems.

The whole of the [OTP framework](/blog/erlang-otp) won't be covered. In the future, we will be having a post about this!

## Installation and Initialization

For a thorough guide on how to install Erlang runtime on different platforms, check out [Bruce Yinhe's post on Medium](https://medium.com/@brucifi/erlang-quick-install-a3b7fd96947f) about this.

After a successful installation, open a terminal/CMD, and type in `erl`,
a default welcome message and prompt should be seen. Great, welcome to the Erlang world.

![Erlang welcome message](/assets/erlang-default.png)

---

Now that we have covered the basic installation, follow the links below to learn more about Erlang and its syntax.

- [Variables](/blog/erlang-variables)
- [Pattern Matching](/blog/erlang-pattern-matching)
- [Funcs](/blog/erlang-functions)
- [Modules](/blog/erlang-modules)
- [Types](/blog/erlang-types)
- [Records](/blog/erlang-records)
- [Maps](/blog/erlang-maps)
- [Processes](/blog/erlang-processes)
- [Processes communication](/blog/erlang-processes-communication)
- [Distributed system](/blog/erlang-distributed-system)
