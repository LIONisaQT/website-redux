import React, {
	useState,
	useRef,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";

interface LocationProps {
	setLatLng: Dispatch<SetStateAction<google.maps.LatLng | null>>;
}

export default function Location({ setLatLng }: LocationProps) {
	const [message, setMessage] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

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
			if (inputRef.current) {
				inputRef.current.value = `Lat: ${latitude}, Lng: ${longitude}`;
			}
			setLatLng(new google.maps.LatLng(latitude, longitude));
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
		<div>
			<h2>Location</h2>
			<input type="text" placeholder="Location" ref={inputRef} />
			<button onClick={handleGetLocation}>Get Location</button>
			{message && (
				<p
					style={{
						color:
							message.includes("Error") ||
							message.includes("blocked") ||
							message.includes("denied")
								? "red"
								: "green",
					}}
				>
					{message}
				</p>
			)}
		</div>
	);
}
