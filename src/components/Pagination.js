/** @jsx React.DOM */

var React = require('react/addons');

var Pagination = React.createClass({
	isInt: function (value) {
  	var x = parseFloat(value);
  	return !isNaN(value) && (x | 0) === x;
	},
	range: function(i){
 		// thx to http://stackoverflow.com/a/6299743/1893452
		if (!this.isInt(i)) i = this.props.perPage;
		return i ? this.range(i-1).concat(i) : [ ]
	},
	changePerPage: function() {
		this.props.changePerPage(React.findDOMNode(this.refs.perPage).value);
	},
	render: function() {
		var self = this;
		if (this.props.tasksFull === null) return (<br />);
		else {
			var pages = Math.ceil(this.props.tasksFull.length/this.props.perPage); // TODO: check
			return (
				<div id="pagination">
					<input type="text" ref="perPage" onChange={this.changePerPage} placeholder={this.props.perPage + " per page"} />
					<br />
					{this.range(pages).map(function(i) {
    	  	    return <span className="pointer" onClick={self.props.changePage.bind(null, i, self.props.perPage)} key={i}>{i} </span>
    	  	})}
				</div>
			);
		}
	}
});

module.exports = Pagination;
