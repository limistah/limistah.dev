---
title: Structural CSS Selectors
date: 2021-06-05
tags: [css, css-selectors, html]
category: CSS
---

Yeah, you read that right. Let go straight into it!

## A Test Case

Can you interprete this CSS selector query?

```css
p.title:first-of-type {
  color: red;
}
```

Let me think like you would:

> Select every `P` element that has the class name of title and apply the color red to the first of its type.

```html
<body>
  <p>Lorem Ipsum</p>
  <p class="title">Paragraph 2 (shows in red color)</p>
</body>
```

You think you’re right.

### Another test case

What happens with the below:

```html
<style>
  p.paragraph-1:first-child {
    color: green;
  }
</style>
<div>
  <p class="paragraph-1">
    <span class="span1">This is the title</span>
    <span class="span2"> Shouldn't be the title </span>
  </p>
</div>
```

You would expect the `SPAN` with the class name `span1` should have the color green.

To you, the query reads:

> _Select the first child of every `P` tag that has a class name of `paragraph-1`,_

Well,that is not correct!

The query correctly reads:

> Select every P tag with a class name of `paragraph-1` and IT IS THE FIRST CHILD of its parent.

## Know the Strcuture

To better understand Structural selectors in CSS, we have to consider the query first and then attach the selector's semantic meaning.

`:only-child` should read as **AND IS THE ONLY CHILD**, but not seeing it as going deeper to the actual element's children.

Structural selectors always refer to the position of an element itself in a document.

```html
<p>
    <h1>1</h1>
    <h1>2</h1>
</p>
```

For the structure above, `h1:first-child` would pick the first `h1`, `h1:last-child` would select the second `h1`.

The beauty of structural selectors is that page structures are stylable regardless of their complexity.

For example, the only child of an element, empty elements, any element that is a child to an element but existing at an index, and more are stylable, which is powerful!

## Ref List

Reference the list below to understand structural selectors proper:

- `<selector>:first-child` - Will match any element that is the first child
- `<selector>:last-child` - will match any element that is the last child
- `<selector>:only-child` - will match any element that is the only child of its element
- `<selector>:nth-child(n)` - will match any element that is a child of a parent element but occurring at the index of n for that selector
- `<selector>:nth-last-child(n)` - will match any element that is a child element occurring at the index of n for that selector. Take it as `nth-child moving in reverse mode.
- `<selector>:empty` - will match any element that is empty or has just comments
- `<selector>:first-of-type` - will match any element, and it is the first occurrence for that selector
- `<selector>:last-of-type` - will match any element that is the last occurrence for that selector
- `<selector>:nth-of-type(n)` - will match any element occurring at index of n for that selector
- `<selector>:nth-last-of-type(n)` - will match the last element for every element occurring at the index of n for that selector. Take it as `nth-type` moving in reverse mode.
- `<selector>:only-of-type` - will match the only element that has for that selector.

Interesting right? Play with it [here](https://codepen.io/ihaleem/pen/BaWxRwE).

Take home: Structural selectors apply themselves to the selected element to help us style an element existing at a specific position in the HTML.

[au revoir!](https://translate.google.com/?sl=auto&tl=en&text=au%20revoir&op=translate)
