export type Paddler = {
	name: string;
	side: "left" | "right" | "both";
	weight: number;
};

export type PaddlerLocation = "left" | "right" | "drum" | "steer" | "roster";

export type SideArray = (Paddler | null)[];
