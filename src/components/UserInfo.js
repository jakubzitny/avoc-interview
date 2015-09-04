/** @jsx React.DOM */

var React = require('react/addons');

// USER INFO
var UserInfo = React.createClass({
	render: function() {
		if (this.props.user === null) {
			return (
				<div className="user-info">
			  	<span className="link" onClick={this.props.onClick}>Login</span>
				</div>
			);
		} else {
			return (
				<div className="user-info">
					<span className="user-info__name">{this.props.user.name}</span>
				</div>
			);
		}
	}
});

module.exports = UserInfo;
