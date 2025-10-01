import { Paddler } from "../../types";
import "./AddNewPaddler.scss";
import { Dispatch, SetStateAction, useState } from "react";

interface AddNewPaddlerProps {
	openState: [boolean, Dispatch<SetStateAction<boolean>>];
	onAddNew: (newPaddler: Paddler) => void;
}

export default function AddNewPaddler({
	openState,
	onAddNew,
}: AddNewPaddlerProps) {
	const [isOpen, setOpen] = openState;
	const [name, setName] = useState<string>();
	const [side, setSide] = useState("both");
	const [weight, setWeight] = useState(100);

	return (
		<div className={`new-paddler-container ${isOpen ? "" : "hidden"}`}>
			<div className="background" onClick={() => setOpen(false)} />
			<div className="new-paddler-modal">
				<h2>New paddler</h2>
				<section>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						placeholder="Paddler name"
						value={name}
						onChange={(e) => setName(e.target.value ?? "Paddler name")}
					/>
				</section>
				<section>
					<label htmlFor="side-pref">Side preference</label>
					<select
						id="side-pref"
						defaultValue={side}
						onChange={(e) => setSide(e.target.value)}
					>
						<option value="left">Left</option>
						<option value="right">Right</option>
						<option value="both">Both</option>
					</select>
				</section>
				<section>
					<label htmlFor="weight">Weight</label>
					<input
						type="number"
						id="weight"
						placeholder={weight.toString()}
						onChange={(e) => setWeight(Number(e.target.value))}
					></input>
				</section>
				<section className="button-group">
					<button onClick={() => onAddNew({ name, side, weight } as Paddler)}>
						Add
					</button>
					<button onClick={() => setOpen(false)}>Cancel</button>
				</section>
			</div>
		</div>
	);
}
