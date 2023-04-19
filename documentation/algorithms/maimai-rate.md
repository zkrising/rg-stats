# maimai Rate

maimai Rate functionality is exported under `MaimaiRate`. To use it,
```ts
import { MaimaiRate } from "rg-stats"
```

## About

Rate is an algorithm used in [maimai](https://maimai.sega.jp/maimai_finale/). This rate is derived from the perentage score, the maximum percentage score, and an internal chart level.

!!! info
	The internal chart level is not displayed in game. Charts have a second component -- a decimal -- that changes how much rating they give.

	For example, a chart marked as level 12 may have an internal level of 12.0->12.6.

	Similarly, a chart marked as level 12+ may have an internal level of 12.7->12.9

	People have figured out a lot of these values for charts online. You'll have to look for them.

!!! warning
	This calculates rate on a per-chart basis. The rating in game is a running average of these values, which is also affected by your N most recent plays.

## `MaimaiRate.calculate()`

Calculates rating on a given chart.

### Signature

```ts
/**
 * Calculates maimai rate for a score.
 *
 * @param score - The percentage score to calculate the rate for.
 * @param maxScore - The max percentage score attainable of the chart the score was achieved on.
 * @param internalChartLevel - The internal decimal level of the chart the score was achieved on.
 */
export function calculate(score: number, maxScore: number, internalChartLevel: number): number
```
