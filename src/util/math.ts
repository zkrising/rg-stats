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
