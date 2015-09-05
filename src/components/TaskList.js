/** @jsx React.DOM */

var React = require('react/addons');
var Util = require('./../Util');

// TASK
var Task = React.createClass({

	// task-specific init state
	getInitialState: function() {
		return {
			disabled: false
		};
	},
	
	// update task
	// -----
	// toggles task's completion state
	updateTask: function(task) {
		// temporary disable the checkbox
		this.setState({ disabled: true });
		var self = this;
		Util.ApiRequestor.updateTask (
			task,
			self.props.accessToken,
			function (data) {
				// enable it back, everything went okay
				self.setState({ disabled: false});
				// refresh page up the chain
				self.props.loadTasks();
			},
			function (e) {
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with updating task (" + e.status + ")"
					}
				});
			}
		);
	},
	
	render: function() {
		var subtasks;
		if (this.props.taskData.hasOwnProperty('subtasks')) {
			subtasks = <TaskList tasks={ this.props.taskData.subtasks } isSubTask={ true } loadTasks={ this.props.loadTasks }
				onTaskUpdate={ this.props.onUpdate } onTaskDelete={ this.props.onDelete } accessToken={ this.props.accessToken }  />
		}

		// disabled hackity hack...
		var checkbox = <input className="task__completed-checkbox" type="checkbox" defaultChecked={ this.props.taskData.completed }
			onClick={ this.updateTask.bind(null, this.props.taskData) } />
		if (this.state.disabled) {
			checkbox = <input className="task__completed-checkbox" type="checkbox" defaultChecked={ this.props.taskData.completed }
				onClick={ this.updateTask.bind(null, this.props.taskData) } disabled />
		}
	
		return (
			<li className="task-list__item">
				<div className="task">
					{ checkbox }
					<span className="task__label">{ this.props.taskData.label }</span>
					<span className="task__delete-button" title="Delete" onClick={ this.props.onDelete.bind(null, this.props.taskData.id) }></span>
				</div>
				{ subtasks }
			</li>
		);
	}	
});

// TASK LIST
var TaskList = React.createClass({
	render: function() {
		if (this.props.tasks === null) {
			return (
				<div className="app-content">
					<span>Loading tasks...</span>
				</div>
			);
		}
		var self = this;
		return (
			<ul className={ this.props.isSubTask ? "subtask-list" : "task-list" }>
				{ this.props.tasks.map(function(task) {
					return <Task taskData={ task } key={ task.id } onUpdate={ self.props.onTaskUpdate } onDelete={ self.props.onTaskDelete }
						loadTasks={ self.props.loadTasks }	accessToken={ self.props.accessToken } />;
				})}
			</ul>
		);
	}	
});

module.exports = TaskList;
