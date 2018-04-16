import React, {Component} from "react";
import {Avatar} from "material-ui";
import {withStyles} from "material-ui/styles";

class Client extends Component {
  render() {
    let avatarClass = null;

    if (this.props.developer) {
      if (this.props.estimation) {
        avatarClass = this.props.classes.avatarWithEstimation;
      } else {
        avatarClass = this.props.classes.avatarWithSelectedDeveloper;
      }
    }

    return(
      <div className={this.props.classes.container}>
        <Avatar className={avatarClass}>{this.props.developer ? this.props.developer : "?"}</Avatar>
        <span>{this.props.estimation ? this.props.estimation : "?"}</span>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: "10px"
  },
  avatarWithSelectedDeveloper: {
    backgroundColor: "#2196F3"
  },
  avatarWithEstimation: {
    backgroundColor: "#4CAF50"
  }
};

export default withStyles(styles)(Client);