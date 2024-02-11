---
title: Searching for a pattern in the man pages
date: 2023-06-20
tags: [Linux, Sys-Admin, Devops]
excerpt: Find help from the terminal by searching through the man pages

---

To search through the man pages for some keywords, use the -k option.

 `man -k [keyword]`

This shows a result of the commands, and routines that match the keyword with a one-line description of what they are about.

`man -k passwd` shows all the possible entries for `passwd` in the manual pages.

#### The apropos

The man -k [keyword] command is similar to a help utility called apropos which is available both on Unix and Linux. See it as a shortcut.