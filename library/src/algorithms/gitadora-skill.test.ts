import t from "tap";
import { isAprx } from "../test-utils/approx";
import { TestCase } from "../test-utils/test-case";
import { ThrowsToSnapshot } from "../test-utils/throw-snapshot";
import { calculate, inverse } from "./gitadora-skill";

t.test("GITADORA Skill Tests", (t) => {
	function MakeTestCase(scorePercent: number, level: number, expectedSkill: number): TestCase {
		return (t) =>
			isAprx(
				t,
				calculate(scorePercent, level),
				expectedSkill,
				`A Score Percent of ${scorePercent} on a chart with level ${level} should be worth ${expectedSkill} skill.`
			);
	}

	const testCases = [
		MakeTestCase(89.48, 3.4, 60.84),
		MakeTestCase(70.76, 5.8, 82.08),
		MakeTestCase(40.2, 9.5, 76.38),

		// This used to return 19.55 due to FloorToNDP(x, 2):
		//    19.56 * 100 = 1955.9999999999998
		MakeTestCase(97.8, 1, 19.56),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("GITADORA Skill Validation Tests", (t) => {
	ThrowsToSnapshot(t, () => calculate(-1, 1), "Should throw if skill provided was negative");
	ThrowsToSnapshot(t, () => calculate(50, -1), "Should throw if level provided was negative");

	t.end();
});

t.test("GITADORA Inverse Skill Tests", (t) => {
	function MakeTestCase(expectedPercent: number, level: number, skill: number): TestCase {
		return (t) =>
			isAprx(
				t,
				inverse(skill, level),
				expectedPercent,
				`A Skill Level of ${skill} on a chart with level ${level} should invert to ${expectedPercent} percent.`
			);
	}

	const testCases = [
		MakeTestCase(89.48, 3.4, 60.84),
		MakeTestCase(70.76, 5.8, 82.08),
		MakeTestCase(40.2, 9.5, 76.38),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("GITADORA Inverse Skill Validation Tests", (t) => {
	ThrowsToSnapshot(
		t,
		() => inverse(9_000, 1),
		"Should throw if the skill provided was not possible on this chart."
	);

	ThrowsToSnapshot(t, () => inverse(-1, 1), "Should throw if skill provided was negative");
	ThrowsToSnapshot(t, () => inverse(50, -1), "Should throw if level provided was negative");

	t.end();
});
