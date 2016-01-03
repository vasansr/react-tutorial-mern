var React = require('react');
var ReactDOM = require('react-dom');

var Panel = require('react-bootstrap/lib/Panel');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

var BugFilter = React.createClass({
  render: function() {
    console.log("Rendering BugFilter, state=", this.state);
    return (
      <Panel collapsible defaultExpanded={true} header="Filter">
        <Grid fluid={true}>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <Input type="select" label="Priority" value={this.state.priority}
                onChange={this.onChangePriority}>
                <option value="">(Any)</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </Input>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Input type="select" label="Status" value={this.state.status}
                onChange={this.onChangeStatus}>
                <option value="">(Any)</option>
                <option>New</option>
                <option>Open</option>
                <option>Closed</option>
              </Input>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Input label="&nbsp;">
                <ButtonInput value="Search" bsStyle="primary" onClick={this.submit} />
              </Input>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  },

  getInitialState: function() {
    var initFilter = this.props.initFilter;
    return {status: initFilter.status, priority: initFilter.priority};
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.initFilter.status === this.state.status
        && newProps.initFilter.priority === this.state.priority) {
      console.log("BugFilter: componentWillReceiveProps, no change");
      return;
    }
    console.log("BugFilter: componentWillReceiveProps, new filter:", newProps.initFilter);
    this.setState({status: newProps.initFilter.status, priority: newProps.initFilter.priority});
  },

  onChangeStatus: function(e) {
    this.setState({status: e.target.value});
  },
  onChangePriority: function(e) {
    this.setState({priority: e.target.value});
  },

  submit: function(e) {
    var newFilter = {};
    if (this.state.priority) newFilter.priority = this.state.priority;
    if (this.state.status) newFilter.status = this.state.status;
    this.props.submitHandler(newFilter);
  }
});

module.exports = BugFilter;
