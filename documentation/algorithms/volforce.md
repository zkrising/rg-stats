# Volforce

Volforce functionality is exported under `Volforce`. To use it,
```ts
import { Volforce } from "rg-stats"
```

## About

Volforce (often referred to as VF) is the in-game rating algorithm for [SOUND VOLTEX](https://en.wikipedia.org/wiki/Sound_Voltex). It has had multiple iterations across
releases of SOUND VOLTEX. We support all of them.

## `Volforce.calculateVF4()`

VF4 is volforce as it was implemented in SOUND VOLTEX 4. It was introduced in 2016, and was superceded by VF5 in 2019.

!!! danger
	This algorithm has **long** been deprecated by players. It has critical flaws in which
	it massively overrewards the level of chart you're playing, rather than your actual performance on it.

	As an example, getting a PUC on a level 16 chart is worth 425 VF4, but getting 8.7million on a level 20 chart is worth **429** VF4!

	For those that don't play the game, 8.7million is an incredibly poor score -- far below what people normally aim for on a chart.

### Signature

```ts
/**
 * Calculate VOLFORCE as it's defined in SDVX4.
 *
 * @param score - The user's score. Between 0 and 10million.
 * @param level - The level of the chart. Between 0 and 20, but this is not enforced.
 */
function calculateVF4(score: integer, level: integer): integer
```

## `Volforce.inverseVF4()`

Return the score value needed to get the provided vf4 on the given level of chart.

!!! warning
	This function will throw if the VF4 requested isn't possible to achieve.
	(i.e. Requesting 500VF4 on a level 1 chart.)

### Signature

```ts
/**
 * Given a VF4 value and a chart level, return what score is needed to get that
 * VF4.
 *
 * If the score needed is greater than 10million, this function will throw.
 **
 * @param vf4 - The VF4 to invert.
 * @param level - The level of the chart you're inverting for.
 */
function inverseVF4(vf4: integer, level: integer): integer
```

## `Volforce.calculateVF5()`

VF5 is volforce as it was implemented in SOUND VOLTEX 5. It was introduced in 2019, and was superceded by VF6 in 2021.

!!! danger
	This algorithm is *strictly worse* than VF6, and is therefore almost never used.
	It is, however, kept here for compatibility.

	VF6 is VF5 but to three decimal places. VF5 notably only goes to two decimal places,
	which restricts the rating algorithm into being *very* discrete.

!!! note
	SDVXLamps are defined as follows:

	```ts
	type SDVXLamps =
		| "FAILED"
		| "CLEAR"
		| "EXCESSIVE CLEAR"
		| "ULTIMATE CHAIN"
		| "PERFECT ULTIMATE CHAIN";
	```

```ts
/**
 * Calculate VOLFORCE as it's defined in SDVX5.
 *
 * @param score - The user's score. Between 0 and 10million.
 * @param level - The level of the chart. Between 0 and 20, but this is not enforced.
 */
function calculateVF5(score: integer, lamp: SDVXLamps, level: integer): number
```

## `Volforce.inverseVF5()`

Return the score value needed to get the provided VF5 on the given level of chart with the given lamp.

!!! warning
	This function will throw if the VF5 requested isn't possible to achieve.

!!! tip
	This function is actually identical to `inverseVF6`. You can pass VF6 values into this
	and get the right answer back (since VF5 and VF6 are the same rating, just rounded to different decimal places.)

!!! note
	Passing PERFECT ULTIMATE CHAIN as a lamp to this function does not make any sense,
	so it is not possible to pass that into this function.

	If the lamp is given as PUC, the only possible returnable value is 10million!

### Signature

```ts
/**
 * Given a VF5 value and a chart level, return what score is needed to get that
 * VF5.
 *
 * If the score needed is greater than 10million, this function will throw.
 *
 * @param vf5 - The VF5 to invert.
 * @param lamp - The lamp for this score. This is necessary to know, as lampCoefficient
 * plays a part in VF5.
 * @param level - The level of the chart you're inverting for.
 */
export function inverseVF5(
	vf5: number,
	// Exclude PUC as input. It doesn't make sense as input, since the answer would
	// always be 10million.
	lamp: Exclude<SDVXLamps, "PERFECT ULTIMATE CHAIN">,
	level: integer
): integer
```

## `Volforce.calculateVF6()`

VF6 is volforce as it was implemented in SOUND VOLTEX 6. It was introduced in 2021, and is the current community standard for volforce calculations.

### Signature

```ts
/**
 * Calculate VOLFORCE as it's defined in SDVX6.
 *
 * @param score - The user's score. Between 0 and 10million.
 * @param level - The level of the chart. Between 0 and 20, but this is not enforced.
 */
export function calculateVF6(score: integer, lamp: SDVXLamps, level: integer): number
```

## `Volforce.inverseVF6()`

Return the score value needed to get the provided VF6 on the given level of chart with the given lamp.

### Signature

```ts
/**
 * Given a VF6 value and a chart level, return what score is needed to get that
 * VF5.
 *
 * If the score needed is greater than 10million, this function will throw.
 **
 * @param vf6 - The VF6 to invert.
 * @param lamp - The lamp for this score. This is necessary to know, as lampCoefficient
 * plays a part in VF6. Passing "PERFECT ULTIMATE CHAIN" as a lamp is invalid, as inverting
 * it into a score makes no sense.
 * @param level - The level of the chart you're inverting for.
 */
export function inverseVF6(
	vf6: number,
	// Exclude PUC as input. It doesn't make sense as input, since the answer would
	// always be 10million.
	lamp: Exclude<SDVXLamps, "PERFECT ULTIMATE CHAIN">,
	level: integer
): integer
```