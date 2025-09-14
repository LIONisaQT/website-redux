import "./CustomSlider.scss";

interface SliderProps {
	label?: string;
	min: number;
	max: number;
	step?: number;
	value: number;
	onChange: (value: number) => void;
	filledColor?: string;
	emptyColor?: string;
}

export default function CustomSlider({
	label,
	min,
	max,
	step = 1,
	value,
	onChange,
	filledColor = "#548BF4",
	emptyColor = "#e6e6e6",
}: SliderProps) {
	const pct = Math.round(((value - min) / (max - min)) * 100);
	const background = `linear-gradient(to right, ${filledColor} ${pct}%, ${emptyColor} ${pct}%)`;

	return (
		<div>
			{label && (
				<label style={{ display: "block" }}>
					{label}: {value.toLocaleString()}
				</label>
			)}

			<input
				type="range"
				className="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(parseInt(e.target.value, 10))}
				style={{ background }}
			/>
		</div>
	);
}
