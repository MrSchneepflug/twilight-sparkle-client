class Client {
  constructor() {
    this.actionHandlers = {};
  }

  connect() {
    this.connection = new WebSocket("ws://localhost:5000");
    this.connection.onopen = this.connectionHandler.bind(this);
    this.connection.onmessage = this.messageHandler.bind(this);
  }

  connectionHandler() {
    if (typeof this.actionHandlers.open === "function") {
      this.actionHandlers.open();
    }

    this.initialize();
  }

  messageHandler(data) {
    const message = JSON.parse(data.data);
    const registeredActions = Object.keys(this.actionHandlers);

    if (registeredActions.indexOf(message.action) === false) {
      return;
    }

    const callback = this.actionHandlers[message.action];
    callback(message.state);
  }

  on(action, callback) {
    this.actionHandlers[action] = callback;
  }

  createMessage(payload) {
    return JSON.stringify({
      origin: this.getOrigin(),
      payload
    });
  }

  initialize() {
    throw new Error("Please specify an initialization method for the current implementation");
  }

  getOrigin() {
    throw new Error("Please specify an origin for the current implementation");
  }
}

export default Client;
