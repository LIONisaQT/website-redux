import "./App.scss";
import CrewList from "./components/CrewList/CrewList";
import { sampleBoat } from "./utils/sample-crew";
// import CrewManager from "./components/CrewManager/CrewManager";

export default function App() {
	return (
		<>
			<h1 className="title">Dragon Boat Balancer</h1>
			<CrewList data={[sampleBoat, sampleBoat, sampleBoat]} />
			{/* <CrewManager /> */}
		</>
	);
}
