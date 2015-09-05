/** @jsx React.DOM */

var React = require('react/addons');

var API_URL = "http://avcd-todo-api.herokuapp.com";
var API_KEY = "avcd-todo-app-a1b3d6";

// NEW TASK FORM
var NewTaskForm = React.createClass({
	postTask: function(e) {
		e.preventDefault();
		var taskLabel = React.findDOMNode(this.refs.label).value.trim();
		var tasksPoint = API_URL + "/tasks" + "?api_key="+API_KEY+"&access_token="+this.props.token;
		var self = this;
		$.ajax({
			url: tasksPoint,
			type: 'POST',
			data: { "label": taskLabel },
			success: function(data){ 
				console.log("yayy it works");
				console.log(data);
			},
			error: function(e) {
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with uploading task (" + e.status + ")"
					}
				});
			}
		});
		this.props.onSubmit();
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
