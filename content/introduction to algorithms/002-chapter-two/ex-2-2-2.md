---
title: Chapter Two - Exercise 2.2-2
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.2-2"]
summary: Solution to Exercise 2.2-2 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-22-2
math: true
---

## ❓ Question
<blockquote>

Consider sorting $n$ numbers stored in array $A[1:n]$ by first finding the smallest element of $A[1:n]$ and exchanging it with the element in $A[1]$. Then find the smallest element of $A[2:n]$, and exchange it with $A[2]$. Then find the smallest element of $A[3:n]$, and exchange it with $A[3]$. Continue in this manner for the first $n - 1$ elements of $A$. 

Write the pseudocode for this algorithm, which is known as selection sort. 
What loop invariant does this algorithm maintain?
Why does it need to run for only the first $n - 1$ elements, rather than for all $n$ elements? 
Give the worst-case running time of selection sort in $\Theta$-notation. 
Is the best-case running time any better?

</blockquote>

## 💡 Answer

<blockquote>

**Algorithm**

```text
SELECTION-SORT (A, n)
  for i = 1 to n
    min_index = i
    for j = i + 1  to n:
        if A[j] < key
          min_index = j
    SWAP(A, i, j)

SWAP(A, i, j)
    temp = A[i]
    A[i] = A[j]
    A[j] = temp
```

**Loop Invariant**

Initialization:

Maintenance:

Termination:

In the case of selection sort, all the elements at $A[1:i]$ are sorted containing an increasing order of the smallest values in the array while the sub array $A[i:n]$ remains unsorted. To sort the unsorted part, we need to find the smallest element from $A[i+1:n]$ and swap with $A[i]$, removing the need to start searching from the first element which in turn could mean looping through the inner loop for every element, we only loop through the entire loop in $n-$ times for the first element, and for each element  $A[i]$, we have to loop $n - i$ elements to get the array sorted.

The worst case running time would occur at the first element. The Outer loop runs at $\Theta(n)$ for the first item at index $i$, but to get the index of the lowest element from the sub array A[$i+1$: $n$], the inner loop has to run $n - i + 1$ times comparing each element to determine the lowest. Combining both run times $(n)(n-)$ becomes $n^2 - n$, and taking away the lower order terms and constants, the worst case running time is $\Theta(n^2)$.

The best case running time would still be $\Theta(n^2)$ considering the fact that the lowest element of the subarray must be determined. If  $A[1: i]$ is sorted, and $A[i+1:n]$ is an unsorted subarray, and we have to sort the next smaller element by swapping $A[i+1]$ with any smaller element from $A[i+2:n]$. If the lowest element occurs at $j = i+2$ – the first element from the unsorted subarray, the inner loop can’t halt operation at this point, it has to continue to assert that no other element is lower than $A[j]$ from $A[j+1: n]$, even if from this point onwards all the elements in the subarray are larger than $A[j]$.



</blockquote>
