import { useEffect, useRef, useState } from "react";
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
	const [leftSide, setLeftSide] = useState<Paddler[]>([]);
	const [rightSide, setRightSide] = useState<Paddler[]>([]);
	const [drum, setDrum] = useState<Paddler | null>(null);
	const [steer, setSteer] = useState<Paddler | null>(null);

	const [dragging, setDragging] = useState(false);
	const rosterRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setRoster(sampleCrew);
	}, []);

	useEffect(() => {
		return monitorForElements({
			onDragStart: () => setDragging(true),
			onDrop({ source, location }) {
				setDragging(false);
				const destination = location.current.dropTargets[0];
				if (!destination) return;

				const paddler = source.data.details as Paddler;
				const locationDropped = destination.data.location;

				switch (locationDropped) {
					case "left":
						setLeftSide((prev) => [...prev, paddler]);
						setRoster((prev) => prev.filter((p) => p.name !== paddler.name));
						break;
					case "right":
						setRightSide((prev) => [...prev, paddler]);
						setRoster((prev) => prev.filter((p) => p.name !== paddler.name));
						break;
					case "drum":
						setDrum(paddler);
						setRoster((prev) => prev.filter((p) => p.name !== paddler.name));
						break;
					case "steer":
						setSteer(paddler);
						setRoster((prev) => prev.filter((p) => p.name !== paddler.name));
						break;
					case "roster":
						setRoster((prev) => [...prev, paddler]);
						break;
					default:
						console.log("Set in some other location");
						break;
				}
			},
		});
	}, []);

	useEffect(() => {
		if (!rosterRef.current) return;

		const el = rosterRef.current;

		return dropTargetForElements({
			element: el,
			getData: () => ({ location: "roster" }),
		});
	}, []);

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
									key={`${paddler.name}-${i}`}
									details={paddler}
									position={i + 1}
									location="left"
								/>
							))}
							{Array.from({ length: rowSize - leftSide.length }).map((_, i) => (
								<PaddlerCard
									details={null}
									key={"left-" + i}
									position={i + 1}
									location="left"
								/>
							))}
						</div>
						<div className="center">
							<div className="drum">
								<PaddlerCard details={drum} position={"drum"} location="drum" />
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
									key={`${paddler.name}-${i}`}
									details={paddler}
									position={i + 1}
									location="right"
								/>
							))}
							{Array.from({ length: rowSize - rightSide.length }).map(
								(_, i) => (
									<PaddlerCard
										details={null}
										key={"right-" + i}
										position={i + 1}
										location="right"
									/>
								)
							)}
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
							<PaddlerCard key={`${paddler.name}-${i}`} details={paddler} />
						))}
					</div>
				</section>
			</div>
		</>
	);
}

interface PaddlerProps {
	details: Paddler | null;
	position?: number | "drum" | "steer";
	location?: "left" | "right" | "drum" | "steer";
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
			getInitialData: () => ({ details }),
			onDragStart: () => setDragging(true),
			onDrop: () => setDragging(false),
		});
	}, [details]);

	useEffect(() => {
		if (!ref.current) return;
		if (details) return;

		const el = ref.current;

		return dropTargetForElements({
			element: el,
			getData: () => ({ details, location }),
			onDragEnter: () => setIsDraggedOver(true),
			onDragLeave: () => setIsDraggedOver(false),
			onDrop: () => setIsDraggedOver(false),
		});
	}, [details, location]);

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
