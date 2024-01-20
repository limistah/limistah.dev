---
title: Ruby - if statement?
date: 2024-01-15
tags: [programming, ruby ]
category: Programming
excerpt: If statement the ruby way.
---

In Ruby, the `if` statement looks like this

```ruby
val = 1

if val == 1
  p "Equality Checked!"
end

```

And for `if else`

```ruby
val = 2

if val == 1
  p "Equality Checked!"
else
  p "Equality Unchecked!"
end
```

And for `if, else if, else`

```ruby
val = 2

if val == 1
  p "Equality Checked!"
elsif val == 2
  p "Equality Middle Checked!"
else
  p "Equality Unchecked!"
end
```

Also, remember that everything in ruby returns a value, so your if statement can return a value that could be stored in another variable.

```ruby
val = 2

# store the returned value from the if statement
ret_val = if val == 1
  p "Equality Checked!"
else
  p "Equality Unchecked!"
end

p ret_val # => "Equality Unchecked!"
```



[Dhanyavaad](https://translate.google.com/#view=home&op=translate&sl=en&tl=hi&text=Thank%20you)! 🙇
