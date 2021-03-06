import React from 'react/addons';
import assign from 'object-assign';
import eventEmitter from 'event-emitter';

let div = document.createElement('div');
let instances = [];

const TestHelpers = {
  createEmittingComponent(options) {
    let Component = React.createClass(
      assign(
        {
          statics: {
            _ee: eventEmitter(),
            emit(...args) {
              setTimeout(() => Component._ee.emit.apply(this, args), 0);
            },
            on(...args) {
              setTimeout(() => Component._ee.on.apply(this, args), 0);
            },
            once(...args) {
              setTimeout(() => Component._ee.once.apply(this, args), 0);
            }
          }
        },
        options,
        {
          render() {
            Component.emit('render');
            return options.render.call(this);
          }
        }
      )
    );
    return Component;
  },

  renderComponent(component) {
    let instance = React.render(component, div);
    instances.push(instance);
    return instance;
  },

  unmountComponents() {
    for (let i = 0; i < instances.length; i++) {
      if (instances[i] && instances[i].isMounted()) {
        React.unmountComponentAtNode(div);
        instances.splice(i, 1);
      }
    }
  }
};

export default TestHelpers;
