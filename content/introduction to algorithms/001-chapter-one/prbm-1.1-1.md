---
title: Chapter One - Problem 1.1-1
keywords: ["introduction to algorithms", "cormen", "algorithms", "problem 1.1-1"]
summary: Solution to Problem 1.1-1
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/problem-1-1
math: true
---

## ❓ Question 

> For each function $f(n)$ and time $t$ in the following table, determine the largest size $n$ of a problem that can be solved in time $t$, assuming that the algorithm to solve the problem takes $f(n)$ microseconds.

## 💡 Answer

> We will provide a sample solution on how to solve for a $1sec$ for each of the running time.
> 
> 1 sec = 1000 millisecond = 1,000,000 microsecond = $10^6$ microsecond
> 
> 1 sec = $10^6$ microsecond
> <hr>
> <strong>Solving for $lgn$</strong>
>
> where $lgn = 10^6$
> 
> $2^{lgn} = 2^{10^6}$
>
> $n = 2^{10^6}$
> <hr>
> <strong>Solving for $\sqrt{n}$</strong>
>
> $\sqrt{n} = 10^6$
>
> $(\sqrt{n})^2 =  (10^6)^2$
>
> $n = 10^{12}$
> <hr>
> 
> <strong>Solving for $nlgn$</strong>
> 
> $nlgn = 10^6$
> 
> $f = nlgn - 10^6$
>
> $\frac{df}{dn} = lgn + 1$
> 
> With an initial guess of $10^6$, we can use the [Newton-Raphson](https://en.wikipedia.org/wiki/Newton%27s_method) method to get a solution
>
> Solution is: 62746.12646969076
>
> See https://replit.com/@AleemIsiaka/nlgn-106#main.py
> <hr>
> <strong>Solving for $n^2 = 10^6$</strong>
>
> $\sqrt{n^2} = \sqrt{10^6}$
>
> $n = \sqrt{10^6} = 10^3$
> <hr>
> <strong>Solving for $n^3$</strong>
> 
> $n^3 = 10^6$
>
> $\sqrt[3]{n^3} = \sqrt[3]{10^6}$
> 
> $n = 10^2$
> <hr>
> <strong>Solving for $2^n$</strong>
>
> $2^n = 10^6$
>
> $lg 2^n = log 10^6$
>
> $n*lg2 = 6*lg10$ 
>
> $n = \frac{6*lg10}{lg2} = \frac{6*1}{0.30103} = 19.934$
>
> $n = 19.934$
> <hr>
> <strong>Solving for $n!$</strong>
>
> $n! = 10^6$
>
> $n! = 1*2*3*4….n = 10^6$
>
> We could pick a number as a guess, and check if the value is within $10^6$.
>
> if $n = 10$
>
> $10! = 3628800 (> 10^6)$
>
> $9! = 637120 (< 10^6)$
>
> Hence $n = 9$, such that $n! ≤ 10^6$
> <hr>
> We could do same for the rest of the time, changing the time value but running similar operations for the running times.

|             | 1sec        | 2min        | 1hr         | 1day        | 1mnt        | 1yr          | 1ctry         |
| ---------   | ----------- | ----------- | ----------- | ----------- | ----------- | ------------ | ------------- |
| |<small>$10^6$</small>|<small>$12*10^7$ </small>|<small>$36*10^8$</small>|<small>$864*10^8$</small>|<small>$2592*10^9$</small> |<small>$31104*10^9$</small>|<small>$31104*10^{11}$</small>|
| $lgn$       | $2^{10^6}$  |             |             |             |             |              |               |
| $\sqrt{n}$  | $10^{12}$   |             |             |             |             |              |               |
| $nlgn$      | $62746$     |             |             |             |             |              |               |
| $n^2$       | $10^3$      |             |             |             |             |              |               |
| $n^3$       | $10^2$      |             |             |             |             |              |               |
| $2^n$       | $19$        |             |             |             |             |              |               |
| $n!$        | $9$         |             |             |             |             |              |               |

