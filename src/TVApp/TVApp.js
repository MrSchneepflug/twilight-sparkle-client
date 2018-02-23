import React, {Component} from 'react';

import TVClient from "../Websocket/TVClient";
import Developer from "./Developer";

class TVApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      estimationsByDeveloper: {}
    };

    this.client = new TVClient(() => {
      this.setState({
        connected: true
      });
    });

    this.client.on("update", (payload) => {
      const estimationsByDeveloper = payload.state;

      this.setState({
        estimationsByDeveloper
      });
    });

    this.client.on("reset", () => {
      this.setState({
        estimationsByDeveloper: {}
      });
    });
  }

  render() {
    let developerRows = Object.keys(this.state.estimationsByDeveloper).map(developerName => {
      return (
        <Developer name={developerName} estimation={this.state.estimationsByDeveloper[developerName]} key={developerName}/>
      );
    });

    return (
      <table>
        <tbody>
        <tr>
          <td>Developer</td>
          <td>Estimation</td>
        </tr>
        {developerRows}
        </tbody>
      </table>
    );
  }
}

export default TVApp;
