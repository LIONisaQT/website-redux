import type { CalcButton } from "../components/Calculator/calculator-config";

export function getUpdatedUses(
	button: string,
	origin: Record<string, CalcButton>,
	amount: number
) {
	const newList = { ...origin };
	newList[button] = { ...newList[button], uses: newList[button].uses + amount };
	return newList;
}

export function getRandomButton(
	getRng: (max: number) => number,
	list: Record<string, CalcButton>
) {
	const keys = Object.keys(list);
	return keys[getRng(keys.length)];
}

export function swapDigits(num: number) {
	const swapped = num.toString().split("").reverse().join("");
	return parseInt(swapped, 10);
}

export function getShallowCopy(source: Record<string, CalcButton>) {
	return Object.fromEntries(
		Object.entries(source).map(([k, v]) => [k, { ...v }])
	);
}

export function removeLastInstance(str1: string, str2: string) {
	const index = str1.lastIndexOf(str2);
	if (index === -1) return str1; // not found
	return str1.slice(0, index) + str1.slice(index + str2.length);
}

export function trimToValidInteger(s: string): string {
	if (!isNaN(Number(s))) return s;

	const newStr = s.match(/^-?\d+/);
	return newStr ? newStr[0] : "";
}

export function removeZeroUses<T extends Record<string, { uses: number }>>(
	extras: T
): T {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cleaned: any = {};
	for (const key in extras) {
		if (extras[key].uses > 0) {
			cleaned[key] = extras[key];
		}
	}
	return cleaned;
}
