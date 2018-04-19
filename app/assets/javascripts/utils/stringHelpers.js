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
  mapTypeOfCaseToInt = (type_of_case) => {
    switch (type_of_case) {
      case "immigration":
        return 0;
        break;
      case "criminal":
        return 1;
        break;
      case "civil_rights":
        return 2;
        break;
    }
  }
})();
