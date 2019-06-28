# pipe-ts

Overloads to supports up to 9 functions.

## Installation

```sh
yarn add pipe-ts

npm install pipe-ts
```

## `pipe`

Create a new function which pipes its value through the list functions.

```ts
const singleParamFnAdd1 = (n: number) => n + 1;
const singleParamFnTimes2 = (n: number) => n * 2;

const result = pipe(
    singleParamFnAdd1,
    singleParamFnTimes2,
)(1);

assert.strictEqual(result, 4);
```

Allows first function to have multiple parameters, [using generic rest parameters](https://github.com/Microsoft/TypeScript/issues/29904#issuecomment-471334674)

```ts
const singleParamFnAdd1 = (n: number) => n + 1;
const multipleParamFn = (a: number, b: number) => a - b;

const result = pipe(
    multipleParamFn,
    singleParamFnAdd1,
)(2, 1);

assert.strictEqual(result, 2);
```

## `pipeWith`

Transform a value by piping it through the listed functions. Sugar syntax for `pipe(f, g)(value)`.

```ts
const singleParamFnAdd1 = (n: number) => n + 1;
const singleParamFnTimes2 = (n: number) => n * 2;

const result = pipeWith(1, singleParamFnAdd1, singleParamFnTimes2);

assert.strictEqual(result, 4);
```

## Development

```
yarn
npm run start
```
