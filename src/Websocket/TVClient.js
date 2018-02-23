import Client from "./Client";

class TVClient extends Client
{
  getOrigin() {
    return "tv";
  }
}

export default TVClient;
