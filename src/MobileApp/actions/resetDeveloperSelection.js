export default function resetDeveloperSelection(previousDeveloper) {
  return {
    type: "RESET_DEVELOPER_SELECTION",
    previousDeveloper
  }
}
