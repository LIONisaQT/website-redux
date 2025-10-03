export type Paddler = {
	name: string;
	side: "left" | "right" | "both";
	weight: number;
};

export type PaddlerLocation = "left" | "right" | "drum" | "steer" | "roster";

export type SideArray = (Paddler | null)[];

export type Roster = {
	id: string;
	name: string;
	paddlers: Paddler[];
};

export type Crew = {
	id: string;
	name: string;
	numRows: number;
	centerMass: number;
	leftSide: SideArray;
	rightSide: SideArray;
	drum: Paddler | null;
	steer: Paddler | null;
	roster: Paddler[];
};
