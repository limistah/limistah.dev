---
title: Chapter Two - Exercise 2.2-1
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.2-1"]
summary: Solution to Exercise 2.2-1 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-22-1
math: true
---

## ❓ Question
<blockquote>

Express the function $n^3/100 + 100n^2 - 100n + 3$ in terms of $\Theta$- notation.

</blockquote>

## 💡 Answer

<blockquote>

We can express it as $n^3 * 1/100 + 100 * n^2 + 100 * n + 3$

Making 1/100 as a, and the first 100 as b and the last 100 as c

$a * n^3 + b * n^2 + c * n + 3$

$an^3 + bn^2 + cn + 3$

Ignoring the coefficients

$n^3 + n^2 + n$

The running time is a quadratic function of n.

$ \Theta(n^3) + \Theta(n^2) +\Theta(n)$

Such that $n^3$ > $n^2$ > $n$.

The most significant part of the running time is  $\Theta(n^3)$ as we can eliminate the less significant part.

So,

$n^3 * 1/100 + 100 * n^2 + 100 * n + 3$ = $\Theta(n^3)$

</blockquote>
