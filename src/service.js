"use strict";

app.factory("DataService", function ($http) {
  const factory = {};

  factory.getMapStats = function () {
    return $http.get(`${BASE_URL}/data.json`);
  };

  return factory;
});
