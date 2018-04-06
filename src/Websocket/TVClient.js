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
}

export default TVClient;
