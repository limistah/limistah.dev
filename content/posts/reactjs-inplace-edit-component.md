---
title: ReactJS - Inplace Edit component
date: 2020-01-20
tags: [ReactJS]
---

Last time, I was trying to render a data table and I thought that I should make some fields _editable_ right in the table listing. It is interesting to note that I never thought about any [NPM](https://www.npmjs.com/) library for it, so I went all out to create a simple but [effective solution for myself](https://gist.github.com/limistah/b91b5429c0a4f8062b26445d12877361).

In this post, I will demonstrate how I created an editable component. The component would be able to use different form fields and notify the parent if any change has been made. That said, Let's move....

To start with, I will define the usage that I had for the component. The component to be was consumed like this:

```js
<InplaceEdit
  isUpdatingId={true || false}
  id={idForTheField || ""}
  updateKey={keyToReturnAnObjectWith || ""}
  onUpdate={functionToCallForTheUpdate || () => {}}
  text={textForDisplay || ""}
  defaultValue={defaultInCaseValueDoesNotMatch || ""}
  inputType={htmlInputType || "text"}
  selectOptions={ optionForSelectInputType || [
    { value: true, label: "Yes" },
    { value: false, label: "No" }
  ]}
  valueToText={ functionToConvertFieldValueToText || value => (value === "true" ? "Yes" : "No")}
/>;
```
With this, I was able to use the InplaceEdit component almost anywhere that I wanted as far as single value was expected.

Now, building for the usage. Firstly, I defined the InplaceEdit component:

```js
import React from "react" // I won't repeat this after now

function InplaceEdit() {
  return (
    <div>
      Inplace Edit Component
    </div>
  );
}

export default InplaceEdit; // I won't repeat this after now
```
Next, I wanted to toggle between two modes. One being a normal text, and the other when it is a form field. To do this, I added an `onClick` handler to the root `div` element, which updates a state that determines these modes.

```js
function InplaceEdit() {
  const [showEditor, updateShowEditor] = React.useState(false);
  
  const handleShowEditor = () => {
    updateShowEditor(true);
  };

  return (
    <div onClick={handleShowEditor} style={{ cursor: "pointer" }}>
      {showEditor ? "Show Editor" : "Show Text"}
    </div>
  );
}
```
Next, I required two distinct components for both the editor and display, I called them `EditDisplay` and `TextDisplay`, respectively. This made the InplaceEdit component looked more like this:

```js
function InplaceEdit() {
  const [showEditor, updateShowEditor] = React.useState(false);
  
  const handleShowEditor = () => {
    updateShowEditor(true);
  };

  return (
    <div onClick={handleShowEditor} style={{ cursor: "pointer" }}>
      {showEditor ? <EditDisplay/> : <TextDisplay />}
    </div>
  );
}
```

After that, I defined the `EditDisplay` component and `TextDisplay` components:

```js
// EditDisplay Component
function EditDisplay() {
  return (
    <></>
  );
}

// Text display component
const TextDisplay = () => <></>;
```
So, at this point, I was able to toggle between two modes, but nothing happens and nothing is rendered, yet. To move forward, I had to display the text which would be received by the `InplaceEdit` component and passed to the `TextDisplay` component as props. The below code is what I implemented for this phase:

```js

// EditDisplay Component
function EditDisplay() {
  return (
    <></>
  );
}

// Text display component
const TextDisplay = ({text}) => <span>{text}</span>;

function InplaceEdit({ text }) {
  const [showEditor, updateShowEditor] = React.useState(false);
  
  const handleShowEditor = () => {
    updateShowEditor(true);
  };

  return (
    <div onClick={handleShowEditor} style={{ cursor: "pointer" }}>
      {showEditor ? <EditDisplay/> : <TextDisplay text={text} />}
    </div>
  );
}
```
I was glad when I got to this point. I am sure you are as well, at least, something is getting rendered.

It is very correct if you guessed that the TextDisplay component will not change its state afterwards, and bulk of the work is around the `EditDisplay` component. So, sorry, I won't be adding that style that you are thinking.

The next move I made was to tell the EditDisplay what type of edit is required and the default value for the edit.

```js
// EditDisplay Component
function EditDisplay({ defaultValue, inputType }) {
  return <></>
}

// Text display component
const TextDisplay = ({ text }) => <span>{text}</span>

function InplaceEdit({ text, inputType, defaultValue }) {
  const [showEditor, updateShowEditor] = React.useState(false)

  const handleShowEditor = () => {
    updateShowEditor(true)
  }

  return (
    <div onClick={handleShowEditor} style={{ cursor: "pointer" }}>
      {showEditor ? (
        <EditDisplay
          inputType={inputType || "text"}
          defaultValue={defaultValue}
        />
      ) : (
        <TextDisplay text={text} />
      )}
    </div>
  )
}
```

The `defaultValue` and `inputType` are both passed from the `InplaceEdit` component and passed down to the `EditDisplay` component, the `inputType` is short-circuited to return `text` in case the defaultValue is not set. Not that bad, right?

The next step is that, I put up some `input` components for the update. I had `TextInput` which looked like this:

```js
const TextInput = ({ type, defaultValue, onBlur, disabled }) => {
  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      onBlur(e);
    }
  };
  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);
  return (
    <input
      ref={inputRef}
      type={type}
      defaultValue={defaultValue}
      onBlur={onBlur}
      disabled={disabled}
      onKeyUp={handleKeyUp}
    />
  );
};
```
This component`TextInput` does a pretty interesting stuff, first, it handles the `KeyUp` event which sends information up to the parent(`InplaceEdit`) component, it can be disabled, the type is set as from the parent and the defaultValue is also configurable through the props.

And the `SelectInput`, I defined it to look like this:
```js
const SelectInput = ({ options, defaultValue, onBlur, disabled }) => {
  return (
    <select onChange={onBlur} defaultValue={defaultValue} disabled={disabled}>
      {options.map(option => {
        return <option value={option.value}>{option.label}</option>;
      })}
    </select>
  );
};
```
This component(`SelectInput`) accepts the options as an array of object with `label` and `value` keys, `defaultValue` for persistence, `onBlur` event handler and can be disabled by setting its `disabled` props. Not too serious, I think.

For the EditDisplay, I had to render one of the two types of components based on the `inputType` props:

```js
const EditDisplay = ({
  inputType,
  onchange,
  defaultValue,
  selectOptions,
  onBlur,
  disabled
}) => {
  return (
    <>
      {inputType === "select" && (
        <SelectInput
          options={selectOptions}
          defaultValue={defaultValue}
          onchange={onchange}
          onBlur={onBlur}
          disabled={disabled}
        />
      )}
      {["text", "password"].includes(inputType) && (
        <TextInput
          type={inputType}
          onchange={onchange}
        />
      )}
    </>
  );
};
```
Next, I thought, the `EditDisplay` component receives some props that are not yet defined in the `InplaceEdit` component, so I defined them like so:
```js
function InplaceEdit({
  text,
  inputType,
  defaultValue,
  valueToText,
  updateKey,
  onUpdate,
}) {
  const [showEditor, updateShowEditor] = React.useState(false)

  // Keeps the text synchronized
  const [displayText, updateDisplayText] = React.useState(text)

  const handleShowEditor = () => {
    updateShowEditor(true)
  }

  // Callback for the onBlur event handler
  const handleEditorInputChange = React.useCallback(e => {
    const value = e.currentTarget.value
    // Converts the value to a displayable text using a function from the parent consumer
    const text = typeof valueToText === "function" ? valueToText(value) : value
    // Updates the display text for synchronization
    updateDisplayText(text)
    // Hides the editor
    updateShowEditor(false)
    if (defaultValue !== value) {
      // If the value has changed, we need to tell the consumer parents about it
      const handler = typeof onUpdate === "function" ? onUpdate : () => {}
      // Sets the data returning an object containing the value in the updateKey or just the value itself
      const data = updateKey ? { [updateKey]: value } : value
      // Call the update function with the data and resource id
      handler(data, id)
    }
  })

  return (
    <>
      <div onClick={handleShowEditor} style={{ cursor: "pointer" }}>
        {showEditor ? (
          <EditDisplay
            inputType={inputType || "text"}
            defaultValue={defaultValue}
            onBlur={handleEditorInputChange}
            selectOptions={selectOptions}
            disabled={isUpdatingId === id}
          />
        ) : (
          <TextDisplay text={displayText} />
        )}
      </div>
    </>
  )
}
```

Noticeable from the above snippet is that, the `disabled` prop is only set if the `isUpdatingId` is equals to the `id` props, and the `<TextDisplay />` now receives a `displayText` state which is synchronized across the two children of `InplaceEdit` component.

And guess what, that is all there is to an `InplaceEdit` component that returns just a single value. It should accept a value/text and toggles between input and text states, too damn simple, I think.

## Conclusion

This was a very interesting process for me, and I never regret it and never will. There are awesome React components for this and does better job than my local component. But I thougth, I should experiment a bit, and here I have it.

The full code is available as a gist [here](https://gist.github.com/limistah/b91b5429c0a4f8062b26445d12877361), if you want to check it out. And, thank you for reading.

[Dhanyavaad](https://translate.google.com/#view=home&op=translate&sl=en&tl=hi&text=Thank%20you)! 🙇