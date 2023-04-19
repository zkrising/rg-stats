import { FloorToNDP } from "../util/math";
import { ThrowIf } from "../util/throw-if";

const RATING_COEFFICIENTS = new Map([
	[100.5, 22.4],
	[100.4999, 22.2],
	[100, 21.6],
	[99.9999, 21.4],
	[99.5, 21.1],
	[99, 20.8],
	[98.9999, 20.6],
	[98, 20.3],
	[97, 20],
	[96.9999, 17.6],
	[94, 16.8],
	[90, 15.2],
	[80, 13.6],
	[79.9999, 12.8],
	[75, 12],
	[70, 11.2],
	[60, 9.6],
	[50, 8],
	[40, 6.4],
	[30, 4.8],
	[20, 3.2],
	[10, 1.6],
	[0, 0],
]);

/**
 * Calculate maimai DX Splash+ (and newer) rate for a score.
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

	// Scores above 100.5% are capped at 100.5% by the algorithm.
	score = Math.min(score, 100.5);

	for (const [scoreBoundary, coefficient] of RATING_COEFFICIENTS) {
		if (score >= scoreBoundary) {
			return FloorToNDP(internalChartLevel * coefficient * (score / 100), 0);
		}
	}

	return 0;
}
