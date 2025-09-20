---
title: Two Pointers & Prefix Sum
date: 2025-09-19
tags: [algorithms, two-pointers, prefix-sum]
category: Algorithms
summary: Two pointers and Prefix sum are two algorithm solving techniques. In this post, I dissect their differences from their similarities.
math: true
---

### Motivation

Aside [binary search](/posts/merge-sort-binary-search/), two pointer is an algorithm solving technique that can come in handy for some easy to medium problems. While they both look similar from a distance, which infact prefix sum is – it derives its implementation from two pointers, I am curious to know when to use either of these techniques to solve an algorithm problem.

## Two Pointers

### A problem

> Given a string of characters "apple" return the longest unique substring, 

How would you solve this?

### A naive solution

A naive solution can be achieved in $O(n^2)$, where an outer array keeps track of the start string and inner array to move a needle across the string, while checking for unique characters within the bound of the index of the outer array and the inner array.

```python
def find_longest_sub_str(s: str):
    n = len(s)
    res = 0
    for start in range(n):
        for end in range(n):
            sub = s[start : end + 1]
            if len(set(sub)) == len(sub):
                res = max(res, end + 1 - start)
    return res

# str = a  p   p   l   e
# lp1 = 0
# lp2 =    1
# longest = maximum(longest, lp2 + (1 - lp1))
# longest = maximum(0,        1  + (1 -  0) )
```

Breaking down the naive solution, there are four useful parts.

1. The moving `start` pointer
2. The moving `end` pointer
3. The working data (which is the sub array from `start` to `end` $s[ start : end + 1]$)
4. The solution determination

With all this information, is there a way to make this algorithm run faster say in $O(n)$ against the $O(n^2)$?

### An optimal solution

Of course there is, and it should be obvious, we want to have a single loop that can control the two indices.

Recall the template of [binary search](/posts/merge-sort-binary-search/):

```python
def binary_search(arr, target):
    l = 0
    r = len(arr) - 1
    while l < r:
        mid = (l + r) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] > target:
            l = mid + 1
        else:
            r = mid - 1
    return -1
```

An $O(n)$ solution can be derived using it as an inspiration.

#### The first pointer

Firstly having a loop that keeps track of the indices starting from $0$, as in the naive solution case. Also, the loop goes through the length of the array – for binary search it only checks if the left has not crossed over to the right.

Something like this can be derived

```python
def optimal_sol(s: str):
    for i in range(len(str)):
        pass
    return 0
```

#### The right pointer

The second `index` will behave differently, it should only move when a condition is met and that is when there is a controllable range that creates a sub array. The `index` has to be initialized outside of the loop having also starting at $0$, and maintained by the loop body itself.

```python
def optimal_sol(s: str):
    i = 0
    for j in range(len(str)):
        # if condition is met:
        #    i += 1
        pass
    return 0
```

Rather than returning $0$, a variable is used to hold the result, `res`, and this is also updated only when the condition is met.

```python
def optimal_sol(s: str):
    i = 0
    res = 0
    for j in range(len(str)):
        # if condition is met:
        #    i += 1
        #    res = some value
        pass
    return res
```

At this point, the termination property of an algorithm is met – the for loop will go through the length of the string.

#### The two pointers

And that is a two pointer solution!

```text
            a    p    p     l    e
0           l,r

1           l    r

2           l         r

3           l               r

4           l                    r
```

In the illustration above, notice how all the criterias for the naive solution have been met

1. A moving start pointer (the left in our case)
2. A moving end pointer (the right in our case)
3. The working data ($s[l:r]$)
4. Solution determination (yet to be implemented)

#### Moving the left pointer

There is a solution only when there exists no character in the string $s[l:r]$, a dictionary can be useful in this case.

```python
from collections import defaultdict

occurrence = defaultdict()

occurrence[char] += 1
```

In the above code, once a `char` exists in the dictionary its value is incremented by $1$ to track its `occurrence`.

```python
from collections import defaultdict

occurrence = defaultdict()
def optimal_sol(s: str):
    i = 0
    for j in range(len(str)):
        char = s[j]
        occurrence[char] += 1

        # if condition is met:
        #    i += 1
        pass
    return 0
```

With a mechanism to know immediately if a character exists twice in the string, the left pointer can advance forward.

```python
from collections import defaultdict

def optimal_sol(s: str):
    res = i = 0
    occurrence = defaultdict()
    for j in range(len(str)):
        char = s[j]
        occurrence[char] += 1
        if occurrence[char] > 1:
           i += 1
        pass
    return res
```

And this is what will happen:

```text
idx  i   j   char   dict
-----------------------------------------------
0    0   0    a     { a: 1 }
1    1   0    p     { a: 1, p: 1 }
2    2   1    p     { a: 1, p: 2 }
3    3   1    l     { a: 1, p: 2, l: 1 }
4    4   1    e     { a: 1, p: 2, l: 1, e: 1 }
```

More textually

```text
            a    p    p     l    e
0           l,r

1           l    r

2                l     r

3                l          r

4                l               r
```

#### Determining a solution

Taking the difference of the `right` and `left` and add $1$ - due to zero start point, produce a value close to the correct answer:

```
(4 - 1) + 1 = 4
```
But the longest unique substring is $3$, could be one of `ap`, `ple`.

There has to be an improvement to the solution determination part of the code

The only point when a char exists twice is when the occurrence value for the `char` becomes $2$. And that is the perfect time reset the value back to $1$ and move the left pointer forward by $1$ as well.

This accurately tracks the visited values, and assume the substring $s[left:right]$ is unique as all the characters in the counter have 1 as their value.

Something like this:

```python
if occurrence[char] > 1:
    occurrence[s[l]] -= 1
    l += 1
```

Bringing it into our solution:

```python
from collections import defaultdict

def optimal_sol(s: str):
    res = i = 0
    occurrence = defaultdict()
    for j in range(len(str)):
        char = s[j]
        occurrence[char] += 1
        if occurrence[char] > 1:
            occurrence[s[i]] -= 1
            i += 1
        pass
    return res
```


```text
idx  i   j   char    dict
-----------------------------------------------
0    0   0    a     { a: 1 }
1    1   1    p     { a: 1, p: 1 }
2    2   2    p     { a: 0, p: 1 }
3    2   3    l     { a: 0, p: 1, l: 1 }
4    2   4    e     { a: 0, p: 1, l: 1, e: 1 }
```

This works, but will fail if we model it against `abbcab`, with unique substrings `ab`, `bca`, `cab`.

```text
idx  i   j   char    dict
-----------------------------------------------
0    0   0    a     { a: 1 }
1    0   1    b     { a: 1, b: 1 }
2    1   2    b     { a: 1, b: 1 }
3    1   3    c     { a: 1, b: 1, c: 1 }
4    2   4    a     { a: 1, b: 1, c: 1 }
4    3   4    b     { a: 1, b: 1, c: 1 }
```

Notice the solution at this point only ensure that `char` exists in the dictionary, but what is required is that only unique consecutive characters should have values in the dictionay.

A good improvement will be to move the left pointer forward consecutively until there is no double occurrence - meeting the criteria for a correct solution.

So, instead of an `if`, a `while` is used. This way, the left keeps moving forward, until all keys in the occurence have a value of $0$ for every character that the left has visited:

```python
from collections import defaultdict

def optimal_sol(s: str):
    res = i = 0
    occurrence = defaultdict()
    for j in range(len(str)):
        char = s[j]
        occurrence[char] += 1
        while occurrence[char] > 1:
            occurrence[s[i]] -= 1
            i += 1
    return res
```

And remodelling `abbcab` using the improvement:

```text
idx  i   j   char    dict
-----------------------------------------------
0    0   0    a     { a: 1 } # a
1    0   1    b     { a: 1, b: 1 } # ab
2    2   2    b     { a: 0, b: 0 } # resets the counters for s[0:2]
2    2   3    b     { a: 0, b: 1 } # b
3    2   4    c     { a: 0, b: 1, c: 1 } # bc
4    2   4    a     { a: 1, b: 1, c: 1 } # bca
4    4   4    b     { a: 1, b: 1, c: 1 } # resets the counter for s[2:3], cab
```

Perfect!

And the solution is always the far right `index` minus the left `index` plus $1$ - zero index array
```python
res = j - i + 1
```
Not forgetting the question asked for the longest substring, the correct answer should always be between a `max` of the current range and a previously known maximum range.

```python
res = max(res, j - i + 1)
```

And plugging it together

```python
from collections import defaultdict

def optimal_sol(s: str):
    res = i = 0
    occurrence = defaultdict()
    for j in range(len(str)):
        char = s[j]
        occurrence[char] += 1
        while occurrence[char] > 1:
            occurrence[s[i]] -= 1
            i += 1
        res = max(res, j - i + 1)
    return res
```

#### Analysis

The time complexity of this algorithm is $O(n)$, even though there is a while loop for each iteration – which is $O(26)$ and can be ignored.

The idea of two pointers is to have a reference to two indices, get the items within these indices and determine if we have a solution. But this is limited!

Two pointers can only be used for a handful of problems:

- The longest substring with unique characters
- The largest sum of a subarray of with lenght k 
- the length of the shortest subarray whose sum is less than a target

All these are still following the templates of our naive solution:

1. The moving start pointer
2. The moving end pointer
3. The working data (which is the subset start from start and ending at end)
4. The solution determination

How about Previous Sums?

## Prefix Sum