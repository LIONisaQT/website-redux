import "./Boat.scss";
import { Paddler, PaddlerLocation, SideArray } from "../../types";
import { sumSideWeight, getCenterOfMass } from "../../utils/utils";
import PaddlerCard from "../PaddlerCard/PaddlerCard";

interface BoatProps {
	leftSide: SideArray;
	rightSide: SideArray;
	drum: Paddler | null;
	steer: Paddler | null;
	rowSize: number;
	editPaddler: (paddler: Paddler) => void;
	deletePaddler: (
		paddler: Paddler,
		location: PaddlerLocation,
		position: number | "drum" | "steer"
	) => void;
}

export default function Boat({
	leftSide,
	rightSide,
	drum,
	steer,
	rowSize,
	editPaddler,
	deletePaddler,
}: BoatProps) {
	return (
		<section className="boat-container">
			<h2>Boat</h2>
			<div className="boat">
				<div className="left paddlers">
					{leftSide.map((paddler, i) => (
						<PaddlerCard
							key={`${paddler?.name}-${i}`}
							details={paddler}
							position={i}
							location="left"
							onEdit={editPaddler}
							onDelete={deletePaddler}
						/>
					))}
				</div>
				<div className="center">
					<div className="drum">
						<PaddlerCard
							details={drum}
							position={"drum"}
							location="drum"
							onEdit={editPaddler}
							onDelete={deletePaddler}
						/>
					</div>
					<div className="boat-stats">
						<section>
							<h3>L/R Bal</h3>
							<p>
								<span>{sumSideWeight(leftSide)}</span>-
								<span>{sumSideWeight(rightSide)}</span>
							</p>
						</section>
						<section>
							<h3>F/B Bal</h3>
							<p>{getCenterOfMass(leftSide, rightSide, rowSize)}</p>
						</section>
					</div>
					<div className="steer">
						<PaddlerCard
							details={steer}
							position={"steer"}
							location="steer"
							onEdit={editPaddler}
							onDelete={deletePaddler}
						/>
					</div>
				</div>
				<div className="right paddlers">
					{rightSide.map((paddler, i) => (
						<PaddlerCard
							key={`${paddler?.name}-${i}`}
							details={paddler}
							position={i}
							location="right"
							onEdit={editPaddler}
							onDelete={deletePaddler}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
