# maimai DX Rating

maimai DX Rating functionality is exported under `MaimaiDXRate`. To use it,
```ts
import { MaimaiDXRate } from "rg-stats"
```

## About

Rating is an algorithm used in [maimai DX](https://maimai.sega.com/). This algorithm is derived from the score (maximum is 101%) and an internal chart level.

!!! info
	The internal chart level is not displayed in game. Charts have a second component -- a decimal -- that changes how much rating they give.

	For example, a chart marked as level 12 may have an internal level of 12.0->12.6.
	
	Similarly, a chart marked as level 12+ may have an internal level of 12.7->12.9

	People have figured out a lot of these values for charts online. You'll have to look for them.

!!! warning
	This calculates rating on a per-chart basis. The rating in game is a sum of X best charts from the current version, and Y best charts from older versions.

## `MaimaiDXRate.calculate()`

Calculates rating on a given chart.

### Signature

```ts
/**
 * Calculate maimai DX Splash+ (and newer) rate for a score.
 *
 * @param score - The score to calculate the rate for.
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */
function calculate(score: number, internalChartLevel: number): number
```
