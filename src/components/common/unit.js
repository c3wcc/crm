const unit = {
  getTheme: (ref) => {
    return ref.$store.state.isSet?ref.$store.state.theme:'theme-color-defualt'
  },
  time: {
    toComponent: () => {

    },
    toInterface: () => {

    },
  }
}
export default unit