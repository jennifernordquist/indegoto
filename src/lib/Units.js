export default {
  getTempInF: function (tempInK) {
    return tempInK * 9 / 5 - 459.67;
  },
  getSpeedInMPH: function (speedInMPS) {
    return speedInMPS * 2.2369;
  }
};