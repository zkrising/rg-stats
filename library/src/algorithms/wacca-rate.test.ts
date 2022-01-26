import t from "tap";
import { isAprx } from "../test-utils/approx";
import { TestCase } from "../test-utils/test-case";
import { ThrowsToSnapshot } from "../test-utils/throw-snapshot";
import { integer } from "../util/types";
import { calculate, inverse } from "./wacca-rate";

t.test("WACCA Rate Tests", (t) => {
	function MakeTestCase(score: integer, level: number, expectedRate: number): TestCase {
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
		MakeTestCase(990_084, 13.2, 52.8),
		MakeTestCase(984_040, 12.9, 48.375),
		MakeTestCase(950_326, 12.2, 36.6),
		MakeTestCase(997_719, 4, 16),
		MakeTestCase(906_440, 13.8, 27.6),

		// General boundary checks
		MakeTestCase(990_000, 10.2, 40.8),
		MakeTestCase(980_000, 10.7, 40.125),
		MakeTestCase(960_000, 9, 29.25),
		MakeTestCase(950_000, 8, 24),
		MakeTestCase(940_000, 8, 22),
		MakeTestCase(920_000, 8, 20),
		MakeTestCase(900_000, 8, 16),
		MakeTestCase(850_000, 8, 12),
		MakeTestCase(500, 10, 10),
		MakeTestCase(0, 10, 10),
		MakeTestCase(849_999, 10, 10),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	// Other weird algorithm quirks.

	t.equal(
		calculate(975_000, 10),
		calculate(970_000, 10),
		"970K and 975K should give identical rates."
	);

	t.equal(
		calculate(1_000_000, 10),
		calculate(990_000, 10),
		"990K and 1m should give identical rates."
	);

	t.end();
});

t.test("WACCA Rate Validation Tests", (t) => {
	ThrowsToSnapshot(t, () => calculate(-1, 10), "Should throw if score is negative.");
	ThrowsToSnapshot(
		t,
		() => calculate(1_000_001, 10),
		"Should throw if score is greater than 1million."
	);
	ThrowsToSnapshot(t, () => calculate(900_000, -1), "Should throw if level is negative.");

	t.end();
});

t.test("WACCA Inverse Rate Tests", (t) => {
	function MakeTestCase(expectedScore: integer, level: number, rate: number): TestCase {
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
		MakeTestCase(990_000, 13.2, 52.8),
		MakeTestCase(980_000, 12.9, 48.375),
		MakeTestCase(950_000, 12.2, 36.6),
		MakeTestCase(970_000, 12.2, 40),
		MakeTestCase(990_000, 4, 16),
		MakeTestCase(900_000, 13.8, 27.6),
		MakeTestCase(990_000, 10.2, 40.8),
		MakeTestCase(980_000, 10.7, 40.125),
		MakeTestCase(960_000, 9, 29.25),
		MakeTestCase(950_000, 8, 24),
		MakeTestCase(940_000, 8, 22),
		MakeTestCase(920_000, 8, 20),
		MakeTestCase(900_000, 8, 16),
		MakeTestCase(850_000, 8, 12),
		MakeTestCase(0, 10, 10),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("WACCA Inverse Rate Validation Tests", (t) => {
	ThrowsToSnapshot(t, () => inverse(50, -1), "Should throw if level is negative.");
	ThrowsToSnapshot(t, () => inverse(100, 1), "Should throw if rate is impossible.");

	t.end();
});
