import * as utils from './utils';

const testInput1 = {
    input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
    expected: 24000,
    expectedPartTwo: 45000,
};

const main = (input: string) => {
    const elves = input.split('\n\n').filter(Boolean);

    let maxElf = 0;
    for (const elf of elves) {
        const sum = elf
            .split('\n')
            .filter(Boolean)
            .map((n) => Number.parseInt(n))
            .reduce((a, c) => a + c, 0);

        if (sum > maxElf) {
            maxElf = sum;
        }
    }

    return maxElf;
};

const main2 = (input: string) => {
    const elves = input.split('\n\n').filter(Boolean);
    const elfSums = [];

    for (const elf of elves) {
        const sum = elf
            .split('\n')
            .filter(Boolean)
            .map((n) => Number.parseInt(n))
            .reduce((a, c) => a + c, 0);
        elfSums.push(sum);
    }

    return elfSums
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, c) => a + c, 0);
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2022, 1);
    const result1 = main(input);
    utils.test(result1, 70698);

    utils.testPart2(main2, testInput1);

    const result2 = main2(input);
    utils.test(result2, 206643);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
