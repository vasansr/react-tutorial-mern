var BugFilter = React.createClass({
  render: function() {
    return (
      <div>A way to filter the list of bugs would come here.</div>
    )
  }
});

var BugRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.bug.id}</td>
        <td>{this.props.bug.status}</td>
        <td>{this.props.bug.priority}</td>
        <td>{this.props.bug.owner}</td>
        <td>{this.props.bug.title}</td>
      </tr>
    )
  }
});

var BugTable = React.createClass({
  render: function() {
    var bugRows = this.props.bugs.map(function(bug) {
      return <BugRow key={bug.id} bug={bug} />
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Owner</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {bugRows}
        </tbody>
      </table>
    )
  }
});

var BugAdd = React.createClass({
  render: function() {
    return (
      <div>A form to add a new bug would come here.</div>
    )
  }
});

var bugData = [
  {id: 1, priority: 'P1', status:'Open', owner:'Ravan', title:'App crashes on open'},
  {id: 2, priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel'},
];

var BugList = React.createClass({
  getInitialState: function() {
    return {bugs: bugData};
  },
  render: function() {
    console.log("Rendering bug list, num items:", this.state.bugs.length);
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter />
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <button onClick={this.testNewBug}>Add Bug</button>
        <hr />
        <BugAdd />
      </div>
    )
  },

  testNewBug: function() {
    var nextId = this.state.bugs.length + 1;
    this.addBug({id: nextId, priority: 'P2', status:'New', owner:'Pieta', title:'Warning on console'})
  },

  addBug: function(bug) {
    console.log("Adding bug:", bug);
    // We're advised not to modify the state, it's immutable. So, make a copy.
    var bugsModified = this.state.bugs.slice();
    bugsModified.push(bug);
    this.setState({bugs: bugsModified});
  }
});

ReactDOM.render(
  <BugList />,
  document.getElementById('main')
);

