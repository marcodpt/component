# Component
> A component to test, debug and build other components

## Examples
 - [navbar](https://marcodpt.github.io/component/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fnavbar%2Fsample.js)
 - [table](https://marcodpt.github.io/component/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Ftable%2Fsample.js)
 - [form](https://marcodpt.github.io/component/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fform%2Fsample.js)
 - [graph](https://marcodpt.github.io/component/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fgraph%2Fsample.js)
 - [SPA](https://marcodpt.github.io/component/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fspa%2Fsample.js)
 - [template](https://marcodpt.github.io/component/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Ftemplate%2Fsample.js)

## Tests
 - [navbar](https://marcodpt.github.io/component/tests.html?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fnavbar%2Ftests.js)
 - [table](https://marcodpt.github.io/component/tests.html?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Ftable%2Ftests.js)
 - [form](https://marcodpt.github.io/component/tests.html?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fform%2Ftests.js)
 - [views](https://marcodpt.github.io/component/tests.html?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fviews%2Ftests.js)

## Motivation
Create a framework agnostic component definition to scale frontend applications
in the spirit of [micro frontends](https://micro-frontends.org/).

## Definition
A `component` is a function with the following signature

### component(element, params) 
 - DOM node `element`: is the DOM node where the component should be mounted
 - object `params`: is the params that component recieve to mount itself
 - returns function `update(data)`: an optional function to deals with external 
 updates request
   - `data`: the info passed to update component

## Usage
Define your component and create an example file in the spirit of
[this file](https://raw.githubusercontent.com/marcodpt/component/main/example.js).

Then just go to the browser and use the following url:

```
https://marcodpt.github.io/component/#{Your example file url}
```

To use self hosted just use the `test` function in the `API` spec

When you define your `component` if you are a
[hyperapp](https://github.com/jorgebucaran/hyperapp) fan like myself,
consider using `component` function in the `API` spec. This is by no means
a must, and you are absolutely free to use wherever framework you want, even
no framework or just a template engine.

## API
### index.js: function (element, view, params, update)
A [hyperapp](https://github.com/jorgebucaran/hyperapp) helper to build
components in this project specification.
 - DOM node `element`: is the DOM node where the component should be mounted
 - function `view(h, text)`: is a function that returns the
[hyperapp](https://github.com/jorgebucaran/hyperapp) view
function where `h` and `text` are defined by
[hyperapp](https://github.com/jorgebucaran/hyperapp)
 - object `params`: is the params that will `init`
[hyperapp](https://github.com/jorgebucaran/hyperapp)
 - function `update(state, data)`: is a function to create the function that 
deals with external updates request
   - object `state`: is the
[hyperapp](https://github.com/jorgebucaran/hyperapp) state
   - `data`: the info that external updates requests will pass to your
`component` 
   - return object: An object with the new state of
[hyperapp](https://github.com/jorgebucaran/hyperapp)
 - returns a `component` as defined in this document
 
### source.js:  function (data)
A function that prints to string a variable data that can contain functions, 
objects, arrays, any sort of javascript data. Used for debugging purposes.
 - `data`: Any javascript variable, can be an object, can contain functions

### test.js: function (element, params)
This is a `component` following this document definition.
To test your `component` that follows this document definition too.
 - object `params` properties:
   - string `title`: Is the title of the component
   - string `gh`: Is the url of your github repo if your want the github ribbon
   - object `samples`: The keys are the examples name, and the values are the 
examples `params` passed to your `component` for testing purposes.
   - string `target`: Is the DOM selector to the element where your component
should be mounted
   - function `comp`: Is your `component` definition following this document.
   - object `updates`: The keys are the updates names, and the values are the
updates `data` passed from parent to your `component`, this is optional, if
your `component` does not support updates just ignore this.
