---
title: Chapter Two - Problem 2.2
keywords: ["introduction to algorithms", "cormen", "algorithms", "Problem 2.2"]
summary: Solution to Problem 2.2
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/problem-2-2
math: true
---

## ❓ Question
<blockquote>


Correctness of bubble sort

Bubble sort is a popular but inefficient sorting algorithm. It works by repeatedly swapping adjacent elements that are out of order. The procedure BUBBLESORT sorts array A[1:n]

```text
BUBBLESORT(A, n)
1  for i = 1 to n - 1
2     for j = n downto i + 1
3         if A[j] < A[j-1]
4           exchange A[j] with A[j-1]
```

1. Let $A'$ denotes the array A after BUBBLESORT(A, n) is executed. To prove that BUBBLESORT is correct, you need to prove that it terminates and that
$A’[1] ≤ A’[2] ≤ …. ≤ A’[n]$……………… **(2.5)**
In order to show that **BUBBLESORT** actually sorts, what else do you need to prove?
2. State precisely a loop invariant for the for loop in lines 2-4, and prove that this loop invariant holds. Your proof should use the structure of the loop-invariant proof presented in this chapter.
3. Using the termination condition of the loop invariant proved in part (b),  state a loop invariant for the for loop in lines 1-4 that allows you to prove inequality (2.5). Your proof should use the structure of the loop-invariant proof presented in this chapter.
4. What is the worst-case running time of BUBBLESORT? How does it compare with the running time of INSERTION-SORT?

</blockquote>


## 💡 Answer

<blockquote>

</blockquote>