---
title: Chapter Two - Exercise 2.1-5
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.1-5"]
summary: Solution to Exercise 2.1-5 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-21-5
math: true
---

## ❓ Question
<blockquote>

Consider the problem of adding two $n-bit$ binary integers $a$ and b, stored in two n-element arrays $A[0: n-1]$ and $B[0: n-1]$, where each element is either 0 or 1, $a = \sum_{i=0}^{n-1} A[i]⋅2^i$ and $b = \sum_{i=0}^{n-1} A[i]⋅2^i$. The sum $c = a + b$ of the two integers should be stored in binary form in an (n + 1)-element array C[0:n], where $c = \sum_{i=0}^{n} C[i]⋅2^i$. 

Write a procedure ADD-BINARY_INTEGERS that takes as input arrays $A$ and $B$ along with the length n, and returns array $C$ holding the sum.

</blockquote>

## 💡 Answer

<blockquote>

Assumption:
The binary numbers are  ordered while entering them into an array, e.g 12 which is $1100$ will look like so $[1,1,0, 0]$ with the last zero occupying the $n-1th$ index(LSB) and the first 1 occupying the $0th$ index(MSB).

An efficient algorithm could use bit masking(^, |, &) operators to do the addition operations.

We chose to be more explicit with the operations and leave the optimization for anyone who requires it.

Pseudo Code
```text
ADD-BINARY_INTEGERS (A, B, n)
  n_c = n + 1 // number of elements in array A + 1(to be used for the MSB)
  carry = 0
  C = []
  for i = n to 0
    C[i] = (A[i] + B[i] + carry) mod 2 // get the remainder of the division in bit
    carry = ⌊(A[i] + B[i] + carry) / 2⌋
    i = i - 1
  C[n] = carry
```

<small>Implementation in Python</small>
```python
def add_binary_integer(A: list, B: list):
    n = len(A)
    carry = 0
    C = [0] * (n + 1)
    for i in range(n - 1, -1, -1):
        C[i + 1] = (A[i] + B[i] + carry) % 2
        carry = (A[i] + B[i] + carry) // 2
    C[0] = carry
    return C
```

<small>Implementation in C</small>
```c
#include <stdio.h>

void add_binary_integer(int A[], int B[], int C[], int n) {
    int carry = 0;
    for (int i = n - 1; i >= 0; i--) { 
        C[i + 1] = (A[i] + B[i] + carry) % 2;
        carry = (A[i] + B[i] + carry) / 2;
    }
    C[0] = carry;
}

int main() {
    int A[] = {1, 1, 0, 0}; // 12 in binary (natural order)
    int B[] = {1, 0, 1, 1}; // 11 in binary (natural order)
    int n = sizeof(A) / sizeof(A[0]);
    int C[n + 1];

    add_binary_integer(A, B, C, n);

    printf("Result: ");
    for (int i = 0; i <= n; i++) {
        printf("%d ", C[i]);
    }
    printf("\n");

    return 0;
}
```

</blockquote>
