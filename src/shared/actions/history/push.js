export default function push({pathname, search, hash}) {
  return {
    type: "PUSH",
    payload: {
      pathname,
      search,
      hash
    }
  }
}
