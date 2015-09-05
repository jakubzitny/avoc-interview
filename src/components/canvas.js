/** @jsx React.DOM */

var React = require('react/addons');

var API_URL = "http://avcd-todo-api.herokuapp.com";
var API_KEY = "avcd-todo-app-a1b3d6";

var LoginButton = require('./LoginButton');
var UserInfo = require('./UserInfo');
var TaskList = require('./TaskList');
var NewTaskForm = require('./NewTaskForm');
var Pagination = require('./Pagination');

// CANVAS
var Canvas = React.createClass({
	getInitialState: function() {
	  return { 
			accessToken: null,
			user: null,
			tasks: null,
			tasksFull: null,
			flashMessage: null,
			page: 1,
			perPage: 10
		}
	},
	updateTasks: function() {
		var tasksPoint = API_URL + "/tasks" + "?api_key="+API_KEY+"&access_token="+this.state.accessToken;
		var self = this;
		$.ajax({
			url: tasksPoint,
			type: 'GET',
			success: function(tasksResponse){ 
				self.setState({
					tasksFull: tasksResponse.tasks,
					tasks: tasksResponse.tasks
				});
				self.changePage(1, self.state.perPage);
			},
			error: function(e) {
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with downloading tasks (" + e.status + ")"
					}
				});
			}
		});
		// list 1st page
	},
	handleLogin: function(data) {
		var self = this;
		// TODO: check response data!!
		// update user state
		this.setState({
			accessToken: data.token,
			user: data.user,
		});
		// request tasks to display
		this.updateTasks();
	},
	requestLogin: function() {
		var loginPoint = API_URL + "/login" + "?api_key="+API_KEY;
		var self = this;
		$.ajax({
			url: loginPoint,
			type: 'GET',
			success: function(data){ 
				self.handleLogin(data);
			},
			error: function(e) {
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with logging in (" + e.status + ")"
					}
				});
			}
		});
	},
	onNewTaskSubmit: function() {
		this.updateTasks();
	},
	onTaskDelete: function(taskId) {
		var taskPoint = API_URL + "/tasks/" + taskId + "?api_key="+API_KEY+"&access_token="+this.state.accessToken;
		var self = this;
		$.ajax({
			url: taskPoint,
			type: 'DELETE',
			success: function(tasksResponse){ 
				self.updateTasks();
			},
			error: function(e) {
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with deleting task (" + e.status + ")"
					}
				});
			}
		});
	},
	onTaskCheckBox: function(task) {
		var taskPoint = API_URL + "/tasks/" + task.id + "?api_key="+API_KEY+"&access_token="+this.state.accessToken;
		var self = this;
		$.ajax({
			url: taskPoint,
			type: 'POST',
			data: { completed: !task.completed },
			success: function(tasksResponse){ 
				//console.log("it works....");
			},
			error: function(e) {
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with updating task (" + e.status + ")"
					}
				});
			}
		});
	},
	changePerPage: function(perPage) {
		this.setState({
			perPage: perPage
		});
		this.updateTasks();
	},
	changePage: function(pageNo, perPage) {
		var sliceFrom = pageNo === 1 ? 0 : 0 + (pageNo - 1) * perPage;
		var sliceTo = pageNo === 1 ? perPage : pageNo * perPage;
		this.setState({
			tasks: this.state.tasksFull.slice(sliceFrom, sliceTo),
			page: pageNo
		});
	},
	render: function() {
		var appContent, flashMessage;
		if (this.state.flashMessage) {
			flashMessage = (
					<div className={this.state.flashMessage.type === "error" ? "red" : "green" }>{this.state.flashMessage.text}</div>
			);
		}
		if (this.state.accessToken !== null) {
			appContent = (
				<div className="app-content" id="app-content">
					<NewTaskForm token={this.state.accessToken} onSubmit={this.onNewTaskSubmit}/>
					{ flashMessage }
					<div className="app-content">
						<TaskList tasks={this.state.tasks} isSubTask={false} onTaskCheckBox={this.onTaskCheckBox} onTaskDelete={this.onTaskDelete}/>
					</div>
					<Pagination tasksFull={this.state.tasksFull} perPage={this.state.perPage} changePerPage={this.changePerPage} page={this.state.page} changePage={this.changePage} />
				</div>
			);
		} else {
			appContent = (
				<div className="app-content login-screen" id="app-content">
					<LoginButton onClick={this.requestLogin} />
				</div>
			);
		}
		return (
			<div>
				<div className="app-brand">To-Do App</div>
				<UserInfo	onClick={this.requestLogin} user={this.state.user} />
				{appContent}
			</div>
		)
	}
});

module.exports = Canvas;
