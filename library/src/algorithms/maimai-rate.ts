import { FloorToNDP } from "../util/math";
import { ThrowIf } from "../util/throw-if";

// [F, E, D, C, B, A, AA, AAA, S - 0.01, S, SS - 0.01, SS, SSS - 0.01, SSS, SSS+]
const RATE_TABLE: Record<number, number[]> = {
	0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	1: [0, 0, 0.1, 0.2, 0.4, 1, 1.5, 2.5, 4, 4, 5, 5.5, 6.5, 7, 8],
	2: [0, 0, 0.2, 0.4, 0.8, 2, 2.5, 3, 4.5, 4.5, 5.5, 6, 7, 7.5, 8.5],
	3: [0, 0, 0.3, 0.6, 1.2, 3, 3.5, 4, 5, 5, 6, 6.5, 7.5, 8, 9],
	4: [0, 0, 0.4, 0.8, 1.6, 3.5, 4, 4.5, 5.5, 5.5, 6.5, 7, 8, 8.5, 9.5],
	5: [0, 0, 0.5, 1, 2, 4, 5, 5.5, 6, 6, 7, 7.5, 8.5, 9, 10],
	6: [0, 0, 0.6, 1.2, 2.4, 4.5, 5.5, 6, 6.5, 6.5, 7.5, 8, 9, 9.5, 10.5],
	7: [0, 0, 0.7, 1.4, 2.8, 5, 6, 7, 7.25, 7.5, 8.75, 9, 9.75, 10, 11],
	8: [0, 0, 0.8, 1.6, 3.2, 5.5, 6.5, 7.25, 7.5, 8, 9.25, 9.5, 10.25, 10.5, 11.5],
	9: [0, 0, 0.9, 1.8, 3.6, 6, 7, 7.5, 8, 9, 10.25, 10.5, 11.25, 11.5, 12.5],
	10: [0, 0, 1, 2, 4, 7, 8, 8.5, 9, 10, 11.25, 11.5, 12.25, 12.5, 13.5],
	11: [0, 0, 1.1, 2.2, 4.4, 8, 9, 9.5, 10, 11, 11.75, 12, 12.75, 13, 14],
	12: [0, 0, 1.2, 2.4, 4.8, 9, 10, 10.5, 11, 12, 12.75, 13, 13.75, 14, 15],
	13: [0, 0, 1.3, 2.6, 5.2, 10, 11, 11.5, 12.5, 13.5, 14.75, 15, 15.75, 16, 17],
	14: [0, 0, 1.4, 2.8, 5.6, 11, 12, 12.5, 14, 15, 16.75, 17, 17.75, 18, 19],
	15: [0, 0, 1.5, 3, 6, 12, 13, 13.5, 15.5, 16.5, 18.75, 19, 19.75, 20, 21],
};

const RANK_BOUNDARIES: Record<string, number> = {
	F: 0,
	E: 10,
	D: 20,
	C: 40,
	B: 60,
	A: 80,
	AA: 90,
	AAA: 94,
	"S-": 96.99,
	S: 97,
	"SS-": 98.99,
	SS: 99,
	"SSS-": 99.99,
	SSS: 100,
	"SSS+": 104,
};

// @ts-expect-error getRank is called after the score is checked for validity
// (between 0 and 104), so not having an ending return statement is OK.
function getRank(score: number): keyof typeof RANK_BOUNDARIES {
	for (const [rank, boundary] of Object.entries(RANK_BOUNDARIES).reverse()) {
		if (score >= boundary) {
			return rank;
		}
	}
}

function calculateCurve(internalChartLevel: number): number[] {
	let lower = Math.floor(internalChartLevel);
	let upper = Math.ceil(internalChartLevel);

	// extrapolate for levels beyond 15
	if (internalChartLevel > 15) {
		lower = 14;
		upper = 15;
	}

	if (lower === upper) {
		return RATE_TABLE[lower];
	}

	const lowerCurve = RATE_TABLE[lower];
	const upperCurve = RATE_TABLE[upper];

	return lowerCurve.map((value, index) => {
		const upperValue = upperCurve[index];
		return value + (upperValue - value) * (internalChartLevel - lower);
	});
}

/**
 * Calculates maimai rate for a score.
 *
 * @param score - The percentage score to calculate the rate for.
 * @param maxScore - The max percentage score attainable of the chart the score was achieved on.
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */
export function calculate(score: number, maxScore: number, internalChartLevel: number): number {
	// Breaks are the most valuable note type, with a 2500 base score for PERFECTs and up to 100 bonus score.
	// Assuming all notes are breaks, the max score is (2600 * n) / (2500 * n) * 100 = 104
	ThrowIf(maxScore > 104, "Max score cannot be greater than 104%.", { maxScore });
	ThrowIf(score > maxScore, "Score cannot be greater than max score.", { score, maxScore });
	ThrowIf.negative(score, "Score cannot be negative.", { score });
	ThrowIf.negative(internalChartLevel, "Internal chart level cannot be negative.", {
		level: internalChartLevel,
	});

	if (score <= 10) {
		return 0;
	}

	const curve = calculateCurve(internalChartLevel);
	if (score === maxScore) {
		return curve[curve.length - 1];
	}

	const rank = getRank(score);
	const rankIndex = Object.keys(RANK_BOUNDARIES).indexOf(rank);

	const lower = curve[rankIndex];
	const upper = curve[rankIndex + 1];
	const lowerBoundary = RANK_BOUNDARIES[rank];
	const upperBoundary = Object.values(RANK_BOUNDARIES)[rankIndex + 1];
	const rate =
		lower + (upper - lower) * ((score - lowerBoundary) / (upperBoundary - lowerBoundary));

	return FloorToNDP(rate, 2);
}
