import { Paddler, SideArray } from "../types";

export const sumSideWeight = (side: SideArray): number =>
	side.reduce((total, paddler) => total + (paddler?.weight ?? 0), 0);

export const getCenterOfMass = (
	left: SideArray,
	right: SideArray,
	rowSize: number
): number => {
	let weightedSum = 0;
	let totalWeight = 0;

	for (let i = 0; i < rowSize; i++) {
		const leftPaddler = left[i];
		const rightPaddler = right[i];

		if (leftPaddler) {
			weightedSum += i * leftPaddler.weight;
			totalWeight += leftPaddler.weight;
		}

		if (rightPaddler) {
			weightedSum += i * rightPaddler.weight;
			totalWeight += rightPaddler.weight;
		}
	}

	if (totalWeight === 0) return 0;

	return Number((weightedSum / totalWeight + 1).toFixed(2));
};

/**
 * Greedy algorithm to find the optimal position of a paddler, respecting
 * their side preference.
 *
 *
 * Fills seat, then checks weight balance + boat's center of mass.
 *
 * Lower score is better, since that means placing a paddler there gets the
 * boat closer to the desired target.
 *
 * TODO: Factor paddler height and power level.
 *
 * @param {Paddler[]} roster - List of paddlers.
 * @param {number} targetRow - Row where center of mass is located at.
 * @param {number} numRows - Number of rows in the boat.
 */
export const generateLineup = (
	roster: Paddler[],
	targetRow: number,
	numRows: number
): { left: SideArray; right: SideArray; remainingRoster: Paddler[] } => {
	const left: SideArray = Array(numRows).fill(null);
	const right: SideArray = Array(numRows).fill(null);

	let available = [...roster];

	// Sort paddlers by weight since heavier weights influence center of mass more.
	const sortedPaddlers = [...available].sort((a, b) => b.weight - a.weight);

	for (const paddler of sortedPaddlers) {
		const candidatePositions: Array<{
			side: "left" | "right" | "both";
			index: number;
			score: number;
		}> = [];

		for (let i = 0; i < numRows; i++) {
			if ((paddler.side === "left" || paddler.side === "both") && !left[i]) {
				const tempLeft = [...left];
				tempLeft[i] = paddler;
				const balance = Math.abs(
					sumSideWeight(tempLeft) - sumSideWeight(right)
				);
				const com = getCenterOfMass(tempLeft, right, numRows);
				const score = balance + Math.abs(com - targetRow);
				candidatePositions.push({ side: "left", index: i, score });
			}

			if ((paddler.side === "right" || paddler.side === "both") && !right[i]) {
				const tempRight = [...right];
				tempRight[i] = paddler;
				const balance = Math.abs(
					sumSideWeight(left) - sumSideWeight(tempRight)
				);
				const com = getCenterOfMass(left, tempRight, numRows);
				const score = balance + Math.abs(com - targetRow);
				candidatePositions.push({ side: "right", index: i, score });
			}
		}

		// There are no more spots left on the boat.
		if (candidatePositions.length === 0) continue;

		// Get their best position (greedy).
		candidatePositions.sort((a, b) => a.score - b.score);
		const best = candidatePositions[0];

		if (best.side === "left") left[best.index] = paddler;
		else right[best.index] = paddler;

		// Remove paddler from available list.
		available = available.filter((p) => p.name !== paddler.name);
	}

	return { left, right, remainingRoster: available };
};

export const sortRosterByWeight = (roster: Paddler[]): Paddler[] =>
	[...roster].sort((a, b) => b.weight - a.weight);

export const sortRosterBySide = (roster: Paddler[]): Paddler[] => {
	const sideOrder: Record<"left" | "right" | "both", number> = {
		left: 0,
		both: 1,
		right: 2,
	};
	return [...roster].sort((a, b) => sideOrder[a.side] - sideOrder[b.side]);
};

export const sanitizeText = (text: string): string =>
	text.replace(/[^a-zA-Z0-9\-'\s]/g, "").replace(/\s+/g, " ");

export function sanitizeNumber(
	value: string | number,
	min: number = 0,
	max: number = 999
): number {
	const num = Number(value);
	if (isNaN(num) || num < min) return min;
	if (num > max) return max;
	return num;
}
