/* istanbul ignore file */

/**
 * Tests whether a number is approximately equal to another number.
 */
export function isAprx(
	t: Tap.Test,
	value: number,
	expected: number,
	msg: string,
	decimalPlaces = 2
) {
	const lim = 1 / 10 ** decimalPlaces;

	const aprx = Math.abs(value - expected) < lim;

	if (aprx) {
		return t.pass(msg);
	}

	return t.fail(`${msg} Got ${value}, Expected ${expected}.`);
}
