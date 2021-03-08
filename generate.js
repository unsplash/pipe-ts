// @ts-check
const { writeFile } = require("fs").promises;
const path = require("path");
const { EOL } = require("os");

const main = async (/** @type {number} */ n) => {
    process.stdout.write("Generating...");
    await writeFile(path.join(__dirname, "src", "index.ts"), generate(n), "utf-8");
    process.stdout.write(" Done.");
}

const generate = (/** @type {number} */ n) => {
    let f = ``;
    const l = (/** @type {string} */ s) => f += `${s}${EOL}`;

    l(`/* tslint:disable:max-file-line-count */`);
    l(`type UnknownFunction = (...params: unknown[]) => unknown;`);
    l(``);
    l(`// Copied from https://github.com/gcanti/fp-ts/blob/1.15.0/src/function.ts#L209 with some`);
    l(`// modifications to make the first function allow multiple parameters.`);
    l(`export function pipe<A extends unknown[], B>(ab: (this: void, ...a: A) => B): (...args: A) => B;`);
    for (let i of indices(n).slice(1)) {
        l(`export function pipe<A extends unknown[], ${indices(i+1).map(variableStartFrom("B")).join(", ")}>(`);
        l(`    ab: (this: void, ...a: A) => B,`);
        for (let j of indices(i)) {
            let [b, c, B, C] = ["b", "c", "B", "C"].map(s => variableStartFrom(s)(j));
            l(`    ${b}${c}: (this: void, ${b}: ${B}) => ${C},`);
        }
        l(`): (...args: A) => ${variableStartFrom("C")(i-1)};`);
    }
    l(`export function pipe(...fns: UnknownFunction[]): UnknownFunction {`);
    l(`    return (...initialParams: unknown[]): unknown =>`);
    l(`        fns.reduce<unknown>((value, fn, index) => {`);
    l(`            const params = index === 0 ? (value as unknown[]) : [value];`);
    l(`            return fn(...params);`);
    l(`        }, initialParams);`);
    l(`}`);
    l(``);
    l(`export function pipeWith<A, B>(a: A, ab: (this: void, a: A) => B): B;`);
    for (let i of indices(n).slice(1)) {
        l(`export function pipeWith<A, ${indices(i+1).map(variableStartFrom("B")).join(", ")}>(`);
        l(`    a: A,`);
        for (let j of indices(i+1)) {
            let [a, b, A, B, c, C] = ["a", "b", "A", "B"].map(s => variableStartFrom(s)(j));
            l(`    ${a}${b}: (this: void, ${a}: ${A}) => ${B},`)
        }
        l(`): ${variableStartFrom("C")(i-1)};`);
    }
    l(`export function pipeWith(value: unknown, ...fns: UnknownFunction[]): unknown {`);
    l(`    return pipe(`);
    l(`        // Our overloads do not currently support arrays`);
    l(`        // @ts-ignore`);
    l(`        ...fns,`);
    l(`    )(value);`);
    l(`}`);
    return f;
}

let n = Number(
    (maybeN =>
        maybeN !== undefined ? maybeN.replace("--", "") : maybeN
    )(process.argv.find(a => /^\s*--\d+\s*$/.test(a)))
)
if (Number.isNaN(n)) {
    console.error("Error: Please pass number of overloads eg --5");
    process.exit(1)
}

if (n < 1) {
    console.error("Error: Number of overloads need to be minimum 1");
    process.exit(1)
}

if (n > 25) {
    console.error(
        "Error: Sorry generator doesn't support more than 25 overloads " +
        "(because A-Z variable names won't suffice)"
    );
    process.exit(1)
}

const indices = (/** @type {number} */ length) =>
    Array.from({ length }, (_, i) => i)

const variableStartFrom = (/** @type {string} */ s) =>
    (/** @type {number} */ i) =>
        String.fromCharCode(s.codePointAt(0) + i)

main(n);
