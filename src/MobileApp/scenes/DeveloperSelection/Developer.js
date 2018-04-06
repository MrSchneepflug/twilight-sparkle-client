import React, {Component} from "react";
import {Avatar, ListItem, ListItemText} from "material-ui";
import {connect} from "react-redux";
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
    const isDeveloperSelected =
      this.props.selectedDevelopers.indexOf(this.props.name) !== -1;

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
  selectedDevelopers: state.selectedDevelopers
});


const mapDispatchToProps = dispatch => ({
  selectDeveloper: (pathname, developer) => {
    dispatch(push({pathname: `${pathname}/${developer}/estimation`}));
    dispatch(selectDeveloper(developer));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Developer);
