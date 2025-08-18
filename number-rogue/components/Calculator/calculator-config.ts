export type CalcButtonDetails = {
	name: string;
	label?: string;
	description?: string;
	defaultUses: number;
	affectsTarget?: boolean;
	priceModifier?: number;
	weight?: number;
};

export type CalcButton = {
	uses: number;
	details: CalcButtonDetails;
};

export const buttonList: Record<string, CalcButtonDetails> = {
	// Numbers
	"0": {
		name: "Zero",
		label: "0",
		description: "Arrays start here.",
		defaultUses: 2,
	},
	"1": {
		name: "One",
		label: "1",
		description: "If you're not first, you're last.",
		defaultUses: 2,
	},
	"2": {
		name: "Two",
		label: "2",
		description: "Double trouble.",
		defaultUses: 2,
	},
	"3": {
		name: "Three",
		label: "3",
		description: "Three's a crowd.",
		defaultUses: 2,
	},
	"4": {
		name: "Four",
		label: "4",
		description: "Bad luck.",
		defaultUses: 2,
	},
	"5": {
		name: "Five",
		label: "5",
		description: "🖐️",
		defaultUses: 2,
	},
	"6": {
		name: "Six",
		label: "6",
		description: '"Hey, has anyone seen 9 recently?"',
		defaultUses: 2,
	},
	"7": {
		name: "Seven",
		label: "7",
		description: "Claims to not have seen 9 in days.",
		defaultUses: 2,
	},
	"8": {
		name: "Eight",
		label: "8",
		description: "Has a chance of inputting ∞ if the screen is tilted 90°.",
		defaultUses: 2,
	},
	"9": {
		name: "Nine",
		label: "9",
		description: "Still missing.",
		defaultUses: 2,
	},

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
		description: "Subtracts the second number from the first.",
		defaultUses: 2,
	},
	"*": {
		name: "Multiply",
		label: "×",
		description: "Multiplies two numbers.",
		defaultUses: 2,
	},
	"/": {
		name: "Divide",
		label: "÷",
		description: "Divides the first number by the second. Floors result.",
		defaultUses: 2,
	},
	"%": {
		name: "Modulo",
		label: "%",
		description:
			"Divides the first number by the second and replaces the current number with the remainder.",
		defaultUses: 2,
		affectsTarget: false,
		weight: 0.75,
	},

	// Always-available
	equals: {
		name: "Equals",
		label: "=",
		description: "Evaluates the current expression.",
		defaultUses: Infinity,
	},
	battery: {
		name: "Battery",
		label: "🔋",
		description: "Adds one use to a random button.",
		defaultUses: 5,
		priceModifier: 0.25,
	},
	backspace: {
		name: "Backspace",
		label: "🔙",
		description: "Does not undo monetary losses from bosses.",
		defaultUses: Infinity,
		affectsTarget: true,
	},

	// Special
	power: {
		name: "Power",
		label: "^",
		description: "Raises the current number by power of the exponent.",
		defaultUses: 2,
		affectsTarget: false,
		priceModifier: 0.5,
		weight: 0.25,
	},
	swapTarget: {
		name: "Swap Target",
		label: "🔄 T",
		description: "Reverses direction of the target (69 -> 96).",
		defaultUses: 2,
		affectsTarget: true,
		weight: 0.5,
	},
	swapCurrent: {
		name: "Swap Current",
		label: "🔄 C",
		description: "Reverses direction of the current number (69 -> 96).",
		defaultUses: 2,
		affectsTarget: false,
		weight: 0.5,
	},
	randomCurrent: {
		name: "Randomize Current",
		label: "🎲 C",
		description:
			"Replaces the current number with a random number between 0 and 100.",
		defaultUses: 2,
		affectsTarget: false,
		priceModifier: 0.5,
		weight: 0.5,
	},
	randomTarget: {
		name: "Randomize Target",
		label: "🎲 T",
		description:
			"Replaces the current target with a random number between 0 and 100.",
		defaultUses: 2,
		affectsTarget: true,
		priceModifier: 0.5,
		weight: 0.5,
	},
	increment: {
		name: "Increment",
		label: "n++",
		description: "Increases the current number by 1.",
		defaultUses: 2,
		affectsTarget: false,
		weight: 0.75,
	},
	decrement: {
		name: "Decrement",
		label: "n--",
		description: "Decreases the current number by 1.",
		defaultUses: 2,
		affectsTarget: false,
		weight: 0.75,
	},
	plusMoney: {
		name: "Plus $",
		label: "+$",
		description:
			"Increases the current number by the amount of money you have.",
		defaultUses: 2,
		affectsTarget: false,
		weight: 0.5,
	},
	nPrepend: {
		name: "Prepend n",
		label: "n _",
		description: "Prepends n to the current number.",
		defaultUses: 2,
		affectsTarget: false,
		priceModifier: 1.5,
		weight: 0.25,
	},
	nAppend: {
		name: "Append n",
		label: "_ n",
		description: "Appends n to the current number.",
		defaultUses: 2,
		affectsTarget: false,
		priceModifier: 1.5,
		weight: 0.25,
	},
};

const generatePrependButtons = (
	start: number,
	end: number
): Record<string, CalcButtonDetails> => {
	const buttons: Record<string, CalcButtonDetails> = {};
	for (let i = start; i <= end; i++) {
		buttons[`prepend${i}`] = {
			name: `Prepend ${i}`,
			label: `${i}_`,
			description: `Prepends ${i} to the current number.`,
			defaultUses: 2,
			affectsTarget: false,
			priceModifier: 0.75,
			weight: 0.5,
		};
	}
	return buttons;
};

// Maybe this can be increased to 9 for levels with higher max numbers.
Object.assign(buttonList, generatePrependButtons(1, 3));

export function getKeyByName(name: string): string | undefined {
	return Object.entries(buttonList).find(
		([, details]) => details.name === name
	)?.[0];
}

const calcLayout = [
	["7", "8", "9", "+"],
	["4", "5", "6", "-"],
	["1", "2", "3", "*"],
	["backspace", "0", "equals", "/"],
] as const;

export const calcOrder = calcLayout.flat();

const excludedFromShop = ["equals", "backspace"];

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
	// swapCurrent: { uses: Infinity, details: buttonList["swapCurrent"] },
	// increment: { uses: Infinity, details: buttonList["increment"] },
	// decrement: { uses: Infinity, details: buttonList["decrement"] },
	// prepend2: { uses: Infinity, details: buttonList["prepend2"] },
	// randomTarget: { uses: Infinity, details: buttonList["randomTarget"] },
	// plusMoney: { uses: Infinity, details: buttonList["plusMoney"] },
	// "%": { uses: Infinity, details: buttonList["%"] },
	// nAppend: { uses: Infinity, details: buttonList["nAppend"] },
	// nPrepend: { uses: Infinity, details: buttonList["nPrepend"] },
};
