import "./Roster.scss";
import { Dispatch, SetStateAction } from "react";
import { Paddler } from "../../types";
import { sortRosterByWeight, sortRosterBySide } from "../../utils/utils";
import PaddlerCard from "../PaddlerCard/PaddlerCard";

interface RosterProps {
	rosterState: [Paddler[], Dispatch<SetStateAction<Paddler[]>>];
}

export default function Roster({ rosterState }: RosterProps) {
	const [roster, setRoster] = rosterState;

	return (
		<section className="roster-container">
			<h2>Reserve</h2>
			<section className="button-group">
				<button onClick={() => setRoster(sortRosterByWeight(roster))}>
					Sort by weight
				</button>
				<button onClick={() => setRoster(sortRosterBySide(roster))}>
					Sort by side
				</button>
			</section>
			<div className="roster">
				{roster.map((paddler, i) => (
					<PaddlerCard
						key={`${paddler.name}-${i}`}
						details={paddler}
						position={i}
						location="roster"
					/>
				))}
			</div>
		</section>
	);
}
