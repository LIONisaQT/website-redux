export const calcOrder = [
	"7",
	"8",
	"9",
	"+",
	"4",
	"5",
	"6",
	"-",
	"1",
	"2",
	"3",
	"*",
	"🔋",
	"0",
	"=",
	"/",
];

export type CalcButton = {
	uses: number;
	details: CalcButtonDetails;
};

export type CalcButtonDetails = {
	name: string;
	label?: string;
	description?: string;
};

export const buttonList: Record<string, CalcButtonDetails> = {
	"0": { name: "0", description: "Zero" },
	"1": { name: "1", description: "One" },
	"2": { name: "2", description: "Two" },
	"3": { name: "3", description: "Three" },
	"4": { name: "4", description: "Four" },
	"5": { name: "5", description: "Five" },
	"6": { name: "6", description: "Six" },
	"7": { name: "7", description: "Seven" },
	"8": { name: "8", description: "Eight" },
	"9": { name: "9", description: "Nine" },
	"+": { name: "Plus", label: "+", description: "Adds two numbers together." },
	"-": {
		name: "Minus",
		label: "-",
		description: "Subtracts second number from the first.",
	},
	"*": { name: "Multiply", label: "*", description: "Multiplys two numbers." },
	"/": {
		name: "Divide",
		label: "/",
		description: "Divides first number by the second. Floors result.",
	},
	"=": {
		name: "Equals",
		label: "=",
		description: "Evaluates.",
	},
	"^": {
		name: "Power",
		label: "^",
		description: "Raises number by power of exponent.",
	},
	"🔄": {
		name: "Swap",
		label: "🔄",
		description: "Reverses direction of target (69 -> 96).",
	},
	"🔋": {
		name: "Battery",
		label: "🔋",
		description: "Adds one use to a random button.",
	},
};

export const shopList: Record<string, CalcButtonDetails> = {
	"0": { name: "0", description: "Zero" },
	"1": { name: "1", description: "One" },
	"2": { name: "2", description: "Two" },
	"3": { name: "3", description: "Three" },
	"4": { name: "4", description: "Four" },
	"5": { name: "5", description: "Five" },
	"6": { name: "6", description: "Six" },
	"7": { name: "7", description: "Seven" },
	"8": { name: "8", description: "Eight" },
	"9": { name: "9", description: "Nine" },
	"+": { name: "Plus", label: "+", description: "Adds two numbers together." },
	"-": {
		name: "Minus",
		label: "-",
		description: "Subtracts second number from the first.",
	},
	"*": { name: "Multiply", label: "*", description: "Multiplys two numbers." },
	"/": {
		name: "Divide",
		label: "/",
		description: "Divides first number by the second. Floors result.",
	},
	"^": {
		name: "Power",
		label: "^",
		description: "Raises number by power of exponent.",
	},
	"🔄": {
		name: "Swap",
		label: "🔄",
		description: "Reverses direction of target (69 -> 96).",
	},
	"🔋": {
		name: "Battery",
		label: "🔋",
		description: "Adds one use to a random button.",
	},
};

export const defaultButtons: Record<string, CalcButton> = {
	"0": { uses: 2, details: buttonList["0"] },
	"1": { uses: 2, details: buttonList["1"] },
	"2": { uses: 2, details: buttonList["2"] },
	"3": { uses: 2, details: buttonList["3"] },
	"4": { uses: 2, details: buttonList["4"] },
	"5": { uses: 2, details: buttonList["5"] },
	"6": { uses: 2, details: buttonList["6"] },
	"7": { uses: 2, details: buttonList["7"] },
	"8": { uses: 2, details: buttonList["8"] },
	"9": { uses: 2, details: buttonList["9"] },
	"+": {
		uses: 2,
		details: buttonList["+"],
	},
	"-": {
		uses: 2,
		details: buttonList["-"],
	},
	"*": {
		uses: 2,
		details: buttonList["*"],
	},
	"/": {
		uses: 2,
		details: buttonList["/"],
	},
	"=": {
		uses: Infinity,
		details: buttonList["="],
	},
	"🔋": {
		uses: 5,
		details: buttonList["🔋"],
	},
};

export const extraButtons: Record<string, CalcButton> = {
	// "🔋": {
	// 	uses: Infinity,
	// 	details: buttonList["🔋"],
	// },
	// "🔄": {
	// 	uses: Infinity,
	// 	details: buttonList["🔄"],
	// },
};
