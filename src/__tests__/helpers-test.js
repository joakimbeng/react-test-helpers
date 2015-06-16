/* eslint-env mocha */
/* eslint func-names:0 */
/* global should */
import React from 'react';
import TestHelpers from '../.';

describe('TestHelpers', function () {
  describe('createEmittingComponent', function () {
    it('creates a React component which emits events on render', function (done) {
      let MyComp = TestHelpers.createEmittingComponent({
        displayName: 'MyComp',
        render() {
          return <div />;
        }
      });

      MyComp.once('render', done);

      TestHelpers.renderComponent(<MyComp />);
    });
  });

  describe('unmountComponents', function () {
    it('unmounts components that were mounted', function () {
      let MyComp = TestHelpers.createEmittingComponent({
        displayName: 'MyComp',
        render() {
          return <div />;
        }
      });

      let myComp = TestHelpers.renderComponent(<MyComp />);

      myComp.isMounted().should.equal(true);

      TestHelpers.unmountComponents();

      should.not.exist(myComp.isMounted());
    });
  });
});
