class Client {
  constructor(onopen) {
    this.actionHandlers = {};
    this.onopen = onopen;

    this.connection = new WebSocket("ws://localhost:5000");
    this.connection.onopen = this.connectionHandler.bind(this);
    this.connection.onmessage = this.messageHandler.bind(this);
  }

  connectionHandler() {
    this.onopen();
    this.requestUpdate();
  }

  messageHandler(data) {
    const message = JSON.parse(data.data);
    const registeredActions = Object.keys(this.actionHandlers);

    if (registeredActions.indexOf(message.action) === false) {
      return;
    }

    const callback = this.actionHandlers[message.action];
    callback(message.payload);
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

  requestUpdate() {
    this.connection.send(this.createMessage({
      action: "requestUpdate"
    }));
  }

  getOrigin() {
    throw new Error("Please specify an origin for the current implementation");
  }
}

export default Client;
