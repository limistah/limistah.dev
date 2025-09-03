---
title: Chapter Two - Exercise 2.3-1
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.3-1"]
summary: Solution to Exercise 2.3-1 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-23-1
math: true
---

## ❓ Question
<blockquote>

Using Figure 2.4 as a model, illustrate the operation of merge sort on an array initially containing the sequence $<3, 41, 52, 26, 38, 57, 9, 49>$

</blockquote>

## 💡 Answer

<blockquote>


                                 p       q         r

                                 3|41|52|26|38|57|9|58

Divide

                         p  q    r                p  q    r

                         3|41|52|26               38|57|9|58

Divide     

                 p,q  r   p,q   r                    p,q   r      p,q  r

                 3  | 41    52 | 26                  38  | 57      9 | 58

Divide

          p,r  p,r    p,r    p,r                        p,r    p,r    p,r    p,r

           3    41     52    26                          38    57     9     58

Merge

          p,q  r       p,q   r                          p,q   r      p,q    r

           3 | 41      26 | 52                           38 | 57      9  |  58

Merge

                   p   q         r                p     q        r

                   3 | 26 | 41 | 52               9  | 38 | 57 | 58

Merge

                        p             q                  r

                        3 | 9 | 26 | 38 | 41 | 52 | 57 | 58



</blockquote>
