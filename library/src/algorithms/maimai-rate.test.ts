import t from "tap";
import { isAprx } from "../test-utils/approx";
import { TestCase } from "../test-utils/test-case";
import { ThrowsToSnapshot } from "../test-utils/throw-snapshot";
import { calculate } from "./maimai-rate";

t.test("maimai Rate Tests", (t) => {
	function MakeTestCase(
		score: number,
		maxScore: number,
		level: number,
		expectedRate: number
	): TestCase {
		return (t) =>
			isAprx(
				t,
				calculate(score, maxScore, level),
				expectedRate,
				`A score of ${score} on a chart of level ${level} should be worth ${expectedRate} rate.`
			);
	}

	const testCases = [
		// General boundary checks
		MakeTestCase(100.68, 100.68, 14, 19),
		MakeTestCase(100, 100.79, 13.9, 17.8),

		// SS tests
		MakeTestCase(99, 100.71, 12.9, 14.8),
		MakeTestCase(99, 100.54, 8, 9.5),
		MakeTestCase(99, 100.54, 7, 9),

		// S tests
		MakeTestCase(97, 100.36, 11.5, 11.5),
		MakeTestCase(97, 100.54, 8, 8),
		MakeTestCase(97, 100.54, 7, 7.5),

		MakeTestCase(94, 100.3, 10, 8.5),
		MakeTestCase(90, 100.3, 12.5, 10.5),
		MakeTestCase(80, 100.5, 13, 10),
		MakeTestCase(60, 100.59, 12.7, 5.08),
		MakeTestCase(40, 100.54, 9, 1.8),
		MakeTestCase(20, 100.72, 13.6, 1.36),
		MakeTestCase(13, 100.61, 11.7, 0.35),
		MakeTestCase(9, 100.26, 10.5, 0),

		MakeTestCase(100, 100, 13.9, 18.8),
		MakeTestCase(96.99, 100, 8.9, 7.95),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("maimai Rate Validation Tests", (t) => {
	ThrowsToSnapshot(
		t,
		() => calculate(100, 104.1, 10),
		"Should throw if max score is greater than 104%."
	);
	ThrowsToSnapshot(
		t,
		() => calculate(101.5, 100.68, 10),
		"Should throw if score is greater than max score."
	);
	ThrowsToSnapshot(t, () => calculate(-1, 100.68, 10), "Should throw if score is negative.");
	ThrowsToSnapshot(t, () => calculate(99.5, 100.68, -1), "Should throw if level is negative.");

	t.end();
});
