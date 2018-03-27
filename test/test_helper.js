
import jsdom from 'jsdom';
// set up testing environment, i.e., terminal, to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body</html>'); // samething as window.document in the browser
global.window = global.document.defaultView;
const $ = jquery(global.window);


import jquery from 'jquery'; // i.e., $ from 'jquery', which automatically tries to access DOM
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';



console.log('IMPORTING REACT');
import React, { Component } from 'react';
// import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import TestUtils from 'react-addons-test-utils';



// build 'renderComponent' helper that should render a given react element
function renderComponent(ComponentClass, props, initialState) {
    const componentInstance = TestUtils.renderIntoDocument(
        <Provider store={createStore(reducers, initialState)}>
            <ComponentClass {...props} />
        </Provider>
    ); // render into a fragment of our document

    // produces HTML, i.e., uses react dom to get a reference to our component in the document, wrap
    // by a jquery element, just so that we can get access to all those matchers from chai-jquery.
    return $(ReactDOM.findDOMNode(componentInstance));
}

// build helper for simulating events
// e.g., to call simulate: $('div').simulate
$.fn.simulate = function(eventName, value) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0]); // i.e., $('li').simulate()
};

// set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };

