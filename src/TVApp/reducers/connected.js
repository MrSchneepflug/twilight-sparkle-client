export default function connected(state = false, action) {
  switch (action.type) {
    case "CONNECT":
      return true;
    default:
      return state;
  }
}
