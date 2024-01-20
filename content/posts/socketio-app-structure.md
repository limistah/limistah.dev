---
title: SocketIO - App structure and architecture
date: 2020-03-15
tags: [JS]
---

## Introduction

SocketIO is a JavaScript library that makes developers' lives easier when dealing with web socket and socket programming. This is the fact that SocketIO has abstracted out all the low-level and tedious steps that are associated with setting up a socket server and client; it has made the question of programmers be "How can I structure my application."

While I have done different types of socket implementations, I will walk us through a setup that has always work for me and has proven to be the best in cases that I have had to use SocketIO.

In this post, we will be implementing a basic SocketIO server, set up a small database for our users, have a client that consumes our application.

It will never be as dull as you think, I promise.

> > I have created a repo for the setup and could be found [here](https://github.com/limistah/socketio-setup).

## Installation & bootstrapping

So, to begin with, I will initialize a new repository for the setup for clarity reasons.

```bash
mkdir socketio-setup
cd ./socket-io-setup
git init
npm init -y
```

In the above code snippet, we are trying to bootstrap our folder structure and codebase. The first line creates a new directory in our local hard drive. We changed the current directory into the newly-created directory. We initialized a new but empty GitHub repo. In the last line, we initialized a new npm project using `npm init -y` and accepting the default config through the `-y` flag.

To further complete our initializations, we will install socketIO, add `.gitignore` to exclude some _noisy_ folders, and add our first commit so far for our new repo, _smiles_.

```bash
npm install -S socketio express
touch .gitignore
echo '/node_modules' > .gitignore
git add .
git commit -am "Initial commit"
```

After completing our project folders' initialization, we should attempt to bootstrap a basic socket server. To accomplish this, we will first create a folder called `src` in the root of the project and make `index.js` the sole file in the folder. Having done that, we can add some code into the `src/index.js` file.

We will first of all create a basic express server and initialize `socketIO` library:

```js
// Copied from https://socket.io/get-started/chat/
var app = require("express")()
var http = require("http").createServer(app)
var io = require("socket.io")(http)

app.get("/", function (req, res) {
  res.send("<h1>Socket IO project folder setup</h1>")
})

io.on("connection", function (socket) {
  console.log("a user connected")
})

http.listen(3000, function () {
  console.log("listening on *:3000")
})
```

And with the above, we have successfully created a basic socketIO server. Hurray!

### Events & Listeners

Events and Listeners are two of the basic concepts that are significantly related to `SocketIO` library.

#### Listeners

With `Listeners` the client(s) could tell the server that something should happen in the server. A basic example of a listener is when a user is connected or disconnected:

```js
// Connection event
io.on("connection", function (socket) {
  console.log("User with socketId %s connected", socket.id)
})

// Disconnection event
io.on("disconnect", function (socket) {
  console.log("User with socketId %s disconnected", socket.id)
})
```

Simply put, a listener is a block of code that a client tells the server to run after the server might have _registered_ the `listener` with a name.

To register a listener, we only have to call the `.on` function on the `io` object. The very many ways to call this function are properly documented on the [socketio's website](https://socket.io/docs/#Sending-and-receiving-events).

---

#### Events

Somethings might happen on the server that it might be so exciting to want to tell a client. When we decide that a client should know of something, we are triggering an event.

```js
socket.emit("hello", "can you hear me?", 1, 2, "abc")
```

We emit on the socket, as that socket needs to know about the event that just happened. Nevertheless, we can emit any socket, sockets or room space, etc., and [emit cheatsheet](https://socket.io/docs/emit-cheatsheet/) exists for this purpose.

## Application folder structure

Having understood the basic concepts of Events and Listeners, it is so glaring that we can have all of the listener and events in just a file say the `src/index.js` file.

Our code could be messed up and look more like this

```js
//...

// Listener 1
io.on("someEventName_1", function (socket) {
  console.log("someEventName_1 with socketId: %s", socket.id)
  socket.emit("someEventName_1", { message: "Success" })
  //...
})

// Listener 2
io.on("someEventName_2", function (socket) {
  console.log("someEventName_2 with socketId: %s", socket.id)
  socket.emit("someEventName_2", { message: "Success" })
  //...
})

// Listener 3
io.on("someEventName_3", function (socket) {
  console.log("someEventName_3 with socketId: %s", socket.id)
  socket.emit("someEventName_3", { message: "Success" })
  //...
})

//...
```

Interesting to note is that some handlers for some listeners can get so large. So, what do we do?

This is what we are trying to solve in this post. Firstly, let's create a folder for our listeners and add an `index.js` file into it.

"`bash
mkdir src/listeners
touch ./src/listeners/index.js

````

The `src/listeners` have distinct modules that export just a function and accept an `io` parameter, the socketIO object. The index file will be responsible for the initialization of these modular events files.

Moving the `connection` event to an event module would in a file located at `src/listeners/connection.js`, look like this:

```js
module.exports = function (io) {
  io.on("connection", function (socket) {
    socket.emit("connected", socket)
  })
}
````

In the above module, we are exporting a function that accepts the `io` parameter. In the listener's body, we are trying to tell the socket that it has connected by emitting a `connected` event. Simple enough!

Moving forward, we can now import this new listener module in the `index.js` at the listener's directory; then, we can write our bootstrapping code for the listener.

```js
// src/listeners/index.JS

module.exports = (io) => {
  const fs = require("fs")
  const path = require("path")

  // Full path to the current directory
  const listenersPath = path.resolve(__dirname)

  // Reads all the files in a directory
  fs.readdir(listenersPath, (err, files) => {
    if (err) {
      process.exit(1)
    }

    files.map((fileName) => {
      if (fileName !== "index.js") {
        console.debug("Initializing listener at: %s", fileName)
        // Requires all the files in the directory that is not a index.js.
        const listener = require(path.resolve(__dirname, fileName))
        // Initialize it with io as the parameter.
        listener(io)
      }
    })
  })
}
```

In the above code, we are only trying to ensure that all files in the `listener` directory are required and run with an `io` object as the parameter. The whole `src/listeners/index.js` is being exported as a function to ensure that we only run the module when we need and that the `io` parameter is being passed down.

With this arrangement, subsequent listeners would only require us to create a file inside the `src/listeners` directory, function as the main export, and accept io as the sole parameter.

Next, we have to import the `src/listeners/index.js` in the `src/index.js` file. To do this, the `src/index.js` file will look like this.

```js
// Requires the listener directory(index.js file)
const initListeners = require("./listeners")
var app = require("express")()
var http = require("http").createServer(app)

var io = require("socket.io")(http)

app.get("/", function (req, res) {
  res.send("<h1>Socket IO project folder setup</h1>")
})

// Calls it with the io object.
initListeners(io)

http.listen(3000, function () {
  console.log("listening on *:3000")
})
```

And so far, we have just bootstrapped event listeners to events that could be emitted from the client.

When we need to add a new event listener, we just have to define it in a file in the `/src/listeners` directory, its full path should be: `src/listeners/someNewEvent.js`, while its basic content would be:

```js
module.exports = function (io) {
  io.on("someEventFromClient", function (socket) {
    socket.emit("responseToSomeEventFromClient", { data: {}, socket })
  })
}
```

That is all about listeners; next is for our events.

We have seen that in the listeners, we were sending some events back to the client. This might suffice for a tiny application; let's consider a scenario:

> > > Suppose when a new event is sent to the server, we need to pull the user information from the database, make some adjustments, and send them a new copy of the user data.

In the scenario above, it is sufficing enough to have all the user manipulation in the listener for the event, but giving the user the updated information is a task that should be done inside of an event emitter, a major reason being that we can reuse this event emitter and also maintain consistent naming across the codebase (both frontend and backend)

Getting our hands cleaned away from COVID-19, firstly, let's define a folder like so `src/events`, and add our index file. The content of the event should look like this:

"`js
// src/events/index.js

module.exports = io => {
const fs = require("fs");
const path = require("path");

const eventsPath = path.resolve(\_\_dirname);

fs.readdir(eventsPath, (err, files) => {
if (err) {
console.error(err);
process.exit(1);
}

    files.map(fileName => {
      if (fileName !== "index.js") {
        module.exports[fileName] = require(path.resolve(__dirname, fileName));
      }
    });

});
};

````

The code above is similar to what we defined in `src/listeners/index.js`, the difference in this case is that we are exporting all the files in the `src/events` folder aside the `index.js` file. Awesome!

Next, let's define our _connected_ event, which will emit the client once the socket has been connected. So, we will create a new file `src/events/connected.js` and have it look like this

```js
const event = (socket) => {
  // Do some interesting thing inside of this place!

  socket.emit("socker", {socket, /* Some other interesting data, maybe*/})
}

module.exports = event
````

Simple! We have bootstrapped our event files with separation of concerns being considered.

The next question, how do we consume events in our listeners with this structure. For this case, let's make a modification to `src/listeners/connected.js` to be:

```js
const { connectedEvent } = require("../events")

module.exports = function (io) {
  io.on("connection", function (socket) {
    connectedEvent(socket)
  })
}
```

First, we import the `connectedEvent` from the events module, and in line 5, we move changed calling emit to calling the imported event module.

Awesome, right?

Next, we can focus on building our application around this ultra-simple architecture and still maintaining it in the future.

---

## Conclusion

In this post, we have been able to bootstrap a socketIO application, ensure that we have separation of concerns all through.

We could add more improvement by ensuring that the names of the events come from a single file. This can assist us in having consistency and reducing the effort when it is time for documentation.

Sometimes, we will focus a post on ensuring that we persist the socket object after it has been initialized.

Keep hacking, wash your hands regularly, stay safe, stay at home!
