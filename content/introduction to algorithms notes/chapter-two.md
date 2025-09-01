---
title: Chapter Two
keywords: ["introduction to algorithms", "cormen", "algorithms"]
description: Personal note on the CH2 of Introduction to Algorithms
tags: ["introduction to algorithms", "algorithms"]
params:
  math: true
---

This chapter introduces the first algorithm [insertion sort](https://en.wikipedia.org/wiki/Insertion_sort). 

Starting with an empty left hand and the card pile on a table, take up the first card from the file and put it on the left hand. Then, with your right hand, continue to pick the card from the pile, and insert it into the correct position in your left hand. To insert a card into the proper position on your left hand, start from the leftmost card, then keep comparing the value, insert the card where the value is less than or equal to the card in your right hand. If all the cards have values greater than the card in the card in your right hand, then place the card as the leftmost card in your left hand.

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

To determine the correctness of the algorithm, we can use a method called [_loop invariant_](https://en.wikipedia.org/wiki/Loop_invariant), and it has three essential parts: _initialization_, _maintenance_, and _termination_.

**Initialization**: The initializer should be set to true before the loop to ensure the loop commences its operation.

**Maintenance**: To maintain the loop, an item must be set to true within the loop, ensuring that it remains true in the next iteration, which enables the loop to continue running.

**Termination**: The loop should terminate and should provide a valuable property that states the correctness of the algorithm.

Loop invariants are a form of [mathematical induction](https://en.wikipedia.org/wiki/Mathematical_induction), where the initialization is the base case, and the maintenance is the inductive case. Mathematical induction applies the step indefinitely but the induction case in loop invariants terminates.

For the insertion sort, the loop invariant properties holds as follows:

**Initialization**: Starting from the second element in the array(i =i 2), the subarray A[1:i-1] consists of just one element, and it is sorted.

**Maintenance**: Informally, the body of the for loop moves backward from the current element (i) to find a proper position for it. And when done, the subarray A[1:i] contains the same elements but sorted. Incrementing the counter for the next iteration preserves the loop invariant.

**Termination**: The counter (i) starts from 2 and increases by 1 in each iteration. Once it exceeds the value of n(n + 1), the loop terminates. And the Array at A[1:n] has the same elements but in sorted order.
