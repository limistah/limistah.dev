---
title: Rust Installation
date: 2025-09-16
tags: [rust, installation]
category: Rust
description: Install Rust and Cargo package manager on a system
summary: Install Rust and Cargo package manager on a system
---

The rustup website has robust installation methods, especially when you are on a Windows OS – this is what worked for me.

Run the command below in your terminal:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

This downloads the installer, then proceeds to ask if you want a customization of the installation, then downloads and installs the below components:

- cargo
- clippy
- rust-docs 
- rust-sdt
- rustc
- rustfmt

Then run one of these to add the binaries to the PATH of the current shell session:

```bash
. "$HOME/.cargo/env" # For sh/bash/zsh/ash/dash/pdksh
source "$HOME/.cargo/env.fish" # For fish
source $"($nu.home-path)/.cargo/env.nu" # For nushell

```

The installation can be verified by running `rustc` command, which returns the help output.

Useful things that can be done with this installation include:

- `rustc -version`: Get the installation version number
- `rustup update`: Update the current installation to the LTS
- `rustup self uninstall`: Uninstalls Rust and all the other components installed along it

Voila!
