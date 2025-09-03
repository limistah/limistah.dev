---
title: Imparative and Declarative coding?
date: 2024-01-20
tags: [programming, coding ]
category: Programming
summary: Choose to be clearity over ambiguity
---

As a software engineer, I have written a lot of lines of code, and taking hindsight back to the very first day of my career, I have written a log of bad code. I recently published a new version of my [react-here-maps](https://www.npmjs.com/package/react-here-map) library which saw a sprinkle of my [improved skill set](https://github.com/limistah/react-here-map).

I had a coding interview where I was tasked to add functionality to support extra data points of the original response and think about adding weeks, months, and years to data that only returned days. The implementation worked but it wasn't what was expected.

I used a while loop to go through the days which is an object.

```ts

type SalesPerDay = { [day: string]: number }

const totalPerDay: SalesPerDay = {}

```

I thought, since I already have the days, I could group the days by month/year and sum their values. My implementation looks somewhat like this:

```ts

const modTotalAmtMap = {};

const amountMap = Object.assign({}, totalPricePerDay);

while (Object.keys(amountMap).length > 0) {
  let sortedKeys = Object.keys(amountMap)
    .map((t) => new Date(new Date(t).toISOString()).getTime())
    .sort()
    .map((d) => new Date(d).toISOString());

  const start = moment(new Date(sortedKeys[0])).startOf(unit);
  const end = moment(start).endOf(unit);

  const totalTrxnInBtw = sortedKeys
    .filter((k) => {
      return moment(new Date(k)).isBetween(start, end);
    })
    .map((k) => {
      const val = Number(amountMap[k]);
      delete amountMap[k];
      return val;
    })
    .reduce((acc, amt) => acc + amt, 0);
  modTotalAmtMap[start.toISOString()] = totalTrxnInBtw;
}
```

Notice how I have created an array out of the original `totalPricePerDay` and stored it inside of `amountMap` then sorting the date to get the date ordered earliest first, and moment to determine how many of the items to pick then summing up the values.

Ah! That is too much explaining for such a very simple task.

Don't be like me, I learned this the hard way. :smirk:

What you have just seen is **imperative coding**.

### Imperative Coding

In the world of Kubernetes, you are all about creating objects. There are two ways about it, either you type them as a command or apply them as a manifest file.

To create a namespace on Kubernetes you can either run

```bash
kubectl create ns [NAME]
```
OR

Create a Kubernetes manifest file called `ns.yaml` then apply it
```yaml
apiVersion: api/v1
kind: Namespace
metadata:
  name: NAME
```

Which you can then apply with

```bash
kubectl apply -f ns.yaml
```

But, there is a big advantage to the manifest file, I can share it with anyone and they only have to type as much code as I would to get the same result, but using the create command, a lot of things can go wrong – incomplete arguments, typos and whatever.

Using the create command is called the *imperative* way of creating objects in K8s, while with the manifest that is *declarative* style.

### Declarative thinking
Thinking declaratively in coding would mean using the interfaces provided by the framework/language/platform you are on to solve the task at hand.

In the Kubernetes example, to use the command means, I have to string them up in the order I see fit whereas, there is a standard structure that I could use to achieve similar results.

In the problem I was solving, I needed to use a while loop to go through the list, I could use a map, forEach and other constructs, I need not use a moment, there is a possibility that what a moment would do, the native Date object would have done it. Above all, I need not come up with my unique solution, all I needed was to take a second look at the code and check the APIs to understand what is attainable before venturing out to seek other libraries.

But imperative coding doesn't mean you need not bring in libraries, check out this library `ts-patterns` it attempts to remove conditionals from our code base with understandable APIs. I for one now find conditionals hard to understand – as I told a colleague, your logic should not always require much brain power to process.

So, this would have been an improvement:
```ts
// Adjust the date based on the frame
if (filter === 'monthly') {
    date = new Date(sales.date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric' });
} else if (filter === 'yearly') {
    date = new Date(sales.date).toLocaleDateString('en-US', { year: 'numeric' });
} else {
  date = new Date(sales.date).toLocaleDateString('en-US');
}
```
So clean and expressive, right? 

That is the power of declarative coding. You don't need to explain it *that much* almost everyone gets it!


Salut!

