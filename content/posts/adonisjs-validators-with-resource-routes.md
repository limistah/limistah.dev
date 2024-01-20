---
title: AdonisJS - Using Validators with resource routes 
date: 2020-01-10
tags: ["AdonisJS"]
---


First, install the Validator using the `adonis` command:

```bash
adonis install @adonisjs/validtor
```

Create a resource route
```bash
adonis make:controller PostController --resource
```

Define the route in `start/route.js`
```js
//..
Route.resource("posts", "PostController")
//..
```

Now, we can make a `Validator` for `/posts/store`

```
adonis make:validator StorePost
```

This will create a validator in `/app/Validators`.

Finally, To define a validator for a specific route in the definition, do something like this:

```js
//..
Route.resource("posts", "PostController").validator([[["store", "StoreUser"]]])
//..
```

PSSS: I want this as short as it can while still answering question regarding the final code. 🥂
