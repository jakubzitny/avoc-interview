/** @jsx React.DOM */

var React = require('react/addons');

// USER INFO
var UserInfo = React.createClass({
	render: function() {
		if (this.props.user === null) {
			// display login link when no user is logged in
			return (
				<div className="user-info">
					<span className="link" onClick={this.props.onClick} ref="userInfo">Login</span>
				</div>
			);
		} else {
			// display hist name otherwise
			return (
				<div className="user-info">
					<span className="user-info__name" ref="userInfo">{this.props.user.name}</span>
				</div>
			);
		}
	}
});

module.exports = UserInfo;
