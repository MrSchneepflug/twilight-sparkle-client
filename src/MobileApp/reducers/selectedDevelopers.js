import {filter, map, remove} from "lodash";

export default function selectedDevelopers(state = [], action) {
  switch (action.type) {
    case "UPDATE":
      return filter(map(action.state, "developer"));
    case "RESET_DEVELOPER_SELECTION":
      let selectedDevelopers = [...state];
      remove(selectedDevelopers, selectedDeveloper => selectedDeveloper === action.previousDeveloper);
      return selectedDevelopers;
    default:
      return state;
  }
}
