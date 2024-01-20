---
title: Byte Masking the ins and out
date: 2024-01-17
tags: [byte, cs, computer-science, low-level]
Category: Core Concepts
excerpt: The idea of byte masking helps us achieve abstractions from the binary concept of computers to usable technology. This post helps to solidify byte masking using operators and gives examples of why we must be aware of this concept in our everyday software engineering craft.

---

Byte masking is a deep CS concept reserved for the nerds. Here we will attempt to dissect the topic and provide a relatable experience for everyone. 

Welcome...

## Masking and its Relation to CS

Masking is a process of concealing information. Take for example having a string `"A"` but revealing "X" to others such that only those with the information on how to get the hidden value can retrieve it.

A byte is a group of bits(1 and 0) usually eight in number. Such that `00000000` becomes a byte but the individual zeros are known as bits.

In CS bitmasking is a process of manipulating the bits of computational data. For example, converting `00000000` to `01010101`. In CS, it mostly denotes what bit you want to keep, and what bit you wish to clear. in our case, we have divided the byte into pairs and cleared the first bit `00|00|00|00` => `01|01|01|01`.

## Masking Operators

Masking bits is done by the use of masking operators, taking from the byte operators:

- [The Bitwise OR](/blog/byte-operators/#for-the-bitwise-or-operator)  `|` (a single pipe character)
- [The Bitwise AND](/blog/byte-operators/#for-the-bitwise-and-operator) `&` (a single ampersand character)
- [The Bitwise XOR](/blog/byte-operators/#for-the-bitwise-and-operator) `^` (a single caret character)
- The Left Shift << (a double less than character)
- The Right Shift >> (a double greater than character)

## Masking operations examples

### OR

The rule for bitwise OR is as follows:

- If at least one of the corresponding bits is 1, the result bit is set to 1.
- If both corresponding bits are 0, the result bit is set to 0.

```text
    10101010   (binary number)
  | 11001100   (binary number)
  __________
    11101110   (result)
```

### AND

Here's how the bitwise AND operator works:

- If both bits in the operands are 1, the result will be 1.
- If at least one of the bits is 0, the result will be 0.

```text
  10101010
& 11001100
-----------
  10001000

```



### XOR

Here's how the XOR operator works:

- If the bits in the operands are different (one is 0 and the other is 1), the result will be 1.
- If the bits in the operands are the same (both 0 or both 1), the result will be 0.

```text
  10101010
^ 11001100
-----------
  01100110
```



### Left Shift

Here's how the left-shift operator works:

- Each bit in the binary representation of the operand is shifted to the left by a certain number of positions.
- Zeros are filled in from the right, and the bits that are shifted beyond the leftmost position are discarded.
- The result is obtained by multiplying the original value by 2 raised to the power of the specified shift count.

```text
Original Value: 00101010 (42 in decimal)
Left Shift by 2:  10101000 (168 in decimal)
```

Each bit in the original binary value `00101010` is shifted to the left by 2 positions. Zeros are filled in from the right, and the result is `10101000`, which is equivalent to 168 in decimal.

### Right Shift

Here's how the right shift operator works:

- Each bit in the binary representation of the operand is shifted to the right by a certain number of positions.
- Depending on the type of right shift (logical or arithmetic), zeros or the sign bit (the leftmost bit) are filled in from the left.
- The bits that are shifted beyond the rightmost position are discarded.
- The result is obtained by dividing the original value by 2 raising to the power of the specified shift count (for logical right shift) or retaining the sign bit (for arithmetic right shift).

```text
Original Value: 10101010 (170 in decimal)
Right Shift by 2:  00101010 (42 in decimal)
```

There are two types of right shift:

1. **Logical Right Shift (`>>>`):** Zeros are filled in from the left, and the sign bit is always 0. This type of shift is commonly used in programming for unsigned integers.
2. **Arithmetic Right Shift (`>>`):** Zeros or the sign bit are filled in from the left, depending on the sign bit of the original value. This type of shift is used in signed integer arithmetic to preserve the sign.

## How masking helps our daily lives

## When you shouldn't consider masking

[Adios](https://translate.google.com/?hl=en&sl=hi&tl=en&text=adios&op=translate)