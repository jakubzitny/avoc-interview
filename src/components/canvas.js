/** @jsx React.DOM */

var React = require('react/addons');

var LoginButton = require('./LoginButton');
var UserInfo = require('./UserInfo');
var TaskList = require('./TaskList');
var NewTaskForm = require('./NewTaskForm');
var Pagination = require('./Pagination');

var Util = require('./../Util');

// CANVAS
var Canvas = React.createClass({

	// init state for the canvas
	// -----
	// accessToken, user, tasks and tasksFull are retrieved from API
	// flashMessage is for displaying error messages when requests fail
	// page, perPage is user-configurable pagination (not reflected on api)
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

	// login
	// -----
	// logs user in, updates state, and initiates task request
	login: function() {
		var self = this;
		Util.ApiRequestor.getLogin(
			function (loginResponse) {
				self.setState({
					accessToken: loginResponse.token,
					user: loginResponse.user,
				});
				// request tasks to display
				self.loadTasks();
			},
			function (e) {
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with logging in (" + e.status + ")"
					}
				});
			}
		);
	},

	// load tasks
	// ----- 
	// retrieves tasks from api, writes them to state, paginate first page
	// handles errors (in flashMessage) 
	loadTasks: function() {
		var self = this;
		Util.ApiRequestor.getTasks(
			this.state.accessToken,
			function (tasksResponse) {
				self.setState({
					tasksFull: tasksResponse.tasks,
					tasks: tasksResponse.tasks
				});
				// list 1st page
				self.changePage(1, self.state.perPage);
			},
			function (e) {
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with downloading tasks (" + e.status + ")"
					}
				});
			}
		);
	},

	// delete task
	// -----
	// deletes task and reloads all tasks (simpler code)
	deleteTask: function(taskId) {
		var self = this;
		Util.ApiRequestor.deleteTask(
			taskId,
			this.state.accessToken,
			function () {
				self.loadTasks(); // success
			},
			function (e) {	// error
				self.setState({
					flashMessage: {
						type: "error",
						text: "problem with deleting task (" + e.status + ")"
					}
				});
			}
		);
	},

	// update task
	// -----
	// toggles task's completion state
	updateTask: function(task) {
		var self = this;
		Util.ApiRequestor.updateTask(
			task,
			this.state.accessToken,
			function () {
				// TODO: implement disabling
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

	// pagination: changes number of tasks per page
	// -----
	// updates state and reloads tasks based on new pagination
	changePerPage: function(perPage) {
		this.setState({
			perPage: perPage
		});
		this.loadTasks();
	},

	// pagination: selects new page
	// -----
	// updates state, shows only tasks on desired page
	changePage: function(pageNo) {
		var sliceFrom = pageNo === 1 ? 0 : 0 + (pageNo - 1) * this.state.perPage;
		var sliceTo = pageNo === 1 ? this.state.perPage : pageNo * this.state.perPage;
		this.setState({
			tasks: this.state.tasksFull.slice(sliceFrom, sliceTo),
			page: pageNo
		});
	},

	// renders the canvas
	// -----
	render: function() {
		var appContent, flashMessage;
		// flashMessage if there is one
		if (this.state.flashMessage) {
			flashMessage = (
					<div className={this.state.flashMessage.type === "error" ? "red" : "green" }>{this.state.flashMessage.text}</div>
			);
		}
		if (this.state.accessToken !== null) {
			// app content with tasks
			appContent = (
				<div className="app-content" id="app-content">
					<NewTaskForm accessToken={this.state.accessToken} onSubmit={this.loadTasks}/>
					{ flashMessage }
					<div className="app-content">
						<TaskList tasks={this.state.tasks} isSubTask={false} onTaskUpdate={this.updateTask} onTaskDelete={this.deleteTask}/>
					</div>
					<Pagination tasksFull={this.state.tasksFull} perPage={this.state.perPage} changePerPage={this.changePerPage} page={this.state.page} changePage={this.changePage} />
				</div>
			);
		} else {
			// app content without tasks - login button
			appContent = (
				<div className="app-content login-screen" id="app-content">
					<LoginButton onClick={this.login} />
				</div>
			);
		}
		return (
			<div>
				<div className="app-brand">To-Do App</div>
				<UserInfo	onClick={this.login} user={this.state.user} />
				{appContent}
			</div>
		)
	}
});

module.exports = Canvas;
