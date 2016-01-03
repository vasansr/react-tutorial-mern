var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var Paper = require('material-ui/lib/paper');
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');
var AppBar = require('material-ui/lib/app-bar');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = React.createClass({
  render: function() {
    //console.log("Rendering BugRow:", this.props.bug);
    return (
      <TableRow>
        <TableRowColumn style={{height: 24, width: 180}}>
          <Link to={'/bugs/' + this.props.bug._id}>{this.props.bug._id}</Link>
        </TableRowColumn>
        <TableRowColumn style={{height: 24, width: 40}}>{this.props.bug.status}</TableRowColumn>
        <TableRowColumn style={{height: 24, width: 40}}>{this.props.bug.priority}</TableRowColumn>
        <TableRowColumn style={{height: 24, width: 60}}>{this.props.bug.owner}</TableRowColumn>
        <TableRowColumn style={{height: 24}}>{this.props.bug.title}</TableRowColumn>
      </TableRow>
    )
  }
});

var BugTable = React.createClass({
  render: function() {
    //console.log("Rendering bug table, num items:", this.props.bugs.length);
    var bugRows = this.props.bugs.map(function(bug) {
      return <BugRow key={bug._id} bug={bug} />
    });
    return (
      <Paper zDepth={1} style={{marginTop: 10, marginBottom: 10}}>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{width: 180}}>Id</TableHeaderColumn>
              <TableHeaderColumn style={{width: 40}}>Status</TableHeaderColumn>
              <TableHeaderColumn style={{width: 40}}>Priority</TableHeaderColumn>
              <TableHeaderColumn style={{width: 60}}>Owner</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true}>
            {bugRows}
          </TableBody>
        </Table>
      </Paper>
    )
  }
});

var BugList = React.createClass({
  getInitialState: function() {
    return {bugs: []};
  },
  render: function() {
    console.log("Rendering BugList, num items:", this.state.bugs.length);
    return (
      <div>
        <AppBar title="React Bug Tracker" showMenuIconButton={false}/>
        <BugFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
        <BugTable bugs={this.state.bugs}/>
        <BugAdd addBug={this.addBug} />
      </div>
    )
  },

  componentDidMount: function() {
    console.log("BugList: componentDidMount");
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    var oldQuery = prevProps.location.query;
    var newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority &&
        oldQuery.status === newQuery.status) {
      console.log("BugList: componentDidUpdate, no change in filter, not updating");
      return;
    } else {
      console.log("BugList: componentDidUpdate, loading data with new filter");
      this.loadData();
    }
  },

  loadData: function() {
    var query = this.props.location.query || {};
    var filter = {priority: query.priority, status: query.status};

    $.ajax('/api/bugs', {data: filter}).done(function(data) {
      this.setState({bugs: data});
    }.bind(this));
    // In production, we'd also handle errors.
  },

  changeFilter: function(newFilter) {
    this.props.history.push({search: '?' + $.param(newFilter)});
  },

  addBug: function(bug) {
    console.log("Adding bug:", bug);
    $.ajax({
      type: 'POST', url: '/api/bugs', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function(data) {
        var bug = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({bugs: bugsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding bug:", err);
      }
    });
  }
});

module.exports = BugList;

