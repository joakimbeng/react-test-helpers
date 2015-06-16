react-test-helpers
===================

> Some handy helper functions for testing [React](https://facebook.github.io/react/index.html) components

## Installation

You'll need both React and react-test-helpers:

`npm install --save react && npm install --save-dev react-test-helpers`

**NOTE:** if you want to use this in a non-browser environment you'll also need [jsdom](https://www.npmjs.com/package/jsdom) or similar (see `src/__tests__/setup.js` for how).

## Usage

Example using [Mocha](http://mochajs.org) and [Chai should](http://chaijs.com/guide/styles/#should):

```javascript
import React from 'react/addons';
import TestHelpers from 'react-test-helpers';

const {TestUtils} = React.addons;

describe('Testing a component', function () {
  it('renders something', function (done) {
    let MyComp = TestHelpers.createEmittingComponent({
      displayName: 'MyComp',
      render() {
        return <div>Hello world!</div>;
      }
    });

    let instance;

    MyComp.once('render', function () {
      const div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
      div.getDOMNode().textContent.should.equal('Hello world!');
      done();
    });

    instance = TestHelpers.renderComponent(<MyComp />);
  })
});
```

## API

### `renderComponent(component)`

| Parameter | Type | Description |
|-----------|------|-------------|
| component | `React.Component` | the component to render |


Renders a React component into an empty `<div>`. Automatically stores all rendered components for easy unmounting using [`unmountComponents` below](#unmountcomponents).

### `unmountComponents()`

Unmounts all React components that have been rendered using the [`renderComponent` function](#rendercomponentcomponent).

### `createEmittingComponent(spec)`

| Parameter | Type | Description |
|-----------|------|-------------|
| spec | `Object` | the [component spec](https://facebook.github.io/react/docs/component-specs.html) |


Creates a React component with an event emitter which emits a `"render"` event when the component is rendered.

## License

MIT
