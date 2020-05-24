"use strict";

app.controller("Main", function ($scope, DataService) {
  let statsData = {};
  let statesTestData = {};
  let stateDistrict = {};
  let india;
  const w = 650;
  const h = 650;
  $scope.viewType = "states";
  $scope.mapType = "India";
  $scope.caseType = "confirmed";

  const getTotalStatsState = (data) => {
    $scope.totalStatsData = data.statewise[0];
    $scope.totalTested =
      statsData.tested[data.tested.length - 1].totalsamplestested;
    $scope.totalTestedTimestamp =
      statsData.tested[data.tested.length - 1].updatetimestamp;
  };

  const getTotalStatsDistrict = () => {
    $scope.totalStatsData = statsData.statewise.find(
      (item) => item.state === $scope.mapType
    );
  };

  const fillStates = (d) => {
    const max = Math.max.apply(
      null,
      statsData.statewise.map(function (item) {
        return parseInt(item[$scope.caseType]);
      })
    );
    const state = statsData.statewise.find((item) => item.state === d.id);
    return {
      max: max,
      ...state,
    };
  };

  const fillDistricts = () => {
    const district = stateDistrict[$scope.mapType].districtData;
    const districts = Object.keys(district).map((i) => district[i]);
    const max = Math.max.apply(
      null,
      districts.map(function (item) {
        return parseInt(item[$scope.caseType]);
      })
    );
    return {
      max: max,
      ...district,
    };
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
      case "deceased":
        return "#6c757d";
      default:
        return;
    }
  };

  $scope.OnInit = () => {
    DataService.getMapStats().then(
      function (success) {
        statsData = success.data;
        getTotalStatsState(statsData);
        drawMap();
      },
      function (error) {}
    );

    DataService.getStateDistrictWiseData().then(
      function (success) {
        stateDistrict = success.data;
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
    if ($scope.viewType === "states") {
      india
        .selectAll("path")
        .style("fill", function (d) {
          const fill = fillStates(d);
          const color = d3
            .scaleSequential()
            .domain([0, fill.max])
            .interpolator(SCALE_COLORS[$scope.caseType]);
          return color(parseInt(fill[$scope.caseType]));
        })
        .attr("stroke", $scope.caseColor($scope.caseType));
    } else {
      india
        .selectAll("path")
        .style("fill", function (d) {
          const fill = fillDistricts(d);
          const color = d3
            .scaleSequential()
            .domain([0, fill.max === 0 ? 1 : fill.max])
            .interpolator(SCALE_COLORS[$scope.caseType]);
          return color(parseInt(fill[d.properties.district][$scope.caseType]));
        })
        .attr("stroke", $scope.caseColor($scope.caseType));
    }
  };

  const changeMap = () => {
    d3.select("#map-explorer").html("");
    d3.json(
      "https://www.covid19india.org" + MAP_META[$scope.mapType].geoDataFile
    ).then(function (data) {
      let map = d3
        .select("#map-explorer")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("filter", "saturate(2)")
        .attr("viewBox", `0 0 ${w} ${h}`);
      const topology = topojson.feature(
        data,
        data.objects[MAP_META[$scope.mapType].graphObjectDistricts]
      );
      const projection = d3.geoMercator().fitSize([w, h], topology);
      const path = d3.geoPath(projection);
      india = map.append("svg:g").attr("id", $scope.mapType);
      var div = d3.select("#detail");
      india
        .selectAll("path")
        .data(topology.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("cursor", "pointer")
        .style("fill", function (d) {
          const fill = fillDistricts(d);
          const color = d3
            .scaleSequential()
            .domain([0, fill.max === 0 ? 1 : fill.max])
            .interpolator(SCALE_COLORS[$scope.caseType]);
          return color(parseInt(fill[d.properties.district][$scope.caseType]));
        })
        .attr("stroke", $scope.caseColor($scope.caseType))
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1)
        .on("mouseleave", function () {
          d3.select(this).attr("stroke-opacity", 1).attr("stroke-width", 1);
          div.text("Total");
          getTotalStatsDistrict();
          $scope.$apply();
        })
        .on("mouseenter", function (d) {
          div.text(d.properties.district);
          d3.select(this).attr("stroke-opacity", 9).attr("stroke-width", 3);
          $scope.totalStatsData =
            stateDistrict[$scope.mapType].districtData[d.properties.district];
          $scope.$apply();
        });
    });
  };

  $scope.drawStatesMap = () => {
    $scope.viewType = "states";
    $scope.mapType = "India";
    $scope.caseType =
      $scope.caseType === "deceased" ? "deaths" : $scope.caseType;
    getTotalStatsState(statsData);
    drawMap();
  };

  const drawMap = () => {
    d3.select("#map-explorer").html("");
    d3.json("https://www.covid19india.org/mini_maps/india.json").then(function (
      data
    ) {
      let map = d3
        .select("#map-explorer")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("filter", "saturate(2)")
        .attr("viewBox", `0 0 ${w} ${h}`);
      const topology = topojson.feature(
        data,
        data.objects["india-states" || "india-districts-2019-734"]
      );
      const projection = d3.geoMercator().fitSize([w, h], topology);
      const path = d3.geoPath(projection);
      india = map.append("svg:g").attr("id", $scope.mapType);
      var div = d3.select("#detail");
      india
        .selectAll("path")
        .data(topology.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("cursor", "pointer")
        .style("fill", function (d) {
          const fill = fillStates(d);
          const color = d3
            .scaleSequential()
            .domain([0, fill.max])
            .interpolator(SCALE_COLORS[$scope.caseType]);
          return color(parseInt(fill[$scope.caseType]));
        })
        .attr("stroke", $scope.caseColor($scope.caseType))
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1)
        .on("click", (d) => {
          div.text("Total");
          $scope.viewType = "district";
          $scope.mapType = d.properties.st_nm;
          $scope.caseType =
            $scope.caseType === "deaths" ? "deceased" : $scope.caseType;
          $scope.$apply();
          changeMap();
        })
        .on("mouseleave", function () {
          d3.select(this).attr("stroke-opacity", 1).attr("stroke-width", 1);
          div.text("Total");
          getTotalStatsState(statsData);
          $scope.$apply();
        })
        .on("mouseenter", function (d) {
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
  };
});
