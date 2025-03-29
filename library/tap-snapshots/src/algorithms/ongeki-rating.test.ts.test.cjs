/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Classic should throw if chart level is negative. 1`] = `
Invalid input, Chart level cannot be negative. internalChartLevel=-1.
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Classic should throw if your score is >= 1.01million. 1`] = `
Invalid input, Technical score cannot be greater than 1.01Million. technicalScore=1010001.
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Classic should throw if your score is negative. 1`] = `
Invalid input, Technical score cannot be negative. technicalScore=-1.
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Platinum should throw if chart level is negative. 1`] = `
Invalid input, Chart level cannot be negative. internalChartLevel=-1.
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Platinum should throw if star number is negative. 1`] = `
Invalid input, Invalid number of stars. stars=-1.
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Platinum should throw if stars > 6. 1`] = `
Invalid input, Invalid number of stars. stars=7.
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Refresh should throw if chart level is negative. 1`] = `
Invalid input, Chart level cannot be negative. internalChartLevel=-1.
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Refresh should throw if lamp is ALL BREAK+ without 1.01M. 1`] = `
Invalid input, Invalid AB+. fullBell="true", noteLamp="ALL BREAK+".
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Refresh should throw if your score is 1.01M without ALL BREAK+. 1`] = `
Invalid input, Invalid AB+. fullBell="true", noteLamp="ALL BREAK".
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Refresh should throw if your score is 1.01M without FULL BELL. 1`] = `
Invalid input, Invalid AB+. fullBell="false", noteLamp="ALL BREAK+".
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Refresh should throw if your score is >= 1.01million. 1`] = `
Invalid input, Technical score cannot be greater than 1.01Million. technicalScore=1010001.
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Refresh should throw if your score is a LOSS FULL BELL. 1`] = `
Invalid input, Cannot have a LOSS FULL BELL. noteLamp="LOSS".
`

exports[`src/algorithms/ongeki-rating.test.ts TAP O.N.G.E.K.I. Rating Validation Tests > Refresh should throw if your score is negative. 1`] = `
Invalid input, Technical score cannot be negative. technicalScore=-1.
`
