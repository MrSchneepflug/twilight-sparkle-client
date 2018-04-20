export default function developer(state = null, action) {
  switch (action.type) {
    case "SELECT_DEVELOPER":
      return action.developer;
    default:
      return state;
  }
}
