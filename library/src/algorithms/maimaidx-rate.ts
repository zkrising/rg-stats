import { RoundToNDP, FloorToNDP } from "../util/math";
import { ThrowIf } from "../util/throw-if";

/**
 * Calculate maimai DX rate for a score.
 *
 * @param actualScore - The score to calculate the rate for.
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */

export function calculate(actualScore: number, internalChartLevel: number) {
	// reassignment so ESLinter doesn't cry about it
	let score = actualScore;

	ThrowIf(score > 101, "Score cannot be greater than 101%.", { score });
	ThrowIf.negative(score, "Score cannot be negative.", { score });
	ThrowIf.negative(internalChartLevel, "Internal chart level cannot be negative.", {
		level: internalChartLevel,
	});

	// minimum score coefficient is 5
	let scoreCoeff = 5;

	// score coefficient number set obtained from maimai bookmarklet code.
        // scores above 100.5% are considered 100.5% by the algorithm.
	if (score >= 100.5) {
		score = 100.5;
		scoreCoeff = 22.4;
	} else if (score >= 100) {
		scoreCoeff = 21.6;
	} else if (score >= 99.5) {
		scoreCoeff = 21.1;
	} else if (score >= 99) {
		scoreCoeff = 20.8;
	} else if (score >= 98) {
		scoreCoeff = 20.3;
	} else if (score >= 97) {
		scoreCoeff = 20;
	} else if (score >= 94) {
		scoreCoeff = 16.8;
	} else if (score >= 90) {
		scoreCoeff = 15.2;
	} else if (score >= 80) {
		scoreCoeff = 13.6;
	} else if (score >= 75) {
		scoreCoeff = 12;
	} else if (score >= 70) {
		scoreCoeff = 11.2;
	} else if (score >= 60) {
		scoreCoeff = 9.6;
	} else if (score >= 50) {
		scoreCoeff = 8;
	}

	return FloorToNDP(scoreCoeff * internalChartLevel * (score / 100), 0);
}

/**
 * Given a maimai DX rate, a chart level, return the minimum score necessary to get
 * that rate.
 *
 * @param rate - The rate to inverse.
 * @param internalChartLevel - The internal decimal level of the chart the rate was on.
 */

export function inverse(rate: number, internalChartLevel: number) {
	ThrowIf.negative(internalChartLevel, "Internal chart level cannot be negative.", {
		level: internalChartLevel,
	});

	// rounded to 4dp, purely because mathematically there should only be 4dp after calculating.
	const scoreFactor = RoundToNDP(rate / internalChartLevel, 4);

	ThrowIf(
		scoreFactor > 22.4 * 1.005,
		`A rate of ${rate} is not possible on a chart of level ${internalChartLevel}.`,
		{
			rate,
			level: internalChartLevel,
		}
	);

	// shoutout to my friend Peachan who un-screwed this for me.
	// my brain wouldn't have got here without them.
	if (scoreFactor > 21.6 * 1) {
		return 100.5;
	} else if (scoreFactor > 21.1 * 0.995) {
		return 100;
	} else if (scoreFactor > 20.8 * 0.99) {
		return 99.5;
	} else if (scoreFactor > 20.3 * 0.98) {
		return 99;
	} else if (scoreFactor > 20 * 0.97) {
		return 98;
	} else if (scoreFactor > 16.8 * 0.94) {
		return 97;
	} else if (scoreFactor > 15.2 * 0.9) {
		return 94;
	} else if (scoreFactor > 13.6 * 0.8) {
		return 90;
	} else if (scoreFactor > 12 * 0.75) {
		return 80;
	} else if (scoreFactor > 11.2 * 0.7) {
		return 75;
	} else if (scoreFactor > 9.6 * 0.6) {
		return 70;
	} else if (scoreFactor > 8 * 0.5) {
		return 60;
	} else if (scoreFactor > 0) {
		return 50;
	}

	return 0;
}
