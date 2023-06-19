# pipe-ts

[What is `pipe`?](https://dev.to/benlesh/a-simple-explanation-of-functional-pipe-in-javascript-2hbj)

## Installation

```sh
yarn add pipe-ts

npm install pipe-ts
```

## `pipe`

Create a new function which pipes its value through the list functions.

```ts
const add1 = (n: number) => n + 1;
const times2 = (n: number) => n * 2;

const add1ThenTimes2 = pipe(add1, times2);
const result: number = add1ThenTimes2(1);

assert.strictEqual(result, 4);
```

Allows first function to have any number of parameters (0+), [thanks to TypeScript's generic rest parameters](https://github.com/Microsoft/TypeScript/issues/29904#issuecomment-471334674)

```ts
// First function has multiple parameters

const difference = (a: number, b: number) => a - b;
const add1 = (n: number) => n + 1;

const differenceThenAdd1 = pipe(difference, add1);
const result: number = differenceThenAdd1(5, 4);

assert.strictEqual(result, 2);
```

```ts
// First function has 0 parameters

const getNumber = () => 1;
const add1 = (n: number) => n + 1;

const getNumberThenAdd1 = pipe(getNumber, add1);
const result: number = getNumberThenAdd1();

assert.strictEqual(result, 2);
```

## `pipeWith`

Transform a value by piping it through the listed functions. Sugar syntax for `pipe(f, g)(value)`.

```ts
const add1 = (n: number) => n + 1;
const times2 = (n: number) => n * 2;

const result: number = pipeWith(1, add1, times2);

assert.strictEqual(result, 4);
```

## Note about number of functions

`pipe` and `pipeWith` currently support up to 9 functions. If need be, we are open to adding more overloads to increase this limit.

We are [also open to adding an array overload](https://github.com/unsplash/pipe-ts/issues/5), so any number of funtions can be passed.

## When `this` matters

If a function passed to `pipe` or `pipeWith` relies on a specific context of execution ([`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)), you cannot call it by passing the reference (_point-free style_).

Use an anonymous function instead.

**Bad**

```ts
pipeWith('foo', localStorage.getItem);
```

**Good**

```ts
pipeWith('foo', (key) => localStorage.getItem(key));
```

**Also good**

```ts
pipeWith('foo', localStorage.getItem.bind(localStorage)),
```

## Development

```
yarn
npm run start
```
