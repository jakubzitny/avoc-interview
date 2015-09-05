jest.dontMock('../src/Util');

var Util = require('../src/Util');

// HELPERS

describe('isint', function() {
 	it('checks if ints are int', function() {
  	expect(Util.Helpers.isInt(2)).toBe(true);
  	expect(Util.Helpers.isInt(2.2)).toBe(false);
  	expect(Util.Helpers.isInt("asd")).toBe(false);
	});
});

describe('range', function() {
	it('checks if range generates arrays properly', function() {
  	expect(Util.Helpers.range(5)).toEqual([1, 2, 3, 4, 5]);
	});
});

describe('isTaskReallyCompleted', function() {
	it('checks for completely completed tasks', function() {
		var taskCompleted = {
			completed: true,
			subtasks: [
				{ completed: true },
				{ completed: true }
			]
		};
		var taskNotCompletelyCompleted = {
			completed: true,
			subtasks: [
				{ completed: true },
				{ completed: false }
			]
		};
  	expect(Util.Helpers.isTaskReallyCompleted(taskCompleted)).toBe(true);
  	expect(Util.Helpers.isTaskReallyCompleted(taskNotCompletelyCompleted)).toBe(false);
	});
});

// API REQUESTOR

describe('request', function() {
 	it('checks if api login works', function() {
	 	Util.ApiRequestor.getLogin(function(data) {
  		expect(data.token).toBe("avcd.9e6.e641f");
		}, null);
	});
});
