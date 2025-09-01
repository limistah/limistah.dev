---
title: The C Programming Language
giscus: false
---

C is a general-purpose programming language and is closely associated with Unix systems where it was developed. It is a machine independent language and often time called system programming language due to its usefulness in writing compilers and operating systems.

C picked up ideas from BCPL developed by Martin Richards who took ideas from B developed by Ken Thompson in 1970 for the first UNIX systems using DEC PDP-7.

Both B and BCPL are untyped languages, whereas C has fundamental types like characters, integers, floating-point numbers, etc., and derived data types like pointers, arrays, structures, pointers, and unions. C has expressions and operands, where any expression can be a statement.

C supports fundamental control flow constructions required for well-structured programs: statement groupings, decision-making selecting one of a set of possible cases, looping with termination test at the top or the bottom, and early loop exit.

Functions in C can return values of fundamental and derived data types. Local variables are automatic - does not need a manual creation process, and can be reinitialised with a new invocation. A function can not be nested: no function expression, but variables can be block-scoped. Function compiled differently from a source file can be used in another source file. Variables can be function scoped, or global scoped within a single source file or visible to the entire program.
Macro substitution can be performed on program text, to include other source files, and conditional compilation using preprocessing steps.

Because C deals with the same set of objects that most computers do, the language can be said to be a relatively low-level language. 

The language does not deal directly with composite objects and no operation that manipulates an array or string even though the structure may be copied as a unit. there is no storage allocation facility aside from static allocation and stack provided by variables and functions; there is no heap or garbage collection. Finally, C does not provide any I/O facility, most C implementations have included a reasonable standard collection of I/O functions.

Also, C offers only straightforward single-thread control flow: tests, grouping, and subprograms but no multiprogramming, parallel operations, synchronization, or coroutines.

The unavailability of these features seems like a great deficiency in the language, but this under-weighs the benefit of keeping the language at a modest size - it can be used in a very small environment and even learned quickly. A programmer can reasonably expect to know and understand and indeed regularly use the entire language.

In 1983, a modern, comprehensive definition of C was developed by a committee established by the American National Standards Institute (ANSI), which became the ANSI C and was completed in 1988 most of the features of the standards are already implemented by modern C compilers.

C, like any other language has its blemishes. Some of the operators have the wrong precedence; some parts of the syntax could be better. Nonetheless, C has proven to be an extremely effective and expressive language for a wide variety of programming applications. - pg 3