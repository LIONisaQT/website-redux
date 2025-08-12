import "./GameScene.scss";
import { useState, useRef, useCallback, useEffect } from "react";
import { getShallowCopy, swapDigits } from "../../util/util-methods";
import Shop, { type ShopHandle } from "../Shop";
import Calculator, { type CalculatorHandle } from "../Calculator/Calculator";
import {
	type CalcButton,
	defaultButtons,
	extraButtons,
} from "../Calculator/calculator-config";
import { generateRandomSeed } from "../../util/seed-gen";
import seedrandom from "seedrandom";
import confetti from "canvas-confetti";
import React from "react";
import { SceneType } from "../../util/scene-management";

interface GameSceneProps {
	canCheat: boolean;
	setScene: React.Dispatch<React.SetStateAction<SceneType>>;
	rngMax: number;
	startMoney: number;
	winMoney: number;
}

function GameScene({
	canCheat,
	setScene,
	rngMax,
	startMoney,
	winMoney,
}: GameSceneProps) {
	const hasStarted = useRef(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const [seed, setSeed] = useState(generateRandomSeed());
	const rngRef = useRef(seedrandom(seed, { state: true }));
	const rngStateRef = useRef(rngRef.current.state());

	const [target, setTarget] = useState(Infinity);
	const [originalTarget, setOriginalTarget] = useState(Infinity);
	const [initialNum, setInitialNum] = useState("");

	const [turnCount, setTurnCount] = useState(0);
	const [roundCount, setRoundCount] = useState(0);

	const calcRef = useRef<CalculatorHandle>(null);

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

	const [money, setMoney] = useState(startMoney);
	const [prize] = useState(winMoney);

	const getRng = useCallback(
		(max: number = rngMax) => {
			return Math.floor(rngRef.current() * max);
		},
		[rngMax]
	);

	const reseed = (newSeed: string) => {
		if (!/^[A-Z0-9]{6}$/.test(newSeed)) {
			alert(
				`Seed can only be uppercase alphanumeric and exactly 6 characters. "${newSeed}" is an invalid seed.`
			);
			return;
		}
		setSeed(newSeed);
		rngRef.current = seedrandom(newSeed, { state: true });
		startGame(true);
	};

	const startGame = useCallback(
		(reseeded: boolean) => {
			const initialNum = getRng();
			const offset = 1 + getRng(rngMax - 1);
			const targetNum = (initialNum + offset) % rngMax;

			rngStateRef.current = rngRef.current.state();

			setInitialNum(initialNum.toString());
			setOriginalTarget(targetNum);
			setTarget(targetNum);

			setTurnCount(0);
			setRoundCount((round) => (reseeded ? 1 : round + 1));

			setSavedDefaults(getShallowCopy(defaults));
			setSavedExtras(getShallowCopy(extras));

			if (reseeded) {
				setDefaults({ ...defaultButtons });
				setExtras({ ...extraButtons });
				setMoney(startMoney);
				setTurnCount(0);
			}

			setShopOpen(false);
		},
		[defaults, extras, getRng, rngMax, startMoney]
	);

	const restartRound = () => {
		rngRef.current = seedrandom("", { state: rngStateRef.current });
		setInitialNum(initialNum);
		setTarget(originalTarget);
		setTurnCount(0);
		setDefaults(savedDefaults!);
		setExtras(savedExtras!);
		setRefreshKey((prev) => prev + 1);
		setShopOpen(false);
		calcRef.current?.restart();
	};

	useEffect(() => {
		// Prevents useEffect from start the game twice in Strict Mode.
		if (hasStarted.current) return;

		hasStarted.current = true;
		startGame(false);
	}, [startGame]);

	const onEval = (result: number) => {
		setTurnCount((count) => count + 1);

		if (result !== target) {
			const combined = [...Object.entries(defaults), ...Object.entries(extras)];
			const nonNumberNonEqualsButtons = combined.filter(
				([key]) => isNaN(Number(key)) && key !== "equals"
			);

			const allUsedUp = nonNumberNonEqualsButtons.every(
				([, button]) => button.uses === 0
			);

			if (allUsedUp) {
				setScene(SceneType.Home);
			}

			return;
		}

		// Throw from the left
		confetti({
			particleCount: 100,
			angle: 60,
			spread: 55,
			origin: { x: 0, y: 0.75 },
		});

		// Throw from the right
		confetti({
			particleCount: 100,
			angle: 120,
			spread: 55,
			origin: { x: 1, y: 0.75 },
		});
		setMoney((money) => money + prize);
		setShopOpen(true);
	};

	useEffect(() => {
		if (!shopOpen) return;

		shopRef.current?.generateShop();
	}, [shopOpen]);

	const modifyTarget = (type: string) => {
		switch (type) {
			case "swapTarget":
				setTarget(swapDigits(target));
				break;
			case "randomTarget":
				setTarget(getRng());
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		if (roundCount > 0 && roundCount % 5 === 0) {
			console.log("Boss round!");
		}
	}, [roundCount]);

	return (
		<div className="game">
			<section className="info">
				<section className="seed-container">
					<form
						className="seed"
						onSubmit={(e) => {
							e.preventDefault();
							reseed(seed);
						}}
					>
						<label className="seed-label" htmlFor="seed">
							Seed
						</label>
						<input
							className="seed-input"
							id="seed"
							name="seed"
							maxLength={6}
							value={seed}
							onChange={(e) => setSeed(e.target.value)}
						></input>
						<button
							className="seed-button"
							onClick={() => reseed(generateRandomSeed())}
							title="Reseed"
						>
							<p>🔄</p>
						</button>
						<input
							className="seed-button"
							type="submit"
							title="Load seed"
							value="➡️"
						/>
					</form>
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
				modifyTarget={modifyTarget}
				money={money}
			/>
			{shopOpen && (
				<Shop
					ref={shopRef}
					canCheat={canCheat}
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
