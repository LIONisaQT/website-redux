import "./App.scss";
import CrewList from "./components/CrewList/CrewList";
import { sampleCrew } from "./utils/sample-crew";
import CrewManager from "./components/CrewManager/CrewManager";
import { Crew } from "./types";
import { useState } from "react";

export default function App() {
	const [activeCrews, setActiveCrews] = useState<Crew[]>([]);

	const onViewClicked = (crew: Crew) => {
		setActiveCrews((prev) => [...prev, crew]);
	};

	const onDeleteClicked = (crew: Crew) => {
		console.log(`Delete ${crew.name}`);
	};

	return (
		<>
			<h1 className="title">Dragon Boat Balancer</h1>
			<CrewList
				data={[sampleCrew, sampleCrew, sampleCrew]}
				onView={onViewClicked}
				onDelete={onDeleteClicked}
			/>
			<section className="active-crews">
				{activeCrews.map((crew, i) => (
					<CrewManager key={`${i}-${crew.id}`} crew={crew} />
				))}
			</section>
		</>
	);
}
