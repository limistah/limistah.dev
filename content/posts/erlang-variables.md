---
title: Erlang Variables
date: 2021-06-14
tags: [Erlang, erlang-variables]
excerpt: Learn the rules to delcare and use variables in Erlang
---

If you have worked with other languages like JavaScript, Java, Python etc, you would be surprised by what Erlang understands as variable.

In Erlang, variables starts with uppercase letter, thus, `C`, `X`, `Ape`, `Ant` are all valid identifiers for Erlang variables.

Variables can not start with lowercase letter or begin with a number.

Erlang variables can include can alphanumeric characters, an underscore and @ symbol.

```erlang
X = 1. %% Valid
y = 2. %% Invalid
1X = 2. %% Invalid
```

When _assigning_ to a variable - as we do call it in other languages, Erlang actually does something called _pattern matching_. Comparing the values on the right to the values on the left.

A pattern match would only succeed if the two operands match.

Thus, in Erlang, a variable get assigned to if it is either `unbound` or has the same value as the value at the right.

The `=` is a special symbol that does not do assignment but makes the pattern matching operation to be successful if its conditions are met.

Hence, in Erlang `=` is known as a pattern match operator which evaluates the value of the right hand side (RHS) then matching the result with the left hand side (LHS)

```erlang
X = 1. %% successful
Y = 2. %% successful
Z = X + 1. %% successful, Z is unbound to

Z. %% => 3

Z = 3 %% successful, Z is now 3, but, we want it to have the value 3
Z = 4 %% fails, Z is already holding 3, and 4 won't match against it.
```

There is nothing as global or private scope in Erlang, all variables are lexically scoped and are unrelated even if they exists in different functions;

![Erlang Variables](/assets/erlang-variables.png)

---

Continue to the next post on **Erlang Learning**: [Erlang Pattern Matching](/blog/erlang-pattern-matching/)

Ciao!
