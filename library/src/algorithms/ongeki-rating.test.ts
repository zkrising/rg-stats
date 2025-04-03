import t from "tap";
import fs from "node:fs";
import { ThrowsToSnapshot } from "../test-utils/throw-snapshot";
import { calculate, calculatePlatinum, calculateRefresh, OngekiNoteLamp } from "./ongeki-rating";

interface TestData {
	ratingRefresh: {
		internalChartLevel: number;
		technicalScore: number;
		noteLamp: OngekiNoteLamp;
		fullBell: boolean;
		expectedRating: number;
	}[];
	ratingPlatinum: {
		internalChartLevel: number;
		stars: number;
		expectedRating: number;
	}[];
}

t.test("O.N.G.E.K.I. Classic Rating Tests", (t) => {
	// Test all the cutoffs for a random chart level
	// are where they should be.
	const LEVEL = 12.5;
	t.equal(calculate(1_010_000, LEVEL), LEVEL + 2);
	t.equal(calculate(1_007_500, LEVEL), LEVEL + 2);
	t.equal(calculate(1_000_000, LEVEL), LEVEL + 1.5);
	t.equal(calculate(990_000, LEVEL), LEVEL + 1);
	t.equal(calculate(970_000, LEVEL), LEVEL);
	t.equal(calculate(900_000, LEVEL), LEVEL - 4);
	t.equal(calculate(800_000, LEVEL), LEVEL - 6);
	t.equal(calculate(500_000, LEVEL), 0);
	t.equal(calculate(0, LEVEL), 0);

	// Also, lets just test some random values inbetween. This should
	// give us decent coverage of the formula.
	t.equal(calculate(987_000, LEVEL), 13.35);
	t.equal(calculate(1_003_000, LEVEL), 14.2);
	t.equal(calculate(999_000, LEVEL), 13.95);
	t.equal(calculate(994_000, LEVEL), 13.7);
	t.equal(calculate(980_000, LEVEL), 13);
	t.equal(calculate(950_000, LEVEL), 11.35);
	t.equal(calculate(600_000, LEVEL), 0);
	t.equal(calculate(50_000, LEVEL), 0);

	t.end();
});

t.test("O.N.G.E.K.I. Classic Rating Edge Cases", (t) => {
	t.equal(
		calculate(1_010_000, 0),
		0,
		"A perfect score on a chart with level 0 should be worth 0."
	);
	t.equal(calculate(0, 12.5), 0, "A score of 0 should be worth 0.");
	t.equal(calculate(0, 0), 0, "A score of 0 on a chart with level 0 should be worth 0.");
	t.equal(calculate(1_007_880, 14.4), 16.4, "An SSS+ on a 14.4 should be worth 16.4.");

	t.end();
});

t.test("O.N.G.E.K.I. Refresh Rating Tests", (t) => {
	const LEVEL = 12.5;
	t.equal(calculateRefresh(LEVEL, 1_010_000, "ALL BREAK+", true), LEVEL + 2.7);
	t.equal(calculateRefresh(LEVEL, 970_000, "CLEAR", false), LEVEL);
	t.equal(calculateRefresh(LEVEL, 970_000, "FULL COMBO", true), LEVEL + 0.15);
	t.equal(calculateRefresh(LEVEL, 952_510, "LOSS", false), LEVEL - 1);
	t.equal(calculateRefresh(LEVEL, 952_500, "LOSS", false), LEVEL - 1);
	t.equal(calculateRefresh(LEVEL, 952_490, "LOSS", false), LEVEL - 1.001);
	t.equal(calculateRefresh(LEVEL, 900_000, "LOSS", false), LEVEL - 4);
	t.equal(calculateRefresh(LEVEL, 850_000, "LOSS", false), LEVEL - 5);
	t.equal(calculateRefresh(LEVEL, 800_000, "CLEAR", true), LEVEL - 6 + 0.05);

	t.end();
});

t.test("O.N.G.E.K.I. Refresh Rating Edge Cases", (t) => {
	t.equal(
		calculateRefresh(0, 1_010_000, "ALL BREAK+", true),
		0,
		"A perfect score on a chart with level 0 should be worth 0."
	);
	t.equal(calculateRefresh(12.5, 0, "LOSS", false), 0, "A score of 0 should be worth 0.");
	t.equal(
		calculateRefresh(0, 0, "LOSS", false),
		0,
		"A score of 0 on a chart with level 0 should be worth 0."
	);

	t.end();
});

t.test("O.N.G.E.K.I. Refresh Rating Real-world Tests", (t) => {
	const testData: TestData = JSON.parse(
		fs.readFileSync("test-data/ongeki-rating.json").toString()
	);

	for (const d of testData.ratingRefresh) {
		t.equal(
			calculateRefresh(d.internalChartLevel, d.technicalScore, d.noteLamp, d.fullBell),
			d.expectedRating,
			`${d.technicalScore} on a ${d.internalChartLevel} should be equal ${d.expectedRating}`
		);
	}

	t.end();
});

t.test("O.N.G.E.K.I. Platinum Rating Real-world Tests", (t) => {
	const testData: TestData = JSON.parse(
		fs.readFileSync("test-data/ongeki-rating.json").toString()
	);

	for (const d of testData.ratingPlatinum) {
		t.equal(
			calculatePlatinum(d.internalChartLevel, d.stars),
			d.expectedRating,
			`${d.stars} on a ${d.internalChartLevel} should be equal ${d.expectedRating}`
		);
	}

	t.equal(calculatePlatinum(15.7, 0), 0, "0 stars should always equal 0 rating");

	t.end();
});

t.test("O.N.G.E.K.I. Rating Validation Tests", (t) => {
	ThrowsToSnapshot(
		t,
		() => calculate(-1, 12.5),
		"Classic should throw if your score is negative."
	);

	ThrowsToSnapshot(
		t,
		() => calculateRefresh(12.5, -1, "LOSS", false),
		"Refresh should throw if your score is negative."
	);

	ThrowsToSnapshot(
		t,
		() => calculate(1_010_001, 12.5),
		"Classic should throw if your score is >= 1.01million."
	);

	ThrowsToSnapshot(
		t,
		() => calculateRefresh(12.5, 1_010_001, "CLEAR", true),
		"Refresh should throw if your score is >= 1.01million."
	);

	ThrowsToSnapshot(
		t,
		() => calculate(900_000, -1),

		"Classic should throw if chart level is negative."
	);

	ThrowsToSnapshot(
		t,
		() => calculateRefresh(-1, 900_000, "CLEAR", false),
		"Refresh should throw if chart level is negative."
	);

	ThrowsToSnapshot(
		t,
		() => calculatePlatinum(-1, 5),
		"Platinum should throw if chart level is negative."
	);

	ThrowsToSnapshot(
		t,
		() => calculateRefresh(12.5, 900_000, "ALL BREAK+", true),
		"Refresh should throw if lamp is ALL BREAK+ without 1.01M."
	);

	ThrowsToSnapshot(
		t,
		() => calculateRefresh(12.5, 1_010_000, "ALL BREAK", true),
		"Refresh should throw if your score is 1.01M without ALL BREAK+."
	);

	ThrowsToSnapshot(
		t,
		() => calculateRefresh(12.5, 1_010_000, "ALL BREAK+", false),
		"Refresh should throw if your score is 1.01M without FULL BELL."
	);

	ThrowsToSnapshot(
		t,
		() => calculateRefresh(12.5, 1_000_000, "LOSS", true),
		"Refresh should throw if your score is a LOSS FULL BELL."
	);

	ThrowsToSnapshot(
		t,
		() => calculatePlatinum(12.5, -1),
		"Platinum should throw if star number is negative."
	);

	ThrowsToSnapshot(t, () => calculatePlatinum(12.5, 7), "Platinum should throw if stars > 6.");

	t.end();
});
