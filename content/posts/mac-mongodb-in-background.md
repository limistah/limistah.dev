---
title: Running mongod service in the background – MAC OS
date: 2019-06-26
tags: [Mac OS, Tips, Tricks, Productivity]
---

MongoDB ships with an easy `mongod` CLI command to start its server. For Linux users, there is an added level of flexibility using the Systemd service to manage foreground and background processes. To start a MongoDB server on the boot of a Linux machine, it is as easy as registering a service with `systemd` using:

```bash
$ systemctl enable mongod.service
```

Switching from a Linux machine to Mac, and after the successful installation of MongoDB, surely, there is a need to start the command in the background while the development process continues.

To this, there are `--fork`, `--quiet`,  and `--syslog`. Which are command line parameters for the `mongod` command.

To further ease the use of this our new discovery, we can create an alias in our `.bashrc` file by appending this command at the end of the file: 

```shell
$ echo 'start-mongo = sudo mongod --fork --syslog --quiet' >> ~/.bashrc
```

Now, at the start of our Mac machine, we can do start-mongo to launch our `mongod` service.

Easy enough! 🍧