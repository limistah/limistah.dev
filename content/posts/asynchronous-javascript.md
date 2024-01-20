---
title: Asynchronous Javascript
date: 2020-03-03
tags: [JS]
---

In computation systems, names like concurrent, sequential, parallel, serial, synchronous, asynchronous, non-blocking, shared state, message passing, and likes, stand as a forbearer for the actual task that happens in a system.

While all of the above techniques have their use cases, in the world of JavaScript, asynchronous and synchronous programming never leave the tongues of its programmers.

In his [**Concurrency glossary**](https://slikts.github.io/concurrency-glossary/?id=asynchronous-vs-synchronous-non-blocking-concurrent-vs-blocking-sequential), **slikts (dabas@untu.ms)** wrote about asynchronous, he said:

> Asynchrony means "not happening at the same time", and asynchronous message passing is a communication model that does not require the sending and receiving to be synchronized, meaning that the sender isn't blocked until the receiver is ready.

It might not be clear; still, we will go into a later detail about this with a real-life example. _Don't tell anyone, life is mostly asynchronous_.

While languages like Java, C#, C++, etc. run their computation on their main thread and could _spawn_ out a new thread to run another set of instructions which are in parallel to the main thread and could also communicate with it. JavaScript, in its uniqueness, does not support that model of computation.

In JavaScript, all computations and instructions run in a [sequence](https://slikts.github.io/concurrency-glossary/?id=concurrent-order-independent-vs-sequential) (i.e., one after another) in a single thread. This means that for instructions ranging from A, B, C, D, E to be executed, A would be executed first and when done, B is then executed, then C, then D, then E, which sees the program to its end.

![https://www.youtube.com/watch?v=2ZH_1d8TYVg](/assets/maxresdefault.jpg)

Still, with the single-threaded nature of JavaScript, there is a unique feature that makes it outstanding, it is its **non-blocking I/O** model.

_I/O(Input/Output)_ could be in any form, like fetching of data over the internet, getting a file from the filesystem and likes, all of these processes does not block the main thread from continuing its execution.

### A real life case study

---

> In high school, when students are given an assignment, they are required to submit it. Once they submit the task to the teacher, they are expected to wait until their books are returned back to them already marked/graded.

> While they had submitted the assignments and are waiting for the results, they could do other things like reading, attend classes, play games, and joke with friends.

> Once the teacher is done marking, the students are notified, then they would go to the teacher to pick them up, completing the process.

---

In this scenario, the students have done a task asynchronously. While the teacher could only do one thing at a time, they have asked the teacher to teach them and still mark their assignments.

The teacher could not complete both of them at the same time, so they would have to wait, but, set a trigger (through the class rep/governor) that made them know that the assignments are ready and the results are out.

The notification could help the students to determine what next to do. Maybe, to proceed with putting their books into their bags or doing the corrections or learning from other classmates. (**whatever is next**)

That is what happens in asynchronous programming.

### Asynchrony in JavaScript

JavaScript as a language comes with support for asynchronous programming; there have been different ways to come up with this. Most common is the callbacks, which could be seen in many legacy code bases.

In the modern JavaScript engine, there is an added support for writing asynchronous code. We would be exploring these options and their demerits, and I would conclude with why I think that Async/Await as a feature of the language is too essential to understand. Let's hit the start knob.

### Callbacks

For seasoned developers, this might seem like unveiling a nightmare following their experiences with _callback hell_. But, a callback is not that bad.

A callback is a function passed during a function call/invocation to be executed when the called function determines. A basic example is what `setTimeout`, `setInterval` do. Once any of them get called, it takes the function and executes it at the specified time passed from their second argument.

```js
setTimeout(() => console.log("This is a callback 1 sec. setTimeout test"), 1000)
setInterval(
  () => console.log("This is a callback 1 sec. setInterval test"),
  1000
)
```

The two function calls above receive a callback as their first argument and execute it once they each reach the time (1sec) in their second argument. They will never obstruct the main thread from continuing executing other functions; instead, an entry is made in the call stack to take care of this.

Another great example is in the DOM Events API. A basic `onclick` event could be listened to like this:

```js
const button = document.getElementById("#submitButton")
button.addEventListener("click", () => {
  console.log("Submit Button Clicked")
})
```

Once the button is clicked, with the single thread nature of JavaScript, one would expect that the above code should work like this:

- Store the DOM reference of `submitButton` to the `button` variable.
- `button.addEventListener` is called which puts in an entry into the call stack
- The event is registered against a `click` name, and the code for the `addEventListener` is executed.
- Once it is executed, the function/handler should be triggered immediately in the `addEventListener` execution context

As stated in the above, we expect all of those to happen in parallel. But, what happens there is that code and functions are delegated to a later time when an actual action has happened. Recall the [High School Assignment](a-real-life-case-study) illustration we gave?

What happens is that:

> Once the `click` event has been triggered on the button, the function would be executed. And this could happen any time in the future, but other code could still run while waiting for this.

#### Good Ol'days of AJAX

With the myriads of NPM libraries that make this happen in a few lines of JS code. Also, the inclusion of the _fetch_ API to the modern JavaScript engines has made this to be so uncommon to the modern developers what AJAX means right in the browser, as they take away the underlying fact about AJAX web requests.

Before the days of EcmaScript 6, while developers still really disliked working with JavaScript (_which is unavoidable for web developers, though_ 😄), web requests could be made over the internet through an XMLHTTPRequest object. The technique for making this request was later formed to be called **Asynchronous JavaScript and XML**, popularly known as **AJAX**.

What AJAX means is that we could request the internet, wait for the result to come while still having other things going on in the browser (basically, a loading icon). This is asynchronous in nature, and the main reason why it is called `AJAX`.

AJAX uses the callback model, a basic _vanilla_ AJAX request using the XMLHTTPRequest object looks like this:

```js
// Picked from https://www.w3schools.com/xml/xml_http.asp
var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    document.getElementById("demo").innerHTML = xhttp.responseText
  }
}
xhttp.open("GET", "filename", true)
xhttp.send()
```

_It is not attractive, I know. If you are a modern JavaScript developer, respect those that have passed through this and still look uncool to you, this was so cool to them back then._

This AJAX feature utilized the model of event handling and was very easy to comprehend by JavaScript developers. But, it shares a similar problem with all callback-based coding patterns/techniques.

#### Callback Hell

Does it mean hell in our code/machines, well, not necessarily? It is something exciting to know some of its details.

![Callback hell](/assets/callbackhell.png)

> > [Image source](https://lh3.googleusercontent.com/proxy/DOxEQlABD3FPPagO7xG_D-3Go3PPOjqbhsUljaM7bpZwmRs9Ep3flHBoCK8c2p_yU_Nilh5Dh8l3M-Ct75Jfhb7lnCvYgPqtj1Tekw)

Let's tell of a story of a codebase that illustrates this.

First let's define a function that takes a callback. It would add two numbers together, then pass the result to a function defined as the third argument, clear enough? I believe!

```js
const sumTwoNumbers = (a, b, doneCB) => doneCB(a + b)
```

Next, let's determine an Array of numbers but try

```js
const numbers = Array(1, 2, 3, 4, 5)
```

Now, we can add up the numbers successively using `Array.prototype.forEach`:

```js
const totalAdditions = 0
numbers.forEach((number, index) => {
  sumTwoNumbers(number, numbers[index + 1], (total) => {
    totalAdditions += total
  })
})
```

As seen above, we are just two levels deep into the callback calls, and it is not getting any interesting. It should be noted that as the callback levels increase, the risk of hitting a re-initialization of variables increases. The first callback might have initialized `numbers` re-initializing it might disrupt the logic of the code, who knows?

And looking at an example from the below image, we can see that it can get so uninteresting in larger applications.

## Promises to the rescue

> > [**Eric Elliott**](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261):
> > A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred).

In JavaScript, Promises have made the life of programmers more easier in handling asynchronous code. With Promises, most of the underlying problems like callback hells are waved out.

Promises has a very interesting background in JavaScript, [Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261) gave has a great information about promises, regarding that, a promise could be constructed in a few lines of code:

```js
let promise = new Promise(function (resolve, reject) {
  // executor
})
```

In constructing a promise, we call the Promise constructor with a function called the _executor_. This function(executor) receives two arguments labeled as `resolve` and `reject`, both of which are functions.

The `resolve` argument is expected to be called with a value `resolve(value)` only when the executor has finished doing its tasks without any error. While the `reject` is expected to be called with a value (usually of type Error) `reject(error)` only if the promise failed or faced an error.

```js
let promise = new Promise(function (resolve, reject) {
  try {
    const value = 2 * 2
    resolve(value)
  } catch (e) {
    reject(e)
  }
})
```

There are three (3) notable methods for every Promise object.

- `.then()` Accepts a function that receives the value passed when `resolve` is called by the executor. Only get called when the executor calls `resolve`.
- `.catch()` Accepts a function that receives the value passed when `reject` is called by the executor. Only get called when the executor calls `reject`.
- `.finaly()`

The object returned by every initialization of a Promise constructor has some special attributes and methods. One of this is the _status_ `promise.status` property, which tells about the current state of the Promise.

The _status_ properties has three (3) possible values:

- Pending: This is a state before `resolve()` is called.
- Resolved: This is a state after `resolve()` has been called.
- Rejected: This is a state after `reject()` has been called, or an error is thrown in the executing function.

Promise are chainable, hence, every `.then()` called on a promise object returns another promise.

```javascript
const promise = new Promise(function (resolve, reject) {
  try {
    const value = 2 * 2
    resolve(value)
  } catch (e) {
    reject(e)
  }
})

// Consuming the promise

promise
  .then((value) => value * 4)
  .then((value) => value * 6)
  .then((value) => console.log(value))
```

While consuming the promise, every resolver in the `.then()` function returns a value until the last call to `.then()`. Failure to do this as we have done in the last call of `.then()` would make the next call to `.then()` receive an `undefined`.

```js
// Consuming the promise

promise
  .then((value) => value * 4)
  .then((value) => value * 6)
  .then((value) => console.log(value))
  .then((value) => console.log(value) /* -> undefined */)
```

We can use the finally in many different ways since it is called irrespective of the state of the Promise. The most obvious case of using it is when we need to hide a loading icon to show a message for the result of the action that has just been carried out.

```javascript
promise
  .finally(() => {
    document.querySelector(".loading-icon").remove()
  })
  .then((data) => {
    // consume data
  })
  .catch((err) => {
    // Show error
  })
```

There is more to Promises, this only gives a preamble and brief introduction to it, a thorough explanation could be found [here](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)

### Async / Await

It is not surprising to note that, for some unknown reasons that are best known to developers, they want Promises to be synchronous.

They found themselves in a situation where they need the result of a Promise to be available before they proceed to the next chunk of code - Either it is a network request, or a result from an extensive math function, they just needed the result to be available right in the next line of their code.

To solve this for them, the folks at [TC39](https://tc39.es/) gave us [Async/Await](https://github.com/tc39/ecmascript-asyncawait).

This feature assists in constructing a promise right from a function, and we could wait for the result of a Promise before moving to the next line of code.

```js
const getNumber = () => {
  return async () => {
    return 20
  }
}

const result = await getNumber()
```

Looking closely at the code above, we could see that the `getNumber` function returns an async function(a Promise), but why not make the returned function the primary function for `getNumber`?

No, we can not. JavaScript does not support making a global function an `async` function; the best we can do is wrap it in a containing function and make the inner function returns an `async` function. If we need a global function to be a Promise, it is best that we use a Promise constructor to define it.

When we called `const result = await getNumber()`, we are telling the engine not to run any other code until we have the result from the Promise returned by `getNumber`, in this case, 20. If we omit `await` from that expression, following code will run while running the Promise returned by `getNumber` in the background.

In my honest opinion, I see `async` as syntactic sugar to constructing a Promise on the fly. If we would want to attempt to have the getNumber as a promise constructor instead of an `async/await` we would have:

```js
const getNumber = new Promise(function (resolve, reject) {
  try {
    setTimeout(() => resolve(20), 60 * 1000)
  } catch (e) {
    reject(e)
  }
})
```

In the above code, we have waited for about 1minute for the promise to be resolved if at all no error is thrown in our executor.

Do you want to learn more about Async/Await and be a Ninja of asynchronous javascript? Try seeing the [MDN guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) on the topic.

## Conclusion

As seen above, we can deduce that the underlying engine of JavaScript supports asynchronous coding. At the same time, this is great; it created some problems for developers trying to make their code asynchronous.

As a solution to the challenge, Promise was introduced into the language, which was followed by the inclusion of Async/Await construct.

In my honest opinion, writing Async/Await in my codebases has made my code not just readable, but very predictable.

So, to asynchronous Javascript coding, I highly recommend understanding Promises and Async/Await construct if at all we want our _future self_ and _other developers_ to say a prayer when they see our code after we write it.

_Shalom!_
