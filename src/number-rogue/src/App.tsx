import { useCallback, useEffect, useRef, useState } from "react";
import "./App.scss";
import seedrandom from "seedrandom";
import Calculator from "./components/Calculator";
import { generateRandomSeed } from "./util/seed-gen";
import Shop, { type ShopHandle } from "./components/Shop";
import { defaultButtons, extraButtons, type CalcButton } from "./calculator";

const ENABLE_CHEATS = true;

function App() {
	const hasStarted = useRef(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const [seed] = useState(generateRandomSeed());
	const [rng, setRng] = useState(() => seedrandom(seed));

	const [target, setTarget] = useState(Infinity);
	const [initialNum, setInitialNum] = useState("");
	const [currentNum, setCurrentNum] = useState(0);

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

	const [money, setMoney] = useState(0);
	const [prize] = useState(22);

	const getRng = useCallback(
		(max: number = 100) => {
			return Math.floor(rng() * max);
		},
		[rng]
	);

	const reseed = (newSeed: string) => {
		setRng(() => seedrandom(newSeed));
	};

	const getShallowCopy = (source: Record<string, CalcButton>) => {
		return Object.fromEntries(
			Object.entries(source).map(([k, v]) => [k, { ...v }])
		);
	};

	const startGame = useCallback(() => {
		let initialNum = getRng();
		let targetNum = getRng();

		// Prevent case where starter is target on initial load.
		while (initialNum === targetNum) {
			initialNum = getRng();
			targetNum = getRng();
		}

		setInitialNum(initialNum.toString());
		setCurrentNum(initialNum);
		setTarget(targetNum);

		setTurnCount(0);
		setRoundCount((round) => round + 1);

		setSavedDefaults(getShallowCopy(defaults));
		setSavedExtras(getShallowCopy(extras));

		setShopOpen(false);
	}, [defaults, extras, getRng]);

	const restartRound = () => {
		setInitialNum(initialNum);
		setCurrentNum(Number(initialNum));
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
		startGame();
	}, [startGame]);

	const onEval = (result: number) => {
		setTurnCount((count) => count + 1);
		setCurrentNum(result);

		if (result !== target) return;

		setMoney((money) => money + prize);
		setShopOpen(true);
	};

	useEffect(() => {
		if (!shopOpen) return;

		shopRef.current?.generateShop();
	}, [shopOpen]);

	return (
		<div className="game-container">
			<h1>Calculate It</h1>
			<section className="seed">
				<label className="seed-label">Seed</label>
				<input className="seed-input" maxLength={6} defaultValue={seed}></input>
				<button
					className="reseed-button"
					onClick={() => reseed(generateRandomSeed())}
				>
					🔄
				</button>
			</section>
			<section className="info">
				<section className="money">
					<p>
						Money: $<span>{money}</span>
					</p>
				</section>
				<section className="target">
					<p>
						Target number: <span>{target}</span>
					</p>
				</section>
				<section className="current">
					<p>
						Current number: <span>{currentNum}</span>
					</p>
				</section>
				<section className="turns">
					<p>
						Turns: <span>{turnCount}</span>
					</p>
				</section>
				<section className="round">
					<p>
						Round: <span>{`${roundCount}/20`}</span>
					</p>
					<button onClick={restartRound}>Restart round</button>
				</section>
			</section>
			{ENABLE_CHEATS && (
				<section className="cheats">
					<button onClick={() => setMoney((money) => money + 5)}>Add $</button>
					<button onClick={() => setShopOpen(!shopOpen)}>Toggle shop</button>
				</section>
			)}
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
				updateCurrentNum={setCurrentNum}
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
					onNextRoundClicked={startGame}
				/>
			)}
		</div>
	);
}

export default App;
