type AnyFunction = (...params: unknown[]) => unknown;

// Copied from https://github.com/gcanti/fp-ts/blob/1.15.0/src/function.ts#L209 with some
// modifications to make the first function allow multiple parameters.
export function pipe<A extends unknown[], B, C>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
): (...args: A) => C;
export function pipe<A extends unknown[], B, C, D>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
): (...args: A) => D;
export function pipe<A extends unknown[], B, C, D, E>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
): (...args: A) => E;
export function pipe<A extends unknown[], B, C, D, E, F>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
): (...args: A) => F;
export function pipe<A extends unknown[], B, C, D, E, F, G>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
): (...args: A) => G;
export function pipe<A extends unknown[], B, C, D, E, F, G, H>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
): (...args: A) => H;
export function pipe<A extends unknown[], B, C, D, E, F, G, H, I>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
): (...args: A) => I;
export function pipe<A extends unknown[], B, C, D, E, F, G, H, I, J>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
): (...args: A) => J;
export function pipe(...fns: AnyFunction[]): AnyFunction {
    return (...initialParams: unknown[]): unknown =>
        fns.reduce<unknown>((value, fn, index) => {
            const params = index === 0 ? (value as unknown[]) : [value];
            return fn(...params);
        }, initialParams);
}

export function pipeWith<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
export function pipeWith<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
export function pipeWith<A, B, C, D, E>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
): E;
export function pipeWith<A, B, C, D, E, F>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
): F;
export function pipeWith<A, B, C, D, E, F, G>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
): G;
export function pipeWith<A, B, C, D, E, F, G, H>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
): H;
export function pipeWith<A, B, C, D, E, F, G, H, I>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
): I;
export function pipeWith<A, B, C, D, E, F, G, H, I, J>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
): J;
export function pipeWith(value: unknown, ...fns: AnyFunction[]) {
    return pipe(
        // TODO:
        // @ts-ignore
        ...fns,
    )(value);
}
