export const createWebsocketMiddleware = client => store => next => action => {
  switch (action.type) {
    case "SELECT_DEVELOPER":
      client.selectDeveloper(action.developer);
      break;
    case "SELECT_ESTIMATION":
      if (action.updateServerState) {
        client.selectEstimation(action.estimation);
      }
      break;
  }

  return next(action);
};
