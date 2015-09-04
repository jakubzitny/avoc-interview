/** @jsx React.DOM */

var React = require('react/addons');

// LOGIN BUTTON
var LoginButton = React.createClass({
	render: function() {
		return (
			<div>
				<p>Start by logging in</p>
				<span className="button login-button" onClick={this.props.onClick}>Login</span>
			</div>
		);
	}

});

module.exports = LoginButton;
