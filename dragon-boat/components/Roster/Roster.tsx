import "./Roster.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Paddler } from "../../types";
import { sortRosterByWeight, sortRosterBySide } from "../../utils/utils";
import PaddlerCard from "../PaddlerCard/PaddlerCard";

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
			<div className={`new-paddler-container ${addModalOpen ? "" : "hidden"}`}>
				<div className="new-paddler-modal">
					<h2>New paddler</h2>
					<section>
						<label htmlFor="name">Name</label>
						<input type="text" id="name" placeholder="John Paddler" />
					</section>
					<section>
						<label htmlFor="side-pref">Side preference</label>
						<select id="side-pref" defaultValue={"Both"}>
							<option value="left">Left</option>
							<option value="right">Right</option>
							<option value="both">Both</option>
						</select>
					</section>
					<section>
						<label htmlFor="weight">Weight</label>
						<input type="number" id="weight" placeholder="0"></input>
					</section>
					<section className="button-group">
						<button onClick={addNewPaddler}>Add</button>
						<button onClick={() => setAddModalOpen(false)}>Cancel</button>
					</section>
				</div>
			</div>
		</section>
	);
}
