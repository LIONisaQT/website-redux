import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";

function App() {
	const [placesService, setPlacesService] =
		useState<google.maps.places.PlacesService | null>(null);
	const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
	const [error, setError] = useState<string | null>(null);

	// Load Google Maps Places library on mount
	useEffect(() => {
		const loader = new Loader({
			apiKey: import.meta.env.VITE_GMAPS_API_KEY,
			version: "weekly",
			libraries: ["places"],
		});

		loader.importLibrary("places").then(() => {
			// Dummy div, since we’re not rendering a map
			const service = new google.maps.places.PlacesService(
				document.createElement("div")
			);
			setPlacesService(service);
		});
	}, []);

	// 🔍 Search method, triggered by button click
	const searchNearbyRestaurants = () => {
		if (!placesService) {
			setError("PlacesService not ready yet.");
			return;
		}

		if (!navigator.geolocation) {
			setError("Geolocation not supported.");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const userLocation = new google.maps.LatLng(
					pos.coords.latitude,
					pos.coords.longitude
				);

				const request: google.maps.places.PlaceSearchRequest = {
					location: userLocation,
					radius: 5000, // meters
					type: "restaurant",
					keyword: "italian",
				};

				placesService.nearbySearch(request, (res, status) => {
					if (status === google.maps.places.PlacesServiceStatus.OK && res) {
						setResults(res.slice(0, 10)); // store first 10
					} else {
						setError(`Search failed: ${status}`);
					}
				});
			},
			(err) => setError(err.message)
		);
	};

	return (
		<div>
			<h2>Nearby Restaurants</h2>
			<button onClick={searchNearbyRestaurants} disabled={!placesService}>
				Search Italian Restaurants
			</button>
			<button onClick={() => setResults([])} disabled={results.length === 0}>
				Restart
			</button>

			{error && <p className="text-red-500 mt-2">{error}</p>}

			<ul className="mt-4 space-y-1">
				{results.map((place) => (
					<li key={place.place_id}>
						<strong>{place.name}</strong>
						{place.vicinity && ` — ${place.vicinity}`}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
