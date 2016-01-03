var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var RaisedButton = require('material-ui/lib/raised-button');
var FlatButton = require('material-ui/lib/flat-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var CardText = require('material-ui/lib/card/card-text');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var TextField = require('material-ui/lib/text-field');
var Snackbar = require('material-ui/lib/snackbar');

var BugEdit = React.createClass({
  render: function() {
    return (
      <div style={{maxWidth: 800}}>
        <Card>
          <CardHeader title="Edit Bug" subtitle={this.props.params.id}
            avatar={
              <Avatar backgroundColor={Colors.teal500} icon={
                <FontIcon className="fa fa-bug"></FontIcon>
              }>
              </Avatar>
            } />
          <CardText>
            <SelectField fullWidth={true} value={this.state.priority} onChange={this.onChangePriority}
              floatingLabelText="Priority">
              <MenuItem value="P1" primaryText="P1" />
              <MenuItem value="P2" primaryText="P2" />
              <MenuItem value="P3" primaryText="P3" />
            </SelectField>
            <br/>
            <SelectField fullWidth={true} value={this.state.status} onChange={this.onChangeStatus}
              floatingLabelText="Status">
              <MenuItem value="New" primaryText="New" />
              <MenuItem value="Open" primaryText="Open" />
              <MenuItem value="Closed" primaryText="Closed" />
            </SelectField>
            <br/>
            <TextField fullWidth={true} floatingLabelText="Bug Title" multiLine={true}
              value={this.state.title} onChange={this.onChangeTitle}/>
            <br/>
            <TextField fullWidth={true} floatingLabelText="Owner"
              value={this.state.owner} onChange={this.onChangeOwner}/>
            <br/>
            <RaisedButton label="Save" primary={true} onTouchTap={this.submit} />
            <FlatButton label="Back to Bug List" linkButton={true} href="/#/bugs"
              style={{verticalAlign: 'top'}}/>
            <Snackbar open={this.state.successVisible} message="Changes saved, thank you."
              autoHideDuration={5000} action="ok" onActionTouchTap={this.dismissSuccessMessage}
              onRequestClose={this.dismissSuccessMessage} />
          </CardText>
        </Card>
      </div>
    );
  },

  getInitialState: function() {
    return {successVisible: false};
  },

  componentDidMount: function() {
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    console.log("BugEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
    if (this.props.params.id != prevProps.params.id) {
      this.loadData();
    }
  },

  loadData: function() {
    $.ajax('/api/bugs/' + this.props.params.id) .done(function(bug) {
      this.setState(bug);
    }.bind(this));
  },

  onChangePriority: function(e, i, value) {
    this.setState({priority: value});
  },
  onChangeStatus: function(e, i, value) {
    this.setState({status: value});
  },
  onChangeOwner: function(e) {
    this.setState({owner: e.target.value});
  },
  onChangeTitle: function(e) {
    this.setState({title: e.target.value});
  },

  showSuccessMessage: function() {
    this.setState({successVisible: true});
  },
  dismissSuccessMessage: function() {
    this.setState({successVisible: false});
  },

  submit: function() {
    var bug = {
      status: this.state.status,
      priority: this.state.priority,
      owner: this.state.owner,
      title: this.state.title
    }

    $.ajax({
      url: '/api/bugs/' + this.props.params.id, type: 'PUT', contentType:'application/json',
      data: JSON.stringify(bug),
      dataType: 'json',
      success: function(bug) {
        this.setState(bug);
        this.showSuccessMessage();
      }.bind(this),
    });
  }
});

module.exports = BugEdit;
