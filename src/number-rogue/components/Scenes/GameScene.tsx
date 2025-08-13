import "./GameScene.scss";
import { useState, useRef, useCallback, useEffect } from "react";
import { getShallowCopy, swapDigits } from "../../util/util-methods";
import Shop, { type ShopHandle } from "../Shop/Shop";
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
import { bossModifiers, BossType, type BossModifier } from "../boss/modifiers";
import useSound from "use-sound";
import coinSound from "../../assets/sounds/coin6.ogg";

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

	const reseededRef = useRef(false);
	const [seed, setSeed] = useState(generateRandomSeed());
	const rngRef = useRef(seedrandom(seed, { state: true }));
	const rngStateRef = useRef(rngRef.current.state());

	/**
	 * Initial array can be anything as long as it's not empty.
	 * Game checks for win state if the target array is empty at any point, which
	 * could be the case at game start if we initialized this to an empty array.
	 */
	const [targets, setTargets] = useState<number[]>([Infinity]);
	const [originalTargets, setOriginalTargets] = useState<number[]>([]);

	const [initialNum, setInitialNum] = useState("");

	const [turnCount, setTurnCount] = useState(0);
	const [roundCount, setRoundCount] = useState(0);
	const roundCountRef = useRef(roundCount);

	const calcRef = useRef<CalculatorHandle>(null);

	const [defaults, setDefaults] = useState<Record<string, CalcButton>>({
		...defaultButtons,
	});
	const [extras, setExtras] = useState<Record<string, CalcButton>>({
		...extraButtons,
	});

	const defaultsRef = useRef(defaults);
	const extrasRef = useRef(extras);

	const [savedDefaults, setSavedDefaults] =
		useState<Record<string, CalcButton>>();
	const [savedExtras, setSavedExtras] = useState<Record<string, CalcButton>>();

	const shopRef = useRef<ShopHandle>(null);
	const [shopOpen, setShopOpen] = useState(false);
	const [coin] = useSound(coinSound);

	const [money, setMoney] = useState(startMoney);
	const [prize] = useState(winMoney);

	const [boss, setBoss] = useState<[BossType, BossModifier]>();
	const [bannedNum, setBannedNum] = useState<number>();

	useEffect(() => {
		defaultsRef.current = defaults;
	}, [defaults]);

	useEffect(() => {
		extrasRef.current = extras;
	}, [extras]);

	useEffect(() => {
		roundCountRef.current = roundCount;
	}, [roundCount]);

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
		reseededRef.current = true;
		rngRef.current = seedrandom(newSeed, { state: true });
		const newBoss = getRandomBoss();
		setBoss(newBoss);
		startGame(newBoss, true);
	};

	const getRandomBoss = useCallback(() => {
		const bosses = Object.entries(bossModifiers);
		const boss = bosses[getRng(bosses.length)];
		return boss;
	}, [getRng]);

	/**
	 * Checks for calledFromStart because roundCount isn't incremented then, and
	 * needs to be. In all other cases, the count should be its expected value.
	 */
	// const isBossRound = useCallback((calledFromStart = false) => {
	// 	return (
	// 		roundCountRef.current > 0 &&
	// 		(roundCountRef.current + (calledFromStart ? 1 : 0)) % 5 === 0
	// 	);
	// }, []);

	const startGame = useCallback(
		(currentBoss: [BossType, BossModifier], reseeded: boolean) => {
			// Clear arrays so that initialized value doesn't get included.
			setTargets([]);
			setOriginalTargets([]);

			const initialNum = getRng();

			const targetCount =
				currentBoss[0] === BossType.Swarm &&
				roundCountRef.current > 0 &&
				(roundCountRef.current + 1) % 5 === 0
					? 3
					: 1;

			for (let i = 0; i < targetCount; i++) {
				const offset = 1 + getRng(rngMax - 1);
				const targetNum = (initialNum + offset) % rngMax;
				setOriginalTargets((prev) => [...prev, targetNum]);
				setTargets((prev) => [...prev, targetNum]);

				// Save rng state after final uses of getting rng finished.
				if (i === targetCount - 1) {
					rngStateRef.current = rngRef.current.state();
				}
			}

			setInitialNum(initialNum.toString());

			setTurnCount(0);
			setRoundCount((round) => (reseeded ? 1 : round + 1));

			setSavedDefaults(getShallowCopy(defaultsRef.current));
			setSavedExtras(getShallowCopy(extrasRef.current));

			if (reseeded) {
				setDefaults({ ...defaultButtons });
				setExtras({ ...extraButtons });
				setMoney(startMoney);
				setTurnCount(0);
			}

			setShopOpen(false);

			reseededRef.current = false;
		},
		[getRng, rngMax, startMoney]
	);

	const restartRound = () => {
		rngRef.current = seedrandom("", { state: rngStateRef.current });
		setInitialNum(initialNum);
		setTargets(originalTargets);
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
		const initialBoss = getRandomBoss();
		setBoss(initialBoss);
		startGame(initialBoss, false);
	}, [getRandomBoss, startGame]);

	const onEval = (result: number) => {
		switch (boss?.[0]) {
			case BossType.ExpensiveEval:
				setMoney((money) => money - 5); // TODO: Magic number
				break;
			default:
				break;
		}
		setTurnCount((count) => count + 1);

		if (!targets.includes(result)) {
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

		setTargets((prev) => prev.filter((n) => n !== result));
	};

	useEffect(() => {
		if (targets.length > 0) return;

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

		setMoney(
			(money) =>
				money + prize * (roundCount > 0 && roundCount % 5 === 0 ? 2 : 1)
		);
		setShopOpen(true);
	}, [roundCount, prize, targets]);

	useEffect(() => {
		if (!shopOpen) return;

		shopRef.current?.generateShop();
		coin();
	}, [coin, shopOpen]);

	const modifyTarget = (type: string) => {
		switch (type) {
			case "swapTarget":
				setTargets((prev) => prev.map(swapDigits));
				break;
			case "randomTarget":
				setTargets((prev) => prev.map(getRng));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		switch (boss?.[0]) {
			case BossType.Prohibit:
				setBannedNum(getRng(9));
				break;
			default:
				break;
		}

		console.log("new boss", boss?.[1].name);
	}, [boss, getRng]);

	return (
		<div
			className={`game ${
				Object.entries(extraButtons).length > 8 ? "wide-calc" : ""
			}`}
		>
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
							type="button"
						>
							<p>🔄</p>
						</button>
						<input
							className="seed-button"
							type="submit"
							title="Load current seed"
							value="➡️"
						/>
					</form>
				</section>
				<section className="money-round">
					<section className="money">
						<p className="spaced-out">
							<span>Money:</span>
							<span
								className={`money-text ${money < 1 ? "debt" : ""}`}
							>{`$${money}`}</span>
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
							<span>Target number(s):</span>
							<span className="target-text">
								{targets.map((target) => ` ${target}`)}
							</span>
						</p>
					</section>
					<section className="turns">
						<p className="spaced-out">
							<span>Turns:</span>
							<span className="turn-text">{turnCount}</span>
						</p>
					</section>
				</section>
				{boss && (
					<section className="boss">
						<h2>{`${roundCount % 5 === 0 ? "Current" : "Upcoming"} boss ${
							!(roundCount % 5 === 0)
								? `(${5 - (roundCount % 5)} round${
										5 - (roundCount % 5) === 1 ? "" : "s"
								  } away)`
								: ``
						} `}</h2>
						<p className="justified-text">
							<span className="boss-name">{`${boss[1].name}`}</span>
							<span>{`: ${boss[1].description}`}</span>
						</p>
						{boss[0] === BossType.Prohibit && (
							<p>
								<span>Banned number: </span>
								<span className="banned-number">{bannedNum}</span>
							</p>
						)}
					</section>
				)}
				{canCheat && (
					<section className="cheats">
						<h2>Cheats</h2>
						<button onClick={() => startGame(boss!, false)}>
							Force next round
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
				modifyTarget={modifyTarget}
				money={money}
				setMoney={setMoney}
				bossModifier={
					roundCount > 0 && roundCount % 5 === 0 ? boss?.[0] : undefined
				}
				bannedNum={
					roundCount > 0 && roundCount % 5 === 0 ? bannedNum : undefined
				}
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
					onNextRoundClicked={() => {
						if (roundCount > 0 && roundCount % 5 === 0) {
							const newBoss = getRandomBoss();
							setBoss(newBoss);
							startGame(newBoss, false);
						} else {
							startGame(boss!, false);
						}
					}}
				/>
			)}
		</div>
	);
}

export default React.memo(GameScene);
