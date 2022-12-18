import { FloorToNDP } from "../util/math";
import { ThrowIf } from "../util/throw-if";

/**
 * Calculate maimai DX rate for a score.
 *
 * @param score - The score to calculate the rate for.
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */
export function calculate(score: number, internalChartLevel: number) {
	ThrowIf(score > 101, "Score cannot be greater than 101%.", { score });
	ThrowIf.negative(score, "Score cannot be negative.", { score });
	ThrowIf.negative(internalChartLevel, "Internal chart level cannot be negative.", {
		level: internalChartLevel,
	});

	// minimum score coefficient is 5
	let scoreCoef = 5;

	// score coefficient number set obtained from maimai bookmarklet code.
	// scores above 100.5% are considered 100.5% by the algorithm.
	if (score >= 100.5) {
		score = 100.5;
		scoreCoef = 22.4;
	} else if (score >= 100) {
		scoreCoef = 21.6;
	} else if (score >= 99.5) {
		scoreCoef = 21.1;
	} else if (score >= 99) {
		scoreCoef = 20.8;
	} else if (score >= 98) {
		scoreCoef = 20.3;
	} else if (score >= 97) {
		scoreCoef = 20;
	} else if (score >= 94) {
		scoreCoef = 16.8;
	} else if (score >= 90) {
		scoreCoef = 15.2;
	} else if (score >= 80) {
		scoreCoef = 13.6;
	} else if (score >= 75) {
		scoreCoef = 12;
	} else if (score >= 70) {
		scoreCoef = 11.2;
	} else if (score >= 60) {
		scoreCoef = 9.6;
	} else if (score >= 50) {
		scoreCoef = 8;
	}

	return FloorToNDP(scoreCoef * internalChartLevel * (score / 100), 0);
}
