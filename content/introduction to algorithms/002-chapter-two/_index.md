---
title: Chapter Two
keywords: ["introduction to algorithms", "cormen", "algorithms"]
description: Personal note on the CH2 of Introduction to Algorithms
tags: ["introduction to algorithms", "algorithms"]
math: true
canonicalURL: https://clio.limistah.dev/chapter-two
weight: 2
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

**Initialization**: Starting from the second element in the array(*i* =i 2), the sub array *A*[1:*i*-1] consists of just one element, and it is sorted.

**Maintenance**: Informally, the body of the forloop moves backward from the current element (*i*) to find a proper position for it. And when done, the subarray *A*[1:*i*] contains the same elements but sorted. Incrementing the counter for the next iteration preserves the loop invariant.

**Termination**: The counter (*i*) starts from 2 and increases by 1 in each iteration. Once it exceeds the value of *n*(*n* + 1), the loop terminates. And the Array at *A*[1:*n*] has the same elements but in sorted order.

## Analyzing Algorithms

This is predicting the resources that an algorithm requires, memory, network bandwidth, power consumption, most times the computational time is considered.

There could be several candidate solutions to a problem, analyzing them could be used to determine the most efficient one to rule out other inferior algorithms.

Analyzing algorithm requires modelling it on the technology it runs on. Mostly the RAM model is used as it assumes that each instruction takes the same amount of time and executes sequentially.

Care should be taken to not abuse the RAM model thinking that the instructions in the RAM has to be defined and their costs. Different RAMs have distinguishing features, but it is safe to consider the instructions found in real computers: ADD, SUBTRACT, MULTIPLY, DIVIDE, REMAINDER, FLOOR, CEILING, data movement: LOAD, STORE, COPY, and control: CONDITIONAL, UNCONDITIONAL, BRANCHES, SUBROUTINES, RETURN.

The data types are INTEGER, FLOATING POINT and CHARACTER.

In a real computer, some instructions might exists, for example exponentiation and multiplication does not take constant time, in general case $x^n$ takes logarithmic n time when $x$ and n are general integers, but a constant time if n is an exact power of two. Most RAMs have shift left operations that can stand for multiplication by $2$, and shift right operation that can stand for multiplying by $2^n$. These are gray areas that would be avoided.

RAM model also does not take memory hierarchy into consideration - no cache and no virtual memory. Other computational models attempt to account for this effect, these models are complex and difficult to work with.

RAM model is often a straighforward method, it can be quite challenging sometimes as you might need to employ tools such as combinatorics, probability theory algebraic dexterity and the ability to identify the most significant terms in a formula. 

We need a means to summarize the behavior of an algorithm in simple and easily to understand formulas because an algorithm can behave differently for each possible input, and RAM model provides us with that.

## Analysis of insertion sort

A naive way to analyze insertion sort would be to run the code directly on a computer and monitor how long it takes for the program to run. But this takes away all the current conditions of the computer used for the analysis, switching to another computer would give a different result as the conditions would be different, even altering the conditions of the first computer would give a different result from the first analysis. A better approach is to predict how long insertion sort will take to run given a new input.

We should always consider the time takes to run an algorithm itself instead of timing how long it run based on its input. Algorithms can have different input sizes, and input sizes can have different features in the case of insertion sort, how much sorted is the input and the size of the input. Also, we should determine if the best or worst case scenario of the input is being considered.

Input size depends on the problem being studied, for sort it is a single number, for some problems inputs like a graph it can be more, for other problems it could be number of bits.

Run time of an algorithm is the number of instruction and data access executed, and this should be within the RAM model, independent of any computer - considering it takes a constant amount of time to execute each line of code. We would consider it takes $C_K$ time to execute each line where $C_K$ is a constant - correctly representing the implementation of the RAM model following the implementation of the pseudocode on most real computers.

To analyze insertion sort, consider the running time for each statement executed. A statement that takes $C_K$ steps and runs for m times would provide a $mC_K$ running time. An operation that takes $n$ inputs can be represented as $T(n)$.

```text
INSERTION-SORT (A, n)                 cost              times
  for i = 2 to n                     $c_1$                n
    key = A[i]                       $c_2$               $n-1$
    j = i - 1                        $c_3$               $n-1$
    while j > 0 AND A[j] > key       $c_4$              $\sum_{i=2}^n t_i$
      A[j+1] = A[j]                  $c_5$              $\sum_{i=2}^n t_i - 1$
      j = j - 1                      $c_6$              $\sum_{i=2}^n t_i - 1$
    A[j + 1] = key                   $c_7$               $n - 1$
```

In the case of insertion sort the running cost is:

$T(n) = c_1(n) + c_2 (n-1) + c_3 (n-1) + c_4 (\sum_{i=2}^n t_i) + c_5 (\sum_{i=2}^n t_i - 1) + c_6(\sum_{i=2}^n t_i - 1) + c_7(n-1)$

Considering the fact that the arrays is sorted(best case), then $\sum_{i=2}^n t_i$ would always be a constant time operation  $\therefore$ 

$T(n) = c_1(n) + c_2 (n-1) + c_3 (n-1) + c_4 (n-1) + c_7(n-1)$

then becomes

$T(n) = (c_1 + c_2 + c_3 + c_4 + c_7) (n) - (c_2 + c_3 + c_4 + c_7)$

Taking 

$T(n) = (c_1 + c_2 + c_3 + c_4 + c_7)$  as $a$ 

and 

$(c_2 + c_3 + c_4 + c_7)$ as $b$

then

$a(n) - b$ …… a ***linear*** function of **n**

In another case, the array might be unsorted (worst case scenario), such that the swapping operation takes a order of n time to complete.

But noting that for each swapping operation:

$\sum_{i=k}^n k$  $=$  $n(\frac{n+1}{2}) - 1$ 

and

$\sum_{i=k}^n k - 1$  $= n(\frac{n-1}{2})$

$\therefore$ 

$T(n) = c_1(n) + c_2 (n-1) + c_3 (n-1) + c_4 (n(\frac{n+1}{2}) - 1) + c_5 (n(\frac{n-1}{2})) + c_6(n(\frac{n-1}{2})) + c_7(n-1)$

Then the final equation becomes:

$T(n) = (\frac{c_2}{2} + \frac{c_5}{2} + \frac{c_6}{2})n^2 + (c_1+c2+c3+\frac{c_4}{2}-\frac{c_5}{2}-\frac{c_6}{2}-c_7)n - (c_2+c_3+c_4+c_7)$

Taking 

$\frac{c_2}{2} + \frac{c_5}{2} + \frac{c_6}{2}$ as $a$

$c_1+c2+c3+\frac{c_4}{2}-\frac{c_5}{2}-\frac{c_6}{2}-c_7$ as $b$

$c_2+c_3+c_4+c_7$ as $c$

Then we have:

$T(n) = an^2 + bn + c$ ……..  ***quadratic*** function of **n**

The running time of an algorithm is the sum of the cost of each operation and the amount of time these operations are executed. The running time of an algorithm, is usually fixed. But there are some randomized algorithms whose runtime varies even for fixed inputs.

The analysis above considered worst and best case scenarios for insertion sort, subsequent analysis would focus on the worst case scenario - the longest time it would take for an algorithm to complete on an input of size n. 

- By making calculated guess that the running time would not get any worse, giving the upper bound for any input that can guarantee that the algorithm does not take any longer.
- Worst cases appear more than best cases.
- Average case runtime is as good as the worst case run time.

Although the scope of average case runtime is limited, since we can’t tell what an average case input is. Some algorithms still require average case runtime through probabilistic analysis. We could use randomized algorithms that make random choices to make the probabilistic analysis yield an expected runtime, but this is not so in practice.

### **Order of growth**

In the analysis of insertion sort, $C_k$ was used to simplify the cost of each statement and we expressed the best running time as $an+b$ and the worst running time as $an^2+bn+c$, where $a$, $b$, $c$ are constants that depend on the cost of each statement. We still require the abstract and actual costs of $C_k$.

For some specific values of $n$, the parts from left starts becoming insignificant. For example in the case $an+b$, when $n$ is $10$, $b$ starts becoming *less* *insignificant*, same with $an^2+bn+c$, when $n$ is $10$, the $c$ part becomes *insignificant* and when becomes $100$ the $b$ part starts becoming *insignificant*.

In order of growth, the leading part of the formula is considered, and the constant of the leading part is ignored since they are less significant than the rate of growth when determining the computational efficiency for large inputs.

Using the worst case running time and considering the leading part and ignoring constants, the rate of growth of insertion sort is $n^2$.

Order of growth often optimizes for when n is sufficiently large enough, the $\Theta$ (greek’s theta) is used to denote order of growth. Therefore insertion sort has a runtime of $\Theta(n^2)$ the theta of n-squared. and the best running case of $\Theta n$. $\Theta$ can also be described as roughly proportional when $n$ is large enough. 

When two algorithms are compared, the one with the lowest order of growth is considered. An algorithm with a higher order of growth can take less time for small inputs than an algorithm with a lower order of growth runtime, when input is large enough, a low order of growth takes less time in the worst case than a high order of growth algorithm.

Regardless of the constants hidden by the $\Theta$ notation, there is always some number say $n_0$ such that for all input sizes where $n ≥ n_0$, a low growth algorithm (say $\Theta n^2$) beats a high growth algorithm say ($\Theta n^3$) in the worst case scenario. Meaning, there is an input size(e.g 10) where $\Theta n$ algorithm beats $\Theta n^2$ algorithm in the worst case scenario.

### Designing Algorithms

The algorithm design method used by insertion sort is called incremental method. For index i, and elements A[i], insert element into its proper place in the subarray $A[1:i]$, such that $A[i:i-1]$ is sorted.

Another method is divide and conquer, in this approach, the algorithm call itself breaking the problem into subproblems that are easier to solve.

Divide and Conquer break problem into subproblems similar to the original problem but smaller in size, solve the sub problem recursively and combine the solutions to the original problem.

**Divide**: The problem into one or more subproblems that are smaller instances of the same problem.

**Conquer**: The subproblems by solving them recursively.

**Combine**: Sub-problem solutions to form a solution to the original problem.

[Merge sort algorithm](https://en.wikipedia.org/wiki/Merge_sort) uses divide and conquer method to solve sorting problems. It sorts the subarray $A[p:r]$ starting with $A[1:n]$ and recursing down to smaller arrays.

**Divide**: The sub array $A[p:r]$ into adjacent subarrays of equal halves $A[p:q]$ and $A[q+1:r]$

**Conquer**: Sort the sub arrays

**Combine**: Merge the two subarrays back into $A[p:r]$

```text
MEGE-SORT(A, p, r)
  if p>= r
    return // base case
  q = $\lfloor(p+r/2)\rfloor$
  MERGE-SORT(A, p, q)
  MERGE_SORT(A, q+1, r)
  // Merge A[p:q] and A[q+1 : r] into A[p:r]
  MERGE(A, p, q, r)
```

The termination state is when the subarray $A[p:r]$ has just 1 element at that point it is acceptable to be sorted, also known as the base case.

The combine stage is the key to merge sort and is usually done by a procedure called ***Merge.***

In the merge procedure, $A$ is an array and $p, q, r$ are indices such that $P ≤ q < r$. It assumes that the adjacent sub arrays $A[p:q]$ and $A[q+1:r]$ were already recursively sorted. It then merges the two subarrays that replaces the current subarray $A[p:r]$.

To analyze how long merging two sorted array takes, we can consider each step taking constant time, since the two top elements are compared. We start with $\frac{n}{2}$ for both subarrays and at most n items in each sub array, merging can take $\Theta (n)$ times.

### Analyzing divide and conquer

Recursive algorithms are described with recurrence equation.For merge sort if n is so small e.g has a single element it results into constant time operation. $T_n = \Theta (1)$

If $n$ is so small such that $n < n_0 > 0$ therefore $T_n = \Theta (n_0) = \Theta(1)$

Taking n as the problem size and assuming the divide stage stage yield $a$ sub problems, but divided by $b$, yielding $\frac{n}{b}$ subproblems. Such that it takes $T \frac{n}{b}$ to solve one sub-prolem of size $\frac{n}{b}$ and we have a subproblems, so it takes $a T(\frac{n}{b})$ to solve all of a subproblems.

For the divide stage, $D(n)$ and the Combine stage $C(n)$, the recurrence is:

  $T(n)=\begin{cases}
    \Theta(1) & if n < n_0,\\
    \\
    D(n) + aT(n/b) + C(n) & \text{otherwise}.
  \end{cases}$

**Analysis of merge sort**

Divide: This stage computes the middle of the sub array in a constant time. $D(n) = \Theta (1)$

Conquer: Taking $aT(n/b)$, where a is the amount of recursive calls and b is the amount of sub problems. In merge sort, there are 2 recursive call and 2 sub problems, hence $aT(n/b)$ becomes $2T(n/2)$.

Combine: The merge procedure takes $\Theta(n)$, therefore $C(n$) = $\Theta(n)$, 

Adding both the divide and combine stages such that when n is sufficiently large enough $D(n)$ is insignificant and the equation becomes $\Theta (n)$.

 $D(n)$ + $C(n)$ = $\Theta (n) + \Theta (1)$ = $\Theta (n)$

Adding the conquer and the combine stage, $2T(n/2) + \Theta (n)$, and using the [master theorem](https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)) $2T(n/2)$ becomes $\Theta(\log n)$

Therefore the recurrence is:

$T(n) = \Theta(\log n) + \Theta(n)$

And can be simply represented as:

$T(n)=\begin{cases}
    c_1 & if n = 1,\\
    \\
    2T(n/2) + c_2(n) & if n > 1,
  \end{cases}$

Meaning, at the best case scenario, merge sort running time is constant time $\Theta(1)$, while the worst case scenario becomes the cost of the merge procedure $\Theta (n)$ and the conquer stage $\Theta (\log n)$.

$T(n) = \Theta(n\log n)$

The worst case scenario of insertion sort is $\Theta(n^2)$ while that of merge sort is $\Theta(n\log n)$ trading $n$ for $\log n$. This makes merge sort faster for larger inputs.