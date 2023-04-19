/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`src/algorithms/maimai-rate.test.ts TAP maimai Rate Validation Tests > Should throw if level is negative. 1`] = `
Invalid input, Internal chart level cannot be negative. level=-1.
`

exports[`src/algorithms/maimai-rate.test.ts TAP maimai Rate Validation Tests > Should throw if max score is greater than 104%. 1`] = `
Invalid input, Max score cannot be greater than 104%. maxScore=104.1.
`

exports[`src/algorithms/maimai-rate.test.ts TAP maimai Rate Validation Tests > Should throw if score is greater than max score. 1`] = `
Invalid input, Score cannot be greater than max score. score=101.5, maxScore=100.68.
`

exports[`src/algorithms/maimai-rate.test.ts TAP maimai Rate Validation Tests > Should throw if score is negative. 1`] = `
Invalid input, Score cannot be negative. score=-1.
`
