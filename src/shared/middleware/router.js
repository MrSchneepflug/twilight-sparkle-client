export const routerMiddleware = history => () => next => action => {
  switch (action.type) {
    case "PUSH":
      history.push({
        href: action.href
      });
      break;
    case "REPLACE":
      history.replace({
        href: action.href
      });
      break;
    case "GO":
      history.go({
        index: action.index
      });
      break;
    case "GO_BACK":
      history.goBack();
      break;
    case "GO_FORWARD":
      history.goForward();
      break;
    default:
      return next(action);
  }
};
