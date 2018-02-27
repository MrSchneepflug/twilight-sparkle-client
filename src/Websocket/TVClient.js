import Client from "./Client";

class TVClient extends Client
{
  getOrigin() {
    return "tv";
  }

  initialize() {
    this.connection.send(this.createMessage({
      action: "requestUpdate"
    }));
  }
}

export default TVClient;
