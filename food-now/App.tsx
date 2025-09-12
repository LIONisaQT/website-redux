import "./App.scss";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import Cuisine from "./components/cuisine/Cuisine";
import Location from "./components/location/Location";
import Price from "./components/price/Price";
import Rating from "./components/rating/Rating";
import Distance from "./components/distance/Distance";

function App() {
	const [placesService, setPlacesService] =
		useState<google.maps.places.PlacesService | null>(null);
	const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [cuisines, setCuisines] = useState<string[]>([]);
	const [latLng, setLatLng] = useState<google.maps.LatLng | null>(null);
	const [distance, setDistance] = useState(5000); // meters
	const [price, setPrice] = useState([1, 3]);
	const [rating, setRating] = useState(3);

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
		const results = localStorage.getItem("cachedResults");
		if (results) {
			setResults(JSON.parse(results));
			return;
		}

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
						radius: distance,
						type: "restaurant",
						keyword: cuisine,
						minPriceLevel: price[0],
						maxPriceLevel: price[1],
					};

					placesService.nearbySearch(request, (res, status) => {
						if (status === google.maps.places.PlacesServiceStatus.OK && res) {
							resolve(res.slice(0, 10));
						} else {
							reject(status);
						}
					});
				})
		);

		try {
			const resultsArrays = await Promise.all(promises);
			const combinedResults = resultsArrays.flat();
			const filteredResults = combinedResults.filter(
				(place) => place.rating && place.rating >= rating
			);
			setResults(filteredResults);
			localStorage.setItem("cachedResults", JSON.stringify(filteredResults));
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
		<div className="food-now">
			<h1>Food Now</h1>
			<section className="criteria">
				<section className="cuisine">
					<Cuisine
						selectedCuisines={cuisines}
						onCuisineClicked={onCuisineClicked}
					/>
				</section>
				<section className="location">
					<Location setLatLng={setLatLng} />
				</section>
				<section className="sliders">
					<Distance distance={distance} setDistance={setDistance} />
					<Price price={price} setPrice={setPrice} />
					<Rating rating={rating} setRating={setRating} />
				</section>
			</section>
			<button
				onClick={searchNearbyRestaurants}
				disabled={!placesService || cuisines.length === 0}
			>
				Get Food Now!
			</button>
			<section className="info-messages">
				{error && <p>{error}</p>}
				{loading && <p>Searching restaurants...</p>}
			</section>
			<section className="results">
				<ul>
					{results.map((place) => (
						<li key={place.place_id}>
							<strong>{place.name}</strong>
							{place.vicinity &&
								` — ${place.vicinity} — ${place.rating} (${place.user_ratings_total})`}
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default App;
