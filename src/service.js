"use strict";

app.factory("DataService", function ($http) {
  const factory = {};

  factory.getMapStats = async function () {
    return await $http.get(`${BASE_URL}/data.json`);
  };

  factory.getStatesTestData = async function () {
    return await $http.get(`${BASE_URL}/state_test_data.json`);
  };

  factory.getStateDistrictWiseData = async function () {
    return await $http.get(`${BASE_URL}/state_district_wise.json`);
  };

  return factory;
});
