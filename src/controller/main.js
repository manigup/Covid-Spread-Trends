"use strict";

app.controller("Main", function ($scope, DataService) {
  let statsData = {};
  let statesTestData = {};
  let india;
  $scope.caseType = "confirmed";

  function getTotalStats(data) {
    $scope.totalStatsData = data.statewise[0];
    $scope.totalTested =
      statsData.tested[data.tested.length - 1].totalsamplestested;
    $scope.totalTestedTimestamp =
      statsData.tested[data.tested.length - 1].updatetimestamp;
  }

  const colorInterpolator = (caseType, t) => {
    switch (caseType) {
      case "confirmed":
        return d3.interpolateReds(t);
      case "active":
        return d3.interpolateBlues(t * 0.85);
      case "recovered":
        return d3.interpolateGreens(t * 0.85);
      case "deaths":
        return d3.interpolateGreys(t * 0.85);
      default:
        return;
    }
  };

  $scope.caseColor = (caseType) => {
    switch (caseType) {
      case "confirmed":
        return "#ff073a";
      case "active":
        return "#007bff";
      case "recovered":
        return "#28a745";
      case "deaths":
        return "#6c757d";
      default:
        return;
    }
  };

  const colorShade = (number) => {
    if (number <= 400) {
      return 0.1;
    } else if (number <= 1000) {
      return 0.2;
    } else if (number <= 3000) {
      return 0.3;
    } else if (number <= 10000) {
      return 0.4;
    } else if (number <= 20000) {
      return 0.6;
    } else {
      return 0.8;
    }
  };

  $scope.OnInit = () => {
    DataService.getMapStats().then(
      function (success) {
        statsData = success.data;
        getTotalStats(statsData);
        drawMap();
      },
      function (error) {}
    );

    DataService.getStatesTestData().then(
      function (success) {
        statesTestData = success.data.states_tested_data;
      },
      function (error) {}
    );
  };

  $scope.mapStatsClick = (evt, type) => {
    $scope.caseType = type;
    const children = angular.element(evt.currentTarget).parent().children();
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("focused");
    }
    evt.currentTarget.classList.add("focused");
    india.selectAll("path").style("fill", function (d, i) {
      let state = statsData.statewise.find((item) => item.state === d.id);
      return colorInterpolator(
        $scope.caseType,
        colorShade(parseInt(state[$scope.caseType]))
      );
    }).attr("stroke", $scope.caseColor($scope.caseType));
  };

  function drawMap() {
    d3.json("https://www.covid19india.org/mini_maps/india.json").then(function (
      data
    ) {
      var w = 650;
      var h = 650;
      var map = d3
        .select("#map-explorer")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
      const topology = topojson.feature(
        data,
        data.objects["india-states" || "india-districts-2019-734"]
      );
      const projection = d3.geoMercator().fitSize([w, h], topology);
      const path = d3.geoPath(projection);
      india = map.append("svg:g").attr("id", "india");
      var div = d3.select("#detail");
      india
        .selectAll("path")
        .data(topology.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("cursor", "pointer")
        .style("fill", function (d, i) {
          let state = statsData.statewise.find((item) => item.state === d.id);
          return colorInterpolator(
            $scope.caseType,
            colorShade(parseInt(state[$scope.caseType]))
          );
        })
        .attr("stroke", $scope.caseColor($scope.caseType))
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1)
        .on("click", (d, i) => {
          changeMap(d.properties, i);
        })
        .on("mouseleave", function (d, i) {
          d3.select(this).attr("stroke-opacity", 1).attr("stroke-width", 1);
          div.text("Total");
          getTotalStats(statsData);
          $scope.$apply();
        })
        .on("mouseenter", function (d, i) {
          d3.select(this).attr("stroke-opacity", 9).attr("stroke-width", 3);
          div.text(d.id);
          $scope.totalStatsData = statsData.statewise.find(
            (item) => item.state === d.id
          );
          const totalTested = statesTestData.filter(
            (item) => item.state === d.id
          );
          $scope.totalTested = totalTested[totalTested.length - 1].totaltested;
          $scope.totalTestedTimestamp =
            totalTested[totalTested.length - 1].updatedon;
          $scope.$apply();
        });
    });
  }
});
