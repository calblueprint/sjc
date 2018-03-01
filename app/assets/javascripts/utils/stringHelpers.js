(() => {
  safeTrim = (val) => {
    if (val != undefined) {
        return val.trim()
    }
    return val
  }
})();
