export default function locationChange({pathname, search, hash}) {
  return {
    type: "LOCATION_CHANGE",
    payload: {
      pathname,
      search,
      hash
    }
  }
};
