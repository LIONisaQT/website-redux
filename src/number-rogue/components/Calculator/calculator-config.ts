export type CalcButtonDetails = {
	name: string;
	label?: string;
	description?: string;
	defaultUses: number;
	affectsTarget?: boolean;
};

export type CalcButton = {
	uses: number;
	details: CalcButtonDetails;
};

const numNames = [
	"Zero",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
];

// All buttons
export const buttonList: Record<string, CalcButtonDetails> = {
	// Numbers
	...Object.fromEntries(
		Array.from({ length: 10 }, (_, n) => [
			String(n),
			{
				name: String(n),
				description: numNames[n],
				defaultUses: 2,
			},
		])
	),

	// Basic operators
	"+": {
		name: "Plus",
		label: "+",
		description: "Adds two numbers together.",
		defaultUses: 2,
	},
	"-": {
		name: "Minus",
		label: "-",
		description: "Subtracts second number from the first.",
		defaultUses: 2,
	},
	"*": {
		name: "Multiply",
		label: "*",
		description: "Multiplies two numbers.",
		defaultUses: 2,
	},
	"/": {
		name: "Divide",
		label: "/",
		description: "Divides first number by the second. Floors result.",
		defaultUses: 2,
	},

	// Always-available
	equals: {
		name: "Equals",
		label: "=",
		description: "Evaluates.",
		defaultUses: Infinity,
	},
	battery: {
		name: "Battery",
		label: "🔋",
		description: "Adds one use to a random button.",
		defaultUses: 5,
	},

	// Special
	power: {
		name: "Power",
		label: "^",
		description: "Raises number by power of exponent.",
		defaultUses: 1,
		affectsTarget: false,
	},
	swapTarget: {
		name: "Swap target",
		label: "🔄🎯",
		description: "Reverses direction of the target (69 -> 96).",
		defaultUses: 1,
		affectsTarget: true,
	},
	swapCurrent: {
		name: "Swap current",
		label: "🔄",
		description: "Reverses direction of the current number (69 -> 96).",
		defaultUses: 1,
		affectsTarget: false,
	},
	random: {
		name: "Rand",
		label: "🎲",
		description:
			"Replaces current number with a random number between 0 and 100.",
		defaultUses: 1,
		affectsTarget: false,
	},
	increment: {
		name: "Increment",
		label: "x++",
		description: "Increases current number by 1.",
		defaultUses: 1,
		affectsTarget: false,
	},
	prepend1: {
		name: "Prepend 1",
		label: "1X",
		description: "Prepends 1 to the current number.",
		defaultUses: 1,
		affectsTarget: false,
	},
};

export function getKeyByName(name: string): string | undefined {
	return Object.entries(buttonList).find(
		([, details]) => details.name === name
	)?.[0];
}

const calcLayout = [
	["7", "8", "9", "+"],
	["4", "5", "6", "-"],
	["1", "2", "3", "*"],
	["battery", "0", "equals", "/"],
] as const;

export const calcOrder = calcLayout.flat();

const excludedFromShop = ["equals", "battery"];

export const shopList: Record<string, CalcButtonDetails> = Object.fromEntries(
	Object.entries(buttonList).filter(([key]) => !excludedFromShop.includes(key))
);

export const defaultButtons: Record<string, CalcButton> = Object.fromEntries(
	calcOrder.map((key) => [
		key,
		{
			uses: buttonList[key].defaultUses,
			details: buttonList[key],
		},
	])
);

export const extraButtons: Record<string, CalcButton> = {
	// swapTarget: { uses: Infinity, details: buttonList["swapTarget"] },
	// battery: { uses: Infinity, details: buttonList["battery"] },
};
