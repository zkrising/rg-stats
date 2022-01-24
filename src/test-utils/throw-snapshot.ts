/* istanbul ignore file */

export function ThrowsToSnapshot(t: Tap.Test, fn: () => unknown, message: string) {
	try {
		fn();

		t.fail(`DID NOT THROW: ${message}`);
	} catch (e: unknown) {
		const err = e as Error;
		t.matchSnapshot(err.message, message);
	}
}
