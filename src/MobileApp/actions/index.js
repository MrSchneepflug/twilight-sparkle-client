export function hasConnected() {
  return {
    type: "HAS_CONNECTED"
  }
}

export function hasSelectedTeam(team) {
  return {
    type: "HAS_SELECTED_TEAM",
    team
  }
}

export function hasResetTeamSelection() {
  return {
    type: "HAS_RESET_TEAM_SELECTION"
  }
}

export function hasSelectedDeveloper(developer) {
  return {
    type: "HAS_SELECTED_DEVELOPER",
    developer
  }
}

export function hasResetDeveloperSelection(previousDeveloper) {
  return {
    type: "HAS_RESET_DEVELOPER_SELECTION",
    previousDeveloper
  }
}

export function hasSelectedEstimation(estimation) {
  return {
    type: "HAS_SELECTED_ESTIMATION",
    estimation
  }
}

export function hasUpdated(state) {
  return {
    type: "HAS_UPDATED",
    state
  }
}

export function hasReset() {
  return {
    type: "HAS_RESET"
  }
}
