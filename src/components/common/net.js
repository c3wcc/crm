const net = {
  async get (url, param, ref, loading, defaultData) {
    let ret = defaultData
    try {
      url, param, loading
    } catch (error) {
      ref
    }
    return ret
  },
  async post (url, param, ref, loading, defaultData) {
    let ret = defaultData
    try {
      url, param, loading
    } catch (error) {
      ref
    }
    return ret
  },
}
export default net