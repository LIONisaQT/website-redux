import type { CalcButton } from "../calculator";

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
