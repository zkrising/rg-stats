# Pop'n Class Points

Pop'n Class Points functionality is exported under `PopnClassPoints`. To use it,
```ts
import { PopnClassPoints } from "rg-stats"
```

## About

Class Points are [pop'n music](https://en.wikipedia.org/wiki/Pop%27n_Music)'s way of rating a players score. Class points on a given
chart aren't displayed anywhere in game, but rather the game keeps a running total of your
recently achieved class points, and displays that total when you card out.

## `PopnClassPoints.calculate()`

Calculates the class points a given score and lamp is worth on that chart level.

!!! info
	PopnLamps is defined as follows:

	```ts
	type PopnLamps = "FAILED" | "EASY CLEAR" | "CLEAR" | "FULL COMBO" | "PERFECT";
	```

### Signature

```ts
/**
 * Calculate the pop'n class points for an individual score.
 *
 * @param score - The score value. Between 0 and 100k.
 * @param lamp - The lamp for this score.
 * @param level - The level for this chart. Typically between 1 and 50,
 * but the upper bound is not enforced here.
 */
function calculate(score: integer, lamp: PopnLamps, level: integer): number
```

## `PopnClassPoints.inverse()`

Given class points, return the score needed to achieve that on the given chart level.

!!! warning
	Throws if the class points requested is not achievable with the other constraints.

### Signature

```ts
/**
 * Given a pop'n class points value, expected lamp and chart level, return the
 * score necessary to get that amount of class points.
 *
 * @param classPoints - The class points to invert.
 * @param lamp - The lamp to invert for. The lamp affects how much score is needed
 * to achieve a given class points value.
 * @param level - The level for the chart. Typically between 1 and 50,
 * but the upper bound is not enforced here.
 */
function inverse(classPoints: number, lamp: PopnLamps, level: integer): integer
```