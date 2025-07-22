---
title: Managing Machine Configuration with Stow
date: 2025-07-22
tags: [devices, unix, config ]
category: System, Devices, Configuration
excerpt: Keeping unix machine configuration synchronized across multiple devices and a faster way to switch devices and still maintainging the same experience.
---

### Motivation

I recently had to switch between my previous mac(Apple M1 Pro) to a newer mac(Apple M4 Pro), an experience that should have required efforts and careful migration happened in the least possible time while I still got access to the same dev experience as I used to on my previous mac.

In this post, I will share how I did it - it is not trivial. The tools that I use to make the management hassle-free and hope you could get one or two ideas and implement your unique solutions. I will share what did not go well, and how I plan to tackle that against my next device switch.

## Development Environment

When a developer mentions a machine, what they mean is where most of their development work happens. While, we develop on these machines, building the best experience for the users of our applications, we ignore our own experience around these places as well.

I am obsessed with optimization, a very tiny change that I can do to bring out a possible 0.01% of improvement. It can be a keystroke, can be how I order my desktop, can be even switching from a not so efficient tool to a better one, I believe experienced developers should have this frustration as well - how fast I can do things is what I am being paid for.

Here is a list of my current development environment tools:

- Editor: A mix of nvim, vscode
- Browser: Chrome
- Terminal: Ghostty
- Shell: zsh
- Dot File manager: Stow

One thing is very common with all of them, they are configurable.

## Keeping in Sync

Considering that the unix environmnet is configurable with files, we can use a native tool called [Stow](https://www.gnu.org/software/stow/) to do the management.

Stow keeps two folders in sync by creating symlink in the destinaton folder pointing to the originating folder. As an example, we can use Stow to manage our host files(`/etc/hosts`) or nameserver file(`/etc/resolv.conf`) or even an entire folder, nginx user defined server configuratoin files `/etc/nginx/conf.d` as an example.

In my case, I want to sue stow to manage my user home directory(`~/`) and the .config directory (`~/.config`) inside my home directory, which is where my environment configurations will live at.

## What should be in sync

In the home directory, I have my bash_profile, .zshrc, .bashrc, vim and nvim config managed. And inside of the .config directory, I want stow to manage all the folders and files that would be generated and stored in as most tools would use it to manage their configuration against the home directory.

## Setting up Stow
Download [stow](https://www.gnu.org/software/stow/) using your package manager:
```bash
# macos
brew install stow

# debian
sudo apt-get update
sudo apt-get install stow

# CentOS/RHEL 7
sudo yum install stow
# or for RHEL 8+ or Fedora
sudo dnf install stow
```

Verify your installation via:
```sh
stow --help
```
