import PlayingCard from "../card/PlayingCard";
import type { Card } from "../logic/card";
import "./Foundations.css";

interface FoundationsProps {
	foundations?: Card[][];
	foundationCardClicked: (card: Card, origin: Card[]) => void;
}

const Foundations: React.FC<FoundationsProps> = ({
	foundations,
	foundationCardClicked,
}) => {
	return (
		<div className="foundations">
			{foundations?.map((foundation, index) => (
				<div key={`foundation-${index}`} className="foundation-pile">
					{foundation.length > 0 && (
						<PlayingCard
							card={foundation[foundation.length - 1]}
							origin={foundation}
							onClick={foundationCardClicked}
						/>
					)}
				</div>
			))}
		</div>
	);
};

export default Foundations;
