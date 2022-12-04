import * as utils from './utils';

const testInput1 = {
    input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
    expected: 2,
    expectedPartTwo: 4,
};

const main = (input: string, partTwo = false) => {
    const pairs = input
        .split('\n')
        .filter(Boolean)
        .map((line) => line.trim());

    let sum = 0;
    let sum2 = 0;
    for (const pair of pairs) {
        const fromTo = pair.split(',').map((ft) => ft.split('-').map((n) => Number.parseInt(n)));

        if (
            (fromTo[0][0] <= fromTo[1][0] && fromTo[0][1] >= fromTo[1][1]) ||
            (fromTo[1][0] <= fromTo[0][0] && fromTo[1][1] >= fromTo[0][1])
        ) {
            sum++;
        }

        if (
            (fromTo[0][0] <= fromTo[1][0] && fromTo[0][1] >= fromTo[1][1]) ||
            (fromTo[1][0] <= fromTo[0][0] && fromTo[1][1] >= fromTo[0][1]) ||
            (fromTo[0][0] <= fromTo[1][0] && fromTo[1][0] <= fromTo[0][1] && fromTo[0][1] < fromTo[1][1]) ||
            (fromTo[1][0] <= fromTo[0][0] && fromTo[0][0] <= fromTo[1][1] && fromTo[1][1] < fromTo[0][1])
        ) {
            sum2++;
        }
    }

    if (partTwo) {
        return sum2;
    }

    return sum;
};

(async () => {
    utils.testPart1(main, testInput1);

    const input = await utils.getInputData(2022, 4);
    const result1 = main(input);
    utils.test(result1, 657);

    utils.testPart2(main, testInput1);

    const result2 = main(input, true);
    utils.test(result2, 938);

    console.log(`Result 1: ${result1}`);
    console.log(`Result 2: ${result2}`);
})();
