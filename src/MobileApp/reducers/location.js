export const initialState = {
  pathname: "/",
  search: "",
  hash: ""
};

export const location = (state = initialState, action) => {
  switch (action.type) {
    case "LOCATION_CHANGE":
      return {
        ...state,
        pathname: action.pathname,
        search: action.search,
        hash: action.hash
      };
    default:
      return state;
  }
};
