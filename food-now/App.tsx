import "./App.scss";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import Cuisine from "./components/cuisine/Cuisine";
import Location from "./components/location/Location";
import Price from "./components/price/Price";
import Rating from "./components/rating/Rating";
import Distance from "./components/distance/Distance";
import Loading from "./components/loader/Loading";

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
	const [checkOpen, setCheckOpen] = useState(true);

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
		setLoading(true);
		setResults([]);
		setError(null);

		const results = localStorage.getItem("cachedResults");
		if (results) {
			setTimeout(() => {
				setResults(JSON.parse(results));
				setLoading(false);
			}, 1000);
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
						openNow: checkOpen,
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

	const onPrevSectionClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
		const btn = event.currentTarget;
		const currentSection = btn.closest("section");
		const prevSection =
			currentSection?.previousElementSibling as HTMLElement | null;

		if (prevSection) {
			prevSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	const onNextSectionClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
		const btn = event.currentTarget;
		const currentSection = btn.closest("section");
		const nextSection =
			currentSection?.nextElementSibling as HTMLElement | null;

		if (nextSection) {
			nextSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="food-now">
			<section className="criteria">
				<section className="criteria-section cuisine">
					<Cuisine
						selectedCuisines={cuisines}
						onCuisineClicked={onCuisineClicked}
					/>
					<button
						className="section-button next"
						onClick={onNextSectionClicked}
						disabled={cuisines.length === 0}
					>
						Location
					</button>
				</section>
				<section className="criteria-section location">
					<button
						className="section-button prev"
						onClick={onPrevSectionClicked}
					>
						Cuisines
					</button>
					<Location setLatLng={setLatLng} />
					<button
						className="section-button next"
						onClick={onNextSectionClicked}
						disabled={latLng === null}
					>
						Extras
					</button>
				</section>
				<section className="criteria-section sliders">
					<button
						className="section-button prev"
						onClick={onPrevSectionClicked}
					>
						Location
					</button>
					<section className="sliders-body">
						<Distance distance={distance} setDistance={setDistance} />
						<Price price={price} setPrice={setPrice} />
						<Rating rating={rating} setRating={setRating} />
						<section className="check-open">
							<input
								type="checkbox"
								checked={checkOpen}
								onChange={() => setCheckOpen(!checkOpen)}
							/>
							<p>Only show open restaurants</p>
						</section>
					</section>
					<button
						className="food-now-button"
						onClick={searchNearbyRestaurants}
						disabled={!placesService || cuisines.length === 0 || loading}
					>
						Get Food Now!
					</button>
				</section>
			</section>
			{error && (
				<section>
					<p>{error}</p>
				</section>
			)}
			{loading && <Loading />}
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
