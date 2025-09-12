interface RatingProps {
	rating: number;
	setRating: React.Dispatch<React.SetStateAction<number>>;
}

export default function Rating({ rating, setRating }: RatingProps) {
	return (
		<div>
			<h2>Rating</h2>
			<div>
				Minimum Rating: {rating} {rating === 1 ? "star" : "stars"}
			</div>
			<input
				type="range"
				min={1}
				max={5}
				step={1}
				value={rating}
				onChange={(e) => setRating(parseInt(e.target.value))}
			/>
			{/* <div>{"★".repeat(rating) + "☆".repeat(maxRating - rating)}</div> */}
		</div>
	);
}
