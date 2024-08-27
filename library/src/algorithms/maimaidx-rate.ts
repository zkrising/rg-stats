import { ThrowIf } from "../util/throw-if";

const RATING_COEFFICIENTS = new Map([
	[100_5000, 224],
	[100_4999, 222],
	[100_0000, 216],
	[99_9999, 214],
	[99_5000, 211],
	[99_0000, 208],
	[98_9999, 206],
	[98_0000, 203],
	[97_0000, 200],
	[96_9999, 176],
	[94_0000, 168],
	[90_0000, 152],
	[80_0000, 136],
	[79_9999, 128],
	[75_0000, 120],
	[70_0000, 112],
	[60_0000, 96],
	[50_0000, 80],
	[40_0000, 64],
	[30_0000, 48],
	[20_0000, 32],
	[10_0000, 16],
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
	const scoreInt = Math.min(Math.round(score * 10000), 100_5000);
	const iclInt = Math.round(internalChartLevel * 10);

	for (const [scoreBoundary, coefficient] of RATING_COEFFICIENTS) {
		if (scoreInt >= scoreBoundary) {
			return Math.floor((scoreInt * coefficient * iclInt) / 100_000_000);
		}
	}

	// should be impossible as score cannot be negative and the lowest boundary is >= 0.
	/* istanbul ignore next */
	throw new Error(`Unresolvable score of ${score}.`);
}
