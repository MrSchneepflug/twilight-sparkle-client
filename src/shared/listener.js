import {locationChange} from "./actions/history";
import Pathname from "./Pathname";
import {selectDeveloper} from "../MobileApp/actions";

export function startListener(history, store) {
  store.dispatch(locationChange({
    pathname: history.location.pathname,
    search: history.location.search,
    hash: history.location.hash
  }));

  history.listen(location => {
    const state = store.getState();
    const previousPathname = new Pathname(state.location.pathname);
    const nextPathname = new Pathname(location.pathname);

    if (previousPathname.matchesEstimationSelection() && nextPathname.matchesDeveloperSelection()) {
      store.dispatch(selectDeveloper(null))
    }

    store.dispatch(locationChange({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    }));
  });
}
