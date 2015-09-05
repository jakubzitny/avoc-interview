/** @jsx React.DOM */

var React = require('react/addons');

var Util = require('./../Util');

// NEW TASK FORM
var NewTaskForm = React.createClass({

	// creates new task
	// -----
	// processes form, posts the data to api, reloads tasks (onSubmit)
	postTask: function(e) {
		e.preventDefault();
		var self = this;
		var taskLabel = React.findDOMNode(this.refs.label).value.trim();
		Util.ApiRequestor.postTask(
			taskLabel,
			this.props.accessToken,
			function () { // on success
				self.props.onSubmit();
			},
			function (e) { // on error
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with uploading task (" + e.status + ")"
					}
				});
			}
		);
	},

	render: function() {
		return (
  		<form className="new-task-form" onSubmit={this.postTask}>
  		  <input className="text-input new-task-form__label-input" type="text" name="label" placeholder="Label…" ref="label" />
  		  <button className="button new-task-form__submit-button" type="submit">Add Task</button>
  		</form>
		);
	}
});

module.exports = NewTaskForm;
