---
title: AdonisJS - Route Model Binding 
date: 2020-01-12
tags: ["AdonisJS"]
---

[AdonisJS](https://adonisjs.com/) was built for the NodeJS Artisans taking after the concepts of [Laravel - The PHP framework for Artisans](https://laravel.com). AdonisJS did a great job porting these concepts into JavaScript, it maintains the namespace even though JavaScript does not support that, it using its own fast, easy and extendable view engine and many more, but some features of Laravel are not shipped with AdonisJS by default.

The [IoC container in Laravel](https://laravel.com/docs/4.2/ioc) auto injects classes by inspection when a recognized namespace is [_Type Hinted_](https://www.php.net/manual/en/language.oop5.typehinting.php). This makes route model binding easier with Laravel. In JavaScript, there is little that can be done to achieve this, so, there is a need for a custom approach to this.

While I believe you have installed AdonisJS and have [created an application](https://adonisjs.com/docs/4.1/installation) with the `adonis` command, we will begin by creating a resource route:

```js
Route.resource(
  "users",
  "UserController"
).only("update");
```

Next we can make a controller for the `User` from the terminal using:

```
adonis make:controller UserController --resource
```

The above command will create a file `/app/Controllers/UserController.js` with predefined methods for a cruddy endpoint. Awesome!

And in the generated controller, lets return the id as JSON

```
// /app/Controllers/UserController.js

update ({request, response}) {
  return response.json({userId: request.id});
}
```

Now, when we call `PUT /users/1`, it should return this:
```json
{
  "userId": 1
}
```
Interesting...

Traditionally, we would have to lookup the `id` against the `User` Model, but, we would be doing this everytime for every route and that's absurd.

How sweet could it be to have a middleware that does that by default, such that we can just call the middleware like so:

```js
Route.resource("users", "UserController")
  .only("update")
  .middleware(new Map([[["update", "boundRouteModel:App/Model/User,user"]]]));
```

Awesome right?

Let's do this:

Firstly, let's make a new middleware: 

```
adonis make:middleware BoundRouteModel --resource
```
And register it in the `/start/kernel.js`, and add the declaration to the nameMiddleware looks this:

```js
// /start/kernel.js

// ......
const  namedMiddleware: {
  //...
  "boundRouteModel": "App/Middleware/BoundRouteModelMiddleware"
}
// ......
```

Awesome!

Next in the `/app/Middleware/BoundRouteModelMiddleware.js`, replace the `handle` function with this piece of code.
```js
  async handle({ request }, next, [model, identifier, lookupField = "id"]) {

    if (typeof model === "string") {
      // Use model directly if a string
      model = use(model);
    } else if (Array.isArray(model)) {
      // Maps through if an array
      model = model.map(async _model => {
        // Model is a string, use directly
        if (typeof _model === "string") {
          return use(_model);
        } else if (
          _model.findByOrFail &&
          typeof _model.findByOrFail === "function"
        ) {
          // Model already contains an already imported model
          return _model;
        }
        // _model is not recognized by this code as usable or callable for its usage
        return null;
      });
    } else if (model && !model.$booted) {
      // model is defined from the middleware arguments but not actually a Model
      await next();
    }

    if (model && typeof model !== "string") {
      const params = request.params;
      Object.keys(params).map(async (paramKey, index) => {
        let modelForParam = model;
        // Get the model at the index if the model is an array
        if (Array.isArray(model)) {
          modelForParam = model[index];
        }
        if (modelForParam && modelForParam.$booted) {
          const paramValue = params[paramKey];
          request[identifier] = await modelForParam.findByOrFail(
            lookupField, // The field to use for the lookup
            paramValue // Value passed from the request
          );
        }
      });
    }

    // call next to advance the request
    await next();
  }
```

The code above is doing pretty lot of things.
- First it assumes that the model passed to the middleware is a string.
- Then it attemps to import it from the IoC container, but if the model is an array, it loops through the array checking if the element is a string and tries to import it, or use it directly if it is an alreay imported Model.

- But if the model is defined and is not recognized as a Model or an Array, the middleware is passed on to the next.

- Finally, the actual look up starts by checking if the model is not a string, picks up every item from the request parameter and assign a model at the index of the request parameter to it if model is an array, else if the model is a Model, it just looks it up and stores the result in the request using the specified identifier in the middleware initialization.

Yes, that is all to it.

When next you want to use route model binding, you just use the middleware.

## Conclusion
It might feel like a heck of a task, but to me it is worth it. There is a [library](https://www.npmjs.com/package/adonis-route-model-binding) for this purpose and it uses the provider technique, you might want to check it out if you don't like this approach.

Thanks for reading. 🙇🙇🙇