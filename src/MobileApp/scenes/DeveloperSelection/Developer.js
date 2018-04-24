import React, {Component} from "react";
import {Avatar, ListItem, ListItemText} from "material-ui";
import {connect} from "react-redux";
import {find} from "lodash";
import {push} from "../../../shared/actions/history";
import {selectDeveloper} from "../../actions";

class Developer extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if (this.props.isDeveloperSelected) {
      return;
    }

    this.props.selectDeveloper(this.props.pathname, this.props.name);
  }

  render() {
    const isDeveloperSelected = find(this.props.clients, client => client.developer === this.props.name) !== undefined;

    return (
      <ListItem key={this.props.name} onClick={!isDeveloperSelected ? this.clickHandler : undefined}
                disabled={isDeveloperSelected}>
        <Avatar>{this.props.name[0] + this.props.name[1]}</Avatar>
        <ListItemText primary={this.props.name} secondary={isDeveloperSelected ? 'already selected' : 'available'}/>
      </ListItem>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.location.pathname,
  clients: state.clients
});


const mapDispatchToProps = dispatch => ({
  selectDeveloper: (pathname, developer) => {
    dispatch(push({pathname: "/estimations"}));
    dispatch(selectDeveloper(developer));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Developer);
