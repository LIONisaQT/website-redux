import "./AddNewPaddler.scss";
import { Dispatch, SetStateAction } from "react";

interface AddNewPaddlerProps {
	openState: [boolean, Dispatch<SetStateAction<boolean>>];
	onAddNew: () => void;
}

export default function AddNewPaddler({
	openState,
	onAddNew,
}: AddNewPaddlerProps) {
	const [isOpen, setOpen] = openState;

	return (
		<div className={`new-paddler-container ${isOpen ? "" : "hidden"}`}>
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
					<button onClick={onAddNew}>Add</button>
					<button onClick={() => setOpen(false)}>Cancel</button>
				</section>
			</div>
		</div>
	);
}
