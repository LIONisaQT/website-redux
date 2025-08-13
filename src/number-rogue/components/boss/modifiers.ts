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
		name: "Prohibit",
		description: "Prohibits use of a certain number.",
	},
	[BossType.ExpensiveEval]: {
		name: "Costly evals",
		description: "Each evaluation costs $5 (will go into debt).",
	},
	[BossType.PayPerUse]: {
		name: "Pay per use",
		description: "Each button costs $1 to tap (will go into debt).",
	},
	[BossType.Swarm]: {
		name: "Swarm",
		description: "Multiple target values must be reached.",
	},
};
