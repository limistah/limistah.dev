---
title: CSS counters
date: 2021-06-07
tags: [css, counters, generated-content]
category: CSS
excerpt: Understand and use css counters effectively!
---

CSS can keep count of numbers without writing any additional JavaScript.

It does this by taking note the amount of time a CSS block affects a page then incrementing the counter for that block if the `counter-increment` rule is implemented.

For example:

```css
input:invalid {
  counter-increment: invalid-count;
}
```

With no JavaScript at all, CSS understands that whenever there is an invalid element, it should increment the count for the `invalid-count` identifier.

## Structure of CSS counters

CSS counter is a CSS rule that specify the `increment-counter` property and an indentifier for the counter to increment.

To know how many `HTML` exists in a page:

```css
h1 {
  increment-counter: total-h1-counter;
}
```

Since CSS would match every `h1` on the page, the `increment-counter` would be executed, thereby increasing the count for the `total-h1-counter`.

### Getting back to `0`

A counter can go back to the `0` state by declaring the `counter-reset: counter-identifier` `CSS` rule

A use case here would be always reseting the number of `total-h1-counter` on the page when the body of the document is matched, but incrementing when H1s are matched.

The CSS below helps to achieve that:

```css
body {
  counter-reset: total-h1-counter;
}

h1 {
  counter-increment: total-h1-counter;
}
```

### Rendering counter on a page.

We can use [CSS Generated Content](/blog/css-generated-content) to make the value of a counter visible on the page. We can achieve this using pseudo elements(`::before`, `::after`) through the content property.

```html
<h1>The first</h1>
<h1>The Second</h1>
<h1>The third</h1>
<h1>The fourhtb</h1>

<section>There are</section/>
```

```css
body {
  counter-reset: total-h1-counter;
}
h1 {
  counter-increment: total-h1-counter;
}
section:after {
  content: " " counter(total-h1-counter) " H1 tags on the page";
  font-weight: bold;
  color: tomato;
}
```

Salut!
