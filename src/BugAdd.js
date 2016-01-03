var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');

var RaisedButton = require('material-ui/lib/raised-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var TextField = require('material-ui/lib/text-field');

injectTapEventPlugin();

var BugAdd = React.createClass({
  render: function() {
    //console.log("Rendering BugAdd");
    return (
      <Card initiallyExpanded={true}>
        <CardHeader title="Create" subtitle="Add a new bug"
          actAsExpander={true} showExpandableButton={true}
          avatar={
            <Avatar backgroundColor={Colors.teal500} icon={
              <FontIcon className="fa fa-plus"></FontIcon>
            } />
          }
        />
        <CardText expandable={true} style={{paddingTop: 0}}>
          <TextField hintText="Bug Title" value={this.state.title} onChange={this.onChangeTitle}/>
          <br />
          <TextField hintText="Owner" value={this.state.owner} onChange={this.onChangeOwner}/>
          <br />
          <RaisedButton label="Add" primary={true} onTouchTap={this.handleSubmit}/>
        </CardText>
      </Card>
    );
  },

  getInitialState: function() {
    return ({owner: '', title: ''});
  },

  onChangeTitle: function(e) {
    this.setState({title : e.target.value});
  },
  onChangeOwner: function(e) {
    this.setState({owner : e.target.value});
  },

  handleSubmit: function() {
    this.props.addBug({owner: this.state.owner, title: this.state.title, status: 'New', priority: 'P1'});
    // clear the form for the next input
    this.state.owner = ""; this.state.title = "";
  }
});

module.exports = BugAdd;
