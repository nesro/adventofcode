import * as utils from './utils';

const testInput1 = {
    input: `abc

a
b
c

ab
ac

a
a
a
a

b`,
    expected: 11,
    expectedPartTwo: 6,
};

const main = (input: string, partTwo = false) => {
    const groups = input
        .split('\n\n')
        .filter(Boolean)
        .map((line) =>
            line
                .split('\n')
                .filter(Boolean)
                .map((line2) => line2.trim().split('')),
        );

    let size = 0;
    let sizeAll = 0;
    for (const group of groups) {
        const chars = new Set<string>();
        for (const line of group) {
            for (const char of line) {
                chars.add(char);
            }
        }
        size += chars.size;

        if (partTwo) {
            sizeAll += [...chars].reduce((acc, char) => acc + (group.every((line) => line.includes(char)) ? 1 : 0), 0);
        }
    }

    if (partTwo) {
        return sizeAll;
    } else {
        return size;
    }
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2020, 6);
    const result1 = main(input);
    utils.test(result1, 6382);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 3197);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
