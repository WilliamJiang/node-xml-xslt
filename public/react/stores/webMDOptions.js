var webMDOptions = Hoverboard({
  init: function (state, otpions) {
    return options;
  },
  check: function (state, value) {
    return state.map(function (option) {
      return {
        value: option.value,
        label: option.label,
        checked: option.value === value
      };
    });
  }
});


webMDOptions.init([
  {value: '', label: '', checked: false}
]);
