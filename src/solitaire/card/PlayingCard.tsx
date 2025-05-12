import React, { useState } from "react";
import "./PlayingCard.css";
import {
	getRankAsString,
	getSuitColor,
	getSuitEmoji,
	type Card,
} from "../logic/card";

interface CardProps {
	card: Card;
	origin: Card[];
	onClick: (card: Card, origin: Card[]) => void;
	zIndex?: number;
}

const PlayingCard: React.FC<CardProps> = ({
	card: { rank, suit, isFaceDown },
	origin,
	onClick,
	zIndex,
}) => {
	const [animationActive, setAnimationActive] = useState(false);

	const onAnimationEnd = () => {
		setAnimationActive(false);
	};

	const handleClick = () => {
		setAnimationActive(true);
		onClick({ rank, suit, isFaceDown }, origin);
	};

	return (
		<div
			className={`playing-card ${animationActive ? "animate" : ""}`}
			onAnimationEnd={onAnimationEnd}
			style={{ zIndex: zIndex ?? 0 }}
			onClick={handleClick}
		>
			<div className={`card-inner ${isFaceDown ? "face-down" : "face-up"}`}>
				<div className="card-front">
					{!isFaceDown && (
						<div
							className="card-front-design"
							style={{ color: getSuitColor(suit) }}
						>
							<div className="card-peek">
								<p className="card-rank-small">{getRankAsString(rank)}</p>
								<p className="card-suit-small">{getSuitEmoji(suit)}</p>
							</div>
							<p className="card-rank">{getRankAsString(rank)}</p>
							<p className="card-suit">{getSuitEmoji(suit)}</p>
						</div>
					)}
				</div>
				<div className="card-back">
					<div className="card-back-design"></div>
				</div>
			</div>
		</div>
	);
};

export default PlayingCard;
