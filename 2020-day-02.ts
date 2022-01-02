import * as utils from './utils';

const testInput1 = {
    input: `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`,
    expected: 2,
    expectedPartTwo: 1,
};

const main = (input: string, partTwo = false) => {
    let numbers = input
        .split('\n')
        .filter(Boolean)
        .map((line) => /(\d+)-(\d+) (\w): (\w+)/.exec(line))
        .filter(([_, loStr, hiStr, letter, password]) => {
            const lo = parseInt(loStr, 10);
            const hi = parseInt(hiStr, 10);
            if (partTwo) {
                const split = password.split('');
                return (split[lo - 1] === letter ? 1 : 0) + (split[hi - 1] === letter ? 1 : 0) === 1;
            } else {
                const l = password.split('').filter((c) => c === letter).length;
                return lo <= l && l <= hi;
            }
        });

    return numbers.length;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2020, 2);
    const result1 = main(input);
    utils.test(result1, 586);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 352);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
