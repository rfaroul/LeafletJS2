// Call Stamen tiles
var layer = new L.StamenTileLayer('toner-background');

// Initialize our map
var map = new L.Map('map').setView([42,-93],7);
/*The first setview parameter is the lat, long of the initial zoom
The second parameter (7) is the zoom level*/
map.addLayer(layer);

// Set the color of the individual county
// All colors are shades of green
// The more population, the darker the county will appear on the map
function setColor(population) {
	var population_num = parseInt(population);

	if (population_num > 150000) {
		return '#005824';
	} else if (population_num > 125000) {
		return '#238b45';
	} else if (population_num > 100000) {
		return '#41ae76';
	} else if (population_num > 75000) {
		return '#66c2a4';
	} else if (population_num > 50000) {
		return '#99d8c9';
	} else if (population_num > 25000) {
		return '#ccece6';
	} else {
		return '#edf8fb';
	}
};

// Styles for each county on the map
// With this, we grab each county's population
// And send it to the setColor function above
function setStyle(feature) {
	return {
		opacity: 1,
		weight: 2,
		color: "#FFF",
		fillColor: setColor(feature.properties.population),
		fillOpacity: 0.8
	};
};

// Call the GeoJSON file ia-counties, and add to the map
L.geoJson(iowa_counties, {
	style: setStyle
}).addTo(map);

// Loop through each brewery, which is an object inside an array called "breweries"
for (var num = 0; num < breweries.length; num++) {
	var brewery = breweries[num];
	var brewery_lat = brewery["latitude"];
	var brewery_long = brewery["longitude"];
	var brewery_name = brewery["brewery"];
	var brewery_address = brewery["address"];
	var brewery_city = brewery["city"];

	// Use Leaflet to add a marker for each brewery and give it the lat, long information
	// In the current brewery's object
	var marker = L.marker([brewery_lat, brewery_long]).addTo(map);
	
	// HTML that will appear in popup
	var popup_html = '<h3>' + brewery_name + '</h3>';
	popup_html += '<div>' + brewery_address + '</div>';
	popup_html += '<div>' + brewery_city + '</div>'

	// Bind the popup to the marker using Leaflet
	marker.bindPopup(popup_html);
};