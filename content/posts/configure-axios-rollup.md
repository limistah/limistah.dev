---
title: Configure Rollup to bundle Axios module
date: 2021-05-25
tags: [rollup, axios, bundlers]
description: Make axios work with rollup
---

1. `npm install rollup-plugin-node-resolve rollup-plugin-json`.

2. Add it to the plugins inside `rollup.config.js`

```js
// Rollup configuration
...
plugins: [
    rollupNodeResolve({
      jsnext: true,
      preferBuiltins: true,
      browser: true
    }),
    rollupJson(),
    ...
]
```

** Notice the `browser: true` **

3. Run your build again: `yarn run build`

_Voila!_

[Source](https://github.com/axios/axios/issues/1259)
