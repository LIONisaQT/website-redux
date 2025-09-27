import "./CrewManager.scss";
import { DragEndEvent, DndContext, pointerWithin } from "@dnd-kit/core";
import { useState, useEffect, Dispatch, SetStateAction, useMemo } from "react";
import { Paddler, SideArray, PaddlerLocation } from "../../types";
import { sampleCrew } from "../../utils/sample-crew";
import { generateLineup } from "../../utils/utils";
import Boat from "../Boat/Boat";
import Roster from "../Roster/Roster";
import Toggles from "../Toggles/Toggles";

export default function CrewManager() {
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

	useEffect(() => {
		const resizeSide = (setSide: Dispatch<SetStateAction<SideArray>>) => {
			setSide((prev) => {
				const copy = [...prev];

				if (numRows > copy.length) {
					copy.push(...Array(numRows - copy.length).fill(null));
				} else if (numRows < copy.length) {
					const removed = copy.slice(numRows).filter(Boolean) as Paddler[];
					if (removed.length > 0) {
						setRoster((prevRoster) => [...prevRoster, ...removed]);
					}
					copy.length = numRows;
				}

				return copy;
			});
		};

		resizeSide(setLeftSide);
		resizeSide(setRightSide);
	}, [numRows, setRoster, setLeftSide, setRightSide]);

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
			left: (p: Paddler, targetPos: number) => {
				setLeftSide((prev) => {
					const copy = [...prev];
					copy[targetPos] = p;
					return copy;
				});
			},
			right: (p: Paddler, targetPos) => {
				setRightSide((prev) => {
					const copy = [...prev];
					copy[targetPos] = p;
					return copy;
				});
			},
			drum: (p: Paddler) => setDrum(p),
			steer: (p: Paddler) => setSteer(p),
			roster: (p: Paddler, index: number) => {
				setRoster((prev) => {
					const newRoster = [...prev];
					newRoster.splice(index, 0, p);
					return newRoster;
				});
			},
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
		const { active, over } = event;

		const dragged = active.data.current?.details as Paddler;
		const currentLocation = active.data.current?.location as PaddlerLocation;
		const currentPosition = active.data.current?.position ?? 0;

		const destination = over?.data.current;
		const newLocation = destination?.location as PaddlerLocation | undefined;
		const newPosition = destination?.position;

		// Helpers for single-slot positions
		const getSingleSlot = (loc: PaddlerLocation) =>
			loc === "drum" ? drum : steer;

		const setSingleSlot = (loc: PaddlerLocation, value: Paddler | null) => {
			if (loc === "drum") setDrum(value);
			else if (loc === "steer") setSteer(value);
		};

		// Dropped outside → return to roster
		if (!destination) {
			if (currentLocation === "roster") return;
			removeMap[currentLocation]?.(dragged, currentPosition);
			addMap["roster"]?.(dragged, roster.length);
			return;
		}

		// Same location + same position → nothing to do
		if (currentLocation === newLocation && currentPosition === newPosition)
			return;

		const isSourceArray = !["drum", "steer"].includes(currentLocation);
		const isDestArray = !["drum", "steer"].includes(newLocation!);

		// Read destination before removing anything
		const existingDest = isDestArray
			? (getTarget(newLocation!) as Paddler[])[
					newPosition ?? (getTarget(newLocation!) as Paddler[]).length
			  ] ?? null
			: getSingleSlot(newLocation!);
		const destIndex = isDestArray
			? newPosition ?? (getTarget(newLocation!) as Paddler[]).length
			: 0;

		// Remove dragged from source
		if (isSourceArray) removeMap[currentLocation]?.(dragged, currentPosition);
		else setSingleSlot(currentLocation, null);

		// Place dragged into destination, swap if needed
		if (isDestArray) {
			if (existingDest) {
				removeMap[newLocation!]?.(existingDest, destIndex);
				if (isSourceArray)
					addMap[currentLocation]?.(existingDest, currentPosition);
				else setSingleSlot(currentLocation, existingDest);
			}
			addMap[newLocation!]?.(dragged, destIndex);
		} else {
			if (existingDest) {
				if (isSourceArray)
					addMap[currentLocation]?.(existingDest, currentPosition);
				else setSingleSlot(currentLocation, existingDest);
			}
			setSingleSlot(newLocation!, dragged);
		}
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

	const onRecallClicked = () => {
		setRoster((prev) => [
			...prev,
			...leftSide.filter((p): p is Paddler => p !== null),
			...rightSide.filter((p): p is Paddler => p !== null),
			...(drum ? [drum] : []),
			...(steer ? [steer] : []),
		]);

		setLeftSide(Array(numRows).fill(null));
		setRightSide(Array(numRows).fill(null));
		setDrum(null);
		setSteer(null);
	};

	const isRecallEnabled =
		leftSide.some((p) => p !== null) ||
		rightSide.some((p) => p !== null) ||
		drum !== null ||
		steer !== null;

	return (
		<div className="crew-manager-container">
			<DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
				<div className="crew-manager">
					<section className="main">
						<Toggles
							centerMassState={[centerMass, setCenterMass]}
							numRowsState={[numRows, setNumRows]}
						/>
						<section className="button-group">
							<button onClick={onGenerateLineupClicked}>Generate lineup</button>
							<button onClick={onRecallClicked} disabled={!isRecallEnabled}>
								Recall all paddlers
							</button>
						</section>
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
		</div>
	);
}
