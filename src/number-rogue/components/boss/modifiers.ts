export const BossType = {
	Prohibit: "Prohibit",
	ExpensiveEval: "ExpensiveEval",
	PayPerUse: "PayPerUse",
	Swarm: "Swarm",
};

export type BossType = (typeof BossType)[keyof typeof BossType];

export type BossModifier = {
	name: string;
	description: string;
};

export const bossModifiers: Record<BossType, BossModifier> = {
	[BossType.Prohibit]: {
		name: "Envy",
		description: "Prohibits use of a certain number.",
	},
	[BossType.ExpensiveEval]: {
		name: "Greed",
		description: "Each evaluation costs $5. Can go into debt.",
	},
	[BossType.PayPerUse]: {
		name: "Sloth",
		description: "Each button costs $1 to tap. Can go into debt.",
	},
	[BossType.Swarm]: {
		name: "Wrath",
		description: "Multiple target values must be reached. Can go in any order.",
	},
};
