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
	const iclInt = Math.round(internalChartLevel * 100.0);

	if (technicalScore >= 1_007_500) {
		ratingValue = iclInt + 200;
	} else if (technicalScore >= 1_000_000) {
		ratingValue = iclInt + 150 + Math.floor((technicalScore - 1_000_000) / 150);
	} else if (technicalScore >= 970_000) {
		ratingValue = iclInt + Math.floor((technicalScore - 970_000) / 200);
	} else {
		ratingValue = iclInt - Math.ceil((970_000 - technicalScore) / 175);
	}

	return Math.max(ratingValue / 100.0, 0);
}
