---
title: Chapter Two - Exercise 2.2-3
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.2-3"]
summary: Solution to Exercise 2.2-3 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-22-3
math: true
---

## ❓ Question
<blockquote>

Consider linear search again (see Exercise 2.1-4). How many elements of the input array need to be checked on average, assuming that the element being searched for is equally likely to be any element in the array? How about in the worst case? Using $\Theta$-notation, give the average-case and worst-case running times of linear search. Justify your answers.

</blockquote>

## 💡 Answer

<blockquote>

Linear search is an $\Theta(n)$ algorithm as all the elements in the array have to be visited in the case when the required element is the last element in the array. This can also be categorized as the worst case scenario.

Worst case $O$: The element is at the end of the array, hence, $n$ elements have to be visited. $O(n)$

Average case $\Theta$: We could assume the element to be found at the middle or the beginning of the array, this is wild. On average, the element can be found anywhere from the first to the $n_{th}$ element, ignoring the low order terms and removing the constants, we will end up with the element likely being at the nth element, hence on average, it is $\Theta(n)$:

$\frac{1 + 2 + 3 … n}{n}$

but 

$1+2+3…n = \frac{n(n+1)}{2}$

$\therefore$

$1 + 2 + 3 … n/n = \frac{n(n+1)}{2} / {n}$

$\therefore$

$\frac{n(n+1)}{2}/n = \frac{n+1}{2}$

Ignoring constants and lower terms, we are left with

$n$

</blockquote>
