---
title: Know the man(nual) pages
date: 2023-06-18
tags: [Linux, Sys-Admin, Devops]
excerpt: Know the man pages, the different sections, and how to get help for a specific section

---

There are many ways to get help as a Linux administrator, manual pages are one of them as they are always close - accessible via the terminal. 

The manual pages, called "man pages" is a local documentation and description of software packages, drivers, routines, and libraries on a Linux machine. 

To use it run `man [command|library|routine|driver]` and replace the command with the name of a command to find a manual.

An example `man whereis` shows the manual pages for the `whereis` command


Man Pages exist in sections and are supported by both FreeBSD and Linux.

Below is a list of supported sections:

---------------

| Section | Description                                  |
| ------- | -------------------------------------------- |
| 1       | User-level commands and applications         |
| 2       | System calls and kernel error codes          |
| 3       | Library calls                                |
| 4       | Device drivers and network protocols         |
| 5       | Standard file formats                        |
| 6       | Games and demonstrations                     |
| 7       | Miscellaneous files and configurations       |
| 8       | Obscure kernel specifications and interfaces |



To get help for a keyword at a section run

`man [section] keyword`

To know about the `init` kernel call, `man 8 init`  



Ciao
