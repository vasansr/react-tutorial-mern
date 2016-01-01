var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
  render: function() {
    console.log("Rendering BugFilter");
    return (
      <div>A way to filter the list of bugs would come here.</div>
    )
  }
});

module.exports = BugFilter;
