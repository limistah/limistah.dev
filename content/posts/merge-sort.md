---

title: Merge-Sort like a Binary-Search
date: 2025-02-10
excerpt: As a divide and conquer algorithm, in this article, we look deeply into merge sort, simplifying its core concepts with a binary search algorithm.
description: As a divide and conquer algorithm, we look deeply into merge sort by simplifying its core concepts with a binary search algorithm.
cover:
  image: "/assets/image-20250214234040290.png"
  alt: "<alt text>"
  caption: "<text>"

---

### Motivation

Experiencing binary search was like a divine revelation to the ingenuity of algorithms. How can a computer code be so clever and so efficient at the same time. We don't thank the inventors enough 😏.

Among the great, simple, and everyday algorithms used is [merge sort](https://en.wikipedia.org/wiki/Merge_sort). It is a divide-and-conquer algorithm that works by taking a big problem, chunking it down into the smallest possible units, solving them, and adding up the results together. Read more about it here.

While [deeply studying](https://clio.limistah.dev/chapter-two) merge sort, a question I further asked after noticing its patterns is: _Is this under the hood another binary search algorithm?_ 

## The beautiful binary search

Searching is [fundamental to human existence](https://www.gse.harvard.edu/ideas/usable-knowledge/20/11/curious-mind), we are always asking the what, why, where, who, and when questions. This has relflected in most of our inventions, computers being one of the greatest of them. So, given an array of five items `[4,5,1,2,4]`, how can you get an item from the list?

An easy approach would be to go through each item, compare them to 1, and return the position where it was found. This approach is called _linear search,_ which has been [implemented here](https://clio.limistah.dev/exercise-21-4). This raises a question: what happens when the list is large enough, for example, your WhatsApp contact list? Searching through these items in linear time can be fast for 10 10-item list; when the list becomes sufficiently large, the time it takes will frustrate any human.

What if the list is sorted (`[1,2,3,4,5]`), and we need to get the item at position 4 from the list? We have to change our thinking model. Going through each of these items linearly is lavishing time! Which introduces the binary search algorithm.

We can split the items into two arrays, `[1,2]` and `[3,4,5]`, determine where the item we are searching for can be(_left_ or _right_), discard the _left_ array, and divide the **right** array into two `[3]`, `[4,5]`. We discard the left array again and divide the right array into two [4] and [5]; the target is the only item in the right array. Notice it took us three divisions, two extra variables to store the separate arrays, and two decision statements - Is the item in the left or the right? Is the item the only item in the array?

```python
def hypothetical_search(arr, target):
    while len(arr) > 1:
        mid = len(arr) // 2
        left = arr[:mid]  # Split into left half
        right = arr[mid:]  # Split into right half
        if target in right:
            arr = right  # Keep right half
        else:
            arr = left  # Keep left half
    
    print(f"Final array: {arr}")
    return arr[0] if arr and arr[0] == target else None
```



We can use the above procedure to find out if the item is on the list. What if we need the index where the item is? 

![https://dolly-desir.medium.com/algorithms-binary-search-2656c7eb5049](/assets/binary%20search.png)

Recall our sorted array of 5 items `[1,2,3,4,5]`. Instead of dividing, we can have two variables: start point and end point. The start point of the array is `0`, the end point is the length of the array `-1` - in our case **4**, and finally, keep a midpoint (floor division of the length of the array). 

Then, we can check if the target is *equal the value* of the midpoint. If *yes*, we return the index of the midpoint; if *no*, we check if the item is *greater than* the midpoint, if *it is*, then we set the value of the left handle to be the midpoint, if *it is not*, we set the value of the right handle to be the midpoint and this is to discard half of the items in the list, either from the left till the midpoint or from the midpoint to the right. 

We do these steps up until we find a midpoint where the value is the same as the target.

```python
def binary_search(A: list, n: int, target: int):
  l = 0
  r = n
  m = n//2 # floor division
  while l <= r:
    m = l + (r - l) // 2
    if (A[m] == target):
      return m
    if (A[m] > target):
      r = m - 1
    if (A[m] < target):
      l = m - 1
  return -1
 
```

For the most binary search, it could be written with a loop, but it is cleaner to implement it as a recursive algorithm - this is proving the statement that *nearly all recursive algorithms can be implemented with a loop*.

```python
def binary_search_recursive(A: list, l: int, r: int, target: int):
  if (l > r):
    return -1
  m = l + r // 2
  if (A[m] == target):
    return m
  if (A[m] > target):
      return binary_search_recursive(A, l, m - 1, target)
  if (A[m] < target):
      return binary_search_recursive(A, m - 1, r, target)
  
def binary_search(A: list, n: int, target: int):
  return binary_search_recursive(A, 0, n, target)
```

The iterative implementation explicitly expresses the formal definition and internal operation of a binary search algorithm, 

_Is the midpoint element the target?_ 

Yes, return it. 

No, then,

 _Adjust the left or right handles and check the midpoint again_. 

Sweet!

## Merge Sorting

Faced with the challenge of sorting the list `[4,5,1,2,4]` in ascending order, like we did for searching, we could pick one item at a time and insert it into its exact position. We could achieve this using the [insertion sort algorithm](https://clio.limistah.dev/exercise-21-3):

```python
def insertion_sort(A: list):
  # sort elements from the second item in the list, we assume the first item is already sorted.
  for i in range(1,len(n)):
    key = A[i]
    j = i - 1
    while j > 0 and A[j] > key:
      A[j+1] = A[j]
      j = j - 1
      A[j+1] = key
  return A

print(insertion_sort([4,5,3,2,1])) # -> [1, 2, 3, 4, 5]
```

<center><small>How this works has been discussed <a target="_blank" href="https://clio.limistah.dev/chapter-two">here</a>. </small></center>

Insertion sort runs on `O(n^2)`, but with a divide and conquer algorithm, we can run in `O(nlgn)` time.

Merge sort is another <a target="_blank" href="https://clio.limistah.dev/chapter-two#fe408b1f7e0847709a694d3d27db1dae">divide and conquer algorithm</a> that works just like any other would. It takes an input array, breaks it into chunks of smaller subarrays, sorts the subarrays, and merges the results, all these in `O(nlgn)` time.

Sorting the list of numbers, instead of taking an item and inserting it in place of another, we rather tear apart the entire list and rebuild a new one with the right order. Starting with `[4,5,3,2,1]`, we can split it into `[4,5]` and `[3,2,1]`. And again, we can split these into  `[4]` and `[5]` for the left, and also `[3]` and `[2, 1]` for the right. Lastly `[2]` and `[1]`. So far, the breakdown looks like this:

```text
          [4,5,3,2,1]
       [4,5]      [3,2,1]
      [4] [5]   [3]    [2, 1]
                     [2]    [1]
```

We begin from the last item row, sort the items, and then merge them in place and up to the top row:

```text
          [5,4,3,2,1]
       [5, 4]      [3,2,1]
      [5] [4]   [3]    [2, 1]
                     [2]    [1]
===================================
      [4,5]     [3]    [1, 2]
       [4,5]      [1,2,3]
           [1,2,3,4,5]
```

In implementation, the code looks like this:

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid]) # sort the left items
    right = merge_sort(arr[mid:]) # sort the right items
    
    return merge(left, right) # merge the results

def merge(left, right):
    sorted_array = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            sorted_array.append(left[i])
            i += 1
        else:
            sorted_array.append(right[j])
            j += 1
    
    sorted_array.extend(left[i:])
    sorted_array.extend(right[j:])
    
    return sorted_array

```

<center><small>A formal analysis of divide and conquer can be <a href="https://clio.limistah.dev/chapter-two#091ab4d8923a4ec38c2f31f42d399a99" target="_blank">found here</a>.</small></center>

This works by splitting the array into two until there is only one item remaining in the final arrays. Then it walks back up, bringing the items in the left and right arrays to compare their first items to identify which comes first to insert it into the position in the main array.

When one of the sub-arrays is empty - nothing left to sort- it spreads the remnant in the nonempty subarray to the right of the main array. Hence, the left items are always sorted after each merge procedure call.

The meat of merge sort is in the `merge` procedure, but regardless of the subtleties, the importance of the `merge_sort` procedure can not be ignored.  A closer look reveals a resemblance to its counterpart [divide and conquer algorithms](https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf), in our case, the binary search!

![image-20250214234040290](/assets/image-20250214234040290.png)

<center><small>https://people.eecs.berkeley.edu/~vazirani/algorithms/chap2.pdf</small></center>

## Like Binary Search Like Merge Sort

The question I often get with merge sort and other divide-and-conquer algorithms is: How does this work?

The problem is not understanding merge sort, it is in understanding divide and conquer algorithms.

The goal of a divide-and-conquer algorithm is to break a problem into the smallest unit of subproblems that can be solved easily. Not just for sorting or using binary search to find an element's index in a list. We can use it for other problems like the below:

![image-20250214235038961](/assets/image-20250214235038961.png)

<center><small>EPI Page 1 </small></center>

When conceptualising a problem, the first insight is understanding if the solution to the problem can be determined in a single executation statement and if the problem input can be split into smaller versions such that a single split is a subset of the actual input such that we could solve it easily.

In the above example, although two values are required - entry and exit values- note that the lowest buy price will always be on the left and the highest sell price will be on the right. If you have the array `[[10, 12], [12, 11.5], [11.5, 13],[13, 9.01]]`, when you buy at `10` from the first item in the list and sell at `13.00` in the last index. A brute-force solution should run in `O(n^2)`.

However, the best solution will continuously split the array into halves(*the divide stage*), up until there is one array left, and track the optimum buy price from the left array and the optimum sell price in the left array. This is taking into consideration the intricacies of **empty an array, an array with one element**, and an extra edge case unique to this problem, **when the price decreases mononically** - then there is no way to determine a sell price.

Notice that I have referenced a problem that uses divide and conquer to solve a problem that seems different from merge sort and binary search; it is expecting us to pick(which might sound like a search problem) two best items from a list.

## What you should know
When these questions arise, it is as a result of an incomplete understanding of fundamental concepts. 

While our jobs might require us to sort a list or search for an item in a sorted list - knowing merge sort will suffice, real-life problems do not present themselves in this fashion, as demonstrated.

When solving a problem, the default is to look for a brute force solution that performs in the worst possible time but satisfies the [definition of an algorithm](https://clio.limistah.dev/chapter-one). When shrinking out the best possible performance out of an algorithm, the saving grace is the understanding of the fundamental concepts and the ability to relate a problem to one of them.

So, choose to understand the fundamentals over example use cases of a fundamental concept, always. After which merge sort, binary search and other _seemingly hard_ algorithms will present themselves, like the sun in the day!

