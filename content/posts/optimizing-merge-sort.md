---
title: Optimizing Merge Sort
date: 2023-06-20
tags: [Algorithms, Runtime, Big-O]
excerpt: Choosing the right algorithm is a skill often overlooked, this post shares how to implement a hybrid merge-insertion sort.

---

Going through Chapter 2 of [CLRS](https://clio.limistah.dev/introduction-to-algorithms), I was introduced to the concept of divide and conquer, which is a very interesting algorithm technique, and a popular example of the divide and conquer algorithm is merge sort.

Merge sort has an θ(nlgn) run time, which is very good for large inputs. When the input is sufficiently small enough, the algorithm has a worse run time compared to a sorting algorithm that completes in θ(n^2) time. One of the exercises is to create an optimized version of the merge sort that runs the original merge sort algorithm for sufficiently larger inputs where it shines and to run insertion sort [ θ(n^2) ] when the input size is sufficiently small enough. I have a solution for it on my Clio website, this post walks through the process for the solution.
