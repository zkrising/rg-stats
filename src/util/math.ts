import { integer } from "./types";

/**
 * Logarithm a number to any base.
 * @param number - The number to logarithm.
 * @param base - The base to log to.
 *
 * Uses this identity:
 * loga(n) = logb(n) / logb(a)
 * we use logb = ln, just because it's right there.
 */
export function LogToBase(number: number, base: number) {
	return Math.log(number) / Math.log(base);
}

/**
 * Floor a number to N decimal places.
 *
 * @example `FloorToNDP(1.594, 1) -> 1.5`
 * @example `FloorToNDP(1.599, 2) -> 1.59`
 *
 * @param number - The number to floor.
 * @param dp - The amount of decimal places to floor to.
 */
export function FloorToNDP(number: number, dp: integer) {
	const mul = 10 ** dp;
	return Math.floor(number * mul) / mul;
}
