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
	setTrack: (isBoss: boolean) => void;
	canCheat: boolean;
	setScene: React.Dispatch<React.SetStateAction<SceneType>>;
	rngMax: number;
	startMoney: number;
	winMoney: number;
}

function GameScene({
	setTrack,
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
	const [coin] = useSound(coinSound, { volume: 0.5 });

	const [money, setMoney] = useState(startMoney);
	const [initialMoney, setInitialMoney] = useState(money);
	const [prize] = useState(winMoney);

	const [boss, setBoss] = useState<[BossType, BossModifier]>();
	const [bannedNum, setBannedNum] = useState<number>();

	const [gameOver, setGameOver] = useState(false);
	const [didWin, setDidWin] = useState(false);

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

	const isBossRound = useCallback(
		() => roundCount > 0 && roundCount % 5 === 0,
		[roundCount]
	);

	const startGame = useCallback(
		(currentBoss: [BossType, BossModifier], reseeded: boolean) => {
			/**
			 * Uses roundCountRef because using roundCount would trigger a re-render.
			 * Needs a +1 because roundCount hasn't been incremented yet.
			 */
			const isBossRound =
				roundCountRef.current > 0 && (roundCountRef.current + 1) % 5 === 0;

			setTrack(isBossRound);

			// Clear arrays so that initialized value doesn't get included.
			setTargets([]);
			setOriginalTargets([]);

			const initialNum = getRng();

			const targetCount =
				currentBoss[0] === BossType.Wrath && isBossRound ? 3 : 1;

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
			setInitialMoney(money);

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
		[getRng, money, rngMax, setTrack, startMoney]
	);

	const restartRound = () => {
		rngRef.current = seedrandom("", { state: rngStateRef.current });
		setInitialNum(initialNum);
		setMoney(initialMoney);
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
		if (isBossRound()) {
			switch (boss?.[0]) {
				case BossType.Greed:
					setMoney((money) => money - 5); // TODO: Magic number
					break;
				default:
					break;
			}
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
				setGameOver(true);
				setDidWin(false);
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

		if (roundCount === 20) {
			console.log("you win");
			setGameOver(true);
			setDidWin(true);
		}

		setMoney((money) => money + prize * (isBossRound() ? 2 : 1));
		setShopOpen(true);
	}, [roundCount, prize, targets, isBossRound]);

	useEffect(() => {
		if (!shopOpen) return;

		shopRef.current?.generateShop();
		coin();

		window.scrollTo(0, document.body.scrollHeight);
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
			case BossType.Envy:
				setBannedNum(getRng(9));
				break;
			default:
				setBannedNum(undefined);
				break;
		}
	}, [boss, getRng]);

	const copySeed = async () => {
		try {
			await navigator.clipboard.writeText(seed);
			alert(`Copied ${seed} to clipboard.`);
		} catch (err) {
			console.error(err);
		}
	};

	const pasteSeed = async () => {
		try {
			let text = await navigator.clipboard.readText();
			text = text.substring(0, 6);
			reseed(text);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div
			className={`game ${
				Object.entries(extraButtons).length > 8 ? "wide-calc" : ""
			}`}
		>
			<section className="info">
				<section className="seed">
					<label className="seed-label">Seed</label>
					<button
						className="seed-button"
						onClick={() => reseed(generateRandomSeed())}
						title="Reseed"
						type="button"
					>
						<p>🔄</p>
					</button>
					<p className="seed-input">{seed}</p>
					<button
						className="seed-button"
						onClick={() => copySeed()}
						title="Copy"
						type="button"
					>
						<p>✂️</p>
					</button>
					<button
						className="seed-button"
						onClick={() => pasteSeed()}
						title="Paste"
						type="button"
					>
						<p>📋</p>
					</button>
				</section>
				<section className="stat-text">
					<section className="stat-text-container">
						<section className="money">
							<p className="stats">
								<span className="stat-label">MONEY</span>
								<span
									className={`stat-value ${money < 1 ? "debt" : "positive"}`}
								>{`${money}`}</span>
							</p>
						</section>
						<section className="round">
							<p className="stats">
								<span className="stat-label">ROUND</span>
								<span className="stat-value neutral">{`${roundCount}/20`}</span>
							</p>
						</section>
						<section className="turns">
							<p className="stats">
								<span className="stat-label">TURNS</span>
								<span className="stat-value neutral">{turnCount}</span>
							</p>
						</section>
					</section>
					<button className="restart-button" onClick={restartRound}>
						Restart round
					</button>
				</section>
				<section className="target-text-container">
					<section className="target">
						<p className="target-text">
							<span className="target-label">{`Target number${
								targets.length <= 1 ? "" : "s"
							}:`}</span>
							<span className="target-number">{targets.join(",")}</span>
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
						{boss[0] === BossType.Envy && (
							<p>
								<span>Banned number: </span>
								<span className="banned-number">{`${
									roundCount % 5 === 0 ? bannedNum : "Revealed on boss round"
								}`}</span>
							</p>
						)}
					</section>
				)}
				{canCheat && (
					<section className="cheats">
						<h2>Cheats</h2>
						<div className="button-group">
							<button onClick={() => startGame(boss!, false)}>
								Force next round
							</button>
							<button onClick={() => setShopOpen(!shopOpen)}>
								Toggle shop
							</button>
						</div>
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
				isBossLevel={isBossRound()}
				bossModifier={isBossRound() ? boss?.[0] : undefined}
				bannedNum={isBossRound() ? bannedNum : undefined}
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
						if (isBossRound()) {
							const newBoss = getRandomBoss();
							setBoss(newBoss);
							startGame(newBoss, false);
						} else {
							startGame(boss!, false);
						}
					}}
				/>
			)}
			{gameOver && (
				<div className="game-end-container">
					<div className="game-end-modal">
						<section className="text">
							<h1>{didWin ? "You win!" : "Game over..."}</h1>
							<p>{`You played ${roundCount} round${
								roundCount === 1 ? "" : "s"
							}!`}</p>
						</section>
						<section className="button-group">
							{didWin && (
								<button onClick={() => setGameOver(false)}>Endless mode</button>
							)}
							<button onClick={() => setScene(SceneType.Home)}>
								Main menu
							</button>
						</section>
					</div>
				</div>
			)}
		</div>
	);
}

export default React.memo(GameScene);
