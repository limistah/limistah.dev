---
title: Erlang Functions
date: 2021-06-21
tags: [Erlang, pattern-matching]
excerpt: Create and use Erlang functions. Learn Erlang function overloading using pattern matching.
---

When programming Erlang, you should think like you are writing an English essay. In Erlang, functions are not very different to what a traditional programming language offers, but they are written very differently in Erlang.

To declare a function in the Erlang Repl, you will have to use the `fun` keyword.

```erlang
Name = fun(X) -> X.
```

The above code will store the the declaration of a function called `Name` and would receive an argument called X.

As you can see, there is no `return` keyword to specify the return value. In Erlang everything is an expression and must have a value, to ease working with function, the last expression of the function becomes the value of the function, hence `X` here is the value of the anonymous function that we defined.

Consider this basic function declaration in an Erlang Repl

```erlang
Rectangle_Area = fun({Width, Height}) -> Width * Height end.
```

This is very easy to read right. Building up on the pattern matching lesson, it is clear that the function declaration is doing pattern matching to identify its arguments.

If you think like I do, you will see that we can overload function with different arguments. Like this:

```erlang
Price = fun({car}) -> 20;
           ({bottle}) -> 1;
           ({fish}) -> .5
        end.
```

It should be noticed that we have defined the same function with different arguments. Erlang understands that when we try to call this function, it should do a pattern match against the argument to determine which declaration it should run.

Hence, if `Price` is called with `{car}`, it would run the code for `Price = fun({car}) -> 20`.

One subtleness to notice is that when you are doing function overloading, you should separate function definitions with semicolon `;` and end the last function with `end.`.

High Order Function is a unique feature of functional programming languages, Erlang ships with this great feature. Erlang functions can be passed as argument, and functions can return another function.

```erlang
Map = fun([H|T],F) -> [ F(H) | map(F,T) ],
         ([], _) -> []
      end.
%% 2,4,6,8,10,12,14,16,18
Map([1,2,3,4,5,6,7,8,9], fun(X) -> 2 * X end).
```

You should not worry your self with some of the syntax here, we will discuss them very shortly. What you should be concerned with is how we have been able to pass functions to another function call.

### BIFs

This is a short acronym for Build In Functions. Erlang ships with a handful of useful built in functions. [Check here]() for a complete list of the BIFs shipped in every erlang installation.

Now that you have this basic understanding of functions, move up the ladder to know about [modules](/blog/erlang-modules).
