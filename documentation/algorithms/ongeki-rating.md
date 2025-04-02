# O.N.G.E.K.I. Rating

O.N.G.E.K.I. Rating functionality is exported under `ONGEKIRating`. To use it,
```ts
import { ONGEKIRating } from "rg-stats"
```

## Classic Rating

Classic Rating is an algorithm used in O.N.G.E.K.I. bright MEMORY and earlier. This algorithm is derived from the score (out of 1.01million) and an internal chart level, and caps at 1007500.

!!! info
	The internal chart level is not displayed in game. Charts have a second component -- a decimal -- that changes how much rating they give.

	For example, a chart marked as level 12 may have an internal level of 12.0~12.6.

	Similarly, a chart marked as level 12+ may have an internal level of 12.7~12.9

	People have figured out a lot of these values for charts online. You'll have to look for them.

!!! warning
	This calculates rating on a per-chart basis. The rating in game is a running average of these values, which is also affected by your N most recent plays.

### Signature

```ts
/**
 * Calculates the rating for an O.N.G.E.K.I. score.
 * This is accurate up to bright MEMORY Act.3.
 *
 * @param score - The score the user got. This is a value between 0 and 1.01million.
 * @param internalChartLevel - The internal chart level. This is a decimal value stored by the game internally.
 */
function calculate(score: number, internalChartLevel: number): number
```

## Re:Fresh Rating

Re:Fresh Rating is an algorithm used in O.N.G.E.K.I. Re:Fresh. This algorithm takes lamps into account, and caps at 1010000.

### Signature
```ts
/**
 * Calculates the rating for an ONGEKI score.
 * This is accurate up to Re:Fresh.
 *
 * @param internalChartLevel - The internal chart level. This is a decimal value stored by the game internally.
 * @param technicalScore - The technical score the user got. This is a value between 0 and 1.01million.
 * @param noteLamp - The note lamp
 * @param fullBell - Whether the bell lamp is "FULL BELL"
 */
function calculateRefresh(
	internalChartLevel: number,
	technicalScore: number,
	noteLamp: OngekiNoteLamp,
	fullBell: boolean
): number
```

## Platinum Rating

This is another rating algorithm introduced in Re:Fresh, based on platinum score.

### Signature

```ts
/**
 * Calculates the star rating for an O.N.G.E.K.I. score.
 * This is accurate up to Re:Fresh.
 *
 * @param internalChartLevel - The internal chart level. This is a decimal value stored by the game internally.
 * @param stars - The number of stars, 0-6 with 6 being "rainbow 5-stars"
 */
function calculatePlatinum(internalChartLevel: number, stars: number): number;
```