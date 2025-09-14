import "./Price.scss";
import { Range, getTrackBackground } from "react-range";

interface PriceProps {
	price: number[];
	setPrice: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function Price({ price, setPrice }: PriceProps) {
	const STEP = 1;
	const MIN = 0;
	const MAX = 4;
	const priceLabels = [
		"Free",
		"Inexpensive",
		"Moderate",
		"Expensive",
		"Very Expensive",
	];

	return (
		<section className="sliders-section-container">
			<h2 className="title">4. Name your price.</h2>
			<div className="body">
				<div className="range-label">
					<span>{priceLabels[price[0]]}</span>
					<span>{priceLabels[price[1]]}</span>
				</div>
				<Range
					step={STEP}
					min={MIN}
					max={MAX}
					values={price}
					onChange={(vals) => setPrice(vals)}
					renderTrack={({ props, children }) => {
						return (
							<div
								className="render-track"
								{...props}
								style={{
									background: getTrackBackground({
										values: price,
										colors: ["#ccc", "#548BF4", "#ccc"],
										min: MIN,
										max: MAX,
									}),
								}}
							>
								{children}
							</div>
						);
					}}
					renderThumb={({ props }) => {
						const { key, ...restProps } = props;
						return <div className="render-thumb" {...restProps} key={key} />;
					}}
				/>
			</div>
		</section>
	);
}
