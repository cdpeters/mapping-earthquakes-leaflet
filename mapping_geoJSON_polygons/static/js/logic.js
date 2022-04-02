// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//     // // We turn each feature into a marker on the map.
//     // pointToLayer: function (feature, latlng) {
//     //     console.log(feature);
//     //     return L.marker(latlng)
//     //         .bindPopup(`<h2>${feature.properties.name}</h2><hr>
//     //             <h3>${feature.properties.city}, ${feature.properties.country}</h3>`);
//     // }

//     onEachFeature: function (feature, layer) {
//         console.log(layer);
//         layer.bindPopup(`<h3>Airport Code: ${feature.properties.faa}<hr>
//             Airport Name: ${feature.properties.name}</h3>`);
//     }
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/cdpeters/mapping-earthquakes-leaflet/main/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
    color: "blue",
    weight: 1,
    fillColor: "#ffffa1"
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then((data) => {
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h3>Neighborhood: ${feature.properties.AREA_NAME}</h3>`);
        }
    }).addTo(map);
});
