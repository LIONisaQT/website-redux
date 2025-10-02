import "./CrewManager.scss";
import {
	DragEndEvent,
	DndContext,
	pointerWithin,
	useSensor,
	PointerSensor,
} from "@dnd-kit/core";
import {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useMemo,
	useRef,
} from "react";
import { Paddler, SideArray, PaddlerLocation, Crew } from "../../types";
import { generateLineup } from "../../utils/utils";
import Boat from "../Boat/Boat";
import Roster from "../Roster/Roster";
import Toggles from "../Toggles/Toggles";
import AddNewPaddler from "../Roster/AddNewPaddler";

interface CrewManagerProps {
	crew: Crew;
	onClose?: (crew: Crew) => void;
	onEdit?: (crew: Crew) => void;
}

export default function CrewManager({
	crew,
	onClose,
	onEdit,
}: CrewManagerProps) {
	const isMounted = useRef(false);

	const [numRows, setNumRows] = useState(crew.numRows);
	const [centerMass, setCenterMass] = useState(crew.centerMass);

	const [roster, setRoster] = useState<Paddler[]>(crew.roster);
	const [leftSide, setLeftSide] = useState<SideArray>(crew.leftSide);
	const [rightSide, setRightSide] = useState<SideArray>(crew.rightSide);
	const [drum, setDrum] = useState<Paddler | null>(crew.drum);
	const [steer, setSteer] = useState<Paddler | null>(crew.steer);

	const [name, setName] = useState(crew.name);
	const [updatedName, setUpdatedName] = useState(crew.name);

	const [addModalOpen, setAddModalOpen] = useState(false);

	useEffect(() => {
		// Prevent saving on mount
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		const updatedCrew = {
			...crew,
			name: updatedName,
			numRows,
			centerMass,
			leftSide,
			rightSide,
			drum,
			steer,
			roster,
		};

		// Prevent saving when nothing has changed
		if (JSON.stringify(updatedCrew) !== JSON.stringify(crew)) {
			onEdit?.(updatedCrew);
		}
	}, [
		crew,
		onEdit,
		updatedName,
		numRows,
		centerMass,
		leftSide,
		rightSide,
		drum,
		steer,
		roster,
	]);

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

	const pointerSensor = useSensor(PointerSensor, {
		activationConstraint: {
			distance: 8,
		},
	});

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

	const onAddNewClicked = () => setAddModalOpen(true);

	const addNewPaddler = (newPaddler: Paddler) => {
		setAddModalOpen(false);
		setRoster((prev) => [...prev, newPaddler]);
	};

	const editPaddler = (paddler: Paddler) => {
		// setAddModalOpen(true);
		// setRoster((prev) =>
		// 	prev.map((p) => (p.name === paddler.name ? paddler : p))
		// );
		console.log("edit", paddler);
	};

	const deletePaddler = (
		paddler: Paddler,
		location: PaddlerLocation,
		position: number | "drum" | "steer"
	) => {
		removeMap[location]?.(paddler, position as number);
	};

	return (
		<div className="crew-manager-container">
			{onClose && (
				<button className="close-button" onClick={() => onClose(crew)}>
					✕
				</button>
			)}
			<input
				className="crew-name"
				defaultValue={crew.name}
				onChange={(e) => setName(e.target.value)}
				onBlur={() => setUpdatedName(name)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.currentTarget.blur();
					}
				}}
			/>
			<DndContext
				onDragEnd={handleDragEnd}
				collisionDetection={pointerWithin}
				sensors={[pointerSensor]}
			>
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
							editPaddler={editPaddler}
							deletePaddler={deletePaddler}
						/>
					</section>
					<Roster
						rosterState={[roster, setRoster]}
						addNew={onAddNewClicked}
						editPaddler={editPaddler}
						deletePaddler={deletePaddler}
					/>
				</div>
				<AddNewPaddler
					openState={[addModalOpen, setAddModalOpen]}
					onAddNew={addNewPaddler}
				/>
			</DndContext>
		</div>
	);
}
