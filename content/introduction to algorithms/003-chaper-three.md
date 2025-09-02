---
title: Chapter Three
keywords: ["introduction to algorithms", "cormen", "algorithms"]
description: Personal note on the CH3 of Introduction to Algorithms
tags: ["introduction to algorithms", "algorithms"]
weight: 3
params:
  math: true
---

To characterize runtimes we discard the low-order terms and the coefficients of the leading term as done with insertion sort in [Chapter Two](https://www.notion.so/Chapter-Two-232dda5cd4664a9db41e2d4566448dc4?pvs=21). The remaining factor is put into the $\Theta$-notation e.g $\Theta(n^2)$. Other asymptotic notations are designed to characterize functions in general. [Asymptotic notation can apply to functions that characterize some other aspect of algorithms e.g. space or other functions not relating to algorithms.](https://www.phind.com/search?cache=sz2cz2q2eol3oyoher221uh9)

### The ***O-*notation**

This notation expresses a function that doesn’t grow faster than a certain rate based on the highest-order term. Considering a function $7n^3 + 100n^2 - 20n + 6$ with the highest order term as $7n^3$, the rate of growth of this function is $n^3$. This function can be expressed as **$*O(n^3)$,*** considering it doesn’t grow faster than $n^3$.

We could also say the function is **$*O(n^4)$, $O(n^5)$, $O(n^6)$, $O(n^7)$*** because $O(n^3)$ grow slower than them, hence we could say: $7n^3 + 100n^2 - 20n + 6$ is $O(n^c)$ for any constant $c≥ 3$.

### The $\Omega$***-*notation**

The [$\Omega$](https://en.wikipedia.org/wiki/Omega) is used to express that a function grows at least as fast as a certain rate, based on the highest order term. This can be seen as the inverse of the O-notation.

Similarly, it can grow as fast as $n^2$, $n^1$, hence we can say $\Omega(n^c)$ for any constant $c ≤ 3$.

### The $\Theta$-notation

This expresses that a function grows exactly at a certain rate based on the highest-order term. It expresses that a function does not grow above or below a certain factor, and these factors need not be equal.

It can also be expressed as the result of showing that a function is both O(f(n)) and \Omega(f(n)). For example, the above, showing that $7n^3 + 100n^2 - 20n + 6$ is both $O(n^3)$ and  $\Omega(n^3)$, it is also $\Theta(n^3)$.

### An Example: Insertion sort

From the insertion sort procedure in [Chapter 2](https://www.notion.so/Chapter-Two-232dda5cd4664a9db41e2d4566448dc4?pvs=21):

```
INSERTION-SORT (A, n)
  for i = 2 to n
    key = A[i]
    j = i - 1
    while j > 0 AND A[j] > key
      A[j+1] = A[j]
      j = j - 1
    A[j + 1] = key
```

The procedure operates using nested loops, the outer loop runs $n-1$ times regardless of the values being sorted. The inner while loop iterates based on the number of values to be sorted. For a value $i$, the while loop might iterate $0$ times, $i-1$ times or anywhere in between in constant time. 

We can say Insertion sort is $O(n^2)$ since each iteration of the inner loop takes constant time $n^2$. 

We could also say the worst case is $\Omega(n^2)$ because for every input size n, there is at least one input that makes the algorithm take at least $cn^2$ time, for some constant c. This does not mean the algorithm takes at least $cn^2$ time for all inputs.

To understand why the worst case time of `INSERTION-SORT` is $\Omega(n^2)$, we would assume the size $n$ of an array $A$ is a multiple of $3$. Divide $A$ into $3$ groups of $n/3$ positions. If the largest values occupy the first $n/3$ array positions $A[1:n/3]$, once the array is sorted, each of these $n/3$ array values ends up somewhere in the last $n/3$ positions $A[2n/3 + 1 : n]$. And for this to happen, each of these $n/3$ values must pass through each of the middle n/3 position $A[n/3+1:2n/3]$ one at a time. At least $n/3$ executions of line 6 must have happened. Because $n/3$ values have to pass through $n/3$ positions, the worst case of `INSERTION-SORT` is at least proportional to $(n/3)(n/3)$ = $n^2/9$, which is $\Omega(n^2)$.

Now that we have shown that that `INSERTION-SORT` runs in $O(n^2)$ in all cases and there is an input that makes it take $\Omega(n^2)$, hence, the worst case running time of `INSERTION-SORT` is $\Theta(n^2)$.

The constant factors for upper bound or lower bound might differ, what matters is that we have characterized the worst-case running time to within constant factors(ignoring the lower-order-terms). This does not mean `INSERTION-SORT` runs in $\Theta(n^2)$ in *all cases,* in fact, the best case running time for INSERTION-SORT is $\Theta(n)$ as shown in [chapter 2](https://www.notion.so/Chapter-Two-232dda5cd4664a9db41e2d4566448dc4?pvs=21).