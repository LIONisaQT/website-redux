import { Paddler } from "../../types";
import { sanitizeNumber, sanitizeText } from "../../utils/utils";
import "./AddNewPaddler.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("modal-open");
		} else {
			document.body.classList.remove("modal-open");
		}

		return () => {
			document.body.classList.remove("modal-open");
		};
	}, [isOpen]);

	return (
		<div className={`new-paddler-container ${isOpen ? "" : "hidden"}`}>
			<div className="background" onClick={() => setOpen(false)} />
			<div className="new-paddler-modal">
				<button className="close-button" onClick={() => setOpen(false)}>
					✕
				</button>
				<h2>New paddler</h2>
				<section>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						placeholder="Paddler name"
						value={name}
						onChange={(e) => setName(sanitizeText(e.target.value))}
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
						min={1}
						max={999}
						onChange={(e) => setWeight(sanitizeNumber(e.target.value, 1, 999))}
						onKeyDown={(e) => {
							if (
								[
									"Backspace",
									"Delete",
									"Tab",
									"Escape",
									"Enter",
									"ArrowLeft",
									"ArrowRight",
									"Home",
									"End",
								].includes(e.key)
							) {
								return;
							}

							if (!/[0-9]/.test(e.key)) {
								e.preventDefault();
							}

							const currentValue = e.currentTarget.value;
							if (currentValue.length >= 3 && /[0-9]/.test(e.key)) {
								e.preventDefault();
							}
						}}
					></input>
				</section>
				<div className="button-group">
					<button
						onClick={() =>
							onAddNew({
								name,
								side,
								weight,
							} as Paddler)
						}
					>
						Add
					</button>
					<button onClick={() => setOpen(false)}>Cancel</button>
				</div>
			</div>
		</div>
	);
}
