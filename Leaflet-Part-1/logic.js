// Creating the map object
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// The function that will determine the color of a neighborhood based on the borough that it belongs to
function getColor(depth) {
  if (depth < 10) return "#a3f600";
  else if (depth == "Bronx") return "#dcf400";
  else if (depth < 50) return "#f7db11";
  else if (depth == 70) return "#fdb72a";
  else if (depth == 90) return "#fca35d";
  else return "#ff5f65";
  
  //return "";
}

function getRadius(magnitude) {
 
  if (magnitude == 0) 
    {return 1};

  return magnitude * 2;

}

function styleInfo(feature){

  // console.log(feature.geometry);


  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.geometry.coordinates[2]),
    color: "black",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5

  };

}


// Getting our GeoJSON data
d3.json(link).then(function(data) {

  console.log(data);

  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // Styling each feature (in this case, a neighborhood)
    style: styleInfo,

    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },


    // This is called on each feature.
    onEachFeature: function(feature, layer) {
     
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + feature.properties.mag + "</h1> <hr> <h2>" + feature.geometry.coordinates + "</h2>");

    }

    
  }).addTo(myMap);
});




/////TODO
  //Center map
  //If then logic in get color function to color based on depth 
  //popups
