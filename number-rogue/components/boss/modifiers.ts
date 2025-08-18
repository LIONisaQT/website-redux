export const BossType = {
	Envy: "Envy",
	Greed: "Greed",
	Sloth: "Sloth",
	Wrath: "Wrath",
};

export type BossType = (typeof BossType)[keyof typeof BossType];

export type BossModifier = {
	name: string;
	description: string;
};

export const bossModifiers: Record<BossType, BossModifier> = {
	[BossType.Envy]: {
		name: "Envy",
		description: "Prohibits use of a certain number.",
	},
	[BossType.Greed]: {
		name: "Greed",
		description: "Each evaluation costs $5. Can go into debt.",
	},
	[BossType.Sloth]: {
		name: "Sloth",
		description: "Each button costs $1 to tap. Can go into debt.",
	},
	[BossType.Wrath]: {
		name: "Wrath",
		description: "Multiple target values must be reached. Can go in any order.",
	},
};
