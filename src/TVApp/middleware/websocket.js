export const createWebsocketMiddleware = client => store => next => action => {
  switch (action.type) {
    case "RESET_ESTIMATIONS":
      client.resetEstimations();
      break;
    case "REVEAL_ESTIMATIONS":
      client.revealEstimations();
      break;
  }

  return next(action);
};
