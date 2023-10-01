import { FloorToNDP } from "../util/math";
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

	// Scores above 10,000,000 are capped to 10,000,000 by the algorithm.
	score = Math.min(score, 10_000_000);

	if (score >= 10_000_000) {
		return FloorToNDP(internalChartLevel + 2.0, 2);
	} else if (score >= 9_800_000) {
		return FloorToNDP(internalChartLevel + (1.0 + (score - 9_800_000) / 200_000), 2);
	}

	const potential = FloorToNDP(internalChartLevel + (score - 9_500_000) / 300_000, 2);

	return Math.max(potential, 0);
}
