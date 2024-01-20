---
title: When to use puts, print, and p in Ruby
date: 2023-09-05
tags: [Ruby, Variables, Software Development]
excerpt: Distinguish by usage 3 different methods for printing in Ruby

---

Usually, programming languages have methods for printing out variables. Ruby is not an exception. We will explore the 3 popular methods for printing variables in the Ruby Programming language.

### The `print` method

The way `print(var)` works is basically converting its value to a string by calling the `to_s` method on the object(everything is an object in Ruby) before printing the value and returning `nil` to its caller.

```ruby
num = 123
print(num) # -> 123 => nil
```

The `print` method can be easily used for concatenating strings

```ruby
num = 123
name = "Aleem"

print "The name of the boy is "
print name
print ", and his tag ID is: "
print num
print "."

# outputs everything on a single line
# -> The name of the boy is Aleem, and his tag ID is: 123
```

Having `print` as the last operation in a method should be avoided if returning nil is not the desired value

```ruby
def check_print 
	print "This should print without a new line"
end

val = check_point 
# -> This should print withouit a new line
# Now p val would return nil
```


### The `puts` method

`puts` method is not so different from the `print` method except for two scenarios:

- _`puts` adds a new line character at the end of the printed value_


```ruby
print "hello World"
# -> Hello World
# -> nil
puts "Hello world"
# -> Hello world
# ->
# -> nil
```


- _`puts` prints each element in an array on a new line_


```ruby
arr = [1,2,3,4,5,6]
    
print arr
# -> [1,2,3,4,5,6]
# -> nil
puts arr
# -> 1
# -> 2
# -> 3
# -> 4
# -> 5
# -> 6
# -> nil
```

### The `p` method

This method can be seen as a debugging tool. It prints more than just the value of a variable, it can print the memory, the object it belongs to. A good name befitting the `p` method is the variable _inspection_ method.


```ruby
p STDERR
# -> <IO:<STDERR>>

puts STDERR
# -> <IO:0x000000013f888e58>
```

Notice that above we have printed the value of STDERR to the console. using the `p` method, the module that the constant belongs as well as its name is returned, while `puts` only returns the module and memory address of the STDERR constant.

Shalom 🙇 



