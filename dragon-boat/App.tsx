import "./App.scss";
import { useEffect, useMemo, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Paddler, SideArray, PaddlerLocation } from "./types";
import { generateLineup } from "./utils/utils";
import Boat from "./components/Boat/Boat";
import Roster from "./components/Roster/Roster";
import Toggles from "./components/Toggles/Toggles";
import { sampleCrew } from "./utils/sample-crew";

export default function App() {
	const [numRows, setNumRows] = useState(10);
	const [centerMass, setCenterMass] = useState(5);

	const [roster, setRoster] = useState<Paddler[]>([]);
	const [leftSide, setLeftSide] = useState<SideArray>(
		Array(numRows).fill(null)
	);
	const [rightSide, setRightSide] = useState<SideArray>(
		Array(numRows).fill(null)
	);
	const [drum, setDrum] = useState<Paddler | null>(null);
	const [steer, setSteer] = useState<Paddler | null>(null);

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

	const handleDragEnd = (event: DragEndEvent) => {
		const { over } = event;

		const paddler = event.active.data.current?.details as Paddler;
		const currentLocation = event.active.data.current
			?.location as PaddlerLocation;
		const currentPosition = event.active.data.current?.position as number;

		const destination = over?.data.current;

		// Return paddler back to roster
		if (!destination) {
			removeMap[currentLocation]?.(paddler, currentPosition ?? 0);
			addMap["roster"]?.(paddler, roster.length);
			return;
		}

		const newLocation = destination.location as PaddlerLocation;
		const newPosition = destination.position as number;

		const destinationArray = getTarget(newLocation);
		const existingPaddler =
			newPosition !== undefined && !isNaN(newPosition)
				? destinationArray[newPosition]
				: destinationArray[0];

		removeMap[currentLocation]?.(paddler, currentPosition ?? 0);

		// Dragging from anywhere into roster just adds them to the end lol
		if (existingPaddler) {
			removeMap[newLocation]?.(existingPaddler, newPosition ?? 0);
			addMap[currentLocation]?.(existingPaddler, currentPosition ?? 0);
		}

		addMap[newLocation]?.(paddler, newPosition ?? 0);
	};

	const onGenerateLineupClicked = () => {
		const available = [
			...roster,
			...leftSide.filter((p): p is Paddler => p !== null),
			...rightSide.filter((p): p is Paddler => p !== null),
		];

		const lineup = generateLineup(available, centerMass, numRows);

		setLeftSide(lineup.left);
		setRightSide(lineup.right);
		setRoster(lineup.remainingRoster);
	};

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<h1 className="title">Dragon Boat Balancer</h1>
			<div className="balancer-main-container">
				<section className="main">
					<Toggles
						centerMassState={[centerMass, setCenterMass]}
						numRowsState={[numRows, setNumRows]}
					/>
					<button onClick={onGenerateLineupClicked}>Generate lineup</button>
					<Boat
						leftSide={leftSide}
						rightSide={rightSide}
						drum={drum}
						steer={steer}
						rowSize={numRows}
					/>
				</section>
				<Roster rosterState={[roster, setRoster]} />
			</div>
		</DndContext>
	);
}
