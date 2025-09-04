---
title: Chapter Two - Exercise 2.3-2
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.3-2"]
summary: Solution to Exercise 2.3-2 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-23-2
math: true
---

## ❓ Question
<blockquote>

The test in line 1 of the $MERGE-SORT$ procedure reads “if $p ≥ r$” rather than “if $p ≠ r$.“ If MERGE_SROT is called with $p > r$, then the subarray $A[p:r]$ is empty.

Argue that as long as the initial call of $MERGE-SORT(A, 1, n)$ has $n ≥ 1$, the test “if $p ≠ r$” suffices to ensure that no recursive call has $p > r$.

</blockquote>

## 💡 Answer

<blockquote>

💡 We can prove this using induction:

**Base Case:**
The initial call is $MERGE-SORT(A, 1, n)$ 
where $n > 1$, $p = 1$, $r = n$   $\therefore$    $p ≤ r$

**Recursive step:**
Assuming a recursive call is made with p ≤ r. Then:
- Compute $q = \lfloor(p+r)/2\rfloor$

The two recursive calls:

1. $MERGE-SORT(A, p, q)$
- Since $q = \lfloor(p+r)/2\rfloor$, then $p ≤ q ≤ r$
- So, $p ≤ q$ ( and not $p > q$)

2. $MERGE-SORT(A, q+1, r)$
- $q + 1 ≤ r$ only if $q < r$
- Since $q = \lfloor(p+r)/2\rfloor$, then $q ≤ r - 1$ $\equiv$ $q + 1 ≤ r$

Therefore in all of the recursive calls

$q + 1 ≤ r$  $\equiv$  $p ≤ r$

So, $p > r$ can never happen if $MERGE-SORT$ is only called when $p ≠ r$

</blockquote>
