import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import Cuisine from "./components/cuisine/Cuisine";
import Location from "./components/location/Location";
import Price from "./components/price/Price";

function App() {
	const [placesService, setPlacesService] =
		useState<google.maps.places.PlacesService | null>(null);
	const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [cuisines, setCuisines] = useState<string[]>([]);
	const [latLng, setLatLng] = useState<google.maps.LatLng | null>(null);
	const [price, setPrice] = useState([1, 3]);

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

	const searchNearbyRestaurants = async () => {
		if (!placesService) {
			setError("PlacesService not ready yet.");
			return;
		}

		if (!navigator.geolocation || !latLng) {
			setError("Geolocation not supported.");
			return;
		}

		setLoading(true);
		setResults([]);
		setError(null);

		const promises = cuisines.map(
			(cuisine) =>
				new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
					const request: google.maps.places.PlaceSearchRequest = {
						location: latLng,
						radius: 5000, // meters
						type: "restaurant",
						keyword: cuisine,
						minPriceLevel: price[0],
						maxPriceLevel: price[1],
					};

					placesService.nearbySearch(request, (res, status) => {
						if (status === google.maps.places.PlacesServiceStatus.OK && res) {
							resolve(res.slice(0, 3));
						} else {
							reject(status);
						}
					});
				})
		);

		try {
			const resultsArrays = await Promise.all(promises);
			const combinedResults = resultsArrays.flat();
			setResults(combinedResults);
		} catch (status) {
			setError(`Search failed: ${status}`);
		} finally {
			setLoading(false);
		}
	};

	const onCuisineClicked = (value: string) => {
		setCuisines((prev) =>
			prev.includes(value)
				? prev.filter((item) => item !== value)
				: [...prev, value]
		);
	};

	return (
		<div>
			<h1>Food Now</h1>
			<Cuisine
				selectedCuisines={cuisines}
				onCuisineClicked={onCuisineClicked}
			/>
			<Location setLatLng={setLatLng} />
			<Price price={price} setPrice={setPrice} />
			<button
				onClick={searchNearbyRestaurants}
				disabled={!placesService || cuisines.length === 0}
			>
				Get Food Now!
			</button>
			<button onClick={() => setResults([])} disabled={results.length === 0}>
				Restart
			</button>

			{error && <p>{error}</p>}
			{loading && <p>Searching restaurants...</p>}

			<ul>
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
