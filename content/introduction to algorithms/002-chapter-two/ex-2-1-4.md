---
title: Chapter Two - Exercise 2.1-4
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.1-4"]
summary: Solution to Exercise 2.1-4 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-21-4
math: true
---

## ❓ Question
> Consider the searching problem:
>
> Input: A sequence of n numbers $<a_1, a_2, a_3….a_n>$ in array $A[1:n]$ and a value $x$
>
> Output: An index $i$ such that $x$ equals $A[i]$ or the special value $NIL$ if $x$ does not appear in $A$. 
> 
> Write a pseudocode for linear search, which scans through the array from beginning to end, looking for $x$ and using a loop invariant, proving that your algorithm is correct. make sure that your loop invariant fulfils the three necessary properties.

## 💡 Answer

<blockquote>

[Linear search on Wikipedia](https://en.wikipedia.org/wiki/Linear_search)

Pseudocode:
```text
LINEAR-SEARCH A, n, x
  for i = 1 to n
    if A[i] = x
      return i
  return NIL
```

Solution in Python

```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return None
```

Example usage:

```python
test_list = [5, 8, 2, 9, 3, 6]
target_element = 9
index = linear_search(test_list, target_element)

if index == None:
    print(f"Element {target_element} not found.")
else:
    print(f"Element {target_element} found at index {index}.")
```

Loop Invariant:

**Initialization**: The loop is initialized by setting $i$ to 1  – the first index of the array. If the array is empty, the loop is not initialized.

**Maintenance**: The loop is maintained  by increasing the value of $i$ till the end of the last element in the array $A$.

**Termination**: The loop is terminated when a desired element is found or when the $i$ is greater than the length of the array.

</blockquote>