export const createWebsocketMiddleware = client => store => next => action => {
  switch (action.type) {
    case "RESET_ESTIMATIONS":
      client.resetEstimations();
      break;
  }

  return next(action);
};