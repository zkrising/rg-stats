import { FloorToNDP } from "../util/math";
import { ThrowIf } from "../util/throw-if";

/**
 * Calculates the rating for an ONGEKI score.
 * This is accurate up to bright MEMORY.
 *
 * @param technicalScore - The technical score the user got. This is a value between 0 and 1.01million.
 * @param internalChartLevel - The internal chart level. This is a decimal value stored by the game internally.
 */
export function calculate(technicalScore: number, internalChartLevel: number) {
	ThrowIf(technicalScore > 1_010_000, "Technical score cannot be greater than 1.01Million.", {
		technicalScore,
	});
	ThrowIf.negative(technicalScore, "Technical score cannot be negative.", { technicalScore });
	ThrowIf.negative(internalChartLevel, "Chart level cannot be negative.", { internalChartLevel });

	let ratingValue = 0;

	if (technicalScore >= 1_007_500) {
		ratingValue = internalChartLevel + 2;
	} else if (technicalScore >= 1_000_000) {
		ratingValue = internalChartLevel + 1.5 + (technicalScore - 1_000_000) / 15_000;
	} else if (technicalScore >= 970_000) {
		ratingValue = internalChartLevel + (technicalScore - 970_000) / 20_000;
	} else {
		ratingValue = internalChartLevel - (970_000 - technicalScore) / 17_500;
	}

	return FloorToNDP(Math.max(ratingValue, 0), 2);
}
