  var map = L.map('map').setView([7.8804, 98.3923], 13);


  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                 '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                 'Imagery © <a href="https://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11', // Or another Mapbox style that suits your needs
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidG9tdGs5OSIsImEiOiJjbHNnMzRkYzQxaHNjMmtvMXRrMHZzZjRpIn0.P636xQ6a2gWcw-PsVrmQFg', // Replace with your Mapbox access token
    language: 'en' // This parameter sets the language of the map labels to English
}).addTo(map);

  // Initialize the geocoder
  var geocoder = L.Control.Geocoder.nominatim();

  function flyToContinent(continent) {
    var coordinates = {
      'Africa': [-8.7832, 34.5085],
      'Asia': [34.0479, 100.6197],
      'Europe': [54.5260, 15.2551],
      'North America': [54.5260, -105.2551],
      'South America': [-8.7832, -55.4915],
      'Australia': [-25.2744, 133.7751],
    };
    map.flyTo(coordinates[continent], 3);
  }

  function geocodeSearch() {
    var input = document.getElementById('search').value;
    if (input && input.length > 0) {
      geocoder.geocode(input, function (results) {
        if (results.length > 0) {
          var r = results[0];
          if (r.bbox && r.bbox.length === 4) {
                // Fit the map bounds to the geocode result, then set a zoom level
            var bounds = [
              [r.bbox[0], r.bbox[2]],
              [r.bbox[1], r.bbox[3]]
            ];
            map.fitBounds(bounds).once('zoomend', function() {
              // Set a specific zoom level after fitting bounds, if necessary
              // Adjust the zoom level (e.g., to 15) as per your requirement
              map.setZoom(15);
            });
          } else if (r.center && r.center.lat !== undefined && r.center.lng !== undefined) {
            // Pan to the geocode result and set a specific zoom level
            map.setView(new L.LatLng(r.center.lat, r.center.lng), 15); // Set zoom level to 15
          } else {  
            alert('Geocoding successful but no bounding box found.');
          }
        } else {
          alert('No results found');
        }
      });
    } else {
      alert('Please enter a search term');
    }
}
function flyToRandomLocation() {
    // Define the range for latitude and longitude
    var latRange = [-85, 85]; // Avoiding poles for more interesting locations
    var lngRange = [-180, 180];
    
    // Generate a random latitude and longitude
    var randomLat = Math.random() * (latRange[1] - latRange[0]) + latRange[0];
    var randomLng = Math.random() * (lngRange[1] - lngRange[0]) + lngRange[0];
    
    // Use the flyTo method to move the map to the random location
    map.flyTo([randomLat, randomLng], 13); // You can adjust the zoom level as needed
}

