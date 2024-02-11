---
title: Searching for a pattern in the man pages
date: 2023-06-20
tags: [Linux, Sys-Admin, Devops]
excerpt: Find help from the terminal by searching through the man pages

---

Going through Chapter 2 of Carmen, I was introduced to the concept of divide and conquer, which is a very interesting algorithm technique, and a popular exam of the divide and conquer algorithm is merge sort.

Merge sort has an θ(nlgn) run time, which is very good for large inputs. When the input is sufficiently small enough, the algorithm has a worse run time compared to a sorting algorithm that completes in θ(n^2) time. One of the exercises is to create an optimized version of the merge sort that runs the original merge sort algorithm for sufficiently larger inputs where it shines and to run insertion sort [ θ(n^2) ] when the input size is sufficiently small enough. I have a solution for it on my Clio website, this post walks through the process for the solution.
