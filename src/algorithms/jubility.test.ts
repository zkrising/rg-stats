import t from "tap";
import { isAprx } from "../test-utils/approx";
import { TestCase } from "../test-utils/test-case";
import { ThrowsToSnapshot } from "../test-utils/throw-snapshot";
import { calculate } from "./jubility";

t.test("Jubility Tests", (t) => {
	function TestCase(rate: number, level: number, jubility: number): TestCase {
		return (t) =>
			isAprx(
				t,
				// note: score doesn't actually matter, it's just there to check
				// that your score isn't < 700k.
				calculate(700_001, rate, level),
				jubility,
				`${rate}% on a level ${level} chart should be worth ${jubility} jubility.`,
				1
			);
	}

	// This is just one big table stolen from bemaniwiki.
	const testCases = [
		TestCase(80, 10.9, 110.1),
		TestCase(85, 10.9, 116.9),
		TestCase(90, 10.9, 123.8),
		TestCase(95, 10.9, 130.7),
		TestCase(100, 10.9, 137.6),
		TestCase(105, 10.9, 144.5),
		TestCase(110, 10.9, 151.3),
		TestCase(115, 10.9, 158.2),
		TestCase(120, 10.9, 165.1),
		TestCase(80, 10.8, 109.0),
		TestCase(85, 10.8, 115.9),
		TestCase(90, 10.8, 122.7),
		TestCase(95, 10.8, 129.5),
		TestCase(100, 10.8, 136.3),
		TestCase(105, 10.8, 143.1),
		TestCase(110, 10.8, 150.0),
		TestCase(115, 10.8, 156.8),
		TestCase(120, 10.8, 163.6),
		TestCase(80, 10.7, 108.0),
		TestCase(85, 10.7, 114.8),
		TestCase(90, 10.7, 121.5),
		TestCase(95, 10.7, 128.3),
		TestCase(100, 10.7, 135.1),
		TestCase(105, 10.7, 141.8),
		TestCase(110, 10.7, 148.6),
		TestCase(115, 10.7, 155.3),
		TestCase(120, 10.7, 162.1),
		TestCase(80, 10.6, 107.0),
		TestCase(85, 10.6, 113.7),
		TestCase(90, 10.6, 120.4),
		TestCase(95, 10.6, 127.1),
		TestCase(100, 10.6, 133.8),
		TestCase(105, 10.6, 140.5),
		TestCase(110, 10.6, 147.2),
		TestCase(115, 10.6, 153.9),
		TestCase(120, 10.6, 160.6),
		TestCase(80, 10.5, 106.0),
		TestCase(85, 10.5, 112.6),
		TestCase(90, 10.5, 119.3),
		TestCase(95, 10.5, 125.9),
		TestCase(100, 10.5, 132.5),
		TestCase(105, 10.5, 139.2),
		TestCase(110, 10.5, 145.8),
		TestCase(115, 10.5, 152.4),
		TestCase(120, 10.5, 159.0),
		TestCase(80, 10.4, 105.0),
		TestCase(85, 10.4, 111.6),
		TestCase(90, 10.4, 118.1),
		TestCase(95, 10.4, 124.7),
		TestCase(100, 10.4, 131.3),
		TestCase(105, 10.4, 137.8),
		TestCase(110, 10.4, 144.4),
		TestCase(115, 10.4, 151.0),
		TestCase(120, 10.4, 157.5),
		TestCase(80, 10.3, 104.0),
		TestCase(85, 10.3, 110.5),
		TestCase(90, 10.3, 117.0),
		TestCase(95, 10.3, 123.5),
		TestCase(100, 10.3, 130.0),
		TestCase(105, 10.3, 136.5),
		TestCase(110, 10.3, 143.0),
		TestCase(115, 10.3, 149.5),
		TestCase(120, 10.3, 156.0),
		TestCase(80, 10.2, 103.0),
		TestCase(85, 10.2, 109.4),
		TestCase(90, 10.2, 115.9),
		TestCase(95, 10.2, 122.3),
		TestCase(100, 10.2, 128.7),
		TestCase(105, 10.2, 135.2),
		TestCase(110, 10.2, 141.6),
		TestCase(115, 10.2, 148.1),
		TestCase(120, 10.2, 154.5),
		TestCase(80, 10.1, 102.0),
		TestCase(85, 10.1, 108.3),
		TestCase(90, 10.1, 114.7),
		TestCase(95, 10.1, 121.1),
		TestCase(100, 10.1, 127.5),
		TestCase(105, 10.1, 133.9),
		TestCase(110, 10.1, 140.2),
		TestCase(115, 10.1, 146.6),
		TestCase(120, 10.1, 153.0),
		TestCase(80, 10.0, 101.0),
		TestCase(85, 10.0, 107.3),
		TestCase(90, 10.0, 113.6),
		TestCase(95, 10.0, 119.9),
		TestCase(100, 10.0, 126.2),
		TestCase(105, 10.0, 132.5),
		TestCase(110, 10.0, 138.8),
		TestCase(115, 10.0, 145.2),
		TestCase(120, 10.0, 151.5),
		TestCase(80, 9.9, 100.0),
		TestCase(85, 9.9, 106.2),
		TestCase(90, 9.9, 112.5),
		TestCase(95, 9.9, 118.7),
		TestCase(100, 9.9, 125.0),
		TestCase(105, 9.9, 131.2),
		TestCase(110, 9.9, 137.5),
		TestCase(115, 9.9, 143.7),
		TestCase(120, 9.9, 150.0),
		TestCase(80, 9.8, 98.9),
		TestCase(85, 9.8, 105.1),
		TestCase(90, 9.8, 111.3),
		TestCase(95, 9.8, 117.5),
		TestCase(100, 9.8, 123.7),
		TestCase(105, 9.8, 129.9),
		TestCase(110, 9.8, 136.1),
		TestCase(115, 9.8, 142.2),
		TestCase(120, 9.8, 148.4),
		TestCase(80, 9.7, 97.9),
		TestCase(85, 9.7, 104.1),
		TestCase(90, 9.7, 110.2),
		TestCase(95, 9.7, 116.3),
		TestCase(100, 9.7, 122.4),
		TestCase(105, 9.7, 128.5),
		TestCase(110, 9.7, 134.7),
		TestCase(115, 9.7, 140.8),
		TestCase(120, 9.7, 146.9),
		TestCase(80, 9.6, 96.9),
		TestCase(85, 9.6, 103.0),
		TestCase(90, 9.6, 109.0),
		TestCase(95, 9.6, 115.1),
		TestCase(100, 9.6, 121.2),
		TestCase(105, 9.6, 127.2),
		TestCase(110, 9.6, 133.3),
		TestCase(115, 9.6, 139.3),
		TestCase(120, 9.6, 145.4),
		TestCase(80, 9.5, 95.9),
		TestCase(85, 9.5, 101.9),
		TestCase(90, 9.5, 107.9),
		TestCase(95, 9.5, 113.9),
		TestCase(100, 9.5, 119.9),
		TestCase(105, 9.5, 125.9),
		TestCase(110, 9.5, 131.9),
		TestCase(115, 9.5, 137.9),
		TestCase(120, 9.5, 143.9),
		TestCase(80, 9.4, 94.9),
		TestCase(85, 9.4, 100.8),
		TestCase(90, 9.4, 106.8),
		TestCase(95, 9.4, 112.7),
		TestCase(100, 9.4, 118.6),
		TestCase(105, 9.4, 124.6),
		TestCase(110, 9.4, 130.5),
		TestCase(115, 9.4, 136.4),
		TestCase(120, 9.4, 142.4),
		TestCase(80, 9.3, 93.9),
		TestCase(85, 9.3, 99.8),
		TestCase(90, 9.3, 105.6),
		TestCase(95, 9.3, 111.5),
		TestCase(100, 9.3, 117.4),
		TestCase(105, 9.3, 123.2),
		TestCase(110, 9.3, 129.1),
		TestCase(115, 9.3, 135.0),
		TestCase(120, 9.3, 140.9),
		TestCase(80, 9.2, 92.9),
		TestCase(85, 9.2, 98.7),
		TestCase(90, 9.2, 104.5),
		TestCase(95, 9.2, 110.3),
		TestCase(100, 9.2, 116.1),
		TestCase(105, 9.2, 121.9),
		TestCase(110, 9.2, 127.7),
		TestCase(115, 9.2, 133.5),
		TestCase(120, 9.2, 139.3),
		TestCase(80, 9.1, 91.9),
		TestCase(85, 9.1, 97.6),
		TestCase(90, 9.1, 103.4),
		TestCase(95, 9.1, 109.1),
		TestCase(100, 9.1, 114.8),
		TestCase(105, 9.1, 120.6),
		TestCase(110, 9.1, 126.3),
		TestCase(115, 9.1, 132.1),
		TestCase(120, 9.1, 137.8),
		TestCase(80, 9.0, 90.9),
		TestCase(85, 9.0, 96.5),
		TestCase(90, 9.0, 102.2),
		TestCase(95, 9.0, 107.9),
		TestCase(100, 9.0, 113.6),
		TestCase(105, 9.0, 119.3),
		TestCase(110, 9.0, 125.0),
		TestCase(115, 9.0, 130.6),
		TestCase(120, 9.0, 136.3),
		TestCase(80, 8, 80.8),
		TestCase(85, 8, 85.8),
		TestCase(90, 8, 90.9),
		TestCase(95, 8, 95.9),
		TestCase(100, 8, 101.0),
		TestCase(105, 8, 106.0),
		TestCase(110, 8, 111.1),
		TestCase(115, 8, 116.1),
		TestCase(120, 8, 121.2),
		TestCase(80, 7, 70.7),
		TestCase(85, 7, 75.1),
		TestCase(90, 7, 79.5),
		TestCase(95, 7, 83.9),
		TestCase(100, 7, 88.3),
		TestCase(105, 7, 92.8),
		TestCase(110, 7, 97.2),
		TestCase(115, 7, 101.6),
		TestCase(120, 7, 106.0),
		TestCase(80, 6, 60.6),
		TestCase(85, 6, 64.3),
		TestCase(90, 6, 68.1),
		TestCase(95, 6, 71.9),
		TestCase(100, 6, 75.7),
		TestCase(105, 6, 79.5),
		TestCase(110, 6, 83.3),
		TestCase(115, 6, 87.1),
		TestCase(120, 6, 90.9),
		TestCase(80, 5, 50.5),
		TestCase(85, 5, 53.6),
		TestCase(90, 5, 56.8),
		TestCase(95, 5, 59.9),
		TestCase(100, 5, 63.1),
		TestCase(105, 5, 66.2),
		TestCase(110, 5, 69.4),
		TestCase(115, 5, 72.6),
		TestCase(120, 5, 75.7),
		TestCase(80, 4, 40.4),
		TestCase(85, 4, 42.9),
		TestCase(90, 4, 45.4),
		TestCase(95, 4, 47.9),
		TestCase(100, 4, 50.5),
		TestCase(105, 4, 53.0),
		TestCase(110, 4, 55.5),
		TestCase(115, 4, 58.0),
		TestCase(120, 4, 60.6),
		TestCase(80, 3, 30.3),
		TestCase(85, 3, 32.1),
		TestCase(90, 3, 34.0),
		TestCase(95, 3, 35.9),
		TestCase(100, 3, 37.8),
		TestCase(105, 3, 39.7),
		TestCase(110, 3, 41.6),
		TestCase(115, 3, 43.5),
		TestCase(120, 3, 45.4),
		TestCase(80, 2, 20.2),
		TestCase(85, 2, 21.4),
		TestCase(90, 2, 22.7),
		TestCase(95, 2, 23.9),
		TestCase(100, 2, 25.2),
		TestCase(105, 2, 26.5),
		TestCase(110, 2, 27.7),
		TestCase(115, 2, 29.0),
		TestCase(120, 2, 30.3),
		TestCase(80, 1, 10.1),
		TestCase(85, 1, 10.7),
		TestCase(90, 1, 11.3),
		TestCase(95, 1, 11.9),
		TestCase(100, 1, 12.6),
		TestCase(105, 1, 13.2),
		TestCase(110, 1, 13.8),
		TestCase(115, 1, 14.5),
		TestCase(120, 1, 15.1),
	];

	for (const testCase of testCases) {
		testCase(t);
	}

	t.end();
});

t.test("Jubility Validation Tests", (t) => {
	ThrowsToSnapshot(
		t,
		() => calculate(1_000_001, 100, 10.5),
		"Should throw if score is > 1million."
	);
	ThrowsToSnapshot(
		t,
		() => calculate(1_000_000, 120.1, 10.5),
		"Should throw if music rate is > 120."
	);

	ThrowsToSnapshot(t, () => calculate(-1, 100, 10.5), "Should throw if score is negative.");
	ThrowsToSnapshot(
		t,
		() => calculate(1_000_000, -1, 10.5),
		"Should throw if music rate is negative."
	);
	ThrowsToSnapshot(
		t,
		() => calculate(1_000_000, -1, -1),
		"Should throw if chart level is negative."
	);

	t.end();
});