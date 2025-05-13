import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Card } from "./logic/card";
import TableauPile from "./tableau/TableauPile";
import Stock from "./stock/Stock";
import { Solitaire } from "./logic/solitaire";
import Foundations from "./foundations/Foundations";
import FloatingActionButton from "./fab/FloatingActionButton";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import cardFlip from "./assets/sounds/card1.ogg";
import cardFan from "./assets/sounds/cardFan2.ogg";
import cancel from "./assets/sounds/cancel.ogg";
import win from "./assets/sounds/win.ogg";
import useSound from "use-sound";
import Modal from "./assets/modal/Modal";

function App() {
	const [isDevMode, setDevMode] = useState(false);
	const [fabClickCount, setFabClickCount] = useState(0);

	useEffect(() => {
		if (fabClickCount < 10) return;
		setDevMode(true);
	}, [fabClickCount]);

	const [game, setGame] = useState<Solitaire>();
	const [, setTableau] = useState<Card[][]>([]);
	const [, setStock] = useState<Card[]>([]);
	const [, setFoundations] = useState<Card[][]>([]);
	const [isWon, setWin] = useState(false);

	const handle = useFullScreenHandle();

	const [playCardFlip] = useSound(cardFlip, { volume: 0.25 });
	const [playCardFan] = useSound(cardFan);
	const [playCancel] = useSound(cancel, { volume: 0.25 });
	const [playWin] = useSound(win);

	useEffect(() => {
		setGame(new Solitaire());
		playCardFan();
	}, [playCardFan]);

	const cardClicked = (card: Card, origin: Card[]) => {
		if (!game) return;

		switch (game.cardClicked(card, origin)) {
			case "tableau":
			case "flip":
				setTableau([...game.tableau]);
				playCardFlip();
				break;
			case "foundation":
				setFoundations([...game.foundations]);
				playCardFlip();
				break;
			default:
				playCancel();
				break;
		}

		let finishedFoundations = 0;
		game.foundations.forEach((foundation) => {
			finishedFoundations += foundation.length === 13 ? 1 : 0;
		});
		setWin(finishedFoundations === 4);
	};

	const stockClicked = () => {
		if (!game) return;

		game.stockClicked();
		playCardFlip();
		setStock([...game.stock]);
	};

	const reset = useCallback(() => {
		if (!game) return;

		setTableau(game.tableau); // Only need this to trigger a re-render
		setWin(false);
		playCardFan();
	}, [game, playCardFan]);

	const restartClicked = useCallback(() => {
		if (!game) return;

		game.restartGame();
		reset();
	}, [game, reset]);

	useEffect(() => {
		if (!isWon) return;
		playWin();
	}, [isWon, playWin, restartClicked]);

	const winClicked = () => {
		setWin(true);
	};

	return (
		<FullScreen handle={handle}>
			{isWon && (
				<Modal
					titleText="Congratulations!"
					bodyText="You win! 🎉"
					onPrimaryClick={restartClicked}
					primaryButtonText="Restart game"
				/>
			)}
			<div className="play-area">
				<div className="top-area">
					<div className="foundations">
						<Foundations
							foundations={game?.foundations}
							foundationCardClicked={cardClicked}
						/>
					</div>
					<div className="stock">
						<Stock
							game={game}
							stockClicked={stockClicked}
							wasteClicked={cardClicked}
						/>
					</div>
				</div>
				<div className="tableau">
					{game?.tableau.map((pile, index) => (
						<TableauPile
							key={`tableau-${index}`}
							cards={pile}
							onClick={cardClicked}
						/>
					))}
				</div>
				<FloatingActionButton
					onClickCallback={() => setFabClickCount(fabClickCount + 1)}
					fullScreenClicked={handle.active ? handle.exit : handle.enter}
					restartClicked={restartClicked}
					winClicked={winClicked}
					isDevMode={isDevMode}
				/>
			</div>
		</FullScreen>
	);
}

export default App;
