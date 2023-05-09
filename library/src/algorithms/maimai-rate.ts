import { FloorToNDP } from "../util/math";
import { ThrowIf } from "../util/throw-if";

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

	let rating = 0;

	const ratingBase = calculateRatingBase(internalChartLevel);
	const ratingForS = calculateRatingForS(internalChartLevel);
	const ratingForSS = calculateRatingForSS(internalChartLevel);

	if (score >= 100) {
		rating = calculateRating(ratingForSS + 1, ratingForSS + 2, maxScore - 100, score - 100);
	} else if (score >= 99) {
		rating = calculateRating(ratingForSS, ratingForSS + 0.75, 1, score - 99);
	} else if (score >= 97) {
		rating = calculateRating(ratingForS, ratingForSS - 0.25, 2, score - 97);
	} else if (internalChartLevel < 9) {
		// According to https://sgimera.github.io/mai_RatingAnalyzer/scripts_maimai/calc_rating.js
		// anything below 97% on charts below level 9 gives 0 rating, though it is not tested fully.
		rating = 0;
	} else if (score >= 94) {
		// According to https://sgimera.github.io/mai_RatingAnalyzer/rating_finale.html
		// everything below this point has not been verified. This is the only source
		// I could find that had any information on the rating algorithm anyways.
		rating = calculateRating(ratingBase - 1.5, ratingForS - 1, 3, score - 94);
	} else if (score >= 90) {
		rating = calculateRating(ratingBase - 2, ratingBase - 1.5, 4, score - 90);
	} else if (score >= 80) {
		rating = calculateRating(ratingBase - 3, ratingBase - 2, 10, score - 80);
	} else if (score >= 60) {
		rating = calculateRating(ratingBase * 0.4, ratingBase - 3, 20, score - 60);
	} else if (score >= 40) {
		rating = calculateRating(ratingBase * 0.2, ratingBase * 0.4, 20, score - 40);
	} else if (score >= 20) {
		rating = calculateRating(ratingBase * 0.1, ratingBase * 0.2, 20, score - 20);
	} else if (score >= 10) {
		rating = calculateRating(0, ratingBase * 0.1, 10, score - 10);
	}

	return FloorToNDP(rating, 2);
}

/**
 * Calculates the rating achieved for a given score range.
 * @param min - The minimum rating achievable in the range.
 * @param max - The maximum rating achievable in the range.
 * @param gapToNextRank - The gap between the minimum score for this range and the next range.
 * @param distanceFromCurrentRank - The distance from the minimum score for this range to the score achieved.
 */
function calculateRating(
	min: number,
	max: number,
	gapToNextRank: number,
	distanceFromCurrentRank: number
): number {
	if (gapToNextRank === 0) {
		return min;
	}
	return min + ((max - min) * distanceFromCurrentRank) / gapToNextRank;
}

/**
 * Calculates the base rating for a chart level.
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */
function calculateRatingBase(internalChartLevel: number): number {
	const displayLevel = Math.floor(internalChartLevel);

	if (displayLevel >= 8) {
		return internalChartLevel;
	} else {
		return internalChartLevel / 2 + 4;
	}
}

/**
 * Calculates the rating achieved when score is exactly 97% (S rank).
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */
function calculateRatingForS(internalChartLevel: number): number {
	const displayLevel = Math.floor(internalChartLevel);

	if (displayLevel >= 12) {
		return (internalChartLevel * 3) / 2 - 6;
	} else if (displayLevel === 7) {
		return internalChartLevel / 2 + 4;
	} else {
		return internalChartLevel;
	}
}

/**
 * Calculates the rating achieved when score is exactly 99% (SS rank).
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */
function calculateRatingForSS(internalChartLevel: number): number {
	const displayLevel = Math.floor(internalChartLevel);

	if (displayLevel >= 12) {
		return internalChartLevel * 2 - 11;
	} else if (displayLevel === 11) {
		return internalChartLevel + 1;
	} else if (displayLevel === 10) {
		return internalChartLevel / 2 + 6.5;
	} else if (displayLevel >= 8) {
		return internalChartLevel + 1.5;
	} else {
		return internalChartLevel / 2 + 5.5;
	}
}
