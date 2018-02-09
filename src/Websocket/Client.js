class Client {
  constructor(onopen) {
    this.actionHandlers = {};

    this.connection = new WebSocket("ws://localhost:5000");
    this.connection.onopen = onopen;
    this.connection.onmessage = this.messageHandler.bind(this);
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

  createMessage(payload) {
    return JSON.stringify({
      origin: "mobile-device",
      payload
    });
  }
}

export default Client;
