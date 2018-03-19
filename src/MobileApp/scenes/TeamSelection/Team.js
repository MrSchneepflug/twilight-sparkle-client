import React, { Component } from "react";
import { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { connect } from "react-redux";
import { selectTeam } from "../../actions";
import { push } from "../../../shared/actions/history";

class Team extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.selectTeam(this.props.name);
  }

  render() {
    return (
      <ListItem key={this.props.name} onClick={this.clickHandler}>
        <Avatar>{this.props.name[0]}</Avatar>
        <ListItemText primary={this.props.name} />
      </ListItem>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  selectTeam: team => {
    dispatch(selectTeam(team));
    dispatch(push({ pathname: "/developers", search: `?team=${team}` }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
