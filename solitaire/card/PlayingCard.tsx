import React, { useState } from "react";
import "./PlayingCard.css";
import {
	getRankAsString,
	getSuitColor,
	getSuitSvgs,
	type Card,
} from "../logic/card";

interface CardProps {
	card: Card;
	origin: Card[];
	onClick: (card: Card, origin: Card[]) => void;
	zIndex?: number;
	showPeek?: boolean;
}

const PlayingCard: React.FC<CardProps> = ({
	card: { rank, suit, isFaceDown },
	origin,
	onClick,
	zIndex,
	showPeek = false,
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
							{showPeek && (
								<div className="card-peek">
									<p className="card-rank-small">{getRankAsString(rank)}</p>
									<img src={getSuitSvgs(suit)} className="card-suit-small" />
								</div>
							)}
							<div className="card-face-main">
								<p className="card-rank">{getRankAsString(rank)}</p>
								<img src={getSuitSvgs(suit)} className="card-suit" />
							</div>
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
