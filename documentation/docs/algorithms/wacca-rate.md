# WACCA Rate

WACCA Rate functionality is exported under `WACCARate`. To use it,
```ts
import { WACCARate } from "rg-stats"
```

## About

Rate is an algorithm used in [WACCA](https://wacca.marv-games.jp/web/login/index). This algorithm is used to rate players abilities.

On a profile level, WACCA looks at your best 30 plays on HOT charts and your best 30 on everything else.

## `WACCARate.calculate()`

Calculates rate on a given chart.

!!! info
	As is with [CHUNITHM](./chunithm-rating.md), WACCA refers to an internal, hidden decimal value in order to rate scores.
	
	These have been reversed by dedicated players and can be found on the internet.

!!! note
	This algorithm is incredibly discrete.
	
	For any given chart, there are only 10 possible ratings you can get on it, all around 10k-20k cutoffs!

### Signature

```ts
/**
 * Calculates WACCAs rate for a score.
 *
 * @param score - The score to calculate the rate for.
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */
function calculate(score: integer, internalChartLevel: number): number
```

## `WACCARate.inverse()`

Given a rate and a chart level, this calculates the minimum score necessary to get that rate.

```ts
/**
 * Given a WACCA rate and a chart level, return the minimum score necessary to get
 * that rate.
 *
 * @param rate - The rate to inverse
 * @param internalChartLevel - The internal decimal level of the chart the rate was on.
 */
export function inverse(rate: number, internalChartLevel: number): number
```

!!! warning
	This function will throw an error if the skill value requested isn't possible on a chart of this level!

	For example, requesting `inverse(90, 10)` would result in a throw, as 90 rate is not possible even with a perfect on a chart of level 10.