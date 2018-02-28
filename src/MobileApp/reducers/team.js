export default function team(state = null, action) {
  switch (action.type) {
    case "SELECT_TEAM":
      return action.team;
    case "RESET_TEAM_SELECTION":
      return null;
    default:
      return state;
  }
}
