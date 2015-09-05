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
			tasks: null, // displayed
			tasksVisible: null, // displayed to tasks when visible is toggd on
			tasksFull: null, // all tasks displayed to visible based on pagination
			flashMessage: null,
			page: 1,
			perPage: 10,
			visibility: true
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
					tasksVisible: tasksResponse.tasks,
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
		// calc subarray representing given page
		var sliceFrom = pageNo === 1 ? 0 : 0 + (pageNo - 1) * this.state.perPage;
		var sliceTo = pageNo === 1 ? this.state.perPage : pageNo * this.state.perPage;
		this.setState({
			tasks: this.state.tasksVisible.slice(sliceFrom, sliceTo),
			page: pageNo
		});
	},

	calcTasksVisible: function(pageNo, tasksBase) {
		var sliceFrom = pageNo === 1 ? 0 : 0 + (pageNo - 1) * this.state.perPage;
		var sliceTo = pageNo === 1 ? this.state.perPage : pageNo * this.state.perPage;
		return tasksBase.slice(sliceFrom, sliceTo);
	},

	changeTasks: function(newTasks, newTasksVisible) {
		this.setState({
			tasks: newTasks,
			tasksVisible: newTasksVisible
		});
	},

	// toggle visibility of completely completed tasks
	// -----
	// set state and rerender
	toggleVisibility: function() {
		var notDoneTasks = [];
		for (taskNo in this.state.tasksFull) {
			if (!Util.Helpers.isTaskReallyCompleted(this.state.tasksFull[taskNo]))
				notDoneTasks.push(this.state.tasksFull[taskNo]);
		}
		if (this.state.visibility) {
			this.changeTasks(this.calcTasksVisible(this.state.page, notDoneTasks), notDoneTasks);
		} else {
			this.changeTasks(this.calcTasksVisible(this.state.page, this.state.tasksFull), this.state.tasksFull);
		}
		this.setState({
			visibility: !this.state.visibility
		});
	},

	// renders the canvas
	// -----
	render: function() {
		var appContent, flashMessage;
		// flashMessage if there is one
		if (this.state.flashMessage) {
			flashMessage = (
					<div className={this.state.flashMessage.type === "error" ? "red" : "green" }>
						{this.state.flashMessage.text}
					</div>
			);
		}
		if (this.state.accessToken !== null) {
			// app content with tasks
			appContent = (
				<div className="app-content" id="app-content">
					<NewTaskForm accessToken={this.state.accessToken} onSubmit={this.loadTasks}/>
					<div className="toggle-setting">
    	  		<span className="task__toggle-button" title="Toggle visibility of completed tasks"
							onClick={this.toggleVisibility}></span>
					</div>
					{ flashMessage }
					<div className="app-content">
						<TaskList tasks={ this.state.tasks } isSubTask={ false } onTaskDelete={ this.deleteTask }
							loadTasks= { this.loadTasks } accessToken={ this.state.accessToken } visibility={ this.state.visibility }/>
					</div>
					<Pagination tasksVisible={this.state.tasksVisible} perPage={this.state.perPage} changePerPage={this.changePerPage}
						page={this.state.page} changePage={this.changePage} />
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
		console.log("visible: " + this.state.visibility);
		console.log(this.state.tasksFull);
		console.log(this.state.tasksVisible);
		console.log(this.state.tasks);
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
