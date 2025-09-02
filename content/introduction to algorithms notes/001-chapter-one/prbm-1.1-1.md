---
title: Chapter One - Exercise 1.1-2
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 1.1-2"]
description: Solution to Exercise 1.1-2 Question
tags: ["introduction to algorithms", "algorithms"]
canonicalURL: https://clio.limistah.dev/problem-1-1
---

## ❓ Question 

> For each function f(n) and time t in the following table, determine the largest size n of a problem that can be solved in time t, assuming that the algorithm to solve the problem takes f(n) microseconds.

## 💡 Answer

We will provide a sample solution on how to solve for a 1sec for each of the running time.

1sec = 1000millisecond = 1000000microsecond
1sec = 10^6microsecond

Solving for $lgn$
lgn = 10^6
$2^{lgn} = 2^{10^6}$
$n = 2^{10^6}$

solving for $\sqrt{n}$
$\sqrt{n} = 10^6$
$(\sqrt{n})^2 =  (10^6)^2$
$n = 10^{12}$

Solving for $nlgn$
$nlgn = 10^6$
$f = nlgn - 10^6$
$\frac{df}{dn} = lgn + 1$
With an initial guess of 10^6, we can use Newton-Raphson method to get a solution
Solution is: 62746.12646969076
See https://replit.com/@AleemIsiaka/nlgn-106#main.py


$n^2 = 10^6$
$\sqrt{n^2} = \sqrt{10^6}$
$n = \sqrt{10^6} = 10^3$

Solving for $n^3$
n^3 = 10^6
$\sqrt[3]{n^3} = \sqrt[3]{10^6}$
$n = 10^2$

Solving for $2^n$
$2^n = 10^6$
$lg 2^n = log 10^6$
$n*lg2 = 6*lg10$ 
$n = \frac{6*lg10}{lg2} = \frac{6*1}{0.30103} = 19.934$
$n = 19.934$

Solving for n!
n! = $10^6$
n! = 1*2*3*4….n = $10^6$
We could pick a number as a guess, and check if the value is within $10^6$.
if n = 10
10! = 3628800 (> $10^6$)
9! = 637120 (< $10^6$)

Hence n = 9, such that $n! ≤ 10^6$


We could do same for the rest of the time, changing the time value but running similar operations for the running times.