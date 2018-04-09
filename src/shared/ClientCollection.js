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
    return this.highestEstimation() - this.lowestEstimation() > 2;
  }

  lowestEstimation() {
    return Math.min(...map(this.clients, "estimations"));
  }

  highestEstimation() {
    return Math.max(...map(this.clients, "estimations"));
  }
}

export default ClientCollection;
