(() => {
  safeTrim = (val) => {
    if (val != undefined) {
        return String(val).trim()
    }
    return val
  }
  showValue = (val) => {
    if (val && val != undefined && !String(val).includes('undefined')) {
        return safeTrim(val)
    } else {
        return "No Information"
    }
  }
})();
