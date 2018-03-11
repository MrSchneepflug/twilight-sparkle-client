export const locationChange = ({ pathname, search, hash }) => ({
  type: "LOCATION_CHANGE",
  pathname,
  search,
  hash
});
