export default function clients(state = [], action) {
  switch (action.type) {
    case "UPDATE":
      return action.state;
    default:
      return state;
  }
}
