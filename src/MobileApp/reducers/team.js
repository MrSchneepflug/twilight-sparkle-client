export default function team(state = null, action) {
  switch (action.type) {
    case "SELECT_TEAM":
      return action.team;
    default:
      return state;
  }
}
