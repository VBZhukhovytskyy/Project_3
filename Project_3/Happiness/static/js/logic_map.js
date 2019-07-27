function createMap(femaledata, maledata) {

  // Create maps and layers
  var layers = {
    Female: new L.LayerGroup(),
    Male: new L.LayerGroup()
  };

  var myMap = L.map("map", {
    center: [41.7159834, -87.6681192],
    zoom: 10,
    layers: [
      layers.Female,
      layers.Male
    ]
  });

  var overlay = {
    'Female Happiness': layers.Cats,
    'Male Happiness': layers.Dogs
  };
  L.control.layers(null, overlay, { collapsed: false }).addTo(myMap);


  // Add a tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.countries",
    accessToken: MAPBOX_API_KEY
  }).addTo(myMap);

  // scale the marker size based on number of occurences
  var x = d3.scaleLinear().domain([0, 200]).range([10, 25]);

  // Computes the cat counts at each location (total, private, rescue)
  var total_counts = femaledata.reduce(function (r, data) {
    if (!r[data.location]) {
      r[data.location] = { ...data, total: 0, private: 0, rescue: 0 }
    }
    r[data.location].total = ++r[data.location].total || 1;

    return r;
  }, {});
  var coordinates = catdata.reduce(function (r, data) {
    r[data.location] = data.location_data;
    return r;
  }, {});
  var female_counts_by_location = Object.keys(total_counts).map(function (key) {
    return {
      location: key,
      total: total_counts[key].total,
      private: total_counts[key].private,
      coord: coordinates[key]
    };
  });

  // Add markers to Female layer
  for (var i = 0; i < female_counts_by_location.length; i++) {
    var marker = female_counts_by_location[i];
    var marker_item = L.circleMarker(marker.coord, {
      opacity: 0,
      fillColor: "blue",
      fillOpacity: 0.75,
      radius: x(marker.total)
    }).bindPopup("<b>" + marker.location + "</b><br>" + "<hr>"
      + "<b>" + "Total Female(s): " + marker.total + "</b><br>"
       }

  // Computes the male counts at each location 
  var total_counts = maledata.reduce(function (r, data) {
    if (!r[data.location]) {
      r[data.location] = { ...data, total: 0, country: 0 }
    }
    r[data.location].total = ++r[data.location].total || 1;

    return r;
  }, {});
  var coordinates = maledata.reduce(function (r, data) {
    r[data.location] = data.location_data;
    return r;
  }, {});
  var male_counts_by_location = Object.keys(total_counts).map(function (key) {
    return {
      location: key,
      total: total_counts[key].total,
      private: total_counts[key].private,
      rescue: total_counts[key].rescue,
      coord: coordinates[key]
    };
  });
  /
  // Add markers to Male layer
  for (var i = 0; i < male_counts_by_country.length; i++) {
    var marker = male_counts_by_country[i];
    var marker_item = L.circleMarker(marker.coord, {
      opacity: 0,
      fillColor: "green",
      fillOpacity: 0.75,
      radius: x(marker.total)
    }).bindPopup("<b>" + marker.location + "</b><br>" + "<hr>"
      
    marker_item.addTo(layers['Male']);
  }



  var map_desc = d3.select('#map-desc-female')
    .append('p')
    .style("margin-top", 0)
    .style("margin-bottom", 0)

  var map_desc = d3.select('#map-desc-male')
    .append('p')
    .style("margin-top", 0)
    .style("margin-bottom", 10)
}


function countRescuesAndPrivate(happinessdata) {
  var counts_data = d3.nest()
    .key(function (d) {

    })
    .rollup(function (v) {
      return {
      }
    })
    .entries(petdata)
  //console.log(counts_data);
  return counts_data;
}