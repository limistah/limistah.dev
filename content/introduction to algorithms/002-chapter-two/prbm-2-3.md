---
title: Chapter Two - Problem 2.3
keywords: ["introduction to algorithms", "cormen", "algorithms", "Problem 2.3"]
summary: Solution to Problem 2.3
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/problem-2-3
math: true
---

## ❓ Question
<blockquote>

## Correctness of Horner’s rule

You are given the coefficients $a_0, a_1, a_2, …. a_n$ of a polynomial

$P(x) = \sum_{k=0}^{n} a_kx^k$

$P(x)= a_0, a_1x, a_2,x^2 …. a_{n-1}x^{n-1}+a_nx^n$

and you want to evaluate this polynomial for a given value of x. Horner’s rule says to evaluate the polynomial according to this parenthesization:

$P(x) = a_0 + x(a_1+x(a2+…+x(a_{n-1} + xa_n)…)).$

The procedure HORNER implements Horner’s rule to evaluate P(x), given the coefficients $a_0, a_2, …. a_n$ in an array $A[0:n]$ and the value $x$.

1. In terms of \Theta-notation, what is the running time of this procedure?
2. Write pseudocode to implement the naive polynomial-evaluation algorithm that computes each term of the polynomial from scratch. What is the running time of this algorithm? How does it compare with HORNER?
3. Consider the following loop invariant for the procedure HORNER:
    At the start of each iteration of the **for** loop of lines 2-3,
    $p = \sum_{k=0}^{n-(i+1)} A[k +i + 1] ⋅ x^k .$

Interpret a summation with no terms as equaling 0. Following the structure of loop invariant proof presented in this chapter, use this loop invariant to show that, at termination, $p = \sum_{k=0}^{n} A[k] ⋅ x^k .$

</blockquote>

## 💡 Answer

<blockquote>



</blockquote>
