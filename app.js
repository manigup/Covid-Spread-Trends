"use strict";

var app = angular.module("spread_trend", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/src/template/main.html",
      controller: "Main",
    })
    .otherwise({
      templateUrl: "/src/template/404.html"
    });
  $locationProvider.html5Mode(true);
});
