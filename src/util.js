var Util = (function() {
	var API_URL = "http://avcd-todo-api.herokuapp.com";
	var API_KEY = "avcd-todo-app-a1b3d6";

	// ApiRequestor
	// -----
	// prepared api requests
	var ApiRequestor = {
		// GET /login
		getLogin: function(success, error) {
			var loginPoint = API_URL + "/login" +
				"?api_key=" + API_KEY;
			$.ajax({
				url: loginPoint,
				type: 'GET',
				success: success,
				error: error,
			});
		},
		// GET /tasks
		getTasks: function(accessToken, success, error) {
			var tasksPoint = API_URL + "/tasks" +
				"?api_key=" + API_KEY +
				"&access_token=" + accessToken;
			$.ajax({
				url: tasksPoint,
				type: 'GET',
				success: success,
				error: error,
			});
		},
		// DELETE /tasks/:id
		deleteTask: function(taskId, accessToken, success, error) {
			var taskPoint = API_URL + "/tasks" +
				"/" + taskId +
				"?api_key=" + API_KEY + 
				"&access_token=" + accessToken;
			$.ajax({
				url: taskPoint,
				type: 'DELETE',
				success: success,
				error: error,
			});
		},
		// POST /tasks
		postTask: function(taskLabel, accessToken, success, error) {
			var tasksPoint = API_URL + "/tasks" +
				"?api_key=" + API_KEY +
				"&access_token=" + accessToken;
			$.ajax({
				url: tasksPoint,
				type: 'POST',
				data: { "label": taskLabel },
				success: success,
				error: error,
			});
		},
		// POST /tasks/:id
		updateTask: function(task, accessToken, success, error) {
			var taskPoint = API_URL + "/tasks" +
				"/" + task.id +
				"?api_key=" + API_KEY + 
				"&access_token=" + accessToken;
			$.ajax({
				url: taskPoint,
				type: 'POST',
				data: { completed: !task.completed },
				success: success,
				error: error,
			});
		}
		
	};

	// Helpers
	// -----
	// helper functions for various shit
	var Helpers = {

		// return true if value is int
		isInt: function (value) {
  		var x = parseFloat(value);
  		return !isNaN(value) && (x | 0) === x;
		},

		// generate Array of range 0 to i
 		// thx to http://stackoverflow.com/a/6299743/1893452
		range: function(i) {
			return i ? this.range(i-1).concat(i) : [ ]
		}
	};

	return {
		ApiRequestor: ApiRequestor,
		Helpers: Helpers 
	}	

})();

module.exports = Util;
