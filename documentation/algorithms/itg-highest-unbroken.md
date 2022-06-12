# ITG Highest Unbroken Streams

ITG Highest Unbroken Streams functionality is exported under `ITGHighestUnbroken`. To use it,
```ts
import { ITGHighestUnbroken } from "rg-stats"
```

## About

Highest Unbroken is a generic form of the 'highest unbroken 32 measures' calculation used by many ITG players.

This algorithm -- given some information about a chart and when a player died -- returns
the bpm at which this player streamed unbroken for N measures.

As some examples, with measures set to 32 (the default)

 - 32 @ 190 will return 190,
 - 96 @ 190, user died at m40 is converted to 40 @ 190 and will return 190.
 - 31 @ 190 will return null,
 - 32 @ 200 / 32 @ 220 will return 220.
 - 31 @ 200 into 1 @ 50 will return 50. (assuming no break between the streams)

## `ITGHighestUnbroken.calculateFromNPSPerMeasure()`

Calculates the fastest series of N unbroken measures on a given chart from NPSPerMeasure data.

### Signature

```ts
/**
 * Given an array of notes per measure, NPS per measure and (optionally) when the user died
 * calculate the fastest series of unbroken '16ths' at N measures.
 *
 * 32 @ 190 will return 190,
 * 96 @ 190, user died at m40 is converted to 40 @ 190 and will return 190.
 *
 * 31 @ 190 will return null,
 * 32 @ 200 / 32 @ 220 will return 220.
 * 31 @ 200 into 1 @ 50 will return 50. (assuming no break between the streams)
 *
 * @param npsPerMeasure - The notes per second per measure.
 * @param notesPerMeasure - The notes per measure.
 * @param diedAt - Optionally, when to cut this short, such as if the user died at measure
 * 39, and still might've technically did 32 measures of stream.
 * @param measures - Optionally, override how many measures need to be unbroken. This must
 * be greater than 1. This allows you to calculate Highest 256, or similar.
 *
 * @returns The BPM of the highest N unbroken measures in this chart.
 */
function calculateFromNPSPerMeasure(
	npsPerMeasure: Array<number>,
	notesPerMeasure: Array<number>,
	diedAt: number | null = null,
	measures = 32
): number | null
```

## `ITGHighestUnbroken.calculateFromBPMPerMeasure()`

Calculates the fastest series of N unbroken measures on a given chart from BPMPerMeasure data.

This is a thin wrapper function that converts BPM input into NPS input -- for example, 150BPM becomes 10nps.

```ts
/**
 * Given an array of bpms per measure instead of nps per measure, calculate the fastest
 * N measures of unbroken streams played. This is a thin wrapper around the NPS/Measure
 * calculator, used for humanising input.
 *
 * {@see calculateFromNPSPerMeasure}
 */
function calculateFromBPMPerMeasure(
	bpmPerMeasure: Array<number>,
	notesPerMeasure: Array<number>,
	diedAt?: null | number,
	measures?: number
)
```
