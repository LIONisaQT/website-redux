import { Crew, Paddler, Roster } from "../types";

export const sampleCrew: Paddler[] = [
	{ name: "Ryan", side: "both", weight: 150 },
	{ name: "Alex", side: "left", weight: 176 },
	{ name: "Samantha", side: "right", weight: 132 },
	{ name: "David", side: "both", weight: 195 },
	{ name: "Emily", side: "left", weight: 120 },
	{ name: "Jason", side: "right", weight: 163 },
	{ name: "Olivia", side: "both", weight: 144 },
	{ name: "Michael", side: "left", weight: 182 },
	{ name: "Sophia", side: "right", weight: 97 },
	{ name: "Ethan", side: "both", weight: 154 },
	{ name: "Isabella", side: "left", weight: 111 },
	{ name: "Daniel", side: "right", weight: 178 },
	{ name: "Mia", side: "both", weight: 136 },
	{ name: "Matthew", side: "left", weight: 199 },
	{ name: "Charlotte", side: "right", weight: 121 },
	{ name: "James", side: "both", weight: 171 },
	{ name: "Amelia", side: "left", weight: 138 },
	{ name: "Benjamin", side: "right", weight: 192 },
	{ name: "Harper", side: "both", weight: 115 },
	{ name: "Lucas", side: "left", weight: 167 },
	{ name: "Ella", side: "right", weight: 124 },
	{ name: "Henry", side: "both", weight: 142 },
	{ name: "Avery", side: "left", weight: 106 },
	{ name: "Jack", side: "right", weight: 185 },
	{ name: "Scarlett", side: "both", weight: 134 },
	{ name: "William", side: "left", weight: 193 },
	{ name: "Grace", side: "right", weight: 100 },
	{ name: "Liam", side: "both", weight: 159 },
	{ name: "Chloe", side: "left", weight: 109 },
	{ name: "Noah", side: "right", weight: 174 },
];

export const sampleRoster: Roster = {
	id: "roster-0",
	name: "Roster 0",
	paddlers: sampleCrew,
};

export const sampleBoat: Crew = {
	id: "crew-0",
	name: "Crew 0",
	roster: sampleRoster,
};
