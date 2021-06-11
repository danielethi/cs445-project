function displayUserData(data) {
  let latitde = data.address.geo.lat;
  let longtude = data.address.geo.lng;
  let currentLocation;
  fetchCurrentLocation();
  async function fetchCurrentLocation() {
    let res = await fetch(
      "https://mapquestapi.com/geocoding/v1/reverse?key=q5N7YWFQnHlQCfx0KyD5d1qoATAAFezV&location=" +
        latitude+","+longtude );
    let jsonLocation = await res.json();
    currentLocation = jsonLocation.results[0].locations[0].street;
    if (currentLocation === "") {
      navigator.geolocation.getCurrentPosition(latitude);
    }      
    function latLong(position) {
      latitude = position.coords.latitude;
      longtude = position.coords.longitude;
      fetchCurrentLocation();
    }
