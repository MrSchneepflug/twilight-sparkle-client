export const createWebsocketMiddleware = client => store => next => action => {
  console.log(client, store);

  switch (action.type) {
    default:
      return next(action);
  }
};
