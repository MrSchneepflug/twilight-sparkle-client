import {map} from "lodash";

class ClientCollection {
  constructor(clients) {
    this.clients = clients;
  }

  haveEstimated() {
    return this.clients.reduce((result, client) => result && client.estimation, true);
  }

  haveEstimatedCloseEnough() {
    return !this.haveEstimatedWithinHighRange();
  }

  haveEstimatedWithinHighRange() {
    const estimations = map(this.clients, "estimations");
    const lowestEstimation = Math.min(...estimations);
    const highestEstimation = Math.max(...estimations);

    return highestEstimation - lowestEstimation > 2;
  }
}

export default ClientCollection;
