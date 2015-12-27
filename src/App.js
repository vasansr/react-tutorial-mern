var BugFilter = React.createClass({
  render: function() {
    return (
      <div>A way to filter the list of bugs would come here.</div>
    )
  }
});

var BugTable = React.createClass({
  render: function() {
    return (
      <div>The list of bugs as a table would come here.</div>
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

var BugList = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter />
        <hr />
        <BugTable />
        <hr />
        <BugAdd />
      </div>
    )
  }
});

ReactDOM.render(
  <BugList />,
  document.getElementById('main')
);

