import {locationChange} from "./actions/history";

export function startListener(history, store) {
  store.dispatch(locationChange({
    pathname: location.pathname,
    search: location.search,
    hash: location.hash
  }));

  history.listen(location => {
    store.dispatch(locationChange({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    }));
  });
}
