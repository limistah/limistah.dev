---
title: The VIM echo command
date: 2024-02-07
tags: [vim, text-editor, bash]
category: vim
excerpt: Echoing like a PRO in VIM
---

As with many other technology, VIM can echo messages, if you are coming from a contemporary editor, this can hit differently.

First the result of all the echoed messages are visible in the status bar at the bottom of the screen,

Secondly previous messages can be accessed with the `:message` command.

To echo a message, enter the command mode  (ESC or CTRL-C), then type the below command:

```vim
:echo "Hello World"
```

This should print out hello world to the status bar, but would not preserve the message for later reference.

## Echo Commands

There are are various forms of echoing, each with their unique use case.

### Echoing like a comment

The form of echoing demonstrated above is meant for unpreserved echo messages,

A better form of it is the `:echon {expr}` command.

```vim
:echon "This is a comment message"
```

### Highlighting echo results

For some reasons you might wish to highlight the result of the `echo` command, the `:echohl` or `:echohighlight` command makes it possible.

```vim
:echohl WarningMsg | echo "Don't panic!" | echo None
```

The WarningMsg is a type of highlight, other possible highlight can be viewed with the `:highlight` command

It is required to `:echo None` at the end or later when the highlighting process is complete.

This preserves the default (`None`) state of the echo messages.

To provide your custom color, use the highlight command to create an highlight:

```vim
:highlight MyGreen ctermfg=green guifg=#00FF00
```

And use it like below:
```vim
:echohl MyGreen | echo "Green Message" | echo None
```

### Echoing Error Messages

The `:echoe {expr}` or `:echoerr {expr}` command can be used to echo error messages

```vim
:echoerr "EOL in the current file"
```

The final message is preserved in the message log.

### Saving the result of echo command

The `echom {expr}`  or `echomessage {expr}` can be used for messages that should be preserved in the messages log

```vim
:echom "Preserved"
```

To view previously saved messages, use `:messages` command

### Echoing to a window
For some echo messages that can be too long for the status bar, the `echow` or `:echowindow` command can be used.

```vim
:echow "Lorem Ipsum" 
```

## VIM's echo command and Shell's echo command

It can be tempting to think the VIM's `:echo` command is the same as the shell's `!echo` command.

One subtle difference is how they both handle the values that they receive.

The `:echo` command requires vim native expressions for example to get the current filename do:

```vim
:echo expand("%")
```

Notice that the expand is a vim expression command that expands some special characters to some values, in this case the "%" is expanded to the current filename

To have this same result in shell command, for example echo the content of the current file

```vim
!echo %
```
The `%` is replaced with the current filename, this can be useful in other cases e.g cat the current filename.

Notice how the expand function is not required to get the desired result.

When using the echo command, use vim's native function for expansion and special effects, in the bash mode, the special characters are expanded before the command is executed.


Namaste!
