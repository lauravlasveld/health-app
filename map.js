let map; // Declare map globally

function initMap() {
    console.log('Initializing the map...');

    // Map with user location
    navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById("map"), {
            center: userLocation,
            zoom: 15
        });

        // Marker with your location
        new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Tu posición actual"
        });

        // Load recommendations of nearby restaurants
        loadRestaurantRecommendations(userLocation);
    }, (error) => {
        handleError("Error getting user's location:", error);
    });
}

function loadRestaurantRecommendations(userLocation) {
    const radius = 500; // Radius in meters, adjust as needed
    const type = 'restaurant'; // Type of place, in this case, restaurant

    // Create a request object for nearby places search
    const request = {
        location: userLocation,
        radius: radius,
        type: type
    };

    // Initialize the PlacesService
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined' && typeof google.maps.places !== 'undefined') {
        const placesService = new google.maps.places.PlacesService(map);

        // Perform the nearby places search
        placesService.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const restaurantList = document.getElementById("restaurant-list");
                const placesContainer = document.getElementById("placesContainerMap");

                // Clear previous recommendations
                restaurantList.innerHTML = "";
                placesContainer.innerHTML = "";

                // Loop through the results and create elements
                results.forEach((place) => {
                    // Create element for the list
                    const listItem = document.createElement("li");
                    listItem.textContent = place.name;
                    restaurantList.appendChild(listItem);

                    // Create element for the carousel
                    const placeElement = createPlaceElementFromPlaceDetails(place);
                    placesContainer.appendChild(placeElement);
                });
            } else {
                handleError("Error fetching nearby places:", status);
            }
        });
    } else {
        console.error("Google Maps API is not available.");
    }
}

function createPlaceElementFromPlaceDetails(place) {
    // Create and return an HTML element for a restaurant based on place details
    const placeElement = document.createElement("div");
    placeElement.classList.add("place");

    const imageElement = document.createElement("img");
    imageElement.src = place.photos && place.photos.length > 0 ? place.photos[0].getUrl() : 'path/to/default-image.jpg';

    const infoElement = document.createElement("div");
    infoElement.classList.add("info");
    const titleElement = document.createElement("h1");
    titleElement.textContent = place.name;

    // Add the image and information to the place
    infoElement.appendChild(titleElement);
    placeElement.appendChild(imageElement);
    placeElement.appendChild(infoElement);

    return placeElement;
}

function handleError(message, error) {
    console.error(message, error);
}
 // conexion y enviar informacion con el server api, conseguir datos con boton, imput de texto 
 // conseguir valores de submit con la api, server get call post call. conseguir datos, y publicarlos al servidor
 