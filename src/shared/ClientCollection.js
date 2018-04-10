import {map, find} from "lodash";

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
    return Math.min(...map(this.clients, "estimation"));
  }

  highestEstimation() {
    return Math.max(...map(this.clients, "estimation"));
  }

  clientWithLowestEstimation() {
    return this.findClientByEstimation(this.lowestEstimation());
  }

  clientWithHighestEstimation() {
    return this.findClientByEstimation(this.highestEstimation());
  }

  findClientByEstimation(estimation) {
    return find(this.clients, client => client.estimation === estimation);
  }
}

export default ClientCollection;
