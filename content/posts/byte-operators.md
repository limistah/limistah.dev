---
title: What is Byte Masking and how useful is it?
date: 2023-09-18
tags: [byte, cs, computer-science, low-level]
category: Core Concept
excerpt: The concept Byte masking concept is in almost everything we use in our everyday lives. This post exposes the concept and how it is useful for a Systems Engineer
---

Part of the operators we get introduced to when learning to program is Bitwise Operators, examples are:

- The Bitwise OR  `|` (a single pipe character)
- The Bitwise AND `&` (a single ampersand character)
- The Bitwise XOR `^` (a single caret character)

Each of these has its usage, a refresher can be demonstrated considering these two variables `foo=1` and `bar=0`

### For the bitwise OR(|) operator

```js
const foo = 1, bar = 0
console.log(foo | bar)
-> 1
```

### For the bitwise AND(&) operator

```js
const foo = 1, bar = 0
console.log(foo & bar)
-> 0
```

### For the bitwise XOR(^) operator

```js
const foo = 1, bar = 0
console.log(foo & bar)
-> 0
```

This seems pretty basic until you understand it is **_not_**.

## What the heck is byte masking?

**Byte masking is a process of flipping the smallest unit of computing value called bits.**

### Some CS Background

Computer as you interact with it is basically 1s and 0s on the lowest level. This text you are reading is represented as a bunch of 1s and 0s inside the computer. These values represent the state of a very tiny piece of a device called a _transistor_.

Transistors as electronic devices are very unique and useful, they behave like light bulbs (i.e. they can be turned on and off), what makes them very useful to us today is that they can maintain their state(either on or off) over a very long time. Each of these states is represented as either on(0) or off (1).

#### Bits to Bytes

After the advancement of transistors, the next phase is on how to make them useful for everyday usage(what technology is meant for), which is how to make transistors as a storage devices. But we can't store the Alphabet as on and off or 1 and 0, the byte was invented.

 A byte is a representation of a group of bits. Eight(8) bits would produce One(1) byte. Storing this on transistors means that transistors have to be grouped, and each group would have an identity. For example, if we have 32 transistors, that is 32 bits, and can be further converted to 32 / 8 = 4bytes, another example is if we have 32000 bits we would have 4000bytes. _The 4000bytes can be simplified by dividing by 1000 to create a kilo version, hence 4000byes/1000=4Kbytes_

#### Bytes to ASCII code

With computers stuck at 1s and 0s, it makes more sense to stick to just the base 2 numbering system for computer arithmetic operations. For example, 1 + 1 in base 2 equals 0 (add both numbers, divide by 2 then take note of the remainder after the division), and 1+0 in base 2 equals 1 (subtract both numbers, then divide by 2, then take note of the remainder after the division).

With these genius concepts, invention went further by assigning numbers to every number, character, and symbol ever known to man. This assignment is called ASCII character code. A(capital alphabet) is a different character from a(smaller alphabet) and both have unique ASCII numbers. For `A` the ASCII code is `065` and `a`is `097`.

#### Representing characters

Representing a character on a transistor(in bits) becomes easier, _convert the code from base 10 to 2_. For `A` the base 10 value is `065`, while the base 2 value is `01000001` and for the small `a` with a base 10 value of `097` the base 2 value is `01100001`. Numbers written in base 10 are called Decimal Numbers, while numbers written in base 2 are called Binary numbers. 

#### Representing words

Since we can store numbers, characters, and symbols, we should be able to store words. Words are a group of letters and somehow letters, and alphabets, it is safe to use string, so a string of numbers, alphabets, and symbols. 

This can be easily done by taking a consecutive byte(recall that this means 8 units of bits) until all the characters in the string are represented. For example, to represent _hello_ we would take the first byte and fill it with 01101000 (104 in ASCII) for `h`, then 01100101 (101 in ASCII) for `e`, then 01101100 (108 in ASCII) for `l`, then 01001100 (076 in ASCII) for `l`, and 01101111 (111) for `o`. 

Grouping this together it forms a string of 0s and 1s like this 

`0110100001100101011011000110110001101111`. 

### What is byte masking?

Byte masking is data manipulation at the bit level. What is happening is based on the kind of byte masking operation, we are instructing the transistor to switch to another state or maintain their state. For example, the binary code for the number 1 is  1, and for 2 is 10, and a bitwise OR operator on both numbers would give 3.

```js
const foo = 1 // 01 in binary
const bar = 2 // 10 in binary
foo | bar // => 3 , 11 in binary
```

What is happening here is in the way the bitwise OR operator works. It adds up the binary numbers, divides the result by 2, and records the remainder. Here if we do a right-to-left addition, 1+0 would give 1 divided by 2 gives zero but left with 1, and to the right we have the same operation we would end up with 1 as well. But, 11 is a binary representation of 3 in decimal numbers.

```bash
   0 1
 | 1 0
 ------
   1 1

# Taking the top right and the bottom right
 1 + 0 = 1
 1 / 2 = 0 remainder 1, take the remainder as the answer

# Taking the top left and the bottom left
  0 + 1 = 1
  1 / 2 = 0 remainder 1, take the remainder as the answer

#------
 11 in base 2 is 3 in base 10
 1 | 2 returns 3
```

Be aware that 1 is not stored as 1 in computers but as `00000001` same for 2, it is rather stored as `00000010` for consistency against larger values.

### Masking Operators

To better understand byte masking operations, take a look at what each masking operator would do for you.

#### The Bitwise OR operator

As shown earlier, this operator returns the result of adding two bytes together. In the case of 1 and 2, we added 00000001 and 00000010 together to result into this 00000011.

If the addition seems more arithmetic here is a better way to understand this:
```bash
// OR Operator
   00000001
   00000010
 = 00000011
```

As long as there is 1 in any of the values we are comparing, the result must return 1.

#### The Bitwise AND Operator

This is the reverse of the bitwise OR operator. Instead of taking the remainder, we take the result of the division by 2.

```bash
# 01 & 10

   0 1
 & 1 0
 -------
   0 0

# Taking the top right and the bottom right
 1 + 0 = 1
 1 / 2 = 0 remainder 1, take the result of the division as the answer

# Taking the top left and the bottom left
 0 + 1 = 1
 1 / 2 = 0 remainder 1, take the result of the division as the answer

-----
00 in base 2 is 0 in base 10
1 & 2 returns 0
```

A better way to understand this without the math

```bash
# AND Operator

  +-------------------------------+
  | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
  +---+---+---+---+---+---+---+---+
& | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
  +-------------------------------+
= | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
  +-------------------------------+
```

As long as there is a 0 in any of the columns we are comparing, the result must return 0.

#### The Bitwise XOR Operator

For the XOR operator, it checks if the remainder after the division of the two values is equal to 0, if it is, then the result is the same as the division (0, mostly for 0 + 1, 1 + 0 operations) , if the remainder after the division is 1 then the result is the remainder (0, mostly for 1 + 1 operations).

```bash
# XOR Operator 101 | 110

  1 0 1
| 1 1 0
-------
  0 1 1

Taking the top right and the bottom right
1 + 0 = 1
1 / 2 = 0 remainder 1, take the remainder as the answer since the result is 0

Taking the top middle and the bottom middle
0 + 1 = 1
1 / 2 = 0 remainder 1, take the remainder as the answer since the result is 0

Taking the top left and the bottom left
1 + 1 = 2
2 / 2 = 1 remainder 0, take the result of the division as the answer since the remainder is 0

-----
11 in base 2 is 3 in base 10
1 | 2 returns 3
```

Without the arithmetic:

```bash
# 10000101 ^ 00000110
  +-------------------------------+
  | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 |
  +---+---+---+---+---+---+---+---+
^ | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 0 |
  +-------------------------------+
= | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
  +-------------------------------+
```

#### The Bitwise NOT operator

This operator basically negates the value of each bit. If a bit is 0 it becomes 1 and if it is 1 it basically becomes 0. For example:

```bash
# NOT Operator
  ~ 101
  -----
=   010
```

Also,

```bash
# NOT Operator
  ~ 010
  -----
=   101
```

#### Other operators

There are still two more operators, the Left Shift Operator and the Right Shift Operator. Both try to inverse(change to the other value)



Voila!
