import t from "tap";
import { calculate, inverse } from "./poyashi-bpi";
import { isAprx } from "../test-utils/approx";
import { TestCase } from "../test-utils/test-case";
import { ThrowsToSnapshot } from "../test-utils/throw-snapshot";

// data accurate as of 14/04/2021
const WR_AA = 3650;
const KAVG_AA = 3204;
const MAX_AA = 1834 * 2;
const COEF_AA = 1.25945;

const WR_AFT = 2891;
const KAVG_AFT = 2497;
const MAX_AFT = 1480 * 2;
const COEF_AFT = null;

t.test("BPI Tests", (t) => {
	function AA_TestCase(providedEx: number, expectedBPI: number): TestCase {
		return (t) =>
			isAprx(
				t,
				calculate(providedEx, KAVG_AA, WR_AA, MAX_AA, COEF_AA),
				expectedBPI,
				`${providedEx} on AA should be worth ${expectedBPI}.`
			);
	}

	function AFT_TestCase(providedEx: number, expectedBPI: number): TestCase {
		return (t) =>
			isAprx(
				t,
				calculate(providedEx, KAVG_AFT, WR_AFT, MAX_AFT, COEF_AFT),
				expectedBPI,
				`${providedEx} on Afterimage d'automne should be worth ${expectedBPI}`
			);
	}

	const testCases = [
		// AA Test Cases
		AA_TestCase(KAVG_AA, 0),
		AA_TestCase(WR_AA, 100),
		AA_TestCase(MAX_AA, 244.55),
		AA_TestCase(MAX_AA - 1, 222.86),
		AA_TestCase(0, -15),
		AA_TestCase(3393, 10.02),
		AA_TestCase(3481, 20.09),
		AA_TestCase(3535, 30.01),
		AA_TestCase(3572, 40.18),
		AA_TestCase(3597, 50.1),
		AA_TestCase(3615, 60.12),
		AA_TestCase(3628, 70.11),
		AA_TestCase(3638, 80.62),
		AA_TestCase(3645, 90.59),
		AA_TestCase(3041, -5),
		AA_TestCase(2886, -9.99),
		// Afterimage d'automne Test Cases
		AFT_TestCase(KAVG_AFT, 0),
		AFT_TestCase(WR_AFT, 100),
		AFT_TestCase(MAX_AFT, 431.57),
		AFT_TestCase(MAX_AFT - 1, 395.73),
		AFT_TestCase(0, -15),
		AFT_TestCase(2606, 10),
		AFT_TestCase(2675, 20.07),
		AFT_TestCase(2727, 30.18),
		AFT_TestCase(2767, 40.12),
		AFT_TestCase(2799, 50.06),
		AFT_TestCase(2826, 60.43),
		AFT_TestCase(2847, 70.3),
		AFT_TestCase(2865, 80.57),
		AFT_TestCase(2879, 90.18),
		AFT_TestCase(2423, -4.99),
		AFT_TestCase(2354, -10.04),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("BPI Validation Tests", (t) => {
	ThrowsToSnapshot(
		t,
		() => calculate(-1, 100, 110, 120, null),
		"Should throw if your score is negative."
	);
	ThrowsToSnapshot(
		t,
		() => calculate(100, -1, 110, 120, null),
		"Should throw if Kaiden Average is negative."
	);
	// note: this is the same test as WR < KAVG. If KAVG is negative, the above
	// suite fails first.
	ThrowsToSnapshot(
		t,
		() => calculate(100, 100, -1, 120, null),
		"Should throw if WR is negative."
	);
	ThrowsToSnapshot(
		t,
		() => calculate(100, 100, 110, -1, null),
		"Should throw if MAX is negative."
	);
	ThrowsToSnapshot(t, () => calculate(100, 100, 130, 120, null), "Should throw if WR > MAX");
	ThrowsToSnapshot(
		t,
		() => calculate(130, 100, 110, 120, null),
		"Should throw if your score > MAX"
	);
	ThrowsToSnapshot(t, () => calculate(100, 125, 120, 130, null), "Should throw if KAVG > WR");
	ThrowsToSnapshot(t, () => calculate(100, 120, 120, 130, null), "Should throw if KAVG == WR");

	ThrowsToSnapshot(
		t,
		() => calculate(15.5, 100, 110, 120, null),
		"Should throw if your score is not an integer."
	);

	ThrowsToSnapshot(
		t,
		() => calculate(100, 15.5, 110, 120, null),
		"Should throw if KAVG is not an integer."
	);
	ThrowsToSnapshot(
		t,
		() => calculate(100, 100, 15.5, 120, null),
		"Should throw if WR is not an integer."
	);
	ThrowsToSnapshot(
		t,
		() => calculate(100, 100, 110, 15.5, null),
		"Should throw if MAX is not an integer."
	);

	t.end();
});

t.test("BPI Edge Cases", (t) => {
	t.equal(
		calculate(1150, 1100, 1200, 1300, 1.175),
		calculate(1150, 1100, 1200, 1300, null),
		"Null as a co-efficient should be identical to 1.175 as a co-efficient"
	);
	t.equal(
		calculate(1150, 1100, 1200, 1300, 1.175),
		calculate(1150, 1100, 1200, 1300, -1),
		"-1 as a co-efficient should be identical to 1.175 as a co-efficient"
	);

	isAprx(
		t,
		calculate(1250, 1100, 1200, 1300, 1.175),
		225.79,
		"Provided EX should be allowed to be greater than WR and less than MAX."
	);

	isAprx(
		t,
		calculate(1300, 1100, 1200, 1300, 1.175),
		1205.76,
		"Provided EX should be allowed to be equal to MAX."
	);

	isAprx(
		t,
		calculate(1200, 1100, 1300, 1300, 1.175),
		8.29,
		"WR should be allowed to be equal to MAX."
	);

	// wr cannot equal KAVG, as that's undefined behaviour.

	t.end();
});

t.test("InverseBPI Tests", (t) => {
	function AA_TestCase(expectedEx: number, providedBPI: number): TestCase {
		return (t) =>
			isAprx(
				t,
				inverse(providedBPI, KAVG_AA, WR_AA, MAX_AA, COEF_AA),
				expectedEx,
				`Inverse ${providedBPI}BPI on AA should be worth ${expectedEx}`
			);
	}

	function AFT_TestCase(expectedEx: number, providedBPI: number): TestCase {
		return (t) =>
			isAprx(
				t,
				inverse(providedBPI, KAVG_AFT, WR_AFT, MAX_AFT, COEF_AFT),
				expectedEx,
				`Inverse ${providedBPI}BPI on Afterimage d'automne should be worth ${expectedEx}`
			);
	}

	const testCases = [
		// AA Test Cases
		AA_TestCase(KAVG_AA, 0),
		AA_TestCase(WR_AA, 100),
		AA_TestCase(MAX_AA, 244.55),
		AA_TestCase(MAX_AA - 1, 222.86),
		AA_TestCase(2714, -15),
		AA_TestCase(3393, 10.02),
		AA_TestCase(3481, 20.09),
		AA_TestCase(3535, 30.01),
		AA_TestCase(3572, 40.18),
		AA_TestCase(3597, 50.1),
		AA_TestCase(3615, 60.12),
		AA_TestCase(3628, 70.11),
		AA_TestCase(3638, 80.62),
		AA_TestCase(3645, 90.59),
		AA_TestCase(3041, -5),
		AA_TestCase(2886, -9.99),
		// Afterimage d'automne Test Cases
		AFT_TestCase(KAVG_AFT, 0),
		AFT_TestCase(WR_AFT, 100),
		AFT_TestCase(MAX_AFT, 431.57),
		AFT_TestCase(MAX_AFT - 1, 395.73),
		AFT_TestCase(2284, -15),
		AFT_TestCase(2606, 10),
		AFT_TestCase(2675, 20.07),
		AFT_TestCase(2727, 30.18),
		AFT_TestCase(2767, 40.12),
		AFT_TestCase(2799, 50.06),
		AFT_TestCase(2826, 60.43),
		AFT_TestCase(2847, 70.3),
		AFT_TestCase(2865, 80.57),
		AFT_TestCase(2879, 90.18),
		AFT_TestCase(2423, -4.99),
		AFT_TestCase(2354, -10.04),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("InverseBPI Validation Tests", (t) => {
	ThrowsToSnapshot(
		t,
		() => inverse(100, -1, 110, 120, null),
		"Should throw if Kaiden Average is negative."
	);
	// note: this is the same test as WR < KAVG. If KAVG is negative, the above
	// suite fails first.
	ThrowsToSnapshot(t, () => inverse(100, 100, -1, 120, null), "Should throw if WR is negative.");
	ThrowsToSnapshot(t, () => inverse(100, 100, 110, -1, null), "Should throw if MAX is negative.");

	ThrowsToSnapshot(
		t,
		() => inverse(100, 0, 110, 120, null),
		"Should throw if Kaiden Average is 0."
	);
	// note: this is the same test as WR < KAVG. If KAVG is negative, the above
	// suite fails first.
	ThrowsToSnapshot(t, () => inverse(100, 100, 0, 120, null), "Should throw if WR is 0.");
	ThrowsToSnapshot(t, () => inverse(100, 100, 110, 0, null), "Should throw if MAX is 0.");

	ThrowsToSnapshot(t, () => inverse(100, 100, 130, 120, null), "Should throw if WR > MAX");
	ThrowsToSnapshot(t, () => inverse(100, 125, 120, 130, null), "Should throw if KAVG > WR");
	ThrowsToSnapshot(t, () => inverse(100, 120, 120, 130, null), "Should throw if KAVG == WR");

	ThrowsToSnapshot(
		t,
		() => inverse(100, 15.5, 110, 120, null),
		"Should throw if KAVG is not an integer."
	);
	ThrowsToSnapshot(
		t,
		() => inverse(100, 100, 15.5, 120, null),
		"Should throw if WR is not an integer."
	);
	ThrowsToSnapshot(
		t,
		() => inverse(100, 100, 110, 15.5, null),
		"Should throw if MAX is not an integer."
	);

	ThrowsToSnapshot(
		t,
		() => inverse(-16, 1100, 1200, 1300, 1.175),
		"BPI less than -15 should throw an error."
	);

	t.end();
});

t.test("InverseBPI Edge Cases", (t) => {
	t.equal(
		inverse(30.07, 1100, 1200, 1300, 1.175),
		inverse(30.07, 1100, 1200, 1300, null),
		"Null as a co-efficient should be identical to 1.175 as a co-efficient"
	);
	t.equal(
		inverse(30.07, 1100, 1200, 1300, 1.175),
		inverse(30.07, 1100, 1200, 1300, -1),
		"-1 as a co-efficient should be identical to 1.175 as a co-efficient"
	);

	isAprx(
		t,
		inverse(30.07, 1100, 1300, 1300, 1.175),
		1275,
		"WR should be allowed to be equal to MAX."
	);

	isAprx(
		t,
		inverse(10_000, 1100, 1200, 1300, 1.175),
		1300,
		"BPI way larger than the maximum possible BPI available on the chart should return MAX."
	);

	t.end();
});
