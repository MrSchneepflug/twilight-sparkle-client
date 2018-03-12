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
        ...action.payload
      };
    default:
      return state;
  }
};
