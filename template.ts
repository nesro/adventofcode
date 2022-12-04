import * as utils from './utils';

const testInput1 = {
    input: ``,
    expected: 7,
    expectedPartTwo: 336,
};

const main = (input: string, partTwo = false) => {
    let map = input
        .split('\n')
        .filter(Boolean)
        .map((line) => line.trim().split(''));

    return 0;
};

(async () => {
    utils.testPart1(main, testInput1);

    // const input = await utils.getInputData(2022, 5);
    // const result1 = main(input);
    // utils.test(result1, 211);

    // utils.testPart2(main, testInput1);

    // const result2 = main(input, true);
    // utils.test(result2, 3584591857);

    // console.log(`Result 1: ${result1}`);
    // console.log(`Result 2: ${result2}`);
})();
