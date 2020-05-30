"use strict";

var app = angular.module("spread_trend", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    templateUrl: "template/main.html",
    controller: "Main",
  });
  $locationProvider.html5Mode(true);
});
