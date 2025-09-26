import "./Toggles.scss";
import { Dispatch, SetStateAction } from "react";
import FrontBackBalance from "./FrontBackBalance";

interface TogglesProps {
	centerMassState: [number, Dispatch<SetStateAction<number>>];
}

export default function Toggles({ centerMassState }: TogglesProps) {
	return (
		<section className="toggles">
			<FrontBackBalance centerMassState={centerMassState} />
		</section>
	);
}
