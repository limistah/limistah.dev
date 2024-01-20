---
title: tar (child) xz Cannot exec No such file or directory
date: 2023-07-10
tags: [Linux, Sys-Admin, Devops]
excerpt: Untar an xz compressed file
---

The error:


```bash
tar (child): xz: Cannot exec: No such file or directory
```


Is majorly an issue with the `xz` command not found on the host machine.

To verify, run:


```bash
whereis xz
```


### Fix

To fix, use the installation command for your Linux distribution:


```bash
sudo apt-get install xz-utils          # Debian / Ubuntu
sudo yum install xz                    # RHEL / CentOS
sudo zypper in xz                      # OpenSuSE
sudo pacman -S xz                      # Arch Linux
```


Then `untar` again with:


```bash
tar -xf path_to_file.tar.xz
```



Ref: [S/O](https://superuser.com/a/801189)

[Dhanyavaad](https://translate.google.com/#view=home&op=translate&sl=en&tl=hi&text=Thank%20you)! 🙇