import { useEffect, useState } from "react";
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
	const [crew, setCrew] = useState<Paddler[]>([]);
	const [rowSize] = useState(10);

	useEffect(() => {
		setCrew(sampleCrew);
	}, []);

	return (
		<>
			<h1>Dragon Boat Balancer</h1>
			<div className="balancer-main-container">
				<section className="boat-container">
					<h2>Boat</h2>
					<div className="boat">
						<div className="left paddlers">
							{Array.from({ length: rowSize }).map((_, i) => (
								<PaddlerCard key={"left-" + i} position={i + 1} />
							))}
						</div>
						<div className="center">
							<div className="drum">
								<PaddlerCard position={"drum"} />
							</div>
							<div className="steer">
								<PaddlerCard position={"steer"} />
							</div>
						</div>
						<div className="right paddlers">
							{Array.from({ length: rowSize }).map((_, i) => (
								<PaddlerCard key={"right-" + i} position={i + 1} />
							))}
						</div>
					</div>
				</section>
				<section className="roster-container">
					<h2>Reserve</h2>
					<div className="roster">
						{crew.map((paddler, i) => (
							<PaddlerCard key={`${paddler.name}-${i}`} details={paddler} />
						))}
					</div>
				</section>
			</div>
		</>
	);
}

interface PaddlerProps {
	details?: Paddler;
	position?: number | "drum" | "steer";
}

function PaddlerCard({ details, position }: PaddlerProps) {
	return (
		<div className={`paddler-card ${details ? "details" : "empty"}`}>
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
