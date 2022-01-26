import t from "tap";
import { isAprx } from "../test-utils/approx";
import { TestCase } from "../test-utils/test-case";
import { ThrowsToSnapshot } from "../test-utils/throw-snapshot";
import { calculate, inverse, PopnLamps } from "./popn-classpoints";

t.test("Pop'n Class Points Tests", (t) => {
	function MakeTestCase(
		score: number,
		lamp: PopnLamps,
		level: number,
		expectedClassPoints: number
	): TestCase {
		return (t) =>
			isAprx(
				t,
				calculate(score, lamp, level),
				expectedClassPoints,
				`A score of ${score} and lamp ${lamp} on a chart with level ${level} should be worth ${expectedClassPoints} class points.`
			);
	}

	const testCases = [
		MakeTestCase(91_134, "CLEAR", 49, 98.19),
		MakeTestCase(91_134, "EASY CLEAR", 49, 98.19),
		MakeTestCase(91_134, "FULL COMBO", 49, 98.55),
		MakeTestCase(91_134, "FAILED", 49, 97.63),
		MakeTestCase(89_028, "CLEAR", 49, 97.79),
		MakeTestCase(90_480, "FAILED", 49, 97.51),
		MakeTestCase(88_259, "CLEAR", 48, 95.82),
		MakeTestCase(0, "CLEAR", 48, 0),
		MakeTestCase(49_999, "CLEAR", 48, 0),
		MakeTestCase(100_000, "PERFECT", 1, 11.94),
		MakeTestCase(100_000, "PERFECT", 50, 102.02),
		MakeTestCase(100_000, "FULL COMBO", 50, 102.02),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("Pop'n Class Points Validation Tests", (t) => {
	ThrowsToSnapshot(
		t,
		() => calculate(95_000, "CLEAR", -1),
		"Should throw if chart level is negative."
	);
	ThrowsToSnapshot(t, () => calculate(100_001, "CLEAR", 10), "Should throw if score is > 100k.");
	ThrowsToSnapshot(t, () => calculate(-1, "CLEAR", 10), "Should throw if score is negative.");

	ThrowsToSnapshot(
		t,
		() => calculate(72_000, "FOO" as PopnLamps, 10),
		"Should throw if lamp is invalid."
	);

	t.end();
});

t.test("Pop'n Inverse Class Points Tests", (t) => {
	function MakeTestCase(
		expectedScore: number,
		lamp: PopnLamps,
		level: number,
		classPoints: number
	): TestCase {
		return (t) =>
			isAprx(
				t,
				inverse(classPoints, lamp, level),
				expectedScore,
				`${classPoints} class points and lamp ${lamp} on a chart with level ${level} should invert to ${expectedScore} score.`
			);
	}

	const testCases = [
		MakeTestCase(91_154, "CLEAR", 49, 98.19),
		MakeTestCase(91_154, "EASY CLEAR", 49, 98.19),
		MakeTestCase(91_112, "FULL COMBO", 49, 98.55),
		MakeTestCase(91_107, "FAILED", 49, 97.63),
		MakeTestCase(88_978, "CLEAR", 49, 97.79),
		MakeTestCase(90_454, "FAILED", 49, 97.51),
		MakeTestCase(88_261, "CLEAR", 48, 95.82),
		MakeTestCase(0, "CLEAR", 48, 0),
		MakeTestCase(99_954, "PERFECT", 1, 11.94),
		MakeTestCase(99_989, "PERFECT", 50, 102.02),
		MakeTestCase(99_989, "FULL COMBO", 50, 102.02),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("Pop'n Inverse Class Points Validation Tests", (t) => {
	ThrowsToSnapshot(
		t,
		() => inverse(9000, "FAILED", 1),
		"Should throw if the provided class points are impossible to achieve given the other constraints."
	);

	ThrowsToSnapshot(t, () => inverse(10, "CLEAR", -1), "Should throw if chart level is negative.");

	t.end();
});
