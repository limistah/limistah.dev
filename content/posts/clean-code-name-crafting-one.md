---
title: Rules For Name Crafting – Part One
date: 2019-05-15
tags: [Book, Clean Code, Series]
---

This is the first of the series – [Clean Code – Rule For Name Crafting Series](/blog/clean-code-series). In this post, we will be dealing with the first three rules stated by [Robert](https://twitter.com/unclebobmartin?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) in his **[Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)** book and they are: _always use intention revealing names, avoid disinformation, and make meaningful distinctions._

### #1: Always Use Intention Revealing Names

To some profession, giving names that do not reveal what the item/object is about might be a norm, we have seen astroids named [Iris](https://en.wikipedia.org/wiki/7_Iris), and a human named _Mars_. Imagine that you are writing an Airport Flight Management System, what could client or customer mean generally in the app? These are names that could apply differently based on the context that they are being used.

Generalization should be avoided when naming `variables`, `classes`, `methods/functions`. Names should mean what they actually are wherever they appear. You could name the `client/customer` variable to be `passenger` while in a `Flight` class and `customer` while in the `Payment` class. These are valid names that reveal what they are intended for.

Another version of non-intention revealing names is the use of first letters of the name. Take const `p = this.customer`, this pollutes that section of the codebase with mappings of a single alphabet, remember when you have to look up to where a variable is declared, you have a bad variable name.

Let us consider this little code:

```js
const getThem = () => {
  const list1 = new Array();
  for (let x in theList) {
    if (theList.hasOwnProperty(x)) {
      if (x[0] === 4) {
        list1.push(x);
      }
    }
  }
  return list1;
}
```

It is obvious that there is no indication of what this code is doing. We have to ask questions like:

- What is the Them in getThem?
- What is the significance of the first element in each item of the list
- How can the returned value for this be consumed?

A perfectly named and intention revealing code should answer all of these for you with you not asking.

Check out this modified version of the code:

```js
const getActiveUserGroup = (userGroups) => {
    const activeUserGroups = new Array();
    for (let userGroupId in userGroups) {
        if(userGroups.hasOwnProperty(userGroupId)) {
            const userGroup = userGroup[userGroupId];
            if (userGroup[STATUS_INDEX] === ACTIVE_SATATUS) {
                activeUserGroups.push(userGroup);
            }
        }
    }
    return activeUserGroups;
}
```

The modified version of the code is so explanatory, in that it tells what it does and reads like a story. Debugging this code does not require a preprocess function of the brain.

### #2: Avoid Disinformation

Using the code in the above section and looking through `theList` and `list1`, what do they tell, actually? What information are they telling our readers by list1?

As programmers, we have to avoid giving information that actually does tell what we don't mean. You should avoid using an Array where you actually meant an Object, and do not use an Object where it is a String. Let the name tell what they actually do.

>>Spelling similar concepts similarly is information. Using inconsistent spellings is dis- information. You should not use names whose differences are not easily noticed, do not use names like XYZControllerForEfficientHandlingOfStrings and XYZControllerForEfficientStorageOfStrings, how hard it is to spot the difference, very hard you see? One example of uninformative names is using f for fund, as we do while iterating a list of funds. - _Robert C. Martin_

We can consider the below snippet:
```js
let u = user;
let n = "name"
let cn = ""
if (n === u.name) {
    cn = n
} else {
    n = u.name;
}
```

The above code can is best understood at the very point it was written. It is likely impossible for the reader to actually know what each variable means,  without looking further beyond this code block. A better version would look like:

```js
let searchName = "name";
let foundName = ""
if (searchName === user.name) {
    foundName = searchName;
} else {
    foundName = user.name;
}
```

Good variable naming is a critical skill that could make a codebase look like a dump yard.

### #3: Make Meaningful Distinctions

You probably have been in a situation where you do not want a variable's value to be overwritten, still, you need the same name while in the same scope. How did you handle that?

Some programmers will call the first occurrence: theUser and the second user, some would do user1 and user2. What I used to do is user and deeper in the code I would do _user, all these are a bad variable naming skill.

Using noise words, numbers and special characters does not help to convey information about a name. Whenever there is a need for a name, you should know that there has been an activity that is a result of a reaction triggered by that section of the code. No two names can look alike if you have followed the first rule _intention revealing._

Noise words are meaningless and create redundancy. A variable should not appear in a variable name, a class should not appear with a class name, `usernameString` is not better than using just `username`, good code structure should not allow types to juggle at will.

>>In the absence of specific conventions, the variable moneyAmount is indistinguishable from money, customerInfo is indistinguishable from customer, accountData is indistinguish-able from account, and theMessage is indistinguishable from message. Distinguish names in such a way that the reader knows what the differences offer. - _Robert C. Martin_


## Conclusion

We have just learned the first three rules that guide good variable naming. We have come to realize `_user` is a bad variable name as well as `theUser`. Initial alphabet of a name is not revealing the intention. Every time you are thinking of a name, you should consider the information you want your future self to know about that name.

In the next post, we will continue picking up more rules as defined by Robert. Write good names, and reveal your intentions, write beautiful codes! 