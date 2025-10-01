import "./Roster.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Paddler } from "../../types";
import { sortRosterByWeight, sortRosterBySide } from "../../utils/utils";
import PaddlerCard from "../PaddlerCard/PaddlerCard";
import AddNewPaddler from "./AddNewPaddler";

interface RosterProps {
	rosterState: [Paddler[], Dispatch<SetStateAction<Paddler[]>>];
}

export default function Roster({ rosterState }: RosterProps) {
	const [roster, setRoster] = rosterState;
	const [addModalOpen, setAddModalOpen] = useState(false);

	const addNewClicked = () => setAddModalOpen(true);

	const addNewPaddler = () => {
		setAddModalOpen(false);
		const newPaddler: Paddler = {
			name: "John Paddler",
			side: "both",
			weight: 169,
		};

		setRoster((prev) => [...prev, newPaddler]);
	};

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
			<section className="button-group">
				<button onClick={addNewClicked}>Add new paddler</button>
				<button>Import roster from...</button>
			</section>
			<AddNewPaddler
				openState={[addModalOpen, setAddModalOpen]}
				onAddNew={addNewPaddler}
			/>
		</section>
	);
}
