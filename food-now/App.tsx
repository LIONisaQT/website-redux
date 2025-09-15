import "./App.scss";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import Cuisine from "./components/cuisine/Cuisine";
import Location from "./components/location/Location";
import Price from "./components/price/Price";
import Rating from "./components/rating/Rating";
import Distance from "./components/distance/Distance";
import Modal from "./components/modal/Modal";

function App() {
	const [placesService, setPlacesService] =
		useState<google.maps.places.PlacesService | null>(null);
	const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [cuisines, setCuisines] = useState<string[]>([]);
	const maxCuisines = 4;
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
		if (cuisines.includes(value)) {
			setCuisines((prev) => prev.filter((item) => item !== value));
			return;
		}

		if (cuisines.length >= maxCuisines) return;

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

	const onRestartClicked = () => {
		setCuisines([]);
		setResults([]);
		window.scrollTo(0, 0);
	};

	return (
		<div className="food-now">
			<div className="banner">
				<h1>Food Now!</h1>
			</div>
			<section className="criteria">
				<section className="criteria-section cuisine">
					<Cuisine
						selectedCuisines={cuisines}
						onCuisineClicked={onCuisineClicked}
						maxCuisines={maxCuisines}
					/>
					<button
						className="section-button next"
						onClick={onNextSectionClicked}
						disabled={cuisines.length === 0}
					>
						Next (Location)
					</button>
				</section>
				<section className="criteria-section location">
					<button
						className="section-button prev"
						onClick={onPrevSectionClicked}
					>
						Back (Cuisines)
					</button>
					<Location setLatLng={setLatLng} />
					<button
						className="section-button next"
						onClick={onNextSectionClicked}
						disabled={latLng === null}
					>
						Next (Extras)
					</button>
				</section>
				<section className="criteria-section sliders">
					<button
						className="section-button prev"
						onClick={onPrevSectionClicked}
					>
						Back (Location)
					</button>
					<section className="sliders-body">
						<Distance distance={distance} setDistance={setDistance} />
						<Price price={price} setPrice={setPrice} />
						<Rating rating={rating} setRating={setRating} />
						<section className="check-open">
							<input
								type="checkbox"
								className="checkbox"
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
			<Modal
				isLoading={loading}
				results={results}
				onRestart={onRestartClicked}
			/>
		</div>
	);
}

export default App;
