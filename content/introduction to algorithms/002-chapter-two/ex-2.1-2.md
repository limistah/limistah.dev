---
title: Chapter Two - Exercise 2.1-2
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 1.1-1"]
summary: Solution to Exercise 2.1-2 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-21-1
---

## ❓ Question
> Consider the procedure SUM-ARRAY on the facing page. It computes the sum of n numbers in array A[1:n]. State the loop invariant for this procedure, and use its initialization, maintenance, and termination properties to show that the SUM-ARRAY procedure returns the sum of the numbers in A[1:n].

## 💡 Answer

```text
SUM-ARRAY(A, n)
sum = 0
for i = 1 to n
  sum = sum + A[i]
return sum
```

> The procedure accepts and Array (A) and the length of the array(n)
>
> Using loop invariant
>
> **Initialization**: 
> By assigning i to 1 the loop is initialized, executing the vode inside of the body of the loop. The code takes the current value of i in this case 1 as an index in the Array A. It then pulls the value at that index and add it to the last value of the sum in this case zero, before reassigning that value to sum itself.
>
> **Maintenance**: 
> The loop is maintained by incrementing the value of i, which in turn activates the body of the loop, pulling the value from the array at the index i, adding it with the previous sum, then storing it in the sum variable.
>
> **Termination**:
> The loop terminates when i is equal to n(the length of the array).
>
> At the termination of the loop, all the items in the Array (A) must have been processed in the body of the loop. 
>
> The body of the loop stores the sum of A[1: i] by evaluating the sum of A[1 : i - 1]  (i.e the sum of previous elements) and the value of A[i] .
> 
> At the end of the loop, sum = SUM(A[1:n])
>
> The algorithm is correct.