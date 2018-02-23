import React, {Component} from "react";
import {connect} from "react-redux";
import {hasSelectedDeveloper} from "./actions/index";

class Developer extends Component {
  render() {
    const style = {
      textAlign: "center",
      padding: "20px"
    };

    const clickHandler = this.props.isDeveloperSelected
      ? () => {}
      : () => this.props.hasSelectedDeveloper(this.props.name);

    return (
      <div style={style} onClick={clickHandler}>
        <strong>
          {this.props.name}
          {this.props.isDeveloperSelected && !this.props.isSelf ? " (selected)" : ""}
        </strong>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  hasSelectedDeveloper: developer => dispatch(hasSelectedDeveloper(developer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Developer);
