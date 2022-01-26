# GITADORA Skill

GITADORA Skill functionality is exported under `GITADORASkill`. To use it,
```ts
import { GITADORASkill } from "rg-stats"
```

## About

Skill is an algorithm used in [GITADORA](https://remywiki.com/AC_GD). This algorithm is used to rate players abilities.

On a profile level, GITADORA looks at your best 25 plays on HOT charts and your best 25 on everything else.

## `GITADORASkill.calculate()`

Calculates skill on a given chart.

### Signature

```ts
/**
 * Calculate a GITADORA Skill value.
 *
 * @param scorePercent - The percent this score was worth. Must be between 0 and 100.
 * @param level - The level for this chart.
 */
function calculate(scorePercent: number, level: number): number
```

## `GITADORASKill.inverse()`

Given a skill value and the level of a chart,
calculates the percent needed to achieve that skill value on that chart.

```ts
/**
 * Given a GITADORA Skill and a level of a chart, return the percent necessary
 * to achieve that skill value.
 *
 * This throws if the skill value is not possible.
 *
 * @param skill - The skill level to invert.
 * @param level - The level of the chart this skill level should be inverted for.
 */
function inverse(skill: number, level: number): number
```

!!! warning
	This function will throw an error if the skill value requested isn't possible on a chart of this level!

	For example, requesting `inverse(90, 1.05)` would result in a throw, as 90 skill is not possible even with a perfect on a chart of level 1.05.