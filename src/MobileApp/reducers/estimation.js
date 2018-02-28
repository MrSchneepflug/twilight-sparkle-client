export default function estimation(state = null, action) {
  switch (action.type) {
    case "SELECT_ESTIMATION":
      return action.estimation;
    case "RESET_DEVELOPER_SELECTION":
      return null;
    default:
      return state;
  }
}
