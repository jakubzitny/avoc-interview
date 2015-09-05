/** @jsx React.DOM */

var React = require('react/addons');

// TASK
var Task = React.createClass({
	render: function() {
		var subtasks;
		if (this.props.taskData.hasOwnProperty('subtasks')) {
			subtasks = <TaskList tasks={ this.props.taskData.subtasks } isSubTask={ true }
				onTaskUpdate={ this.props.onUpdate } onTaskDelete={ this.props.onDelete } />
		}
		return (
    	<li className="task-list__item">
    	  <div className="task">
    	    <input className="task__completed-checkbox" type="checkbox" defaultChecked={ this.props.taskData.completed }
						onClick={ this.props.onUpdate.bind(null, this.props.taskData) } />
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
      	    return <Task taskData={ task } key={ task.id } onUpdate={ self.props.onTaskUpdate } onDelete={ self.props.onTaskDelete } />;
      	})}
				</ul>
		);
	}	
});

module.exports = TaskList;
