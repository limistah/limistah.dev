---
title: Smart React Class function scope binding
date: 2019-05-15
tags: []
---

Passing down functions as event handlers down to children components is a norm in the react world. It eases the communication flow, as the saying goes _props down, functions up_.

Things get a little bit tricky when using a React Classical component. Functions have to maintain their scope for proper interaction with their declared class properties. You might not be lucky sometimes, so there has been a couple of workaround for this.

## Bind that function!

Yes, this is what happens. You bind function passing the scope of the class they have been declared in.

I am considering a simple `ButtonClickCounter` component:

```javascript
import React, { Component } from "react";

class ButtonClickCounter extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    clickedCount: 0
  };
  handleButtonClick() {
    const clickedCount = this.state.clickedCount;
    console.log("This Button Has Been Clicked: %s times", clickedCount);
    this.setState({ clickedCount: clickedCount++ });
  }
  render() {
    return (
      <div>
        <span>Button clicked <em>{this.state.clickedCount}</em> times</span>
        <button onClick={this.handleButtonClick}>Button</button>
      </div>
    );
  }
}
```

If you try to run this code, things will work fine till you try hitting the Button. You will get a `Reference Error`, what did we do wrong?

It happens that the function will be triggered in another scope where I do not know - that is for React to determine. But, I need to communicate with our local state, so, **I should bind that function**!

## Binding on the component

Easily I could bind the `ButtonClickCounter`'s scope to the `handleButtonClick` handler by calling `.bind` while passing it.

The above code would provide a lasting solution to my scope problem, easy!

#### BUT!!!

What if I have some other button that uses the same function as an event handler? I would have to do `.bind(this)` on all the references?

```
const render = () => {
  return (
    <div>
      <span>
        Button clicked <em>{this.state.clickedCount}</em> times
      </span>
      <button 
        onClick={this.handleButtonClick.bind(this)}
      >Button</button>
      <button 
        onClick={this.handleButtonClick.bind(this)}
      >Button</button>
      <button 
        onClick={this.handleButtonClick.bind(this)}
      >Button</button>
    </div>
  );
};
```

That is not supposed to be, let us step up a bit!

## Binding in the constructor

Generally, what you will find around is binding a function in the constructor, this helps to reduce the redundancy allowed by binding on the component.

```
constructor(props) {
  super(props);
  this.handleButtonClick.bind(this);
}
```

So, the component after proper binding would look like this:

```
import React, { Component } from "react";

class ButtonClickCounter extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick.bind(this);
  }
  state = {
    clickedCount: 0
  };
  handleButtonClick() {
    const clickedCount = this.state.clickedCount;
    console.log("This Button Has Been Clicked: %s times", clickedCount);
    this.setState({ clickedCount: clickedCount++ });
  }
  render() {
    return (
      <div>
        <span>
          Button clicked <em>{this.state.clickedCount}</em> times
        </span>
        <button onClick={this.handleButtonClick}>Button</button>
      </div>
    );
  }
}
```

Can't we get a little bit fancier without binding at all?

#### Of Course...

## Arrow function to the rescue

I love arrow functions, since its introduction through ES6 and Babel, I have seen hundreds of it, and they look so beautiful!

The beauty that arrow functions have to offer is that they maintain the scope of where they are declared, unlike the traditional functions that maintain the scope of where they are called.

```javascript
const arrowFunction = () => {}
```

By simply converting `handleButtonClick` function to an arrow function instead, I am provided a neatly bounded function that could be used anywhere, and still can interact with my class properties as I might need.

```
handleButtonClick = () => {
  const clickedCount = this.state.clickedCount;
  console.log("This Button Has Been Clicked: %s times", clickedCount);
  this.setState({ clickedCount: clickedCount++ });
}
```

Easy, right?

## Conclusion

You don't always have to keep binding every function you pass down, by writing them as arrow functions, we get a little bit of extra power of being bound to the class's scope.

This does not only assist us in keeping our code clean but it also saves us from bugs due to unbounded functions. And who does not like automation?

Switching to writing your arrow functions is a habit I would like you to form, I have formed it, and enjoying it. It is worth it!