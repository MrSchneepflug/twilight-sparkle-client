import {filter, map, remove} from "lodash";

export default function clients(state = [], action) {
  switch (action.type) {
    case "UPDATE":
      return action.state;
    case "RESET_DEVELOPER_SELECTION":
      let clients = [...state];
      remove(clients, client => client.developer === action.previousDeveloper);
      return clients;
    default:
      return state;
  }
}
