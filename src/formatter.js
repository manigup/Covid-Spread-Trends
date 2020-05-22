app.filter("timeStamp", function () {
  return function (date) {
    if (date) {
      return date.split(" ")[0];
    }
  };
});
