export const createWebsocketMiddleware = client => store => next => action => {
  switch (action.type) {
    case "SELECT_DEVELOPER":
      client.selectDeveloper(action.developer);
      break;
    case "RESET_DEVELOPER_SELECTION":
      client.resetDeveloperSelection();
      break;
    case "SELECT_ESTIMATION":
      client.selectEstimation(action.estimation);
      break;
    default:
      return next(action);
  }
};
