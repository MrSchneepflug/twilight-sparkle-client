export default function developer(state = null, action) {
  switch (action.type) {
    case "SELECT_DEVELOPER":
      return action.developer;
    case "RESET_DEVELOPER_SELECTION":
      return null;
    default:
      return state;
  }
}
