import { Crew, Paddler, Roster } from "../types";

export const samplePaddlers: Paddler[] = [
	{
		name: "Ryan",
		side: "both",
		weight: 150,
		id: "0",
	},
	{
		name: "Alex",
		side: "left",
		weight: 176,
		id: "1",
	},
	{
		name: "Samantha",
		side: "right",
		weight: 132,
		id: "2",
	},
	{
		name: "David",
		side: "both",
		weight: 195,
		id: "3",
	},
	{
		name: "Emily",
		side: "left",
		weight: 120,
		id: "4",
	},
	{
		name: "Jason",
		side: "right",
		weight: 163,
		id: "5",
	},
	{
		name: "Olivia",
		side: "both",
		weight: 144,
		id: "6",
	},
	{
		name: "Michael",
		side: "left",
		weight: 182,
		id: "7",
	},
	{
		name: "Sophia",
		side: "right",
		weight: 97,
		id: "8",
	},
	{
		name: "Ethan",
		side: "both",
		weight: 154,
		id: "9",
	},
	{
		name: "Isabella",
		side: "left",
		weight: 111,
		id: "10",
	},
	{
		name: "Daniel",
		side: "right",
		weight: 178,
		id: "11",
	},
	{
		name: "Mia",
		side: "both",
		weight: 136,
		id: "12",
	},
	{
		name: "Matthew",
		side: "left",
		weight: 199,
		id: "13",
	},
	{
		name: "Charlotte",
		side: "right",
		weight: 121,
		id: "14",
	},
	{
		name: "James",
		side: "both",
		weight: 171,
		id: "15",
	},
	{
		name: "Amelia",
		side: "left",
		weight: 138,
		id: "16",
	},
	{
		name: "Benjamin",
		side: "right",
		weight: 192,
		id: "17",
	},
	{
		name: "Harper",
		side: "both",
		weight: 115,
		id: "18",
	},
	{
		name: "Lucas",
		side: "left",
		weight: 167,
		id: "19",
	},
	{
		name: "Ella",
		side: "right",
		weight: 124,
		id: "20",
	},
	{
		name: "Henry",
		side: "both",
		weight: 142,
		id: "21",
	},
	{
		name: "Avery",
		side: "left",
		weight: 106,
		id: "22",
	},
	{
		name: "Jack",
		side: "right",
		weight: 185,
		id: "23",
	},
	{
		name: "Scarlett",
		side: "both",
		weight: 134,
		id: "24",
	},
	{
		name: "William",
		side: "left",
		weight: 193,
		id: "25",
	},
	{
		name: "Grace",
		side: "right",
		weight: 100,
		id: "26",
	},
	{
		name: "Liam",
		side: "both",
		weight: 159,
		id: "27",
	},
	{
		name: "Chloe",
		side: "left",
		weight: 109,
		id: "28",
	},
	{
		name: "Noah",
		side: "right",
		weight: 174,
		id: "29",
	},
];

export const sampleRoster: Roster = {
	id: "roster-0",
	name: "Roster 0",
	paddlers: samplePaddlers,
};

export const sampleCrew: Crew = {
	id: crypto.randomUUID(),
	name: "Sample Crew",
	roster: sampleRoster.paddlers,
	numRows: 10,
	centerMass: 5,
	leftSide: [],
	rightSide: [],
	drum: null,
	steer: null,
};
