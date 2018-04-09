import React, {Component} from "react";

class Estimation extends Component {
  render() {
    return (
      <tr key={this.props.id}>
        <td>{this.props.developer}</td>
        <td>{this.props.estimation}</td>
      </tr>
    );
  }
}

export default Estimation;
