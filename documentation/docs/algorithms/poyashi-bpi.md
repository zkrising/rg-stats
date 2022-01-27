# Poyashi BPI

Poyashi BPI functionality is exported under `PoyashiBPI`. To use it,
```ts
import { PoyashiBPI } from "rg-stats"
```

## About

BPI is an algorithm used by [beatmania IIDX](https://en.wikipedia.org/wiki/Beatmania_IIDX)players.
It's designed for the higher end of IIDX players, being based around Kaiden Averages and World Records.

BPI was originally made by Nori, who also wrote the initial implementation, however it was significantly changed by another person - [Poyashi](https://bpi.poyashi.me) - when they reimplemented it for
their own site. The latter implementation is the community standard, and has been since IIDX27-ish.

BPI is defined such that Kaiden Average is worth 0BPI, and the world record is worth 100BPI. An exponential curve is then formed between these two points, and is scaled by the distance between the WR and KAVG and also chart specific exponents.

!!! note
	This algorithm isn't actually part of the game! It's something that was developed by and is maintained by players.

## `PoyashiBPI.calculate()`

Calculates BPI given a chart's kaiden average, world record, max score, and power coefficient.

!!! warning
	BPI is undefined for the case where kaiden average equals the chart world record.

	This shouldn't ever happen, but this will still cause the function to throw.

### Signature

```ts
/**
 * Calculates the "Beat Performance Index" of an IIDX score.
 * this is a port of Poyashi's implementation.
 * https://github.com/potakusan/iidx_score_manager/blob/f21ba6b85fcc0bf8b7ca888fa2239a3951a9c9c2/src/components/bpi/index.tsx#L120
 *
 * @param yourEx Your EX score.
 * @param kaidenAverage The kaiden average EX score.
 * @param worldRecord The world record's EX score.
 * @param max The maximum amount of EX achievable on this chart.
 * @param powCoef What power the BPI should be raised to. This is arbitrary, and assigned on a per-song basis. Defaults to 1.175.
 * If powCoef is set to -1, it will be overrode to 1.175.
 *
 * @returns A number between -15 and 100. Unless your score is better than
 * the world record, in which case returns can be above 100.
 *
 * @edgecase Even though any score better than the world record *is* now the world record,
 * it takes around 6 months for the official data on the world record to be updated.
 * Since changing the worldRecord affects all scores on the chart, poyashi's
 * implementation just lets BPI exceed 100 until patched.
 *
 * @edgecase BPI is undefined for the case where the world record is equal to the
 * kaiden average.
 */
function calculate(
	yourEx: integer,
	kaidenAverage: integer,
	worldRecord: integer,
	max: integer,
	powCoef: number | null
): number
```

## `PoyashiBPI.inverse()`

Given a charts kaiden average, world record, max score and power coefficient, return the
EX Score needed to get the provided BPI.

### Signature

```ts
/**
 * Returns the EX Score necessary to achieve the provided BPI.
 *
 * @param bpi - The BPI you wish to find out how much ex is needed for.
 * @param kaidenAverage The kaiden average EX score.
 * @param worldRecord The world record's EX score.
 * @param powCoef What power the BPI should be raised to. This is arbitrary, and assigned on a per-song basis. Defaults to 1.175.
 * If powCoef is set to -1, it will be overrode to 1.175.
 *
 * @returns A number between 0 and `max`.
 *
 * @edgecase -15BPI is achievable by many possible EXs, since it is the lower bound
 * for any given chart. Passing -15 into the function will return the largest
 * possible exScore that results in -15BPI.
 */
export function inverse(
	bpi: number,
	kaidenAverage: integer,
	worldRecord: integer,
	max: integer,
	powCoef: number | null
): number
```