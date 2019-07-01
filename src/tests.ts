import * as assert from 'assert';
import { pipe, pipeWith } from './index';

const singleParamFnAdd1 = (n: number) => n + 1;
const singleParamFnTimes2 = (n: number) => n * 2;
const multipleParamFnDifference = (a: number, b: number) => a - b;

// We should really bring in a test framework to help here.
const describe = (name: string, fn: () => void) => {
    console.log(name);
    fn();
};
const it = (name: string, fn: () => void) => {
    console.log(name);
    fn();
};

describe('pipe', () => {
    it('works when first function has single param', () => {
        // One test for each overload
        assert.strictEqual(pipe(singleParamFnAdd1)(1), 2);
        assert.strictEqual(
            pipe(
                singleParamFnAdd1,
                singleParamFnTimes2,
            )(1),
            4,
        );
        assert.strictEqual(
            pipe(
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
            )(1),
            5,
        );
        assert.strictEqual(
            pipe(
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
            )(1),
            10,
        );
        assert.strictEqual(
            pipe(
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
            )(1),
            11,
        );
        assert.strictEqual(
            pipe(
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
            )(1),
            22,
        );
        assert.strictEqual(
            pipe(
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
            )(1),
            23,
        );
        assert.strictEqual(
            pipe(
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
            )(1),
            46,
        );
        assert.strictEqual(
            pipe(
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
            )(1),
            47,
        );
        assert.strictEqual(
            pipe(
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
            )(1),
            94,
        );
    });

    it('works when first function has multiple params', () => {
        assert.strictEqual(
            pipe(
                multipleParamFnDifference,
                singleParamFnAdd1,
            )(5, 4),
            2,
        );
    });
});

describe(pipeWith.name, () => {
    it('works', () => {
        // One test for each overload
        assert.strictEqual(pipeWith(1, singleParamFnAdd1), 2);
        assert.strictEqual(pipeWith(1, singleParamFnAdd1, singleParamFnTimes2), 4);
        assert.strictEqual(
            pipeWith(1, singleParamFnAdd1, singleParamFnTimes2, singleParamFnAdd1),
            5,
        );
        assert.strictEqual(
            pipeWith(
                1,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
            ),
            10,
        );
        assert.strictEqual(
            pipeWith(
                1,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
            ),
            11,
        );
        assert.strictEqual(
            pipeWith(
                1,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
            ),
            22,
        );
        assert.strictEqual(
            pipeWith(
                1,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
            ),
            23,
        );
        assert.strictEqual(
            pipeWith(
                1,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
            ),
            46,
        );
        assert.strictEqual(
            pipeWith(
                1,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
            ),
            47,
        );
        assert.strictEqual(
            pipeWith(
                1,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
                singleParamFnAdd1,
                singleParamFnTimes2,
            ),
            94,
        );
    });
});
