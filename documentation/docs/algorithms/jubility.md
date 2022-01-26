# Jubility

Jubility functionality is exported under `Jubility`. To use it,
```ts
import { Jubility } from "rg-stats"
```

## About

Jubility is an algorithm used in [jubeat](https://en.wikipedia.org/wiki/Jubeat) to determine the skill
level of a player. It is calculated from the level of the chart, the Music Rate the player achieved,
and (for one edge case) the score that they got.

## `Jubility.calculate()`

Calculates jubility on a given chart with a given music rate.

!!! note
	The provided score value has no impact on jubility unless it is below 700k. If your score is below 700k, the jubility returned will always be 0.

### Signature

```ts
/**
 * Calculates the jubility of a score. Returns 0 for anything less than 700k.
 *
 * @param score - The score value. This is between 0 and 1million.
 * @param musicRate - The Music Rate of their score -- this is a percentage value.
 * This is between 0 and 120, where 100-120 is only achiveable on hard mode.
 * @param level - The level for the chart.
 */
function calculate(score: number, musicRate: number, level: number): number
```

## `Jubility.inverse()`

For a given jubility on a given chart, return the music rate necessary to get that jubility.

!!! note
	This assumes that score exceeds 700k and is therefore eligible for jubility.

### Signature

```ts
/**
 * Given a jubility, return the musicRate necessary to get that jubility.
 * This assumes that the player has a score >= 700k, as otherwise no inversion
 * is possible.
 *
 * @param jubility - The jubility to inversely calculate.
 * @param level - The level for the chart.
 */
function inverse(jubility: number, level: number): number
```

!!! warning
	This function will throw if the requested jubility is not achievable on a chart with that level!