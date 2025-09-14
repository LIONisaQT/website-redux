interface DistanceProps {
	distance: number;
	setDistance: React.Dispatch<React.SetStateAction<number>>;
}

export default function Distance({ distance, setDistance }: DistanceProps) {
	return (
		<div>
			<h2>3. How far do you wanna go?</h2>
			<div>
				Maximum distance: {distance / 1000} km/
				{(distance * 0.000621371).toFixed(2)}mi
			</div>
			<input
				type="range"
				min={1000}
				max={40000}
				step={1000}
				value={distance}
				onChange={(e) => setDistance(parseInt(e.target.value))}
			/>
		</div>
	);
}
