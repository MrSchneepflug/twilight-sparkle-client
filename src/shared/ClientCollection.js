class ClientCollection {
  constructor(clients) {
    this.clients = clients;
  }

  haveEstimated() {
    return this.clients.reduce((result, client) => result && client.estimation, true);
  }
}

export default ClientCollection;
