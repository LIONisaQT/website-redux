import type React from "react";
import PlayingCard from "../card/PlayingCard";
import type { Card } from "../logic/card";
import "./TableauPile.css";

interface TableauPileProps {
	cards: Card[];
	onClick: (card: Card, origin: Card[]) => void;
}

const TableauPile: React.FC<TableauPileProps> = ({ cards, onClick }) => {
	return (
		<div className="tableau-pile">
			{cards.length === 0 && (
				<div className="empty-pile">
					<p className="empty-text">X</p>
				</div>
			)}
			{cards.map((card) => (
				<PlayingCard
					key={`${card.rank}-${card.suit}`}
					card={{
						rank: card.rank,
						suit: card.suit,
						isFaceDown: card.isFaceDown,
					}}
					origin={cards}
					onClick={onClick}
					zIndex={cards.indexOf(card)}
				/>
			))}
		</div>
	);
};

export default TableauPile;
