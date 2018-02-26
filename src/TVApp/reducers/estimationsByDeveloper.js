export default function estimationsByDeveloper(state = {}, action) {
  switch (action.type) {
    case "UPDATE":
      return action.state;
    case "RESET":
      return {};
    default:
      return state;
  }
}
