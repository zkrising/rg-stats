import t from "tap";
import { isAprx } from "../test-utils/approx";
import { TestCase } from "../test-utils/test-case";
import { ThrowsToSnapshot } from "../test-utils/throw-snapshot";
import { calculate, inverse } from "./maimaidx-rate";

t.test("maimai DX Rate Tests", (t) => {
	function MakeTestCase(score: number, level: number, expectedRate: number): TestCase {
		return (t) =>
			isAprx(
				t,
				calculate(score, level),
				expectedRate,
				`A score of ${score} on a chart of level ${level} should be worth ${expectedRate} rate.`
			);
	}

	const testCases = [
		// Assertions plucked from a random user's account
		MakeTestCase(100.1398, 13, 281),
		MakeTestCase(100.1379, 12.7, 274),
		MakeTestCase(100.227, 12.5, 270),
		MakeTestCase(99.4936, 12.8, 264),

		// General boundary checks
		MakeTestCase(100.5, 13, 292),
		MakeTestCase(100, 13, 280),
		MakeTestCase(99.5, 13.7, 287),
		MakeTestCase(99, 12.7, 261),
		MakeTestCase(98, 10, 198),
		MakeTestCase(97, 8, 155),
		MakeTestCase(94, 10.7, 168),
		MakeTestCase(90, 5, 68),
		MakeTestCase(80, 11.5, 125),
		MakeTestCase(75, 12.4, 111),
		MakeTestCase(70, 14.2, 111),
		MakeTestCase(60, 15, 86),
		MakeTestCase(50, 12.6, 50),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	// Other weird algorithm quirks.

	t.equal(calculate(100.5, 13), calculate(101, 13), "101% and 100% should give identical rates.");

	t.end();
});

t.test("maimai DX Rate Validation Tests", (t) => {
	ThrowsToSnapshot(t, () => calculate(-1, 10), "Should throw if score is negative.");
	ThrowsToSnapshot(t, () => calculate(101.5, 10), "Should throw if score is greater than 101%.");
	ThrowsToSnapshot(t, () => calculate(99.5, -1), "Should throw if level is negative.");

	t.end();
});

t.test("maimai DX Inverse Rate Tests", (t) => {
	function MakeTestCase(expectedScore: number, level: number, rate: number): TestCase {
		return (t) =>
			isAprx(
				t,
				inverse(rate, level),
				expectedScore,
				`A rate of ${rate} on a chart of level ${level} should invert to ${expectedScore} rate.`
			);
	}

	// Assertions all copied from the previous tests, and just applied in reverse.
	// (and floored to the nearest boundary, because that's how it works.)
	const testCases = [
		MakeTestCase(100.5, 13, 292),
		MakeTestCase(100, 13, 280),
		MakeTestCase(99.5, 13.7, 287),
		MakeTestCase(99, 12.7, 261),
		MakeTestCase(98, 10, 198),
		MakeTestCase(97, 8, 155),
		MakeTestCase(94, 10.7, 168),
		MakeTestCase(90, 5, 68),
		MakeTestCase(80, 11.5, 125),
		MakeTestCase(75, 12.4, 111),
		MakeTestCase(70, 14.2, 111),
		MakeTestCase(60, 15, 86),
		MakeTestCase(50, 12.6, 50),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("maimai DX Inverse Rate Validation Tests", (t) => {
	ThrowsToSnapshot(t, () => inverse(50, -1), "Should throw if level is negative.");
	ThrowsToSnapshot(t, () => inverse(100, 1), "Should throw if rate is impossible.");

	t.end();
});
