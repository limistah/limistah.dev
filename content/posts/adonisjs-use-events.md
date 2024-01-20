---
title: AdonisJS - Event
date: 2020-01-19
tags: ["AdonisJS"]
---

Modern application development requires that some actions are carried out when a point of the application is reached.

Tasks like confirmation email, invoice generation, logging and profiling are few of things that requires to be carried out in specific regions of application flow.

These actions that are triggered are called Events. Events in modern application development make code execution after a web request to the server has been completed to be possible.

In this post, I will demonstrate how to implement events in AdonisJS.

Firstly, from the terminal, in an AdonisJS application directory, execute this command:

```bash
adonis make: listener NewUser
```

This should show an output similar to:
```bash
✔ create  app/Listeners/NewUser.js
```
Indicating that a file has been created at `app/Listeners/NewUser.js`. Right!

Next, we need to define what happens when this event is called. We would go into the newly generated file and write some code into it. In my case, I would just log he details of the new user.

```js
'use strict'

const NewUser = exports = module.exports = {}

NewUser.registered = async (user) => {
  console.log(user)
}
```
At this point, we need to move forward to tell AdonisJS about our listener. We can do this by going to `start/events.js`, sometimes the file does not exist, you are free to create yourself.

Inside of `start/events.js` I have:

```js
const Event = use("Event");

Event.on("NewUser::registered", "NewUser.registered");
```
The above code loads the Event from the IoC, then I called the `.on` method to register an event named `NewUser::registered`, then determines the listener and method to call when the event is invoked. In this case, I want `NewUser.registered` to be executed when this event is triggered.

Awesome!!!

And we are done with setting up an event in AdonisJS. But we have not called this event or see it in action. How can we do that.

From anywhere in your application call:

```js

const Event = use("Event");

Event.fire(
  "NewUser::registered",
  user
);
```

With the above code, I pulled Event from IoC, then call `.fire` on it with the name of the event that I want to execute as the first parameter and the parameters that the event handler(s) would receive are the arguments listed after the event name, in this case, only `user` is sent to `NewUser.registered`

And that is it.

Events in an AdonisJS application.

This tiny feature is too useful, don't render it useless.

Shalom! ☮️