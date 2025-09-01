---
title: Chapter One
keywords: ["introduction to algorithms", "cormen", "algorithms"]
description: Personal note on the CH1 of Introduction to Algorithms
tags: ["introduction to algorithms", "algorithms"]
---

The first part introduces algorithms as computational solutions that halt and produce a correct value given a set of inputs. An input can be categorized as an instance of the problem or, in some cases, the problem itself. It discusses how algorithms are applied in various real-world situations across different areas.

Generally, problems have defined algorithms for solving them. For problems where there is no readily available solution, the book serves as a cookbook that teaches the techniques for designing such algorithms.

Algorithms are measured by how fast they are, there are cases where the speed can not be determined as some problems can provide exact solutions while others provide approximate solutions like the case of a traveling salesperson.  They are called NP-complete algorithms. For these, it is a fruitless search to find the correct algorithm. It would make sense to identify an NP-complete algorithm and design for the best optimization and not a correct algorithm.

### Section 1.2 

This section emphasizes algorithms as another kind of technology, and we could be making the wrong choice if we do not. It considers how the runtime of merge sort outweighs that of insertion sort, even when merge sort runs on a slower machine and insertion sort runs on a faster one. It considers the fact that even though we have better and faster hardware, RAM and space are still limited resources.

An algorithm should be seen as a technology compared to our hardware and software, according to examples in the book, hardware requires algorithms to function, for example, routing network traffic, and it emphasizes the fact that at the application layer, more algorithms are required as well, for example searching through text inside of Microsoft Word requires an algorithm that can go through the text to find a match, even highlighting a match requires algorithm.

With the advent of AI, we might think we need fewer algorithms, but the reality is that AI and machine learning are algorithms created to create an algorithm for solving a problem.

Every day, there is an increasing need for a better and faster way to do things even as our computation requirement continues to grow. Our hardware continues to get better too, there is still a limited amount of storage and RAM we could compute on, and as we might think that it is huge to have an algorithm working on 100million data at a time, this is lesser to the amount of internet traffic, google search, and tweet being processed per minute.

