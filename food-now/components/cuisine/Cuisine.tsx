export interface CuisineOption {
	name: string;
	value: string;
}

const defaultOptions: CuisineOption[] = [
	{
		name: "Japanese",
		value: "japanese",
	},
	{
		name: "Chinese",
		value: "chinese",
	},
	{
		name: "Mexican",
		value: "mexican",
	},
	{
		name: "Korean",
		value: "korean",
	},
	{
		name: "Vietnamese",
		value: "vietnamese",
	},
];

interface CuisineProps {
	selectedCuisines: string[];
	onCuisineClicked: (value: string) => void;
}

export default function Cuisine({
	selectedCuisines,
	onCuisineClicked,
}: CuisineProps) {
	return (
		<div>
			<h2>Options</h2>
			<div className="options">
				{defaultOptions.map((option) => (
					<div
						key={option.value}
						className="option"
						onClick={() => onCuisineClicked(option.value)}
					>
						<input
							type="checkbox"
							checked={selectedCuisines.includes(option.value)}
							readOnly
						/>
						{option.name}
					</div>
				))}
			</div>
		</div>
	);
}
