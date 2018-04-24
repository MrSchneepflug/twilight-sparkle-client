import React, {Component} from "react";
import {Avatar, Badge} from "material-ui";
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

    let avatar = <Avatar className={avatarClass}>{this.props.developer || "?"}</Avatar>;

    if (this.props.showEstimation) {
      avatar = (
        <Badge badgeContent={this.props.estimation || "?"} color="primary">
          <Avatar className={avatarClass}>{this.props.developer || "?"}</Avatar>
        </Badge>
      );
    }

    return(
      <div className={this.props.classes.container}>
        {avatar}
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