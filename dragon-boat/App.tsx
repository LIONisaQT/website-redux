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

				removeMap[currentLocation]?.(paddler, currentPosition - 1);
				addMap[newLocation]?.(paddler, newPosition - 1);
			},
		});
	}, [addMap, removeMap]);

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

	return (
		<>
			<h1>Dragon Boat Balancer</h1>
			<div className="balancer-main-container">
				<section className="boat-container">
					<h2>Boat</h2>
					<div className="boat">
						<div className="left paddlers">
							{leftSide.map((paddler, i) => (
								<PaddlerCard
									key={`${paddler?.name}-${i}`}
									details={paddler}
									position={i + 1}
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
									position={i + 1}
									location="right"
								/>
							))}
						</div>
					</div>
				</section>
				<section className="roster-container">
					<h2>Reserve</h2>
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
		if (details) return;

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
						{position && typeof position === "number" ? (
							<span>{position}. </span>
						) : null}
						{details.name}
					</p>
					<div className="info">
						<p>{details.side[0].toUpperCase()}</p>
						<p>{details.weight}</p>
					</div>
				</>
			) : (
				<div className="empty-slot">
					<p>Empty</p>
				</div>
			)}
		</div>
	);
}
