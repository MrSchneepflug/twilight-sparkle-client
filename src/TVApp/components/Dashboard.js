import React, {Component} from "react";
import {connect} from "react-redux";
import Developer from "./Developer";

class Dashboard extends Component {
  renderDeveloperRows() {
    return Object.keys(this.props.estimationsByDeveloper).map(developerName => {
      return (
        <Developer
          name={developerName}
          estimation={this.props.estimationsByDeveloper[developerName]}
          key={developerName}
        />
      );
    });
  }

  render() {
    return (
      <table>
        <tbody>
        <tr>
          <td>Developer</td>
          <td>Estimation</td>
        </tr>
        {this.renderDeveloperRows()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  estimationsByDeveloper: state.estimationsByDeveloper
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
