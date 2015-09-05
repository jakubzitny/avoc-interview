/** @jsx React.DOM */

var React = require('react/addons');

var Util = require('./../Util');

// PAGINATION
var Pagination = React.createClass({

	// changePerPage
	// -----
	// rerenders the pagination component with available pages to browse
	changePerPage: function() {
		var entrdPage = React.findDOMNode(this.refs.perPage).value;
		this.props.changePerPage(entrdPage);
	},

	render: function() {
		var self = this;
		if (this.props.tasksFull === null) {
			return (<br />);
		} else {
			var pages = Math.ceil(this.props.tasksFull.length/this.props.perPage);
			if (pages <= 0 || !Util.Helpers.isInt(pages)) pages = 1;
			return (
				<div id="pagination">
					<input type="text" ref="perPage" onChange={ this.changePerPage } placeholder={ this.props.perPage + " per page" } />
					<br />
					{ Util.Helpers.range(pages).map(function(i) {
    	  	    return <span className="pointer" onClick={ self.props.changePage.bind(null, i) } key={ i }>{ i } </span>
    	  	})}
				</div>
			);
		}
	}
});

module.exports = Pagination;
