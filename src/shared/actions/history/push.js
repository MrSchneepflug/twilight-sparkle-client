export default function push(href) {
  return {
    type: "PUSH",
    payload: href
  }
}
