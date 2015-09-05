/** @jsx React.DOM */

var React = require('react');

// Canvas is the main canvas with page content
var Canvas = require('./components/Canvas');

React.render(<Canvas />, document.getElementById('content'));
