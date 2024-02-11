---
title: Optimized Merge Sort
date: 2024-02-15
tags: [algorithms, Performance, merge-sort, divide and conquer]
excerpt: Merge Sort us θ(nlgn), but does bad for pretty small input, we explore how to approach running merge sort at θ(n^2) for small input where n is determined in the algorithm.

---

Going through Chapter 2 of Carmen, I was introduced to the concept of divide and conquer, which is a very interesting algorithm technique, and a popular exam of the divide and conquer algorithm is merge sort.

Merge sort has an θ(nlgn) run time, which is very good for large inputs. When the input is sufficiently small enough, the algorithm has a worse run time compared to a sorting algorithm that completes in θ(n^2) time. One of the exercises is to create an optimized version of the merge sort that runs the original merge sort algorithm for sufficiently larger inputs where it shines and to run insertion sort [ θ(n^2) ] when the input size is sufficiently small enough. I have a solution for it on my Clio website, this post walks through the process for the solution.