import "./App.scss";
import CrewList from "./components/CrewList/CrewList";
import { sampleCrew } from "./utils/sample-crew";
import CrewManager from "./components/CrewManager/CrewManager";
import { Crew } from "./types";

export default function App() {
	const onViewClicked = (crew: Crew) => {
		console.log(`View ${crew.name}`);
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
			<CrewManager />
		</>
	);
}
