export default function selectEstimation(estimation, updateServerState = true) {
  return {
    type: "SELECT_ESTIMATION",
    estimation,
    updateServerState
  }
}
