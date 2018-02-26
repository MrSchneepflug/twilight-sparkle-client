export function connectToWebsocketServer() {
  return {
    type: "CONNECT"
  }
}

export function selectTeam(team) {
  return {
    type: "SELECT_TEAM",
    team
  }
}

export function resetTeamSelection() {
  return {
    type: "RESET_TEAM_SELECTION"
  }
}

export function selectDeveloper(developer) {
  return {
    type: "SELECT_DEVELOPER",
    developer
  }
}

export function resetDeveloperSelection(previousDeveloper) {
  return {
    type: "RESET_DEVELOPER_SELECTION",
    previousDeveloper
  }
}

export function selectEstimation(estimation) {
  return {
    type: "SELECT_ESTIMATION",
    estimation
  }
}

export function update(state) {
  return {
    type: "UPDATE",
    state
  }
}

export function reset() {
  return {
    type: "RESET"
  }
}
