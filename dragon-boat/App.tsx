import "./App.scss";
import CrewList from "./components/CrewList/CrewList";
import { sampleCrew } from "./utils/sample-crew";
import CrewManager from "./components/CrewManager/CrewManager";

export default function App() {
	return (
		<>
			<h1 className="title">Dragon Boat Balancer</h1>
			<CrewList data={[sampleCrew, sampleCrew, sampleCrew]} />
			<CrewManager />
		</>
	);
}
