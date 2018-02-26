export function connectToWebsocketServer() {
  return {
    type: "CONNECT"
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
