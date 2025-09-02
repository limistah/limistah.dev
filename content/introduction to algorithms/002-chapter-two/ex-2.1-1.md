---
title: Chapter Two - Exercise 2.1-1
keywords: ["introduction to algorithms", "cormen", "algorithms", "Exercise 2.1-1"]
summary: Solution to Exercise 2.1-1 Question
tags: ["introduction to algorithms", "algorithms", "problems"]
canonicalURL: https://clio.limistah.dev/exercise-21-1
---

## ❓ Question
> Using Figure 2.2 as a model, illustrate the operation of INSERTION-SORT on an array initially containing the sequence <31, 41, 59, 26, 41, 58>

## 💡 Answer

>                                        p    q        r
>
>                                       31|41|59|26|41|58 
>  Divide
>
>                       p  q  r                                p  q  r
>
>                      31|41|59                                 26|41|58
>
>  Divide     
>
>               p,r  p,q  r                                       p,r  p,q   r
>
>               31   41 | 59                                       26   41 | 58
>
> Divide
>
>            p,r  p,r   p,r                                          p,r  p,r  p,r
>
>            31   41   59                                            26    41   58
>
> Merge
>
>           p,r  p,q   r                                               p,r  p,q   r
>
>           31   41  |  59                                             26   41  | 58
>
> Merge
>
>                   p,q    r                                     p,q    r
>
>                  31|41 | 59                                   26|41 | 58
>
> Merge
>
>                                p    q        r
>
>                               26|31|41|41|58|59