import Pathname from "../shared/Pathname";
import {selectDeveloper, selectEstimation} from "./actions";

export function startListener(history, store) {
  history.listen(location => {
    const state = store.getState();
    const previousPathname = new Pathname(state.location.pathname);
    const nextPathname = new Pathname(location.pathname);

    if (previousPathname.matchesEstimationSelection() && nextPathname.matchesDeveloperSelection()) {
      store.dispatch(selectDeveloper(null));
      store.dispatch(selectEstimation(null));
    }
  });
}