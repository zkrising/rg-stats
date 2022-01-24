import { ThrowIf } from "../util/throw-if";

/**
 * Calculates the jubility of a score. Returns 0 for anything less than 700k.
 *
 * @param score - The score value. This is between 0 and 1million.
 * @param musicRate - The Music Rate of their score -- this is a percentage value.
 * This is between 0 and 120, where 100-120 is only achiveable on hard mode.
 * @param level - The level for the chart.
 */
export function calculate(score: number, musicRate: number, level: number) {
	ThrowIf.negative(score, "Score cannot be negative.", { score });
	ThrowIf.negative(level, "Level cannot be negative.", { level });
	ThrowIf.negative(musicRate, "MusicRate cannot be negative.", { musicRate });
	ThrowIf(score > 1_000_000, "Score cannot be greater than 1million.", { score });
	ThrowIf(musicRate > 120, "MusicRate cannot be greater than 120.", { musicRate });

	if (score < 700_000) {
		return 0;
	}

	return level * 12.5 * (musicRate / 99);
}

/**
 * Given a jubility, return the musicRate necessary to get that jubility.
 * This assumes that the player has a score >= 700k.
 *
 * @param jubility - The jubility to inversely calculate.
 * @param level - The level for the chart.
 */
export function inverse(jubility: number, level: number) {
	return (99 / (12.5 * level)) * jubility;
}
