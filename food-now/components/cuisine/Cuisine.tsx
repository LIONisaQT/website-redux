import "./Cuisine.scss";
export interface CuisineOption {
	name: string;
	value: string;
	image: string;
}

const defaultOptions: CuisineOption[] = [
	{
		name: "Japanese",
		value: "japanese",
		image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Oseti.jpg",
	},
	{
		name: "Chinese",
		value: "chinese",
		image:
			"https://townsquare.media/site/704/files/2022/11/attachment-conor-s-articles-88.jpg?w=780&q=75",
	},
	{
		name: "Mexican",
		value: "mexican",
		image:
			"https://domesticfits.com/wp-content/uploads/2024/05/mexican-cuisine-more-than-640x427.jpeg",
	},
	{
		name: "Korean",
		value: "korean",
		image:
			"https://images.yummy.ph/yummy/uploads/2022/04/koreanfoodramyunwithtteokbokki.jpg",
	},
	{
		name: "Vietnamese",
		value: "vietnamese",
		image:
			"https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,q_30,w_750/f_auto/vietnamese-street-food-phpgn0u5d",
	},
	{
		name: "American",
		value: "american",
		image:
			"https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,f_auto,q_60,w_750/v1/classpop/679a768f61781",
	},
	{
		name: "Filipino",
		value: "filipino",
		image:
			"https://makeyourasia.com/templates/yootheme/cache/09/3-09a03ff0.jpeg",
	},
	{
		name: "Italian",
		value: "italian",
		image:
			"https://www.destinavo.com/wp-content/uploads/2020/01/Italian-Food.jpg",
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
			<div className="options-grid">
				{defaultOptions.map((option) => {
					const isSelected = selectedCuisines.includes(option.value);

					return (
						<div
							key={option.value}
							className={`option-card ${isSelected ? "selected" : ""}`}
							onClick={() => onCuisineClicked(option.value)}
						>
							<img
								src={option.image}
								alt={option.name}
								className="option-image"
							/>
							{isSelected && <div className="check-overlay">✔</div>}
							<div className="option-label">
								<span>{option.name}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
