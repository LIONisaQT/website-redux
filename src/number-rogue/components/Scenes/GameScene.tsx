import "./GameScene.scss";
import { useState, useRef, useCallback, useEffect } from "react";
import { getShallowCopy } from "../../util/util-methods";
import Shop, { type ShopHandle } from "../Shop";
import Calculator from "../Calculator/Calculator";
import {
	type CalcButton,
	defaultButtons,
	extraButtons,
} from "../Calculator/calculator-config";
import { generateRandomSeed } from "../../util/seed-gen";
import seedrandom from "seedrandom";
import confetti from "canvas-confetti";
import React from "react";

interface GameSceneProps {
	canCheat: boolean;
}

function GameScene({ canCheat }: GameSceneProps) {
	const hasStarted = useRef(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const [seed, setSeed] = useState(generateRandomSeed());
	const [rng, setRng] = useState(() => seedrandom(seed));

	const [target, setTarget] = useState(Infinity);
	const [initialNum, setInitialNum] = useState("");

	const [turnCount, setTurnCount] = useState(0);
	const [roundCount, setRoundCount] = useState(0);

	const [defaults, setDefaults] = useState<Record<string, CalcButton>>({
		...defaultButtons,
	});
	const [extras, setExtras] = useState<Record<string, CalcButton>>({
		...extraButtons,
	});

	const [savedDefaults, setSavedDefaults] =
		useState<Record<string, CalcButton>>();
	const [savedExtras, setSavedExtras] = useState<Record<string, CalcButton>>();

	const shopRef = useRef<ShopHandle>(null);
	const [shopOpen, setShopOpen] = useState(false);

	const [money, setMoney] = useState(0); // TODO: Kinda magic number; have default per level
	const [prize] = useState(22); // TODO: Magic number

	const getRng = useCallback(
		(max: number = 100) => {
			return Math.floor(rng() * max);
		},
		[rng]
	);

	const reseed = (newSeed: string) => {
		setSeed(newSeed);
		setRng(() => seedrandom(newSeed));
		startGame(true);
	};

	const startGame = useCallback(
		(reseeded: boolean) => {
			let initialNum = getRng();
			let targetNum = getRng();

			// Prevent case where starter is target on initial load.
			while (initialNum === targetNum) {
				initialNum = getRng();
				targetNum = getRng();
			}

			setInitialNum(initialNum.toString());
			setTarget(targetNum);

			setTurnCount(0);
			setRoundCount((round) => (reseeded ? 1 : round + 1));

			setSavedDefaults(getShallowCopy(defaults));
			setSavedExtras(getShallowCopy(extras));

			if (reseeded) {
				console.log("this is reseeded");
				setDefaults({ ...defaultButtons });
				setExtras({ ...extraButtons });
				setMoney(0);
				setTurnCount(0);
			}

			setShopOpen(false);
		},
		[defaults, extras, getRng]
	);

	const restartRound = () => {
		setInitialNum(initialNum);
		setTurnCount(0);
		setDefaults(savedDefaults!);
		setExtras(savedExtras!);
		setRefreshKey((prev) => prev + 1);
		setShopOpen(false);
	};

	useEffect(() => {
		// Prevents useEffect from start the game twice in Strict Mode.
		if (hasStarted.current) return;

		hasStarted.current = true;
		startGame(false);
	}, [startGame]);

	const onEval = (result: number) => {
		setTurnCount((count) => count + 1);

		if (result !== target) return;

		// Throw from the left
		confetti({
			particleCount: 100,
			angle: 60,
			spread: 55,
			origin: { x: 0, y: 0.66 },
		});

		// Throw from the right
		confetti({
			particleCount: 100,
			angle: 120,
			spread: 55,
			origin: { x: 1, y: 0.66 },
		});
		setMoney((money) => money + prize);
		setShopOpen(true);
	};

	useEffect(() => {
		if (!shopOpen) return;

		shopRef.current?.generateShop();
	}, [shopOpen]);

	return (
		<div className="game">
			<section className="info">
				<section className="seed">
					<label className="seed-label">Seed</label>
					<input
						className="seed-input"
						maxLength={6}
						value={seed}
						readOnly
					></input>
					<button
						className="reseed-button"
						onClick={() => reseed(generateRandomSeed())}
					>
						🔄
					</button>
				</section>
				<section className="money-round">
					<section className="money">
						<p className="spaced-out">
							<span>Money:</span>
							<span className="money-text">{`$${money}`}</span>
						</p>
						<section className="round">
							<p className="spaced-out">
								<span>Round:</span>
								<span className="round-text">{`${roundCount}/20`}</span>
							</p>
							<button onClick={restartRound}>Restart round</button>
						</section>
					</section>
				</section>
				<section className="target-turn">
					<section className="target">
						<p className="spaced-out">
							<span>Target number:</span>
							<span className="target-text">{target}</span>
						</p>
					</section>
					<section className="turns">
						<p className="spaced-out">
							<span>Turns:</span>
							<span className="turn-text">{turnCount}</span>
						</p>
					</section>
				</section>
				{canCheat && (
					<section className="cheats">
						<h2>Cheats</h2>
						<button onClick={() => setMoney((money) => money + 5)}>
							Add $
						</button>
						<button onClick={() => setShopOpen(!shopOpen)}>Toggle shop</button>
					</section>
				)}
			</section>
			<Calculator
				initialNum={initialNum}
				defaults={defaults}
				setDefaults={setDefaults}
				extras={extras}
				setExtras={setExtras}
				onEval={onEval}
				refreshKey={refreshKey}
				getRng={getRng}
				enableButtons={shopOpen}
			/>
			{shopOpen && (
				<Shop
					ref={shopRef}
					getRng={getRng}
					shopSize={6} // TODO: Magic number
					defaults={defaults}
					setDefaults={setDefaults}
					extras={extras}
					setExtras={setExtras}
					money={money}
					setMoney={setMoney}
					onNextRoundClicked={() => startGame(false)}
				/>
			)}
		</div>
	);
}

export default React.memo(GameScene);
