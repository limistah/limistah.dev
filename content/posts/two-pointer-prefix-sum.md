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

If I give you a string of characters "apple" to return the longest unique substring, how would you go about that?

A brute force solution can return in $O(n^2)$, where we use an outer array to keep track of the start string and inner array to move a needle across the string, while checking for unique characters within the bound of the index of the outer array and the inner array.

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

If I would pieces down the naive solution, there are four useful parts.

1. The moving start pointer
2. The moving end pointer
3. The working data (which is the subset start from start and ending at end)
4. The solution determination

With all these information, is there a way to make this algorithm run faster say in $O(n)$ against the $O(n^2)$?

Of course there is, and it should be obvious, we want to have a single loop that can control the two indices.

Recall the template of binary seacrh:

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

We can take inspiration from here to build up an O(n) solution for our problem.

First, we start with how to create a loop that keep track of the indices, in our case, the indices both start from position 0 of the string. Also, our array loops through the lenght of the array, in the case of binary search, it only checks if the left has not crossed over to the right.

To implement ours, we will start with a loop that goes over the entire array
```python
def optimal_sol(s: str):
    for i in range(len(str)):
        pass
    return 0
```

Then, we want to move have a second index, that will behave differently. because we want to determine our result over a range, we will let the second index only move when a condition is met. Therefore, the index is initialized outside of the loop having the same starting point 0, and maintained by the loop body itself.

```python
def optimal_sol(s: str):
    i = 0
    for j in range(len(str)):
        # if condition is met:
        #    i += 1
        pass
    return 0
```

Rather than returning zero, we need a variable to hold the result, we will call it res, and this is also updated only when the condition is met.

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

At this point, we can check the termination property of a good algorithm. Yes, it will terminate as the for loop will go through the length of the string.

With this algorith, we have implemented a two pointer solution.

```text
            a    p    p     l    e
0           l,r

1           l    r

2           l         r

3           l              r

4           l                    r
```

In the illustration above, notice how we have all the criterias for the naive solution

1. A moving start pointer (the left in our case)
2. A moving end pointer (the right in our case)
3. The working data (s[l:r])
4. Solution determination (yet to be implemented)

To determine the solution, it is when there exists no chars in the string s[l:r], we could store all the character occurence in a dictionary.

```python
from collections import defaultdict

occurrence = defaultdict()

occurrence[char] += 1
```

With the above code, once we have access to a new char in the loop, we want to increment its key in our occurrence dictionary

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

Now, we have a mechanism to know immediately a character exists twice in the string, and once we do, we want to move the left pointer forward.

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
idx  i   j   char    dict
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

If we take the difference of the right and left and add 1, we will get something close to the correct answer:

4 - 1 + 1 = 4

But the longest unique substring is 2, could be ap, pl, le.

We will introduce an improvement to the anser dtermination section of our code.

Notice that the only point when we will have a substring is when our occurrence for a char becomes 2, what we want to do at that point is to reduce the counter, then move the left forward by one instead make the occurrence for that character become 1. Something like this:

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
1    1   0    p     { a: 1, p: 1 }
2    2   2    p     { a: 0, p: 1 }
3    3   2    l     { a: 0, p: 1, l: 1 }
4    4   2    e     { a: 0, p: 1, l: 1, e: 1 }
```

While this works, what we should have done is move the left pointer forward consecutively until the anser dtermination condition is not true

So, instead of if, we will use while. This way, we keep moving the left forward, until all keys in the occurence is 1

```python
while occurrence[char] > 1:
    occurrence[s[l]] -= 1
    l += 1
```


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

And our solution is just the far right index minus the left index plus 1
```python
res = j - i + 1
```

And since our last result might be the longer than the newer one we find like in the case of cabab whose longest sub strings is cab, ab, ab.

```python
res = max(res, j - i + 1)
```

And plugging it into our code

```python lines="2-4 7"
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

