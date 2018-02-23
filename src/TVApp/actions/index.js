export function hasConnected() {
  return {
    type: "HAS_CONNECTED"
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
