---
title: Chapter Two - Exercise 2.2-4
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.2-4"]
summary: Solution to Exercise 2.2-4 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-22-4
math: true
---

## ❓ Question
<blockquote>

How can you modify any sorting algorithm to have a good best-case running time?

</blockquote>

## 💡 Answer

<blockquote>

The best running time is $0(1)$, which for sorting is not feasible – the best sorting algorithm runtime is $\Theta(n)$.

To achieve $\Theta(n)$ running time – which is the best runtime for any sorting algorithm, we could take a couple of approaches:

1. We don’t sort all. This is considering that the algorithm is already sorted. We can determine this in $\Theta(n)$ time using a for loop.

2. While the sorting algorithm is running, we could determine if the rest of the items are sorted already, and return early instead of passing through them casually, taking up some runtime. Many “pass‑based” sorts (bubble, cocktail, gnome, even insertion sort) can keep a flag that tracks “did I make any swaps (or shifts) on this pass?” If on the first pass you do zero swaps, you stop immediately—again Θ(n) work total.

</blockquote>
