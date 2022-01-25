import { FloorToNDP } from "../util/math";
import { GetEntries, GetEntriesAsArray } from "../util/misc";
import { ThrowIf } from "../util/throw-if";

export type SDVXGrades = "D" | "C" | "B" | "A" | "A+" | "AA" | "AA+" | "AAA" | "AAA+" | "S";
export type SDVXLamps =
	| "FAILED"
	| "CLEAR"
	| "EXCESSIVE CLEAR"
	| "ULTIMATE CHAIN"
	| "PERFECT ULTIMATE CHAIN";

const VF4GradeCoefficients: Record<SDVXGrades, number> = {
	S: 1.0,
	"AAA+": 0.99,
	AAA: 0.98,
	"AA+": 0.97,
	AA: 0.96,
	"A+": 0.95,
	A: 0.94,
	B: 0.93,
	C: 0.92,
	D: 0.91,
};

const VF5GradeCoefficients: Record<SDVXGrades, number> = {
	S: 1.05,
	"AAA+": 1.02,
	AAA: 1.0,
	"AA+": 0.97,
	AA: 0.94,
	// everything below this point is marked with a (?)
	// in bemaniwiki, so maybe it can't be trusted?
	"A+": 0.91,
	A: 0.88,
	B: 0.85,
	C: 0.82,
	D: 0.8,
};

const VF5LampCoefficients: Record<SDVXLamps, number> = {
	"PERFECT ULTIMATE CHAIN": 1.1,
	"ULTIMATE CHAIN": 1.05,
	"EXCESSIVE CLEAR": 1.02,
	CLEAR: 1.0,
	FAILED: 0.5,
};

/**
 * Calculate VOLFORCE as it's defined in SDVX4.
 *
 * @param score - The user's score. Between 0 and 10million.
 * @param level - The level of the chart. Between 0 and 20, but this is not enforced.
 */
export function calculateVF4(score: number, level: number) {
	AssertProvidedScore(score);

	const grade = SDVXScoreToGrade(score);

	const gradeCoefficient = VF4GradeCoefficients[grade];

	return Math.floor(25 * (level + 1) * (score / 10_000_000) * gradeCoefficient);
}

/**
 * Given a VF4 value and a chart level, return what score is needed to get that
 * VF4.
 *
 * If the score needed is greater than 10million, this function will throw.
 **
 * @param vf4 - The VF4 to invert.
 * @param level - The level of the chart you're inverting for.
 */
export function inverseVF4(vf4: number, level: number) {
	const i = (10_000_000 * vf4) / (25 * (level + 1));

	for (const [grade, gradeCoef] of GetEntriesAsArray(VF4GradeCoefficients).reverse()) {
		const maybeScore = i / gradeCoef;

		const { lower, upper } = SDVXGetGradeBoundaries(grade);

		if (maybeScore <= lower) {
			return lower;
		} else if (maybeScore < upper || (maybeScore === upper && upper === 10_000_000)) {
			return Math.round(maybeScore);
		}
	}

	throw new Error(
		`Invalid input. A VF4 of ${vf4} is not possible on a chart with level ${level}.`
	);
}

/**
 * Calculate VOLFORCE as it's defined in SDVX5.
 *
 * @param score - The user's score. Between 0 and 10million.
 * @param level - The level of the chart. Between 0 and 20, but this is not enforced.
 */
export function calculateVF5(score: number, lamp: SDVXLamps, level: number) {
	AssertProvidedScore(score);

	const unroundedVF5 = CalculateUnroundedVF5(score, lamp, level);

	return FloorToNDP(unroundedVF5, 2);
}

/**
 * Calculate VOLFORCE as it's defined in SDVX6.
 *
 * @param score - The user's score. Between 0 and 10million.
 * @param level - The level of the chart. Between 0 and 20, but this is not enforced.
 */
export function calculateVF6(score: number, lamp: SDVXLamps, level: number) {
	AssertProvidedScore(score);

	const unroundedVF5 = CalculateUnroundedVF5(score, lamp, level);

	// VF6 is just unroundedVF5 to 3 decimal places instead of 2.
	return FloorToNDP(unroundedVF5, 3);
}

/**
 * Calculate VF5 without performing any rounding. This is useful because VF5
 * is floored to 2 decimal places, wherease VF6 is floored to 3. This lets us
 * reuse the same algorithm.
 */
function CalculateUnroundedVF5(score: number, lamp: SDVXLamps, level: number) {
	const grade = SDVXScoreToGrade(score);

	const gradeCoefficient = VF5GradeCoefficients[grade];
	const lampCoefficient = VF5LampCoefficients[lamp];

	return (level * 2 * (score / 10_000_000) * gradeCoefficient * lampCoefficient) / 100;
}

/**
 * Convert a SDVX percent to the grade it represents.
 * @param score - The score to convert - between 0 and 10million.
 * @returns A string representing a grade.
 */
function SDVXScoreToGrade(score: number): SDVXGrades {
	if (score < 7_000_000) {
		return "D";
	} else if (score < 8_000_000) {
		return "C";
	} else if (score < 8_700_000) {
		return "B";
	} else if (score < 9_000_000) {
		return "A";
	} else if (score < 9_300_000) {
		return "A+";
	} else if (score < 9_500_000) {
		return "AA";
	} else if (score < 9_700_000) {
		return "AA+";
	} else if (score < 9_800_000) {
		return "AAA";
	} else if (score < 9_900_000) {
		return "AAA+";
	}

	return "S";
}

/**
 * Given a SDVX grade, return the lower and upper bounds for scoring in this grade.
 * This is used to invert the gradeCoefficient function in volforce.
 *
 * Bounds are returned as lower <= k < upper.
 */
function SDVXGetGradeBoundaries(grade: SDVXGrades): { lower: number; upper: number } {
	if (grade === "S") {
		return { lower: 9_900_000, upper: 10_000_000 };
	} else if (grade === "AAA+") {
		return { lower: 9_800_000, upper: 9_900_000 };
	} else if (grade === "AAA") {
		return { lower: 9_700_000, upper: 9_800_000 };
	} else if (grade === "AA+") {
		return { lower: 9_500_000, upper: 9_700_000 };
	} else if (grade === "AA") {
		return { lower: 9_300_000, upper: 9_500_000 };
	} else if (grade === "A+") {
		return { lower: 9_000_000, upper: 9_300_000 };
	} else if (grade === "A") {
		return { lower: 8_700_000, upper: 9_000_000 };
	} else if (grade === "B") {
		return { lower: 8_000_000, upper: 8_700_000 };
	} else if (grade === "C") {
		return { lower: 7_000_000, upper: 8_000_000 };
	}

	return { lower: 0, upper: 7_000_000 };
}

function AssertProvidedScore(score: number) {
	ThrowIf(score > 10_000_000, "Score cannot be greater than 10million", { score });
	ThrowIf.negative(score, "Score cannot be negative", { score });
}
