---
title: Chapter Two - Exercise 2.1-3
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.1-3"]
summary: Solution to Exercise 2.1-3 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-21-3
---

## ❓ Question
> Rewrite the INSERTION-SORT procedure to sort into monotonically decreasing instead of monotonically increasing order.

## 💡 Answer

> 
> A monotonically decreasing order means starting from the highest element to the lowest: 23,22,21,20
>
>
> The monotonically increasing order for insertion sort is:
>
```text
INSERTION-SORT (A, n)
  for i = 2 to n
    key = A[i]
    j = i - 1
    while j > 0 AND A[j] > key
      A[j+1] = A[j]
      j = j - 1
    A[j + 1] = key
```
> The monotonically decreasing order would be:
>
>
```text
INSERTION-SORT (A, n)
  for i = n - 1 to 1
    key = A[i]
    j = i + 1
    while j < n AND A[j] < key
      A[j-1] = A[j]
      j = j + 1
    A[j - 1] = key
```