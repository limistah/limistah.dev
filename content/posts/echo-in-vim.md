---
title: echo in vim
date: 2024-02-07
tags: [vim, text-editor, bash]
category: vim
excerpt: Echoing in VIM
---

As with many other technology, VIM can echo echo messages, if you are coming from a contemporary editor, this can hit differently.

First the result of all the echoed messages are visible in the status bar.

To echo a message, get to the command mode, and type:

```bash
echo "Hello World"
```

This should print out hello world to the status bar.

## Echoing like a comment
uses echon

## Highlighting echo results
using echohl

## Echoing Error Messages

echoerr expr

### Saving the result of echo command
using echom

### Echoing to a window
using echow

But there is more to just echoing.

The result of the `echo expr` can be accessed somewhere.

In the command mode, type `:messages` the resulting list is all the echoed messages


### Differences between VIM's echo command and bash echo command


Voila!
