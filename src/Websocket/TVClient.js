import Client from "./Client";

class TVClient extends Client {
  getOrigin() {
    return "tv";
  }

  initialize() {
    this.connection.send(this.createMessage({
      action: "requestState"
    }));
  }

  resetEstimations() {
    this.connection.send(this.createMessage({
      action: "resetEstimations"
    }));
  }
}

export default TVClient;
