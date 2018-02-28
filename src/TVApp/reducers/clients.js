export default function clients(state = [], action) {
  switch (action.type) {
    case "UPDATE":
      return action.state;
    case "RESET":
      return [];
    default:
      return state;
  }
}
