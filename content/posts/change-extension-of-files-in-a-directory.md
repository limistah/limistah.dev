---
title: Change files extension in a directory
date: 2023-06-22
tags: [Linux, Bash, Sysadmin, Devops]
description: Use Bash for loop, variable substitution, and mv to change the name of files in a directory modifying just the extension of the file

---

#### A onliner

> ```bash
> for f in *.old; do mv "$f" "${f%.old}.new";  done
> ```
>
> 

### How???

To change the name of a file on Linux/Unix use the `mv` command

> ```bash
> mv currentfilename newfilename
> ```
>
> 

If there is a file named `aleemisiaka.old` and want to rename to `aleemisiaka.new`

We can store the filename to a variable with `export FILENAME=aleemisiaka`

And use the variable name in the mv command 

> ```bash
> mv "$FILENAME"$ "$FILENAME.new"
> ```
>
> 

This renames the file from aleem-isiaka.old to `aleemisiaka.old.new`

To ensure we end up with `aleemisiaka.new` and not _aleemisiaka.**old**.new_  we could use  [parameter expansion](https://mywiki.wooledge.org/BashFAQ/073).

`echo "${FILENAME%.old}"` would give just `aleemisiaka` without the old.

Now append the new extension with  `echo "${FILENAME%.old}.new"`  which gives `aleemisiaka.new`

**Awesome**

Back to `mv` command

> ```bash
> mv "$FILENAME}" "${FILENAME.old}.new"
> ```

Renames the file from `aleemisiaka.old` to `aleemisiaka.new`.

To replace all files in a directory use the Bash for loop

````bash
for f in *.old # Loops through all the files with the .old extension
do
  mv "$f" "${f%.old}.new" # renames from file.old to file.new
done

# a oneliner
for f in *.old; do mv "$f" "${f%.old}.new";  done
````

Au revoir 

