import Client from "./Client";

class MobileClient extends Client {
  getOrigin() {
    return "mobile";
  }

  initialize() {
    this.connection.send(this.createMessage({
      action: "initialize"
    }));
  }

  selectDeveloper(developerName) {
    this.connection.send(this.createMessage({
      action: "selectDeveloper",
      name: developerName
    }));
  }

  resetDeveloperSelection() {
    this.connection.send(this.createMessage({
      action: "resetDeveloperSelection"
    }));
  }

  selectEstimation(estimation) {
    this.connection.send(this.createMessage({
      action: "selectEstimation",
      estimation
    }));
  }

  reset() {
    this.connection.send(this.createMessage({
      action: "reset"
    }));
  }
}

export default MobileClient;
