import Pathname from "../../shared/Pathname";

export const createWebsocketMiddleware = client => store => next => action => {
  const state = store.getState();
  const pathname = new Pathname(state.location.pathname);

  if (pathname.matchesDeveloperSelection()) {
    client.resetDeveloperSelection();
  }

  if (pathname.matchesEstimationSelection()) {
    client.selectDeveloper(pathname.extractDeveloper());
  }

  if (action.type === "SELECT_ESTIMATION") {
    client.selectEstimation(action.estimation);
  }

  return next(action);
};
