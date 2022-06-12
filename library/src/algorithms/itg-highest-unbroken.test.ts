import { isAprx } from "../test-utils/approx";
import { TestCase } from "../test-utils/test-case";
import { calculateFromBPMPerMeasure } from "./itg-highest-unbroken";
import t from "tap";
import { RepeatNTimes } from "../util/misc";
import { ThrowsToSnapshot } from "../test-utils/throw-snapshot";

t.test("ITG Highest Unbroken Tests", (t) => {
	function MakeTestCase(
		expected32: number | null,
		bpmPerMeasure: Array<number>,
		notesPerMeasure: Array<number>,
		diedAt?: number | null,
		measures?: number
	): TestCase {
		return (t) => {
			const value = calculateFromBPMPerMeasure(
				bpmPerMeasure,
				notesPerMeasure,
				diedAt,
				measures
			);

			const msg = `A breakdown of ${bpmPerMeasure.join(", ")} should result in a highest ${
				measures ?? 32
			} of ${expected32}`;

			if (expected32 === null || value === null) {
				return t.equal(value, expected32, msg);
			} else {
				return isAprx(t, value, expected32, msg);
			}
		};
	}

	const testCases = [
		MakeTestCase(null, [], []),
		MakeTestCase(190, [50, 50, 50, ...RepeatNTimes(190, 32)], RepeatNTimes(16, 32 + 3)),
		MakeTestCase(
			340,
			[50, 50, 50, ...RepeatNTimes(340, 16)],
			[16, 16, 16, ...RepeatNTimes(32, 16)]
		),
		// user died early
		MakeTestCase(null, [50, 50, 50, ...RepeatNTimes(190, 32)], RepeatNTimes(16, 32 + 3), 1),
		// user died before 32 @ 190
		MakeTestCase(50, [50, 50, 50, ...RepeatNTimes(190, 32)], RepeatNTimes(16, 32 + 3), 32),

		// Hilariously pathological case.
		// Chart starts out at 200bpm 16ths, then 100bpm 32nds, then 50bpm 64ths...
		// Should correctly be interpreted as 32 @ 200 even though its only 21 measures.
		MakeTestCase(
			200,
			// a nps of 200bpm for the whole chart
			RepeatNTimes(200, 21),
			// but the measures are wacky.
			[RepeatNTimes(16, 12), RepeatNTimes(32, 6), RepeatNTimes(64, 3)].flat()
		),

		MakeTestCase(
			null,
			[...RepeatNTimes(200, 31), ...RepeatNTimes(0, 1), ...RepeatNTimes(200, 31)],
			[...RepeatNTimes(16, 31), ...RepeatNTimes(0, 1), ...RepeatNTimes(16, 31)]
		),
		MakeTestCase(
			200,
			[...RepeatNTimes(200, 31), ...RepeatNTimes(0, 1), ...RepeatNTimes(200, 32)],
			[...RepeatNTimes(16, 31), ...RepeatNTimes(0, 1), ...RepeatNTimes(16, 32)]
		),

		// highest unbroken should work for larger measures
		MakeTestCase(200, RepeatNTimes(200, 1024), RepeatNTimes(16, 1024), null, 1024),
		MakeTestCase(null, RepeatNTimes(200, 1024), RepeatNTimes(16, 1024), null, 1025),

		// and shorter
		MakeTestCase(200, RepeatNTimes(200, 2), RepeatNTimes(16, 2), null, 2),
		MakeTestCase(null, RepeatNTimes(200, 2), RepeatNTimes(16, 2), null, 3),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	ThrowsToSnapshot(
		t,
		() => calculateFromBPMPerMeasure([], [1]),
		"Should throw if bpms and notes don't have same length"
	);
	ThrowsToSnapshot(
		t,
		() => calculateFromBPMPerMeasure([], [], -1),
		"Should throw if died at is negative"
	);
	ThrowsToSnapshot(
		t,
		() => calculateFromBPMPerMeasure([], [], null, 0),
		"Should throw if measures is 0"
	);
	ThrowsToSnapshot(
		t,
		() => calculateFromBPMPerMeasure([], [], null, 1),
		"Should throw if measures is 1"
	);
	ThrowsToSnapshot(
		t,
		() => calculateFromBPMPerMeasure([], [], null, -1),
		"Should throw if measures is negative"
	);

	t.end();
});
