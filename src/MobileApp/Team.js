import React, {Component} from "react";
import {connect} from "react-redux";
import selectTeam from "./actions/selectTeam";

class Team extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.selectTeam(this.props.name);
  }

  render() {
    const style = {
      textAlign: "center",
      padding: "20px"
    };

    return (
      <div style={style} onClick={this.clickHandler}>
        <strong>{this.props.name}</strong>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  selectTeam: team => dispatch(selectTeam(team))
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
