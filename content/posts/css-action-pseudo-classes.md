---
title: CSS action pseudo classes
date: 2021-06-13
tags: [css, actions, dynamic]
category: CSS
excerpt: Handle some user events without JavaScript
---

Without JavaScript, dynamic UI is possible with **just** CSS action class selectors.

### Case study

> _Help text for input element which is only visible when the input is focused._

## The HTML

```html
<div class="input-cont">
  <input type="text" placeholder="Focus me" autofocus />
  <span class="help" data-help="Enter your email"></span>
</div>
```

To achieve the above, a `span` holding the help text in a `data-help` attribute as a sibling to the actual input. Both the input and the span are children to a parent div with class name `input-cont`.

## The interaction(CSS)

The container would help to proper place the content, so a position relative is applied. Since multiple inputs can exist on a page, a margin-bottom is added to give a visual cue and separation.

```css
.input-cont {
  position: relative;
  margin-bottom: 1rem;
}

input {
  z-index: -1;
}
```

### The Structure

Instead of additional element to hold the text, the ::before pseudo element is already available for container elements.

`<input />` elements are not container which makes it difficult for this purpose, a span is placed next to the input element to provide the flexibility that ::before, ::after pseudo elements provide.

The `+`(direct sibling) selector can achieve selecting an element that lives under the same parent as the base selector. Since the input and the span.help lives under the same parent, so `input+.help` gets the `span.help` element, and the `::before` gives access to its pseudo selector.

To ensure that the `::before` pseudo element stay behind the input field, the `z-index: -2` is applied to it, also, the content `property` is not set at the initial state of the element, making the element hidden by default.

```css
input + .help::before {
  bottom: 50%;
  left: 0;
  width: 100%;
  font-size: 0px;
  color: #707070;
  opacity: 0;
  position: absolute;
  filter: blur(5px);
  z-index: -2;
}
```

### Toggling the help text

To show the help text when an element is hidden, the `:focus` psuedo selector is used to select an input that is focused, then the sibling selecor gives access to the `span.help` element, which makes the `span.help::before` pseudo element stylable.

Here, the content is set by picking it from the `data-help` attribute on the span.help element, a final `z-index: 0` is applied to bring the `span.help::before` element on top of the input field, while the `bottom: 60%` pushes the element downward below the input field to avoid overlapping.

```css
input:focus + .help::before {
  content: attr(data-help);
  opacity: 1;
  filter: blur(0);
  bottom: -60%;
  z-index: 0;
  font-size: 12px;
}
```

Find the above code on [codepen.io](https://codepen.io/ihaleem/pen/NWpOzZB)

And this is just a basic toggling and hiding of elements using :focus.

Many interesting things can be built with CSS user action selectors.

There are other action selectors are:

- :active
- :focus
- :focus-within
- :focus-visible
- :hover

Salut!
