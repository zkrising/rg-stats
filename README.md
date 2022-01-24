# Rhythm Game Stats Library

This is a TypeScript library for calculating rhythm game stats.

You can install it with any of these commands:
```sh
# npm
npm install rg-stats

# yarn
yarn add rg-stats

# pnpm
pnpm add rg-stats
```

## API

I haven't wrote documentation yet. I probably should.

## Development Info

### Installing

We use [PNPM](https://pnpm.io) as our package manager. Use `pnpm install` to install dependencies.

### Build Script

We use [TypeScript](https://typescriptlang.org). This means you have to run `pnpm build` to compile the library up into something usable by node.

**NOTE**: This does not have to be done if running tests or if you use `ts-node`.

### Tests

To run the tests, use `pnpm test`.

This repository has 100% test coverage, and that is enforced by our testing library.

We use [Node TAP](https://node-tap.org) as our test runner, and we also use a slightly more obscure feature of it in the form of [Snapshots](https://node-tap.org/docs/api/snapshot-testing/).

You can generate snapshots with `pnpm snap`. This will create snapshots for all tests that expect them. We use snapshots for things like error message formatting, as it's generally the best way to do so.

### Contributing

If you want to contribute an algorithm, give it a good name and create a file inside `src/algorithms`. Write all the functions related to it, and `export` the ones that should be public.

Then, write tests to cover 100% of it -- be brutal with your tests, as this is a small project and I'd like for it to stay very tidy!

Finally, just attach it to the exported API in `src/main.ts`. Simple!