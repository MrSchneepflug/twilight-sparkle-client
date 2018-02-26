import {remove} from "lodash";

export default function selectedDevelopers(state = [], action) {
  switch (action.type) {
    case "UPDATE":
      return Object.keys(action.state);
    case "RESET_DEVELOPER_SELECTION":
      let selectedDevelopers = [...state];
      remove(selectedDevelopers, selectedDeveloper => selectedDeveloper === action.previousDeveloper);
      return selectedDevelopers;
      break;
    case "RESET":
      return [];
    default:
      return state;
  }
}
