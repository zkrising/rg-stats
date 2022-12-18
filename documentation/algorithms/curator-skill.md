# Curator Skill

MUSECA Curator Skill functionality is exported under `CuratorSkill`. To use it,
```ts
import { CuratorSkill } from "rg-stats"
```

## About

Curator Skill is an algorithm used in [MUSECA](https://remywiki.com/MUSECA_Information). This algorithm is used to rate players abilities.

On a profile level, WACCA looks at your best 30 plays on HOT charts and your best 30 on everything else.

## `CuratorSkill.calculate()`

Calculates curator skill on a given chart.

!!! warn
	Some "Level 15" charts in MUSECA are actually level 16s.
	You should pass 16 as the level instead of 15 if the chart is:

	- MeteorA [Red 15]
	- NeverWorld [Red 15]
	- Redshift [Red 15]
	- Refrain [Red 15]
	- V [Red 15]
	- ZEPHYRANTHES [Red 15]
	- 絶対零度 [Red 15]

### Signature

```ts
/**
 * Calculate MUSECA "Curator Skill" for a score.
 *
 * @param score - The score to calculate the skill rating for.
 * @param chartLevel - The level for this chart. Note that some charts are considered
 * to be level 16s, and you should pass 16 to this function instead.
 */
export function calculate(score: number, chartLevel: number): number {
```

## `CuratorSkill.inverse()`

Given a curator skill and a chart level, this calculates the minimum score necessary to get that curator skill value.

```ts
/**
 * Given a curator skill value, return the score necessary to get that skill
 * on a chart of the provided level. Throws if this is not possible.
 *
 * @param skill - The curator skill value to invert.
 * @param chartLevel - The difficulty of chart you'd want to achieve this skill value on.
 */
export function inverse(skill: number, chartLevel: number): number
```

!!! warning
	This function will throw an error if the skill value requested isn't possible on a chart of this level!

	For example, requesting `inverse(1500, 10)` would result in a throw, as 2000 skill is not possible even with a perfect on a chart of level 10.