---
title: The VIM echo command
date: 2024-02-07
tags: [vim, text-editor, bash]
category: vim
excerpt: Echoing like a PRO in VIM
---

As with many other technologies, VIM can echo messages, if you are coming from a contemporary editor, this can hit differently.

First, the result of all the echoed messages is visible in the status bar at the bottom of the screen,

Secondly, previous messages can be accessed with the `:message` command.

To echo a message, enter the command mode  (ESC or CTRL-C), then type the below command:

```vim
:echo "Hello World"
```

This should print out Hello World to the status bar, but would not preserve the message for later reference.

## Echo Commands

There are various echoing forms, each with its unique use case.

### Echoing like a comment

The form of echoing demonstrated above is meant for unpreserved echo messages,

The `:echon {expr}` command is a better form of it.

```vim
:echon "This is a comment message"
```

### Highlighting echo results

For some reason you might wish to highlight the result of the `echo` command, the `:echoh` or `:echohl` command makes it possible.

```vim
:echoh WarningMsg | echo "Don't panic!" | echo None
```

The WarningMsg is a type of highlight, another possible highlight can be viewed with the `:highlight` command

It is required to `:echo None` at the end or later when the highlighting process is complete.

This preserves the echo messages' default (`None`) state.

To provide your custom color, use the highlight command to create a highlight:

```vim
:highlight MyGreen ctermfg=green guifg=#00FF00
```

Use it like the below:
```vim
:echoh MyGreen | echo "Green Message" | echo None
```

### Echoing Error Messages

The `:echoe {expr}` or `:echoerr {expr}` command can be used to echo error messages

```vim
:echoerr "EOL in the current file"
```

The final message is preserved in the message log.

### Saving the result of the echo command

The `echom {expr}`  or `echomsg {expr}` can be used for messages that should be preserved in the messages log

```vim
:echom "Preserved"
```

To view previously saved messages, use `:messages` command

### Echoing to a window
For some echo messages that can be too long for the status bar, the `echow` or `:echowindow` command can be used.

```vim
:echow "Lorem Ipsum" 
```

### Echoing to a console
`echoc` can be used to write to the console, although it behaves more like `echom` when not in GUI mode.

If running as a GUI, the message is output to stdout.

```vim
:echom "what are we doing today?"
```

## VIM's echo command and Shell's echo command

It can be tempting to think the VIM's `:echo` command is the same as the shell's `!echo` command.

One subtle difference is how they both handle the values that they receive.

The `:echo` command requires Vim native expressions for example to get the current filename do:

```vim
:echo expand("%")
```

Notice that the expand is a Vim expression command that expands some special characters to some values, in this case, the "%" is expanded to the current filename

To have this same result in a shell command, for example, echo the content of the current file

```vim
!echo %
```
The `%` is replaced with the current filename, this can be useful in other cases e.g. cat the current filename.

Notice how the expand function is not required to get the desired result.

When using the echo command, use vim's native function for expansion and special effects, in the bash mode, the special characters are expanded before the command is executed.


Namaste!
