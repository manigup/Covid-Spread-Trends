"use strict";

app.controller("Main", function ($scope, DataService) {
  debugger;

  $scope.OnInit = () => {
    DataService.getMapStats().then(
      function (success) {
        debugger;
      },
      function (error) {}
    );
  };

  d3.json("https://www.covid19india.org/mini_maps/india.json").then(function (
    data
  ) {
    var w = 650;
    var h = 650;
    var map = d3
      .select("#svgcontainer")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    var topology = topojson.feature(
      data,
      data.objects["india-states" || "india-districts-2019-734"]
    );
    const projection = d3.geoMercator().fitSize([w, h], topology);
    const path = d3.geoPath(projection);
    var india = map.append("svg:g").attr("id", "india");
    var div = d3.select("#detail");
    india
      .selectAll("path")
      .data(topology.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "#E8010B")
      .attr("fill-opacity", 0.3)
      .attr("stroke", "#E8010B")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 1)
      .on("click", (d, i) => {
        changeMap(d.properties, i);
      })
      .on("mouseleave", function (d, i) {
        d3.select(this)
          .style("stroke", "#E8010B")
          .attr("stroke-opacity", 0.3)
          .attr("stroke-width", 1);
        d3.select(this).transition().duration(300).attr("fill-opacity", 0.3);
        div.text("Details Come Here");
      })
      .on("mouseenter", function (d, i) {
        d3.select(this)
          .style("stroke", "#E8010B")
          .attr("stroke-opacity", 9)
          .attr("stroke-width", 2);
        d3.select(this).transition().duration(300).attr("fill-opacity", 0.2);
        div.text(d.id);
      });
  });
});
