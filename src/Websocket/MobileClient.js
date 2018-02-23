import Client from "./Client";

class MobileClient extends Client
{
  getOrigin() {
    return "mobile";
  }

  selectDeveloper(developerName) {
    this.connection.send(this.createMessage({
      action: "selectDeveloper",
      name: developerName
    }));
  }

  resetDeveloperSelection(developerName) {
    this.connection.send(this.createMessage({
      action: "resetDeveloperSelection",
      name: developerName
    }));
  }

  selectEstimation(developerName, estimation) {
    this.connection.send(this.createMessage({
      action: "selectEstimation",
      name: developerName,
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
