import { ThrowIf } from "../util/throw-if";

/**
 * Calculate Arcaea potential for a score.
 *
 * @param score - The score to calculate the potential for.
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */
export function calculate(score: number, internalChartLevel: number) {
	ThrowIf.negative(score, "Score cannot be negative.", { score });
	ThrowIf.negative(internalChartLevel, "Internal chart level cannot be negative.", {
		level: internalChartLevel,
	});

	const iclInt = Math.round(internalChartLevel * 100);
	let potential = 0;

	if (score >= 10_000_000) {
		potential = iclInt + 200;
	} else if (score >= 9_800_000) {
		potential = iclInt + 100 + Math.floor((score - 9_800_000) / 2_000);
	} else {
		potential = iclInt + Math.floor((score - 9_500_000) / 3_000);
	}

	return Math.max(potential / 100, 0);
}
