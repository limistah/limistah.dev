---
title: ReactJS - Unexpected closing tag
date: 2020-01-25
tags: [ReactJS]
---

Beginners in ReactJS often face this kind of error:
![React JS error](/assets/reactjs-tag-error.png)


It is not just with inputs, it is with all HTML elements that does not expect a closing tags, they are called empty elements. A list of these tags could be found [here](http://xahlee.info/js/html5_non-closing_tag.html).

To solve this very easily, we just have to follow the HTML semantics by ending all empty elements with `/>` instead of `>`

So inputs should look like this:
```jsx
<input type="text" />
```
For image
```jsx
<img href="text" alt="profile avatar" />
```

Just note that:

> In HTML the ending slash in optional, in ReactJS applications, it is required

And likes....

I hope this saves someone some nagging and head nuts.