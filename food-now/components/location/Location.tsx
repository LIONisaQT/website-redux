import "./Location.scss";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface LocationProps {
	setLatLng: Dispatch<SetStateAction<google.maps.LatLng | null>>;
}

export default function Location({ setLatLng }: LocationProps) {
	const [message, setMessage] = useState<string | null>(null);
	const [location, setLocation] = useState<string | null>(null);

	useEffect(() => {
		let permissionStatus: PermissionStatus | null = null;

		if (navigator.permissions) {
			navigator.permissions.query({ name: "geolocation" }).then((status) => {
				permissionStatus = status;

				const handleChange = () => {
					if (status.state === "denied") {
						setMessage(
							"Location permission is blocked. Please enable it in your browser settings."
						);
					} else if (status.state === "granted") {
						setMessage(
							"Location permission granted. You can get your location now."
						);
					} else if (status.state === "prompt") {
						setMessage("Location permission not yet requested.");
					}
				};

				// Initial check
				handleChange();

				// Listen for changes
				status.onchange = handleChange;
			});
		}

		return () => {
			if (permissionStatus) {
				permissionStatus.onchange = null;
			}
		};
	}, []);

	const handleGetLocation = () => {
		if (!navigator.geolocation) {
			setMessage("Geolocation is not supported by your browser.");
			return;
		}

		const fillLocation = (latitude: number, longitude: number) => {
			const geocoder = new google.maps.Geocoder();
			const latLng = new google.maps.LatLng(latitude, longitude);

			geocoder.geocode({ location: latLng }, (results, status) => {
				if (status === "OK" && results && results[0]) {
					setLocation(results[0].formatted_address);
				} else {
					setLocation(`Lat: ${latitude}, Lng: ${longitude}`);
				}
			});

			setLatLng(latLng);
			setMessage("Location filled successfully.");
		};

		const handleError = (err: GeolocationPositionError) => {
			if (err.code === err.PERMISSION_DENIED) {
				setMessage(
					"Location permission was denied. Please enable it in your browser settings."
				);
			} else {
				setMessage(`Error getting location: ${err.message}`);
			}
		};

		navigator.geolocation.getCurrentPosition(
			(pos) => fillLocation(pos.coords.latitude, pos.coords.longitude),
			handleError
		);
	};

	return (
		<section className="location-container">
			<h2>WYA?</h2>
			<button className="locator-button" onClick={handleGetLocation}>
				📍
			</button>
			<section className="location-text-container">
				<h3 className="location-label">Your location:</h3>
				<p className="location-text">
					{location ?? "Tap the pin to get your location."}
				</p>
			</section>
			{message && (
				<p
					className={
						message.includes("Error") ||
						message.includes("blocked") ||
						message.includes("denied")
							? "error-text"
							: "success-text"
					}
				>
					{message}
				</p>
			)}
		</section>
	);
}
