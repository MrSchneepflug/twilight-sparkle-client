export default function estimation(state = null, action) {
  switch (action.type) {
    case "SELECT_ESTIMATION":
      return action.estimation;
    default:
      return state;
  }
}
