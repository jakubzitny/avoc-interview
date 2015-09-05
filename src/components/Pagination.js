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
		if (entrdPage <= 0 || !Util.Helpers.isInt(entrdPage)) entrdPage = 10;
		this.props.changePerPage(entrdPage);
	},

	render: function() {
		var self = this;
		if (this.props.tasksVisible === null) {
			return (<br />);
		} else {
			var pages = Math.ceil(this.props.tasksVisible.length/this.props.perPage);
			if (pages <= 0 || !Util.Helpers.isInt(pages)) pages = 1;
			return (
				<div id="pagination">
					<input type="text" ref="perPage" onChange={ this.changePerPage } placeholder={ this.props.perPage + " per page" } />
					<br />
					{ Util.Helpers.range(pages).map(function(i) {
    	  	    return <span className={ i === self.props.page ? 'pointer' : 'pointer gray' } onClick={ self.props.changePage.bind(null, i) } key={ i }>{ i } </span>
    	  	})}
				</div>
			);
		}
	}
});

module.exports = Pagination;
