import { useEffect, useMemo, useRef, useState } from "react";
import {
	draggable,
	dropTargetForElements,
	monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import "./App.scss";

type Paddler = {
	name: string;
	side: "left" | "right" | "both";
	weight: number;
};

type PaddlerLocation = "left" | "right" | "drum" | "steer" | "roster";

type SideArray = (Paddler | null)[];

const sampleCrew: Paddler[] = [
	{ name: "Ryan", side: "both", weight: 150 },
	{ name: "Alex", side: "left", weight: 176 },
	{ name: "Samantha", side: "right", weight: 132 },
	{ name: "David", side: "both", weight: 195 },
	{ name: "Emily", side: "left", weight: 120 },
	{ name: "Jason", side: "right", weight: 163 },
	{ name: "Olivia", side: "both", weight: 144 },
	{ name: "Michael", side: "left", weight: 182 },
	{ name: "Sophia", side: "right", weight: 97 },
	{ name: "Ethan", side: "both", weight: 154 },
	{ name: "Isabella", side: "left", weight: 111 },
	{ name: "Daniel", side: "right", weight: 178 },
	{ name: "Mia", side: "both", weight: 136 },
	{ name: "Matthew", side: "left", weight: 199 },
	{ name: "Charlotte", side: "right", weight: 121 },
	{ name: "James", side: "both", weight: 171 },
	{ name: "Amelia", side: "left", weight: 138 },
	{ name: "Benjamin", side: "right", weight: 192 },
	{ name: "Harper", side: "both", weight: 115 },
	{ name: "Lucas", side: "left", weight: 167 },
	{ name: "Ella", side: "right", weight: 124 },
	{ name: "Henry", side: "both", weight: 142 },
	{ name: "Avery", side: "left", weight: 106 },
	{ name: "Jack", side: "right", weight: 185 },
	{ name: "Scarlett", side: "both", weight: 134 },
	{ name: "William", side: "left", weight: 193 },
	{ name: "Grace", side: "right", weight: 100 },
	{ name: "Liam", side: "both", weight: 159 },
	{ name: "Chloe", side: "left", weight: 109 },
	{ name: "Noah", side: "right", weight: 174 },
];

export default function App() {
	const [rowSize] = useState(10);
	const [roster, setRoster] = useState<Paddler[]>([]);
	const [leftSide, setLeftSide] = useState<SideArray>(
		Array(rowSize).fill(null)
	);
	const [rightSide, setRightSide] = useState<SideArray>(
		Array(rowSize).fill(null)
	);
	const [drum, setDrum] = useState<Paddler | null>(null);
	const [steer, setSteer] = useState<Paddler | null>(null);

	const [dragging, setDragging] = useState(false);
	const rosterRef = useRef<HTMLDivElement>(null);

	const [centerMass, setCenterMass] = useState(5);

	useEffect(() => {
		setRoster(sampleCrew);
	}, []);

	const removeMap = useMemo<
		Record<PaddlerLocation, (p: Paddler, pos: number) => void>
	>(
		() => ({
			left: (_p, pos) => {
				if (pos === undefined) return;
				setLeftSide((prev) => {
					const copy = [...prev];
					copy[pos] = null;
					return copy;
				});
			},
			right: (_p, pos) => {
				if (pos === undefined) return;
				setRightSide((prev) => {
					const copy = [...prev];
					copy[pos] = null;
					return copy;
				});
			},
			drum: () => setDrum(null),
			steer: () => setSteer(null),
			roster: (p) => setRoster((prev) => prev.filter((x) => x.name !== p.name)),
		}),
		[setLeftSide, setRightSide, setDrum, setSteer, setRoster]
	);

	const addMap = useMemo<
		Record<PaddlerLocation, (p: Paddler, targetPos: number) => void>
	>(
		() => ({
			left: (p, targetPos) => {
				if (targetPos === undefined) return;
				setLeftSide((prev) => {
					const copy = [...prev];
					copy[targetPos] = p;
					return copy;
				});
			},
			right: (p, targetPos) => {
				if (targetPos === undefined) return;
				setRightSide((prev) => {
					const copy = [...prev];
					copy[targetPos] = p;
					return copy;
				});
			},
			drum: (p) => setDrum(p),
			steer: (p) => setSteer(p),
			roster: (p) => setRoster((prev) => [...prev, p]),
		}),
		[setLeftSide, setRightSide, setDrum, setSteer, setRoster]
	);

	useEffect(() => {
		return monitorForElements({
			onDragStart: () => setDragging(true),
			onDrop({ source, location }) {
				setDragging(false);

				const paddler = source.data.details as Paddler;
				const currentLocation = source.data.location as PaddlerLocation;
				const currentPosition = source.data.position as number;
				const destination = location.current.dropTargets[0];

				if (!destination) return;

				const newLocation = destination.data.location as PaddlerLocation;
				const newPosition = destination.data.position as number;

				const getTarget = (loc: PaddlerLocation) => {
					switch (loc) {
						case "left":
							return leftSide;
						case "right":
							return rightSide;
						case "roster":
							return roster;
						case "drum":
							return drum ? [drum] : [null];
						case "steer":
							return steer ? [steer] : [null];
					}
				};

				const destinationArray = getTarget(newLocation);
				const existingPaddler =
					newPosition !== undefined && !isNaN(newPosition)
						? destinationArray[newPosition]
						: destinationArray[0];

				// Case 1: seat/drum/steer -> seat/drum/steer
				if (
					currentLocation !== "roster" &&
					newLocation !== "roster" &&
					currentLocation !== newLocation
				) {
					removeMap[currentLocation]?.(paddler, currentPosition ?? 0);

					if (existingPaddler) {
						removeMap[newLocation]?.(existingPaddler, newPosition ?? 0);
						addMap[currentLocation]?.(existingPaddler, currentPosition ?? 0);
					}

					addMap[newLocation]?.(paddler, newPosition ?? 0);
					return;
				}

				// Case 2: roster -> seat/drum/steer
				if (currentLocation === "roster" && newLocation !== "roster") {
					removeMap[currentLocation]?.(paddler, currentPosition);

					if (existingPaddler) {
						removeMap[newLocation]?.(existingPaddler, newPosition ?? 0);
						// TODO: Pretty sure it just appends to the roster LOL
						addMap["roster"]?.(existingPaddler, currentPosition);
					}

					addMap[newLocation]?.(paddler, newPosition ?? 0);
					return;
				}

				// Case 3: fallback or same list -> same list
				removeMap[currentLocation]?.(paddler, currentPosition);
				addMap[newLocation]?.(paddler, newPosition);
			},
		});
	}, [addMap, drum, leftSide, removeMap, rightSide, roster, steer]);

	useEffect(() => {
		if (!rosterRef.current) return;

		const el = rosterRef.current;

		return dropTargetForElements({
			element: el,
			getData: () => ({ location: "roster" }),
		});
	}, []);

	const sumSideWeight = (side: SideArray): number =>
		side.reduce((total, paddler) => total + (paddler?.weight ?? 0), 0);

	const getCenterOfMass = (left: SideArray, right: SideArray): number => {
		let weightedSum = 0;
		let totalWeight = 0;

		for (let i = 0; i < rowSize; i++) {
			const leftPaddler = left[i];
			const rightPaddler = right[i];

			if (leftPaddler) {
				weightedSum += i * leftPaddler.weight;
				totalWeight += leftPaddler.weight;
			}

			if (rightPaddler) {
				weightedSum += i * rightPaddler.weight;
				totalWeight += rightPaddler.weight;
			}
		}

		if (totalWeight === 0) return 0;

		return Number((weightedSum / totalWeight + 1).toFixed(2));
	};

	const generateLineup = (
		roster: Paddler[],
		targetRow: number,
		numRows: number
	) => {
		const left: SideArray = Array(numRows).fill(null);
		const right: SideArray = Array(numRows).fill(null);

		let available = [
			...roster,
			...leftSide.filter((p): p is Paddler => p !== null),
			...rightSide.filter((p): p is Paddler => p !== null),
		];

		// Sort paddlers by weight since heavier weights influence center of mass more
		const sortedPaddlers = [...available].sort((a, b) => b.weight - a.weight);

		/**
		 * Greedy algorithm to find optimal position for a paddler.
		 *
		 * Fills seat, then checks weight balance + center of mass of the boat.
		 *
		 * Lower score is better, since that means placing a paddler there gets the
		 * boat closer to desired target.
		 */
		for (const paddler of sortedPaddlers) {
			const candidatePositions: Array<{
				side: "left" | "right" | "both";
				index: number;
				score: number;
			}> = [];

			for (let i = 0; i < numRows; i++) {
				if ((paddler.side === "left" || paddler.side === "both") && !left[i]) {
					const tempLeft = [...left];
					tempLeft[i] = paddler;
					const balance = Math.abs(
						sumSideWeight(tempLeft) - sumSideWeight(right)
					);
					const com = getCenterOfMass(tempLeft, right);
					const score = balance + Math.abs(com - targetRow);
					candidatePositions.push({ side: "left", index: i, score });
				}

				if (
					(paddler.side === "right" || paddler.side === "both") &&
					!right[i]
				) {
					const tempRight = [...right];
					tempRight[i] = paddler;
					const balance = Math.abs(
						sumSideWeight(left) - sumSideWeight(tempRight)
					);
					const com = getCenterOfMass(left, tempRight);
					const score = balance + Math.abs(com - targetRow);
					candidatePositions.push({ side: "right", index: i, score });
				}
			}

			if (candidatePositions.length === 0) continue;

			candidatePositions.sort((a, b) => a.score - b.score);
			const best = candidatePositions[0];

			if (best.side === "left") left[best.index] = paddler;
			else right[best.index] = paddler;

			available = available.filter((p) => p.name !== paddler.name);
		}

		setLeftSide(left);
		setRightSide(right);
		setRoster(available);
	};

	const sortRosterByWeight = () => {
		setRoster((prev) => [...prev].sort((a, b) => b.weight - a.weight));
	};

	const sortRosterBySide = () => {
		const sideOrder: Record<"left" | "right" | "both", number> = {
			left: 0,
			both: 1,
			right: 2,
		};
		setRoster((prev) =>
			[...prev].sort((a, b) => sideOrder[a.side] - sideOrder[b.side])
		);
	};

	return (
		<>
			<h1>Dragon Boat Balancer</h1>
			<div className="balancer-main-container">
				<section className="toggles">
					<h2>Toggles</h2>
					<section className="front-back-balance">
						<h3>Front/back balance</h3>
						<p>Desired center of mass for boat: {centerMass}</p>
						<input
							type="range"
							min={1}
							max={10}
							step={0.5}
							value={centerMass}
							onChange={(e) => setCenterMass(Number(e.target.value))}
						/>
					</section>
					<button onClick={() => generateLineup(roster, centerMass, rowSize)}>
						Generate roster
					</button>
				</section>
				<section className="boat-container">
					<h2>Boat</h2>
					<div className="boat">
						<div className="left paddlers">
							{leftSide.map((paddler, i) => (
								<PaddlerCard
									key={`${paddler?.name}-${i}`}
									details={paddler}
									position={i}
									location="left"
								/>
							))}
						</div>
						<div className="center">
							<div className="drum">
								<PaddlerCard details={drum} position={"drum"} location="drum" />
							</div>
							<div className="boat-stats">
								<section>
									<h3>L/R Bal</h3>
									<p>
										<span>{sumSideWeight(leftSide)}</span>-
										<span>{sumSideWeight(rightSide)}</span>
									</p>
								</section>
								<section>
									<h3>F/B Bal</h3>
									<p>{getCenterOfMass(leftSide, rightSide)}</p>
								</section>
							</div>
							<div className="steer">
								<PaddlerCard
									details={steer}
									position={"steer"}
									location="steer"
								/>
							</div>
						</div>
						<div className="right paddlers">
							{rightSide.map((paddler, i) => (
								<PaddlerCard
									key={`${paddler?.name}-${i}`}
									details={paddler}
									position={i}
									location="right"
								/>
							))}
						</div>
					</div>
				</section>
				<section className="roster-container">
					<h2>Reserve</h2>
					<section className="button-group">
						<button onClick={sortRosterByWeight}>Sort by weight</button>
						<button onClick={sortRosterBySide}>Sort by side</button>
					</section>
					<div className="roster">
						<div
							ref={rosterRef}
							className={`drag-target ${dragging ? "visible" : ""}`}
						>
							<p className="drag-text">
								Drag paddler here to return to roster.
							</p>
						</div>
						{roster.map((paddler, i) => (
							<PaddlerCard
								key={`${paddler.name}-${i}`}
								details={paddler}
								position={i}
								location="roster"
							/>
						))}
					</div>
				</section>
			</div>
		</>
	);
}

interface PaddlerProps {
	details: Paddler | null;
	location: PaddlerLocation;
	position?: number | "drum" | "steer";
}

function PaddlerCard({ details, position, location }: PaddlerProps) {
	const ref = useRef(null);
	const [dragging, setDragging] = useState(false);
	const [isDraggedOver, setIsDraggedOver] = useState(false);

	useEffect(() => {
		const handleTouchMove = (e: TouchEvent) => {
			if (dragging) {
				e.preventDefault();
			}
		};

		document.addEventListener("touchmove", handleTouchMove, { passive: false });

		return () => {
			document.removeEventListener("touchmove", handleTouchMove);
		};
	}, [dragging]);

	useEffect(() => {
		if (!ref.current) return;
		if (!details) return;

		const el = ref.current;

		return draggable({
			element: el,
			getInitialData: () => ({ details, location, position }),
			onDragStart: () => setDragging(true),
			onDrop: () => setDragging(false),
		});
	}, [details, location, position]);

	useEffect(() => {
		if (!ref.current) return;

		const el = ref.current;

		return dropTargetForElements({
			element: el,
			getData: () => ({ details, location, position }),
			onDragEnter: () => setIsDraggedOver(true),
			onDragLeave: () => setIsDraggedOver(false),
			onDrop: () => setIsDraggedOver(false),
		});
	}, [details, location, position]);

	return (
		<div
			ref={ref}
			className={`paddler-card ${details ? "details" : "empty"} ${
				dragging ? "dragging" : ""
			} ${isDraggedOver ? "dragged-over" : ""}`}
		>
			{details ? (
				<>
					<p className="name">
						{typeof position === "number" &&
						(location === "left" || location === "right") ? (
							<span>{position + 1}. </span>
						) : null}
						{details.name}
					</p>
					<div className="info">
						<p className={`${details.side} side`}>
							{details.side[0].toUpperCase()}
						</p>
						<p>{details.weight}</p>
					</div>
				</>
			) : (
				<div className="empty-slot">
					<p>
						{location !== "left" && location !== "right"
							? location.charAt(0).toUpperCase() + location.slice(1)
							: "Empty"}
					</p>
				</div>
			)}
		</div>
	);
}
