import React, { Component } from "react";
import { Avatar, ListItem, ListItemText } from "material-ui";
import { connect } from "react-redux";
import { selectDeveloper } from "../../actions";

class Developer extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if (this.props.isDeveloperSelected) {
      return;
    }

    this.props.selectDeveloper(this.props.name);
  }

  render() {
    const isDeveloperSelected =
      this.props.selectedDevelopers.indexOf(this.props.name) !== -1;

    return (
      <ListItem key={this.props.name} onClick={this.clickHandler} disabled={isDeveloperSelected}>
        <Avatar>{this.props.name[0] + this.props.name[1]}</Avatar>
        <ListItemText primary={this.props.name} secondary={isDeveloperSelected ? 'already selected' : 'available'}/>
      </ListItem>
    );
  }
}

const mapStateToProps = state => ({
  developer: state.developer,
  selectedDevelopers: state.selectedDevelopers
});


const mapDispatchToProps = dispatch => ({
  selectDeveloper: developer => dispatch(selectDeveloper(developer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Developer);
