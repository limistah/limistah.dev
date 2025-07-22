---
title: Source Code to Bits - CPU Perspective
date: 2025-07-17
tags: [System, OS, CPU]
excerpt: Something has to come here
draft: true
---

## Motivation:

Computer programs these days are written in a form that is very similar to the language we speak. To software engineers, we accept that computers do more than the for loop we write. In this post, I explore how a computer program written in HLLs [^1] is converted into electrical signals [^2] that we interpret as bits, operate on them, and convert them back into a form that we can understand.

## In the beginning

In traditional CS, students are taught about logic, gates, Boolean algebras and CPU architecture, but at the core of this is a fundamental understanding that I believe is often missed.

Just as with every human invention, the advent of electricity prompted scientists to ask a bigger question: what happens when electricity moves through certain materials/elements? This question provided answers to items that are conductors and semiconductors, but what became more surprising were the conductors that behave in a certain way when electricity passes through them.

Some elements were discovered to allow electricity to pass through them when a certain amount of voltage is supplied as input, and will not allow electricity to pass through when the supply is lower than the expected voltage. As you might have guessed, this gave the impression of on and off, just by altering the supply voltage.

###

As humans, we thrive on facts, and that is what most of what our university courses are about. If a fact is well established, it means it is very repeatable. What more could be adding 1 + 1? Regardless of the condition it would always be 2, so, why would we want to keep doing this, everytime.

Consider three items:

- A rock
- A coal
- A stick

Inorder to have a coal, you need a certain amount of rocks, and to make a stick you need a certain amount of sticks. We now have to worry about what values do we need?

### Relevance

In the history of computers, we learnt about finger counting[^3] as one of the earliest forms of computation, followed by the abacus[^4] and, much later, the analytical engine. All of these have the same goals: how can we represent numbers such that we can combine these representations to arrive at an answer? Simply put, we want to easily get the answer of 2 \* 2 without thinking about it.

[^1]: [Higher Level Languages](https://en.wikipedia.org/wiki/High-level_programming_language)

[^2]: An answer to a [Stack Exchange](https://superuser.com/a/924841) Question

[^3]: Finger Counting on [Wikipedia](https://en.wikipedia.org/wiki/Finger-counting#:~:text=Finger%2Dcounting%20is%20known%20to,and%20probably%20even%20further%20back)

[^4]: Abacus on [Wikipedia](https://en.wikipedia.org/wiki/Abacus)
