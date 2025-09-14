import { useEffect, useState, useCallback } from "react";
import "./Modal.scss";

const DEBOUNCE_TIMER = 3;

interface LoadingProps {
	isLoading: boolean;
	results: google.maps.places.PlaceResult[];
}

export default function Modal({ isLoading, results }: LoadingProps) {
	const [selected, setSelected] =
		useState<google.maps.places.PlaceResult | null>(null);
	const [loadingDetails, setLoadingDetails] = useState(false);
	const [debounceTimer, setDebounceTimer] = useState(0);

	const getRandomRestaurant = (places: google.maps.places.PlaceResult[]) =>
		places[Math.floor(Math.random() * places.length)];

	const getRestaurantDetails = (
		restaurant: google.maps.places.PlaceResult
	): Promise<google.maps.places.PlaceResult> => {
		return new Promise((resolve, reject) => {
			if (!restaurant.place_id) {
				reject(new Error("Restaurant does not have a place_id"));
				return;
			}

			const service = new google.maps.places.PlacesService(
				document.createElement("div")
			);

			const request: google.maps.places.PlaceDetailsRequest = {
				placeId: restaurant.place_id,
				fields: [
					"name",
					"vicinity",
					"geometry",
					"rating",
					"user_ratings_total",
					"reviews",
					"photos",
					"opening_hours",
				],
			};

			service.getDetails(request, (details, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK && details) {
					resolve(details);
				} else {
					reject(new Error(`getDetails failed: ${status}`));
				}
			});
		});
	};

	const selectRandomRestaurant = useCallback(async () => {
		if (results.length === 0) return;
		if (loadingDetails) return; // prevent overlapping API calls
		if (debounceTimer > 0) return; // prevent during cooldown

		const randomRestaurant = getRandomRestaurant(results);

		setLoadingDetails(true);
		try {
			const details = await getRestaurantDetails(randomRestaurant);
			setSelected(details);
			setDebounceTimer(DEBOUNCE_TIMER);
		} catch (err) {
			console.error("Failed to fetch restaurant details:", err);
		} finally {
			setLoadingDetails(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [results]);

	// Initial selection (only when results first arrive)
	useEffect(() => {
		if (results.length === 0) return;
		selectRandomRestaurant();
	}, [results, selectRandomRestaurant]);

	// Countdown effect for debounce timer
	useEffect(() => {
		if (debounceTimer === 0) return;

		const interval = setInterval(() => {
			setDebounceTimer((prev) => Math.max(prev - 1, 0));
		}, 1000);

		return () => clearInterval(interval);
	}, [debounceTimer]);

	const getMapLink = () =>
		selected?.place_id
			? `https://www.google.com/maps/place/?q=place_id:${selected.place_id}`
			: selected?.geometry?.location
			? `https://www.google.com/maps/search/?api=1&query=${selected.geometry.location.lat()},${selected.geometry.location.lng()}`
			: "#";

	const getYelpLink = (place: google.maps.places.PlaceResult): string => {
		const name = place.name || "";
		const address = place.vicinity || "";
		const query = encodeURIComponent(`${name} ${address}`);
		return `https://www.yelp.com/search?find_desc=${query}`;
	};

	return (
		<div
			className={`loading-container ${
				isLoading || results.length > 0 ? "show" : ""
			}`}
		>
			<div className="background" />
			<div className="modal">
				{isLoading || loadingDetails ? (
					<p>Fetching restaurants...</p>
				) : (
					selected && (
						<div className="result">
							<h2>Your randomly selected pick:</h2>
							<div className="result-data">
								{selected.photos && selected.photos.length > 0 && (
									<div className="photo-container">
										<img
											src={selected.photos[0].getUrl()}
											alt={selected.name}
										/>
									</div>
								)}
								<h1 className="name">{selected.name}</h1>
								<section className="details">
									<p>{selected.vicinity}</p>
									<p>
										{selected.rating}
										{selected.user_ratings_total && (
											<span> ({selected.user_ratings_total} reviews)</span>
										)}
									</p>
								</section>
								{selected.reviews?.[0] && (
									<section className="review">
										<p>
											Here's a recent review by{" "}
											<span className="author">
												{selected.reviews[0].author_name}
											</span>
											, who rated the place with{" "}
											<span className="rating">
												{selected.reviews[0].rating} stars
											</span>
											{", "}
											<span className="time">
												{selected.reviews[0].relative_time_description}
											</span>
											:
										</p>
										<div className="review-text-wrapper">
											<p className="review-text">{selected.reviews[0].text}</p>
										</div>
									</section>
								)}
								<section className="link-group">
									<a
										className="ext-link-button"
										href={getMapLink()}
										target="_blank"
										rel="noopener noreferrer"
									>
										<img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" />
										Open in Maps
									</a>
									<a
										className="ext-link-button"
										href={getYelpLink(selected)}
										target="_blank"
										rel="noopener noreferrer"
									>
										<img src="https://companieslogo.com/img/orig/YELP-d704c977.png?t=1720244494" />
										Open in Yelp
									</a>
								</section>
							</div>
							<section className="button-group">
								<button
									className="primary"
									onClick={selectRandomRestaurant}
									disabled={debounceTimer > 0 || loadingDetails}
								>
									{debounceTimer > 0
										? `Request a different place in ${debounceTimer}s`
										: "Give me a different place!"}
								</button>
								<button className="secondary">Restart</button>
							</section>
						</div>
					)
				)}
			</div>
		</div>
	);
}
