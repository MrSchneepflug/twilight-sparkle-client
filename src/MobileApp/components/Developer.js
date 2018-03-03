import React, {Component} from "react";
import {connect} from "react-redux";
import {selectDeveloper} from "../actions";

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
    const style = {
      textAlign: "center",
      padding: "20px"
    };

    return (
      <div style={style} onClick={this.clickHandler}>
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
  selectDeveloper: developer => dispatch(selectDeveloper(developer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Developer);
