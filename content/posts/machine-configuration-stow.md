---
title: Managing Machine Configuration with Stow
date: 2025-07-22
tags: [devices, unix, config ]
category: System, Devices, Configuration
excerpt: Keeping unix machine configuration synchronized across multiple devices and a faster way to switch devices and still maintainging the same experience.
---

### Motivation

I recently had to switch from my previous Mac (Apple M1 Pro) to a newer Mac (Apple M4 Pro), an experience that should have required effort and a careful migration that happened in the least possible time, while I still got access to the same dev experience as I used to on my previous Mac.

In this post, I will share how I did it - it is not trivial. The tools I use to make management hassle-free are available for you to explore, and I hope you can find one or two ideas to implement your unique solutions. I will share what did not go well and how I plan to tackle it with my next device switch.

## Development Environment

When a developer mentions a machine, they refer to the location where most of their development work is conducted. While we develop on these machines, building the best experience for our application users, we also overlook our own experiences in these places.

I am obsessed with optimisation, seeking even the slightest change that can bring out a possible 0.01% improvement. It can be as simple as a keystroke, or as complex as how I organize my desktop, or even switching from a less efficient tool to a more effective one. Experienced developers should also experience this frustration - I'm paid for how quickly I can accomplish tasks.

Here is a list of my current development environment tools:

- Editor: A mix of nvim, vscode
- Browser: Chrome
- Terminal: Ghostty
- Shell: zsh
- Dot File manager: Stow

One thing is prevalent with all of them: they are configurable.

## Keeping in Sync

Considering that the UNIX environment is configurable through files, we can use a native tool called [Stow](https://www.gnu.org/software/stow/) to manage it.

Stow keeps two folders in sync by creating a symbolic link in the destination folder that points to the originating folder. As an example, we can use Stow to manage our host files(`/etc/hosts`) or nameserver file(`/etc/resolv.conf`) or even an entire folder, nginx user-defined server configuration files `/etc/nginx/conf.d` as an example.

In my case, I want to use Stow to manage my user home directory (`~/`) and the' .config' directory (`~/.config`) inside my home directory, which is where my environment configurations will reside.

## What should be in sync

In my home directory, I have my bash_profile, .zshrc, and .bashrc files, as well as my vim and nvim configurations managed. And inside the .config directory, I want Stow to manage all the folders and files that will be generated and stored there, as most tools use it to manage their configuration against the home directory.

## Setting up Stow
Download [stow](https://www.gnu.org/software/stow/) using your package manager:
```bash
# macos
brew install Stow

# debian
sudo apt-get update
sudo apt-get install stow

# CentOS/RHEL 7
sudo yum install Stow
# or for RHEL 8+ or Fedora
sudo dnf install Stow
```

Verify your installation via:
```sh
stow --help
```

```txt
stow (GNU Stow) version 2.4.1

SYNOPSIS:

    stow [OPTION ...] [-D|-S|-R] PACKAGE ... [-D|-S|-R] PACKAGE ...
...
...
...
General help using GNU software: <http://www.gnu.org/gethelp/>
```

### Configuring and Running Stow
I have a folder called `dotfiles`, and created a new file called `.stowrc` that contains:

```txt
--target=~/.config
--ignore=.stowrc
--ignore=DS_Store
--ignore=atuin/*
```

In my `.stowrc`, I have configured it to copy all of the files inside of the current directory into my `~/`(home) directory and applied it by running:

```bash
stow .
```

## Tracking with Git

To ensure that I don't lose these configurations, I set up Git to track the files, which provides the longevity and ease of synchronization.

One issue I faced was that zsh stores its code inside `~/.config/zsh/.oh-my-zsh`. The solution that works is to use it as a submodule, which ensures that the currently known zsh repo commit is sufficiently tracked.

To start, init git submodule:
```bash
git submodule init
```
This creates a .gitmodules file, which can contain:
```git
[submodule ".config/zsh/ohmyzsh"]
	path = .config/zsh/ohmyzsh
	url = https://github.com/ohmyzsh/ohmyzsh.git
```

In this config, I have pointed the zsh repository to `.config/zsh/ohmyzsh`, and finally, it is initialized by:
```bash
git submodule init .config/zsh/ohmyzsh
```

When I need to update the zsh repository, I run this
```bash
git submodule update --recursive
```

Great!!!

## Moving to a new Machine
For sensitive configs like my `ssh` keys, I keep track of them manually in a physical drive. This makes it easier to connect to servers and services without having to reconfigure a new SSH keys on those services, how will I get access to the service in the first - chicken and egg problem.

To set up my new machine, I move my SSH keys to the ~/.ssh folder of the new machine and run `git clone https://github.com/limistah/dotfiles.git` to pull the code directly onto my machine.

Then I go over the installation for Stow, and finally, I cd into my dotfiles folder, and run `stow .` to sync the dotfiles with my home directory. Easy!

### What did not go well...
There are other things that can not be managed with Stow, and these are tools that don't have a known configuration file/directory.

I also had to reinstall my software, such as VSCode,Cursore, Notion, and other third-party applications. I did not optimize for this, and might be an area I can investigate in my next iteration.

Also, my work folder had to be manually migrated; it was a lot of pain as the .git, cache and package manager had to be migrated - imagine a .git folder for a very busy repository, how large can that be? I am considering putting these on a dedicated local server and sharing the folder over the local network, but the fear of working from a remote location prevents me from exploring this idea.

## Was it worth it?
As easy as this sounds, it is hard, and this is something I've solved before when I switched to M1 as my primary development machine.

And yes, it was worth it!

My keystrokes, aliases, shell, extensions, and other configurations that I might have forgotten could have been lost during the migration, making my life easier. I can retrieve the applications that use these configurations, but enabling the correct configuration for the apps that match my previous environment may not be possible.

For that, yes, it was worth it!